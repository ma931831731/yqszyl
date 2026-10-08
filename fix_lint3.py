with open('src/components/MTManagement/SourceAppConfig.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

import re

# Fix error 1117: duplicates
# It looks like I duplicated mainCategories under snapshot.
# Let's remove the duplicated mainCategories in snapshot.
content = re.sub(
    r"description:\s*'([^']+)',\n\s*mainCategories:\s*\['舆情类'\],\n\s*mainCategories:\s*\['舆情类'\],",
    r"description: '\1',\n          mainCategories: ['舆情类'],",
    content
)

# Actually, the error might be something else. Let's just remove ALL `mainCategories: ['舆情类'],` if it's duplicated in the same block.
# Let's do a smarter replace.
content = re.sub(
    r"(mainCategories:\s*\[[^\]]*\],)\s*mainCategories:\s*\[[^\]]*\],",
    r"\1",
    content
)

with open('src/components/MTManagement/SourceAppConfig.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

