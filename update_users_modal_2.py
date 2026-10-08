import re

with open('src/components/MTManagement/CustomerCategoryManagement.tsx', 'r') as f:
    content = f.read()

# Replace the inline list for 'self'
old_self_inline = """                  {/* 仅本人可见：单选本机构人员面板 */}
                  {formVisibilityRange === 'self' && (
                    <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-xl space-y-2 animate-in fade-in duration-200">
                      <div className="text-[11px] font-bold text-slate-700 flex items-center justify-between">
                        <span>单选本机构可见人员（仅限1人）：</span>
                        <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                          当前选定: {formVisibleStaff[0] || '未选择'}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto p-1 border border-slate-200/40 rounded-lg bg-white">
                        {getOrgStaffList(formCustomerOrg).map((staff) => {
                          const isSelected = formVisibleStaff[0] === staff;
                          return (
                            <label
                              key={staff}
                              className={`flex items-center gap-2 p-1.5 rounded-md border cursor-pointer select-none transition-all ${
                                isSelected
                                  ? 'bg-emerald-50 border-emerald-300 text-emerald-800 font-bold shadow-2xs'
                                  : 'bg-white border-slate-100 hover:border-slate-200 text-slate-600'
                              }`}
                            >
                              <input
                                type="radio"
                                name="formVisibleStaffSelf"
                                checked={isSelected}
                                onChange={() => {
                                  setFormVisibleStaff([staff]);
                                }}
                                className="w-3.5 h-3.5 text-emerald-600 focus:ring-emerald-500/20 shrink-0"
                              />
                              <div className="flex items-center gap-1.5 min-w-0">
                                <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-[10px] font-bold shrink-0">
                                  {staff.charAt(0)}
                                </div>
                                <span className="text-[11px] truncate">{staff}</span>
                              </div>
                            </label>
                          );
                        })}
                      </div>
                      {formVisibleStaff.length === 0 && (
                        <p className="text-[10px] text-rose-500 font-medium">
                          ⚠️ 请单选本机构1名可见人员
                        </p>
                      )}
                    </div>
                  )}"""

new_self_inline = """                  {/* 仅本人可见：单选本机构人员面板 */}
                  {formVisibilityRange === 'self' && (
                    <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-xl space-y-2 animate-in fade-in duration-200">
                      <div className="flex items-center justify-between">
                        <div className="text-[11px] font-bold text-slate-700">已选可见人员 (1人)：</div>
                        <button
                          type="button"
                          onClick={() => {
                            setTempVisibleStaff(formVisibleStaff);
                            setSearchUserQuery('');
                            setIsSelectUserModalOpen(true);
                          }}
                          className="px-2.5 py-1 text-[10px] font-bold text-blue-600 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-md transition-colors"
                        >
                          修改人员
                        </button>
                      </div>
                      {formVisibleStaff.length > 0 ? (
                        <div className="flex flex-wrap gap-2">
                          {formVisibleStaff.map(staff => (
                            <div key={staff} className="flex items-center gap-1.5 px-2 py-1 bg-white border border-slate-200 rounded-md shadow-sm">
                              <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-[10px] font-bold shrink-0">
                                {staff.charAt(0)}
                              </div>
                              <span className="text-xs text-slate-700 font-medium">{staff}</span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-[10px] text-rose-500 font-medium">⚠️ 请选择本机构1名可见人员</p>
                      )}
                    </div>
                  )}"""

content = content.replace(old_self_inline, new_self_inline)

# Replace the inline list for 'specific'
old_specific_inline = """                  {/* 指定人可见：多选本机构人员面板 */}
                  {formVisibilityRange === 'specific' && (
                    <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-xl space-y-2 animate-in fade-in duration-200">
                      <div className="text-[11px] font-bold text-slate-700 flex items-center justify-between">
                        <span>多选本机构指定可见人员：</span>
                        <span className="text-[10px] text-blue-700 font-bold bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                          已勾选 {formVisibleStaff.length} 人
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto p-1 border border-slate-200/40 rounded-lg bg-white">
                        {getOrgStaffList(formCustomerOrg).map((staff) => {
                          const isChecked = formVisibleStaff.includes(staff);
                          return (
                            <label
                              key={staff}
                              className={`flex items-center gap-2 p-1.5 rounded-md border cursor-pointer select-none transition-all ${
                                isChecked
                                  ? 'bg-blue-50 border-blue-200 text-blue-700 font-semibold'
                                  : 'bg-white border-slate-100 hover:border-slate-200 text-slate-600'
                              }`}
                            >
                              <input
                                type="checkbox"
                                checked={isChecked}
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    setFormVisibleStaff((prev) => [...prev, staff]);
                                  } else {
                                    setFormVisibleStaff((prev) => prev.filter((s) => s !== staff));
                                  }
                                }}
                                className="w-3.5 h-3.5 rounded text-blue-600 focus:ring-blue-500/20 shrink-0"
                              />
                              <div className="flex items-center gap-1.5 min-w-0">
                                <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-[10px] font-bold shrink-0">
                                  {staff.charAt(0)}
                                </div>
                                <span className="text-[11px] truncate">{staff}</span>
                              </div>
                            </label>
                          );
                        })}
                      </div>
                      {formVisibleStaff.length === 0 && (
                        <p className="text-[10px] text-rose-500 font-medium">
                          ⚠️ 请至少勾选一位可见人员
                        </p>
                      )}
                    </div>
                  )}"""

new_specific_inline = """                  {/* 指定人可见：多选本机构人员面板 */}
                  {formVisibilityRange === 'specific' && (
                    <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-xl space-y-2 animate-in fade-in duration-200">
                      <div className="flex items-center justify-between">
                        <div className="text-[11px] font-bold text-slate-700">已选可见人员 ({formVisibleStaff.length}人)：</div>
                        <button
                          type="button"
                          onClick={() => {
                            setTempVisibleStaff([...formVisibleStaff]);
                            setSearchUserQuery('');
                            setIsSelectUserModalOpen(true);
                          }}
                          className="px-2.5 py-1 text-[10px] font-bold text-blue-600 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-md transition-colors"
                        >
                          修改人员
                        </button>
                      </div>
                      {formVisibleStaff.length > 0 ? (
                        <div className="flex flex-wrap gap-2">
                          {formVisibleStaff.map(staff => (
                            <div key={staff} className="flex items-center gap-1.5 px-2 py-1 bg-white border border-slate-200 rounded-md shadow-sm">
                              <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-[10px] font-bold shrink-0">
                                {staff.charAt(0)}
                              </div>
                              <span className="text-xs text-slate-700 font-medium">{staff}</span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-[10px] text-rose-500 font-medium">⚠️ 请至少勾选一位可见人员</p>
                      )}
                    </div>
                  )}"""

content = content.replace(old_specific_inline, new_specific_inline)

with open('src/components/MTManagement/CustomerCategoryManagement.tsx', 'w') as f:
    f.write(content)

print("step 2 done")
