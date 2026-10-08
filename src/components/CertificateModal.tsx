import React from 'react';
import { Award, ShieldCheck, Download, Share2, X, CheckCircle2, QrCode } from 'lucide-react';

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  trustScore: number;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({ isOpen, onClose, trustScore }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4 animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-[#0d1326] border-2 border-emerald-500/40 rounded-3xl shadow-2xl overflow-hidden glow-cyan">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Certificate Card Content */}
        <div className="p-8 text-center space-y-6 relative">
          
          {/* Background Decorative Seals */}
          <div className="absolute top-6 left-6 opacity-10">
            <Award className="w-32 h-32 text-emerald-400" />
          </div>

          {/* Certificate Header */}
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950 text-emerald-300 text-xs font-bold border border-emerald-500/30">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              V8 平台官方权威认证证书
            </div>

            <h2 className="text-2xl md:text-3xl font-extrabold font-cyber tracking-widest text-emerald-300 pt-2">
              全域舆情应急推演能力认证证书
            </h2>

            <p className="text-[11px] text-slate-400 font-mono">证书编号：V8-2026-YUQING-84917</p>
          </div>

          {/* Body Statement */}
          <div className="bg-slate-950/60 p-6 rounded-2xl border border-emerald-500/20 text-xs leading-relaxed text-slate-200 text-left space-y-3">
            <p>
              兹证明演练学员 <span className="font-bold text-amber-300 underline font-sans text-sm">守网卫士_01</span> (隶属于网信属地应急作战团队)，
              在《风暴中枢：全域舆情应急作战推演系统》实战考核中表现优异：
            </p>

            <ul className="space-y-1.5 text-slate-300 pl-4 list-disc">
              <li>熟练掌握【谛听预警】、【全网搜】、【属地管理】等 8 大软件装备操作；</li>
              <li>在【公文扫雷】环节达成 100% 排错准确率；</li>
              <li>官方公信力考核留存达 <span className="text-emerald-400 font-bold font-num text-sm">{trustScore} / 100</span> 分。</li>
            </ul>

            <div className="p-2.5 bg-emerald-950/40 rounded-xl border border-emerald-500/30 text-[11px] text-emerald-200 flex items-center justify-between">
              <span>学时认领说明：本证书防伪校验通过，可冲抵 2026 年度干部业务培训 4 学时。</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            </div>
          </div>

          {/* Footer Seals & Signature */}
          <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400">
                <QrCode className="w-8 h-8 text-emerald-400" />
              </div>
              <div className="text-left text-[10px] text-slate-400">
                <div>扫码校验电子真伪</div>
                <div className="text-slate-500">签发机构：V8 应急总控中心</div>
              </div>
            </div>

            {/* Simulated Official Red Stamp */}
            <div className="relative border-2 border-rose-500 text-rose-500 font-bold px-3 py-1.5 rounded-full rotate-[-12deg] text-xs opacity-90 shadow-glow">
              ★ V8平台认证专用章 ★
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-center gap-3 pt-2">
            <button
              onClick={onClose}
              className="px-5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl transition-all"
            >
              关闭
            </button>

            <button className="px-5 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-extrabold rounded-xl shadow-lg glow-cyan flex items-center gap-1.5 transition-all">
              <Share2 className="w-3.5 h-3.5" /> 生成朋友圈长图
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
