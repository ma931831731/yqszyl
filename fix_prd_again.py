import re

with open('new_prd.md', 'r', encoding='utf-8') as f:
    prd_content = f.read()

escaped_content = prd_content.replace('`', '\\`').replace('$', '\\$')

with open('src/components/MTManagement/SystemPRD.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace the PRD_MARKDOWN block
match = re.search(r'const PRD_MARKDOWN = `([\s\S]*?)`;\n\nexport const SystemPRD', content)
if match:
    new_content = content[:match.start()] + f"const PRD_MARKDOWN = `{escaped_content}`;\n\nexport const SystemPRD" + content[match.end():]
    with open('src/components/MTManagement/SystemPRD.tsx', 'w', encoding='utf-8') as f:
        f.write(new_content)
    print("Fixed SystemPRD.tsx successfully")
else:
    print("Failed to find regex match in SystemPRD.tsx")
