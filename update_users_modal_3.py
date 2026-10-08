import re

with open('src/components/MTManagement/CustomerCategoryManagement.tsx', 'r') as f:
    content = f.read()

modal_code = """
      {/* ================= User Selection Modal ================= */}
      {isSelectUserModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center">
          <div
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            onClick={() => setIsSelectUserModalOpen(false)}
          />
          <div className="relative bg-white rounded-2xl w-full max-w-4xl shadow-2xl flex flex-col max-h-[85vh] animate-in fade-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-[17px] font-extrabold text-slate-800 flex items-center gap-2">
                    选择【{formCustomerOrg}】的 V8 用户
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    请{formVisibilityRange === 'self' ? '单选' : '多选'}专属可见用户，配置完成后仅该用户有权查阅并使用此标签组
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsSelectUserModalOpen(false)}
                className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Search */}
            <div className="px-6 py-4 border-b border-slate-50">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="搜索用户姓名、微信昵称、部门或手机号..."
                  className="w-full h-10 pl-10 pr-4 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all"
                  value={searchUserQuery}
                  onChange={(e) => setSearchUserQuery(e.target.value)}
                />
              </div>
            </div>

            {/* Table */}
            <div className="flex-1 overflow-y-auto px-6 py-2">
              <table className="w-full text-left text-sm">
                <thead className="sticky top-0 bg-white/95 backdrop-blur z-10 text-slate-500 font-bold border-b border-slate-100">
                  <tr>
                    <th className="py-3 px-2 w-16 text-center">{formVisibilityRange === 'self' ? '单选' : '多选'}</th>
                    <th className="py-3 px-2 min-w-[200px]">用户姓名 (头像)</th>
                    <th className="py-3 px-2">微信昵称</th>
                    <th className="py-3 px-2 min-w-[150px]">部门 / 职务</th>
                    <th className="py-3 px-2">联系手机</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {getOrgStaffList(formCustomerOrg)
                    .filter((staff) => {
                      const detail = getStaffDetail(staff, formCustomerOrg);
                      const q = searchUserQuery.toLowerCase();
                      if (!q) return true;
                      return (
                        detail.name.toLowerCase().includes(q) ||
                        detail.nickname.toLowerCase().includes(q) ||
                        detail.dept.toLowerCase().includes(q) ||
                        detail.job.toLowerCase().includes(q) ||
                        detail.phone.includes(q)
                      );
                    })
                    .map((staff) => {
                      const detail = getStaffDetail(staff, formCustomerOrg);
                      const isSelected = tempVisibleStaff.includes(staff);
                      return (
                        <tr
                          key={staff}
                          onClick={() => {
                            if (formVisibilityRange === 'self') {
                              setTempVisibleStaff([staff]);
                            } else {
                              if (isSelected) {
                                setTempVisibleStaff((prev) => prev.filter((s) => s !== staff));
                              } else {
                                setTempVisibleStaff((prev) => [...prev, staff]);
                              }
                            }
                          }}
                          className={`cursor-pointer transition-colors ${
                            isSelected ? 'bg-purple-50/50' : 'hover:bg-slate-50'
                          }`}
                        >
                          <td className="py-4 px-2 text-center">
                            {formVisibilityRange === 'self' ? (
                              <div
                                className={`w-4 h-4 rounded-full border flex items-center justify-center mx-auto ${
                                  isSelected ? 'border-purple-600' : 'border-slate-300'
                                }`}
                              >
                                {isSelected && <div className="w-2 h-2 rounded-full bg-purple-600" />}
                              </div>
                            ) : (
                              <div
                                className={`w-4 h-4 rounded border flex items-center justify-center mx-auto ${
                                  isSelected ? 'bg-purple-600 border-purple-600 text-white' : 'border-slate-300 bg-white'
                                }`}
                              >
                                {isSelected && <Check className="w-3 h-3" strokeWidth={3} />}
                              </div>
                            )}
                          </td>
                          <td className="py-4 px-2">
                            <div className="flex items-center gap-3">
                              {/* Avatar */}
                              <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 font-bold flex items-center justify-center text-xs overflow-hidden shrink-0">
                                {detail.name.charAt(0)}
                              </div>
                              <div className="flex flex-col">
                                <div className="flex items-center gap-1.5">
                                  <span className="font-bold text-slate-800">{detail.name}</span>
                                  {isSelected && (
                                    <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-purple-100 text-purple-700">当前选中</span>
                                  )}
                                </div>
                                <span className="text-[11px] text-slate-400 mt-0.5">{detail.org}</span>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-2 text-slate-600 text-[13px]">{detail.nickname}</td>
                          <td className="py-4 px-2 flex flex-col">
                            <span className="text-slate-700 font-semibold text-[13px]">{detail.dept}</span>
                            <span className="text-slate-400 text-[11px] mt-0.5">{detail.job}</span>
                          </td>
                          <td className="py-4 px-2 text-slate-500 font-mono text-[13px]">{detail.phone}</td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>

            {/* Bottom Bar */}
            <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between bg-slate-50 rounded-b-2xl">
              <div className="text-sm text-slate-600 flex items-center gap-2">
                已选用户:
                <span className="font-bold text-purple-700">
                  {tempVisibleStaff.length > 0 ? tempVisibleStaff.map(s => {
                    const d = getStaffDetail(s, formCustomerOrg);
                    return `${d.name} (${d.nickname})`;
                  }).join(', ') : '暂无'}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsSelectUserModalOpen(false)}
                  className="px-5 py-2 rounded-xl border border-slate-200 bg-white text-slate-600 font-bold hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  取消
                </button>
                <button
                  onClick={() => {
                    setFormVisibleStaff(tempVisibleStaff);
                    setIsSelectUserModalOpen(false);
                  }}
                  className="px-5 py-2 rounded-xl bg-purple-600 text-white font-bold hover:bg-purple-700 transition-colors shadow-lg shadow-purple-600/20 cursor-pointer"
                >
                  确定选择
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};"""

content = content.replace("    </div>\n  );\n};", modal_code)

with open('src/components/MTManagement/CustomerCategoryManagement.tsx', 'w') as f:
    f.write(content)

print("step 3 done")
