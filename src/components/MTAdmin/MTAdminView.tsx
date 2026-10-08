import React, { useState } from 'react';
import { 
  LayoutGrid, FolderTree, Users2, Database, Menu, Bell, ShieldCheck, LogOut, 
  Save, Edit, BarChart3, Users, Home, Settings2, Plus, Trash2, CheckSquare, Layers, Award
} from 'lucide-react';
import { LevelIncidentCase, MTUserRecord, EquipmentFunctionItem, CaseSubEvent, SystemId } from '../../types';

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
  const [activeTab, setActiveTab] = useState<'dashboard' | 'equipment-rules' | 'cases' | 'users' | 'metrics'>('cases');
  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  
  // 1. Initial 8 Application Equipment Sub-Functions & Point Rules State (练兵场应用功能与积分规则)
  const [equipmentFunctions, setEquipmentFunctions] = useState<EquipmentFunctionItem[]>([
    {
      id: 'func-shudi-1',
      systemId: 'shudi',
      functionName: '属地公文扫雷与职务排错',
      functionCode: 'SHUDI_DOC_PROOFREAD',
      description: '属地通报发布前在线排错，识别错别字与领导敏感职务用词。',
      tiers: [
        { tierName: '基础完成', minCompletionPercent: 60, rewardPoints: 50 },
        { tierName: '熟练精通', minCompletionPercent: 80, rewardPoints: 100 },
        { tierName: '满分化解', minCompletionPercent: 100, rewardPoints: 200 }
      ]
    },
    {
      id: 'func-diting-1',
      systemId: 'diting',
      functionName: '全域雷达声量峰值捕捉与预警',
      functionCode: 'DITING_PEAK_RADAR',
      description: '全天候设定高危关键词与阈值，捕获舆情苗头并生成简报。',
      tiers: [
        { tierName: '基础完成', minCompletionPercent: 60, rewardPoints: 60 },
        { tierName: '熟练精通', minCompletionPercent: 80, rewardPoints: 120 },
        { tierName: '满分化解', minCompletionPercent: 100, rewardPoints: 220 }
      ]
    },
    {
      id: 'func-quanwang-1',
      systemId: 'quanwang',
      functionName: '全网探针定向打标与证据链打捞',
      functionCode: 'QUANWANG_EVIDENCE_TAG',
      description: '海量帖文 5 秒打标打捞证据链，标记核心造谣博主。',
      tiers: [
        { tierName: '基础完成', minCompletionPercent: 60, rewardPoints: 50 },
        { tierName: '熟练精通', minCompletionPercent: 80, rewardPoints: 100 },
        { tierName: '满分化解', minCompletionPercent: 100, rewardPoints: 180 }
      ]
    },
    {
      id: 'func-wangping-1',
      systemId: 'wangping',
      functionName: '认知兵团“赞/转/评/报”四维战术',
      functionCode: 'WANGPING_TACTICAL_STRIKE',
      description: '组织网评力量反击水军挑刺，肃清正面舆论环境。',
      tiers: [
        { tierName: '基础完成', minCompletionPercent: 60, rewardPoints: 80 },
        { tierName: '熟练精通', minCompletionPercent: 80, rewardPoints: 150 },
        { tierName: '满分化解', minCompletionPercent: 100, rewardPoints: 250 }
      ]
    },
    {
      id: 'func-diandian-1',
      systemId: 'diandian',
      functionName: '点点密信多群加密推送与调度',
      functionCode: 'DIANDIAN_DISPATCH',
      description: '沉浸式即时对话，加密调度多部门高效协同配合。',
      tiers: [
        { tierName: '基础完成', minCompletionPercent: 60, rewardPoints: 40 },
        { tierName: '熟练精通', minCompletionPercent: 80, rewardPoints: 90 },
        { tierName: '满分化解', minCompletionPercent: 100, rewardPoints: 160 }
      ]
    }
  ]);

  // Selected Equipment Function for editing in MT Admin
  const [selectedFunc, setSelectedFunc] = useState<EquipmentFunctionItem>(equipmentFunctions[0]);

  // 2. Level Case Editing State with Multi-Case Events
  const [editingCase, setEditingCase] = useState<LevelIncidentCase>({
    ...levelCases[0],
    caseEvents: levelCases[0].caseEvents || [
      {
        id: 'sub-101',
        caseTitle: '自媒体“都市爆料王”发布不实质疑帖',
        phase: '发现',
        description: '谛听预警捕捉到自媒体号引发小范围讨论，需使用全网搜探针打标证据链。',
        requiredFunctionIds: ['func-quanwang-1', 'func-diting-1'],
        weightScore: 100
      },
      {
        id: 'sub-102',
        caseTitle: '属地发文澄清通报格式与措辞扫雷',
        phase: '处置',
        description: '属地通报拟稿中多打敏感职务用词，需通过属地公文扫雷排错后再发布。',
        requiredFunctionIds: ['func-shudi-1'],
        weightScore: 150
      }
    ]
  });

  // Mock User Analytics Data
  const [userRecords] = useState<MTUserRecord[]>([
    { id: 'u1', name: '守网卫士_01', department: '省属地网信一队', completedLevels: 2, totalScore: 12850, rank: 1, lastActive: '10分钟前', status: '优秀' },
    { id: 'u2', name: '雷达监测员_严力', department: '高新区宣传部', completedLevels: 2, totalScore: 11920, rank: 2, lastActive: '1小时前', status: '优秀' },
    { id: 'u3', name: '网络公关组_张敏', department: '某市应急局', completedLevels: 1, totalScore: 9400, rank: 3, lastActive: '昨天', status: '正常' },
    { id: 'u4', name: '新兵网评员_李华', department: '文旅宣传处', completedLevels: 0, totalScore: 1200, rank: 4, lastActive: '3天前', status: '需加强' }
  ]);

  // Save Case Form Handler
  const handleSaveForm = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveLevelCase(editingCase);
    alert(`【关卡多案例配置保存成功】第 ${editingCase.id} 关《${editingCase.title}》已成功关联 ${editingCase.caseEvents?.length || 0} 个真实案例事件与练兵场应用装备规则！`);
  };

  // Add Case Sub Event Handler
  const handleAddCaseSubEvent = () => {
    const newSub: CaseSubEvent = {
      id: `sub-${Date.now()}`,
      caseTitle: '新增真实案例突发事件场景',
      phase: '跟踪',
      description: '请填写案例背景及依赖调用的应用功能装备...',
      requiredFunctionIds: ['func-shudi-1'],
      weightScore: 100
    };
    setEditingCase(prev => ({
      ...prev,
      caseEvents: [...(prev.caseEvents || []), newSub]
    }));
  };

  // Remove Case Sub Event Handler
  const handleRemoveCaseSubEvent = (subId: string) => {
    setEditingCase(prev => ({
      ...prev,
      caseEvents: (prev.caseEvents || []).filter(s => s.id !== subId)
    }));
  };

  // Toggle Function Attachment in Case Sub Event
  const handleToggleFuncInSubEvent = (subId: string, funcId: string) => {
    setEditingCase(prev => ({
      ...prev,
      caseEvents: (prev.caseEvents || []).map(s => {
        if (s.id === subId) {
          const exists = s.requiredFunctionIds.includes(funcId);
          const next = exists
            ? s.requiredFunctionIds.filter(f => f !== funcId)
            : [...s.requiredFunctionIds, funcId];
          return { ...s, requiredFunctionIds: next };
        }
        return s;
      })
    }));
  };

  // Save Equipment Function Tier Rule Handler
  const handleSaveEquipmentFunc = () => {
    setEquipmentFunctions(prev => prev.map(f => f.id === selectedFunc.id ? selectedFunc : f));
    alert(`【练兵场装备规则更新成功】已成功更新【${selectedFunc.functionName}】不同完成度积分奖励规则！`);
  };

  return (
    <div className="min-h-screen bg-[#f1f5f9] text-slate-800 flex flex-col font-sans select-none">
      
      {/* 1. ENTERPRISE HEADER (#eaf1fa Ice Blue Theme matching Data Warehouse MT) */}
      <header className="h-14 bg-[#eaf1fa] border-b border-[#d4e2f5] px-4 flex items-center justify-between shrink-0 sticky top-0 z-30 shadow-xs">
        
        {/* Left Logo & Header */}
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

        {/* Right Header Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={onReturnToPortal}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-blue-50 text-[#2563eb] text-xs font-bold rounded-lg border border-[#2563eb]/40 shadow-xs transition-all cursor-pointer"
            title="返回系统门头"
          >
            <Home className="w-3.5 h-3.5 text-[#2563eb]" />
            <span>返回系统门头</span>
          </button>

          <div className="relative">
            <div
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-2 cursor-pointer p-1 rounded-lg hover:bg-[#d8e7fa]"
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
          </div>
        </div>
      </header>

      {/* BODY WITH ENTERPRISE SIDEBAR AND MAIN CONTENT */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* 2. ENTERPRISE SIDEBAR */}
        <aside className={`${sidebarCollapsed ? 'w-16' : 'w-[230px]'} bg-[#eaf1fa] border-r border-[#d4e2f5] flex flex-col py-3 px-3 shrink-0 transition-all select-none`}>
          <div className="space-y-1 text-xs">
            
            {/* Nav 1: Level Case Configuration (关卡真实多案例与装备组合配置) */}
            <button
              onClick={() => setActiveTab('cases')}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-[13px] font-semibold transition-all cursor-pointer ${
                activeTab === 'cases' ? 'bg-[#111c30] text-white shadow-xs' : 'text-slate-700 hover:bg-[#dce9f8]'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <FolderTree className="w-4 h-4 shrink-0" />
                {!sidebarCollapsed && <span>关卡真实案例组合配置</span>}
              </div>
              {!sidebarCollapsed && (
                <span className="text-[10px] px-1.5 py-0.2 rounded font-medium bg-amber-100 text-amber-700">案例</span>
              )}
            </button>

            {/* Nav 2: Practice Range Equipment Point Rules (练兵场应用装备与积分规则配置) */}
            <button
              onClick={() => setActiveTab('equipment-rules')}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-[13px] font-semibold transition-all cursor-pointer ${
                activeTab === 'equipment-rules' ? 'bg-[#111c30] text-white shadow-xs' : 'text-slate-700 hover:bg-[#dce9f8]'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Settings2 className="w-4 h-4 shrink-0" />
                {!sidebarCollapsed && <span>练兵场装备积分规则</span>}
              </div>
              {!sidebarCollapsed && (
                <span className="text-[10px] px-1.5 py-0.2 rounded font-medium bg-cyan-100 text-cyan-700">规则</span>
              )}
            </button>

            {/* Nav 3: Dashboard */}
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
            </button>

            {/* Nav 4: Users */}
            <button
              onClick={() => setActiveTab('users')}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-[13px] font-semibold transition-all cursor-pointer ${
                activeTab === 'users' ? 'bg-[#111c30] text-white shadow-xs' : 'text-slate-700 hover:bg-[#dce9f8]'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Users2 className="w-4 h-4 shrink-0" />
                {!sidebarCollapsed && <span>学员成绩与排名</span>}
              </div>
            </button>

            {/* Nav 5: Metrics */}
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
          
          {/* TAB 1: 关卡真实案例多事件与装备组合配置 (CASES CONFIG) */}
          {activeTab === 'cases' && (
            <div className="max-w-7xl mx-auto space-y-6">
              
              {/* Header Info Notice */}
              <div className="bg-blue-50 border border-blue-200 p-4 rounded-xl flex items-center justify-between text-xs text-blue-900">
                <div className="flex items-center gap-2 font-medium">
                  <Layers className="w-4 h-4 text-[#2563eb]" />
                  <span>教练员说明：每一关卡可配置多个真实案例事件。每个案例事件均可自由勾选调用的【练兵场应用装备组合】，演练时将引用练兵场设定的完成度积分规则进行通关结算。</span>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                
                {/* Left Level Selector (4 Cols) */}
                <div className="lg:col-span-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <span className="font-extrabold text-slate-900 text-sm">选择演练关卡 (共 {levelCases.length} 关)</span>
                  </div>

                  <div className="space-y-2">
                    {levelCases.map(c => (
                      <div
                        key={c.id}
                        onClick={() => setEditingCase({ ...c, caseEvents: c.caseEvents || [] })}
                        className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                          editingCase.id === c.id
                            ? 'bg-blue-50/80 border-[#2563eb] text-[#2563eb] font-bold'
                            : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span>第 {c.id} 关 · {c.title}</span>
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-600">{c.difficulty}</span>
                        </div>
                        <div className="text-xs text-slate-400 font-normal truncate">{c.subtitle}</div>
                        <div className="text-[10px] text-blue-600 font-semibold mt-1">
                          包含 {c.caseEvents?.length || 2} 个案例事件场景
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right Level Multi-Case Events & Equipment Function Combinations Editor (8 Cols) */}
                <div className="lg:col-span-8 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-5">
                  
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <div>
                      <h3 className="font-extrabold text-slate-900 text-base">
                        正在配置第 {editingCase.id} 关：《{editingCase.title}》案例事件与应用装备组合
                      </h3>
                      <p className="text-xs text-slate-500 mt-0.5">支持为一个关卡配置多个真实突发案例事件，并设定调用的应用功能组合</p>
                    </div>
                    
                    <button
                      onClick={handleAddCaseSubEvent}
                      className="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-[#2563eb] border border-[#2563eb]/40 font-bold text-xs rounded-lg flex items-center gap-1 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" /> 增加真实案例事件
                    </button>
                  </div>

                  <form onSubmit={handleSaveForm} className="space-y-5 text-xs">
                    
                    {/* Basic Case Meta */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">关卡名称：</label>
                        <input
                          type="text"
                          value={editingCase.title}
                          onChange={(e) => setEditingCase({ ...editingCase, title: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-800 font-medium"
                        />
                      </div>

                      <div>
                        <label className="block font-bold text-slate-700 mb-1">舆情案例类别：</label>
                        <input
                          type="text"
                          value={editingCase.category}
                          onChange={(e) => setEditingCase({ ...editingCase, category: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-800 font-medium"
                        />
                      </div>
                    </div>

                    {/* Multi-Case Scenario Events Editor List */}
                    <div className="space-y-4 pt-2">
                      <div className="font-extrabold text-slate-900 text-sm flex items-center justify-between">
                        <span>关卡内包含的突发案例事件列表 ({editingCase.caseEvents?.length || 0})</span>
                        <span className="text-xs text-slate-400 font-normal">勾选本案例所调用的练兵场装备组合</span>
                      </div>

                      {(editingCase.caseEvents || []).map((sub, idx) => (
                        <div key={sub.id} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3 relative">
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="w-5 h-5 rounded-full bg-[#2563eb] text-white font-black text-xs flex items-center justify-center">
                                {idx + 1}
                              </span>
                              <input
                                type="text"
                                value={sub.caseTitle}
                                onChange={(e) => {
                                  const val = e.target.value;
                                  setEditingCase(prev => ({
                                    ...prev,
                                    caseEvents: (prev.caseEvents || []).map(s => s.id === sub.id ? { ...s, caseTitle: val } : s)
                                  }));
                                }}
                                className="bg-white border border-slate-300 rounded-md px-2.5 py-1 text-xs font-bold text-slate-900 w-64"
                              />
                            </div>

                            <div className="flex items-center gap-3">
                              <select
                                value={sub.phase}
                                onChange={(e) => {
                                  const p = e.target.value as any;
                                  setEditingCase(prev => ({
                                    ...prev,
                                    caseEvents: (prev.caseEvents || []).map(s => s.id === sub.id ? { ...s, phase: p } : s)
                                  }));
                                }}
                                className="bg-white border border-slate-300 rounded-md px-2 py-1 text-xs font-bold text-blue-600"
                              >
                                <option value="发现">1. 发现阶段</option>
                                <option value="传播">2. 传播阶段</option>
                                <option value="跟踪">3. 跟踪阶段</option>
                                <option value="处置">4. 处置阶段</option>
                              </select>

                              <button
                                type="button"
                                onClick={() => handleRemoveCaseSubEvent(sub.id)}
                                className="p-1 hover:bg-rose-100 text-rose-600 rounded transition-colors"
                                title="删除此案例"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>

                          <div>
                            <textarea
                              rows={2}
                              value={sub.description}
                              onChange={(e) => {
                                const val = e.target.value;
                                setEditingCase(prev => ({
                                  ...prev,
                                  caseEvents: (prev.caseEvents || []).map(s => s.id === sub.id ? { ...s, description: val } : s)
                                }));
                              }}
                              className="w-full bg-white border border-slate-300 rounded-md p-2 text-xs text-slate-700"
                              placeholder="描述突发案情与处置要求..."
                            />
                          </div>

                          {/* Equipment Function Combination Checkboxes */}
                          <div className="pt-2 border-t border-slate-200">
                            <div className="font-bold text-slate-700 mb-1.5">
                              组合引用的练兵场应用功能装备（引用练兵场积分规则）：
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                              {equipmentFunctions.map(func => {
                                const isChecked = sub.requiredFunctionIds.includes(func.id);
                                return (
                                  <label
                                    key={func.id}
                                    onClick={() => handleToggleFuncInSubEvent(sub.id, func.id)}
                                    className={`p-2 rounded-lg border flex items-center justify-between cursor-pointer transition-all ${
                                      isChecked
                                        ? 'bg-blue-50 border-[#2563eb] text-[#2563eb] font-bold'
                                        : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-100'
                                    }`}
                                  >
                                    <div className="flex items-center gap-1.5">
                                      <input type="checkbox" checked={isChecked} readOnly className="rounded text-[#2563eb]" />
                                      <span>{func.functionName}</span>
                                    </div>
                                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-100 text-blue-700">
                                      最高+{func.tiers[2]?.rewardPoints || 200}分
                                    </span>
                                  </label>
                                );
                              })}
                            </div>
                          </div>

                        </div>
                      ))}
                    </div>

                    <div className="pt-4 text-right border-t border-slate-100">
                      <button
                        type="submit"
                        className="px-6 py-2.5 bg-[#2563eb] hover:bg-blue-700 text-white font-bold rounded-lg shadow flex items-center gap-1.5 ml-auto cursor-pointer"
                      >
                        <Save className="w-4 h-4" /> 保存第 {editingCase.id} 关多案例与装备组合配置
                      </button>
                    </div>

                  </form>
                </div>

              </div>

            </div>
          )}

          {/* TAB 2: 练兵场应用装备与积分规则配置 (EQUIPMENT RULES CONFIG) */}
          {activeTab === 'equipment-rules' && (
            <div className="max-w-7xl mx-auto space-y-6">
              
              <div className="bg-cyan-50 border border-cyan-200 p-4 rounded-xl flex items-center justify-between text-xs text-cyan-900">
                <div className="flex items-center gap-2 font-medium">
                  <Award className="w-4 h-4 text-cyan-700" />
                  <span>说明：在此配置 8 大软件装备的子功能与不同完成度（60%/80%/100%）对应的积分规则。V8客户端学员在练兵场学习积累后，可在实战关卡中引用此规则进行积分结算。</span>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                
                {/* Left Equipment Function Selector */}
                <div className="lg:col-span-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <span className="font-extrabold text-slate-900 text-sm">应用功能装备列表</span>
                    <span className="text-xs text-slate-400">共 {equipmentFunctions.length} 项</span>
                  </div>

                  <div className="space-y-2">
                    {equipmentFunctions.map(func => (
                      <div
                        key={func.id}
                        onClick={() => setSelectedFunc(func)}
                        className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                          selectedFunc.id === func.id
                            ? 'bg-cyan-50/90 border-cyan-600 text-cyan-900 font-bold'
                            : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        <div className="font-bold text-xs text-slate-900 mb-0.5">{func.functionName}</div>
                        <div className="text-[10px] text-slate-500 truncate">{func.description}</div>
                        <div className="text-[10px] text-cyan-700 font-bold mt-1">
                          满分化解积分：+{func.tiers[2]?.rewardPoints || 200} PTS
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right Tier Point Rules Editor */}
                <div className="lg:col-span-8 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-5">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <h3 className="font-extrabold text-slate-900 text-base">
                      配置【{selectedFunc.functionName}】完成度与积分规则
                    </h3>
                    <span className="text-xs font-bold text-cyan-700 bg-cyan-100 px-2 py-0.5 rounded">功能代码: {selectedFunc.functionCode}</span>
                  </div>

                  <div className="space-y-4 text-xs">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">功能描述：</label>
                      <input
                        type="text"
                        value={selectedFunc.description}
                        onChange={(e) => setSelectedFunc({ ...selectedFunc, description: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-800 font-medium"
                      />
                    </div>

                    <div className="space-y-3 pt-2">
                      <div className="font-extrabold text-slate-900 text-sm">设定不同完成度对应的不同积分奖励：</div>
                      
                      {selectedFunc.tiers.map((tier, idx) => (
                        <div key={idx} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-4">
                          <div className="font-bold text-slate-800 text-xs w-24">
                            阶梯 {idx + 1}：{tier.tierName}
                          </div>

                          <div className="flex items-center gap-2">
                            <span className="text-slate-500">完成度 ≥</span>
                            <input
                              type="number"
                              value={tier.minCompletionPercent}
                              onChange={(e) => {
                                const val = Number(e.target.value);
                                const nextTiers = [...selectedFunc.tiers];
                                nextTiers[idx].minCompletionPercent = val;
                                setSelectedFunc({ ...selectedFunc, tiers: nextTiers });
                              }}
                              className="w-16 bg-white border border-slate-300 rounded px-2 py-1 font-bold text-center"
                            />
                            <span className="text-slate-500">%</span>
                          </div>

                          <div className="flex items-center gap-2">
                            <span className="text-slate-500">奖励积分：+</span>
                            <input
                              type="number"
                              value={tier.rewardPoints}
                              onChange={(e) => {
                                const val = Number(e.target.value);
                                const nextTiers = [...selectedFunc.tiers];
                                nextTiers[idx].rewardPoints = val;
                                setSelectedFunc({ ...selectedFunc, tiers: nextTiers });
                              }}
                              className="w-20 bg-white border border-slate-300 rounded px-2 py-1 font-extrabold text-amber-600 text-center"
                            />
                            <span className="text-slate-500">PTS</span>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="pt-4 text-right">
                      <button
                        onClick={handleSaveEquipmentFunc}
                        className="px-6 py-2.5 bg-cyan-700 hover:bg-cyan-800 text-white font-bold rounded-lg shadow flex items-center gap-1.5 ml-auto cursor-pointer"
                      >
                        <Save className="w-4 h-4" /> 保存装备完成度积分规则
                      </button>
                    </div>

                  </div>
                </div>

              </div>

            </div>
          )}

          {/* TAB 3: 综合看板 */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6 max-w-7xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
                  <div className="text-slate-500 text-xs font-medium">全省参演干部总数</div>
                  <div className="text-2xl font-black text-slate-900 font-num mt-1">1,284 人</div>
                </div>
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
                  <div className="text-slate-500 text-xs font-medium">关卡平均通关得分</div>
                  <div className="text-2xl font-black text-[#2563eb] font-num mt-1">94.2 分</div>
                </div>
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
                  <div className="text-slate-500 text-xs font-medium">在线真实事件案例</div>
                  <div className="text-2xl font-black text-amber-600 font-num mt-1">{levelCases.length} 关</div>
                </div>
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
                  <div className="text-slate-500 text-xs font-medium">已配置练习装备功能</div>
                  <div className="text-2xl font-black text-emerald-600 font-num mt-1">{equipmentFunctions.length} 项</div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: 学员演练成绩 */}
          {activeTab === 'users' && (
            <div className="max-w-7xl mx-auto bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
              <h3 className="font-extrabold text-slate-900 text-base">全省参演干部演练成绩明细</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead className="bg-[#f8fafc] text-slate-500 font-bold border-b border-slate-200">
                    <tr>
                      <th className="p-3">全省排名</th>
                      <th className="p-3">学员姓名</th>
                      <th className="p-3">所属单位</th>
                      <th className="p-3">已通关关卡</th>
                      <th className="p-3">战力积分</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {userRecords.map(u => (
                      <tr key={u.id} className="hover:bg-slate-50">
                        <td className="p-3 font-bold text-[#2563eb]">#{u.rank}</td>
                        <td className="p-3 font-bold text-slate-900">{u.name}</td>
                        <td className="p-3 text-slate-600">{u.department}</td>
                        <td className="p-3 font-bold text-slate-800">{u.completedLevels} 关</td>
                        <td className="p-3 font-bold font-num text-amber-600">{u.totalScore.toLocaleString()} PTS</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 5: 8大生态资产 */}
          {activeTab === 'metrics' && (
            <div className="max-w-7xl mx-auto bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
              <h3 className="font-extrabold text-slate-900 text-base mb-4">8 大软件装备资产学员调用热度</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
                {[
                  { name: '属地管理系统 (公文扫雷)', count: '1,420 次' },
                  { name: '谛听预警系统 (全域雷达)', count: '1,180 次' },
                  { name: '全网搜 (全网探针)', count: '980 次' },
                  { name: '网评系统 (认知兵团)', count: '860 次' },
                ].map((item, idx) => (
                  <div key={idx} className="p-4 bg-[#f8fafc] rounded-xl border border-slate-200">
                    <div className="font-bold text-slate-900 mb-1">{item.name}</div>
                    <div className="text-xl font-bold font-num text-[#2563eb]">{item.count}</div>
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
