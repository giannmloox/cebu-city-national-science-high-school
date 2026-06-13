import os
import shutil
import re

SOURCE_BASE = "/home/m-loox/Downloads/cebu-city-national-science-high-school-main/CCNSHS WEBSITE"
TSX_FILE = "src/components/NewsSection.tsx"
PUBLIC_DIR = "public"

FOLDER_MAP = {
    "Scholars Voice": "scholarsVoice",
    "School News": "schoolNews",
    "Tinig Iskolar": "tinigIskolar"
}

def manage_news():
    for folder_name, array_name in FOLDER_MAP.items():
        folder_path = os.path.join(SOURCE_BASE, folder_name)
        if not os.path.exists(folder_path): continue
        
        files = sorted([f for f in os.listdir(folder_path) if f.lower().endswith(('.jpg', '.jpeg', '.png'))],
                       key=lambda x: os.path.getmtime(os.path.join(folder_path, x)))
        
        if not files: continue
        
        new_img = files[-1]
        print(f"Found new image in {folder_name}: {new_img}")
        
        confirm = input(f"Proceed with updating {array_name} using {new_img}? (y/n): ")
        if confirm.lower() != 'y': continue

        # 1. Update file list (Delete oldest)
        if len(files) > 1:
            os.remove(os.path.join(folder_path, files[0]))
            print(f"Deleted oldest asset: {files[0]}")
        
        # 2. Move new image to public
        shutil.copy(os.path.join(folder_path, new_img), os.path.join(PUBLIC_DIR, new_img))
        os.remove(os.path.join(folder_path, new_img))

        # 3. Update TSX
        with open(TSX_FILE, 'r', encoding='utf-8') as f: content = f.read()
        
        start_pattern = f"const {array_name}: NewsItem[] = ["
        start_idx = content.find(start_pattern)
        end_idx = content.find("];", start_idx)
        
        if start_idx != -1 and end_idx != -1:
            block = content[start_idx + len(start_pattern):end_idx]
            items = re.findall(r'\{.*?\}', block, re.DOTALL)
            
            # Shift Logic: Remove last, insert new at pos 0
            if len(items) >= 3: items.pop(-1)
            
            new_card = f"""  {{
    id: 1,
    date: "",
    title: "",
    excerpt: "",
    image: "/{new_img}",
    link: "",
  }}"""
            items = [new_card] + items
            
            # Re-index
            final_items = []
            for i, item in enumerate(items):
                final_items.append(re.sub(r'id: \d+', f'id: {i+1}', item))
            
            replacement = "\n" + ",\n".join(final_items) + ",\n"
            content = content[:start_idx + len(start_pattern)] + replacement + content[end_idx:]
            
            with open(TSX_FILE, 'w', encoding='utf-8') as f: f.write(content)
            print(f"SUCCESS: {array_name} updated.")

if __name__ == "__main__":
    manage_news()
