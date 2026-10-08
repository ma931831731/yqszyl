import React, { useState } from 'react';
import { Target, CheckCircle2, ShieldAlert, Award, Zap, ArrowRight } from 'lucide-react';

interface TargetPracticeViewProps {
  onReturnToBattle: () => void;
}

export const TargetPracticeView: React.FC<TargetPracticeViewProps> = ({ onReturnToBattle }) => {
  const [activePractice, setActivePractice] = useState<'saolei' | 'dabiao' | 'leida'>('saolei');
  const [score, setScore] = useState(100);
  const [practicedCount, setPracticedCount] = useState(3);

  return (
    <div className="max-w-5xl mx-auto p-4 space-y-4">
      {/* Title Header */}
      <div className="bg-slate-900/80 p-4 rounded-2xl border border-cyan-500/30 backdrop-blur-md flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/40 flex items-center justify-center text-amber-400 glow-gold">
            <Target className="w-7 h-7 animate-pulse" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
              单兵战术靶场 <span className="text-xs px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-500/40">1分钟微练</span>
            </h2>
            <p className="text-xs text-slate-400">零迷茫无痛上手！把 8 大系统核心技能拆解为趣味解谜靶场</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <div className="text-[10px] text-slate-400">靶场积分</div>
            <div className="text-base font-bold font-num text-amber-400">{score} PTS</div>
          </div>
          <button
            onClick={onReturnToBattle}
            className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold text-xs rounded-xl hover:brightness-110 shadow-lg flex items-center gap-1.5 transition-all"
          >
            返回推演战场 <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Target Range Selection Tabs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <button
          onClick={() => setActivePractice('saolei')}
          className={`p-4 rounded-2xl border text-left transition-all relative ${
            activePractice === 'saolei'
              ? 'bg-slate-900 border-amber-500/60 shadow-lg glow-gold'
              : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-bold text-amber-300">【公文扫雷靶场】</span>
            <span className="text-xs px-1.5 py-0.5 rounded bg-slate-800 text-slate-400">属地管理系统</span>
          </div>
          <p className="text-xs text-slate-400">通报发布前进行错别字与职务排查“扫雷”，防止二次舆情发生。</p>
        </button>

        <button
          onClick={() => setActivePractice('dabiao')}
          className={`p-4 rounded-2xl border text-left transition-all relative ${
            activePractice === 'dabiao'
              ? 'bg-slate-900 border-cyan-500/60 shadow-lg glow-cyan'
              : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-bold text-cyan-300">【探针打靶靶场】</span>
            <span className="text-xs px-1.5 py-0.5 rounded bg-slate-800 text-slate-400">全网搜</span>
          </div>
          <p className="text-xs text-slate-400">海量帖文中 5 秒内精准识别造谣帖并打标签，打捞证据链。</p>
        </button>

        <button
          onClick={() => setActivePractice('leida')}
          className={`p-4 rounded-2xl border text-left transition-all relative ${
            activePractice === 'leida'
              ? 'bg-slate-900 border-emerald-500/60 shadow-lg'
              : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-bold text-emerald-300">【雷达校准靶场】</span>
            <span className="text-xs px-1.5 py-0.5 rounded bg-slate-800 text-slate-400">谛听预警</span>
          </div>
          <p className="text-xs text-slate-400">设定高危关键词与声量告警阈值，捕捉最初舆情苗头。</p>
        </button>
      </div>

      {/* Target Content Area */}
      <div className="bg-slate-900/70 p-6 rounded-2xl border border-slate-800 space-y-4">
        {activePractice === 'saolei' && (
          <div className="space-y-3">
            <h3 className="font-bold text-slate-200 text-sm">靶场题目 #1：抢险救灾通报校对</h3>
            <p className="text-xs text-slate-400">请点击题目中存在的公文陷阱：</p>

            <div className="p-4 bg-slate-950 rounded-xl border border-amber-500/30 text-xs leading-relaxed text-slate-200">
              应急处置指挥部已调集
              <span className="px-1 py-0.5 bg-amber-950 text-amber-300 rounded border border-amber-500/40 font-bold mx-1">
                消防车 30 辆 消防员 120 余人
              </span>
              连夜抢险，现场指导工作的
              <span className="px-1 py-0.5 bg-rose-950 text-rose-300 rounded border border-rose-500/40 font-bold mx-1 cursor-pointer">
                市宣传部主作 (⚠️应为: 主任)
              </span>
              要求全面做好伤员救治。
            </div>

            <div className="p-3 bg-emerald-950/40 border border-emerald-500/30 rounded-xl text-xs text-emerald-300 flex items-center justify-between">
              <span className="flex items-center gap-1.5 font-bold">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                排错完成！成功纠出职务错别字，奖励 20 靶场积分！
              </span>
            </div>
          </div>
        )}

        {activePractice === 'dabiao' && (
          <div className="space-y-3 text-xs text-slate-300">
            <h3 className="font-bold text-slate-200 text-sm">靶场题目 #2：秒级帖文分类打标速练</h3>
            <p className="text-slate-400">快速判断下帖属性：</p>
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between">
              <span>“听说火灾救援被延误了？赶紧转发出来爆料！”</span>
              <span className="px-2 py-1 bg-rose-900/60 text-rose-300 rounded font-bold">造谣风险帖</span>
            </div>
          </div>
        )}

        {activePractice === 'leida' && (
          <div className="space-y-3 text-xs text-slate-300">
            <h3 className="font-bold text-slate-200 text-sm">靶场题目 #3：预警规则关键词配置</h3>
            <p className="text-slate-400">校准完成！预警捕获率提升 35%</p>
          </div>
        )}
      </div>
    </div>
  );
};
