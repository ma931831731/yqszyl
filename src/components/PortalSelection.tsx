import React, { useState } from 'react';
import { Shield, Trophy, Settings, HelpCircle, Mail, Target, Play, BookOpen } from 'lucide-react';
import { PixiCartoonCanvas } from './CocosGrowth/PixiCartoonCanvas';

interface PortalSelectionProps {
  onSelectV8Client: () => void;
  onSelectCocosGrowth: () => void;
  onSelectMTAdmin: () => void;
  onSelectPractice?: () => void;
  onSelectBattlefield?: () => void;
  onOpenLeaderboard?: () => void;
  onOpenProfile?: () => void;
}

export const PortalSelection: React.FC<PortalSelectionProps> = ({
  onSelectV8Client,
  onSelectCocosGrowth,
  onSelectMTAdmin,
  onSelectPractice,
  onSelectBattlefield,
  onOpenLeaderboard,
  onOpenProfile
}) => {
  const [showGuideModal, setShowGuideModal] = useState(false);

  return (
    <div className="min-h-screen bg-[#09152b] text-slate-100 flex flex-col justify-between p-4 md:p-6 select-none relative overflow-hidden font-sans">
      
      {/* 60FPS Pixi.js Floating Embers & Particle Sparks */}
      <PixiCartoonCanvas />

      {/* Full-screen 100% yqyl.jfif Background Artwork */}
      <div 
        className="fixed inset-0 bg-cover bg-center pointer-events-none z-0 scale-100"
        style={{ backgroundImage: `url('/yqyl.jfif')` }}
      />
      <div className="fixed inset-0 bg-black/10 pointer-events-none z-0" />

      {/* TOP HEADER HOTKEYS & AVATAR STATUS OVERLAY */}
      <header className="relative z-10 flex items-center justify-between gap-4 max-w-7xl mx-auto w-full">
        {/* Left Avatar & Currency (Aligned over yqyl.jfif top bar) */}
        <div className="flex items-center gap-3">
          <div 
            onClick={() => onOpenProfile ? onOpenProfile() : onSelectV8Client()}
            className="flex items-center gap-3 bg-[#1d2b4a]/90 border-2 border-sky-400 p-1.5 pr-4 rounded-2xl shadow-xl cursor-pointer hover:scale-105 transition-transform"
          >
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-sky-400 to-blue-600 border-2 border-white flex items-center justify-center font-black text-xl text-white shadow">
              👩‍💼
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-black text-xs text-white drop-shadow">守网指挥官</span>
                <span className="px-2 py-0.5 rounded-full bg-amber-400 text-slate-950 font-black text-[10px]">
                  等级: 1
                </span>
              </div>
              <div className="w-24 bg-[#0a1122] rounded-full h-2 mt-1 border border-sky-400/50 overflow-hidden">
                <div className="bg-gradient-to-r from-amber-400 to-yellow-300 h-full rounded-full w-[70%]" />
              </div>
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-2 bg-[#1d2b4a]/90 border-2 border-sky-400/80 px-3 py-1.5 rounded-xl shadow font-bold text-xs text-amber-300">
            <span>⚡ 能量 100/100</span>
          </div>
          <div className="hidden sm:flex items-center gap-2 bg-[#1d2b4a]/90 border-2 border-sky-400/80 px-3 py-1.5 rounded-xl shadow font-bold text-xs text-sky-300">
            <span>🏆 学分 12,850</span>
          </div>
        </div>

        {/* Right Buttons: Settings (MT Admin), Mail, Help */}
        <div className="flex items-center gap-2.5">
          <button 
            onClick={onSelectMTAdmin}
            className="w-10 h-10 rounded-xl bg-[#1d2b4a]/90 border-2 border-sky-400 hover:bg-sky-500 text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform cursor-pointer"
            title="进入 MT 管理控制台"
          >
            <Settings className="w-5 h-5" />
          </button>
          <button 
            onClick={() => alert('【密信收件箱】暂无新的警报通报！')}
            className="w-10 h-10 rounded-xl bg-[#1d2b4a]/90 border-2 border-sky-400 hover:bg-sky-500 text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform cursor-pointer"
            title="通知与密信"
          >
            <Mail className="w-5 h-5" />
          </button>
          <button 
            onClick={() => setShowGuideModal(true)}
            className="w-10 h-10 rounded-xl bg-[#1d2b4a]/90 border-2 border-sky-400 hover:bg-sky-500 text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform cursor-pointer"
            title="帮助与系统说明"
          >
            <HelpCircle className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* CENTER INTERACTIVE CARDS HOT-ZONES OVERLAY (100% Match yqyl.jfif 4 Cards) */}
      <main className="relative z-10 max-w-6xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-8 my-auto p-2">
        
        {/* CARD 1: 【练兵场】 (技能训练与提升 - 左上面板) */}
        <div
          onClick={() => onSelectPractice ? onSelectPractice() : onSelectV8Client()}
          className="group relative h-56 md:h-64 rounded-3xl border-4 border-sky-400 hover:border-white bg-[#0e1b38]/40 hover:bg-[#0e1b38]/70 backdrop-blur-xs transition-all cursor-pointer shadow-2xl hover:scale-[1.02] flex flex-col justify-between p-6 overflow-hidden"
        >
          <div className="flex items-center justify-between">
            <span className="px-3.5 py-1 rounded-full bg-sky-400 text-slate-950 font-black text-xs shadow-md">
              技能训练与提升
            </span>
            <span className="text-xs font-black text-sky-200 bg-[#1d2b4a]/80 px-2.5 py-0.5 rounded-lg border border-sky-400/40">
              8 大应用练兵营
            </span>
          </div>

          <div>
            <h2 className="text-3xl md:text-4xl font-black text-white drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)] tracking-wider group-hover:text-sky-300 transition-colors">
              练 兵 场
            </h2>
            <p className="text-xs text-sky-100 font-bold leading-relaxed mt-2 drop-shadow max-w-md">
              进入多个练兵营选择特训！学习升级应用功能装备，颁发专属装备证书，积累实战战力积分。
            </p>
          </div>

          <div className="flex items-center justify-between text-xs font-black text-sky-300 pt-3 border-t border-sky-400/40">
            <span>点击进入练兵营特训 ➔</span>
            <div className="w-9 h-9 rounded-xl bg-sky-400 text-slate-950 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
              <Target className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* CARD 2: 【演练实战场】 (真实危机对抗 - 右上面板) */}
        <div
          onClick={() => onSelectBattlefield ? onSelectBattlefield() : onSelectCocosGrowth()}
          className="group relative h-56 md:h-64 rounded-3xl border-4 border-amber-400 hover:border-white bg-[#261c0d]/40 hover:bg-[#261c0d]/70 backdrop-blur-xs transition-all cursor-pointer shadow-2xl hover:scale-[1.02] flex flex-col justify-between p-6 overflow-hidden"
        >
          <div className="flex items-center justify-between">
            <span className="px-3.5 py-1 rounded-full bg-amber-400 text-slate-950 font-black text-xs shadow-md">
              真实危机对抗
            </span>
            <span className="text-xs font-black text-amber-200 bg-[#1d2b4a]/80 px-2.5 py-0.5 rounded-lg border border-amber-400/40">
              多个实战演练场分块
            </span>
          </div>

          <div>
            <h2 className="text-3xl md:text-4xl font-black text-white drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)] tracking-wider group-hover:text-amber-300 transition-colors">
              演 练 实 战 场
            </h2>
            <p className="text-xs text-amber-100 font-bold leading-relaxed mt-2 drop-shadow max-w-md">
              多个演练场分块展示，逐关解锁挑战！组合练兵场积累装备，演练舆情发现、跟踪、处置全过程战力结算。
            </p>
          </div>

          <div className="flex items-center justify-between text-xs font-black text-amber-300 pt-3 border-t border-amber-400/40">
            <span>点击进入实战演练室 ➔</span>
            <div className="w-9 h-9 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
              <Play className="w-5 h-5 fill-current" />
            </div>
          </div>
        </div>

        {/* CARD 3: 【排行榜单】 (荣誉与成就 - 左下面板) */}
        <div
          onClick={() => {
            if (onOpenLeaderboard) onOpenLeaderboard();
            else onSelectV8Client();
          }}
          className="group relative h-56 md:h-64 rounded-3xl border-4 border-yellow-400 hover:border-white bg-[#2b1c21]/40 hover:bg-[#2b1c21]/70 backdrop-blur-xs transition-all cursor-pointer shadow-2xl hover:scale-[1.02] flex flex-col justify-between p-6 overflow-hidden"
        >
          <div className="flex items-center justify-between">
            <span className="px-3.5 py-1 rounded-full bg-yellow-400 text-slate-950 font-black text-xs shadow-md">
              荣誉与成就
            </span>
            <span className="text-xs font-black text-yellow-200 bg-[#1d2b4a]/80 px-2.5 py-0.5 rounded-lg border border-yellow-400/40">
              全省战队积分表
            </span>
          </div>

          <div>
            <h2 className="text-3xl md:text-4xl font-black text-white drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)] tracking-wider group-hover:text-yellow-300 transition-colors">
              排 行 榜 单
            </h2>
            <p className="text-xs text-yellow-100 font-bold leading-relaxed mt-2 drop-shadow max-w-md">
              查阅全省参演干部及本机构战队积分排名！点亮权威防伪学时电子证书与防伪通关勋章墙。
            </p>
          </div>

          <div className="flex items-center justify-between text-xs font-black text-yellow-300 pt-3 border-t border-yellow-400/40">
            <span>点击查看天梯排行榜单 ➔</span>
            <div className="w-9 h-9 rounded-xl bg-yellow-400 text-slate-950 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
              <Trophy className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* CARD 4: 【功能介绍】 (系统功能指南 & MT管理端 - 右下面板) */}
        <div
          onClick={onSelectMTAdmin}
          className="group relative h-56 md:h-64 rounded-3xl border-4 border-cyan-400 hover:border-white bg-[#10243b]/40 hover:bg-[#10243b]/70 backdrop-blur-xs transition-all cursor-pointer shadow-2xl hover:scale-[1.02] flex flex-col justify-between p-6 overflow-hidden"
        >
          <div className="flex items-center justify-between">
            <span className="px-3.5 py-1 rounded-full bg-cyan-400 text-slate-950 font-black text-xs shadow-md">
              系统功能指南
            </span>
            <span className="text-xs font-black text-cyan-200 bg-[#1d2b4a]/80 px-2.5 py-0.5 rounded-lg border border-cyan-400/40">
              MT 管理控制台
            </span>
          </div>

          <div>
            <h2 className="text-3xl md:text-4xl font-black text-white drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)] tracking-wider group-hover:text-cyan-300 transition-colors">
              功 能 介 绍
            </h2>
            <p className="text-xs text-cyan-100 font-bold leading-relaxed mt-2 drop-shadow max-w-md">
              教练员控制中枢。包含 8 大生态软件配置、练兵场完成度积分规则设定、关卡真实案例多事件组合编辑。
            </p>
          </div>

          <div className="flex items-center justify-between text-xs font-black text-cyan-300 pt-3 border-t border-cyan-400/40">
            <span>点击进入 MT 管理控制台 ➔</span>
            <div className="w-9 h-9 rounded-xl bg-cyan-400 text-slate-950 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
              <BookOpen className="w-5 h-5" />
            </div>
          </div>
        </div>

      </main>

      {/* SYSTEM HELP GUIDE MODAL */}
      {showGuideModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-[#182645] border-4 border-sky-400 w-full max-w-xl rounded-3xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-sky-400/40 pb-3">
              <h3 className="text-xl font-black text-white">《舆情演练系统》2D 卡通 RPG 玩法指南</h3>
              <button 
                onClick={() => setShowGuideModal(false)}
                className="text-slate-300 hover:text-white font-black text-sm cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-200 font-medium leading-relaxed">
              <div className="p-3 bg-[#0d1629] rounded-xl border border-slate-700">
                <span className="font-extrabold text-amber-300">1. 练兵场：</span>提供 8 大系统的单兵微练（公文扫雷、探针打标、雷达校准），积累装备技能与积分。
              </div>
              <div className="p-3 bg-[#0d1629] rounded-xl border border-slate-700">
                <span className="font-extrabold text-sky-300">2. 演练实战场：</span>组合在练兵场中积累的应用功能装备，通关 6 大真实突发危机案例。
              </div>
              <div className="p-3 bg-[#0d1629] rounded-xl border border-slate-700">
                <span className="font-extrabold text-yellow-300">3. 排行榜单：</span>展示全省干部参演得分与权威防伪学时电子证书墙。
              </div>
              <div className="p-3 bg-[#0d1629] rounded-xl border border-slate-700">
                <span className="font-extrabold text-cyan-300">4. 功能介绍 (MT管理端)：</span>教练员可在此自定义配置关卡突发事件与练兵积分规则。
              </div>
            </div>

            <div className="pt-2 text-right">
              <button 
                onClick={() => setShowGuideModal(false)}
                className="px-5 py-2 bg-sky-400 text-slate-950 font-black text-xs rounded-xl shadow hover:bg-sky-300 cursor-pointer"
              >
                好的，开始演练
              </button>
            </div>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="relative z-10 text-center text-xs text-sky-200 font-bold pt-3 border-t border-sky-400/30 drop-shadow">
        《风暴中枢：舆情演练系统》2D 卡通 RPG 整体入口 | 全面契合 yqyl.jfif 美术风格并集成 Pixi.js 粒子引擎
      </footer>

    </div>
  );
};
