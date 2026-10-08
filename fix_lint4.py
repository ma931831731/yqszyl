with open('src/components/MTManagement/SourceAppConfig.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

import re

# Fix 1: Remove the rogue `mainCategories: [] as string[],`
content = content.replace("    mainCategories: [] as string[],", "")
# Wait, I DO need it inside `formData` state!
# Let's add it back specifically inside `useState({`
content = content.replace("appIcon: 'alert',\n    status: 'active' as 'active' | 'disabled',", "appIcon: 'alert',\n    mainCategories: [] as string[],\n    status: 'active' as 'active' | 'disabled',")


# Fix 2: Remove `mainCategories: formData.mainCategories,` that is misplaced at line 241
# "mainCategories: formData.mainCategories," is placed under APP-1003 inside INITIAL_APP_CONFIGS!
# This is because I replaced `syncCategories: ['舆情类'],\n        mainCategories: ['舆情类'],` without bounding it to `newApp`.
content = content.replace("syncCategories: ['舆情类'],\n        mainCategories: formData.mainCategories,", "syncCategories: ['舆情类'],\n    mainCategories: ['舆情类'],")

# Wait, `newApp` actually needs `mainCategories: formData.mainCategories,`. Let's just put it back for newApp.
content = re.sub(
    r"(const newApp: SourceAppConfigItem = \{[\s\S]*?)syncCategories: \['舆情类'\],\n\s*mainCategories: \['舆情类'\],",
    r"\1syncCategories: ['舆情类'],\n        mainCategories: formData.mainCategories,",
    content
)

with open('src/components/MTManagement/SourceAppConfig.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

