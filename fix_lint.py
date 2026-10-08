with open('src/components/MTManagement/SourceAppConfig.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

import re

# Remove the duplicated mainCategories: [] as string[] from root INITIAL_APP_CONFIGS objects
content = re.sub(
    r"appIcon:\s*'[^']+',\n\s*mainCategories:\s*\[\]\s*as\s*string\[\],\n\s*apiKey:",
    lambda m: m.group(0).replace("\n    mainCategories: [] as string[],", ""),
    content
)

with open('src/components/MTManagement/SourceAppConfig.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Fixed lint")
