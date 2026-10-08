import React, { useState } from 'react';
import { 
  Radar, Search, Building2, MessageSquareText, FileText, Users, Globe, ShieldCheck, 
  CheckCircle2, AlertTriangle, Play, RefreshCw, Filter, Sparkles, Send, Flame, Award, Tag,
  ArrowRight, Shield, Layers
} from 'lucide-react';
import { SystemId, SystemEquipment, DocumentErrorItem, CommandTask } from '../types';

interface BattlefieldViewProps {
  systems: SystemEquipment[];
  activeSystem: SystemId;
  setActiveSystem: (id: SystemId) => void;
  documentErrors: DocumentErrorItem[];
  onFixDocumentError: (errorId: string) => void;
  onExecuteNetComment: (actionType: 'like' | 'forward' | 'comment' | 'report') => void;
  onDispatchCommand: (title: string) => void;
  trustScore: number;
}

export const BattlefieldView: React.FC<BattlefieldViewProps> = ({
  systems,
  activeSystem,
  setActiveSystem,
  documentErrors,
  onFixDocumentError,
  onExecuteNetComment,
  onDispatchCommand,
  trustScore
}) => {
  const [reportGenerated, setReportGenerated] = useState(false);
  const [taggedPosts, setTaggedPosts] = useState<string[]>([]);
  const [newCommandTitle, setNewCommandTitle] = useState('');
  const [currentPhase, setCurrentPhase] = useState<'discovery' | 'tracking' | 'disposal'>('discovery');

  const currentSysInfo = systems.find(s => s.id === activeSystem);

  const handleToggleTag = (postId: string) => {
    if (taggedPosts.includes(postId)) {
      setTaggedPosts(taggedPosts.filter(id => id !== postId));
    } else {
      setTaggedPosts([...taggedPosts, postId]);
    }
  };

  const handleAddCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommandTitle.trim()) return;
    onDispatchCommand(newCommandTitle);
    setNewCommandTitle('');
  };

  return (
    <div className="flex flex-col h-full bg-[#1b2b4b] rounded-3xl border-4 border-sky-400 overflow-hidden shadow-2xl font-sans select-none text-slate-100">
      
      {/* 3-Step Lifecycle Phase Navigation Banner (监测发现 ➔ 跟踪 ➔ 处置) */}
      <div className="bg-[#0d1629] p-3 border-b-2 border-sky-400/40 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-black">
        <div className="flex items-center gap-2">
          <span className="text-amber-300 flex items-center gap-1">
            <Layers className="w-4 h-4 text-amber-400" /> 全流程推演阶段：
          </span>
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setCurrentPhase('discovery')}
              className={`px-3 py-1 rounded-xl cursor-pointer transition-all border ${
                currentPhase === 'discovery'
                  ? 'bg-sky-400 text-slate-950 border-white shadow'
                  : 'bg-[#182645] text-sky-200 border-sky-400/30 hover:border-sky-400'
              }`}
            >
              1. 舆情监测发现
            </button>
            <span className="text-slate-500">➔</span>
            <button
              onClick={() => setCurrentPhase('tracking')}
              className={`px-3 py-1 rounded-xl cursor-pointer transition-all border ${
                currentPhase === 'tracking'
                  ? 'bg-amber-400 text-slate-950 border-white shadow'
                  : 'bg-[#182645] text-amber-200 border-amber-400/30 hover:border-amber-400'
              }`}
            >
              2. 舆情跟踪监测
            </button>
            <span className="text-slate-500">➔</span>
            <button
              onClick={() => setCurrentPhase('disposal')}
              className={`px-3 py-1 rounded-xl cursor-pointer transition-all border ${
                currentPhase === 'disposal'
                  ? 'bg-emerald-400 text-slate-950 border-white shadow'
                  : 'bg-[#182645] text-emerald-200 border-emerald-400/30 hover:border-emerald-400'
              }`}
            >
              3. 应急协同处置
            </button>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="px-3 py-1 rounded-xl bg-amber-400 text-slate-950 font-black shadow text-[11px]">
            ⚡ 练兵场装备积分已加载: +1,250 PTS
          </span>
          <span className="text-emerald-300 font-num">公信力: {trustScore}/100</span>
        </div>
      </div>

      {/* 8 Systems Equipment Navigation Tabs (yqyl.jfif 2D Game Style) */}
      <div className="bg-[#121c33] border-b-2 border-sky-400/40 p-2.5 overflow-x-auto">
        <div className="flex items-center gap-2 min-w-max">
          {systems.map((sys) => {
            const isActive = activeSystem === sys.id;
            return (
              <button
                key={sys.id}
                onClick={() => sys.unlocked && setActiveSystem(sys.id)}
                disabled={!sys.unlocked}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-2xl text-xs font-black transition-all cursor-pointer border-2 shadow ${
                  isActive
                    ? 'bg-sky-400 text-slate-950 border-white scale-105 shadow-lg'
                    : sys.unlocked
                    ? 'bg-[#182645] text-slate-200 hover:bg-[#20325a] border-sky-400/50'
                    : 'bg-[#0a1122] text-slate-500 border-slate-800 cursor-not-allowed opacity-50'
                }`}
              >
                <div className={`p-1 rounded-xl ${isActive ? 'bg-slate-950 text-white' : 'bg-[#0d1629] text-sky-300'}`}>
                  {sys.id === 'diting' && <Radar className="w-4 h-4" />}
                  {sys.id === 'quanwang' && <Search className="w-4 h-4" />}
                  {sys.id === 'shudi' && <Building2 className="w-4 h-4" />}
                  {sys.id === 'diandian' && <MessageSquareText className="w-4 h-4" />}
                  {sys.id === 'zhihui' && <FileText className="w-4 h-4" />}
                  {sys.id === 'wangping' && <Users className="w-4 h-4" />}
                  {sys.id === 'quanqiu' && <Globe className="w-4 h-4" />}
                  {sys.id === 'v8' && <ShieldCheck className="w-4 h-4" />}
                </div>

                <div className="text-left">
                  <div className="flex items-center gap-1">
                    <span>{sys.name}</span>
                    {!sys.unlocked && (
                      <span className="text-[9px] px-1 bg-slate-900 text-slate-400 rounded">🔒 待解锁</span>
                    )}
                  </div>
                  <div className={`text-[10px] ${isActive ? 'text-slate-800' : 'text-slate-400'}`}>{sys.actualSystem}</div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Workspace Display */}
      <div className="flex-1 p-5 overflow-y-auto space-y-4">
        
        {/* Active System Overview Banner */}
        <div className="bg-[#0d1629] p-4 rounded-2xl border-2 border-sky-400/60 flex flex-col sm:flex-row items-center justify-between gap-3 shadow">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-base font-black text-amber-300">{currentSysInfo?.name} ({currentSysInfo?.actualSystem})</span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-sky-400 text-slate-950 font-black shadow">
                {currentSysInfo?.codeName}
              </span>
            </div>
            <p className="text-xs text-sky-100 font-bold mt-1">{currentSysInfo?.desc}</p>
          </div>

          <div className="text-right text-xs bg-[#182645] px-3.5 py-2 rounded-xl border border-sky-400/40">
            <span className="text-slate-300 font-bold">实战操作玩法：</span>
            <span className="text-amber-300 font-black">{currentSysInfo?.gamePlayDesc}</span>
          </div>
        </div>

        {/* SYSTEM 1: 谛听预警系统 (全域雷达) */}
        {activeSystem === 'diting' && (
          <div className="space-y-4">
            <div className="bg-[#0d1629] p-5 rounded-2xl border-2 border-sky-400/60 shadow">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Radar className="w-6 h-6 text-sky-400 animate-spin" style={{ animationDuration: '6s' }} />
                  <span className="text-sm font-black text-white">24小时全网舆情走势雷达走势 (监测发现阶段)</span>
                </div>
                <button
                  onClick={() => setReportGenerated(true)}
                  className="px-4 py-2 bg-gradient-to-r from-amber-400 to-yellow-300 hover:from-amber-300 hover:to-yellow-200 text-slate-950 text-xs font-black rounded-xl shadow-lg border-2 border-white flex items-center gap-1.5 cursor-pointer transition-transform hover:scale-105"
                >
                  <Sparkles className="w-4 h-4 text-slate-950" />
                  生成全生命周期简报
                </button>
              </div>

              {/* Simulated SVG Graph */}
              <div className="h-48 w-full bg-[#121c33] rounded-2xl p-3 relative overflow-hidden flex items-end border border-slate-700">
                <svg className="w-full h-full overflow-visible" viewBox="0 0 500 150">
                  <defs>
                    <linearGradient id="gradCyan" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.5" />
                      <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.05" />
                    </linearGradient>
                  </defs>
                  <line x1="0" y1="30" x2="500" y2="30" stroke="#1e293b" strokeDasharray="3 3" />
                  <line x1="0" y1="75" x2="500" y2="75" stroke="#1e293b" strokeDasharray="3 3" />
                  <line x1="0" y1="120" x2="500" y2="120" stroke="#1e293b" strokeDasharray="3 3" />

                  <path
                    d="M0,130 Q70,120 120,90 T240,30 T360,80 T500,105 L500,150 L0,150 Z"
                    fill="url(#gradCyan)"
                  />
                  <path
                    d="M0,130 Q70,120 120,90 T240,30 T360,80 T500,105"
                    fill="none"
                    stroke="#38bdf8"
                    strokeWidth="3.5"
                  />
                  <circle cx="240" cy="30" r="6" fill="#f43f5e" className="animate-ping" />
                  <circle cx="240" cy="30" r="6" fill="#f43f5e" />
                  <text x="252" y="26" fill="#f43f5e" fontSize="13" fontWeight="bold">传播峰值 840 条/分</text>
                </svg>
              </div>
            </div>

            {reportGenerated && (
              <div className="bg-[#182645] border-2 border-emerald-400 p-4 rounded-2xl text-xs text-emerald-200 animate-fadeIn shadow-lg">
                <div className="flex items-center gap-2 font-black text-emerald-300 text-sm mb-1">
                  <CheckCircle2 className="w-5 h-5" /> 自动生成《高新区园区火灾舆情全生命周期简报.pdf》
                </div>
                <p className="text-slate-200 font-bold leading-relaxed">
                  发现时间：21:02 | 核心扩散源：短视频平台 | 建议处置：发布官方权威救援通报，启动网评引导。
                </p>
              </div>
            )}
          </div>
        )}

        {/* SYSTEM 2: 全网搜 (全网探针) */}
        {activeSystem === 'quanwang' && (
          <div className="space-y-3 text-xs font-bold">
            <div className="flex items-center justify-between bg-[#0d1629] p-3 rounded-xl border border-sky-400/40">
              <span className="font-black text-white">全网信息精准抓取与标签归档 (跟踪监测阶段)</span>
              <span className="text-amber-300 font-black">已打标证据链: {taggedPosts.length} / 3 篇</span>
            </div>

            <div className="space-y-2.5">
              {[
                { id: 'p1', author: '都市新闻爆料', content: '【突发】高新区厂房火灾现场浓烟滚滚，有网民称救援设备不足？', tag: '造谣风险帖' },
                { id: 'p2', author: '现场目击者小张', content: '刚刚路过现场，消防车已经到了，希望大家保持冷静，别乱传播未经证实的照片！', tag: '正向现场帖' },
                { id: 'p3', author: '网络搬运工', content: '听说这次火灾是因为违规操作导致的？求解释！', tag: '待核实疑点' },
              ].map((item) => (
                <div key={item.id} className="p-4 bg-[#0d1629] rounded-2xl border-2 border-slate-700 flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-black text-sky-300 text-sm">{item.author}</span>
                      <span className="px-2 py-0.5 bg-[#182645] text-amber-300 rounded-md text-[10px] border border-amber-400/40">{item.tag}</span>
                    </div>
                    <p className="text-slate-200">{item.content}</p>
                  </div>

                  <button
                    onClick={() => handleToggleTag(item.id)}
                    className={`px-4 py-2 rounded-xl font-black text-xs flex items-center gap-1 transition-all cursor-pointer border ${
                      taggedPosts.includes(item.id)
                        ? 'bg-emerald-400 text-slate-950 border-white shadow'
                        : 'bg-[#182645] text-sky-200 border-sky-400/50 hover:bg-sky-600 hover:text-white'
                    }`}
                  >
                    <Tag className="w-3.5 h-3.5" />
                    {taggedPosts.includes(item.id) ? '已归档' : '打标归档'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SYSTEM 3: 属地管理系统 (含【公文扫雷】互动靶场) */}
        {activeSystem === 'shudi' && (
          <div className="space-y-4">
            <div className="bg-[#2b2416] border-2 border-amber-400 p-4 rounded-2xl flex items-center justify-between text-xs text-amber-200 font-bold shadow">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />
                <div>
                  <span className="font-black text-amber-300">【属地公文扫雷实战装备】</span>
                  <span>请审查下方草拟通报，点击红框标注的错别字或职务错误进行一键更正！</span>
                </div>
              </div>
              <span className="font-num font-black text-sm text-amber-400">
                待排查: {documentErrors.filter(e => !e.isFixed).length} / {documentErrors.length}
              </span>
            </div>

            {/* Public Announcement Interactive Redlining Document */}
            <div className="bg-[#0d1629] p-6 rounded-2xl border-2 border-sky-400/60 font-serif leading-relaxed text-sm text-slate-100 relative shadow">
              <h3 className="text-center font-black text-xl mb-4 text-sky-300 tracking-wide font-sans">
                关于高新区工业园突发火情抢险处置情况的通报
              </h3>

              <p className="mb-3 indent-8 font-medium">
                2026年10月5日19时30分，高新区工业园一处仓库发生火情。接到报警后，
                <span className="inline-block relative border-b-2 border-rose-500 bg-rose-950/80 px-2 py-0.5 rounded cursor-pointer hover:bg-rose-900"
                      onClick={() => onFixDocumentError('err1')} title="点击一键扫雷修正">
                  {documentErrors.find(e => e.id === 'err1')?.isFixed ? (
                    <span className="text-emerald-400 font-black font-sans">应急救援指挥长 张伟</span>
                  ) : (
                    <span className="text-rose-400 font-black font-sans">应急救援指挥长 张伟大 ⚠️(错字)</span>
                  )}
                </span>
                立即带队赶赴现场，组织公安、消防及医疗救援力量开展抢险救援。
              </p>

              <p className="mb-3 indent-8 font-medium">
                截至目前，现场火势已得到有效控制，事故造成
                <span className="inline-block relative border-b-2 border-rose-500 bg-rose-950/80 px-2 py-0.5 rounded cursor-pointer hover:bg-rose-900"
                      onClick={() => onFixDocumentError('err2')} title="点击一键扫雷修正">
                  {documentErrors.find(e => e.id === 'err2')?.isFixed ? (
                    <span className="text-emerald-400 font-black font-sans">无人员伤亡</span>
                  ) : (
                    <span className="text-rose-400 font-black font-sans">无人员伤伤亡 ⚠️(重字)</span>
                  )}
                </span>
                。起火原因正在深入调查中。
              </p>

              <div className="mt-6 text-right font-sans text-xs text-slate-400 font-bold">
                <p>高新区应急处置指挥部</p>
                <p>2026年10月5日</p>
              </div>
            </div>
          </div>
        )}

        {/* SYSTEM 4: 点点密信 (密级通信) */}
        {activeSystem === 'diandian' && (
          <div className="bg-[#0d1629] rounded-2xl border-2 border-sky-400/60 p-4 space-y-3 text-xs font-bold shadow">
            <div className="flex items-center gap-2 border-b border-slate-700 pb-2">
              <MessageSquareText className="w-5 h-5 text-emerald-400" />
              <span className="font-black text-white text-sm">【加密指挥群】高新区应急演练实时协同群</span>
            </div>

            <div className="space-y-3 h-48 overflow-y-auto pr-1">
              <div className="flex gap-2">
                <div className="w-8 h-8 rounded-xl bg-sky-400 text-slate-950 flex items-center justify-center font-black text-xs border border-white">教</div>
                <div className="bg-[#182645] p-3 rounded-2xl border border-sky-400/40 max-w-[80%]">
                  <div className="font-black text-sky-300 text-[11px] mb-0.5">老严教官 (指挥中心)</div>
                  <p className="text-slate-200">收到谛听系统预警，抖音侧负面声浪有上升趋势，请属地排查通报草稿并下发网评引导指令！</p>
                </div>
              </div>

              <div className="flex gap-2 flex-row-reverse">
                <div className="w-8 h-8 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-black text-xs border border-white">卫</div>
                <div className="bg-[#2b2416] p-3 rounded-2xl border border-amber-400/60 max-w-[80%] text-right">
                  <div className="font-black text-amber-300 text-[11px] mb-0.5">守网卫士_01 (你)</div>
                  <p className="text-slate-100">收到！公文扫雷已更正完毕，正通过【指令流转系统】下发给宣传组！</p>
                </div>
              </div>
            </div>

            <div className="flex gap-2 pt-2 border-t border-slate-700">
              <input
                type="text"
                placeholder="发送加密信息..."
                className="flex-1 bg-[#121c33] border border-slate-700 rounded-xl px-3 py-2 text-white font-bold focus:outline-none focus:border-sky-400"
              />
              <button className="px-5 py-2 bg-gradient-to-r from-amber-400 to-yellow-300 text-slate-950 font-black rounded-xl hover:scale-105 transition-transform flex items-center gap-1 border border-white cursor-pointer">
                <Send className="w-3.5 h-3.5" /> 发送
              </button>
            </div>
          </div>
        )}

        {/* SYSTEM 5: 指令流转系统 (指挥流转) */}
        {activeSystem === 'zhihui' && (
          <div className="space-y-4 text-xs font-bold">
            <form onSubmit={handleAddCommand} className="flex gap-2 bg-[#0d1629] p-3.5 rounded-2xl border-2 border-sky-400/60 shadow">
              <input
                type="text"
                value={newCommandTitle}
                onChange={(e) => setNewCommandTitle(e.target.value)}
                placeholder="输入需下发的处置指令标题（如：请网络组跟进通报发布）..."
                className="flex-1 bg-[#121c33] border border-slate-700 rounded-xl px-3 py-2 text-white font-bold focus:outline-none focus:border-sky-400"
              />
              <button
                type="submit"
                className="px-5 py-2 bg-gradient-to-r from-sky-400 to-blue-500 text-slate-950 font-black rounded-xl hover:scale-105 transition-transform border border-white cursor-pointer shadow"
              >
                下发应急指令
              </button>
            </form>

            <div className="space-y-2">
              <div className="p-4 bg-[#0d1629] rounded-2xl border-2 border-sky-400/50 flex items-center justify-between shadow">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2.5 py-0.5 rounded-full bg-rose-500 text-white font-black text-[10px]">特急</span>
                    <span className="font-black text-white text-sm">指令#01：关于启动高新区火灾应急回应机制的通知</span>
                  </div>
                  <p className="text-slate-300">承办单位：网信办、新闻办、消防救援支队 | 响应时效：15分钟</p>
                </div>
                <span className="px-3 py-1 bg-emerald-400 text-slate-950 font-black rounded-xl shadow">
                  已接收处置中
                </span>
              </div>
            </div>
          </div>
        )}

        {/* SYSTEM 6: 网评系统 (认知兵团) */}
        {activeSystem === 'wangping' && (
          <div className="space-y-4">
            <div className="bg-[#0d1629] p-5 rounded-2xl border-2 border-sky-400/60 shadow">
              <h4 className="font-black text-white mb-2 text-sm">宣传员网评战术四维反击矩阵</h4>
              <p className="text-xs text-sky-200 font-bold mb-4">点击下方战术动作按钮，下发给各网评小分队执行疏导！</p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <button
                  onClick={() => onExecuteNetComment('like')}
                  className="p-3.5 rounded-2xl bg-[#182645] hover:bg-sky-600 border-2 border-sky-400/50 text-center transition-all cursor-pointer group shadow"
                >
                  <div className="w-10 h-10 rounded-2xl bg-[#0d1629] text-sky-300 flex items-center justify-center mx-auto mb-2 text-xl group-hover:scale-110 transition-transform">
                    👍
                  </div>
                  <div className="font-black text-xs text-white">1. 权威发布点赞</div>
                  <div className="text-[10px] text-sky-200 mt-0.5">拉高官方通报权重</div>
                </button>

                <button
                  onClick={() => onExecuteNetComment('forward')}
                  className="p-3.5 rounded-2xl bg-[#182645] hover:bg-amber-600 border-2 border-amber-400/50 text-center transition-all cursor-pointer group shadow"
                >
                  <div className="w-10 h-10 rounded-2xl bg-[#0d1629] text-amber-300 flex items-center justify-center mx-auto mb-2 text-xl group-hover:scale-110 transition-transform">
                    🔁
                  </div>
                  <div className="font-black text-xs text-white">2. 矩阵账号转发</div>
                  <div className="text-[10px] text-amber-200 mt-0.5">属地媒体统一转发</div>
                </button>

                <button
                  onClick={() => onExecuteNetComment('comment')}
                  className="p-3.5 rounded-2xl bg-[#182645] hover:bg-emerald-600 border-2 border-emerald-400/50 text-center transition-all cursor-pointer group shadow"
                >
                  <div className="w-10 h-10 rounded-2xl bg-[#0d1629] text-emerald-300 flex items-center justify-center mx-auto mb-2 text-xl group-hover:scale-110 transition-transform">
                    💬
                  </div>
                  <div className="font-black text-xs text-white">3. 理性评论引导</div>
                  <div className="text-[10px] text-emerald-200 mt-0.5">释疑澄清不信谣</div>
                </button>

                <button
                  onClick={() => onExecuteNetComment('report')}
                  className="p-3.5 rounded-2xl bg-[#182645] hover:bg-rose-600 border-2 border-rose-400/50 text-center transition-all cursor-pointer group shadow"
                >
                  <div className="w-10 h-10 rounded-2xl bg-[#0d1629] text-rose-300 flex items-center justify-center mx-auto mb-2 text-xl group-hover:scale-110 transition-transform">
                    🚨
                  </div>
                  <div className="font-black text-xs text-white">4. 恶意水军举报</div>
                  <div className="text-[10px] text-rose-200 mt-0.5">封禁造谣号源</div>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* SYSTEM 7: 全球眼 (境外天眼) */}
        {activeSystem === 'quanqiu' && (
          <div className="bg-[#0d1629] p-5 rounded-2xl border-2 border-slate-700 space-y-3 text-xs font-bold shadow">
            <div className="flex items-center justify-between">
              <span className="font-black text-white text-sm">境外社交平台倒灌源头跟踪 (Twitter / YouTube)</span>
              <span className="px-3 py-1 rounded-xl bg-emerald-400 text-slate-950 font-black">天眼防护中</span>
            </div>
            <p className="text-slate-300 leading-relaxed">已自动拦截 2 组境外政治炒作推文倒灌风险，源头图谱已同步归档。</p>
          </div>
        )}

        {/* SYSTEM 8: V8平台 (权限总控) */}
        {activeSystem === 'v8' && (
          <div className="bg-[#0d1629] p-5 rounded-2xl border-2 border-slate-700 space-y-3 text-xs font-bold shadow">
            <div className="flex items-center justify-between">
              <span className="font-black text-white text-sm">V8 平台单点登录与防伪证书总控</span>
              <span className="px-3 py-1 rounded-xl bg-amber-400 text-slate-950 font-black">已认证</span>
            </div>
            <p className="text-slate-300 leading-relaxed">用户ID: SYS_USER_0921 | 随关卡自动解锁更高级别武器指挥权！</p>
          </div>
        )}

      </div>
    </div>
  );
};
