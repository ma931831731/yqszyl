import re

with open('src/types/index.ts', 'r') as f:
    content = f.read()

old_tab = """export type ActiveTab = 
  | 'dashboard'
  | 'category-management'
  | 'customer-category-management'
  | 'customer-favorite-data'
  | 'source-app-config'
  | 'database-docs'
  | 'system-functions-docs';"""

new_tab = """export type ActiveTab = 
  | 'dashboard'
  | 'category-management'
  | 'customer-category-management'
  | 'customer-favorite-data'
  | 'source-app-config'
  | 'database-docs'
  | 'system-functions-docs'
  | 'system-prd';"""

content = content.replace(old_tab, new_tab)

with open('src/types/index.ts', 'w') as f:
    f.write(content)

print("done")
