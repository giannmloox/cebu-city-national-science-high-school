import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, X } from "lucide-react";
import Navbar from "@/components/Navbar";
import emailjs from "@emailjs/browser";
import { parsePageRange } from "@/lib/printingUtils";
import { PDFDocument } from "pdf-lib";
import * as mammoth from "mammoth";
import JSZip from "jszip";

/* ---------- CONFIGURATION ---------- */
// TODO: replace these placeholder values with real credentials / pricing
const EMAILJS_SERVICE_ID = "service_bni5zql"; // same as shop
const EMAILJS_PUBLIC_KEY = "AeJN83U2A_THgdEyt"; // same as shop
const EMAILJS_TEMPLATE_ID = "template_e6j3smf"; // using existing shop template (works)

const UPLOAD_IO_API_KEY = "public_G22njFq9x1f9KgqeoqHfTJUw1VdE";
const UPLOAD_IO_ACCOUNT_ID = "G22njFq";

// Pricing will be loaded from /pricing.json at runtime (fallback values are provided)
const DEFAULT_PRICING = {
  bwPrice: 5,
  colorPrice: 6,
  stapleFee: 2,
  bindFee: 5,
};

const PAPER_SIZES = ["A4", "Long (8.5x13)", "Short (8.5x11)"] as const;
const BINDING_OPTIONS = ["None", "Stapled", "Bound"] as const;

/* ---------- GRADE -> SECTION mapping (same as Shop) ---------- */
const SECTIONS_BY_GRADE: Record<string, string[]> = {
  "Grade 7": ["Mercury", "Venus", "Earth", "Saturn", "Neptune"],
  "Grade 8": ["Averrhoa", "Hibiscus", "Ixora", "Oryza", "Zea"],
  "Grade 9": ["Argon", "Krypton", "Helium", "Xenon", "Neon"],
  "Grade 10": ["Copernicus", "Galileo", "Einstein", "Newton", "Kepler"],
  "Grade 11": ["Pioneer", "Voyager", "Spitzer", "Cassini", "Apollo"],
  "Grade 12": ["STEM", "ABM"],
};

/**
 * Printing service page – collects order details, uploads file to Upload.io, and sends an email via EmailJS.
 */
