import json
import re
import os

# Configuration
IMAGE_NAME = "sv-uniform.jpg"
SOURCE_PATH = "/home/m-loox/Downloads/cebu-city-national-science-high-school-main/CCNSHS WEBSITE/Scholars Voice/sv-uniform.jpg"
TSX_FILE = "src/components/NewsSection.tsx"
PUBLIC_DIR = "public"

# Inputs
title = input("Enter Title: ")
link = input("Enter Link: ")
excerpt = input("Enter Excerpt (max 150 chars): ")
date = input("Enter Date (e.g., MAY 20, 2026): ")

# 1. Move image
import shutil
shutil.copy(SOURCE_PATH, os.path.join(PUBLIC_DIR, IMAGE_NAME))

# 2. Update TSX
with open(TSX_FILE, 'r', encoding='utf-8') as f: content = f.read()

start_pattern = "const scholarsVoice: NewsItem[] = ["
start_idx = content.find(start_pattern)
end_idx = content.find("];", start_idx)

if start_idx != -1 and end_idx != -1:
    block = content[start_idx + len(start_pattern):end_idx]
    items = re.findall(r'\{.*?\}', block, re.DOTALL)
    
    # Shift logic: remove oldest (index 2), insert new at 0
    if len(items) >= 3: items.pop(2)
    
    new_card = f'  {{\n    id: 1,\n    date: "{date}",\n    title: "{title}",\n    excerpt: "{excerpt}",\n    image: "/{IMAGE_NAME}",\n    link: "{link}",\n  }}'
    items = [new_card] + [re.sub(r'id: \d+', f'id: {i+2}', item) for i, item in enumerate(items)]
    
    replacement = "\n" + ",\n".join(items) + ",\n"
    content = content[:start_idx + len(start_pattern)] + replacement + content[end_idx:]
    
    with open(TSX_FILE, 'w', encoding='utf-8') as f: f.write(content)
    print("SUCCESS: NewsSection.tsx updated.")
