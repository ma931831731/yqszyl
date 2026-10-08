with open('src/components/MTManagement/CustomerCategoryManagement.tsx', 'r') as f:
    content = f.read()

target1 = """                        <div className="text-xs text-slate-500 truncate">
                          真实姓名: {staff} &nbsp;|&nbsp; 备注: 系统用户
                        </div>"""

replacement1 = """                        <div className="text-xs text-slate-500 truncate">
                          备注姓名: {staff}
                        </div>"""

content = content.replace(target1, replacement1)

target2 = """                              <input
                                type="radio"
                                name="formVisibleStaffSelf"
                                checked={isSelected}
                                onChange={() => {
                                  setFormVisibleStaff([staff]);
                                }}
                                className="w-3.5 h-3.5 text-emerald-600 focus:ring-emerald-500/20"
                              />
                              <span className="text-[11px] truncate">{staff}</span>"""

replacement2 = """                              <input
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
                              </div>"""

content = content.replace(target2, replacement2)

target3 = """                              <input
                                type="checkbox"
                                checked={isChecked}
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    setFormVisibleStaff((prev) => [...prev, staff]);
                                  } else {
                                    setFormVisibleStaff((prev) => prev.filter((s) => s !== staff));
                                  }
                                }}
                                className="w-3.5 h-3.5 rounded text-blue-600 focus:ring-blue-500/20"
                              />
                              <span className="text-[11px] truncate">{staff}</span>"""

replacement3 = """                              <input
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
                              </div>"""

content = content.replace(target3, replacement3)


with open('src/components/MTManagement/CustomerCategoryManagement.tsx', 'w') as f:
    f.write(content)

print("done")
