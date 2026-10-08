import React, { useState, useEffect } from 'react';
import { Smartphone, ThumbsUp, MessageSquare, AlertCircle, Share2, Flame, Bot, ShieldCheck, Heart } from 'lucide-react';
import { CommentItem } from '../types';

interface MobileStreamViewProps {
  comments: CommentItem[];
  onPickComment?: (comment: CommentItem) => void;
  lastActionMessage?: string | null;
  trustScore: number;
}

export const MobileStreamView: React.FC<MobileStreamViewProps> = ({
  comments,
  onPickComment,
  lastActionMessage,
  trustScore
}) => {
  const [activeTab, setActiveTab] = useState<'comments' | 'hot-search'>('comments');
  const [timeStr, setTimeStr] = useState('21:10');

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setTimeStr(`${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full flex flex-col items-center">
      {/* Smartphone Outer Shell */}
      <div className="w-full max-w-[340px] bg-slate-950 border-[6px] border-slate-800 rounded-[36px] shadow-2xl p-2.5 relative overflow-hidden glow-cyan">
        
        {/* Notch / Speaker Bar */}
        <div className="absolute top-3 left-1/2 -translate-x-1/2 w-28 h-4 bg-slate-900 rounded-full z-20 flex items-center justify-center gap-1.5 border border-slate-800">
          <div className="w-2.5 h-2.5 bg-slate-800 rounded-full" />
          <div className="w-10 h-1 bg-slate-800 rounded-full" />
        </div>

        {/* Screen Content Container */}
        <div className="bg-[#0b1120] text-slate-100 rounded-[28px] h-[610px] flex flex-col pt-5 overflow-hidden relative">
          
          {/* Mobile Top Status Bar */}
          <div className="flex justify-between items-center px-4 text-[10px] text-slate-400 font-mono select-none">
            <span>{timeStr}</span>
            <div className="flex items-center gap-1">
              <span className="text-[9px] px-1 bg-cyan-950 text-cyan-400 rounded">5G</span>
              <span>100%</span>
            </div>
          </div>

          {/* Social Media App Header */}
          <div className="bg-slate-900/90 border-b border-slate-800 px-3 py-2 flex items-center justify-between mt-1">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-pink-500 to-amber-400 flex items-center justify-center text-xs font-bold text-white">
                博
              </div>
              <span className="text-xs font-bold text-slate-200">全网实时舆情流 (AI视窗)</span>
            </div>
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
            </span>
          </div>

          {/* App Category Tabs */}
          <div className="flex border-b border-slate-800 text-xs text-center font-medium bg-slate-950/50">
            <button
              onClick={() => setActiveTab('comments')}
              className={`flex-1 py-2 relative transition-all ${
                activeTab === 'comments' ? 'text-cyan-400 font-bold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              网民评论声浪 ({comments.length})
              {activeTab === 'comments' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-cyan-400" />
              )}
            </button>

            <button
              onClick={() => setActiveTab('hot-search')}
              className={`flex-1 py-2 relative transition-all ${
                activeTab === 'hot-search' ? 'text-cyan-400 font-bold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              实时热搜榜 🔥
              {activeTab === 'hot-search' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-cyan-400" />
              )}
            </button>
          </div>

          {/* Dynamic AI Alert Feedback Banner */}
          {lastActionMessage && (
            <div className="bg-cyan-950/90 border-y border-cyan-500/40 px-3 py-1.5 text-[11px] text-cyan-300 flex items-center gap-2 animate-fadeIn">
              <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0" />
              <span className="line-clamp-1">{lastActionMessage}</span>
            </div>
          )}

          {/* Comments List View */}
          {activeTab === 'comments' ? (
            <div className="flex-1 overflow-y-auto p-2.5 space-y-2.5 text-xs">
              {comments.map((item) => (
                <div
                  key={item.id}
                  onClick={() => onPickComment && onPickComment(item)}
                  className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
                    item.sentiment === 'negative'
                      ? 'bg-rose-950/20 border-rose-500/30 hover:border-rose-400'
                      : item.sentiment === 'positive'
                      ? 'bg-emerald-950/20 border-emerald-500/30 hover:border-emerald-400'
                      : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-1.5">
                      <div className="w-5 h-5 rounded-full bg-slate-700 flex items-center justify-center text-[10px] font-bold text-cyan-300">
                        {item.avatar}
                      </div>
                      <span className="font-semibold text-slate-200 text-[11px]">{item.username}</span>
                      <span className="text-[9px] px-1 rounded bg-slate-800 text-slate-400">{item.platform}</span>
                    </div>
                    <span className="text-[10px] text-slate-500">{item.timeAgo}</span>
                  </div>

                  <p className="text-slate-300 text-[11px] leading-relaxed mb-2">{item.content}</p>

                  <div className="flex items-center justify-between text-[10px] text-slate-400 border-t border-slate-800/60 pt-1.5">
                    <span className={`px-1.5 py-0.5 rounded text-[9px] font-medium ${
                      item.sentiment === 'negative'
                        ? 'bg-rose-900/40 text-rose-300'
                        : item.sentiment === 'positive'
                        ? 'bg-emerald-900/40 text-emerald-300'
                        : 'bg-slate-800 text-slate-300'
                    }`}>
                      {item.sentiment === 'negative' ? '⚠️ 情绪挑刺' : item.sentiment === 'positive' ? '👍 引导转正' : '😐 中立观望'}
                    </span>
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-0.5 hover:text-rose-400">
                        <Heart className="w-3 h-3" /> {item.likes}
                      </span>
                      <span className="flex items-center gap-0.5 hover:text-cyan-400">
                        <MessageSquare className="w-3 h-3" /> 打标
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Hot Search List View */
            <div className="flex-1 overflow-y-auto p-3 space-y-2 text-xs">
              <div className="flex items-center justify-between p-2 rounded-lg bg-rose-950/30 border border-rose-500/30">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-rose-400 text-sm">1</span>
                  <span className="text-slate-200 font-medium">#高新区工业园突发火灾#</span>
                </div>
                <span className="px-1.5 py-0.5 bg-rose-600 text-white rounded text-[10px] font-bold">爆 98万</span>
              </div>

              <div className="flex items-center justify-between p-2 rounded-lg bg-amber-950/20 border border-amber-500/20">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-amber-400 text-sm">2</span>
                  <span className="text-slate-200 font-medium">#属地官方通报排错争议#</span>
                </div>
                <span className="px-1.5 py-0.5 bg-amber-600 text-white rounded text-[10px] font-bold">热 74万</span>
              </div>

              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-900/50 border border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-400 text-sm">3</span>
                  <span className="text-slate-300">#应急救援人员已赶赴现场#</span>
                </div>
                <span className="text-[10px] text-slate-400">42万</span>
              </div>

              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-900/50 border border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-400 text-sm">4</span>
                  <span className="text-slate-300">#谛听雷达捕捉全网扩散点#</span>
                </div>
                <span className="text-[10px] text-slate-400">29万</span>
              </div>
            </div>
          )}

          {/* AI Coach Assistant Floating Bar */}
          <div className="p-2.5 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-[11px]">
            <div className="flex items-center gap-1.5 text-cyan-300 font-medium">
              <Bot className="w-4 h-4 text-cyan-400 animate-bounce" />
              <span>AI教官: 关注公文排错与评论疏导</span>
            </div>
            <span className="text-[10px] text-slate-500">双视角实时拟真</span>
          </div>

        </div>
      </div>
    </div>
  );
};
