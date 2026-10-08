import React, { useState, useEffect } from 'react';
import { 
  Building2, Shield, Zap, Database, Award, ArrowUpCircle, UserPlus, Flame, 
  Clock, AlertTriangle, CheckCircle2, ChevronRight, Sparkles, RefreshCw, Users,
  Home, Play, Coins, ShieldAlert, Cpu, Radio, Target, Search, MessageSquareText,
  FileText, Globe, ShieldCheck
} from 'lucide-react';
import { BaseFacility, OfficerItem, GameResources, EmergencyEvent } from '../../types';

interface GrowthBaseViewProps {
  onReturnToPortal: () => void;
  onOpenLevelSelect: () => void;
  onOpenPractice: () => void;
  onOpenProfile: () => void;
}

export const GrowthBaseView: React.FC<GrowthBaseViewProps> = ({
  onReturnToPortal,
  onOpenLevelSelect,
  onOpenPractice,
  onOpenProfile
}) => {
  // 1. Core Resources State (Live Ticker)
  const [resources, setResources] = useState<GameResources>({
    trustScore: 94,
    dataPoints: 1250,
    computePower: 480,
    goldCoins: 3500,
    honorMedals: 12
  });

  // 2. 8 Base Facilities State
  const [facilities, setFacilities] = useState<BaseFacility[]>([
    { id: 'diting', name: '谛听预警系统', buildingName: '谛听天眼情报阵列', level: 3, maxLevel: 10, upgradeCostData: 200, upgradeCostGold: 500, dataRatePerSec: 15, computeRatePerSec: 2, assignedOfficerId: 'off-1', perkDesc: '提高全网情报捕获速度 +30%，自动化预警触发率提升', unlocked: true },
    { id: 'quanwang', name: '全网搜', buildingName: '舆情探针大数据中心', level: 2, maxLevel: 10, upgradeCostData: 150, upgradeCostGold: 400, dataRatePerSec: 10, computeRatePerSec: 1, assignedOfficerId: null, perkDesc: '提升证据链打捞效率 +20%，水军爆料标记准确度提升', unlocked: true },
    { id: 'shudi', name: '属地管理系统', buildingName: '属地中枢审校所', level: 4, maxLevel: 10, upgradeCostData: 300, upgradeCostGold: 800, dataRatePerSec: 5, computeRatePerSec: 5, assignedOfficerId: 'off-2', perkDesc: '公文扫雷自动排错能力 +40%，减少发布失误公信力扣减', unlocked: true },
    { id: 'diandian', name: '点点密信', buildingName: '加密通信控制塔', level: 2, maxLevel: 10, upgradeCostData: 180, upgradeCostGold: 450, dataRatePerSec: 8, computeRatePerSec: 3, assignedOfficerId: null, perkDesc: '多部门指令响应时效缩短 25%', unlocked: true },
    { id: 'zhihui', name: '指令流转系统', buildingName: '应急指挥调度中枢', level: 3, maxLevel: 10, upgradeCostData: 250, upgradeCostGold: 600, dataRatePerSec: 12, computeRatePerSec: 4, assignedOfficerId: 'off-3', perkDesc: '突发危机同时处置并发队列 +2', unlocked: true },
    { id: 'wangping', name: '网评系统', buildingName: '认知兵团训练营', level: 2, maxLevel: 10, upgradeCostData: 220, upgradeCostGold: 550, dataRatePerSec: 4, computeRatePerSec: 10, assignedOfficerId: null, perkDesc: '“赞/转/评/报”网评反击压制威力 +35%', unlocked: true },
    { id: 'quanqiu', name: '全球眼', buildingName: '境外情报侦测雷达', level: 1, maxLevel: 10, upgradeCostData: 500, upgradeCostGold: 1200, dataRatePerSec: 20, computeRatePerSec: 15, assignedOfficerId: null, perkDesc: '阻断境外推文倒灌风险，监控 X/YouTube 炒作节点', unlocked: true },
    { id: 'v8', name: 'V8平台', buildingName: 'V8机构指挥总控室', level: 5, maxLevel: 10, upgradeCostData: 600, upgradeCostGold: 1500, dataRatePerSec: 25, computeRatePerSec: 20, assignedOfficerId: null, perkDesc: '提升基地全局公信力上限，解锁高级防伪证书', unlocked: true }
  ]);

  // 3. Officers Personnel Roster State
  const [officers, setOfficers] = useState<OfficerItem[]>([
    {
      id: 'off-1',
      name: '老严教官',
      avatar: '👨‍✈️',
      role: '舆情分析师',
      rarity: 'SSR',
      level: 12,
      maxLevel: 30,
      exp: 420,
      maxExp: 1000,
      combatPower: 3850,
      skills: [{ id: 's1', name: '天眼洞察', desc: '情报产出速度额外 +25%', icon: '👁️' }],
      assignedFacilityId: 'diting',
      status: '驻扎中'
    },
    {
      id: 'off-2',
      name: '李华审校员',
      avatar: '👩‍🏫',
      role: '公文审校员',
      rarity: 'SSR',
      level: 10,
      maxLevel: 30,
      exp: 150,
      maxExp: 800,
      combatPower: 3100,
      skills: [{ id: 's2', name: '火眼金睛', desc: '扫雷识别准确率 +30%', icon: '🔍' }],
      assignedFacilityId: 'shudi',
      status: '驻扎中'
    },
    {
      id: 'off-3',
      name: '王刚指挥官',
      avatar: '👨‍💼',
      role: '指挥调度员',
      rarity: 'UR',
      level: 15,
      maxLevel: 50,
      exp: 900,
      maxExp: 1500,
      combatPower: 5200,
      skills: [{ id: 's3', name: '雷霆调度', desc: '应急响应冷却减少 40%', icon: '⚡' }],
      assignedFacilityId: 'zhihui',
      status: '驻扎中'
    },
    {
      id: 'off-4',
      name: '小陈先锋',
      avatar: '🧑‍💻',
      role: '网评先锋',
      rarity: 'SR',
      level: 8,
      maxLevel: 20,
      exp: 100,
      maxExp: 500,
      combatPower: 2100,
      skills: [{ id: 's4', name: '舆论辟谣', desc: '消除负面评论声量', icon: '📢' }],
      assignedFacilityId: null,
      status: '空闲'
    }
  ]);

  // 4. Random Emergency Events Queue State
  const [events, setEvents] = useState<EmergencyEvent[]>([
    {
      id: 'ev-101',
      title: '某自媒体发布园区爆料视频',
      category: '突发舆情',
      difficulty: '紧急',
      timeLeftSeconds: 45,
      maxTimeSeconds: 60,
      requiredRole: '舆情分析师',
      rewardData: 150,
      rewardGold: 300,
      trustPenalty: 5,
      assignedOfficerId: null,
      status: '待处置'
    },
    {
      id: 'ev-102',
      title: '属地发文草稿疑含职务措辞错误',
      category: '公文校验',
      difficulty: '普通',
      timeLeftSeconds: 90,
      maxTimeSeconds: 120,
      requiredRole: '公文审校员',
      rewardData: 100,
      rewardGold: 200,
      trustPenalty: 3,
      assignedOfficerId: null,
      status: '待处置'
    }
  ]);

  // Active Modals State
  const [selectedFacility, setSelectedFacility] = useState<BaseFacility | null>(null);
  const [isRosterOpen, setIsRosterOpen] = useState<boolean>(false);
  const [logMessages, setLogMessages] = useState<string[]>([
    '系统：基地设施自动巡航中，每秒持续产出情报与算力...',
    '通知：老严教官成功驻扎【谛听天眼情报阵列】，情报产出率 +25%！'
  ]);

  // Real-time Resource Idle Ticker (Every 1 Second)
  useEffect(() => {
    const timer = setInterval(() => {
      let totalDataInc = 0;
      let totalComputeInc = 0;

      facilities.forEach(fac => {
        if (fac.unlocked) {
          const officerBoost = fac.assignedOfficerId ? 1.25 : 1.0;
          totalDataInc += Math.floor(fac.dataRatePerSec * officerBoost * (fac.level / 2));
          totalComputeInc += Math.floor(fac.computeRatePerSec * officerBoost * (fac.level / 2));
        }
      });

      setResources(prev => ({
        ...prev,
        dataPoints: prev.dataPoints + Math.max(1, totalDataInc),
        computePower: prev.computePower + Math.max(1, totalComputeInc),
        goldCoins: prev.goldCoins + 2
      }));

      setEvents(prev => prev.map(ev => {
        if (ev.status === '待处置' && ev.timeLeftSeconds > 0) {
          return { ...ev, timeLeftSeconds: ev.timeLeftSeconds - 1 };
        }
        return ev;
      }));

    }, 1000);

    return () => clearInterval(timer);
  }, [facilities]);

  // Upgrade Facility Handler
  const handleUpgradeFacility = (facId: string) => {
    const target = facilities.find(f => f.id === facId);
    if (!target) return;

    if (resources.dataPoints < target.upgradeCostData || resources.goldCoins < target.upgradeCostGold) {
      alert('资源不足！升级所需情报点与经费未达到要求。');
      return;
    }

    setResources(prev => ({
      ...prev,
      dataPoints: prev.dataPoints - target.upgradeCostData,
      goldCoins: prev.goldCoins - target.upgradeCostGold
    }));

    setFacilities(prev => prev.map(f => {
      if (f.id === facId) {
        const newLevel = f.level + 1;
        return {
          ...f,
          level: newLevel,
          upgradeCostData: Math.floor(f.upgradeCostData * 1.6),
          upgradeCostGold: Math.floor(f.upgradeCostGold * 1.5),
          dataRatePerSec: Math.floor(f.dataRatePerSec * 1.4),
          computeRatePerSec: Math.floor(f.computeRatePerSec * 1.4)
        };
      }
      return f;
    }));

    setLogMessages(prev => [`🎉 成功将【${target.buildingName}】升级至 LV.${target.level + 1}！`, ...prev.slice(0, 5)]);
    setSelectedFacility(null);
  };

  // Dispatch Officer to Event Handler
  const handleResolveEvent = (eventId: string) => {
    const ev = events.find(e => e.id === eventId);
    if (!ev) return;

    setResources(prev => ({
      ...prev,
      dataPoints: prev.dataPoints + ev.rewardData,
      goldCoins: prev.goldCoins + ev.rewardGold
    }));

    setEvents(prev => prev.filter(e => e.id !== eventId));
    setLogMessages(prev => [`⚔️ 已化解【${ev.title}】，获得情报点 +${ev.rewardData}，经费 +${ev.rewardGold}！`, ...prev.slice(0, 5)]);
  };

  const getFacilityIcon = (id: string) => {
    switch (id) {
      case 'diting': return <Radio className="w-6 h-6 text-amber-400" />;
      case 'quanwang': return <Search className="w-6 h-6 text-cyan-400" />;
      case 'shudi': return <Building2 className="w-6 h-6 text-emerald-400" />;
      case 'diandian': return <MessageSquareText className="w-6 h-6 text-purple-400" />;
      case 'zhihui': return <FileText className="w-6 h-6 text-sky-400" />;
      case 'wangping': return <Users className="w-6 h-6 text-rose-400" />;
      case 'quanqiu': return <Globe className="w-6 h-6 text-indigo-400" />;
      case 'v8': return <ShieldCheck className="w-6 h-6 text-amber-300" />;
      default: return <Building2 className="w-6 h-6" />;
    }
  };

  return (
    <div className="min-h-screen bg-[#091122] text-slate-100 flex flex-col justify-between p-4 md:p-6 select-none relative overflow-hidden font-sans">
      
      {/* TOP RESOURCE & STATUS BAR */}
      <header className="bg-[#121c33] border-2 border-slate-700 p-4 rounded-2xl shadow-xl flex flex-col lg:flex-row items-center justify-between gap-4 z-20">
        
        {/* Commander Identity & Badge */}
        <div className="flex items-center gap-4 cursor-pointer" onClick={onOpenProfile}>
          <div className="w-14 h-14 rounded-xl bg-amber-500 flex items-center justify-center font-black text-2xl text-slate-950 shadow">
            统
          </div>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-xl font-black text-white tracking-wide">
                风暴中枢 · 舆情基地 (Cocos 养成版)
              </h1>
              <span className="px-3 py-1 rounded-lg bg-amber-500/20 border border-amber-500/50 text-amber-300 font-extrabold text-xs flex items-center gap-1.5">
                <Flame className="w-4 h-4 fill-current" /> LV.5 指挥官
              </span>
            </div>
            <p className="text-xs text-slate-300 font-medium mt-1">
              基地运行状态：8大设施自动巡航中 | 情报点与算力实时翻倍产出中
            </p>
          </div>
        </div>

        {/* Real-time Game Resources Counters (High Contrast) */}
        <div className="flex flex-wrap items-center gap-3 bg-[#0a1020] px-4 py-2.5 rounded-xl border border-slate-750">
          
          <div className="flex items-center gap-2.5 px-3 py-1.5 bg-[#121c33] rounded-lg border border-slate-700" title="基地公信力">
            <Shield className="w-4 h-4 text-emerald-400" />
            <div>
              <div className="text-xs text-slate-400 font-semibold">公信力</div>
              <div className="font-black text-sm text-emerald-400 font-num">{resources.trustScore} PTS</div>
            </div>
          </div>

          <div className="flex items-center gap-2.5 px-3 py-1.5 bg-[#121c33] rounded-lg border border-slate-700" title="实时情报点产出">
            <Database className="w-4 h-4 text-cyan-400" />
            <div>
              <div className="text-xs text-slate-400 font-semibold">情报点</div>
              <div className="font-black text-sm text-cyan-300 font-num">{resources.dataPoints.toLocaleString()}</div>
            </div>
          </div>

          <div className="flex items-center gap-2.5 px-3 py-1.5 bg-[#121c33] rounded-lg border border-slate-700" title="舆情算力">
            <Cpu className="w-4 h-4 text-purple-400" />
            <div>
              <div className="text-xs text-slate-400 font-semibold">舆情算力</div>
              <div className="font-black text-sm text-purple-300 font-num">{resources.computePower.toLocaleString()}</div>
            </div>
          </div>

          <div className="flex items-center gap-2.5 px-3 py-1.5 bg-[#121c33] rounded-lg border border-slate-700" title="应急经费">
            <Coins className="w-4 h-4 text-amber-400" />
            <div>
              <div className="text-xs text-slate-400 font-semibold">应急经费</div>
              <div className="font-black text-sm text-amber-300 font-num">￥{resources.goldCoins.toLocaleString()}</div>
            </div>
          </div>

          <button
            onClick={() => setIsRosterOpen(true)}
            className="px-4 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white font-extrabold text-xs rounded-xl shadow flex items-center gap-2 transition-transform hover:scale-105 cursor-pointer border border-cyan-400/40"
          >
            <Users className="w-4 h-4" />
            <span>特聘干员大厅 ({officers.length})</span>
          </button>

          <button
            onClick={onReturnToPortal}
            className="p-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl border border-slate-650 transition-colors cursor-pointer"
            title="返回系统主门头"
          >
            <Home className="w-4 h-4" />
          </button>

        </div>

      </header>

      {/* MAIN BASE MAP & WORKSPACE */}
      <main className="flex-1 grid grid-cols-1 lg:grid-cols-4 gap-4 my-4 items-stretch z-10">
        
        {/* LEFT PANEL: EMERGENCY EVENTS & RECENT LOGS */}
        <div className="lg:col-span-1 space-y-4 flex flex-col">
          
          {/* Emergency Events Queue Panel */}
          <div className="bg-[#121c33] rounded-2xl border-2 border-slate-700 p-4 shadow-xl space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 font-black text-sm text-rose-300">
                <AlertTriangle className="w-4 h-4 text-rose-400" />
                <span>突发舆情处置队列 ({events.length})</span>
              </div>
              <span className="text-xs text-slate-400 font-medium">派遣干员秒化解</span>
            </div>

            <div className="space-y-2.5">
              {events.length === 0 ? (
                <div className="p-4 rounded-xl bg-[#0a1020] border border-slate-700 text-center text-xs text-slate-300 font-medium">
                  🎉 当前无突发危机，全省网络空间安全稳定！
                </div>
              ) : (
                events.map(ev => (
                  <div key={ev.id} className="p-3.5 rounded-xl bg-[#0a1020] border border-rose-500/50 space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-0.5 rounded bg-rose-950 text-rose-200 text-xs font-bold border border-rose-500/40">
                        {ev.difficulty}
                      </span>
                      <div className="flex items-center gap-1 text-xs text-amber-400 font-num font-bold">
                        <Clock className="w-3.5 h-3.5" />
                        <span>倒计时: {ev.timeLeftSeconds}s</span>
                      </div>
                    </div>

                    <div>
                      <div className="font-extrabold text-xs text-white leading-snug">{ev.title}</div>
                      <div className="text-xs text-slate-300 font-medium mt-1">需求角色：{ev.requiredRole}</div>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-slate-750 text-xs">
                      <span className="text-cyan-300 font-bold">奖励: +{ev.rewardData}情报 / +${ev.rewardGold}</span>
                      <button
                        onClick={() => handleResolveEvent(ev.id)}
                        className="px-3 py-1 bg-rose-600 hover:bg-rose-500 text-white font-black rounded-lg shadow transition-colors cursor-pointer text-xs"
                      >
                        立即派遣处置 ➔
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Real-time Ticker Logs */}
          <div className="flex-1 bg-[#121c33] rounded-2xl border-2 border-slate-700 p-4 shadow-xl flex flex-col justify-between">
            <div className="font-black text-sm text-white mb-2 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span>基地日志与产出动态</span>
            </div>
            <div className="space-y-2 flex-1 overflow-y-auto pr-1">
              {logMessages.map((log, idx) => (
                <div key={idx} className="p-2.5 rounded-xl bg-[#0a1020] border border-slate-750 text-xs text-slate-200 font-medium leading-relaxed">
                  {log}
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* CENTER PANEL: 8 BASE BUILDINGS CAMPUS MAP */}
        <div className="lg:col-span-2 bg-[#121c33] rounded-2xl border-2 border-slate-700 p-5 shadow-xl flex flex-col justify-between relative overflow-hidden">
          
          {/* Base Map Header */}
          <div className="flex items-center justify-between mb-4 relative z-10">
            <div>
              <h2 className="text-xl font-black text-white flex items-center gap-2 tracking-wide">
                <Building2 className="w-5 h-5 text-cyan-400" />
                <span>舆情基地建筑全景图</span>
              </h2>
              <p className="text-xs text-slate-300 font-medium mt-0.5">点击建筑进行升级、分配驻扎干员并提升自动情报产出率</p>
            </div>
            
            <div className="flex items-center gap-2.5">
              <button
                onClick={onOpenPractice}
                className="px-3.5 py-2 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/50 font-extrabold text-xs rounded-xl flex items-center gap-1.5 cursor-pointer"
              >
                <Target className="w-4 h-4" />
                <span>进入特训靶场</span>
              </button>
              
              <button
                onClick={onOpenLevelSelect}
                className="px-4 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-black text-xs rounded-xl shadow flex items-center gap-2 cursor-pointer border border-cyan-400/40"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>出征推演关卡 ➔</span>
              </button>
            </div>
          </div>

          {/* 8 Tech Facilities Grid (High Readability) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 relative z-10">
            {facilities.map(fac => {
              const assignedOfficer = officers.find(o => o.id === fac.assignedOfficerId);
              return (
                <div
                  key={fac.id}
                  onClick={() => setSelectedFacility(fac)}
                  className="p-4 rounded-xl bg-[#0a1020] border-2 border-slate-700 hover:border-cyan-400 transition-all cursor-pointer group flex flex-col justify-between h-40 shadow-md"
                >
                  {/* Facility Card Top Info */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="p-2 rounded-lg bg-[#121c33] border border-slate-700 group-hover:scale-105 transition-transform">
                        {getFacilityIcon(fac.id)}
                      </div>
                      <span className="px-2.5 py-0.5 rounded bg-cyan-900 text-cyan-200 border border-cyan-500/50 text-xs font-black font-num">
                        LV.{fac.level}
                      </span>
                    </div>

                    <div className="font-black text-sm text-white group-hover:text-cyan-300 transition-colors truncate">
                      {fac.buildingName}
                    </div>
                    <div className="text-xs text-slate-300 font-medium truncate mt-0.5">{fac.name}</div>
                  </div>

                  {/* Facility Bottom Status & Assigned Officer */}
                  <div className="pt-2 border-t border-slate-750 flex items-center justify-between text-xs">
                    <span className="text-cyan-300 font-bold font-num">+{fac.dataRatePerSec}点/s</span>
                    {assignedOfficer ? (
                      <span className="px-2 py-0.5 rounded bg-amber-950 text-amber-200 border border-amber-500/50 text-xs font-bold flex items-center gap-1">
                        <span>{assignedOfficer.avatar}</span>
                        <span className="truncate max-w-[50px]">{assignedOfficer.name}</span>
                      </span>
                    ) : (
                      <span className="text-slate-400 text-xs font-semibold">可驻扎</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Interactive Guidance */}
          <div className="mt-4 p-3.5 rounded-xl bg-[#0a1020] border border-slate-700 flex items-center justify-between text-xs relative z-10">
            <div className="flex items-center gap-2 text-slate-200 font-medium">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>小贴士：给【谛听天眼】与【属地审校所】驻扎特聘干员，可额外获得 +25% 情报产出加成！</span>
            </div>
            <button
              onClick={() => setIsRosterOpen(true)}
              className="text-cyan-300 hover:text-cyan-200 font-extrabold underline text-xs cursor-pointer"
            >
              管理人员驻扎 ➔
            </button>
          </div>

        </div>

        {/* RIGHT PANEL: COMMANDER POWER & STATS */}
        <div className="lg:col-span-1 space-y-4 flex flex-col justify-between">
          
          {/* Commander Battle Power Box */}
          <div className="bg-[#121c33] rounded-2xl border-2 border-slate-700 p-4 shadow-xl space-y-3.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 font-black text-sm text-amber-300">
                <Award className="w-4 h-4 text-amber-400" />
                <span>基地总舆情战力</span>
              </div>
              <span className="px-2.5 py-0.5 rounded bg-amber-500 text-slate-950 font-black text-xs">
                S+ 级战队
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-[#0a1020] border border-amber-500/40 text-center">
              <div className="text-xs text-slate-300 font-semibold mb-0.5">全省舆情应急推演总评分</div>
              <div className="text-3xl font-black font-num text-amber-400 tracking-wider">
                14,850 <span className="text-xs font-normal text-slate-300">PTS</span>
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between text-slate-200 font-bold">
                <span>分析力 (谛听预警)</span>
                <span className="text-amber-400 font-black">95 / 100</span>
              </div>
              <div className="w-full bg-[#0a1020] rounded-full h-2 overflow-hidden border border-slate-700">
                <div className="bg-amber-400 h-full rounded-full w-[95%]" />
              </div>

              <div className="flex justify-between text-slate-200 font-bold">
                <span>扫雷精准度 (属地公文)</span>
                <span className="text-cyan-300 font-black">92 / 100</span>
              </div>
              <div className="w-full bg-[#0a1020] rounded-full h-2 overflow-hidden border border-slate-700">
                <div className="bg-cyan-400 h-full rounded-full w-[92%]" />
              </div>

              <div className="flex justify-between text-slate-200 font-bold">
                <span>反击火力 (网评兵团)</span>
                <span className="text-rose-400 font-black">88 / 100</span>
              </div>
              <div className="w-full bg-[#0a1020] rounded-full h-2 overflow-hidden border border-slate-700">
                <div className="bg-rose-400 h-full rounded-full w-[88%]" />
              </div>
            </div>
          </div>

          {/* Quick Certificate Wall Entry */}
          <div
            onClick={onOpenProfile}
            className="p-4 rounded-2xl bg-[#121c33] border-2 border-slate-700 hover:border-indigo-400 transition-all cursor-pointer shadow-xl flex items-center justify-between group"
          >
            <div>
              <div className="font-extrabold text-sm text-indigo-300 group-hover:text-indigo-200">
                防伪通关证书与勋章墙
              </div>
              <div className="text-xs text-slate-300 font-medium mt-0.5">已点亮 2 / 4 本权威学时证书</div>
            </div>
            <ChevronRight className="w-5 h-5 text-indigo-400 group-hover:translate-x-1 transition-transform" />
          </div>

        </div>

      </main>

      {/* FACILITY UPGRADE MODAL */}
      {selectedFacility && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#121c33] border-2 border-slate-650 w-full max-w-lg rounded-2xl p-6 shadow-2xl space-y-4">
            
            <div className="flex items-center justify-between border-b border-slate-700 pb-3">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-[#0a1020] rounded-xl border border-slate-700">
                  {getFacilityIcon(selectedFacility.id)}
                </div>
                <div>
                  <h3 className="text-xl font-black text-white">{selectedFacility.buildingName}</h3>
                  <div className="text-xs text-slate-300 font-medium">系统代号：{selectedFacility.name}</div>
                </div>
              </div>
              <span className="px-3 py-1 bg-cyan-900 text-cyan-200 border border-cyan-500/50 font-black text-xs rounded-full">
                LV.{selectedFacility.level} / {selectedFacility.maxLevel}
              </span>
            </div>

            <div className="p-4 rounded-xl bg-[#0a1020] border border-slate-700 space-y-2 text-xs">
              <div className="font-extrabold text-amber-300 text-sm">当前设施加成效果：</div>
              <div className="text-slate-200 font-medium leading-relaxed text-xs">{selectedFacility.perkDesc}</div>
              <div className="flex justify-between pt-2 border-t border-slate-750 text-xs">
                <span className="text-slate-300">实时情报产出效率：</span>
                <span className="text-cyan-300 font-black font-num">+{selectedFacility.dataRatePerSec} 点情报 / 秒</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#0a1020] border border-slate-700 space-y-2 text-xs">
              <div className="font-extrabold text-white text-sm">升级至 LV.{selectedFacility.level + 1} 消耗资源：</div>
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-cyan-300">需求情报点：{selectedFacility.upgradeCostData}</span>
                <span className="text-amber-300">需求应急经费：${selectedFacility.upgradeCostGold}</span>
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setSelectedFacility(null)}
                className="flex-1 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 font-extrabold text-xs rounded-xl cursor-pointer"
              >
                取消
              </button>
              <button
                onClick={() => handleUpgradeFacility(selectedFacility.id)}
                className="flex-1 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs rounded-xl shadow cursor-pointer"
              >
                生 级 设 施 ➔
              </button>
            </div>

          </div>
        </div>
      )}

      {/* OFFICER ROSTER MODAL */}
      {isRosterOpen && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#121c33] border-2 border-slate-650 w-full max-w-2xl rounded-2xl p-6 shadow-2xl space-y-4 max-h-[85vh] flex flex-col justify-between">
            
            <div className="flex items-center justify-between border-b border-slate-700 pb-3">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-cyan-400" />
                <h3 className="text-xl font-black text-white">特聘舆情干员大厅 (养成与驻扎)</h3>
              </div>
              <button
                onClick={() => setIsRosterOpen(false)}
                className="text-slate-300 hover:text-white font-extrabold text-xs cursor-pointer"
              >
                ✕ 关闭
              </button>
            </div>

            <div className="space-y-3 overflow-y-auto pr-1 flex-1">
              {officers.map(off => (
                <div key={off.id} className="p-4 rounded-xl bg-[#0a1020] border border-slate-700 flex items-center justify-between gap-4">
                  
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-[#121c33] border border-slate-700 flex items-center justify-center text-2xl">
                      {off.avatar}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-sm text-white">{off.name}</span>
                        <span className={`px-2 py-0.5 rounded text-xs font-black ${
                          off.rarity === 'UR' ? 'bg-purple-900 text-purple-200 border border-purple-500' :
                          off.rarity === 'SSR' ? 'bg-amber-900 text-amber-200 border border-amber-500' :
                          'bg-cyan-900 text-cyan-200 border border-cyan-500'
                        }`}>
                          {off.rarity}
                        </span>
                      </div>
                      <div className="text-xs text-slate-300 font-medium mt-1">
                        角色：{off.role} | LV.{off.level} (战力 {off.combatPower})
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-right text-xs">
                      <div className="text-slate-300 font-medium">状态：<span className="text-amber-400 font-bold">{off.status}</span></div>
                      <div className="text-xs text-slate-400 mt-0.5">技能：{off.skills[0]?.name}</div>
                    </div>
                    <button
                      onClick={() => {
                        alert(`【${off.name}】等级 +1！经验增加，战力提升！`);
                      }}
                      className="px-3.5 py-2 bg-cyan-900 hover:bg-cyan-800 text-cyan-200 border border-cyan-500/50 font-extrabold text-xs rounded-xl cursor-pointer"
                    >
                      升 级
                    </button>
                  </div>

                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-slate-700 flex justify-end">
              <button
                onClick={() => setIsRosterOpen(false)}
                className="px-5 py-2 bg-slate-800 text-slate-100 font-extrabold text-xs rounded-xl cursor-pointer"
              >
                完成配置
              </button>
            </div>

          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="text-center text-xs text-slate-400 font-medium z-10 pt-2 border-t border-slate-800">
        《风暴中枢：舆情指挥官》Cocos Creator 养成系重构版 | 重新定位为“基地建造 + 干员养成 + 动态应急推演”模式
      </footer>

    </div>
  );
};
