import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Award, Trophy, Zap, AlertCircle, RefreshCw, X, ChevronRight, CheckCircle2, ShieldCheck, Flame, Star, Sparkles, Building2 } from 'lucide-react';

interface SettlementModalProps {
  isOpen: boolean;
  onClose: () => void;
  trustScore: number;
  fixedErrorsCount: number;
  levelTitle?: string;
  nextLevelId?: number;
  equipmentScore?: number; // 来自练兵场的装备积分
}

export const SettlementModal: React.FC<SettlementModalProps> = ({
  isOpen,
  onClose,
  trustScore,
  fixedErrorsCount,
  levelTitle = '演练场 2 · 高新区园区火灾救援推演',
  nextLevelId = 3,
  equipmentScore = 1250
}) => {
  useEffect(() => {
    if (isOpen) {
      confetti({
        particleCount: 120,
        spread: 100,
        origin: { y: 0.5 }
      });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Total combat power calculation breakdown: Base (1500) + Practice Equipment Score (1250) + Accuracy Bonus (800)
  const totalCombatPower = 1500 + equipmentScore + (fixedErrorsCount * 250);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4 animate-fadeIn select-none font-sans">
      
      {/* 2D Cartoon Victory Modal Box (100% yqyl.jfif Artwork Theme) */}
      <div className="relative w-full max-w-4xl bg-[#1b2b4b] border-4 border-amber-400 rounded-3xl shadow-2xl overflow-hidden text-slate-100">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-[#0d1629] border-2 border-sky-400 text-white font-black hover:bg-sky-500 flex items-center justify-center transition-all cursor-pointer shadow"
        >
          <X className="w-5 h-5" />
        </button>

        {/* 2D Victory Header Banner */}
        <div className="bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 p-6 text-center relative overflow-hidden text-slate-950">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-slate-950 text-amber-300 font-black text-xs uppercase tracking-widest mb-2 shadow-md">
            ★ VICTORY 实战演练场战力结算 ★
          </div>

          <h2 className="text-3xl md:text-4xl font-black tracking-wider text-slate-950 drop-shadow">
            【战力结算评级：S+ 破浪大师】
          </h2>

          <p className="text-xs font-bold text-slate-900 mt-1">
            本场总战力结算：<span className="font-black text-slate-950 text-base font-num">{totalCombatPower.toLocaleString()} PTS</span>（已读取练兵场装备积分加成）
          </p>
        </div>

        {/* Modal Main Content */}
        <div className="p-6 space-y-5">
          
          {/* Practice Camp Equipment Score Calculation Highlights */}
          <div className="p-4 bg-[#0d1629] rounded-2xl border-2 border-sky-400/80 space-y-3">
            <div className="flex items-center justify-between font-black text-amber-300 text-sm">
              <span className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-400" />
                【实战演练场战力结算公式明细】
              </span>
              <span className="text-xs bg-sky-400 text-slate-950 px-2.5 py-0.5 rounded-full font-black">
                包含练兵场积分
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs font-bold">
              <div className="p-3 bg-[#182645] rounded-xl border border-sky-400/40">
                <span className="text-slate-300">1. 案例基础通关分：</span>
                <div className="text-lg font-black text-white font-num mt-1">+1,500 PTS</div>
              </div>

              <div className="p-3 bg-[#182645] rounded-xl border border-amber-400/60">
                <span className="text-amber-300">2. 练兵场积累装备积分：</span>
                <div className="text-lg font-black text-amber-300 font-num mt-1">+{equipmentScore} PTS</div>
                <div className="text-[10px] text-slate-400">调用 8 大练兵营装备</div>
              </div>

              <div className="p-3 bg-[#182645] rounded-xl border border-emerald-400/40">
                <span className="text-emerald-300">3. 发现/处置精准度加成：</span>
                <div className="text-lg font-black text-emerald-300 font-num mt-1">+{fixedErrorsCount * 250} PTS</div>
                <div className="text-[10px] text-slate-400">属地扫雷揪出 {fixedErrorsCount} 个错处</div>
              </div>
            </div>
          </div>

          {/* Grid: Left 5-Axis Spider Chart + Right Performance Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            
            {/* SVG 5-Axis Spider Radar Chart */}
            <div className="bg-[#0d1629] p-4 rounded-2xl border-2 border-amber-400/60 flex flex-col items-center">
              <span className="text-xs font-black text-amber-300 mb-2">【五维应用装备战力拓扑】</span>

              <div className="relative w-60 h-60 flex items-center justify-center">
                <svg className="w-full h-full" viewBox="0 0 200 200">
                  <polygon points="100,20 176,75 147,165 53,165 24,75" fill="none" stroke="#334155" strokeWidth="1.5" />
                  <polygon points="100,50 148,88 130,140 70,140 52,88" fill="none" stroke="#334155" strokeWidth="1" strokeDasharray="2 2" />

                  <line x1="100" y1="100" x2="100" y2="20" stroke="#334155" />
                  <line x1="100" y1="100" x2="176" y2="75" stroke="#334155" />
                  <line x1="100" y1="100" x2="147" y2="165" stroke="#334155" />
                  <line x1="100" y1="100" x2="53" y2="165" stroke="#334155" />
                  <line x1="100" y1="100" x2="24" y2="75" stroke="#334155" />

                  <polygon
                    points="100,24 170,78 140,158 58,158 30,78"
                    fill="rgba(251, 191, 36, 0.35)"
                    stroke="#fbbf24"
                    strokeWidth="3"
                  />

                  <circle cx="100" cy="24" r="4" fill="#fbbf24" />
                  <circle cx="170" cy="78" r="4" fill="#fbbf24" />
                  <circle cx="140" cy="158" r="4" fill="#fbbf24" />
                  <circle cx="58" cy="158" r="4" fill="#fbbf24" />
                  <circle cx="30" cy="78" r="4" fill="#fbbf24" />

                  <text x="100" y="12" fill="#38bdf8" fontSize="10" fontWeight="bold" textAnchor="middle">谛听雷达 96</text>
                  <text x="184" y="78" fill="#38bdf8" fontSize="10" fontWeight="bold" textAnchor="start">全网探针 92</text>
                  <text x="152" y="178" fill="#38bdf8" fontSize="10" fontWeight="bold" textAnchor="start">密信调度 88</text>
                  <text x="48" y="178" fill="#4ade80" fontSize="10" fontWeight="bold" textAnchor="end">属地扫雷 98</text>
                  <text x="16" y="78" fill="#38bdf8" fontSize="10" fontWeight="bold" textAnchor="end">网评对抗 90</text>
                </svg>
              </div>
            </div>

            {/* Battle Performance High Score Details */}
            <div className="space-y-2.5 text-xs font-bold">
              <h4 className="font-black text-white mb-2 flex items-center gap-1.5 text-sm">
                <Trophy className="w-4 h-4 text-amber-400" />
                本演练场高光对局数据
              </h4>

              <div className="p-3 rounded-xl bg-[#0d1629] border border-slate-700 flex items-center justify-between">
                <span className="text-slate-300">舆情监测发现耗时：</span>
                <span className="font-black text-emerald-400 font-num">01分20秒 (黄金发现)</span>
              </div>

              <div className="p-3 rounded-xl bg-[#0d1629] border border-slate-700 flex items-center justify-between">
                <span className="text-slate-300">属地公文扫雷排错：</span>
                <span className="font-black text-amber-300 font-num">100% 揪出 {fixedErrorsCount} 个错字</span>
              </div>

              <div className="p-3 rounded-xl bg-[#0d1629] border border-slate-700 flex items-center justify-between">
                <span className="text-slate-300">处置公信力得分：</span>
                <span className="font-black text-cyan-300 font-num">{trustScore} / 100 满分</span>
              </div>

              <div className="p-3 rounded-xl bg-[#0d1629] border border-slate-700 flex items-center justify-between">
                <span className="text-slate-300">网评四维战术矩阵：</span>
                <span className="font-black text-emerald-400 font-num">“赞/转/评/报”全达成</span>
              </div>
            </div>

          </div>

          {/* Bottom Action Footer */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              onClick={onClose}
              className="px-6 py-2.5 bg-[#0d1629] hover:bg-slate-800 text-slate-200 font-black text-xs rounded-2xl cursor-pointer border border-slate-700"
            >
              关闭战力结算大屏
            </button>

            <button
              onClick={onClose}
              className="px-6 py-2.5 bg-gradient-to-r from-amber-400 to-yellow-300 hover:from-amber-300 hover:to-yellow-200 text-slate-950 font-black text-xs rounded-2xl shadow-lg flex items-center gap-1.5 cursor-pointer border-2 border-white transition-transform hover:scale-105"
            >
              <span>进入下一演练场：【第{nextLevelId}演练场】 ➔</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};

