import React, { useState } from 'react';
import { 
  Radar, Search, Building2, MessageSquareText, FileText, Users, Globe, ShieldCheck, 
  CheckCircle2, AlertTriangle, Play, RefreshCw, Filter, Sparkles, Send, Flame, Award, Tag
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
    <div className="flex flex-col h-full bg-slate-900/60 rounded-2xl border border-cyan-500/20 backdrop-blur-md overflow-hidden shadow-2xl">
      
      {/* 8 Systems Equipment Navigation Bar */}
      <div className="bg-slate-950/80 border-b border-cyan-500/20 p-2 overflow-x-auto">
        <div className="flex items-center gap-1.5 min-w-max">
          {systems.map((sys) => {
            const isActive = activeSystem === sys.id;
            return (
              <button
                key={sys.id}
                onClick={() => sys.unlocked && setActiveSystem(sys.id)}
                disabled={!sys.unlocked}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold transition-all relative ${
                  isActive
                    ? 'bg-gradient-to-r from-cyan-500/30 to-blue-600/30 text-cyan-300 border border-cyan-400/60 glow-cyan'
                    : sys.unlocked
                    ? 'bg-slate-900/60 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-800'
                    : 'bg-slate-950/40 text-slate-600 border border-slate-900 cursor-not-allowed opacity-60'
                }`}
              >
                <div className={`p-1 rounded-lg ${isActive ? 'bg-cyan-400/20 text-cyan-300' : 'bg-slate-800 text-slate-400'}`}>
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
                    <span className="font-bold">{sys.name}</span>
                    {!sys.unlocked && (
                      <span className="text-[9px] px-1 bg-slate-800 text-slate-500 rounded">🔒 {sys.unlockedAtLevel}关解锁</span>
                    )}
                  </div>
                  <div className="text-[10px] text-slate-400 font-mono">{sys.actualSystem}</div>
                </div>

                {isActive && (
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-1 bg-cyan-400 rounded-full shadow-glow" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Workspace Display */}
      <div className="flex-1 p-4 overflow-y-auto">
        
        {/* System Overview Banner */}
        <div className="mb-4 bg-slate-950/60 p-3 rounded-xl border border-slate-800 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-cyan-300">{currentSysInfo?.name} ({currentSysInfo?.actualSystem})</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-400 border border-cyan-800">
                {currentSysInfo?.codeName}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">{currentSysInfo?.desc}</p>
          </div>

          <div className="hidden sm:block text-right text-xs">
            <span className="text-slate-500">实战操作玩法：</span>
            <span className="text-cyan-400 font-medium">{currentSysInfo?.gamePlayDesc}</span>
          </div>
        </div>

        {/* SYSTEM 1: 谛听预警系统 (全域雷达) */}
        {activeSystem === 'diting' && (
          <div className="space-y-4">
            {/* Live Chart Placeholder / SVG Canvas Simulation */}
            <div className="bg-slate-950/80 p-4 rounded-xl border border-cyan-500/30">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Radar className="w-5 h-5 text-cyan-400 animate-spin" style={{ animationDuration: '8s' }} />
                  <span className="text-sm font-bold text-slate-200">24小时全网舆情走势雷达曲线 (实时监测)</span>
                </div>
                <button
                  onClick={() => setReportGenerated(true)}
                  className="px-3 py-1.5 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 text-xs font-semibold rounded-lg border border-cyan-400/40 flex items-center gap-1.5 transition-all"
                >
                  <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
                  生成全生命周期简报
                </button>
              </div>

              {/* Simulated SVG Graph */}
              <div className="h-44 w-full bg-slate-900/60 rounded-lg p-2 relative overflow-hidden flex items-end">
                <svg className="w-full h-full overflow-visible" viewBox="0 0 500 150">
                  <defs>
                    <linearGradient id="gradCyan" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#00f2fe" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#00f2fe" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  {/* Grid Lines */}
                  <line x1="0" y1="30" x2="500" y2="30" stroke="#1e293b" strokeDasharray="3 3" />
                  <line x1="0" y1="75" x2="500" y2="75" stroke="#1e293b" strokeDasharray="3 3" />
                  <line x1="0" y1="120" x2="500" y2="120" stroke="#1e293b" strokeDasharray="3 3" />

                  {/* Curve Path */}
                  <path
                    d="M0,130 Q70,120 120,90 T240,30 T360,80 T500,105 L500,150 L0,150 Z"
                    fill="url(#gradCyan)"
                  />
                  <path
                    d="M0,130 Q70,120 120,90 T240,30 T360,80 T500,105"
                    fill="none"
                    stroke="#00f2fe"
                    strokeWidth="3"
                  />
                  {/* Peak Marker */}
                  <circle cx="240" cy="30" r="5" fill="#ef4444" className="animate-ping" />
                  <circle cx="240" cy="30" r="5" fill="#ef4444" />
                  <text x="250" y="25" fill="#ef4444" fontSize="12" fontWeight="bold">传播峰值 840/分</text>
                </svg>
              </div>
            </div>

            {reportGenerated && (
              <div className="bg-emerald-950/40 border border-emerald-500/40 p-3.5 rounded-xl text-xs text-emerald-200 animate-fadeIn">
                <div className="flex items-center gap-2 font-bold text-emerald-400 mb-1">
                  <CheckCircle2 className="w-4 h-4" /> 自动生成《高新区园区火灾舆情全生命周期简报.pdf》
                </div>
                <p className="text-slate-300">
                  发现时间：21:02 | 核心扩散源：抖音短视频 | 建议处置行动：发布权威事故抢险通报，引导公众勿信谣传谣。
                </p>
              </div>
            )}
          </div>
        )}

        {/* SYSTEM 2: 全网搜 (全网探针) */}
        {activeSystem === 'quanwang' && (
          <div className="space-y-3 text-xs">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-200">全网信息精准抓取与标签归档</span>
              <span className="text-slate-400">已打标记录: {taggedPosts.length} / 3 篇</span>
            </div>

            <div className="space-y-2">
              {[
                { id: 'p1', author: '都市新闻爆料', content: '【突发】高新区厂房火灾现场浓烟滚滚，有网民称救援设备不足？', tag: '造谣风险帖' },
                { id: 'p2', author: '现场目击者小张', content: '刚刚路过现场，消防车已经到了，希望大家保持冷静，别乱传播未经证实的照片！', tag: '正向现场帖' },
                { id: 'p3', author: '网络搬运工', content: '听说这次火灾是因为违规操作导致的？求解释！', tag: '待核实疑点' },
              ].map((item) => (
                <div key={item.id} className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-bold text-cyan-300">{item.author}</span>
                      <span className="px-1.5 py-0.5 bg-slate-800 text-slate-400 rounded text-[10px]">{item.tag}</span>
                    </div>
                    <p className="text-slate-300">{item.content}</p>
                  </div>

                  <button
                    onClick={() => handleToggleTag(item.id)}
                    className={`px-3 py-1.5 rounded-lg font-medium flex items-center gap-1 transition-all ${
                      taggedPosts.includes(item.id)
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                        : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
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
            <div className="bg-amber-950/30 border border-amber-500/30 p-3 rounded-xl flex items-center justify-between text-xs text-amber-200">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />
                <div>
                  <span className="font-bold">【公文扫雷实战玩法】</span>
                  <span>请审查下方草拟通报，点击红框标注的错别字或职务错误进行一键更正！</span>
                </div>
              </div>
              <span className="font-mono font-bold text-sm text-amber-400">
                待排查: {documentErrors.filter(e => !e.isFixed).length} / {documentErrors.length}
              </span>
            </div>

            {/* Public Announcement Interactive Redlining Document */}
            <div className="bg-slate-950 p-5 rounded-xl border border-cyan-500/30 font-serif leading-relaxed text-sm text-slate-200 relative">
              <h3 className="text-center font-bold text-lg mb-3 text-cyan-300 tracking-wide font-sans">
                关于高新区工业园突发火情抢险处置情况的通报
              </h3>

              <p className="mb-3 indent-8">
                2026年10月5日19时30分，高新区工业园一处仓库发生火情。接到报警后，
                <span className="inline-block relative border-b-2 border-rose-500 bg-rose-950/50 px-1 py-0.5 rounded cursor-pointer hover:bg-rose-900/60"
                      onClick={() => onFixDocumentError('err1')} title="点击一键扫雷修正">
                  {documentErrors.find(e => e.id === 'err1')?.isFixed ? (
                    <span className="text-emerald-400 font-bold font-sans">应急救援指挥长 张伟</span>
                  ) : (
                    <span className="text-rose-400 font-bold font-sans">应急救援指挥长 张伟大 ⚠️(错字)</span>
                  )}
                </span>
                立即带队赶赴现场，组织公安、消防及医疗救援力量开展抢险救援。
              </p>

              <p className="mb-3 indent-8">
                截至目前，现场火势已得到有效控制，事故造成
                <span className="inline-block relative border-b-2 border-rose-500 bg-rose-950/50 px-1 py-0.5 rounded cursor-pointer hover:bg-rose-900/60"
                      onClick={() => onFixDocumentError('err2')} title="点击一键扫雷修正">
                  {documentErrors.find(e => e.id === 'err2')?.isFixed ? (
                    <span className="text-emerald-400 font-bold font-sans">无人员伤亡</span>
                  ) : (
                    <span className="text-rose-400 font-bold font-sans">无人员伤伤亡 ⚠️(重字)</span>
                  )}
                </span>
                。起火原因正在深入调查中。
              </p>

              <div className="mt-6 text-right font-sans text-xs text-slate-400">
                <p>高新区应急处置指挥部</p>
                <p>2026年10月5日</p>
              </div>
            </div>
          </div>
        )}

        {/* SYSTEM 4: 点点密信 (密级通信) */}
        {activeSystem === 'diandian' && (
          <div className="bg-slate-950 rounded-xl border border-slate-800 p-4 space-y-3 text-xs">
            <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
              <MessageSquareText className="w-4 h-4 text-cyan-400" />
              <span className="font-bold text-slate-200">【加密指挥群】高新区应急演练实时协同群</span>
            </div>

            <div className="space-y-2.5 h-48 overflow-y-auto pr-1">
              <div className="flex gap-2">
                <div className="w-7 h-7 rounded-full bg-cyan-900 flex items-center justify-center font-bold text-cyan-300">教</div>
                <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800 max-w-[80%]">
                  <div className="font-bold text-cyan-400 text-[11px] mb-0.5">老严教官 (指挥中心)</div>
                  <p className="text-slate-200">收到谛听系统预警，抖音侧负面声浪有上升趋势，请属地排查通报草稿并下发网评引导指令！</p>
                </div>
              </div>

              <div className="flex gap-2 flex-row-reverse">
                <div className="w-7 h-7 rounded-full bg-amber-900 flex items-center justify-center font-bold text-amber-300">卫</div>
                <div className="bg-cyan-950/60 p-2.5 rounded-xl border border-cyan-500/30 max-w-[80%] text-right">
                  <div className="font-bold text-amber-400 text-[11px] mb-0.5">守网卫士_01 (你)</div>
                  <p className="text-slate-200">收到！公文扫雷已更正完毕，正通过【指令流转系统】下发给宣传组！</p>
                </div>
              </div>
            </div>

            <div className="flex gap-2 pt-2 border-t border-slate-800">
              <input
                type="text"
                placeholder="发送加密信息..."
                className="flex-1 bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-slate-200 focus:outline-none focus:border-cyan-500"
              />
              <button className="px-4 py-1.5 bg-cyan-500 text-slate-950 font-bold rounded-lg hover:bg-cyan-400 transition-all flex items-center gap-1">
                <Send className="w-3.5 h-3.5" /> 发送
              </button>
            </div>
          </div>
        )}

        {/* SYSTEM 5: 指令流转系统 (指挥流转) */}
        {activeSystem === 'zhihui' && (
          <div className="space-y-4 text-xs">
            <form onSubmit={handleAddCommand} className="flex gap-2 bg-slate-950 p-3 rounded-xl border border-slate-800">
              <input
                type="text"
                value={newCommandTitle}
                onChange={(e) => setNewCommandTitle(e.target.value)}
                placeholder="输入需下发的处置指令标题（如：请网络组跟进通报发布）..."
                className="flex-1 bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-cyan-500"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold rounded-lg hover:brightness-110 transition-all"
              >
                下发应急指令
              </button>
            </form>

            <div className="space-y-2">
              <div className="p-3 bg-slate-950 rounded-xl border border-cyan-500/30 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2 py-0.5 rounded bg-rose-950 text-rose-300 font-bold text-[10px]">特急</span>
                    <span className="font-bold text-slate-200">指令#01：关于启动高新区火灾应急回应机制的通知</span>
                  </div>
                  <p className="text-slate-400">承办单位：网信办、新闻办、消防救援支队 | 响应时效：15分钟</p>
                </div>
                <span className="px-2 py-1 bg-emerald-950 text-emerald-300 border border-emerald-500/30 rounded font-medium">
                  已接收处置中
                </span>
              </div>
            </div>
          </div>
        )}

        {/* SYSTEM 6: 网评系统 (认知兵团) */}
        {activeSystem === 'wangping' && (
          <div className="space-y-4">
            <div className="bg-slate-950 p-4 rounded-xl border border-cyan-500/30">
              <h4 className="font-bold text-slate-200 mb-2 text-xs">宣传员网评战术四维反击矩阵</h4>
              <p className="text-xs text-slate-400 mb-4">点击下方战术动作按钮，下发给各网评小分队执行疏导！</p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <button
                  onClick={() => onExecuteNetComment('like')}
                  className="p-3 rounded-xl bg-slate-900 hover:bg-cyan-950/60 border border-slate-800 hover:border-cyan-500/40 text-center transition-all group"
                >
                  <div className="w-8 h-8 rounded-full bg-cyan-500/10 text-cyan-400 flex items-center justify-center mx-auto mb-1.5 group-hover:scale-110 transition-transform">
                    👍
                  </div>
                  <div className="font-bold text-xs text-slate-200">1. 权威发布点赞</div>
                  <div className="text-[10px] text-slate-400">拉高官方通报权重</div>
                </button>

                <button
                  onClick={() => onExecuteNetComment('forward')}
                  className="p-3 rounded-xl bg-slate-900 hover:bg-cyan-950/60 border border-slate-800 hover:border-cyan-500/40 text-center transition-all group"
                >
                  <div className="w-8 h-8 rounded-full bg-amber-500/10 text-amber-400 flex items-center justify-center mx-auto mb-1.5 group-hover:scale-110 transition-transform">
                    🔁
                  </div>
                  <div className="font-bold text-xs text-slate-200">2. 矩阵账号转发</div>
                  <div className="text-[10px] text-slate-400">属地媒体统一转发</div>
                </button>

                <button
                  onClick={() => onExecuteNetComment('comment')}
                  className="p-3 rounded-xl bg-slate-900 hover:bg-cyan-950/60 border border-slate-800 hover:border-cyan-500/40 text-center transition-all group"
                >
                  <div className="w-8 h-8 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center mx-auto mb-1.5 group-hover:scale-110 transition-transform">
                    💬
                  </div>
                  <div className="font-bold text-xs text-slate-200">3. 理性评论引导</div>
                  <div className="text-[10px] text-slate-400">释疑澄清不信谣</div>
                </button>

                <button
                  onClick={() => onExecuteNetComment('report')}
                  className="p-3 rounded-xl bg-slate-900 hover:bg-rose-950/60 border border-slate-800 hover:border-rose-500/40 text-center transition-all group"
                >
                  <div className="w-8 h-8 rounded-full bg-rose-500/10 text-rose-400 flex items-center justify-center mx-auto mb-1.5 group-hover:scale-110 transition-transform">
                    🚨
                  </div>
                  <div className="font-bold text-xs text-slate-200">4. 恶意水军举报</div>
                  <div className="text-[10px] text-slate-400">封禁造谣号源</div>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* SYSTEM 7: 全球眼 (境外天眼) */}
        {activeSystem === 'quanqiu' && (
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3 text-xs">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-200">境外社交平台倒灌源头跟踪 (Twitter / YouTube)</span>
              <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300">天眼防护中</span>
            </div>
            <p className="text-slate-400">已自动拦截 2 组境外政治炒作推文倒灌风险。</p>
          </div>
        )}

        {/* SYSTEM 8: V8平台 (权限总控) */}
        {activeSystem === 'v8' && (
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3 text-xs">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-200">V8 平台单点登录与防伪证书总控</span>
              <span className="text-cyan-400 font-bold">已认证</span>
            </div>
            <p className="text-slate-400">用户ID: SYS_USER_0921 | 随关卡自动解锁更高级别武器指挥权！</p>
          </div>
        )}

      </div>
    </div>
  );
};
