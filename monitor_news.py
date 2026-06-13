import time
import os
import shutil
import re
import subprocess
from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler

SOURCE_BASE = "/home/m-loox/Downloads/cebu-city-national-science-high-school-main/CCNSHS WEBSITE"
TSX_FILE = "src/components/NewsSection.tsx"
PUBLIC_DIR = "public"

FOLDER_MAP = {
    "Scholars Voice": "scholarsVoice",
    "School News": "schoolNews",
    "Tinig Iskolar": "tinigIskolar"
}

class NewsHandler(FileSystemEventHandler):
    def on_created(self, event):
        if event.is_directory: return
        filename = os.path.basename(event.src_path)
        if not filename.lower().endswith(('.jpg', '.jpeg', '.png')): return
        
        folder_name = os.path.basename(os.path.dirname(event.src_path))
        if folder_name not in FOLDER_MAP: return
        
        print(f"New image detected in {folder_name}: {filename}")
        self.process_change(folder_name, FOLDER_MAP[folder_name], event.src_path, filename)

    def process_change(self, folder_name, array_name, src_path, filename):
        # 1. Wait a bit for file copy to complete
        time.sleep(2)
        
        # 2. Move to public
        dest_path = os.path.join(PUBLIC_DIR, filename)
        shutil.copy(src_path, dest_path)
        
        # 3. Update TSX
        with open(TSX_FILE, 'r', encoding='utf-8') as f: content = f.read()
        
        start_pattern = f"const {array_name}: NewsItem[] = ["
        start_idx = content.find(start_pattern)
        end_idx = content.find("];", start_idx)
        
        if start_idx != -1 and end_idx != -1:
            block = content[start_idx + len(start_pattern):end_idx]
            items = re.findall(r'\{.*?\}', block, re.DOTALL)
            if len(items) >= 3: items.pop(-1)
            
            new_card = f'  {{\n    id: 1,\n    date: "",\n    title: "",\n    excerpt: "",\n    image: "/{filename}",\n    link: "",\n  }}'
            items = [new_card] + [re.sub(r'id: \d+', f'id: {i+2}', item) for i, item in enumerate(items)]
            
            content = content[:start_idx + len(start_pattern)] + "\n" + ",\n".join(items) + ",\n" + content[end_idx:]
            with open(TSX_FILE, 'w', encoding='utf-8') as f: f.write(content)
            
            # 4. Commit and Push
            subprocess.run(["git", "add", TSX_FILE, dest_path])
            subprocess.run(["git", "commit", "-m", f"Automated: Update {array_name} news card"])
            subprocess.run(["git", "push"])
            print("Successfully updated and pushed.")

if __name__ == "__main__":
    observer = Observer()
    handler = NewsHandler()
    observer.schedule(handler, SOURCE_BASE, recursive=True)
    observer.start()
    try:
        while True: time.sleep(1)
    except KeyboardInterrupt:
        observer.stop()
    observer.join()
