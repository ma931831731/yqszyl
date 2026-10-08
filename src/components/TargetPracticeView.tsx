import React, { useState } from 'react';
import { Target, CheckCircle2, ShieldAlert, Award, Zap, ArrowRight, Award as TrophyIcon, Sparkles } from 'lucide-react';

interface TargetPracticeViewProps {
  onReturnToBattle: () => void;
}

export const TargetPracticeView: React.FC<TargetPracticeViewProps> = ({ onReturnToBattle }) => {
  const [activePractice, setActivePractice] = useState<'saolei' | 'dabiao' | 'leida'>('saolei');
  const [completionPercent, setCompletionPercent] = useState(100);
  const [score, setScore] = useState(200);

  return (
    <div className="max-w-5xl mx-auto p-4 space-y-4 select-none font-sans">
      
      {/* Title Header */}
      <div className="bg-[#121c33] p-5 rounded-2xl border-2 border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center gap-3.5">
          <div className="w-14 h-14 rounded-xl bg-amber-500/20 border border-amber-500/60 flex items-center justify-center text-amber-400">
            <Target className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-xl font-black text-white flex items-center gap-2">
              单兵战术练兵场 <span className="text-xs px-2.5 py-0.5 rounded bg-amber-500 text-slate-950 font-extrabold">应用装备学习积累</span>
            </h2>
            <p className="text-xs text-slate-300 font-medium mt-1">
              在此学习积累 8 大应用功能装备！不同完成度对应不同积分规则，积累的装备将在实战关卡案例中组合调用。
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right">
            <div className="text-xs text-slate-400 font-semibold">练兵完成度与积分</div>
            <div className="text-lg font-black font-num text-amber-400">
              {completionPercent}% 完成度 ({score} PTS)
            </div>
          </div>
          <button
            onClick={onReturnToBattle}
            className="px-4 py-2.5 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-extrabold text-xs rounded-xl shadow flex items-center gap-2 transition-all cursor-pointer border border-cyan-400/40"
          >
            <span>返回推演战场 ➔</span>
          </button>
        </div>
      </div>

      {/* Completion Tier Rules Info Banner */}
      <div className="p-3.5 rounded-xl bg-[#0a1020] border border-cyan-500/50 flex items-center justify-between text-xs text-slate-200">
        <div className="flex items-center gap-2 font-medium">
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <span>MT端规则响应：基础完成(60% → +50分) | 熟练精通(80% → +100分) | 满分化解(100% → +200分)</span>
        </div>
        <span className="px-2.5 py-0.5 bg-cyan-900 text-cyan-200 text-xs font-black rounded">已达到【满分化解】阶梯</span>
      </div>

      {/* Target Range Selection Tabs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button
          onClick={() => setActivePractice('saolei')}
          className={`p-4 rounded-xl border-2 text-left transition-all relative cursor-pointer ${
            activePractice === 'saolei'
              ? 'bg-[#121c33] border-amber-500 text-white shadow-lg'
              : 'bg-[#0a1020] border-slate-750 text-slate-300 hover:border-slate-600'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-black text-amber-300">【属地公文扫雷排错】</span>
            <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-bold">属地管理系统</span>
          </div>
          <p className="text-xs text-slate-300 font-medium">通报发布前进行错别字与职务排查“扫雷”，达到 100% 满分可获 +200 PTS。</p>
        </button>

        <button
          onClick={() => setActivePractice('dabiao')}
          className={`p-4 rounded-xl border-2 text-left transition-all relative cursor-pointer ${
            activePractice === 'dabiao'
              ? 'bg-[#121c33] border-cyan-500 text-white shadow-lg'
              : 'bg-[#0a1020] border-slate-750 text-slate-300 hover:border-slate-600'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-black text-cyan-300">【探针打靶打标】</span>
            <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-bold">全网搜</span>
          </div>
          <p className="text-xs text-slate-300 font-medium">海量帖文中精准识别造谣帖打标签，打捞证据链组合通关。</p>
        </button>

        <button
          onClick={() => setActivePractice('leida')}
          className={`p-4 rounded-xl border-2 text-left transition-all relative cursor-pointer ${
            activePractice === 'leida'
              ? 'bg-[#121c33] border-emerald-500 text-white shadow-lg'
              : 'bg-[#0a1020] border-slate-750 text-slate-300 hover:border-slate-600'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-black text-emerald-300">【雷达校准预警】</span>
            <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-bold">谛听预警</span>
          </div>
          <p className="text-xs text-slate-300 font-medium">设定高危关键词与声量告警阈值，积累分析技能。</p>
        </button>
      </div>

      {/* Target Content Area */}
      <div className="bg-[#121c33] p-6 rounded-2xl border-2 border-slate-700 space-y-4">
        {activePractice === 'saolei' && (
          <div className="space-y-3">
            <h3 className="font-black text-white text-base">靶场题目 #1：属地抢险救灾通报公文扫雷</h3>
            <p className="text-xs text-slate-300 font-medium">请点击题目中存在的公文敏感陷阱（排错并积累该功能装备）：</p>

            <div className="p-4 bg-[#0a1020] rounded-xl border border-slate-700 text-xs leading-relaxed text-slate-100 font-medium">
              应急处置指挥部已调集
              <span className="px-1.5 py-0.5 bg-amber-950 text-amber-300 rounded border border-amber-500/50 font-bold mx-1">
                消防车 30 辆 消防员 120 余人
              </span>
              连夜抢险，现场指导工作的
              <span className="px-1.5 py-0.5 bg-rose-950 text-rose-300 rounded border border-rose-500/50 font-bold mx-1 cursor-pointer">
                市宣传部主作 (⚠️应为: 主任)
              </span>
              要求全面做好伤员救治。
            </div>

            <div className="p-3.5 bg-emerald-950/80 border border-emerald-500/60 rounded-xl text-xs text-emerald-200 flex items-center justify-between font-bold">
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                排错完成！当前【属地公文扫雷】达到 100% 满分化解阶梯，已成功积累该应用装备技能并获得 +200 积分！
              </span>
            </div>
          </div>
        )}

        {activePractice === 'dabiao' && (
          <div className="space-y-3 text-xs text-slate-200 font-medium">
            <h3 className="font-black text-white text-base">靶场题目 #2：秒级帖文分类打标速练</h3>
            <p className="text-slate-300">快速判断下帖属性（按全网搜探针装备积分规则）：</p>
            <div className="p-4 bg-[#0a1020] rounded-xl border border-slate-700 flex items-center justify-between">
              <span>“听说火灾救援被延误了？赶紧转发出来爆料！”</span>
              <span className="px-3 py-1 bg-rose-900 text-rose-200 border border-rose-500/50 rounded-lg font-bold">造谣风险帖</span>
            </div>
          </div>
        )}

        {activePractice === 'leida' && (
          <div className="space-y-3 text-xs text-slate-200 font-medium">
            <h3 className="font-black text-white text-base">靶场题目 #3：预警规则关键词配置</h3>
            <p className="text-slate-300">校准完成！达到【熟练精通】阶梯，已积累【谛听全域雷达】预警装备技能。</p>
          </div>
        )}
      </div>

    </div>
  );
};
