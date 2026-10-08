with open('src/components/MTManagement/CategoryManagement.tsx', 'r') as f:
    content = f.read()

target = """                    {/* 调用唯一ID（整数数字） */}
                    <td className="py-3.5 px-4 text-center whitespace-nowrap">
                      <span className="inline-flex items-center justify-center min-w-[34px] px-2.5 py-1 rounded-md font-mono font-black text-xs bg-slate-100 text-slate-800 border border-slate-200 shadow-2xs">
                        {row.callId}
                      </span>
                    </td>"""

replacement = """                    {/* 调用唯一ID（整数数字） */}
                    <td className="py-3.5 px-4 text-center whitespace-nowrap">
                      <div className="flex items-center justify-center gap-2">
                        <div className="flex flex-col items-center gap-0.5">
                          <button
                            type="button"
                            onClick={() => handleMoveUp(index)}
                            disabled={index === 0}
                            className={`p-0.5 rounded transition-colors ${
                              index === 0
                                ? 'text-slate-300 cursor-not-allowed'
                                : 'text-slate-400 hover:text-blue-600 hover:bg-blue-50 cursor-pointer'
                            }`}
                          >
                            <ArrowUp className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleMoveDown(index)}
                            disabled={index === categories.length - 1}
                            className={`p-0.5 rounded transition-colors ${
                              index === categories.length - 1
                                ? 'text-slate-300 cursor-not-allowed'
                                : 'text-slate-400 hover:text-blue-600 hover:bg-blue-50 cursor-pointer'
                            }`}
                          >
                            <ArrowDown className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <span className="inline-flex items-center justify-center min-w-[34px] px-2.5 py-1 rounded-md font-mono font-black text-xs bg-slate-100 text-slate-800 border border-slate-200 shadow-2xs">
                          {row.callId}
                        </span>
                      </div>
                    </td>"""

content = content.replace(target, replacement)

with open('src/components/MTManagement/CategoryManagement.tsx', 'w') as f:
    f.write(content)

print("done")
