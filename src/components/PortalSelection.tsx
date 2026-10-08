import React, { useState } from 'react';
import { Shield, Trophy, Settings, HelpCircle, Mail, Plus, Flame, BookOpen, Target, Play, ChevronRight, Zap } from 'lucide-react';
import { PixiCartoonCanvas } from './CocosGrowth/PixiCartoonCanvas';

interface PortalSelectionProps {
  onSelectV8Client: () => void;
  onSelectCocosGrowth: () => void;
  onSelectMTAdmin: () => void;
  onOpenLeaderboard?: () => void;
}

export const PortalSelection: React.FC<PortalSelectionProps> = ({
  onSelectV8Client,
  onSelectCocosGrowth,
  onSelectMTAdmin,
  onOpenLeaderboard,
}) => {
  const [showGuideModal, setShowGuideModal] = useState(false);

  return (
    <div className="min-h-screen bg-[#111e38] text-slate-100 flex flex-col justify-between p-4 md:p-6 select-none relative overflow-hidden font-sans">
      
      {/* 1. Pixi.js 2D Particle Engine Canvas (60FPS Embers & Floating HUD) */}
      <PixiCartoonCanvas />

      {/* 2. 2D Game Background Image Layer (yqyl.jfif) */}
      <div 
        className="fixed inset-0 bg-cover bg-center opacity-40 pointer-events-none z-0"
        style={{ backgroundImage: `url('/yqyl.jfif')` }}
      />
      <div className="fixed inset-0 bg-gradient-to-t from-[#091122]/90 via-[#091122]/60 to-[#091122]/80 pointer-events-none z-0" />

      {/* 3. TOP 2D GAME PLAYER STATUS BAR (匹配 yqyl.jfif 顶部玩家面板) */}
      <header className="relative z-10 flex items-center justify-between gap-4 max-w-7xl mx-auto w-full">
        
        {/* Left: Avatar + Player Level + Energy + Credits */}
        <div className="flex flex-wrap items-center gap-3">
          
          {/* Avatar Box (Q版卡通指挥官) */}
          <div className="flex items-center gap-3 bg-[#1e2d4a] border-2 border-sky-400 p-2 pr-4 rounded-2xl shadow-lg">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-sky-400 to-indigo-500 border-2 border-white flex items-center justify-center font-black text-xl text-white shadow">
              👩‍💼
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-black text-sm text-white drop-shadow">守网指挥官</span>
                <span className="px-2 py-0.5 rounded-full bg-amber-400 text-slate-950 font-black text-[10px]">
                  等级: 1
                </span>
              </div>
              
              {/* Exp Bar */}
              <div className="w-28 bg-[#0d1629] rounded-full h-2 mt-1 border border-sky-400/40 overflow-hidden">
                <div className="bg-gradient-to-r from-amber-400 to-yellow-300 h-full rounded-full w-[65%]" />
              </div>
            </div>
          </div>

          {/* Energy Pill */}
          <div className="flex items-center gap-2 bg-[#1e2d4a] border-2 border-sky-400/60 px-3 py-1.5 rounded-xl shadow">
            <Zap className="w-4 h-4 text-amber-400 fill-current" />
            <span className="text-xs font-black text-white">能量</span>
            <span className="text-xs font-black text-amber-300 font-num">100/100</span>
            <button className="w-5 h-5 rounded-md bg-amber-400 text-slate-950 font-black text-xs flex items-center justify-center hover:bg-amber-300 cursor-pointer ml-1">
              +
            </button>
          </div>

          {/* Credits Pill */}
          <div className="flex items-center gap-2 bg-[#1e2d4a] border-2 border-sky-400/60 px-3 py-1.5 rounded-xl shadow">
            <Trophy className="w-4 h-4 text-sky-400" />
            <span className="text-xs font-black text-white">学分</span>
            <span className="text-xs font-black text-sky-300 font-num">12,850</span>
            <button className="w-5 h-5 rounded-md bg-sky-400 text-slate-950 font-black text-xs flex items-center justify-center hover:bg-sky-300 cursor-pointer ml-1">
              +
            </button>
          </div>

        </div>

        {/* Right: Game Action Buttons (⚙️ 设置, ✉️ 消息, ❓ 帮助) */}
        <div className="flex items-center gap-2.5">
          <button 
            onClick={onSelectMTAdmin}
            className="w-10 h-10 rounded-xl bg-[#1e2d4a] border-2 border-sky-400/80 hover:bg-sky-600 text-white flex items-center justify-center shadow-lg transition-transform hover:scale-105 cursor-pointer"
            title="管理中枢 (MT管理端)"
          >
            <Settings className="w-5 h-5" />
          </button>
          <button 
            className="w-10 h-10 rounded-xl bg-[#1e2d4a] border-2 border-sky-400/80 hover:bg-sky-600 text-white flex items-center justify-center shadow-lg transition-transform hover:scale-105 cursor-pointer"
            title="通知密信"
          >
            <Mail className="w-5 h-5" />
          </button>
          <button 
            onClick={() => setShowGuideModal(true)}
            className="w-10 h-10 rounded-xl bg-[#1e2d4a] border-2 border-sky-400/80 hover:bg-sky-600 text-white flex items-center justify-center shadow-lg transition-transform hover:scale-105 cursor-pointer"
            title="系统指南与帮助"
          >
            <HelpCircle className="w-5 h-5" />
          </button>
        </div>

      </header>

      {/* 4. CENTRAL CARTOON TITLE (完全复刻 yqyl.jfif 中央3D卡通立体标题) */}
      <div className="relative z-10 text-center my-4">
        <div className="inline-block relative">
          
          {/* Glowing Halo */}
          <div className="absolute inset-0 bg-sky-400/20 rounded-full blur-2xl pointer-events-none" />

          {/* 3D Gradient Text */}
          <h1 className="text-4xl md:text-6xl font-black font-cyber tracking-wider text-transparent bg-clip-text bg-gradient-to-b from-white via-sky-200 to-cyan-400 drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)] stroke-white">
            舆 情 演 练 系 统
          </h1>
          <p className="text-sm font-bold text-sky-200 mt-1 tracking-widest drop-shadow">
            全域应急响应 · 3A 游戏化实战推演
          </p>
        </div>
      </div>

      {/* 5. 4 CARTOON GAME FUNCTIONAL CARDS (100% 对应 yqyl.jfif 四大主功能板块) */}
      <div className="relative z-10 max-w-6xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-6 my-auto">
        
        {/* CARD 1: 【练兵场】 (技能训练与提升 - 对应 yqyl.jfif 左上面板) */}
        <div
          onClick={onSelectV8Client}
          className="group p-6 rounded-3xl bg-gradient-to-b from-[#1b2b4b] to-[#121c33] border-4 border-sky-400 hover:border-sky-300 transition-all cursor-pointer shadow-2xl hover:-translate-y-1.5 relative overflow-hidden flex flex-col justify-between h-56"
        >
          {/* Card Inner Banner */}
          <div className="flex items-center justify-between">
            <span className="px-3 py-1 rounded-full bg-sky-500 text-slate-950 font-black text-xs shadow">
              技能训练与提升
            </span>
            <span className="text-xs font-bold text-sky-300">单兵装备速练</span>
          </div>

          <div>
            <h3 className="text-3xl font-black text-white tracking-wide group-hover:text-sky-300 transition-colors drop-shadow mb-2">
              练 兵 场
            </h3>
            <p className="text-xs text-slate-200 font-medium leading-relaxed">
              将 8 大软件装备拆解为 1 分钟趣味靶场（公文扫雷排错、探针打打标、雷达校准）。在此积累技能与完成度积分！
            </p>
          </div>

          <div className="pt-3 border-t border-sky-400/40 flex items-center justify-between text-xs font-black text-sky-300">
            <span>进入练兵场特训 ➔</span>
            <div className="w-8 h-8 rounded-xl bg-sky-500 text-slate-950 font-black flex items-center justify-center group-hover:translate-x-1 transition-transform">
              <Target className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* CARD 2: 【演练实战场】 (真实危机对抗 - 对应 yqyl.jfif 右上面板) */}
        <div
          onClick={onSelectCocosGrowth}
          className="group p-6 rounded-3xl bg-gradient-to-b from-[#2b2416] to-[#121c33] border-4 border-amber-400 hover:border-amber-300 transition-all cursor-pointer shadow-2xl hover:-translate-y-1.5 relative overflow-hidden flex flex-col justify-between h-56"
        >
          {/* Card Inner Banner */}
          <div className="flex items-center justify-between">
            <span className="px-3 py-1 rounded-full bg-amber-400 text-slate-950 font-black text-xs shadow">
              真实危机对抗
            </span>
            <span className="text-xs font-bold text-amber-300">Pixi/Cocos 2D 互动主基地</span>
          </div>

          <div>
            <h3 className="text-3xl font-black text-white tracking-wide group-hover:text-amber-300 transition-colors drop-shadow mb-2">
              演 练 实 战 场
            </h3>
            <p className="text-xs text-slate-200 font-medium leading-relaxed">
              调用练兵场积累的应用装备组合，出征 6 大真实舆情案例关卡！包含 2D 画布基地建设、特聘干员养成与战力结算大屏。
            </p>
          </div>

          <div className="pt-3 border-t border-amber-400/40 flex items-center justify-between text-xs font-black text-amber-300">
            <span>进入实战推演战场 ➔</span>
            <div className="w-8 h-8 rounded-xl bg-amber-400 text-slate-950 font-black flex items-center justify-center group-hover:translate-x-1 transition-transform">
              <Play className="w-5 h-5 fill-current" />
            </div>
          </div>
        </div>

        {/* CARD 3: 【排行榜单】 (荣誉与成就 - 对应 yqyl.jfif 左面板) */}
        <div
          onClick={() => {
            if (onOpenLeaderboard) onOpenLeaderboard();
            else onSelectV8Client();
          }}
          className="group p-6 rounded-3xl bg-gradient-to-b from-[#2d1b24] to-[#121c33] border-4 border-yellow-400 hover:border-yellow-300 transition-all cursor-pointer shadow-2xl hover:-translate-y-1.5 relative overflow-hidden flex flex-col justify-between h-56"
        >
          <div className="flex items-center justify-between">
            <span className="px-3 py-1 rounded-full bg-yellow-400 text-slate-950 font-black text-xs shadow">
              荣誉与成就
            </span>
            <span className="text-xs font-bold text-yellow-300">全省战队排名</span>
          </div>

          <div>
            <h3 className="text-3xl font-black text-white tracking-wide group-hover:text-yellow-300 transition-colors drop-shadow mb-2">
              排 行 榜 单
            </h3>
            <p className="text-xs text-slate-200 font-medium leading-relaxed">
              查阅全省参演干部及本机构战队排名！点亮权威防伪学时电子证书与荣誉防伪通关勋章墙。
            </p>
          </div>

          <div className="pt-3 border-t border-yellow-400/40 flex items-center justify-between text-xs font-black text-yellow-300">
            <span>查看全省天梯榜单 ➔</span>
            <div className="w-8 h-8 rounded-xl bg-yellow-400 text-slate-950 font-black flex items-center justify-center group-hover:translate-x-1 transition-transform">
              <Trophy className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* CARD 4: 【功能介绍】 (系统功能指南 & MT管理端 - 对应 yqyl.jfif 右面板) */}
        <div
          onClick={onSelectMTAdmin}
          className="group p-6 rounded-3xl bg-gradient-to-b from-[#1b2a3d] to-[#121c33] border-4 border-cyan-400 hover:border-cyan-300 transition-all cursor-pointer shadow-2xl hover:-translate-y-1.5 relative overflow-hidden flex flex-col justify-between h-56"
        >
          <div className="flex items-center justify-between">
            <span className="px-3 py-1 rounded-full bg-cyan-400 text-slate-950 font-black text-xs shadow">
              系统功能指南
            </span>
            <span className="text-xs font-bold text-cyan-300">MT 管理控制台</span>
          </div>

          <div>
            <h3 className="text-3xl font-black text-white tracking-wide group-hover:text-cyan-300 transition-colors drop-shadow mb-2">
              功 能 介 绍
            </h3>
            <p className="text-xs text-slate-200 font-medium leading-relaxed">
              教练员与管理员中枢。包含 8 大生态软件配置、练兵场完成度积分规则设定、关卡真实案例多事件组合编辑。
            </p>
          </div>

          <div className="pt-3 border-t border-cyan-400/40 flex items-center justify-between text-xs font-black text-cyan-300">
            <span>进入 MT 管理中枢 ➔</span>
            <div className="w-8 h-8 rounded-xl bg-cyan-400 text-slate-950 font-black flex items-center justify-center group-hover:translate-x-1 transition-transform">
              <BookOpen className="w-5 h-5" />
            </div>
          </div>
        </div>

      </div>

      {/* SYSTEM GUIDE MODAL */}
      {showGuideModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-[#182645] border-4 border-sky-400 w-full max-w-xl rounded-3xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-sky-400/40 pb-3">
              <h3 className="text-xl font-black text-white">舆情演练系统 · 2D 游戏功能指南</h3>
              <button 
                onClick={() => setShowGuideModal(false)}
                className="text-slate-300 hover:text-white font-extrabold text-xs cursor-pointer"
              >
                ✕ 关闭
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-200 font-medium leading-relaxed">
              <div className="p-3 bg-[#0d1629] rounded-xl border border-slate-700">
                <span className="font-bold text-amber-300">1. 练兵场：</span>提供单兵战术练习（公文扫雷、探针打标、雷达预警），积攒装备完成度与积分。
              </div>
              <div className="p-3 bg-[#0d1629] rounded-xl border border-slate-700">
                <span className="font-bold text-sky-300">2. 演练实战场：</span>组合在练兵场中积累的应用功能装备，通关 6 大突发危机案例。
              </div>
              <div className="p-3 bg-[#0d1629] rounded-xl border border-slate-700">
                <span className="font-bold text-yellow-300">3. 排行榜单：</span>展示全省干部参演得分与权威学时防伪电子证书墙。
              </div>
              <div className="p-3 bg-[#0d1629] rounded-xl border border-slate-700">
                <span className="font-bold text-cyan-300">4. 功能介绍 (MT管理端)：</span>教练员可在此自定义配置关卡突发事件与练兵积分规则。
              </div>
            </div>

            <div className="pt-2 text-right">
              <button 
                onClick={() => setShowGuideModal(false)}
                className="px-5 py-2 bg-sky-500 text-slate-950 font-black text-xs rounded-xl shadow hover:bg-sky-400 cursor-pointer"
              >
                好的，开始演练
              </button>
            </div>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="relative z-10 text-center text-xs text-slate-300 font-medium pt-3 border-t border-sky-400/30">
        《风暴中枢：舆情演练系统》2D 卡通 RPG 游戏入口 | 集成 8 大生态应用装备与 60FPS Pixi 2D 粒子引擎
      </footer>

    </div>
  );
};
