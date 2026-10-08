import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Award, Trophy, Zap, AlertCircle, RefreshCw, X, ChevronRight, CheckCircle2, ShieldCheck, Flame } from 'lucide-react';

interface SettlementModalProps {
  isOpen: boolean;
  onClose: () => void;
  trustScore: number;
  fixedErrorsCount: number;
  levelTitle?: string;
  nextLevelId?: number;
}

export const SettlementModal: React.FC<SettlementModalProps> = ({
  isOpen,
  onClose,
  trustScore,
  fixedErrorsCount,
  levelTitle = '第2关·白银园区火灾救援推演',
  nextLevelId = 3
}) => {
  useEffect(() => {
    if (isOpen) {
      confetti({
        particleCount: 90,
        spread: 80,
        origin: { y: 0.6 }
      });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4 animate-fadeIn select-none">
      <div className="relative w-full max-w-4xl bg-[#090d1f] border-2 border-amber-500/50 rounded-3xl shadow-2xl overflow-hidden glow-gold">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Victory Header Banner */}
        <div className="bg-gradient-to-r from-amber-600/30 via-amber-500/20 to-amber-600/30 border-b border-amber-500/40 p-6 text-center relative overflow-hidden">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-amber-500/20 border border-amber-400/50 text-amber-300 font-cyber font-bold text-xs uppercase tracking-widest mb-2 shadow-glow">
            ★ VICTORY 战力结算大屏 ★
          </div>

          <h2 className="text-3xl md:text-4xl font-extrabold font-cyber tracking-wider bg-gradient-to-r from-amber-200 via-amber-400 to-amber-100 bg-clip-text text-transparent">
            【关卡评级：S+ 破浪大师】
          </h2>

          <p className="text-xs text-amber-300/80 mt-1 font-medium">
            击败全省 <span className="font-bold text-amber-300 text-sm font-num">95.4%</span> 的演练学员！通关积分已计入个人档案并点亮证书
          </p>
        </div>

        {/* Modal Main Content */}
        <div className="p-6 space-y-6">
          
          {/* Learner & Level Quick Stats Header */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-950/80 p-3.5 rounded-2xl border border-slate-800 text-xs">
            <div>
              <span className="text-slate-500">演练学员：</span>
              <span className="font-bold text-slate-200">守网卫士_01</span>
            </div>
            <div>
              <span className="text-slate-500">通关关卡：</span>
              <span className="font-bold text-cyan-300">{levelTitle}</span>
            </div>
            <div>
              <span className="text-slate-500">通关耗时：</span>
              <span className="font-bold font-num text-amber-300">06分15秒 (S级)</span>
            </div>
            <div>
              <span className="text-slate-500">官方公信力：</span>
              <span className="font-bold font-num text-emerald-400">{trustScore} / 100</span>
            </div>
          </div>

          {/* Grid: Left 5-Axis Spider Chart + Right Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            
            {/* SVG 5-Axis Spider Radar Chart */}
            <div className="bg-slate-950/60 p-4 rounded-2xl border border-amber-500/20 flex flex-col items-center">
              <span className="text-xs font-bold text-amber-300 mb-2">【五维战斗力雷达拓扑图】</span>

              <div className="relative w-64 h-64 flex items-center justify-center">
                <svg className="w-full h-full" viewBox="0 0 200 200">
                  {/* Outer Pentagon Grid */}
                  <polygon points="100,20 176,75 147,165 53,165 24,75" fill="none" stroke="#1e293b" strokeWidth="1.5" />
                  <polygon points="100,50 148,88 130,140 70,140 52,88" fill="none" stroke="#1e293b" strokeWidth="1" strokeDasharray="2 2" />

                  {/* Axes Lines */}
                  <line x1="100" y1="100" x2="100" y2="20" stroke="#1e293b" />
                  <line x1="100" y1="100" x2="176" y2="75" stroke="#1e293b" />
                  <line x1="100" y1="100" x2="147" y2="165" stroke="#1e293b" />
                  <line x1="100" y1="100" x2="53" y2="165" stroke="#1e293b" />
                  <line x1="100" y1="100" x2="24" y2="75" stroke="#1e293b" />

                  {/* Player Score Polygon */}
                  <polygon
                    points="100,24 170,78 140,158 58,158 30,78"
                    fill="rgba(245, 158, 11, 0.25)"
                    stroke="#f59e0b"
                    strokeWidth="2.5"
                  />

                  {/* Vertices Dots */}
                  <circle cx="100" cy="24" r="4" fill="#f59e0b" />
                  <circle cx="170" cy="78" r="4" fill="#f59e0b" />
                  <circle cx="140" cy="158" r="4" fill="#f59e0b" />
                  <circle cx="58" cy="158" r="4" fill="#f59e0b" />
                  <circle cx="30" cy="78" r="4" fill="#f59e0b" />

                  {/* Axis Labels */}
                  <text x="100" y="12" fill="#00f2fe" fontSize="10" fontWeight="bold" textAnchor="middle">敏锐侦察 96</text>
                  <text x="184" y="78" fill="#00f2fe" fontSize="10" fontWeight="bold" textAnchor="start">监测预警 92</text>
                  <text x="152" y="178" fill="#00f2fe" fontSize="10" fontWeight="bold" textAnchor="start">协同引导 88</text>
                  <text x="48" y="178" fill="#10b981" fontSize="10" fontWeight="bold" textAnchor="end">公文严谨 98</text>
                  <text x="16" y="78" fill="#00f2fe" fontSize="10" fontWeight="bold" textAnchor="end">响应时效 90</text>
                </svg>
              </div>
            </div>

            {/* Battle Highlights Statistics */}
            <div className="space-y-2 text-xs">
              <h4 className="font-bold text-slate-200 mb-2 flex items-center gap-1.5">
                <Trophy className="w-4 h-4 text-amber-400" />
                本局高光对局数据 (High Performance)
              </h4>

              <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                <span className="text-slate-400">舆情情绪反转率：</span>
                <span className="font-bold text-emerald-400 font-num">+76.4% (负面情绪转正面)</span>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                <span className="text-slate-400">属地公文扫雷排错准确率：</span>
                <span className="font-bold text-amber-300 font-num">100% (揪出 {fixedErrorsCount} 个高危错)</span>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                <span className="text-slate-400">黄金时效响应：</span>
                <span className="font-bold text-cyan-300 font-num">04分15秒 (评级: S)</span>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                <span className="text-slate-400">网评“赞/转/评/报”闭环：</span>
                <span className="font-bold text-emerald-400 font-num">100% 达成</span>
              </div>
            </div>

          </div>

          {/* AI Battle Diagnosis Room */}
          <div className="p-4 rounded-2xl bg-amber-950/20 border border-amber-500/40 text-xs space-y-1.5">
            <div className="flex items-center gap-2 font-bold text-amber-300 text-sm">
              <Zap className="w-4 h-4 text-amber-400 animate-bounce" />
              【AI 战力诊断室 / 弱项提升建议】(Coach Analysis)
            </div>

            <p className="text-slate-300 leading-relaxed">
              <span className="text-amber-400 font-bold">⚠️ 短板建议：</span>
              你在第 2 阶段接收到现场核查反馈后，在【指令流转系统】中滞留超过 2 分钟未回填流转，导致部门协同率被少量扣分。建议关注指令快速催办！
            </p>
          </div>

          {/* Bottom Action Footer */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              onClick={onClose}
              className="px-6 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs rounded-xl transition-all"
            >
              关闭战力结算大屏
            </button>

            <button
              onClick={onClose}
              className="px-6 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-extrabold text-xs rounded-xl shadow-lg glow-gold flex items-center gap-1.5 transition-all"
            >
              <span>解锁下一关：【第{nextLevelId}关】推演关卡</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
