import React from 'react';
import { Shield, Settings, Zap, ChevronRight, Building2 } from 'lucide-react';

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
    <div className="min-h-screen bg-[#091122] text-slate-100 flex flex-col items-center justify-center p-6 relative overflow-hidden font-sans">
      
      {/* Central Title Header */}
      <div className="text-center max-w-4xl mx-auto space-y-4 mb-10 relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-950 border border-cyan-500/50 text-cyan-300 text-xs font-bold tracking-widest shadow">
          <Zap className="w-4 h-4 text-cyan-400" />
          面向党政机关与网信系统的全域舆情应急演练平台
        </div>

        <h1 className="text-4xl md:text-5xl font-black tracking-wider text-white drop-shadow">
          风暴中枢 · 舆情应急推演系统
        </h1>

        <p className="text-sm md:text-base text-slate-200 font-medium max-w-2xl mx-auto leading-relaxed">
          从“被动填鸭学”到“主动打通关” —— 融汇 8 大应用生态装备，支持原版大厅与全新 Cocos 养成系基地模拟推演！
        </p>
      </div>

      {/* 3 Entry Choice Cards (High contrast & legibility) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl w-full relative z-10">
        
        {/* Card 1: Cocos Creator Growth System */}
        <div
          onClick={onSelectCocosGrowth}
          className="group relative bg-[#121c33] border-2 border-emerald-500/60 hover:border-emerald-400 rounded-2xl p-6 cursor-pointer transition-all duration-300 shadow-xl hover:-translate-y-1.5 flex flex-col justify-between overflow-hidden"
        >
          <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-emerald-500 text-slate-950 text-xs font-extrabold shadow">
            🔥 全新 Cocos 养成重构版
          </div>

          <div>
            <div className="flex items-center justify-between mb-4 mt-2">
              <div className="w-14 h-14 rounded-xl bg-emerald-500/20 border border-emerald-400/50 flex items-center justify-center text-emerald-300 group-hover:scale-105 transition-transform">
                <Building2 className="w-8 h-8" />
              </div>
            </div>

            <h2 className="text-xl font-black text-white mb-2 group-hover:text-emerald-300 transition-colors">
              Cocos 养成系主基地
            </h2>

            <p className="text-sm text-slate-200 leading-relaxed mb-4 font-medium">
              全新 Cocos 模拟养成模式！建造升级 8 大科技建筑设施，招募并培养舆情特聘干员，实时自动翻倍产出情报与算力，应对突发事件！
            </p>
          </div>

          <div className="pt-3 border-t border-slate-700 flex items-center justify-between text-xs font-black text-emerald-400 group-hover:text-emerald-300">
            <span>进入 Cocos 指挥基地</span>
            <div className="w-7 h-7 rounded-full bg-emerald-500/20 flex items-center justify-center group-hover:translate-x-1 transition-transform">
              <ChevronRight className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* Card 2: V8 Client */}
        <div
          onClick={onSelectV8Client}
          className="group relative bg-[#121c33] border-2 border-cyan-500/60 hover:border-cyan-400 rounded-2xl p-6 cursor-pointer transition-all duration-300 shadow-xl hover:-translate-y-1.5 flex flex-col justify-between overflow-hidden"
        >
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="w-14 h-14 rounded-xl bg-cyan-500/20 border border-cyan-400/50 flex items-center justify-center text-cyan-300 group-hover:scale-105 transition-transform">
                <Shield className="w-8 h-8" />
              </div>
              <span className="px-3 py-1 rounded-full bg-cyan-900 text-cyan-200 font-extrabold text-xs border border-cyan-500/50">
                原版经典大厅
              </span>
            </div>

            <h2 className="text-xl font-black text-white mb-2 group-hover:text-cyan-300 transition-colors">
              进入 V8 客户端
            </h2>

            <p className="text-sm text-slate-200 leading-relaxed mb-4 font-medium">
              经典演练主大厅。包含练兵场新手指引特训、6大事件真实案例推演作战、天梯榜、点点密信与防伪通关证书墙。
            </p>
          </div>

          <div className="pt-3 border-t border-slate-700 flex items-center justify-between text-xs font-black text-cyan-400 group-hover:text-cyan-300">
            <span>开启演练作战大厅</span>
            <div className="w-7 h-7 rounded-full bg-cyan-500/20 flex items-center justify-center group-hover:translate-x-1 transition-transform">
              <ChevronRight className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* Card 3: MT Management Admin */}
        <div
          onClick={onSelectMTAdmin}
          className="group relative bg-[#121c33] border-2 border-amber-500/60 hover:border-amber-400 rounded-2xl p-6 cursor-pointer transition-all duration-300 shadow-xl hover:-translate-y-1.5 flex flex-col justify-between overflow-hidden"
        >
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="w-14 h-14 rounded-xl bg-amber-500/20 border border-amber-400/50 flex items-center justify-center text-amber-300 group-hover:scale-105 transition-transform">
                <Settings className="w-8 h-8" />
              </div>
              <span className="px-3 py-1 rounded-full bg-amber-950 text-amber-200 font-extrabold text-xs border border-amber-500/50">
                管理与案例中枢
              </span>
            </div>

            <h2 className="text-xl font-black text-white mb-2 group-hover:text-amber-300 transition-colors">
              进入 MT 管理端
            </h2>

            <p className="text-sm text-slate-200 leading-relaxed mb-4 font-medium">
              教练员控制台。查阅学员演练得分排名、新增/编辑舆情真实案例关卡试题库、监控 8 大软件资产调用频次。
            </p>
          </div>

          <div className="pt-3 border-t border-slate-700 flex items-center justify-between text-xs font-black text-amber-400 group-hover:text-amber-300">
            <span>进入 MT 管理控制台</span>
            <div className="w-7 h-7 rounded-full bg-amber-500/20 flex items-center justify-center group-hover:translate-x-1 transition-transform">
              <ChevronRight className="w-4 h-4" />
            </div>
          </div>
        </div>

      </div>

      {/* Footer System Specs */}
      <div className="mt-10 text-center text-xs text-slate-300 font-medium relative z-10 flex items-center gap-3">
        <span>全域舆情应急演练系统 v2.0 PRO</span>
        <span>•</span>
        <span>已集成谛听/全网搜/属地/密信/流转/网评/全球眼/V8八大应用生态</span>
      </div>

    </div>
  );
};