const Printing = () => {
  /* ---- form state ---- */
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [grade, setGrade] = useState("");
  const [section, setSection] = useState("");

  const [paperSize, setPaperSize] = useState<typeof PAPER_SIZES[number]>(PAPER_SIZES[0]);
  const [color, setColor] = useState<"B&W" | "Color">("B&W");
  const [pdfPageCount, setPdfPageCount] = useState(0);
  const [printMode, setPrintMode] = useState<"entire" | "selected">("entire");
  const [selectedPages, setSelectedPages] = useState<string>("");

  const [copies, setCopies] = useState(1);
  const [binding, setBinding] = useState<typeof BINDING_OPTIONS[number]>(BINDING_OPTIONS[0]);

  const [delivery, setDelivery] = useState<"Pickup at School" | "Delivery">("Pickup at School");
  const [building, setBuilding] = useState("");
  const [room, setRoom] = useState("");
  const [address, setAddress] = useState("");

  type Payment = "GCash" | "COD";
  const [payment, setPayment] = useState<Payment | "">("");

  const [file, setFile] = useState<File | null>(null);
  const [originalFileName, setOriginalFileName] = useState<string>("");
  const [fileUrl, setFileUrl] = useState<string>("");
  const [uploadError, setUploadError] = useState<string>("");
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [parsing, setParsing] = useState(false);

  const [submitting, setSubmitting] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [sendError, setSendError] = useState(false);

  // Load dynamic pricing (fallback to defaults)
  const [pricing, setPricing] = useState(DEFAULT_PRICING);
  useEffect(() => {
    fetch("/pricing.json")
      .then((r) => (r.ok ? r.json() : Promise.reject("Pricing fetch failed")))
      .then((data) => {
        setPricing({
          bwPrice: data.bwPrice ?? DEFAULT_PRICING.bwPrice,
          colorPrice: data.colorPrice ?? DEFAULT_PRICING.colorPrice,
          stapleFee: data.stapleFee ?? DEFAULT_PRICING.stapleFee,
          bindFee: data.bindFee ?? DEFAULT_PRICING.bindFee,
        });
      })
      .catch((err) => {
        console.warn("Could not load pricing, using defaults:", err);
      });
  }, []);

  /* ---- price calculation ---- */
  const pricePerPage = color === "B&W" ? pricing.bwPrice : pricing.colorPrice;

  // Parse selected pages (if any) and compute effective page count
  const { pages: selectedPageArray, error: rangeError } = printMode === "selected"
    ? parsePageRange(selectedPages, pdfPageCount)
    : { pages: [], error: undefined };
  const effectivePages = printMode === "selected" ? selectedPageArray.length : (pdfPageCount > 0 ? pdfPageCount : 1);

  const pagesSubtotal = pricePerPage * effectivePages * copies;
  const bindingFee = binding === "Stapled" ? pricing.stapleFee : binding === "Bound" ? pricing.bindFee : 0;
  const deliveryFee = delivery === "Delivery" ? 5 : 0;
  const total = pagesSubtotal + bindingFee + deliveryFee;

  /* ---- file upload handling (Upload.io) ---- */
  const uploadFile = async (selectedFile: File) => {
    return new Promise<void>((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open("POST", `https://api.upload.io/v2/accounts/${UPLOAD_IO_ACCOUNT_ID}/uploads/binary`);
      xhr.setRequestHeader("Authorization", `Bearer ${UPLOAD_IO_API_KEY}`);
      xhr.upload.onprogress = (e) => {
        if (e.lengthComputable) {
          const percent = Math.round((e.loaded / e.total) * 100);
          setUploadProgress(percent);
        }
      };
      xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          if (xhr.status >= 200 && xhr.status < 300) {
            try {
              const data = JSON.parse(xhr.responseText);
              if (data && data.fileUrl) {
                setFileUrl(data.fileUrl);
                setUploadError("");
                setUploadProgress(100);
                resolve();
              } else {
                setUploadError("Upload succeeded but no file URL returned.");
                reject(new Error("Missing fileUrl"));
              }
            } catch (e) {
              setUploadError("Invalid server response.");
              reject(e);
            }
          } else {
            let msg = "Upload failed.";
            if (xhr.status === 413) msg = "File too large (max 32 MB).";
            else if (xhr.status === 401) msg = "Unauthorized – check API key.";
            else if (xhr.status === 0) msg = "Network error – please check your connection.";
            setUploadError(msg);
            reject(new Error(msg));
          }
        }
      };
      xhr.onerror = () => {
        setUploadError(`Upload failed (status ${xhr.status}). Check credentials or CORS.`);
        reject(new Error(`Upload XHR error ${xhr.status}`));
      };
      xhr.timeout = 30000; // 30 seconds
      xhr.ontimeout = () => {
        setUploadError("Upload timed out – please try again.");
        reject(new Error("Timeout"));
      };
      const form = new FormData();
      form.append("file", selectedFile);
      xhr.send(form);
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0] ?? null;
    // Reset any previous state
    setFile(null);
      setOriginalFileName("");
    setFileUrl("");
    setUploadError("");
    setUploadProgress(0);
    setPdfPageCount(0);
    setPrintMode("entire");
    setSelectedPages("");
    if (!selected) return;
    // File size validation (max 32 MB)
    if (selected.size > 32 * 1024 * 1024) {
      setUploadError("File exceeds maximum size of 32 MB.");
      return;
    }
// Determine page count based on file type (PDF, DOCX, PPTX)
    setParsing(true);
if (selected.type === "application/pdf" || selected.name.toLowerCase().endsWith(".pdf")) {
        // ---- PDF ----
        const reader = new FileReader();
        reader.onload = async () => {
          const arrayBuffer = reader.result as ArrayBuffer;
          try {
            // Use pdf-lib to load PDF and get page count
            const pdfDoc = await PDFDocument.load(arrayBuffer);
            const pageCount = pdfDoc.getPageCount();
            setPdfPageCount(pageCount);
            setPrintMode("entire");
          } catch (err) {
            console.error("PDF parse error", err);
            setUploadError("Failed to read PDF – it may be corrupted.");
            setPdfPageCount(0);
          } finally {
            setParsing(false);
          }
        };
        reader.readAsArrayBuffer(selected);
      } else if (selected.name.toLowerCase().endsWith(".docx")) {
        // ---- DOCX ----
        const reader = new FileReader();
        reader.onload = async () => {
          const arrayBuffer = reader.result as ArrayBuffer;
          try {
            const result = await mammoth.convertToHtml({ arrayBuffer });
            const html = result.value;
            const tempDiv = document.createElement("div");
            tempDiv.innerHTML = html;
            const paragraphCount = tempDiv.querySelectorAll("p").length;
            // Estimate pages: assume ~30 paragraphs per printed page
            const estimatedPages = Math.max(1, Math.ceil(paragraphCount / 30));
            setPdfPageCount(estimatedPages);
            setPrintMode("entire");
          } catch (err) {
            console.error("DOCX parse error", err);
            setUploadError("Failed to read DOCX – it may be corrupted.");
            setPdfPageCount(0);
          } finally {
            setParsing(false);
          }
        };
        reader.readAsArrayBuffer(selected);
      } else if (selected.name.toLowerCase().endsWith(".pptx")) {
        // ---- PPTX ----
        const reader = new FileReader();
        reader.onload = async () => {
          const arrayBuffer = reader.result as ArrayBuffer;
          try {
            const zip = await JSZip.loadAsync(arrayBuffer);
            const slideCount = Object.keys(zip.files).filter(name =>
              name.startsWith("ppt/slides/slide") && name.endsWith(".xml")
            ).length;
            const pages = slideCount > 0 ? slideCount : 1;
            setPdfPageCount(pages);
            setPrintMode("entire");
          } catch (err) {
            console.error("PPTX parse error", err);
            setUploadError("Failed to read PPTX – it may be corrupted.");
            setPdfPageCount(0);
          } finally {
            setParsing(false);
          }
        };
        reader.readAsArrayBuffer(selected);
      } else {
        // Non‑PDF/DOCX/PPTX files: treat as a single‑page document
        setPdfPageCount(1);
        setParsing(false);
      }
    setOriginalFileName(selected.name);
      setFile(selected);
    // Start upload (errors will be captured inside uploadFile)
    uploadFile(selected).catch(() => {});
  };

  /* ---- submit order via EmailJS ---- */
  const placeOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSendError(false);
