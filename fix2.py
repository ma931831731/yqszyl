with open('src/components/MTManagement/CategoryManagement.tsx', 'r') as f:
    lines = f.readlines()

# The corrupted part starts at line 777: "          {/* 主分            <thead>\n"
# and ends at line 865: "                    {/* 分类名称 (左侧带图标) */}\n"

start_idx = -1
end_idx = -1
for i, line in enumerate(lines):
    if "          {/* 主分            <thead>" in line:
        start_idx = i
    if "                    {/* 分类名称 (左侧带图标) */}" in line:
        end_idx = i

if start_idx != -1 and end_idx != -1 and start_idx < end_idx:
    print(f"Replacing from {start_idx} to {end_idx}")
    replacement = [
        '          {/* 主分类总数 */}\n',
        '          <div className="px-3 py-1 flex items-center justify-between sm:justify-start gap-4">\n',
        '            <div>\n',
        '              <span className="text-xs text-slate-400 font-medium block">主分类总数</span>\n',
        '              <div className="flex items-baseline gap-1 mt-0.5">\n',
        '                <span className="text-2xl font-black text-slate-900">{totalCategories}</span>\n',
        '                <span className="text-xs text-slate-400 font-semibold">个分类</span>\n',
        '              </div>\n',
        '            </div>\n',
        '            <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-sm">\n',
        '              <Layers className="w-4 h-4" />\n',
        '            </div>\n',
        '          </div>\n',
        '\n',
        '          {/* 已启用 / 运行中 */}\n',
        '          <div className="px-3 py-1 sm:pl-6 flex items-center justify-between sm:justify-start gap-4">\n',
        '            <div>\n',
        '              <span className="text-xs text-slate-400 font-medium block">已启用 / 运行中</span>\n',
        '              <div className="flex items-baseline gap-1 mt-0.5">\n',
        '                <span className="text-2xl font-black text-emerald-600">{activeCategoriesCount}</span>\n',
        '                <span className="text-xs text-slate-400 font-semibold">/ {totalCategories} 个</span>\n',
        '              </div>\n',
        '            </div>\n',
        '            <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-sm">\n',
        '              <CheckCircle2 className="w-4 h-4" />\n',
        '            </div>\n',
        '          </div>\n',
        '\n',
        '          {/* 客户数据仓库数 */}\n',
        '          <div className="px-3 py-1 sm:pl-6 flex items-center justify-between sm:justify-start gap-4">\n',
        '            <div>\n',
        '              <span className="text-xs text-slate-400 font-medium block">客户数据仓库数</span>\n',
        '              <div className="flex items-baseline gap-1 mt-0.5">\n',
        '                <span className="text-2xl font-black text-blue-600">{totalCustomerSum}</span>\n',
        '                <span className="text-xs text-slate-400 font-semibold">个数据仓库</span>\n',
        '              </div>\n',
        '            </div>\n',
        '            <div className="w-9 h-9 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-sm">\n',
        '              <Database className="w-4 h-4" />\n',
        '            </div>\n',
        '          </div>\n',
        '        </div>\n',
        '      </div>\n',
        '\n',
        '      {/* 三、主分类管理列表 表格布局 */}\n',
        '      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-[0_1px_4px_rgba(0,0,0,0.03)] overflow-hidden">\n',
        '        <div className="overflow-x-auto">\n',
        '          <table className="w-full text-left text-xs text-slate-700 border-collapse">\n',
        '            <thead>\n',
        '              <tr className="bg-slate-50/90 border-b border-slate-200/80 text-slate-500 font-bold">\n',
        '                <th className="py-3.5 px-4 font-bold text-slate-700 whitespace-nowrap min-w-[150px]">分类名称</th>\n',
        '                <th className="py-3.5 px-4 font-bold text-slate-700 text-center whitespace-nowrap min-w-[110px]">调用唯一ID</th>\n',
        '                <th className="py-3.5 px-4 font-bold text-slate-700 min-w-[280px]">分类简介（客户前端可见）</th>\n',
        '                <th className="py-3.5 px-4 font-bold text-slate-700 min-w-[240px]">后台备注（客户不可见）</th>\n',
        '                <th className="py-3.5 px-4 text-center font-bold text-slate-700 whitespace-nowrap min-w-[130px]">客户数据仓库数</th>\n',
        '                <th className="py-3.5 px-4 text-center font-bold text-slate-700 whitespace-nowrap">状态</th>\n',
        '                <th className="py-3.5 px-4 text-center font-bold text-slate-700 whitespace-nowrap min-w-[170px]">\n',
        '                  <span>操作</span>\n',
        '                </th>\n',
        '              </tr>\n',
        '            </thead>\n',
        '            <tbody className="divide-y divide-slate-100">\n',
        '              {categories.map((row, index) => {\n',
        '                const canDelete = row.customerCount === 0;\n',
        '                return (\n',
        '                  <tr\n',
        '                    key={row.id}\n',
        '                    className={`transition-colors ${\n',
        '                      !row.enabled ? \'bg-slate-50/40 text-slate-400\' : \'hover:bg-blue-50/40\'\n',
        '                    }`}\n',
        '                  >\n',
        '                    {/* 分类名称 (左侧带图标) */}\n'
    ]
    new_lines = lines[:start_idx] + replacement + lines[end_idx+1:]
    with open('src/components/MTManagement/CategoryManagement.tsx', 'w') as f:
        f.writelines(new_lines)
    print("Fixed!")
else:
    print(f"start_idx: {start_idx}, end_idx: {end_idx}")

