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
    <div className="min-h-screen bg-[#09152b] text-slate-100 p-4 md:p-6 flex flex-col justify-between select-none font-sans relative z-10">
      
      {/* 2D Cartoon Header Bar (yqyl.jfif Style) */}
      <div className="max-w-6xl mx-auto w-full flex items-center justify-between mb-6 bg-[#1b2b4b] p-5 rounded-3xl border-4 border-sky-400 shadow-2xl">
        <button
          onClick={onReturnToLobby}
          className="px-4 py-2 bg-[#0d1629] hover:bg-sky-600 text-white font-black text-xs rounded-2xl border-2 border-sky-400 flex items-center gap-2 transition-transform hover:scale-105 cursor-pointer shadow"
        >
          <ArrowLeft className="w-4 h-4" /> 返回主大厅
        </button>

        <div className="text-center">
          <h1 className="text-2xl md:text-3xl font-black text-white flex items-center justify-center gap-2 drop-shadow">
            <MessageSquareText className="w-7 h-7 text-emerald-400" />
            密级通信 · 点点密信聊天大厅
          </h1>
          <p className="text-xs text-sky-100 font-bold mt-1">
            跨部门端到端加密沟通 | 舆情处置指挥快速对接通道
          </p>
        </div>

        <div className="w-28" />
      </div>

      {/* Main Chat Layout (2D RPG Style) */}
      <div className="max-w-6xl mx-auto w-full flex-1 bg-[#1b2b4b] rounded-3xl border-4 border-sky-400 overflow-hidden flex shadow-2xl my-auto h-[600px]">
        
        {/* Left Channel Sidebar */}
        <div className="w-72 bg-[#0d1629] border-r-2 border-sky-400/40 p-4 space-y-3">
          <div className="text-xs font-black text-amber-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <Lock className="w-4 h-4 text-emerald-400" /> 加密通信频道
          </div>

          <button
            onClick={() => setActiveChannel('laoyan')}
            className={`w-full p-3.5 rounded-2xl text-left transition-all border-2 cursor-pointer ${
              activeChannel === 'laoyan'
                ? 'bg-[#182645] text-white border-amber-400 shadow-md'
                : 'bg-[#121c33] text-slate-300 border-slate-700 hover:border-slate-500'
            }`}
          >
            <div className="font-black text-sm text-sky-300">老严教官 (指导中心)</div>
            <div className="text-[11px] text-slate-300 font-bold mt-1 truncate">收到！属地发文排错...</div>
          </button>

          <button
            onClick={() => setActiveChannel('net-admin')}
            className={`w-full p-3.5 rounded-2xl text-left transition-all border-2 cursor-pointer ${
              activeChannel === 'net-admin'
                ? 'bg-[#182645] text-white border-amber-400 shadow-md'
                : 'bg-[#121c33] text-slate-300 border-slate-700 hover:border-slate-500'
            }`}
          >
            <div className="font-black text-sm text-sky-300">网信应急处置指挥群</div>
            <div className="text-[11px] text-slate-300 font-bold mt-1 truncate">属地媒体已就位</div>
          </button>
        </div>

        {/* Right Message Body */}
        <div className="flex-1 flex flex-col justify-between p-6 bg-[#121c33]">
          
          {/* Messages Feed */}
          <div className="space-y-4 overflow-y-auto pr-2 max-h-[460px]">
            {chatLogs.map((msg) => (
              <div key={msg.id} className={`flex gap-3 ${msg.isSelf ? 'flex-row-reverse' : ''}`}>
                <div className={`w-10 h-10 rounded-2xl flex items-center justify-center font-black text-xs border-2 border-white shadow ${
                  msg.isSelf ? 'bg-amber-400 text-slate-950' : 'bg-sky-400 text-slate-950'
                }`}>
                  {msg.isSelf ? '卫' : '严'}
                </div>

                <div className={`p-4 rounded-2xl max-w-[75%] border-2 text-xs leading-relaxed font-bold shadow-md ${
                  msg.isSelf
                    ? 'bg-[#182645] border-amber-400 text-white text-right'
                    : 'bg-[#0d1629] border-sky-400/50 text-slate-100'
                }`}>
                  <div className="font-black text-[10px] text-amber-300 mb-1">{msg.sender}</div>
                  <p>{msg.text}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Input Form */}
          <form onSubmit={handleSend} className="pt-4 border-t-2 border-sky-400/40 flex gap-3">
            <input
              type="text"
              value={inputMsg}
              onChange={(e) => setInputMsg(e.target.value)}
              placeholder="输入加密密信指令发送至频道..."
              className="flex-1 bg-[#0d1629] border-2 border-slate-700 focus:border-sky-400 rounded-2xl px-4 py-3 text-xs text-white font-bold focus:outline-none"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-gradient-to-r from-amber-400 to-yellow-300 hover:from-amber-300 hover:to-yellow-200 text-slate-950 font-black text-xs rounded-2xl shadow-lg border-2 border-white flex items-center gap-1.5 cursor-pointer transition-transform hover:scale-105"
            >
              <Send className="w-4 h-4" /> 发送密信
            </button>
          </form>

        </div>

      </div>

    </div>
  );
};

