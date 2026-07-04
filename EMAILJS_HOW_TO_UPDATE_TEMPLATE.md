# How to Update EmailJS Template for Printing Receipts

## You MUST do this once on emailjs.com

Both the Shop and Printing code send order data via EmailJS to the same template (`template_e6j3smf`). Currently that template does NOT display `file_name` or `items`. You need to update the template so it renders these new fields.

This change only happens on the EmailJS website — **no code redeploy required.**

### 📌 Before You Start

**What you will have after you update the template:**
- Email receipts show: **File name:** and a clickable **View uploaded file** link under "Items"
- Upload.io dashboard stores customer metadata so you can open any file and see: student name, grade, contact
- Both forms continue working in the same template

---

## 🔧 Step 1 – Open EmailJS Dashboard

1. Go to: https://www.emailjs.com/
2. Sign in to your account
3. In the left sidebar, click **Email Templates** (not "Email Services")

   ![Email Templates location](https://i.imgur.com/XYZ1234.png)

4. Find and click **`template_e6j3smf`** (the one used for both Shop & Printing)

   > ⚠️ **Don’t create a new template — use the existing one!**

5. Click **Edit** to load the template editor


---

## 📝 Step 2 – Replace the Entire Template Body

> ⚠️ **Attention**: The current template probably uses placeholders like `{customer_name}` and `{total}`. Do NOT delete these. Just paste the HTML snippet below **around or below** the existing placeholders so the file information appears near the end of the receipt, still above the footer.


Copy the entire block below and **paste it into the template body editor** where you want the file link to appear (preferably under the `Items:` field section, or just before the footer divider `---`).


```html
<p><strong>File name:</strong> {file_name}</p>
<p><strong>Items:</strong> {items}</p>
<!-- Continue to next line for the clickable link -->
{{if file_link_html}}
<p style="margin-top: 8px;">
  <a href="{file_link}" target="_blank" rel="noopener noreferrer" style="color: #ffd700; text-decoration: underline; font-weight: 500;">
    View uploaded file
  </a>
</p>
{{/if}}
```

> 📝 You can wrap it in a `<div>` or keep it separate, as long as it is inside the template body.


---

## 🎯 Step 3 – Save the Template

1. Click the **Save** (or **Update**) button
2. Wait for confirmation: "Template saved successfully."

---

## ✅ Step 4 – Test Immediately

1. In your browser, open the **Printing page** or go back to the student dashboard
2. Fill and submit a test order with a file attached
3. Check your inbox for the receipt email
4. The email should now show something like:

```
New SSLG Order!
Customer: Giann Grade & Section: Grade 8 - Averrhoa
Contact: 21323 Delivery: Pickup at School Payment: COD
…
**Items:**
File name: Essay.pdf
File uploaded: Essay.pdf — https://upcdn.io/W2V5LDh/downloads/Homework10.pdf
View uploaded file ← (clickable link)
Subtotal: ₱36
Delivery Fee: ₱0
Total: ₱36
```

> 👉 If it doesn’t appear, you pasted the HTML in the wrong place.

---

## 📊 Step 5 – See Customer Info in Upload.io Dashboard

1. Open https://upload.io/dashboard → your files
2. Click any file that starts with a random string (e.g., `a1b2c3…`)
3. Click the **Metadata** tab
   You’ll now see:

```json
{
  "originalFilename": "Essay.pdf",
  "customer_name": "Gian",
  "grade_section": "Grade 8 - Averrhoa",
  "contact_number": "21323",
  "file_extracted_at": "2025-07-04T22:26:00.000Z"
}
```

> ✨ Now you know exactly **who uploaded each file** without needing to coordinate between spreadsheets and dashboards.

---

## 🛠 Troubleshooting

**Issue:** The email still doesn’t show the file info.
- ✅ Make sure you **saved** the template
- ✅ Refresh your inbox — sometimes the old template is cached on the ESP side
- ✅ Make a new test order — only new commits will pick up the new template
- ✅ Check the EmailJS template preview button inside their editor — if it shows correctly there, but not in inbox, the problem is your mail server caching

---

## ✨ Done — You’re set!

- ✅ Receipt emails show the file name & direct link
- ✅ Upload.io files carry customer metadata so you can identify uploads instantly
- ✅ No more back-and-forth asking “which student uploaded which file?”
- ✅ Both Shop and Printing orders continue working from the same template
