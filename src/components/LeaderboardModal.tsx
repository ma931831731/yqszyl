import React, { useState } from 'react';
import { Trophy, Users, User, Shield, Flame, X, Award, Sparkles } from 'lucide-react';

interface LeaderboardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LeaderboardModal: React.FC<LeaderboardModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'individual' | 'team'>('team');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4 animate-fadeIn">
      <div className="relative w-full max-w-3xl bg-[#0a0f24] border border-indigo-500/40 rounded-3xl shadow-2xl overflow-hidden glow-purple">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="bg-gradient-to-r from-indigo-950 via-slate-900 to-indigo-950 p-5 border-b border-indigo-500/30 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/40 flex items-center justify-center text-amber-400 glow-gold">
            <Trophy className="w-6 h-6 animate-bounce" />
          </div>
          <div>
            <h2 className="text-xl font-bold font-cyber text-slate-100 flex items-center gap-2">
              全省舆情应急推演天梯榜
            </h2>
            <p className="text-xs text-indigo-300">各地区机关战队争霸赛 | 5人组队享 20% 团队战力积分加成</p>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-slate-800 text-xs text-center font-bold bg-slate-950">
          <button
            onClick={() => setActiveTab('team')}
            className={`flex-1 py-3 transition-all flex items-center justify-center gap-2 ${
              activeTab === 'team' ? 'text-amber-400 border-b-2 border-amber-400 bg-amber-950/20' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Users className="w-4 h-4" /> 🏛️ 机关战队天梯争霸榜
          </button>
          <button
            onClick={() => setActiveTab('individual')}
            className={`flex-1 py-3 transition-all flex items-center justify-center gap-2 ${
              activeTab === 'individual' ? 'text-cyan-400 border-b-2 border-cyan-400 bg-cyan-950/20' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <User className="w-4 h-4" /> 👤 个人演练百强榜
          </button>
        </div>

        {/* Rankings Table */}
        <div className="p-4 space-y-2 max-h-96 overflow-y-auto text-xs">
          {activeTab === 'team' ? (
            [
              { rank: 1, team: '高新区网信宣传一队', city: '省直属', score: 14850, members: 5, badge: '🥇 最强冠军战队' },
              { rank: 2, team: '某市应急管理指挥组', city: '市级机关', score: 13920, members: 5, badge: '🥈 亚军战队' },
              { rank: 3, team: '文旅宣传处推演先锋', city: '省直属', score: 12400, members: 5, badge: '🥉 季军战队' },
              { rank: 4, team: '你的科室战队 (守网卫士分队)', city: '属地网信', score: 11800, members: 4, badge: '⭐ 距+20%组队加成还差1人' },
            ].map((item) => (
              <div
                key={item.rank}
                className={`p-3 rounded-xl border flex items-center justify-between transition-all ${
                  item.rank === 4
                    ? 'bg-amber-950/30 border-amber-500/50 glow-gold'
                    : item.rank === 1
                    ? 'bg-gradient-to-r from-amber-950/40 to-slate-900 border-amber-500/30'
                    : 'bg-slate-900/60 border-slate-800'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={`w-6 text-center font-extrabold text-sm font-num ${
                    item.rank === 1 ? 'text-amber-400' : item.rank === 2 ? 'text-slate-300' : item.rank === 3 ? 'text-amber-600' : 'text-slate-400'
                  }`}>
                    #{item.rank}
                  </span>
                  <div>
                    <div className="font-bold text-slate-100 flex items-center gap-2">
                      {item.team}
                      <span className="text-[10px] px-1.5 py-0.5 bg-slate-800 text-slate-400 rounded">{item.city}</span>
                    </div>
                    <div className="text-[10px] text-slate-400 mt-0.5">{item.badge}</div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="font-num font-bold text-sm text-amber-400">{item.score} PTS</div>
                  <div className="text-[10px] text-slate-400">{item.members}/5人 在线</div>
                </div>
              </div>
            ))
          ) : (
            [
              { rank: 1, name: '守网卫士_01 (你)', title: 'S+ 破浪大师', score: 3890 },
              { rank: 2, name: '雷达监测员_严力', title: 'S 级特聘指挥', score: 3740 },
              { rank: 3, name: '网评组长_张敏', title: 'S 级舆情导师', score: 3610 },
            ].map((item) => (
              <div key={item.rank} className="p-3 bg-slate-900/60 rounded-xl border border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="font-bold font-num text-cyan-400 text-sm">#{item.rank}</span>
                  <div>
                    <div className="font-bold text-slate-100">{item.name}</div>
                    <div className="text-[10px] text-slate-400">{item.title}</div>
                  </div>
                </div>
                <div className="font-num font-bold text-sm text-cyan-300">{item.score} PTS</div>
              </div>
            ))
          )}
        </div>

        {/* Footer Note */}
        <div className="p-3 bg-slate-950 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
          <span>拉动科室同事 5 人组队，全员解锁 20% 战力加成！零成本社交裂变</span>
          <button onClick={onClose} className="px-4 py-1.5 bg-slate-800 text-slate-200 rounded-lg hover:bg-slate-700 font-bold">
            确定
          </button>
        </div>

      </div>
    </div>
  );
};
