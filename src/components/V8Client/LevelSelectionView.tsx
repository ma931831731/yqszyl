import React from 'react';
import { LevelIncidentCase } from '../../types';
import { Lock, Star, Trophy, ArrowLeft, Flame, Play, ShieldAlert, CheckCircle2 } from 'lucide-react';

interface LevelSelectionViewProps {
  levelCases: LevelIncidentCase[];
  onSelectLevel: (levelId: number) => void;
  onReturnToLobby: () => void;
}

export const LevelSelectionView: React.FC<LevelSelectionViewProps> = ({
  levelCases,
  onSelectLevel,
  onReturnToLobby
}) => {
  return (
    <div className="min-h-screen bg-[#050814] bg-cyber-grid text-slate-100 p-6 flex flex-col justify-between select-none">
      
      {/* Header */}
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between mb-8">
        <button
          onClick={onReturnToLobby}
          className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-slate-300 font-bold text-xs rounded-xl border border-slate-800 flex items-center gap-2 transition-all"
        >
          <ArrowLeft className="w-4 h-4" /> 返回主大厅
        </button>

        <div className="text-center">
          <h1 className="text-2xl font-black font-cyber text-slate-100 tracking-wide bg-gradient-to-r from-cyan-300 via-sky-100 to-indigo-300 bg-clip-text text-transparent">
            实战演练作战室 · 关卡案例图谱
          </h1>
          <p className="text-xs text-slate-400 mt-1">从事件发现、传播、跟踪到处置难易程度递进考核 | 须通关前一关方可解锁后续关卡</p>
        </div>

        <div className="w-28" /> {/* Placeholder for balance */}
      </div>

      {/* Level Cards Grid (1920*1080 Spacious Layout - 6 Levels) */}
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-auto">
        {levelCases.map((item) => {
          return (
            <div
              key={item.id}
              onClick={() => item.isUnlocked && onSelectLevel(item.id)}
              className={`group p-6 rounded-3xl border-2 transition-all flex flex-col justify-between shadow-2xl relative overflow-hidden ${
                item.isPassed
                  ? 'bg-slate-900/80 border-cyan-500/50 hover:border-cyan-400 cursor-pointer glow-cyan'
                  : item.isUnlocked
                  ? 'bg-slate-900/90 border-amber-500/60 hover:border-amber-400 cursor-pointer glow-gold'
                  : 'bg-slate-950/60 border-slate-900 opacity-50 cursor-not-allowed'
              }`}
            >
              <div>
                {/* Top Badge Row */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className={`w-8 h-8 rounded-xl font-cyber font-bold text-sm flex items-center justify-center ${
                      item.isPassed ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' : item.isUnlocked ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' : 'bg-slate-800 text-slate-500'
                    }`}>
                      0{item.id}
                    </span>
                    <span className={`text-xs px-2 py-0.5 rounded font-bold ${
                      item.difficulty === '简单' ? 'bg-emerald-950 text-emerald-300' :
                      item.difficulty === '中等' ? 'bg-sky-950 text-sky-300' :
                      item.difficulty === '较难' ? 'bg-amber-950 text-amber-300' :
                      item.difficulty === '高' ? 'bg-rose-950 text-rose-300' : 'bg-purple-950 text-purple-300'
                    }`}>
                      难度: {item.difficulty}
                    </span>
                  </div>

                  {item.isPassed ? (
                    <span className="px-2.5 py-1 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-500/40 text-[10px] font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> 已通关 ({item.bestGrade})
                    </span>
                  ) : item.isUnlocked ? (
                    <span className="px-2.5 py-1 rounded-full bg-amber-950 text-amber-300 border border-amber-500/40 text-[10px] font-bold">
                      ⭐ 待挑战
                    </span>
                  ) : (
                    <span className="px-2.5 py-1 rounded-full bg-slate-900 text-slate-500 text-[10px] flex items-center gap-1">
                      <Lock className="w-3.5 h-3.5" /> 通关第{item.id - 1}关解锁
                    </span>
                  )}
                </div>

                <h3 className="text-xl font-black font-cyber text-slate-100 mb-1 group-hover:text-cyan-300 transition-colors">
                  第{item.id}关：{item.title}
                </h3>
                <div className="text-xs text-cyan-400 font-medium mb-3">【{item.subtitle}】· {item.category}</div>

                {/* Case Parameters Breakdown */}
                <div className="space-y-1.5 text-[11px] text-slate-400 bg-slate-950/70 p-3 rounded-2xl border border-slate-850 mb-4">
                  <div><span className="text-slate-500">🔍 事件发现：</span>{item.discoveryDesc}</div>
                  <div><span className="text-slate-500">📈 传播扩散：</span>{item.propagationDesc}</div>
                  <div><span className="text-slate-500">🎯 处置难点：</span>{item.disposalDesc}</div>
                </div>
              </div>

              {/* Card Footer */}
              <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                {item.bestScore !== null ? (
                  <span className="text-amber-400 font-bold font-num">最高分: {item.bestScore} 分</span>
                ) : (
                  <span className="text-slate-500">尚未挑战</span>
                )}

                <button
                  disabled={!item.isUnlocked}
                  className={`px-4 py-1.5 rounded-xl font-bold flex items-center gap-1 transition-all ${
                    item.isUnlocked
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:brightness-110 text-slate-950 shadow-lg'
                      : 'bg-slate-800 text-slate-600 cursor-not-allowed'
                  }`}
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>{item.isPassed ? '重新推演' : item.isUnlocked ? '开始推演' : '锁定中'}</span>
                </button>
              </div>

            </div>
          );
        })}
      </div>

      {/* Footer Note */}
      <div className="text-center text-xs text-slate-500 pt-6 border-t border-slate-900">
        通关后系统将为您自动计算【五维战力】并弹出电竞战力结算大屏，得分可用于点亮防伪电子证书！
      </div>

    </div>
  );
};
