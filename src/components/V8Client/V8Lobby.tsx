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
    <div className="min-h-screen bg-[#060a17] bg-cyber-grid text-slate-100 flex flex-col justify-between p-4 md:p-6 select-none relative overflow-hidden">
      
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* TOP HEADER: DIRECT USER RANK DISPLAY & RETURN TO PORTAL BUTTON */}
      <header className="bg-slate-900/90 backdrop-blur-md border border-cyan-500/30 p-4 rounded-3xl shadow-2xl flex flex-col md:flex-row items-center justify-between gap-4 relative z-10 glow-cyan mb-4">
        
        {/* User Profile Info + Highlighted Rank Badge */}
        <div className="flex items-center gap-4 cursor-pointer group" onClick={onOpenProfile} title="点击查看个人详情与点亮防伪证书">
          <div className="relative">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-cyan-400 to-blue-600 flex items-center justify-center font-black text-xl text-slate-950 group-hover:scale-105 transition-transform glow-cyan">
              卫
            </div>
            <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-amber-500 text-slate-950 font-bold text-[10px] flex items-center justify-center border-2 border-slate-950">
              白银
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-slate-100 group-hover:text-cyan-300 transition-colors">
                守网卫士_01
              </h2>
              {/* Highlighted Rank Badge */}
              <span className="px-3 py-1 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-black text-xs shadow-lg glow-gold flex items-center gap-1">
                <Flame className="w-3.5 h-3.5 fill-current" />
                段位：白银·破浪大师 (S+)
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">所属单位：省属地网信应急一队 | 点击查看个人积分档案与防伪通关证书墙</p>
          </div>
        </div>

        {/* Global Progress Metrics & Return to Portal Button */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-6 bg-slate-950/80 px-5 py-2.5 rounded-2xl border border-slate-800 text-xs">
            <div className="text-center">
              <div className="text-slate-500 text-[10px]">练兵场考核</div>
              <div className="font-bold text-sm">
                {isPracticeCompleted ? (
                  <span className="text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" /> 已完成特训
                  </span>
                ) : (
                  <span className="text-amber-400 flex items-center gap-1">
                    <Flame className="w-4 h-4 animate-bounce" /> 进行中 (需完成)
                  </span>
                )}
              </div>
            </div>

            <div className="h-6 w-px bg-slate-800" />

            <div className="text-center">
              <div className="text-slate-500 text-[10px]">推演关卡解锁</div>
              <div className="font-bold font-num text-sm text-cyan-300">
                {passedLevelsCount} / {levelCases.length} 关通关
              </div>
            </div>

            <div className="h-6 w-px bg-slate-800" />

            <div className="text-center">
              <div className="text-slate-500 text-[10px]">全省战力积分</div>
              <div className="font-bold font-num text-sm text-amber-400">
                {totalScore.toLocaleString()} PTS
              </div>
            </div>
          </div>

          {/* Button to Return to Portal Selection */}
          <button
            onClick={onReturnToPortal}
            className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold text-xs rounded-2xl shadow-md flex items-center gap-1.5 transition-all cursor-pointer hover:text-white"
            title="返回系统入口（选择V8客户端或MT管理端）"
          >
            <Home className="w-4 h-4 text-cyan-400" />
            <span>返回系统门头</span>
          </button>
        </div>

      </header>

      {/* THREE-COLUMN MAIN CANVAS LAYOUT (1920*1080 Full Screen Layout) */}
      <main className="flex-1 flex gap-4 relative z-10 my-auto items-stretch">
        
        {/* LEFT COLLAPSIBLE SIDEBAR: 天梯榜 (本机构及全省战队榜 - 可收起/展开 ◀/▶) */}
        <div className={`transition-all duration-300 flex flex-col bg-slate-900/80 backdrop-blur-md rounded-3xl border border-indigo-500/30 p-4 shadow-2xl relative ${
          isLeftRankOpen ? 'w-80' : 'w-14'
        }`}>
          {/* Collapse Toggle Button */}
          <button
            onClick={() => setIsLeftRankOpen(!isLeftRankOpen)}
            className="absolute top-4 right-3 p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-indigo-300 border border-indigo-500/40 transition-all z-20"
            title={isLeftRankOpen ? '收起左侧天梯榜' : '展开左侧天梯榜'}
          >
            {isLeftRankOpen ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          </button>

          {isLeftRankOpen ? (
            <div className="flex-1 flex flex-col justify-between space-y-3">
              <div>
                <div className="flex items-center gap-2 font-bold text-sm text-slate-100 mb-3">
                  <Trophy className="w-4 h-4 text-amber-400" />
                  <span>天梯榜 (本机构战队)</span>
                </div>

                <div className="space-y-2 text-xs">
                  {[
                    { rank: 1, name: '高新区网信宣传一队', score: '14,850', badge: '🥇 冠军' },
                    { rank: 2, name: '某市应急管理指挥组', score: '13,920', badge: '🥈 亚军' },
                    { rank: 3, name: '文旅宣传处推演先锋', score: '12,400', badge: '🥉 季军' },
                    { rank: 4, name: '守网卫士分队 (本机构)', score: '11,800', badge: '⭐ 5人组队+20%' },
                  ].map(item => (
                    <div
                      key={item.rank}
                      className={`p-2.5 rounded-xl border flex items-center justify-between ${
                        item.rank === 4 ? 'bg-amber-950/40 border-amber-500/50 text-amber-300' : 'bg-slate-950/60 border-slate-800'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="font-bold font-num text-slate-400 w-4">#{item.rank}</span>
                        <div>
                          <div className="font-bold text-[11px] truncate max-w-[140px]">{item.name}</div>
                          <div className="text-[9px] text-slate-500">{item.badge}</div>
                        </div>
                      </div>
                      <span className="font-num font-bold text-amber-400 text-xs">{item.score}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={onOpenLeaderboard}
                className="w-full py-2 bg-indigo-950 hover:bg-indigo-900 text-indigo-300 border border-indigo-500/30 font-bold text-xs rounded-xl text-center transition-all"
              >
                查看完整全省天梯榜 ➔
              </button>
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-between py-2 text-slate-400">
              <Trophy className="w-6 h-6 text-amber-400 mt-2" />
              <span className="writing-vertical font-cyber text-xs tracking-widest text-slate-400 my-auto">
                天梯榜
              </span>
            </div>
          )}
        </div>

        {/* CENTER MAIN DISPLAY AREA: ENRICHED 2 CORE GAME CARDS WITH BACKGROUND IMAGES & FULL CONTENT */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
          
          {/* CARD 1: 【练兵场】 (新手特训与指引 - 带背景图与丰满内容) */}
          <div
            onClick={onOpenPractice}
            className={`group p-6 rounded-3xl border-2 transition-all cursor-pointer flex flex-col justify-between shadow-2xl relative overflow-hidden ${
              isPracticeCompleted
                ? 'bg-slate-950 border-emerald-500/40 hover:border-emerald-400 glow-cyan'
                : 'bg-slate-950 border-amber-500/60 hover:border-amber-400 glow-gold animate-pulse-subtle'
            }`}
          >
            {/* Thematic Background Image Layer */}
            <div 
              className="absolute inset-0 bg-cover bg-center opacity-30 group-hover:opacity-45 group-hover:scale-105 transition-all duration-500 pointer-events-none"
              style={{ backgroundImage: `url('/training_ground.png')` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#060a17] via-[#060a17]/85 to-[#060a17]/50 pointer-events-none" />

            <div className="relative z-10 space-y-4">
              {/* Card Header */}
              <div className="flex items-center justify-between">
                <div className="w-14 h-14 rounded-2xl bg-amber-500/20 border border-amber-500/50 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform glow-gold">
                  <Target className="w-8 h-8" />
                </div>
                {isPracticeCompleted ? (
                  <span className="px-3 py-1 rounded-full bg-emerald-950/90 text-emerald-300 border border-emerald-500/40 font-bold text-xs shadow-md">
                    ✓ 练兵目标已达成
                  </span>
                ) : (
                  <span className="px-3 py-1 rounded-full bg-amber-950/90 text-amber-300 border border-amber-500/40 font-bold text-xs shadow-md">
                    ⭐ 新手学习入口 (优先完成)
                  </span>
                )}
              </div>

              <div>
                <h3 className="text-2xl font-black font-cyber text-slate-100 mb-1 group-hover:text-amber-300 transition-colors">
                  练 兵 场 (新手特训)
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  新手玩家入门指引速练！将 8 大软件装备核心技能拆解为 1 分钟解谜靶场。
                  <span className="text-amber-300 font-bold inline ml-1">完成学习训练后，方可解锁【实战演练作战】！</span>
                </p>
              </div>

              {/* Training Feature Grid (Fills empty space) */}
              <div className="grid grid-cols-2 gap-2.5 pt-1">
                <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-sm">
                  <div className="flex items-center gap-1.5 font-bold text-xs text-amber-300 mb-0.5">
                    <FileCheck className="w-3.5 h-3.5" /> 1. 公文扫雷靶场
                  </div>
                  <p className="text-[10px] text-slate-400">属地通报错别字与敏感职务秒排</p>
                </div>

                <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-sm">
                  <div className="flex items-center gap-1.5 font-bold text-xs text-cyan-300 mb-0.5">
                    <Search className="w-3.5 h-3.5" /> 2. 探针打靶靶场
                  </div>
                  <p className="text-[10px] text-slate-400">海量帖文 5 秒打标打捞证据链</p>
                </div>

                <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-sm">
                  <div className="flex items-center gap-1.5 font-bold text-xs text-emerald-300 mb-0.5">
                    <Radar className="w-3.5 h-3.5" /> 3. 雷达校准靶场
                  </div>
                  <p className="text-[10px] text-slate-400">设定高危关键词与阈值捕获声量</p>
                </div>

                <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-sm">
                  <div className="flex items-center gap-1.5 font-bold text-xs text-purple-300 mb-0.5">
                    <Users className="w-3.5 h-3.5" /> 4. 网评四连击
                  </div>
                  <p className="text-[10px] text-slate-400">“赞/转/评/报”战术反击网络水军</p>
                </div>
              </div>
            </div>

            {/* Bottom Status & Action Bar */}
            <div className="relative z-10 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-bold text-amber-400 mt-4">
              <span>{isPracticeCompleted ? '重新练习装备技能' : '进入练兵场开始学习 ➔'}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* CARD 2: 【实战演练作战】 (逐关推演 - 带背景图与丰满内容) */}
          <div
            onClick={() => {
              if (isPracticeCompleted) onOpenLevelSelect();
            }}
            className={`group p-6 rounded-3xl border-2 transition-all flex flex-col justify-between shadow-2xl relative overflow-hidden ${
              isPracticeCompleted
                ? 'bg-slate-950 border-cyan-500/50 hover:border-cyan-400 cursor-pointer glow-cyan'
                : 'bg-slate-950/90 border-slate-900 opacity-70 cursor-not-allowed'
            }`}
          >
            {/* Thematic Background Image Layer */}
            <div 
              className="absolute inset-0 bg-cover bg-center opacity-30 group-hover:opacity-45 group-hover:scale-105 transition-all duration-500 pointer-events-none"
              style={{ backgroundImage: `url('/battlefield.png')` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#060a17] via-[#060a17]/85 to-[#060a17]/50 pointer-events-none" />

            <div className="relative z-10 space-y-4">
              {/* Card Header */}
              <div className="flex items-center justify-between">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
                  isPracticeCompleted ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 glow-cyan' : 'bg-slate-800 text-slate-500'
                }`}>
                  <Shield className="w-8 h-8" />
                </div>
                {isPracticeCompleted ? (
                  <span className="px-3 py-1 rounded-full bg-cyan-950/90 text-cyan-300 border border-cyan-500/40 font-bold text-xs shadow-md">
                    🔥 作战关卡已解锁
                  </span>
                ) : (
                  <span className="px-3 py-1 rounded-full bg-slate-900/90 text-slate-500 text-xs flex items-center gap-1 shadow-md">
                    <Lock className="w-3.5 h-3.5" /> 锁定中 (需先通关练兵场)
                  </span>
                )}
              </div>

              <div>
                <h3 className="text-2xl font-black font-cyber text-slate-100 mb-1 group-hover:text-cyan-300 transition-colors">
                  实 战 演 练 作 战
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  根据真实舆情案例打造 6 大关卡，按发现、传播扩散、跟踪与处置难易程度递进解锁。
                  <span className="text-cyan-300 font-bold inline ml-1">通关后自动生成战力结算大屏并点亮证书！</span>
                </p>
              </div>

              {/* Level Map Overview Grid (Fills empty space) */}
              <div className="grid grid-cols-3 gap-2 pt-1">
                <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-center backdrop-blur-sm">
                  <div className="font-bold text-[11px] text-emerald-400">第1关·顺藤摸瓜</div>
                  <div className="text-[9px] text-slate-400 mt-0.5">自媒体维权案例</div>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-center backdrop-blur-sm">
                  <div className="font-bold text-[11px] text-sky-400">第2关·雷达警报</div>
                  <div className="text-[9px] text-slate-400 mt-0.5">园区火灾救援案例</div>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-center backdrop-blur-sm">
                  <div className="font-bold text-[11px] text-amber-400">第3关·密令如山</div>
                  <div className="text-[9px] text-slate-400 mt-0.5">汛期强降雨协同</div>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-center backdrop-blur-sm">
                  <div className="font-bold text-[11px] text-rose-400">第4关·逆流突围</div>
                  <div className="text-[9px] text-slate-400 mt-0.5">文旅宰客水军反击</div>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-center backdrop-blur-sm">
                  <div className="font-bold text-[11px] text-purple-400">第5关·暗度陈仓</div>
                  <div className="text-[9px] text-slate-400 mt-0.5">境外推文炒作倒灌</div>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-center backdrop-blur-sm">
                  <div className="font-bold text-[11px] text-indigo-400">第6关·惊涛骇浪</div>
                  <div className="text-[9px] text-slate-400 mt-0.5">重特大复合型危机</div>
                </div>
              </div>
            </div>

            {/* Bottom Status & Action Bar */}
            <div className="relative z-10 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-bold text-cyan-400 mt-4">
              <span>{isPracticeCompleted ? '选择演练关卡 ➔' : '锁定中 (请先完成练兵)'}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

        </div>

        {/* RIGHT COLLAPSIBLE SIDEBAR: 点点密信 (加密聊天大厅 - 可收起/展开 ◀/▶) */}
        <div className={`transition-all duration-300 flex flex-col bg-slate-900/80 backdrop-blur-md rounded-3xl border border-emerald-500/30 p-4 shadow-2xl relative ${
          isRightChatOpen ? 'w-80' : 'w-14'
        }`}>
          {/* Collapse Toggle Button */}
          <button
            onClick={() => setIsRightChatOpen(!isRightChatOpen)}
            className="absolute top-4 left-3 p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-emerald-300 border border-emerald-500/40 transition-all z-20"
            title={isRightChatOpen ? '收起右侧密信' : '展开右侧密信'}
          >
            {isRightChatOpen ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>

          {isRightChatOpen ? (
            <div className="flex-1 flex flex-col justify-between space-y-3">
              <div>
                <div className="flex items-center gap-2 font-bold text-sm text-slate-100 mb-3 justify-end pr-8">
                  <MessageSquareText className="w-4 h-4 text-emerald-400" />
                  <span>点点密信 (加密沟通)</span>
                </div>

                <div className="space-y-2 max-h-80 overflow-y-auto pr-1 text-xs">
                  {chatLogs.map(m => (
                    <div key={m.id} className={`p-2.5 rounded-xl border text-[11px] leading-relaxed ${
                      m.isSelf ? 'bg-cyan-950/60 border-cyan-500/30 text-slate-200' : 'bg-slate-950/60 border-slate-800 text-slate-300'
                    }`}>
                      <div className="font-bold text-[10px] text-slate-400 mb-0.5">{m.sender}</div>
                      <div>{m.text}</div>
                    </div>
                  ))}
                </div>
              </div>

              <form onSubmit={handleSendChat} className="flex gap-2 border-t border-slate-800 pt-2">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="发送密信..."
                  className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
                />
                <button type="submit" className="px-3 py-1.5 bg-emerald-500 text-slate-950 font-bold text-xs rounded-lg hover:bg-emerald-400">
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-between py-2 text-slate-400">
              <MessageSquareText className="w-6 h-6 text-emerald-400 mt-2" />
              <span className="writing-vertical font-cyber text-xs tracking-widest text-slate-400 my-auto">
                点点密信
              </span>
            </div>
          )}
        </div>

      </main>

      {/* FOOTER */}
      <footer className="text-center text-xs text-slate-500 relative z-10 pt-3 border-t border-slate-900">
        风暴中枢 · 全域舆情应急推演系统 (V8客户端) | 左右侧抽屉均可自由收起展开，点击顶部【返回系统门头】可切换至 MT 管理端
      </footer>

    </div>
  );
};
