import re

with open('src/components/MTManagement/Sidebar.tsx', 'r') as f:
    content = f.read()

# Add FileText to lucide-react imports if it's not there
if 'FileText' not in content:
    content = content.replace("FileCode2,", "FileCode2,\n  FileText,")

old_sub_menu = """              <button
                type="button"
                onClick={() => onSelectTab('system-functions-docs')}
                className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-[12px] font-medium transition-all cursor-pointer text-left ${
                  activeTab === 'system-functions-docs'
                    ? 'bg-[#1a2b47] text-white font-bold shadow-2xs'
                    : 'text-slate-600 hover:bg-[#dce9f8] hover:text-slate-900'
                }`}
              >
                <div className="flex items-center gap-1.5 truncate">
                  <FileCode2 className="w-3.5 h-3.5 shrink-0 text-cyan-500" />
                  <span className="truncate">系统主要功能点的说明</span>
                </div>
                <span
                  className={`text-[9px] px-1 py-0.2 rounded font-mono shrink-0 ${
                    activeTab === 'system-functions-docs'
                      ? 'bg-cyan-700 text-cyan-100'
                      : 'bg-slate-200 text-slate-600'
                  }`}
                >
                  API
                </span>
              </button>"""

new_sub_menu = old_sub_menu + """
              <button
                type="button"
                onClick={() => onSelectTab('system-prd')}
                className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-[12px] font-medium transition-all cursor-pointer text-left ${
                  activeTab === 'system-prd'
                    ? 'bg-[#1a2b47] text-white font-bold shadow-2xs'
                    : 'text-slate-600 hover:bg-[#dce9f8] hover:text-slate-900'
                }`}
              >
                <div className="flex items-center gap-1.5 truncate">
                  <FileText className="w-3.5 h-3.5 shrink-0 text-cyan-500" />
                  <span className="truncate">系统需求说明书(PRD)</span>
                </div>
                <span
                  className={`text-[9px] px-1 py-0.2 rounded font-mono shrink-0 ${
                    activeTab === 'system-prd'
                      ? 'bg-cyan-700 text-cyan-100'
                      : 'bg-slate-200 text-slate-600'
                  }`}
                >
                  PRD
                </span>
              </button>"""

content = content.replace(old_sub_menu, new_sub_menu)

# Update the active tab logic for the parent menu to stay highlighted
old_parent_highlight = """                : activeTab === 'system-functions-docs'
                ? 'bg-[#dce9f8] text-slate-900 font-bold'"""

new_parent_highlight = """                : (activeTab === 'system-functions-docs' || activeTab === 'system-prd')
                ? 'bg-[#dce9f8] text-slate-900 font-bold'"""

content = content.replace(old_parent_highlight, new_parent_highlight)

# Add collapsed icon for system-prd
old_collapsed_docs = """        <button
          type="button"
          onClick={() => onSelectTab('system-functions-docs')}
          className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all cursor-pointer ${
            activeTab === 'system-functions-docs'
              ? 'bg-[#111c30] text-white shadow-sm'
              : 'text-slate-600 hover:bg-[#d8e7fa]'
          }`}
          title="系统主要功能点的说明"
        >
          <BookOpenCheck className="w-5 h-5 text-cyan-600" />
        </button>"""

new_collapsed_docs = old_collapsed_docs + """
        <button
          type="button"
          onClick={() => onSelectTab('system-prd')}
          className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all cursor-pointer ${
            activeTab === 'system-prd'
              ? 'bg-[#111c30] text-white shadow-sm'
              : 'text-slate-600 hover:bg-[#d8e7fa]'
          }`}
          title="系统需求说明书(PRD)"
        >
          <FileText className="w-5 h-5 text-cyan-600" />
        </button>"""
content = content.replace(old_collapsed_docs, new_collapsed_docs)

with open('src/components/MTManagement/Sidebar.tsx', 'w') as f:
    f.write(content)

print("done")
