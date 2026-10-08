import React, { useState } from 'react';
import { User, Award, Trophy, ShieldCheck, Star, X, CheckCircle2, Flame, Lock, Share2, Sparkles } from 'lucide-react';
import { LevelIncidentCase, UserCertificate } from '../../types';

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  trustScore: number;
  levelCases: LevelIncidentCase[];
  certificates: UserCertificate[];
  totalScore: number;
}

export const UserProfileModal: React.FC<UserProfileModalProps> = ({
  isOpen,
  onClose,
  trustScore,
  levelCases,
  certificates,
  totalScore
}) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'certificates' | 'scores'>('profile');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4 animate-fadeIn select-none font-sans">
      <div className="relative w-full max-w-4xl bg-[#1b2b4b] border-4 border-sky-400 rounded-3xl shadow-2xl overflow-hidden text-slate-100">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-[#0d1629] border-2 border-sky-400 text-white font-black hover:bg-sky-500 flex items-center justify-center transition-all cursor-pointer shadow"
        >
          <X className="w-5 h-5" />
        </button>

        {/* User Card Top Profile Banner (yqyl.jfif Artwork Style) */}
        <div className="bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-700 p-6 flex flex-col md:flex-row items-center justify-between gap-4 border-b-2 border-white/20">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-400 to-yellow-300 border-2 border-white flex items-center justify-center font-black text-3xl text-slate-950 shadow-lg">
                👩‍💼
              </div>
              <div className="absolute -bottom-1 -right-1 px-2 py-0.5 rounded-full bg-slate-950 text-amber-300 font-black text-[10px] border border-amber-400 shadow">
                Lv.1
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-2xl font-black text-white drop-shadow">守网指挥官</h3>
                <span className="px-2.5 py-0.5 rounded-full bg-[#0d1629] text-sky-300 border border-sky-300/60 text-xs font-black">
                  ID: SYS_9821
                </span>
              </div>
              <p className="text-xs text-sky-100 font-bold mt-1">所属单位：省属地网信应急推演一队 | 职务：舆情处置专员</p>
            </div>
          </div>

          <div className="flex items-center gap-6 bg-[#0d1629] px-5 py-2.5 rounded-2xl border-2 border-sky-400/80 shadow">
            <div className="text-center">
              <div className="text-[10px] text-slate-400 font-bold">累计战力总积分</div>
              <div className="text-lg font-black font-num text-amber-300 drop-shadow">{totalScore.toLocaleString()} PTS</div>
            </div>
            <div className="h-6 w-px bg-slate-700" />
            <div className="text-center">
              <div className="text-[10px] text-slate-400 font-bold">已获得专属装备证书</div>
              <div className="text-lg font-black font-num text-emerald-300 drop-shadow">
                {certificates.filter(c => c.isLitUp).length} / {certificates.length} 本
              </div>
            </div>
          </div>
        </div>

        {/* Modal Navigation Tabs */}
        <div className="flex border-b-2 border-sky-400/40 text-xs text-center font-black bg-[#0d1629]">
          <button
            onClick={() => setActiveTab('profile')}
            className={`flex-1 py-3.5 transition-all cursor-pointer ${
              activeTab === 'profile' ? 'text-sky-300 border-b-4 border-sky-400 bg-[#182645]' : 'text-slate-300 hover:text-white'
            }`}
          >
            👤 个人信息与能力画像
          </button>
          <button
            onClick={() => setActiveTab('certificates')}
            className={`flex-1 py-3.5 transition-all cursor-pointer ${
              activeTab === 'certificates' ? 'text-amber-300 border-b-4 border-amber-400 bg-[#182645]' : 'text-slate-300 hover:text-white'
            }`}
          >
            📜 练兵场装备证书墙 ({certificates.filter(c => c.isLitUp).length} / {certificates.length})
          </button>
          <button
            onClick={() => setActiveTab('scores')}
            className={`flex-1 py-3.5 transition-all cursor-pointer ${
              activeTab === 'scores' ? 'text-yellow-300 border-b-4 border-yellow-400 bg-[#182645]' : 'text-slate-300 hover:text-white'
            }`}
          >
            ⭐ 演练场通关战力档案
          </button>
        </div>

        {/* Modal Content Area */}
        <div className="p-6 max-h-[480px] overflow-y-auto space-y-4 text-xs font-bold">
          
          {/* TAB 1: Profile */}
          {activeTab === 'profile' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-[#0d1629] rounded-2xl border-2 border-amber-400/60 shadow">
                  <div className="text-slate-400 mb-1">当前演练段位</div>
                  <div className="text-lg font-black text-amber-300 flex items-center gap-2">
                    <Flame className="w-5 h-5 text-amber-400" /> 白银 · 破浪大师
                  </div>
                  <p className="text-[10px] text-slate-400 mt-2">击败全省 95.4% 的参演干部</p>
                </div>

                <div className="p-4 bg-[#0d1629] rounded-2xl border-2 border-emerald-400/60 shadow">
                  <div className="text-slate-400 mb-1">公文扫雷排错率</div>
                  <div className="text-lg font-black text-emerald-300 font-num">100% 满分</div>
                  <p className="text-[10px] text-slate-400 mt-2">属地发文排错认证专家</p>
                </div>

                <div className="p-4 bg-[#0d1629] rounded-2xl border-2 border-sky-400/60 shadow">
                  <div className="text-slate-400 mb-1">来自练兵场积分</div>
                  <div className="text-lg font-black text-sky-300 font-num">已达 1,250 PTS</div>
                  <p className="text-[10px] text-slate-400 mt-2">直接赋能实战演练场战力结算</p>
                </div>
              </div>

              {/* Achievements Grid */}
              <h4 className="font-black text-white text-sm pt-2 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" /> 已获得趣味荣誉勋章
              </h4>
              <div className="grid grid-cols-3 gap-3">
                <div className="p-3 bg-[#0d1629] rounded-2xl border-2 border-amber-400 flex items-center gap-2">
                  <span className="text-2xl">⚡</span>
                  <div>
                    <div className="font-black text-amber-300">火眼金睛排雷手</div>
                    <div className="text-[10px] text-slate-400">属地公文扫雷零失误</div>
                  </div>
                </div>

                <div className="p-3 bg-[#0d1629] rounded-2xl border-2 border-sky-400 flex items-center gap-2">
                  <span className="text-2xl">🎯</span>
                  <div>
                    <div className="font-black text-sky-300">一眼假识破者</div>
                    <div className="text-[10px] text-slate-400">全网搜精准打标</div>
                  </div>
                </div>

                <div className="p-3 bg-[#0d1629] rounded-2xl border-2 border-purple-400 flex items-center gap-2">
                  <span className="text-2xl">🛡️</span>
                  <div>
                    <div className="font-black text-purple-300">水军粉碎机</div>
                    <div className="text-[10px] text-slate-400">网评系统成功反击</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Lit-Up Certificates (8 Practice Camp Equipment Certificates) */}
          {activeTab === 'certificates' && (
            <div className="space-y-4">
              <p className="text-sky-200">在练兵场中完成各应用功能装备的学习升级，即可颁发并点亮专属装备证书！</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {certificates.map(cert => (
                  <div
                    key={cert.id}
                    className={`p-4 rounded-2xl border-2 transition-all ${
                      cert.isLitUp
                        ? 'bg-[#182645] border-amber-400 shadow-lg'
                        : 'bg-[#0d1629] border-slate-700 opacity-60'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Award className={`w-5 h-5 ${cert.isLitUp ? 'text-amber-400' : 'text-slate-500'}`} />
                        <span className={`font-black text-sm ${cert.isLitUp ? 'text-white' : 'text-slate-400'}`}>
                          {cert.name}
                        </span>
                      </div>
                      {cert.isLitUp ? (
                        <span className="px-2.5 py-0.5 rounded-full bg-amber-400 text-slate-950 font-black text-[10px] shadow">
                          ★ 已获得
                        </span>
                      ) : (
                        <span className="px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-400 text-[10px] flex items-center gap-1 border border-slate-700">
                          <Lock className="w-3 h-3" /> 练兵营待升级
                        </span>
                      )}
                    </div>

                    <p className="text-slate-300 text-xs mb-3 font-medium leading-relaxed">{cert.description}</p>

                    <div className="flex items-center justify-between text-[11px] pt-2 border-t border-slate-700 text-slate-400">
                      <span>防伪编号: {cert.code}</span>
                      <span className="text-amber-300 font-black">折算 {cert.creditHours} 学时</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: Level Scores History */}
          {activeTab === 'scores' && (
            <div className="space-y-3">
              <div className="grid grid-cols-1 gap-3">
                {levelCases.map(item => (
                  <div
                    key={item.id}
                    className={`p-3.5 rounded-2xl border-2 flex items-center justify-between ${
                      item.isPassed
                        ? 'bg-[#182645] border-cyan-400 shadow-md'
                        : item.isUnlocked
                        ? 'bg-[#0d1629] border-amber-400'
                        : 'bg-[#0d1629] border-slate-800 opacity-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-black text-sm font-num border border-white shadow ${
                        item.isPassed ? 'bg-sky-400 text-slate-950' : 'bg-slate-700 text-slate-300'
                      }`}>
                        {item.id}
                      </div>
                      <div>
                        <div className="font-black text-white text-sm">演练场 {item.id}：{item.title} ({item.subtitle})</div>
                        <div className="text-[11px] text-sky-200">类别: {item.category}</div>
                      </div>
                    </div>

                    <div className="text-right">
                      {item.isPassed ? (
                        <div>
                          <span className="font-num font-black text-amber-300 text-base">{item.bestScore} PTS</span>
                          <span className="ml-2 px-2 py-0.5 rounded-full bg-emerald-400 text-slate-950 font-black text-[10px]">
                            {item.bestGrade}
                          </span>
                        </div>
                      ) : item.isUnlocked ? (
                        <span className="text-amber-300 font-black">待挑战</span>
                      ) : (
                        <span className="text-slate-500 flex items-center gap-1 justify-end font-medium">
                          <Lock className="w-3.5 h-3.5" /> 需通关前一演练场
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-[#0d1629] border-t-2 border-sky-400/40 text-right">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-gradient-to-r from-sky-400 to-blue-500 hover:from-sky-300 hover:to-blue-400 text-slate-950 font-black text-xs rounded-xl shadow cursor-pointer border-2 border-white"
          >
            确定
          </button>
        </div>

      </div>
    </div>
  );
};
