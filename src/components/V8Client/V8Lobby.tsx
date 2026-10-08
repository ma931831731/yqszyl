import React, { useState } from 'react';
import { 
  Target, Shield, Trophy, MessageSquareText, Lock, CheckCircle2, User, Flame, 
  Award, ArrowRight, Zap, ChevronLeft, ChevronRight, Send, Star, Users, MessageSquare, Home, FileCheck, Radar, Search, Globe
} from 'lucide-react';
import { LevelIncidentCase } from '../../types';

interface V8LobbyProps {
  onReturnToPortal: () => void;
  onOpenProfile: () => void;
  onOpenPractice: () => void;
  onOpenLevelSelect: () => void;
  onOpenLeaderboard: () => void;
  onOpenSecretChat: () => void;
  isPracticeCompleted: boolean;
  trustScore: number;
  totalScore: number;
  levelCases: LevelIncidentCase[];
}

export const V8Lobby: React.FC<V8LobbyProps> = ({
  onReturnToPortal,
  onOpenProfile,
  onOpenPractice,
  onOpenLevelSelect,
  onOpenLeaderboard,
  onOpenSecretChat,
  isPracticeCompleted,
  trustScore,
  totalScore,
  levelCases
}) => {
  // Collapsible Sidebars State
  const [isLeftRankOpen, setIsLeftRankOpen] = useState(true);
  const [isRightChatOpen, setIsRightChatOpen] = useState(true);

  // Quick Chat State in Right Panel
  const [chatInput, setChatInput] = useState('');
  const [chatLogs, setChatLogs] = useState([
    { id: 'm1', sender: '老严教官 (指挥中心)', isSelf: false, text: '守网卫士！请先进入【练兵场】熟练掌握 8 大系统解谜操作！' },
    { id: 'm2', sender: '守网卫士_01 (你)', isSelf: true, text: '收到！正在对属地发文草稿进行公文扫雷排错！' }
  ]);

  const passedLevelsCount = levelCases.filter(l => l.isPassed).length;

  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    setChatLogs(prev => [...prev, { id: `m-${Date.now()}`, sender: '守网卫士_01 (你)', isSelf: true, text: chatInput }]);
    setChatInput('');
  };

  return (
    <div className="min-h-screen bg-[#0b1326] text-slate-100 flex flex-col justify-between p-4 md:p-6 select-none relative overflow-hidden font-sans">
      
      {/* TOP HEADER: DIRECT USER RANK DISPLAY & RETURN TO PORTAL BUTTON */}
      <header className="bg-[#131e36] border-2 border-slate-700 p-4 rounded-2xl shadow-xl flex flex-col md:flex-row items-center justify-between gap-4 relative z-10 mb-4">
        
        {/* User Profile Info + Highlighted Rank Badge */}
        <div className="flex items-center gap-4 cursor-pointer group" onClick={onOpenProfile} title="点击查看个人详情与点亮防伪证书">
          <div className="relative">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-tr from-cyan-600 to-blue-600 flex items-center justify-center font-black text-2xl text-white shadow-md group-hover:scale-105 transition-transform border border-cyan-400/30">
              卫
            </div>
            <div className="absolute -bottom-1 -right-1 px-1.5 py-0.5 rounded bg-amber-500 text-slate-950 font-black text-xs border border-slate-950">
              白银
            </div>
          </div>

          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-xl font-black text-white group-hover:text-cyan-300 transition-colors tracking-wide">
                守网卫士_01
              </h2>
              {/* Highlighted Rank Badge */}
              <span className="px-3 py-1 rounded-lg bg-amber-500 text-slate-950 font-black text-xs shadow flex items-center gap-1.5">
                <Flame className="w-4 h-4 fill-current" />
                段位：白银·破浪大师 (S+)
              </span>
            </div>
            <p className="text-sm text-slate-300 font-medium mt-1">
              所属单位：省属地网信应急一队 | 点击查看个人积分档案与防伪通关证书墙
            </p>
          </div>
        </div>

        {/* Global Progress Metrics & Return to Portal Button */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-6 bg-[#0a1020] px-5 py-2.5 rounded-xl border border-slate-750 text-xs">
            <div className="text-center">
              <div className="text-slate-400 font-semibold text-xs mb-0.5">练兵场特训</div>
              <div className="font-bold text-sm">
                {isPracticeCompleted ? (
                  <span className="text-emerald-400 flex items-center gap-1 font-extrabold">
                    <CheckCircle2 className="w-4 h-4" /> 已完成特训
                  </span>
                ) : (
                  <span className="text-amber-400 flex items-center gap-1 font-extrabold">
                    <Flame className="w-4 h-4" /> 进行中 (优先完成)
                  </span>
                )}
              </div>
            </div>

            <div className="h-7 w-px bg-slate-700" />

            <div className="text-center">
              <div className="text-slate-400 font-semibold text-xs mb-0.5">推演关卡解锁</div>
              <div className="font-black text-base text-cyan-300 font-num">
                {passedLevelsCount} / {levelCases.length} 关通关
              </div>
            </div>

            <div className="h-7 w-px bg-slate-700" />

            <div className="text-center">
              <div className="text-slate-400 font-semibold text-xs mb-0.5">全省战力积分</div>
              <div className="font-black text-base text-amber-400 font-num">
                {totalScore.toLocaleString()} PTS
              </div>
            </div>
          </div>

          {/* Button to Return to Portal Selection */}
          <button
            onClick={onReturnToPortal}
            className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-100 border border-slate-600 font-extrabold text-xs rounded-xl shadow flex items-center gap-2 transition-all cursor-pointer hover:text-white"
            title="返回系统入口（选择V8客户端、Cocos养成系或MT管理端）"
          >
            <Home className="w-4 h-4 text-cyan-400" />
            <span>返回系统门头</span>
          </button>
        </div>

      </header>

      {/* THREE-COLUMN MAIN CANVAS LAYOUT (1920*1080 Full Screen Layout) */}
      <main className="flex-1 flex gap-4 relative z-10 my-auto items-stretch">
        
        {/* LEFT COLLAPSIBLE SIDEBAR: 天梯榜 (本机构及全省战队榜) */}
        <div className={`transition-all duration-300 flex flex-col bg-[#131e36] rounded-2xl border-2 border-slate-700 p-4 shadow-xl relative ${
          isLeftRankOpen ? 'w-80' : 'w-14'
        }`}>
          {/* Collapse Toggle Button */}
          <button
            onClick={() => setIsLeftRankOpen(!isLeftRankOpen)}
            className="absolute top-4 right-3 p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-600 transition-all z-20 cursor-pointer"
            title={isLeftRankOpen ? '收起左侧天梯榜' : '展开左侧天梯榜'}
          >
            {isLeftRankOpen ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          </button>

          {isLeftRankOpen ? (
            <div className="flex-1 flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center gap-2 font-black text-base text-white mb-3">
                  <Trophy className="w-5 h-5 text-amber-400" />
                  <span>天梯榜 (本机构战队)</span>
                </div>

                <div className="space-y-2.5">
                  {[
                    { rank: 1, name: '高新区网信宣传一队', score: '14,850', badge: '🥇 冠军' },
                    { rank: 2, name: '某市应急管理指挥组', score: '13,920', badge: '🥈 亚军' },
                    { rank: 3, name: '文旅宣传处推演先锋', score: '12,400', badge: '🥉 季军' },
                    { rank: 4, name: '守网卫士分队 (本机构)', score: '11,800', badge: '⭐ 5人组队+20%' },
                  ].map(item => (
                    <div
                      key={item.rank}
                      className={`p-3 rounded-xl border flex items-center justify-between ${
                        item.rank === 4 ? 'bg-amber-950/60 border-amber-500/60 text-amber-200' : 'bg-[#0a1020] border-slate-750 text-slate-200'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="font-extrabold font-num text-slate-400 w-5 text-sm">#{item.rank}</span>
                        <div>
                          <div className="font-bold text-xs text-white truncate max-w-[130px]">{item.name}</div>
                          <div className="text-xs text-slate-400 font-medium">{item.badge}</div>
                        </div>
                      </div>
                      <span className="font-num font-black text-amber-400 text-sm">{item.score}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={onOpenLeaderboard}
                className="w-full py-2.5 bg-indigo-900 hover:bg-indigo-800 text-indigo-100 border border-indigo-500/40 font-extrabold text-xs rounded-xl text-center transition-all cursor-pointer"
              >
                查看完整全省天梯榜 ➔
              </button>
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-between py-2 text-slate-300">
              <Trophy className="w-6 h-6 text-amber-400 mt-2" />
              <span className="writing-vertical font-black text-sm tracking-widest text-slate-300 my-auto">
                天梯榜
              </span>
            </div>
          )}
        </div>

        {/* CENTER MAIN DISPLAY AREA: 2 CORE GAME CARDS */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
          
          {/* CARD 1: 【练兵场】 (新手特训与指引) */}
          <div
            onClick={onOpenPractice}
            className={`group p-6 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between shadow-2xl relative overflow-hidden ${
              isPracticeCompleted
                ? 'bg-[#131e36] border-emerald-500/60 hover:border-emerald-400'
                : 'bg-[#131e36] border-amber-500/80 hover:border-amber-400'
            }`}
          >
            {/* Darkened Overlay on Background Image for High Text Contrast */}
            <div 
              className="absolute inset-0 bg-cover bg-center opacity-20 group-hover:opacity-30 group-hover:scale-105 transition-all duration-500 pointer-events-none"
              style={{ backgroundImage: `url('/training_ground.png')` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0b1326] via-[#0b1326]/90 to-[#0b1326]/70 pointer-events-none" />

            <div className="relative z-10 space-y-4">
              {/* Card Header */}
              <div className="flex items-center justify-between">
                <div className="w-14 h-14 rounded-xl bg-amber-500/20 border border-amber-500/60 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform">
                  <Target className="w-8 h-8" />
                </div>
                {isPracticeCompleted ? (
                  <span className="px-3.5 py-1 rounded-lg bg-emerald-900/90 text-emerald-200 border border-emerald-500/50 font-extrabold text-xs shadow">
                    ✓ 练兵目标已达成
                  </span>
                ) : (
                  <span className="px-3.5 py-1 rounded-lg bg-amber-500 text-slate-950 font-extrabold text-xs shadow">
                    ⭐ 新手学习入口 (优先完成)
                  </span>
                )}
              </div>

              <div>
                <h3 className="text-2xl font-black text-white mb-2 group-hover:text-amber-300 transition-colors tracking-wide">
                  练 兵 场 (新手特训)
                </h3>
                <p className="text-sm text-slate-200 leading-relaxed font-medium">
                  新手玩家入门指引速练！将 8 大软件装备核心技能拆解为 1 分钟解谜靶场。
                  <span className="text-amber-300 font-extrabold block mt-1">必须完成学习训练后，方可解锁【实战演练作战】！</span>
                </p>
              </div>

              {/* Training Feature Grid (High contrast text) */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-3 rounded-xl bg-[#0a1020] border border-slate-700">
                  <div className="flex items-center gap-1.5 font-extrabold text-xs text-amber-300 mb-1">
                    <FileCheck className="w-4 h-4" /> 1. 公文扫雷靶场
                  </div>
                  <p className="text-xs text-slate-300 font-medium">属地通报错别字与敏感职务秒排</p>
                </div>

                <div className="p-3 rounded-xl bg-[#0a1020] border border-slate-700">
                  <div className="flex items-center gap-1.5 font-extrabold text-xs text-cyan-300 mb-1">
                    <Search className="w-4 h-4" /> 2. 探针打靶靶场
                  </div>
                  <p className="text-xs text-slate-300 font-medium">海量帖文 5 秒打标打捞证据链</p>
                </div>

                <div className="p-3 rounded-xl bg-[#0a1020] border border-slate-700">
                  <div className="flex items-center gap-1.5 font-extrabold text-xs text-emerald-300 mb-1">
                    <Radar className="w-4 h-4" /> 3. 雷达校准靶场
                  </div>
                  <p className="text-xs text-slate-300 font-medium">设定高危关键词与阈值捕获声量</p>
                </div>

                <div className="p-3 rounded-xl bg-[#0a1020] border border-slate-700">
                  <div className="flex items-center gap-1.5 font-extrabold text-xs text-purple-300 mb-1">
                    <Users className="w-4 h-4" /> 4. 网评四连击
                  </div>
                  <p className="text-xs text-slate-300 font-medium">“赞/转/评/报”战术反击网络水军</p>
                </div>
              </div>
            </div>

            {/* Bottom Status & Action Bar */}
            <div className="relative z-10 pt-4 border-t border-slate-700 flex items-center justify-between text-sm font-extrabold text-amber-400 mt-4">
              <span>{isPracticeCompleted ? '重新练习装备技能' : '进入练兵场开始学习 ➔'}</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
            </div>
          </div>

          {/* CARD 2: 【实战演练作战】 (逐关推演) */}
          <div
            onClick={() => {
              if (isPracticeCompleted) onOpenLevelSelect();
            }}
            className={`group p-6 rounded-2xl border-2 transition-all flex flex-col justify-between shadow-2xl relative overflow-hidden ${
              isPracticeCompleted
                ? 'bg-[#131e36] border-cyan-500/60 hover:border-cyan-400 cursor-pointer'
                : 'bg-[#131e36] border-slate-750 opacity-75 cursor-not-allowed'
            }`}
          >
            {/* Darkened Overlay on Background Image for High Text Contrast */}
            <div 
              className="absolute inset-0 bg-cover bg-center opacity-20 group-hover:opacity-30 group-hover:scale-105 transition-all duration-500 pointer-events-none"
              style={{ backgroundImage: `url('/battlefield.png')` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0b1326] via-[#0b1326]/90 to-[#0b1326]/70 pointer-events-none" />

            <div className="relative z-10 space-y-4">
              {/* Card Header */}
              <div className="flex items-center justify-between">
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center border ${
                  isPracticeCompleted ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/60' : 'bg-slate-800 text-slate-500 border-slate-700'
                }`}>
                  <Shield className="w-8 h-8" />
                </div>
                {isPracticeCompleted ? (
                  <span className="px-3.5 py-1 rounded-lg bg-cyan-900/90 text-cyan-200 border border-cyan-500/50 font-extrabold text-xs shadow">
                    🔥 作战关卡已解锁
                  </span>
                ) : (
                  <span className="px-3.5 py-1 rounded-lg bg-slate-800 text-slate-300 font-extrabold text-xs flex items-center gap-1 border border-slate-700 shadow">
                    <Lock className="w-3.5 h-3.5" /> 锁定中 (需先通关练兵场)
                  </span>
                )}
              </div>

              <div>
                <h3 className="text-2xl font-black text-white mb-2 group-hover:text-cyan-300 transition-colors tracking-wide">
                  实 战 演 练 作 战
                </h3>
                <p className="text-sm text-slate-200 leading-relaxed font-medium">
                  根据真实舆情案例打造 6 大关卡，按发现、传播扩散、跟踪与处置难易程度递进解锁。
                  <span className="text-cyan-300 font-extrabold block mt-1">每关通关后自动生成战力结算大屏并点亮证书！</span>
                </p>
              </div>

              {/* Level Map Overview Grid (High contrast text) */}
              <div className="grid grid-cols-3 gap-2.5 pt-2">
                <div className="p-3 rounded-xl bg-[#0a1020] border border-slate-700 text-center">
                  <div className="font-extrabold text-xs text-emerald-400">第1关·顺藤摸瓜</div>
                  <div className="text-xs text-slate-300 font-medium mt-1">自媒体维权案例</div>
                </div>

                <div className="p-3 rounded-xl bg-[#0a1020] border border-slate-700 text-center">
                  <div className="font-extrabold text-xs text-sky-400">第2关·雷达警报</div>
                  <div className="text-xs text-slate-300 font-medium mt-1">园区火灾救援案例</div>
                </div>

                <div className="p-3 rounded-xl bg-[#0a1020] border border-slate-700 text-center">
                  <div className="font-extrabold text-xs text-amber-400">第3关·密令如山</div>
                  <div className="text-xs text-slate-300 font-medium mt-1">汛期强降雨协同</div>
                </div>

                <div className="p-3 rounded-xl bg-[#0a1020] border border-slate-700 text-center">
                  <div className="font-extrabold text-xs text-rose-400">第4关·逆流突围</div>
                  <div className="text-xs text-slate-300 font-medium mt-1">文旅宰客水军反击</div>
                </div>

                <div className="p-3 rounded-xl bg-[#0a1020] border border-slate-700 text-center">
                  <div className="font-extrabold text-xs text-purple-400">第5关·暗度陈仓</div>
                  <div className="text-xs text-slate-300 font-medium mt-1">境外推文炒作倒灌</div>
                </div>

                <div className="p-3 rounded-xl bg-[#0a1020] border border-slate-700 text-center">
                  <div className="font-extrabold text-xs text-indigo-400">第6关·惊涛骇浪</div>
                  <div className="text-xs text-slate-300 font-medium mt-1">重特大复合型危机</div>
                </div>
              </div>
            </div>

            {/* Bottom Status & Action Bar */}
            <div className="relative z-10 pt-4 border-t border-slate-700 flex items-center justify-between text-sm font-extrabold text-cyan-400 mt-4">
              <span>{isPracticeCompleted ? '选择演练关卡 ➔' : '锁定中 (请先完成练兵)'}</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
            </div>
          </div>

        </div>

        {/* RIGHT COLLAPSIBLE SIDEBAR: 点点密信 (加密聊天大厅) */}
        <div className={`transition-all duration-300 flex flex-col bg-[#131e36] rounded-2xl border-2 border-slate-700 p-4 shadow-xl relative ${
          isRightChatOpen ? 'w-80' : 'w-14'
        }`}>
          {/* Collapse Toggle Button */}
          <button
            onClick={() => setIsRightChatOpen(!isRightChatOpen)}
            className="absolute top-4 left-3 p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-600 transition-all z-20 cursor-pointer"
            title={isRightChatOpen ? '收起右侧密信' : '展开右侧密信'}
          >
            {isRightChatOpen ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>

          {isRightChatOpen ? (
            <div className="flex-1 flex flex-col justify-between space-y-3">
              <div>
                <div className="flex items-center gap-2 font-black text-base text-white mb-3 justify-end pr-8">
                  <MessageSquareText className="w-5 h-5 text-emerald-400" />
                  <span>点点密信 (加密沟通)</span>
                </div>

                <div className="space-y-2.5 max-h-80 overflow-y-auto pr-1 text-xs">
                  {chatLogs.map(m => (
                    <div key={m.id} className={`p-3 rounded-xl border text-xs leading-relaxed font-medium ${
                      m.isSelf ? 'bg-cyan-950/80 border-cyan-500/40 text-cyan-100' : 'bg-[#0a1020] border-slate-750 text-slate-200'
                    }`}>
                      <div className="font-extrabold text-xs text-slate-300 mb-1">{m.sender}</div>
                      <div>{m.text}</div>
                    </div>
                  ))}
                </div>
              </div>

              <form onSubmit={handleSendChat} className="flex gap-2 border-t border-slate-700 pt-3">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="发送密信..."
                  className="flex-1 bg-[#0a1020] border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500 font-medium"
                />
                <button type="submit" className="px-3.5 py-2 bg-emerald-500 text-slate-950 font-extrabold text-xs rounded-xl hover:bg-emerald-400 cursor-pointer">
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-between py-2 text-slate-300">
              <MessageSquareText className="w-6 h-6 text-emerald-400 mt-2" />
              <span className="writing-vertical font-black text-sm tracking-widest text-slate-300 my-auto">
                点点密信
              </span>
            </div>
          )}
        </div>

      </main>

      {/* FOOTER */}
      <footer className="text-center text-xs text-slate-400 font-medium relative z-10 pt-3 border-t border-slate-800">
        风暴中枢 · 全域舆情应急推演系统 (V8客户端) | 左右侧抽屉均可自由收起展开，点击顶部【返回系统门头】可切换至其他端口
      </footer>

    </div>
  );
};
