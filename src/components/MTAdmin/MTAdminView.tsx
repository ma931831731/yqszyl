import React, { useState } from 'react';
import { 
  LayoutGrid, FolderTree, Users2, Database, Menu, Bell, ShieldCheck, LogOut, 
  Save, Edit, BarChart3, Users, Home
} from 'lucide-react';
import { LevelIncidentCase, MTUserRecord } from '../../types';

interface MTAdminViewProps {
  onReturnToPortal: () => void;
  levelCases: LevelIncidentCase[];
  onSaveLevelCase: (updatedCase: LevelIncidentCase) => void;
}

export const MTAdminView: React.FC<MTAdminViewProps> = ({
  onReturnToPortal,
  levelCases,
  onSaveLevelCase,
}) => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'cases' | 'users' | 'metrics'>('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [editingCase, setEditingCase] = useState<LevelIncidentCase>(levelCases[0]);

  // Mock User Analytics Data
  const [userRecords] = useState<MTUserRecord[]>([
    { id: 'u1', name: '守网卫士_01', department: '省属地网信一队', completedLevels: 2, totalScore: 12850, rank: 1, lastActive: '10分钟前', status: '优秀' },
    { id: 'u2', name: '雷达监测员_严力', department: '高新区宣传部', completedLevels: 2, totalScore: 11920, rank: 2, lastActive: '1小时前', status: '优秀' },
    { id: 'u3', name: '网络公关组_张敏', department: '某市应急局', completedLevels: 1, totalScore: 9400, rank: 3, lastActive: '昨天', status: '正常' },
    { id: 'u4', name: '新兵网评员_李华', department: '文旅宣传处', completedLevels: 0, totalScore: 1200, rank: 4, lastActive: '3天前', status: '需加强' }
  ]);

  const handleSaveForm = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveLevelCase(editingCase);
    alert(`【案例更新成功】第 ${editingCase.id} 关《${editingCase.title}》已被管理员成功保存！`);
  };

  return (
    <div className="min-h-screen bg-[#f1f5f9] text-slate-800 flex flex-col font-sans select-none">
      
      {/* 1. ENTERPRISE HEADER (#eaf1fa Ice Blue Theme matching Data Warehouse MT) */}
      <header className="h-14 bg-[#eaf1fa] border-b border-[#d4e2f5] px-4 flex items-center justify-between shrink-0 sticky top-0 z-30 shadow-xs">
        
        {/* Left: Logo + KN Brand + MT Badge + Hamburger + Title */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#1965e0] flex items-center justify-center text-white font-black text-sm tracking-tighter shadow-xs">
              <span>KN</span>
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-[13px] font-extrabold text-[#193256] tracking-tight">康奈网络</span>
              <span className="text-[9px] font-bold text-[#2563eb] tracking-tighter">Konne.cn</span>
            </div>
            <div className="bg-[#2463eb] text-white text-[10px] font-black px-1.5 py-0.5 rounded-full uppercase ml-0.5">
              MT
            </div>
          </div>

          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="ml-3 p-1.5 rounded-md hover:bg-[#d8e7fa] text-slate-700 transition-colors cursor-pointer"
            title="切换侧边栏"
          >
            <Menu className="w-4 h-4 stroke-[2.2]" />
          </button>

          <div className="w-2 h-2 rounded-full bg-[#2563eb] shrink-0 ml-1" />

          <h1 className="text-[15px] font-bold text-slate-900 tracking-tight whitespace-nowrap">
            全域舆情演练系统（MT）管理中枢
          </h1>
        </div>

        {/* Right Zone: Return to Portal Button + Notifications + User Card */}
        <div className="flex items-center gap-3">
          
          {/* Prominent Return to Portal Choice Button */}
          <button
            onClick={onReturnToPortal}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-blue-50 text-[#2563eb] text-xs font-bold rounded-lg border border-[#2563eb]/40 shadow-xs hover:border-[#2563eb] transition-all cursor-pointer"
            title="返回系统门头（选择V8客户端或MT管理端）"
          >
            <Home className="w-3.5 h-3.5 text-[#2563eb]" />
            <span>返回系统门头</span>
          </button>

          <button className="relative p-1.5 rounded-full hover:bg-[#d8e7fa] text-slate-600 cursor-pointer" title="查看通知">
            <Bell className="w-4 h-4" />
            <span className="absolute -top-1 -right-1 bg-[#ef4444] text-white text-[9px] font-bold px-1.5 rounded-full">
              4
            </span>
          </button>

          {/* User Card Dropdown */}
          <div className="relative">
            <div
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-2 cursor-pointer p-1 rounded-lg hover:bg-[#d8e7fa] transition-colors"
            >
              <div className="text-right leading-none hidden sm:block">
                <div className="flex items-center justify-end gap-1 mb-0.5">
                  <span className="text-xs font-bold text-slate-800">张华 (管理员)</span>
                  <ShieldCheck className="w-3.5 h-3.5 text-[#2563eb]" />
                </div>
                <span className="text-[10px] text-slate-500 font-medium">宣传教研室</span>
              </div>

              <div className="w-8 h-8 rounded-full bg-[#2563eb] text-white flex items-center justify-center font-bold text-xs">
                ZH
              </div>
            </div>

            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-slate-200 py-1.5 z-50 text-xs text-slate-700">
                <div className="px-3 py-2 border-b border-slate-100">
                  <div className="font-semibold text-slate-900">张华</div>
                  <div className="text-slate-400 text-[11px]">演练案例总架构师</div>
                </div>
                <button onClick={onReturnToPortal} className="w-full text-left px-3 py-1.5 hover:bg-blue-50 text-[#2563eb] flex items-center gap-1.5 font-bold">
                  <Home className="w-3.5 h-3.5" /> 返回系统门头
                </button>
              </div>
            )}
          </div>

        </div>
      </header>

      {/* BODY WITH ENTERPRISE SIDEBAR AND MAIN CONTENT */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* 2. ENTERPRISE SIDEBAR (#eaf1fa Theme matching Data Warehouse MT) */}
        <aside className={`${sidebarCollapsed ? 'w-16' : 'w-[220px]'} bg-[#eaf1fa] border-r border-[#d4e2f5] flex flex-col py-3 px-3 shrink-0 transition-all select-none`}>
          <div className="space-y-1 text-xs">
            
            {/* Dashboard Nav */}
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-[13px] font-semibold transition-all cursor-pointer ${
                activeTab === 'dashboard' ? 'bg-[#111c30] text-white shadow-xs' : 'text-slate-700 hover:bg-[#dce9f8]'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <LayoutGrid className="w-4 h-4 shrink-0" />
                {!sidebarCollapsed && <span>综合看板</span>}
              </div>
              {!sidebarCollapsed && (
                <span className={`text-[10px] px-1.5 py-0.2 rounded font-medium ${
                  activeTab === 'dashboard' ? 'bg-slate-700 text-emerald-300' : 'bg-emerald-100 text-emerald-700'
                }`}>看板</span>
              )}
            </button>

            {/* Level Cases Nav */}
            <button
              onClick={() => setActiveTab('cases')}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-[13px] font-semibold transition-all cursor-pointer ${
                activeTab === 'cases' ? 'bg-[#111c30] text-white shadow-xs' : 'text-slate-700 hover:bg-[#dce9f8]'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <FolderTree className="w-4 h-4 shrink-0" />
                {!sidebarCollapsed && <span>真实案例关卡配置</span>}
              </div>
              {!sidebarCollapsed && (
                <span className={`text-[10px] px-1.5 py-0.2 rounded font-medium ${
                  activeTab === 'cases' ? 'bg-amber-800 text-amber-200' : 'bg-amber-100 text-amber-700'
                }`}>案例</span>
              )}
            </button>

            {/* Users Analytics Nav */}
            <button
              onClick={() => setActiveTab('users')}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-[13px] font-semibold transition-all cursor-pointer ${
                activeTab === 'users' ? 'bg-[#111c30] text-white shadow-xs' : 'text-slate-700 hover:bg-[#dce9f8]'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Users2 className="w-4 h-4 shrink-0" />
                {!sidebarCollapsed && <span>学员演练成绩与排名</span>}
              </div>
            </button>

            {/* Equipment Metrics Nav */}
            <button
              onClick={() => setActiveTab('metrics')}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-[13px] font-semibold transition-all cursor-pointer ${
                activeTab === 'metrics' ? 'bg-[#111c30] text-white shadow-xs' : 'text-slate-700 hover:bg-[#dce9f8]'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <BarChart3 className="w-4 h-4 shrink-0" />
                {!sidebarCollapsed && <span>8大生态资产热度</span>}
              </div>
            </button>

          </div>
        </aside>

        {/* 3. MAIN WORKSPACE CONTENT */}
        <main className="flex-1 p-6 overflow-y-auto">
          
          {/* TAB 1: 综合看板 (DASHBOARD) */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6 max-w-7xl mx-auto">
              
              {/* Top Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
                  <div className="text-slate-500 text-xs font-medium">全省参演干部总数</div>
                  <div className="text-2xl font-black text-slate-900 font-num mt-1">1,284 人</div>
                  <div className="text-[11px] text-emerald-600 font-semibold mt-2">↑ 较上周增长 18%</div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
                  <div className="text-slate-500 text-xs font-medium">关卡平均通关得分</div>
                  <div className="text-2xl font-black text-[#2563eb] font-num mt-1">94.2 分</div>
                  <div className="text-[11px] text-blue-600 font-semibold mt-2">评级分布：S+ 占据 68%</div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
                  <div className="text-slate-500 text-xs font-medium">在线真实事件案例</div>
                  <div className="text-2xl font-black text-amber-600 font-num mt-1">{levelCases.length} 关</div>
                  <div className="text-[11px] text-amber-600 font-semibold mt-2">涵盖发现/传播/处置全链</div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
                  <div className="text-slate-500 text-xs font-medium">最受学员欢迎软件装备</div>
                  <div className="text-xl font-bold text-slate-900 mt-1">属地管理系统</div>
                  <div className="text-[11px] text-emerald-600 font-semibold mt-2">公文扫雷排错率 100%</div>
                </div>
              </div>

              {/* Middle Table: Recent Levels List */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-extrabold text-slate-900 text-base">目前上线推演的真实案例关卡概览</h3>
                  <button onClick={() => setActiveTab('cases')} className="text-xs font-bold text-[#2563eb] hover:underline">
                    进入案例编辑器 ➔
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-[#f8fafc] text-slate-500 font-bold border-b border-slate-200">
                      <tr>
                        <th className="p-3">关卡ID</th>
                        <th className="p-3">案例名称</th>
                        <th className="p-3">案例类别</th>
                        <th className="p-3">难度评级</th>
                        <th className="p-3">事件发现阶段特征</th>
                        <th className="p-3 text-right">操作</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {levelCases.map(c => (
                        <tr key={c.id} className="hover:bg-slate-50">
                          <td className="p-3 font-bold font-num text-[#2563eb]">第 {c.id} 关</td>
                          <td className="p-3 font-bold text-slate-900">{c.title} ({c.subtitle})</td>
                          <td className="p-3"><span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700">{c.category}</span></td>
                          <td className="p-3"><span className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 font-bold">{c.difficulty}</span></td>
                          <td className="p-3 text-slate-500 max-w-xs truncate">{c.discoveryDesc}</td>
                          <td className="p-3 text-right">
                            <button
                              onClick={() => { setEditingCase(c); setActiveTab('cases'); }}
                              className="text-xs font-bold text-[#2563eb] hover:underline"
                            >
                              配置编辑
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: 真实案例关卡配置 (CASE MANAGEMENT) */}
          {activeTab === 'cases' && (
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              
              {/* Left Case Selector (5 Cols) */}
              <div className="lg:col-span-5 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <span className="font-extrabold text-slate-900 text-sm">选择需要编辑的关卡案例</span>
                  <span className="text-xs text-slate-400">共 {levelCases.length} 个关卡</span>
                </div>

                <div className="space-y-2">
                  {levelCases.map(c => (
                    <div
                      key={c.id}
                      onClick={() => setEditingCase(c)}
                      className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                        editingCase.id === c.id
                          ? 'bg-blue-50/80 border-[#2563eb] text-[#2563eb] shadow-2xs font-bold'
                          : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span>第 {c.id} 关 · {c.title}</span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-600">{c.difficulty}</span>
                      </div>
                      <div className="text-[11px] text-slate-400 truncate">{c.subtitle}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Form Editor (7 Cols) */}
              <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <h3 className="font-extrabold text-slate-900 text-base">
                    正在编辑第 {editingCase.id} 关：《{editingCase.title}》真实案例参数
                  </h3>
                  <span className="text-xs px-2 py-0.5 bg-blue-100 text-blue-700 font-bold rounded">真实事件映射</span>
                </div>

                <form onSubmit={handleSaveForm} className="space-y-4 text-xs">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">关卡显示名称：</label>
                      <input
                        type="text"
                        value={editingCase.title}
                        onChange={(e) => setEditingCase({ ...editingCase, title: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-800 focus:outline-none focus:border-[#2563eb]"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">真实案例类别：</label>
                      <input
                        type="text"
                        value={editingCase.category}
                        onChange={(e) => setEditingCase({ ...editingCase, category: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-800 focus:outline-none focus:border-[#2563eb]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">1. 事件发现阶段特征描述：</label>
                    <input
                      type="text"
                      value={editingCase.discoveryDesc}
                      onChange={(e) => setEditingCase({ ...editingCase, discoveryDesc: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-800 focus:outline-none focus:border-[#2563eb]"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">2. 传播扩散参数：</label>
                    <input
                      type="text"
                      value={editingCase.propagationDesc}
                      onChange={(e) => setEditingCase({ ...editingCase, propagationDesc: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-800 focus:outline-none focus:border-[#2563eb]"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">3. 处置评估重点与排错陷阱：</label>
                    <input
                      type="text"
                      value={editingCase.disposalDesc}
                      onChange={(e) => setEditingCase({ ...editingCase, disposalDesc: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-800 focus:outline-none focus:border-[#2563eb]"
                    />
                  </div>

                  <div className="pt-4 text-right">
                    <button
                      type="submit"
                      className="px-6 py-2.5 bg-[#2563eb] hover:bg-blue-700 text-white font-bold rounded-lg shadow-sm flex items-center gap-1.5 ml-auto transition-all cursor-pointer"
                    >
                      <Save className="w-4 h-4" /> 保存并同步案例参数
                    </button>
                  </div>
                </form>
              </div>

            </div>
          )}

          {/* TAB 3: 学员演练成绩 (USERS ANALYTICS) */}
          {activeTab === 'users' && (
            <div className="max-w-7xl mx-auto bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="font-extrabold text-slate-900 text-base">全省参演干部演练成绩明细</h3>
                <span className="text-xs text-slate-500">共 {userRecords.length} 人档案</span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead className="bg-[#f8fafc] text-slate-500 font-bold border-b border-slate-200">
                    <tr>
                      <th className="p-3">全省排名</th>
                      <th className="p-3">学员姓名</th>
                      <th className="p-3">所属单位</th>
                      <th className="p-3">已通关关卡</th>
                      <th className="p-3">战力积分</th>
                      <th className="p-3">短板状态</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {userRecords.map(u => (
                      <tr key={u.id} className="hover:bg-slate-50">
                        <td className="p-3 font-bold font-num text-[#2563eb]">#{u.rank}</td>
                        <td className="p-3 font-bold text-slate-900">{u.name}</td>
                        <td className="p-3 text-slate-600">{u.department}</td>
                        <td className="p-3 font-bold text-slate-800">{u.completedLevels} 关</td>
                        <td className="p-3 font-bold font-num text-amber-600">{u.totalScore.toLocaleString()} PTS</td>
                        <td className="p-3">
                          <span className={`px-2 py-0.5 rounded font-bold ${
                            u.status === '优秀' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                          }`}>
                            {u.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 4: 8大应用软件资产热度 (ASSETS) */}
          {activeTab === 'metrics' && (
            <div className="max-w-7xl mx-auto bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
              <h3 className="font-extrabold text-slate-900 text-base mb-4">8 大软件装备资产学员调用热度</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
                {[
                  { name: '属地管理系统 (公文扫雷)', count: '1,420 次', rate: '100% 覆盖' },
                  { name: '谛听预警系统 (全域雷达)', count: '1,180 次', rate: '92% 覆盖' },
                  { name: '全网搜 (全网探针)', count: '980 次', rate: '85% 覆盖' },
                  { name: '网评系统 (认知兵团)', count: '860 次', rate: '78% 覆盖' },
                ].map((item, idx) => (
                  <div key={idx} className="p-4 bg-[#f8fafc] rounded-xl border border-slate-200">
                    <div className="font-bold text-slate-900 mb-1">{item.name}</div>
                    <div className="text-xl font-bold font-num text-[#2563eb]">{item.count}</div>
                    <div className="text-[10px] text-slate-500 mt-1">{item.rate}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </main>

      </div>
    </div>
  );
};
