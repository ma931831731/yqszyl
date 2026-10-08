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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4 animate-fadeIn font-sans select-none">
      <div className="relative w-full max-w-3xl bg-[#1b2b4b] border-4 border-yellow-400 rounded-3xl shadow-2xl overflow-hidden text-slate-100">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-[#0d1629] border-2 border-sky-400 text-white font-black hover:bg-sky-500 flex items-center justify-center transition-all cursor-pointer shadow"
        >
          <X className="w-5 h-5" />
        </button>

        {/* 2D Cartoon Trophy Banner */}
        <div className="bg-gradient-to-r from-yellow-500 via-amber-400 to-yellow-500 p-5 text-slate-950 flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-slate-950 border-2 border-white flex items-center justify-center text-yellow-400 shadow-lg shrink-0">
            <Trophy className="w-7 h-7" />
          </div>
          <div>
            <h2 className="text-2xl font-black tracking-wide text-slate-950 drop-shadow">
              全省舆情应急推演天梯排行榜
            </h2>
            <p className="text-xs font-bold text-slate-900 mt-0.5">
              各地区机关战队争霸赛 | 5 人组队享 20% 团队战力积分加成
            </p>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b-2 border-sky-400/40 text-xs text-center font-black bg-[#0d1629]">
          <button
            onClick={() => setActiveTab('team')}
            className={`flex-1 py-3.5 transition-all flex items-center justify-center gap-2 cursor-pointer ${
              activeTab === 'team'
                ? 'text-yellow-300 border-b-4 border-yellow-400 bg-[#182645]'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <Users className="w-4 h-4" /> 🏛️ 机关战队天梯争霸榜
          </button>
          <button
            onClick={() => setActiveTab('individual')}
            className={`flex-1 py-3.5 transition-all flex items-center justify-center gap-2 cursor-pointer ${
              activeTab === 'individual'
                ? 'text-sky-300 border-b-4 border-sky-400 bg-[#182645]'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <User className="w-4 h-4" /> 👤 个人演练百强榜
          </button>
        </div>

        {/* Rankings Table */}
        <div className="p-5 space-y-3 max-h-96 overflow-y-auto text-xs font-bold">
          {activeTab === 'team' ? (
            [
              { rank: 1, team: '高新区网信宣传一队', city: '省直属', score: 14850, members: 5, badge: '🥇 最强冠军战队' },
              { rank: 2, team: '某市应急管理指挥组', city: '市级机关', score: 13920, members: 5, badge: '🥈 亚军战队' },
              { rank: 3, team: '文旅宣传处推演先锋', city: '省直属', score: 12400, members: 5, badge: '🥉 季军战队' },
              { rank: 4, team: '你的科室战队 (守网卫士分队)', city: '属地网信', score: 11800, members: 4, badge: '⭐ 距+20%组队加成还差1人' },
            ].map((item) => (
              <div
                key={item.rank}
                className={`p-3.5 rounded-2xl border-2 flex items-center justify-between transition-all ${
                  item.rank === 4
                    ? 'bg-[#2b2416] border-yellow-400 shadow-lg'
                    : item.rank === 1
                    ? 'bg-[#182645] border-amber-400 shadow-md'
                    : 'bg-[#0d1629] border-slate-700'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={`w-8 h-8 rounded-xl font-black text-sm flex items-center justify-center border border-white ${
                    item.rank === 1 ? 'bg-amber-400 text-slate-950' : item.rank === 2 ? 'bg-slate-300 text-slate-950' : item.rank === 3 ? 'bg-amber-700 text-white' : 'bg-slate-800 text-slate-300'
                  }`}>
                    #{item.rank}
                  </span>
                  <div>
                    <div className="font-black text-white text-sm flex items-center gap-2">
                      {item.team}
                      <span className="text-[10px] px-2 py-0.5 bg-sky-950 text-sky-300 border border-sky-400/40 rounded-md">{item.city}</span>
                    </div>
                    <div className="text-[11px] text-amber-300 font-extrabold mt-0.5">{item.badge}</div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="font-num font-black text-base text-yellow-300 drop-shadow">{item.score.toLocaleString()} PTS</div>
                  <div className="text-[10px] text-slate-300">{item.members}/5人 在线</div>
                </div>
              </div>
            ))
          ) : (
            [
              { rank: 1, name: '守网卫士_01 (你)', title: 'S+ 破浪大师', score: 3890 },
              { rank: 2, name: '雷达监测员_严力', title: 'S 级特聘指挥', score: 3740 },
              { rank: 3, name: '网评组长_张敏', title: 'S 级舆情导师', score: 3610 },
            ].map((item) => (
              <div key={item.rank} className="p-3.5 bg-[#0d1629] rounded-2xl border-2 border-sky-400/40 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="font-black font-num text-amber-300 text-base">#{item.rank}</span>
                  <div>
                    <div className="font-black text-white text-sm">{item.name}</div>
                    <div className="text-[11px] text-sky-200">{item.title}</div>
                  </div>
                </div>
                <div className="font-num font-black text-base text-amber-300">{item.score.toLocaleString()} PTS</div>
              </div>
            ))
          )}
        </div>

        {/* Footer Note */}
        <div className="p-4 bg-[#0d1629] border-t-2 border-sky-400/40 text-xs text-slate-300 font-bold flex items-center justify-between">
          <span>拉动科室同事 5 人组队，全员解锁 20% 战力加成！</span>
          <button onClick={onClose} className="px-5 py-2 bg-yellow-400 hover:bg-yellow-300 text-slate-950 rounded-xl font-black text-xs cursor-pointer shadow">
            确定
          </button>
        </div>

      </div>
    </div>
  );
};

