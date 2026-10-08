import React from 'react';
import { Shield, Settings, Zap, ChevronRight } from 'lucide-react';

interface PortalSelectionProps {
  onSelectV8Client: () => void;
  onSelectMTAdmin: () => void;
}

export const PortalSelection: React.FC<PortalSelectionProps> = ({
  onSelectV8Client,
  onSelectMTAdmin,
}) => {
  return (
    <div className="min-h-screen bg-[#040711] bg-cyber-grid text-slate-100 flex flex-col items-center justify-center p-6 relative overflow-hidden selection:bg-cyan-500 selection:text-black">
      
      {/* Background Glows */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      
      {/* Central Title Header */}
      <div className="text-center max-w-4xl mx-auto space-y-4 mb-12 relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-xs font-cyber font-bold tracking-widest shadow-glow">
          <Zap className="w-4 h-4 text-cyan-400 animate-bounce" />
          面向党政机关与网信系统的全域舆情应急演练平台
        </div>

        <h1 className="text-4xl md:text-6xl font-black font-cyber tracking-wider bg-gradient-to-r from-cyan-300 via-sky-100 to-indigo-300 bg-clip-text text-transparent drop-shadow-2xl">
          风暴中枢 · 舆情应急推演系统
        </h1>

        <p className="text-sm md:text-base text-slate-400 font-medium max-w-2xl mx-auto leading-relaxed">
          从“被动填鸭学”到“主动打通关” —— 融汇 8 大应用生态装备，以 3A 游戏化实战与 AI 动态模拟锻造意识形态安全铁军。
        </p>
      </div>

      {/* 2 Entry Choice Cards (V8 Client & MT Admin) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl w-full relative z-10">
        
        {/* Card 1: V8 Client */}
        <div
          onClick={onSelectV8Client}
          className="group relative bg-slate-900/80 hover:bg-slate-900 border-2 border-cyan-500/40 hover:border-cyan-400 rounded-3xl p-8 cursor-pointer transition-all duration-300 shadow-2xl hover:-translate-y-2 glow-cyan flex flex-col justify-between overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl group-hover:bg-cyan-400/20 transition-all" />

          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="w-16 h-16 rounded-2xl bg-cyan-500/20 border border-cyan-400/50 flex items-center justify-center text-cyan-300 group-hover:scale-110 transition-transform glow-cyan">
                <Shield className="w-9 h-9" />
              </div>
              <span className="px-3 py-1 rounded-full bg-cyan-950 text-cyan-300 font-bold text-xs border border-cyan-500/40">
                主演练大厅
              </span>
            </div>

            <h2 className="text-2xl font-black font-cyber text-slate-100 mb-3 group-hover:text-cyan-300 transition-colors">
              进入 V8 客户端
            </h2>

            <p className="text-xs text-slate-400 leading-relaxed mb-6">
              学员演练主大厅。包含练兵场新手指引特训、6大事件真实案例推演作战、天梯榜、加密点点密信与防伪通关证书墙。
            </p>
          </div>

          <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs font-bold text-cyan-400 group-hover:text-cyan-300">
            <span>开启演练作战大厅</span>
            <div className="w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center group-hover:translate-x-1 transition-transform">
              <ChevronRight className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Card 2: MT Management Admin */}
        <div
          onClick={onSelectMTAdmin}
          className="group relative bg-slate-900/80 hover:bg-slate-900 border-2 border-amber-500/40 hover:border-amber-400 rounded-3xl p-8 cursor-pointer transition-all duration-300 shadow-2xl hover:-translate-y-2 glow-gold flex flex-col justify-between overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl group-hover:bg-amber-400/20 transition-all" />

          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="w-16 h-16 rounded-2xl bg-amber-500/20 border border-amber-400/50 flex items-center justify-center text-amber-300 group-hover:scale-110 transition-transform glow-gold">
                <Settings className="w-9 h-9" />
              </div>
              <span className="px-3 py-1 rounded-full bg-amber-950 text-amber-300 font-bold text-xs border border-amber-500/40">
                管理与案例中枢
              </span>
            </div>

            <h2 className="text-2xl font-black font-cyber text-slate-100 mb-3 group-hover:text-amber-300 transition-colors">
              进入 MT 管理端
            </h2>

            <p className="text-xs text-slate-400 leading-relaxed mb-6">
              管理与教练员控制台。查阅学员演练得分排名、新增/编辑舆情真实案例关卡试题库、监控 8 大软件资产调用频次。
            </p>
          </div>

          <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs font-bold text-amber-400 group-hover:text-amber-300">
            <span>进入 MT 管理控制台</span>
            <div className="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center group-hover:translate-x-1 transition-transform">
              <ChevronRight className="w-5 h-5" />
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
