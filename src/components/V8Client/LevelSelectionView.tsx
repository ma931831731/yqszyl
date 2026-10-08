import React from 'react';
import { LevelIncidentCase } from '../../types';
import { Lock, Star, Trophy, ArrowLeft, Flame, Play, ShieldAlert, CheckCircle2, Layers, Cpu } from 'lucide-react';

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
    <div className="min-h-screen bg-[#091122] text-slate-100 p-6 flex flex-col justify-between select-none font-sans">
      
      {/* Header */}
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between mb-6">
        <button
          onClick={onReturnToLobby}
          className="px-4 py-2 bg-[#121c33] hover:bg-slate-800 text-slate-200 font-extrabold text-xs rounded-xl border border-slate-700 flex items-center gap-2 transition-all cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" /> 返回主大厅
        </button>

        <div className="text-center">
          <h1 className="text-3xl font-black text-white tracking-wide">
            实战演练作战室 · 关卡案例图谱
          </h1>
          <p className="text-xs text-slate-300 font-medium mt-1">
            每一关卡包含多个突发案例事件，组合调用【练兵场积累的应用装备】进行阶段化解！
          </p>
        </div>

        <div className="w-28" />
      </div>

      {/* Level Cards Grid (6 Levels with Multi-Case Events & Equipment Combinations) */}
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-auto">
        {levelCases.map((item) => {
          const caseCount = item.caseEvents?.length || 2;
          return (
            <div
              key={item.id}
              onClick={() => item.isUnlocked && onSelectLevel(item.id)}
              className={`group p-6 rounded-2xl border-2 transition-all flex flex-col justify-between shadow-xl relative overflow-hidden ${
                item.isPassed
                  ? 'bg-[#121c33] border-cyan-500/60 hover:border-cyan-400 cursor-pointer'
                  : item.isUnlocked
                  ? 'bg-[#121c33] border-amber-500/80 hover:border-amber-400 cursor-pointer'
                  : 'bg-[#121c33] border-slate-750 opacity-60 cursor-not-allowed'
              }`}
            >
              <div>
                {/* Top Badge Row */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className={`w-8 h-8 rounded-lg font-black text-sm flex items-center justify-center ${
                      item.isPassed ? 'bg-cyan-900 text-cyan-200 border border-cyan-500/50' : item.isUnlocked ? 'bg-amber-500 text-slate-950 font-black' : 'bg-slate-800 text-slate-400'
                    }`}>
                      0{item.id}
                    </span>
                    <span className={`text-xs px-2.5 py-0.5 rounded font-bold ${
                      item.difficulty === '简单' ? 'bg-emerald-950 text-emerald-300' :
                      item.difficulty === '中等' ? 'bg-sky-950 text-sky-300' :
                      item.difficulty === '较难' ? 'bg-amber-950 text-amber-300' :
                      item.difficulty === '高' ? 'bg-rose-950 text-rose-300' : 'bg-purple-950 text-purple-300'
                    }`}>
                      难度: {item.difficulty}
                    </span>
                  </div>

                  {item.isPassed ? (
                    <span className="px-3 py-1 rounded-full bg-emerald-900 text-emerald-200 border border-emerald-500/50 text-xs font-black flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> 已通关 ({item.bestGrade})
                    </span>
                  ) : item.isUnlocked ? (
                    <span className="px-3 py-1 rounded-full bg-amber-500 text-slate-950 font-black text-xs">
                      ⭐ 待挑战
                    </span>
                  ) : (
                    <span className="px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-xs font-bold flex items-center gap-1 border border-slate-700">
                      <Lock className="w-3.5 h-3.5" /> 通关第{item.id - 1}关解锁
                    </span>
                  )}
                </div>

                <h3 className="text-xl font-black text-white mb-1 group-hover:text-cyan-300 transition-colors tracking-wide">
                  第{item.id}关：{item.title}
                </h3>
                <div className="text-xs text-cyan-300 font-bold mb-3">【{item.subtitle}】· {item.category}</div>

                {/* Multi-Case Events & Equipment Combinations Indicator */}
                <div className="space-y-2 text-xs text-slate-200 bg-[#0a1020] p-3.5 rounded-xl border border-slate-700 mb-4">
                  <div className="flex items-center justify-between font-bold text-amber-300 pb-1.5 border-b border-slate-750">
                    <span className="flex items-center gap-1.5">
                      <Layers className="w-4 h-4" /> 关卡包含 {caseCount} 个真实突发事件场景
                    </span>
                    <span className="text-[10px] bg-amber-950 text-amber-200 px-1.5 py-0.5 rounded">引用练兵场积分规则</span>
                  </div>
                  <div className="text-slate-300 font-medium">
                    <span className="text-slate-400 font-semibold">组合调用装备：</span>
                    属地公文扫雷 + 全网探针打标 + 谛听全域雷达
                  </div>
                  <div className="text-slate-300 font-medium truncate">
                    <span className="text-slate-400 font-semibold">核心案情：</span>{item.discoveryDesc}
                  </div>
                </div>
              </div>

              {/* Card Footer */}
              <div className="pt-3 border-t border-slate-700 flex items-center justify-between text-xs">
                {item.bestScore !== null ? (
                  <span className="text-amber-400 font-black font-num text-sm">最高分: {item.bestScore} 分</span>
                ) : (
                  <span className="text-slate-400 font-medium">尚未挑战</span>
                )}

                <button
                  disabled={!item.isUnlocked}
                  className={`px-4 py-2 rounded-xl font-black text-xs flex items-center gap-1.5 transition-all ${
                    item.isUnlocked
                      ? 'bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white shadow cursor-pointer border border-cyan-400/40'
                      : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
                  }`}
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>{item.isPassed ? '重新推演' : item.isUnlocked ? '开始组合推演' : '锁定中'}</span>
                </button>
              </div>

            </div>
          );
        })}
      </div>

      {/* Footer Note */}
      <div className="text-center text-xs text-slate-400 font-medium pt-4 border-t border-slate-800">
        在练兵场中提高应用装备完成度（60%/80%/100%），可在关卡推演中获得对应阶梯加分，帮助顺利闯关！
      </div>

    </div>
  );
};
