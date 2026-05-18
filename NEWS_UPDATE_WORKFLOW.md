# News Update Workflow

When updating news sections (e.g., `tinigIskolar`), follow these steps to ensure consistency:

## 1. Input Format
When providing new content, always include the following fields:
- **Title:** The headline of the post.
- **Date:** Formatted as "MONTH DAY, YEAR" (e.g., "MAY 18, 2026").
- **Excerpt:** Brief summary (max 150 chars, sanitized text).
- **Image Path:** The filename of the uploaded image (e.g., "/Tinig-51826.jpg").
- **Link:** The Facebook post link.

## 2. Rotation Logic (Strict)
To keep the feed relevant, always follow this rotation pattern for the 3-card structure:
1. **New Item:** Inserted at ID 1.
2. **Shift:**
   - Previous Card 1 -> Becomes Card 2 (Update ID to 2).
   - Previous Card 2 -> Becomes Card 3 (Update ID to 3).
3. **Discard:** Previous Card 3 is removed.

## 3. Deployment Checklist
- [ ] Upload image to `public/` directory.
- [ ] Update `src/components/NewsSection.tsx` with new data and updated IDs.
- [ ] Sanitize text: remove backticks, backslashes, double quotes, and Facebook-specific special characters.
- [ ] Commit and push to main.
