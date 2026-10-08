import re

with open('src/components/MTManagement/SourceAppConfig.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Add MAIN_CATEGORIES_OPTIONS
if 'const MAIN_CATEGORIES_OPTIONS' not in content:
    content = content.replace('const APP_ICON_OPTIONS = [', 
        "const MAIN_CATEGORIES_OPTIONS = ['舆情类', '融媒体类', '境外类', '递归类', '政务类', '通用类'];\n\nconst APP_ICON_OPTIONS = [")

# 2. Add mainCategories to INITIAL_APP_CONFIGS (just copy syncCategories if it exists)
content = re.sub(r"syncCategories:\s*(\[.*?\]),", r"syncCategories: \1,\n    mainCategories: \1,", content)

# 3. Add mainCategories to snapshot in INITIAL_APP_CONFIGS
content = re.sub(r"description:\s*('.*?'),\s*\},", r"description: \1,\n          mainCategories: ['舆情类'],\n        },", content)

# 4. Form state
content = content.replace(
    "appIcon: 'alert',",
    "appIcon: 'alert',\n    mainCategories: [] as string[],"
)

# 5. handleOpenCreateModal
content = content.replace(
    "appIcon: 'alert',\n      status: 'active',",
    "appIcon: 'alert',\n      mainCategories: [],\n      status: 'active',"
)

# 6. handleOpenEditModal
content = content.replace(
    "appIcon: app.appIcon || 'alert',\n      status: app.status,",
    "appIcon: app.appIcon || 'alert',\n      mainCategories: app.mainCategories || [],\n      status: app.status,"
)

# 7. handleRollbackSnapshot
content = content.replace(
    "appIcon: log.snapshot.appIcon || 'alert',\n      status: log.snapshot.status,",
    "appIcon: log.snapshot.appIcon || 'alert',\n      mainCategories: log.snapshot.mainCategories || [],\n      status: log.snapshot.status,"
)

# 8. Add mainCategories to newApp
content = content.replace(
    "appIcon: formData.appIcon,",
    "appIcon: formData.appIcon,\n        mainCategories: formData.mainCategories,"
)

# 9. Add mainCategories to updateApp
content = content.replace(
    "appIcon: formData.appIcon,\n                status: formData.status,",
    "appIcon: formData.appIcon,\n                mainCategories: formData.mainCategories,\n                status: formData.status,"
)

# 10. Add mainCategories to snapshot when saving (create & update)
content = content.replace(
    "appIcon: formData.appIcon,\n          status: formData.status,",
    "appIcon: formData.appIcon,\n          mainCategories: formData.mainCategories,\n          status: formData.status,"
)
content = content.replace(
    "appIcon: formData.appIcon,\n            status: formData.status,",
    "appIcon: formData.appIcon,\n            mainCategories: formData.mainCategories,\n            status: formData.status,"
)

# 11. Add validation for mainCategories
validation_block = """
    // 2. 校验所属主分类
    if (!formData.mainCategories || formData.mainCategories.length === 0) {
      const errMsg = '请至少选择一个所属主分类';
      setModalError(errMsg);
      showToast(errMsg, 'warning');
      return;
    }
"""
content = content.replace(
    "// 2. 校验系统名称",
    validation_block + "\n    // 3. 校验系统名称"
)

# 12. Add change logs diff for mainCategories
changes_diff = """
      if (JSON.stringify(editingApp.mainCategories || []) !== JSON.stringify(formData.mainCategories)) {
        changes.push({
          field: 'mainCategories' as any,
          fieldLabel: '所属主分类',
          oldValue: (editingApp.mainCategories || []).join(', ') || '（空）',
          newValue: formData.mainCategories.join(', ') || '（空）',
        });
      }
"""
content = content.replace(
    "if (editingApp.appName !== formData.appName.trim()) {",
    changes_diff + "\n      if (editingApp.appName !== formData.appName.trim()) {"
)

# 13. Update AppChangeLogItem snapshot type in types/index.ts (We'll do this separately)

# 14. Table Header
content = content.replace(
    '<th className="py-3.5 px-4 font-bold text-slate-700 whitespace-nowrap min-w-[220px]">来源系统名称</th>',
    '<th className="py-3.5 px-4 font-bold text-slate-700 whitespace-nowrap min-w-[220px]">来源系统名称</th>\n                <th className="py-3.5 px-4 font-bold text-slate-700 min-w-[150px]">所属主分类</th>'
)

# 15. Table Cell
table_cell = """
                      {/* 1.5. 所属主分类 */}
                      <td className="py-3.5 px-4">
                        <div className="flex flex-wrap gap-1.5">
                          {row.mainCategories?.map((cat) => (
                            <span key={cat} className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-50 text-blue-600 border border-blue-200 whitespace-nowrap">
                              {cat}
                            </span>
                          ))}
                          {(!row.mainCategories || row.mainCategories.length === 0) && (
                            <span className="text-slate-400 text-xs">—</span>
                          )}
                        </div>
                      </td>
"""
content = content.replace(
    '<!-- INSERT_TABLE_CELL -->', # We will use a regex to insert after appName td
    table_cell
)
content = re.sub(
    r'(<td className="py-3\.5 px-4 font-bold text-slate-900">.*?</td>)',
    r'\1\n' + table_cell,
    content,
    flags=re.DOTALL | re.MULTILINE
)

# 16. Modal Form UI
form_ui = """
                {/* 新增：所属主分类（多选，可全选） */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-slate-700">所属主分类 <span className="text-rose-500">*</span></label>
                    <button
                      type="button"
                      onClick={() => {
                        if (formData.mainCategories.length === MAIN_CATEGORIES_OPTIONS.length) {
                          setFormData({ ...formData, mainCategories: [] });
                        } else {
                          setFormData({ ...formData, mainCategories: [...MAIN_CATEGORIES_OPTIONS] });
                        }
                      }}
                      className="text-[11px] text-blue-600 hover:text-blue-700 font-medium bg-blue-50 hover:bg-blue-100 px-2 py-0.5 rounded cursor-pointer transition-colors"
                    >
                      {formData.mainCategories.length === MAIN_CATEGORIES_OPTIONS.length ? '取消全选' : '全选'}
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2 p-3 bg-slate-50 border border-slate-200 rounded-xl">
                    {MAIN_CATEGORIES_OPTIONS.map((cat) => {
                      const isSelected = formData.mainCategories.includes(cat);
                      return (
                        <label
                          key={cat}
                          className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg cursor-pointer transition-all border text-xs font-medium ${
                            isSelected
                              ? 'bg-blue-50 border-blue-300 text-blue-700 shadow-2xs'
                              : 'bg-white border-slate-200 text-slate-600 hover:border-blue-300 hover:bg-blue-50/50'
                          }`}
                        >
                          <input
                            type="checkbox"
                            className="hidden"
                            checked={isSelected}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setFormData({ ...formData, mainCategories: [...formData.mainCategories, cat] });
                              } else {
                                setFormData({
                                  ...formData,
                                  mainCategories: formData.mainCategories.filter((c) => c !== cat),
                                });
                              }
                            }}
                          />
                          <div className={`w-3.5 h-3.5 rounded border flex items-center justify-center transition-colors ${
                            isSelected ? 'bg-blue-600 border-blue-600 text-white' : 'border-slate-300 bg-white'
                          }`}>
                            {isSelected && <Check className="w-2.5 h-2.5" />}
                          </div>
                          <span>{cat}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>
"""
content = content.replace(
    '</label>\n                  </div>\n                </div>\n\n                {/* 启用/关停状态 */}',
    '</label>\n                  </div>\n                </div>\n\n' + form_ui + '\n                {/* 启用/关停状态 */}'
)

with open('src/components/MTManagement/SourceAppConfig.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Patched SourceAppConfig.tsx")
