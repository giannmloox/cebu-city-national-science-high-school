#!/bin/bash
cd /home/m-loox/cebu-city-national-science-high-school
python3 update_news.py
git add src/components/NewsSection.tsx
git commit -m "Automated: Update news from Facebook"
git push origin main
