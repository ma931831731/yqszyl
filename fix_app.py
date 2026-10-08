import re

with open('src/App.tsx', 'r') as f:
    content = f.read()

# Import SystemPRD
if 'import { SystemPRD }' not in content:
    content = content.replace("import { SystemFunctionsDocs } from './components/MTManagement/SystemFunctionsDocs';", 
                              "import { SystemFunctionsDocs } from './components/MTManagement/SystemFunctionsDocs';\nimport { SystemPRD } from './components/MTManagement/SystemPRD';")

# Render SystemPRD
if "activeTab === 'system-prd'" not in content:
    old_render = """          {activeTab === 'system-functions-docs' && (
            <SystemFunctionsDocs />
          )}"""
    new_render = old_render + """
          {activeTab === 'system-prd' && (
            <SystemPRD />
          )}"""
    content = content.replace(old_render, new_render)

with open('src/App.tsx', 'w') as f:
    f.write(content)

print("done")
