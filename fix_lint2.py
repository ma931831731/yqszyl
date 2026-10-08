with open('src/components/MTManagement/SourceAppConfig.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

import re

# Remove the duplicated mainCategories: formData.mainCategories from newApp
content = re.sub(
    r"appIcon:\s*formData\.appIcon,\n\s*mainCategories:\s*formData\.mainCategories,\n\s*apiKey:",
    lambda m: m.group(0).replace("\n        mainCategories: formData.mainCategories,", ""),
    content
)

# And replace `mainCategories: ['舆情类'],` with `mainCategories: formData.mainCategories,` in newApp
content = re.sub(
    r"syncCategories:\s*\['舆情类'\],\n\s*mainCategories:\s*\['舆情类'\],",
    "syncCategories: ['舆情类'],\n        mainCategories: formData.mainCategories,",
    content
)

with open('src/components/MTManagement/SourceAppConfig.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Fixed lint2")
