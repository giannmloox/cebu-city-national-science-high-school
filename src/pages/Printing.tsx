import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, X } from "lucide-react";
import Navbar from "@/components/Navbar";
import emailjs from "@emailjs/browser";
import { parsePageRange } from "@/lib/printingUtils";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf";

/* ---------- CONFIGURATION ---------- */
// TODO: replace these placeholder values with real credentials / pricing
const EMAILJS_SERVICE_ID = "service_bni5zql"; // same as shop
const EMAILJS_PUBLIC_KEY = "AeJN83U2A_THgdEyt"; // same as shop
const EMAILJS_TEMPLATE_ID = "template_printing_receipt"; // create a separate template in EmailJS for printing

const UPLOAD_IO_API_KEY = "public_G22njFq9x1f9KgqeoqHfTJUw1VdE";
const UPLOAD_IO_ACCOUNT_ID = "G22njFq";

// Pricing placeholders – replace with actual rates (PHP)
const B_W_PRICE_PER_PAGE = 5; // black & white price per page
const COLOR_PRICE_PER_PAGE = 6; // color price per page
const STAPLE_FEE = 2; // flat fee for stapling
const BIND_FEE = 5; // flat fee for binding

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

  const [file, setFile] = useState<File | null>(null);
  const [fileUrl, setFileUrl] = useState<string>("");
  const [uploadError, setUploadError] = useState<string>("");
  const [uploadProgress, setUploadProgress] = useState<number>(0);

  const [submitting, setSubmitting] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [sendError, setSendError] = useState(false);

  /* ---- price calculation ---- */
  const pricePerPage = color === "B&W" ? B_W_PRICE_PER_PAGE : COLOR_PRICE_PER_PAGE;

  // Parse selected pages (if any) and compute effective page count
  const { pages: selectedPageArray, error: rangeError } = printMode === "selected"
    ? parsePageRange(selectedPages, pdfPageCount)
    : { pages: [], error: undefined };
  const effectivePages = printMode === "selected" ? selectedPageArray.length : (pdfPageCount > 0 ? pdfPageCount : 1);

  const pagesSubtotal = pricePerPage * effectivePages * copies;
  const bindingFee = binding === "Stapled" ? STAPLE_FEE : binding === "Bound" ? BIND_FEE : 0;
  const total = pagesSubtotal + bindingFee;

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
    // Determine PDF page count if file is a PDF
if (selected.type === "application/pdf" || selected.name.toLowerCase().endsWith(".pdf")) {
        const reader = new FileReader();
        reader.onload = async () => {
          const arrayBuffer = reader.result as ArrayBuffer;
          try {
            // Use PDF.js with worker disabled to avoid loading issues in the Vite environment
            const pdf = await pdfjsLib.getDocument({ data: arrayBuffer, disableWorker: true }).promise;
            setPdfPageCount(pdf.numPages);
            setPrintMode("entire");
          } catch (err) {
            console.error("PDF parse error", err);
            setUploadError("Failed to read PDF – it may be corrupted.");
            setPdfPageCount(0);
          }
        };
        reader.readAsArrayBuffer(selected);
      } else {
      // Non‑PDF files: no page count information
      setPdfPageCount(0);
    }
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
      selected_pages: printMode === "selected" ? selectedPages : "",
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
            className="w-full p-2 bg-white/5 rounded border border-white/10"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="tel"
            placeholder="Contact Number"
            required
            className="w-full p-2 bg-white/5 rounded border border-white/10"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
          />
          {/* Grade & Section */}
          <div className="grid grid-cols-2 gap-4">
            <select
              required
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
          {/* Live total */}
          <div className="p-4 bg-white/5 rounded border border-white/10 text-sm">
            <p>
              <strong>Price per page:</strong> ₱{pricePerPage}
            </p>
            <p>
              <strong>Pages × Copies × Rate:</strong> ₱{pagesSubtotal}
            </p>
            {bindingFee > 0 && (
              <p>
                <strong>{binding} fee:</strong> ₱{bindingFee}
              </p>
            )}
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
            disabled={submitting || !fileUrl || (printMode==="selected" && (pdfPageCount===0 || selectedPages.trim()==='' || effectivePages===0))}
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
                  <button onClick={() => setOrderPlaced(false)} className="p-2 hover:bg-white/10 rounded-full">
                    <X />
                  </button>
                </div>
                <div className="text-center py-8">
                  <CheckCircle className="w-16 h-16 text-gold mx-auto mb-4" />
                  <p className="mb-4">Your printing order has been submitted. We'll contact you shortly.</p>
                  <button
                    onClick={() => setOrderPlaced(false)}
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
