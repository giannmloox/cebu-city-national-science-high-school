import re
import unicodedata

def strip_unicode_bold(text):
    if not text: return ""
    text = unicodedata.normalize('NFKD', text)
    return "".join([c for c in text if ord(c) < 128])

def sanitize_text(text, is_title=False):
    text = strip_unicode_bold(text)
    text = text.replace('\\', '/').replace('`', "'").replace('"', "'")
    if is_title:
        return text.split('\n')[0][:50].strip()
    return text[:150].strip()

# Editorial Details
new_title = sanitize_text("KOLUM | Pag-asa ang Itinanim, Katahimikan ang Inani", is_title=True)
new_excerpt = sanitize_text("Dala ang pagod, pamasahe, at pag-asa, bumiyahe ang mga magsasaka patungong Maynila upang sa wakas ay marinig ang kanilang hinaing sa Senado.")
new_link = "https://www.facebook.com/share/p/18phdVgDCF/"
image_filename = "/Tinig-51826.jpg"

file_path = 'src/components/NewsSection.tsx'
with open(file_path, 'r', encoding='utf-8') as f: content = f.read()

# Pattern for the first item of tinigIskolar
start_pattern = "const tinigIskolar: NewsItem[] = ["
start_idx = content.find(start_pattern)
first_card_start = content.find("{", start_idx)
first_card_end = content.find("},", first_card_start)

if first_card_start != -1 and first_card_end != -1:
    new_card_content = f"""  {{
    id: 1,
    date: "MAY 18, 2026",
    title: "{new_title}",
    excerpt: "{new_excerpt}",
    image: "{image_filename}",
    link: "{new_link}",
  }}"""
    
    content = content[:first_card_start] + new_card_content + content[first_card_end:]
    
    with open(file_path, 'w', encoding='utf-8') as f: f.write(content)
    print("SUCCESS: Tinig Iskolar updated.")
else:
    print("ERROR: Could not find tinigIskolar card pattern.")
