import React from 'react';
import { Shield, Radio, Trophy, Award, Target, Flame, Activity, User, Bell } from 'lucide-react';

interface HeaderProps {
  currentTab: 'battlefield' | 'target-practice';
  setCurrentTab: (tab: 'battlefield' | 'target-practice') => void;
  openSettlement: () => void;
  openLeaderboard: () => void;
  openCertificate: () => void;
  trustScore: number;
  sentimentPeak: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  setCurrentTab,
  openSettlement,
  openLeaderboard,
  openCertificate,
  trustScore,
  sentimentPeak,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#080d1e]/90 backdrop-blur-md border-b border-cyan-500/20 px-4 py-2.5 shadow-2xl">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        
        {/* Brand & Stage Info */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-start">
          <div className="flex items-center gap-2.5">
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-400/40 glow-cyan">
              <Shield className="w-6 h-6 text-cyan-400 animate-pulse-subtle" />
              <div className="absolute inset-0 rounded-xl bg-cyan-400/10 animate-ping opacity-25" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-extrabold font-cyber tracking-wider bg-gradient-to-r from-cyan-300 via-sky-100 to-indigo-300 bg-clip-text text-transparent">
                  风暴中枢
                </h1>
                <span className="px-2 py-0.5 text-[10px] font-mono font-bold rounded bg-cyan-950/80 text-cyan-400 border border-cyan-500/30">
                  v2.0 PRO
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium">全域舆情应急推演作战系统</p>
            </div>
          </div>

          {/* Active Level Badge */}
          <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold">
            <Flame className="w-3.5 h-3.5 text-amber-400 animate-bounce" />
            <span>【第2关·白银】园区突发火灾救援推演</span>
          </div>
        </div>

        {/* Realtime Metrics */}
        <div className="flex items-center gap-4 bg-slate-900/80 px-4 py-1.5 rounded-xl border border-slate-800 text-xs">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-emerald-400" />
            <span className="text-slate-400">官方公信力:</span>
            <span className={`font-num font-bold text-sm ${trustScore > 80 ? 'text-emerald-400' : 'text-amber-400'}`}>
              {trustScore} / 100
            </span>
          </div>
          <div className="h-4 w-px bg-slate-800" />
          <div className="flex items-center gap-2">
            <Radio className="w-4 h-4 text-cyan-400 animate-pulse" />
            <span className="text-slate-400">负面声量峰值:</span>
            <span className="font-num font-bold text-sm text-cyan-300">
              {sentimentPeak} <span className="text-[10px] text-slate-400">条/分</span>
            </span>
          </div>
        </div>

        {/* Actions & Navigation */}
        <div className="flex items-center gap-2 w-full md:w-auto justify-end">
          {/* Main Navigation Tabs */}
          <div className="flex bg-slate-950 p-1 rounded-lg border border-slate-800 text-xs">
            <button
              onClick={() => setCurrentTab('battlefield')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium transition-all ${
                currentTab === 'battlefield'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Shield className="w-3.5 h-3.5" />
              推演作战室
            </button>

            <button
              onClick={() => setCurrentTab('target-practice')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium transition-all ${
                currentTab === 'target-practice'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Target className="w-3.5 h-3.5 text-amber-400" />
              单兵战术靶场
            </button>
          </div>

          {/* Modal Action Triggers */}
          <button
            onClick={openLeaderboard}
            className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold rounded-lg bg-indigo-950/60 hover:bg-indigo-900/80 text-indigo-300 border border-indigo-500/30 transition-all"
            title="全省天梯榜"
          >
            <Trophy className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">天梯榜</span>
          </button>

          <button
            onClick={openCertificate}
            className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold rounded-lg bg-emerald-950/60 hover:bg-emerald-900/80 text-emerald-300 border border-emerald-500/30 transition-all"
            title="V8通关证书"
          >
            <Award className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden sm:inline">防伪证书</span>
          </button>

          <button
            onClick={openSettlement}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 shadow-lg glow-gold transition-all"
          >
            <Award className="w-4 h-4" />
            <span>LOL战力结算</span>
          </button>
        </div>

      </div>
    </header>
  );
};
