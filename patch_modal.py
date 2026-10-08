import re

with open('src/components/MTManagement/SourceAppConfig.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

form_ui = """
                {/* 2.5 新增：所属主分类（多选，可全选） */}
                <div className="space-y-1.5 pt-1">
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
    "{/* 3. 启用/关停状态开关 */}",
    form_ui + "\n                {/* 3. 启用/关停状态开关 */}"
)

with open('src/components/MTManagement/SourceAppConfig.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Modal UI Patched")
