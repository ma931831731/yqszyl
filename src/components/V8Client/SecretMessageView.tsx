import React, { useState } from 'react';
import { MessageSquareText, Send, ArrowLeft, ShieldCheck, Lock, User, Bot } from 'lucide-react';

interface SecretMessageViewProps {
  onReturnToLobby: () => void;
}

export const SecretMessageView: React.FC<SecretMessageViewProps> = ({ onReturnToLobby }) => {
  const [activeChannel, setActiveChannel] = useState<'laoyan' | 'net-admin' | 'press'>('laoyan');
  const [inputMsg, setInputMsg] = useState('');
  const [chatLogs, setChatLogs] = useState([
    { id: 'm1', sender: '老严教官 (指挥中心)', isSelf: false, text: '你好，守网卫士！谛听预警系统捕捉到园区火灾相关声量异常，请立即排查通报草稿并同步至微信群！' },
    { id: 'm2', sender: '守网卫士_01 (你)', isSelf: true, text: '收到！属地发文排错“公文扫雷”已处理完毕，正在进行网评引导。' }
  ]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMsg.trim()) return;
    setChatLogs([...chatLogs, { id: `m-${Date.now()}`, sender: '守网卫士_01 (你)', isSelf: true, text: inputMsg }]);
    setInputMsg('');
  };

  return (
    <div className="min-h-screen bg-[#050814] bg-cyber-grid text-slate-100 p-6 flex flex-col justify-between select-none">
      
      {/* Header */}
      <div className="max-w-6xl mx-auto w-full flex items-center justify-between mb-6">
        <button
          onClick={onReturnToLobby}
          className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-slate-300 font-bold text-xs rounded-xl border border-slate-800 flex items-center gap-2 transition-all"
        >
          <ArrowLeft className="w-4 h-4" /> 返回主大厅
        </button>

        <div className="text-center">
          <h1 className="text-2xl font-black font-cyber text-slate-100 flex items-center justify-center gap-2">
            <MessageSquareText className="w-6 h-6 text-emerald-400" />
            密级通信 · 点点密信聊天大厅
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">跨部门端到端加密沟通 | 舆情处置指挥快速对接通道</p>
        </div>

        <div className="w-28" />
      </div>

      {/* Main Chat Layout (1920*1080 Spacious) */}
      <div className="max-w-6xl mx-auto w-full flex-1 bg-slate-900/80 rounded-3xl border border-emerald-500/30 overflow-hidden flex shadow-2xl backdrop-blur-md my-auto h-[600px]">
        
        {/* Left Channel Sidebar */}
        <div className="w-72 bg-slate-950/80 border-r border-slate-800 p-4 space-y-2">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5 text-emerald-400" /> 加密通信频道
          </div>

          <button
            onClick={() => setActiveChannel('laoyan')}
            className={`w-full p-3 rounded-2xl text-left transition-all border ${
              activeChannel === 'laoyan'
                ? 'bg-emerald-950/60 text-emerald-300 border-emerald-500/40 glow-cyan'
                : 'bg-slate-900/50 text-slate-300 border-slate-850 hover:bg-slate-800'
            }`}
          >
            <div className="font-bold text-sm">老严教官 (指导中心)</div>
            <div className="text-[11px] text-slate-400 mt-1 truncate">收到！属地发文排错...</div>
          </button>

          <button
            onClick={() => setActiveChannel('net-admin')}
            className={`w-full p-3 rounded-2xl text-left transition-all border ${
              activeChannel === 'net-admin'
                ? 'bg-emerald-950/60 text-emerald-300 border-emerald-500/40 glow-cyan'
                : 'bg-slate-900/50 text-slate-300 border-slate-850 hover:bg-slate-800'
            }`}
          >
            <div className="font-bold text-sm">网信应急处置指挥群</div>
            <div className="text-[11px] text-slate-400 mt-1 truncate">属地媒体已就位</div>
          </button>
        </div>

        {/* Right Message Body */}
        <div className="flex-1 flex flex-col justify-between p-6 bg-slate-950/40">
          
          {/* Messages Feed */}
          <div className="space-y-4 overflow-y-auto pr-2 max-h-[460px]">
            {chatLogs.map((msg) => (
              <div key={msg.id} className={`flex gap-3 ${msg.isSelf ? 'flex-row-reverse' : ''}`}>
                <div className={`w-9 h-9 rounded-2xl flex items-center justify-center font-bold text-xs ${
                  msg.isSelf ? 'bg-cyan-500 text-slate-950' : 'bg-emerald-950 text-emerald-300 border border-emerald-500/40'
                }`}>
                  {msg.isSelf ? '卫' : '严'}
                </div>

                <div className={`p-4 rounded-2xl max-w-[75%] border text-xs leading-relaxed ${
                  msg.isSelf
                    ? 'bg-cyan-950/60 border-cyan-500/40 text-slate-100 text-right'
                    : 'bg-slate-900 border-slate-800 text-slate-200'
                }`}>
                  <div className="font-bold text-[10px] text-slate-400 mb-1">{msg.sender}</div>
                  <p>{msg.text}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Input Form */}
          <form onSubmit={handleSend} className="pt-4 border-t border-slate-800 flex gap-3">
            <input
              type="text"
              value={inputMsg}
              onChange={(e) => setInputMsg(e.target.value)}
              placeholder="输入加密密信指令发送至频道..."
              className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-xs text-slate-100 focus:outline-none focus:border-emerald-500"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl shadow-lg glow-cyan flex items-center gap-1.5 transition-all"
            >
              <Send className="w-4 h-4" /> 发送密信
            </button>
          </form>

        </div>

      </div>

    </div>
  );
};
