import React from 'react';
import { Shield, Settings, Zap, ChevronRight } from 'lucide-react';

interface PortalSelectionProps {
  onSelectV8Client: () => void;
  onSelectCocosGrowth: () => void;
  onSelectMTAdmin: () => void;
}

export const PortalSelection: React.FC<PortalSelectionProps> = ({
  onSelectV8Client,
  onSelectCocosGrowth,
  onSelectMTAdmin,
}) => {
  return (
    <div className="min-h-screen bg-[#040711] bg-cyber-grid text-slate-100 flex flex-col items-center justify-center p-6 relative overflow-hidden selection:bg-cyan-500 selection:text-black">
      
      {/* Background Glows */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      
      {/* Central Title Header */}
      <div className="text-center max-w-4xl mx-auto space-y-4 mb-8 relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-xs font-cyber font-bold tracking-widest shadow-glow">
          <Zap className="w-4 h-4 text-cyan-400 animate-bounce" />
          面向党政机关与网信系统的全域舆情应急演练平台
        </div>

        <h1 className="text-4xl md:text-6xl font-black font-cyber tracking-wider bg-gradient-to-r from-cyan-300 via-sky-100 to-indigo-300 bg-clip-text text-transparent drop-shadow-2xl">
          风暴中枢 · 舆情应急推演系统
        </h1>

        <p className="text-sm md:text-base text-slate-400 font-medium max-w-2xl mx-auto leading-relaxed">
          从“被动填鸭学”到“主动打通关” —— 融汇 8 大应用生态装备，支持原版大厅与全新 Cocos 养成系基地模拟推演！
        </p>
      </div>

      {/* 3 Entry Choice Cards (Cocos Growth, V8 Client & MT Admin) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl w-full relative z-10">
        
        {/* Card 1: Cocos Creator Growth System (NEW Feature Branch Remake) */}
        <div
          onClick={onSelectCocosGrowth}
          className="group relative bg-gradient-to-b from-slate-900 via-slate-900/95 to-slate-950 border-2 border-emerald-500/50 hover:border-emerald-400 rounded-3xl p-6 cursor-pointer transition-all duration-300 shadow-2xl hover:-translate-y-2 glow-cyan flex flex-col justify-between overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl group-hover:bg-emerald-400/20 transition-all" />
          <div className="absolute top-3 right-3 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] font-bold">
            🔥 全新 Cocos 养成重构版
          </div>

          <div>
            <div className="flex items-center justify-between mb-4 mt-2">
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 border border-emerald-400/50 flex items-center justify-center text-emerald-300 group-hover:scale-110 transition-transform glow-cyan">
                <Shield className="w-8 h-8" />
              </div>
            </div>

            <h2 className="text-xl font-black font-cyber text-slate-100 mb-2 group-hover:text-emerald-300 transition-colors">
              Cocos 养成系主基地
            </h2>

            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              全新 Cocos 模拟养成模式！建造升级 8 大科技建筑设施，招募并培养舆情特聘干员，实时自动翻倍产出情报与算力，应对突发事件！
            </p>
          </div>

          <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs font-bold text-emerald-400 group-hover:text-emerald-300">
            <span>进入 Cocos 指挥基地</span>
            <div className="w-7 h-7 rounded-full bg-emerald-500/20 flex items-center justify-center group-hover:translate-x-1 transition-transform">
              <ChevronRight className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* Card 2: V8 Client */}
        <div
          onClick={onSelectV8Client}
          className="group relative bg-slate-900/80 hover:bg-slate-900 border-2 border-cyan-500/40 hover:border-cyan-400 rounded-3xl p-6 cursor-pointer transition-all duration-300 shadow-2xl hover:-translate-y-2 glow-cyan flex flex-col justify-between overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl group-hover:bg-cyan-400/20 transition-all" />

          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="w-14 h-14 rounded-2xl bg-cyan-500/20 border border-cyan-400/50 flex items-center justify-center text-cyan-300 group-hover:scale-110 transition-transform glow-cyan">
                <Shield className="w-8 h-8" />
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-cyan-950 text-cyan-300 font-bold text-[10px] border border-cyan-500/40">
                原版经典大厅
              </span>
            </div>

            <h2 className="text-xl font-black font-cyber text-slate-100 mb-2 group-hover:text-cyan-300 transition-colors">
              进入 V8 客户端
            </h2>

            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              经典演练主大厅。包含练兵场新手指引特训、6大事件真实案例推演作战、天梯榜、点点密信与防伪通关证书墙。
            </p>
          </div>

          <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs font-bold text-cyan-400 group-hover:text-cyan-300">
            <span>开启演练作战大厅</span>
            <div className="w-7 h-7 rounded-full bg-cyan-500/20 flex items-center justify-center group-hover:translate-x-1 transition-transform">
              <ChevronRight className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* Card 3: MT Management Admin */}
        <div
          onClick={onSelectMTAdmin}
          className="group relative bg-slate-900/80 hover:bg-slate-900 border-2 border-amber-500/40 hover:border-amber-400 rounded-3xl p-6 cursor-pointer transition-all duration-300 shadow-2xl hover:-translate-y-2 glow-gold flex flex-col justify-between overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl group-hover:bg-amber-400/20 transition-all" />

          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="w-14 h-14 rounded-2xl bg-amber-500/20 border border-amber-400/50 flex items-center justify-center text-amber-300 group-hover:scale-110 transition-transform glow-gold">
                <Settings className="w-8 h-8" />
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-amber-950 text-amber-300 font-bold text-[10px] border border-amber-500/40">
                管理与案例中枢
              </span>
            </div>

            <h2 className="text-xl font-black font-cyber text-slate-100 mb-2 group-hover:text-amber-300 transition-colors">
              进入 MT 管理端
            </h2>

            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              教练员控制台。查阅学员演练得分排名、新增/编辑舆情真实案例关卡试题库、监控 8 大软件资产调用频次。
            </p>
          </div>

          <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs font-bold text-amber-400 group-hover:text-amber-300">
            <span>进入 MT 管理控制台</span>
            <div className="w-7 h-7 rounded-full bg-amber-500/20 flex items-center justify-center group-hover:translate-x-1 transition-transform">
              <ChevronRight className="w-4 h-4" />
            </div>
          </div>
        </div>

      </div>

      {/* Footer System Specs */}
      <div className="mt-12 text-center text-xs text-slate-500 relative z-10 flex items-center gap-4">
        <span>全域舆情应急演练系统 v2.0 PRO</span>
        <span>•</span>
        <span>已全面集成谛听/全网搜/属地/密信/流转/网评/全球眼/V8八大生态</span>
      </div>

    </div>
  );
};
