with open('src/components/MTManagement/SourceAppConfig.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Fix useState
content = content.replace(
    "appIcon: 'alert',\n\n    status: 'active' as 'active' | 'disabled',",
    "appIcon: 'alert',\n    mainCategories: [] as string[],\n    status: 'active' as 'active' | 'disabled',"
)

# Fix handleOpenCreateModal
content = content.replace(
    "appIcon: 'alert',\n\n      status: 'active',",
    "appIcon: 'alert',\n      mainCategories: [],\n      status: 'active',"
)

with open('src/components/MTManagement/SourceAppConfig.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Fixed modal bug")