const templateParams = {
      customer_name: name,
      grade_section: `${grade} - ${section}`,
      contact_number: contact,
      paper_size: paperSize,
      color_type: color,
      page_count: effectivePages,
      copy_count: copies,
      binding_type: binding,
      file_name: file?.name ?? "",
      file_link: fileUrl,
      file_link_html: `<a href="${fileUrl}" target="_blank" style="color:#ffd700; text-decoration:underline;">View uploaded file</a>`,
      items: `File uploaded: ${file?.name || "document"}${(fileUrl ? ` — ${fileUrl}` : "")}`,
      selected_pages: printMode === "selected" ? selectedPages : "",
      delivery_option: delivery,
      location: delivery === "Delivery" ? (address || `${building}, ${room}`) : "Pickup at School",
      delivery_fee: `₱${deliveryFee}`,
      payment_method: payment,
      price_per_page: `₱${pricePerPage}`,
      subtotal: `₱${pagesSubtotal}`,
      binding_fee: `₱${bindingFee}`,
      total: `₱${total}`,
    };

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY
      );
      setOrderPlaced(true);
    } catch (err) {
      console.error("EmailJS error", err);
      setSendError(true);
    } finally {
      setSubmitting(false);
    }
  };

  // Reset form fields after an order is closed
  const resetForm = () => {
    setName("");
    setContact("");
    setGrade("");
    setSection("");
    setPaperSize(PAPER_SIZES[0]);
    setColor("B&W");
    setCopies(1);
    setBinding(BINDING_OPTIONS[0]);
    setFile(null);
      setOriginalFileName("");
    setFileUrl("");
    setUploadError("");
    setUploadProgress(0);
    setPdfPageCount(0);
    setPrintMode("entire");
    setSelectedPages("");
    setDelivery("Pickup at School");
    setBuilding("");
    setRoom("");
    setAddress("");
    setPayment("");
    setParsing(false);
  };

  return (
    <div className="min-h-screen bg-[#0a1628] text-white">
      <Navbar />
      <main className="container mx-auto px-4 pt-32 pb-20">
        <h1 className="text-4xl md:text-6xl font-bold text-center mb-12">
          Printing Service
        </h1>
        <form onSubmit={placeOrder} className="space-y-6">
          {/* Personal info */}
          <input
            type="text"
            placeholder="Full Name"
            required
            aria-label="Full Name"
            className="w-full p-2 bg-white/5 rounded border border-white/10"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="tel"
            placeholder="Contact Number"
            required
            aria-label="Contact Number"
            className="w-full p-2 bg-white/5 rounded border border-white/10"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
          />
          {/* Grade & Section */}
          <div className="grid grid-cols-2 gap-4">
            <select
              required
              aria-label="Select Grade"
              value={grade}
              onChange={(e) => {
                setGrade(e.target.value);
                setSection("");
              }}
              className="w-full p-2 bg-white/5 rounded border border-white/10"
            >
              <option value="">Select Grade</option>
              {Object.keys(SECTIONS_BY_GRADE).map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>
            <select
              required
              aria-label="Select Section"
              disabled={!grade}
              value={section}
              onChange={(e) => setSection(e.target.value)}
              className="w-full p-2 bg-white/5 rounded border border-white/10 disabled:opacity-50"
            >
              <option value="">Select Section</option>
              {grade &&
                SECTIONS_BY_GRADE[grade].map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
            </select>
          </div>
          {/* Print options */}
          <div className="flex gap-2">
            {PAPER_SIZES.map((size) => (
              <button
                type="button"
                key={size}
                onClick={() => setPaperSize(size)}
                className={`px-4 py-2 rounded border transition-colors ${
                  paperSize === size ? "bg-gold text-[#0a1628]" : "border-white/20 hover:border-white/40 bg-white/5"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            {(["B&W", "Color"] as const).map((c) => (
              <button
                type="button"
                key={c}
                onClick={() => setColor(c)}
                className={`px-4 py-2 rounded border transition-colors ${
                  color === c ? "bg-gold text-[#0a1628]" : "border-white/20 hover:border-white/40 bg-white/5"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="number"
              min={1}
              required
              aria-label="Number of Copies"
              placeholder="Copies"
              className="w-full p-2 bg-white/5 rounded border border-white/10"
              value={copies}
              onChange={(e) => setCopies(Number(e.target.value))}
            />
          </div>
          <div className="flex gap-2">
            {BINDING_OPTIONS.map((b) => (
              <button
                type="button"
                key={b}
                onClick={() => setBinding(b)}
                className={`px-4 py-2 rounded border transition-colors ${
                  binding === b ? "bg-gold text-[#0a1628]" : "border-white/20 hover:border-white/40 bg-white/5"
                }`}
              >
                {b}
              </button>
            ))}
          </div>
          {/* Delivery option */}
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setDelivery("Pickup at School")}
              aria-pressed={delivery === "Pickup at School"}
              className={`px-4 py-2 rounded border transition-colors ${
                delivery === "Pickup at School" ? "bg-gold text-[#0a1628]" : "border-white/20 hover:border-white/40 bg-white/5"
              }`}
            >
              Pickup at School
            </button>
            <button
              type="button"
              onClick={() => setDelivery("Delivery")}
              aria-pressed={delivery === "Delivery"}
              className={`px-4 py-2 rounded border transition-colors ${
                delivery === "Delivery" ? "bg-gold text-[#0a1628]" : "border-white/20 hover:border-white/40 bg-white/5"
              }`}
            >
              Delivery
            </button>
          </div>
          {delivery === "Delivery" && (
            <>
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Building (e.g. SB2)"
                  required={!address}
                  value={building}
                  onChange={(e) => setBuilding(e.target.value)}
                  className="w-full p-2 bg-white/5 rounded border border-white/10"
                  aria-label="Building"
                />
                <input
                  type="text"
                  placeholder="Room (e.g. 201)"
                  required={!address}
                  value={room}
                  onChange={(e) => setRoom(e.target.value)}
                  className="w-full p-2 bg-white/5 rounded border border-white/10"
                  aria-label="Room"
                />
              </div>
              <input
                type="text"
                placeholder="Other address (optional)"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full p-2 bg-white/5 rounded border border-white/10"
                aria-label="Free-form address"
              />
            </>
          )}
          {/* Payment method */}
          <div>
            <label className="block font-semibold mb-1">Payment Method</label>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setPayment("GCash")}
                aria-pressed={payment === "GCash"}
                className={`py-3 px-2 rounded border transition-colors ${
                  payment === "GCash" ? "bg-gold text-[#0a1628] border-gold" : "border-white/20 hover:border-white/40 bg-white/5"
                }`}
              >
                GCash
              </button>
              <button
                type="button"
                onClick={() => setPayment("COD")}
                aria-pressed={payment === "COD"}
                className={`py-3 px-2 rounded border transition-colors ${
                  payment === "COD" ? "bg-gold text-[#0a1628] border-gold" : "border-white/20 hover:border-white/40 bg-white/5"
                }`}
              >
                COD
              </button>
            </div>
            {payment === "GCash" && (
              <div className="p-4 bg-[#0e1f38] border border-white/10 rounded-lg text-center mt-2 animate-in fade-in duration-300">
                <p className="text-white mb-3 font-medium">Scan to Pay via GCash</p>
                <img src="/sslg-items/gcash.jpg" alt="GCash QR" className="mx-auto w-32 h-32 rounded border-2 border-gold" />
                <p className="text-white/80 text-xs mt-3">Please send your payment screenshot via private message to an SSLG officer.</p>
              </div>
            )}
          </div>
          {/* Live total */}
          <div className="sticky top-0 z-10 p-4 bg-[#0a1628]/95 backdrop-blur rounded border border-white/10 text-sm">
            <p>
              <strong>Price per page:</strong> ₱{pricePerPage}
            </p>
            <p>
              <strong>Pages × Copies × Rate:</strong> ₱{pagesSubtotal}
            </p>
            <p>
                <strong>{binding} fee:</strong> ₱{bindingFee}
              </p>
            <p>
              <strong>Delivery fee:</strong> ₱{deliveryFee}
            </p>
            <p className="font-bold text-gold mt-2">Total: ₱{total}</p>
          </div>
          {/* File upload */}
          <div className="border border-gold p-4 rounded-lg text-center">
            <label className="block mb-2 font-medium">Attach file (max 32 MB)</label>
              <input
                type="file"
                accept=".pdf,.doc,.docx,.png,.jpg,.ppt,.pptx"
                onChange={handleFileChange}
                className="file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:bg-gold file:text-[#0a1628]"
              />
              {file && (
                <p className="mt-2 text-sm">
                  {file.name} ({(file.size / 1024).toFixed(1)} KB)
                </p>
              )}
              {uploadProgress > 0 && uploadProgress < 100 && (
                <progress value={uploadProgress} max={100} className="w-full mt-2" />
              )}
              {uploadProgress === 100 && (
                <p className="mt-2 text-green-400">Upload complete.</p>
              )}
              {uploadError && (
                <p className="mt-2 text-red-400">{uploadError}</p>
              )}
              {parsing && (
                <p className="mt-2 text-blue-400 animate-pulse">Detecting pages…</p>
              )}
            {fileUrl && (
              <p className="mt-2 text-gold">
                Uploaded: <a href={fileUrl} target="_blank" rel="noopener noreferrer" className="underline">view file</a>
              </p>
            )}
          </div>
            {/* Page selection (after file upload) */}
            {pdfPageCount > 0 && (
              <div className="mt-4">
                <p className="text-sm mb-2">Detected pages: {pdfPageCount}</p>
                <div className="flex gap-2 mb-2">
                  <label className="flex items-center"><input type="radio" name="printMode" value="entire" checked={printMode==="entire"} onChange={()=>setPrintMode("entire")} className="mr-1" /> Print entire file</label>
                  <label className="flex items-center"><input type="radio" name="printMode" value="selected" checked={printMode==="selected"} onChange={()=>setPrintMode("selected")} className="mr-1" /> Select pages</label>
                </div>
                {printMode==="selected" && (
                  <input type="text" placeholder="e.g. 1,3-5" value={selectedPages} onChange={e=>setSelectedPages(e.target.value)} className="w-full p-2 bg-white/5 rounded border border-white/10" />
                 )}
                   {rangeError && <p className="mt-1 text-red-400 text-sm">{rangeError}</p>}
              </div>
            )}
            {/* Submit button */}
          <button
            type="submit"
            disabled={submitting || parsing || !fileUrl || !payment || (delivery==="Delivery" && !( (building && room) || address )) || (printMode==="selected" && (pdfPageCount===0 || selectedPages.trim()==='' || effectivePages===0))}
            className="w-full py-3 bg-gold text-[#0a1628] font-bold rounded"
          >
            {submitting ? "Sending…" : "Place Order"}
          </button>
          {sendError && (
            <p className="mt-2 text-red-400">Failed to send – check connection and try again.</p>
          )}
        </form>
        {/* Success overlay */}
        <AnimatePresence>
          {orderPlaced && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[60] bg-black/70 flex items-center justify-center p-4"
            >
              <motion.div
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.95 }}
                className="glass-card max-w-lg w-full p-8 rounded-2xl bg-[#0a1628]/95 flex flex-col"
              >
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold">Order Confirmed</h2>
                  <button onClick={() => { resetForm(); setOrderPlaced(false); }} className="p-2 hover:bg-white/10 rounded-full">
                    <X />
                  </button>
                </div>
                <div className="text-center py-8">
                  <CheckCircle className="w-16 h-16 text-gold mx-auto mb-4" />
<p className="mb-4">Your printing order has been submitted. We'll contact you shortly.</p>
                      <p><strong>Delivery:</strong> {delivery}</p>
                      {delivery === "Delivery" && (
                        <p><strong>Location:</strong> {address || `${building}, ${room}`}</p>
                      )}
<p><strong>Payment:</strong> {payment}</p>
                      {payment === "GCash" && (
                        <div className="p-4 bg-[#0e1f38] border border-white/10 rounded-lg text-center mt-2 animate-in fade-in duration-300">
                          <p className="text-white mb-3 font-medium">Scan to Pay via GCash</p>
                          <img src="/sslg-items/gcash.jpg" alt="GCash QR" className="mx-auto w-32 h-32 rounded border-2 border-gold" />
                          <p className="text-white/80 text-xs mt-3">Please send your payment screenshot via private message to an SSLG officer.</p>
                        </div>
                      )}
                      <p className="mt-2"><strong>File name:</strong> {originalFileName}</p>
                      <p className="mt-2"><strong>File URL:</strong>{' '}<a href={fileUrl} target="_blank" rel="noopener noreferrer" className="underline text-gold">View uploaded file</a></p>
                      <button
                        onClick={() => { resetForm(); setOrderPlaced(false); }}
                        className="mt-4 w-full py-2 bg-gold text-[#0a1628] font-bold rounded"
                      >
                        Close
                      </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default Printing;
