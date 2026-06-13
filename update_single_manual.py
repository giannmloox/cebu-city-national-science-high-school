import os
import shutil
import re

# Update details
ARRAY_NAME = "tinigIskolar"
IMAGE_FILENAME = "Tinig-51626.jpg"
SOURCE_PATH = "/home/m-loox/Downloads/cebu-city-national-science-high-school-main/CCNSHS WEBSITE/Tinig Iskolar/Tinig-51626.jpg"
TSX_FILE = "src/components/NewsSection.tsx"
PUBLIC_DIR = "public"

# 1. Move image
shutil.copy(SOURCE_PATH, os.path.join(PUBLIC_DIR, IMAGE_FILENAME))

# 2. Update TSX
with open(TSX_FILE, 'r', encoding='utf-8') as f: content = f.read()

start_pattern = f"const {ARRAY_NAME}: NewsItem[] = ["
start_idx = content.find(start_pattern)
end_idx = content.find("];", start_idx)

if start_idx != -1 and end_idx != -1:
    block = content[start_idx + len(start_pattern):end_idx]
    items = re.findall(r'\{.*?\}', block, re.DOTALL)
    
    # Shift Logic: Remove oldest (item index 2), insert new at 0
    if len(items) >= 3: items.pop(2)
    
    new_card = f'  {{\n    id: 1,\n    date: "",\n    title: "",\n    excerpt: "",\n    image: "/{IMAGE_FILENAME}",\n    link: "",\n  }}'
    items = [new_card] + [re.sub(r'id: \d+', f'id: {i+2}', item) for i, item in enumerate(items)]
    
    replacement = "\n" + ",\n".join(items) + ",\n"
    content = content[:start_idx + len(start_pattern)] + replacement + content[end_idx:]
    
    with open(TSX_FILE, 'w', encoding='utf-8') as f: f.write(content)
    print(f"SUCCESS: {ARRAY_NAME} updated with {IMAGE_FILENAME}.")
else:
    print("ERROR: Pattern not found.")
