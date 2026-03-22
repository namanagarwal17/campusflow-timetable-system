import os
import re

def replace_colors(directory):
    for root, dirs, files in os.walk(directory):
        for file in files:
            if file.endswith('.jsx') or file.endswith('.css') or file.endswith('.html'):
                file_path = os.path.join(root, file)
                with open(file_path, 'r', encoding='utf-8') as f:
                    content = f.read()

                # Basic replacements
                new_content = content.replace('cyan-', 'blue-')
                new_content = new_content.replace('purple-', 'green-')
                
                # Also handle standalone words if any
                new_content = new_content.replace(' text-cyan', ' text-blue')
                new_content = new_content.replace(' text-purple', ' text-green')

                if new_content != content:
                    with open(file_path, 'w', encoding='utf-8') as f:
                        f.write(new_content)
                    print(f"Updated {file_path}")

if __name__ == "__main__":
    replace_colors(r"C:\Users\deepe\OneDrive\Desktop\CampusFlow\CampusFlow - Copy\frontend\src")
