import re

# New Editorial Content
new_title = "EDITORIAL | Pilipinas, Muling Mangangarap ng Dating Pinangarap"
new_excerpt = "Hindi maaaring dito na lamang hihinto ang laban ng sambayanan. Hangga't may natitirang pag-asa, nananatiling buhay ang paninindigan na huwag talikuran ang bayan."
new_link = "https://www.facebook.com/share/p/17P7HqnCjG/"

file_path = 'src/components/NewsSection.tsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Pattern for the first item of tinigIskolar
start_pattern = "const tinigIskolar: NewsItem[] = ["
start_idx = content.find(start_pattern)
first_card_start = content.find("{", start_idx)
first_card_end = content.find("},", first_card_start)

if first_card_start != -1 and first_card_end != -1:
    # Build updated card
    new_card_content = f"""  {{
    id: 1,
    date: "MAY 18, 2026",
    title: "{new_title}",
    excerpt: "{new_excerpt}",
    image: "/Tinig-51626.jpg",
    link: "{new_link}",
  }}"""
    
    content = content[:first_card_start] + new_card_content + content[first_card_end:]
    
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)
    print("SUCCESS: Editorial updated in NewsSection.tsx")
else:
    print("ERROR: Could not find tinigIskolar card pattern.")
