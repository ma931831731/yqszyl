import React from 'react';
import { LevelIncidentCase } from '../../types';
import { Lock, Star, Trophy, ArrowLeft, Flame, Play, ShieldAlert, CheckCircle2, Layers, Cpu, Award } from 'lucide-react';

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
    <div className="min-h-screen bg-[#09152b] text-slate-100 p-4 md:p-6 flex flex-col justify-between select-none font-sans relative z-10">
      
      {/* 2D Cartoon RPG Header Bar (yqyl.jfif Style) */}
      <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row items-center justify-between gap-4 mb-6 bg-[#1b2b4b] p-5 rounded-3xl border-4 border-sky-400 shadow-2xl">
        <div className="flex items-center gap-4">
          <button
            onClick={onReturnToLobby}
            className="px-4 py-2 bg-[#0d1629] hover:bg-sky-600 text-white font-black text-xs rounded-2xl border-2 border-sky-400 flex items-center gap-2 transition-transform hover:scale-105 cursor-pointer shadow"
          >
            <ArrowLeft className="w-4 h-4" /> 返回主大厅
          </button>
          <div>
            <h1 className="text-2xl md:text-3xl font-black text-white flex items-center gap-2 tracking-wide drop-shadow">
              实战演练室 · 演练场案例大厅
            </h1>
            <p className="text-xs text-sky-100 font-bold mt-0.5">
              分块展示多个实战演练场！第一个演练场通关后方可解锁下一个；组合调用【练兵场已积累的应用装备】出征战力结算！
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 bg-[#0d1629] px-4 py-2 rounded-2xl border-2 border-amber-400/50">
          <Trophy className="w-5 h-5 text-amber-400" />
          <div className="text-xs">
            <span className="text-slate-400 font-bold">已通关演练场: </span>
            <span className="font-black text-amber-300 font-num">
              {levelCases.filter(l => l.isPassed).length} / {levelCases.length} 场
            </span>
          </div>
        </div>
      </div>

      {/* 2D Cartoon Level Arenas Grid (Matching yqyl.jfif 2D RPG Style) */}
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-auto">
        {levelCases.map((item, index) => {
          // Check sequential unlock rule: Level 1 unlocked, Level N requires Level N-1 to be passed
          const isPreviousPassed = index === 0 || levelCases[index - 1].isPassed;
          const canAccess = item.isUnlocked && isPreviousPassed;
          const caseCount = item.caseEvents?.length || 3;

          return (
            <div
              key={item.id}
              onClick={() => canAccess && onSelectLevel(item.id)}
              className={`group p-6 rounded-3xl border-4 transition-all flex flex-col justify-between shadow-2xl relative overflow-hidden ${
                item.isPassed
                  ? 'bg-gradient-to-b from-[#1b2b4b] to-[#121c33] border-cyan-400 hover:border-white cursor-pointer hover:scale-[1.02]'
                  : canAccess
                  ? 'bg-gradient-to-b from-[#2b2416] to-[#121c33] border-amber-400 hover:border-white cursor-pointer hover:scale-[1.02]'
                  : 'bg-[#121c33] border-slate-700 opacity-60 cursor-not-allowed'
              }`}
            >
              <div>
                {/* Top Badge & Arena Name */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className={`w-9 h-9 rounded-2xl font-black text-sm flex items-center justify-center border-2 border-white shadow ${
                      item.isPassed ? 'bg-sky-400 text-slate-950' : canAccess ? 'bg-amber-400 text-slate-950' : 'bg-slate-700 text-slate-400'
                    }`}>
                      0{item.id}
                    </span>
                    <span className={`text-xs px-3 py-1 rounded-full font-black shadow ${
                      item.difficulty === '简单' ? 'bg-emerald-400 text-slate-950' :
                      item.difficulty === '中等' ? 'bg-sky-400 text-slate-950' :
                      item.difficulty === '较难' ? 'bg-amber-400 text-slate-950' :
                      item.difficulty === '高' ? 'bg-rose-500 text-white' : 'bg-purple-500 text-white'
                    }`}>
                      难度: {item.difficulty}
                    </span>
                  </div>

                  {item.isPassed ? (
                    <span className="px-3 py-1 rounded-full bg-emerald-500 text-slate-950 text-xs font-black flex items-center gap-1 shadow border border-white">
                      <CheckCircle2 className="w-3.5 h-3.5" /> 已通关 ({item.bestGrade})
                    </span>
                  ) : canAccess ? (
                    <span className="px-3 py-1 rounded-full bg-amber-400 text-slate-950 font-black text-xs shadow border border-white">
                      ⭐ 可挑战
                    </span>
                  ) : (
                    <span className="px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-xs font-black flex items-center gap-1 border border-slate-700">
                      <Lock className="w-3.5 h-3.5 text-slate-400" /> 通关第 {item.id - 1} 演练场后解锁
                    </span>
                  )}
                </div>

                <h3 className="text-2xl font-black text-white mb-1 group-hover:text-amber-300 transition-colors tracking-wide drop-shadow">
                  演练场 {item.id}：{item.title}
                </h3>
                <div className="text-xs text-amber-300 font-extrabold mb-3">【{item.subtitle}】· {item.category}</div>

                {/* Case Events & Required Application Function Equipment Block */}
                <div className="space-y-2 text-xs text-slate-100 bg-[#0d1629] p-3.5 rounded-2xl border-2 border-slate-700 mb-4 font-bold">
                  <div className="flex items-center justify-between font-black text-sky-300 pb-1.5 border-b border-slate-750">
                    <span className="flex items-center gap-1.5">
                      <Layers className="w-4 h-4 text-amber-400" /> 包含 {caseCount} 个突发实战事件案例
                    </span>
                    <span className="text-[10px] bg-sky-400 text-slate-950 px-2 py-0.5 rounded-full font-black">
                      监测发现 ➔ 跟踪 ➔ 处置
                    </span>
                  </div>

                  {/* Required Equipment Callout */}
                  <div className="text-slate-200 pt-1">
                    <span className="text-amber-300 font-black">需调用的应用功能装备：</span>
                    <div className="flex flex-wrap gap-1.5 mt-1">
                      {item.unlockedSystems.map(sysId => (
                        <span key={sysId} className="px-2 py-0.5 rounded-lg bg-[#182645] border border-sky-400/50 text-[10px] text-sky-300 font-black">
                          {sysId === 'shudi' ? '属地公文扫雷' : sysId === 'diting' ? '谛听全域雷达' : sysId === 'quanwang' ? '全网探针打标' : sysId === 'diandian' ? '点点密信通信' : sysId === 'zhihui' ? '指令流转调度' : sysId === 'wangping' ? '网评战术矩阵' : sysId === 'quanqiu' ? '境外天眼防范' : 'V8权限总控'}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="text-slate-300 truncate pt-1">
                    <span className="text-slate-400 font-bold">案情概述：</span>{item.discoveryDesc}
                  </div>
                </div>
              </div>

              {/* Card Footer */}
              <div className="pt-3 border-t border-slate-700 flex items-center justify-between text-xs">
                {item.bestScore !== null ? (
                  <span className="text-amber-300 font-black font-num text-sm drop-shadow">最高战力: {item.bestScore} PTS</span>
                ) : (
                  <span className="text-slate-400 font-bold">尚未挑战</span>
                )}

                <button
                  disabled={!canAccess}
                  className={`px-5 py-2.5 rounded-2xl font-black text-xs flex items-center gap-1.5 transition-transform ${
                    canAccess
                      ? 'bg-gradient-to-r from-amber-400 to-yellow-300 hover:from-amber-300 hover:to-yellow-200 text-slate-950 shadow-lg cursor-pointer hover:scale-105 border-2 border-white'
                      : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
                  }`}
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>{item.isPassed ? '重新推演' : canAccess ? '进入事件推演' : '锁定中'}</span>
                </button>
              </div>

            </div>
          );
        })}
      </div>

      {/* Footer Note */}
      <div className="text-center text-xs text-sky-200 font-bold pt-4 border-t border-sky-400/30">
        通关上一演练场可解锁下一演练场！战力结算将自动读取在练兵场中积累的应用功能装备积分！
      </div>

    </div>
  );
};

