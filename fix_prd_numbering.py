with open("src/components/MTManagement/SystemPRD.tsx", "r", encoding="utf-8") as f:
    content = f.read()

content = content.replace("### 5.1 收藏与取消收藏", "### 4.1 收藏与取消收藏")

with open("src/components/MTManagement/SystemPRD.tsx", "w", encoding="utf-8") as f:
    f.write(content)

print("Fixed cascading bug 2")
