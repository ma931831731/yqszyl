import React, { useState } from 'react';
import { User, Award, Trophy, ShieldCheck, Star, X, CheckCircle2, Flame, Lock, Share2 } from 'lucide-react';
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4 animate-fadeIn select-none">
      <div className="relative w-full max-w-4xl bg-[#090e24] border-2 border-cyan-500/40 rounded-3xl shadow-2xl overflow-hidden glow-cyan">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* User Card Top Profile Banner */}
        <div className="bg-gradient-to-r from-cyan-950/80 via-slate-900 to-indigo-950/80 p-6 border-b border-cyan-500/30 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center font-black text-2xl text-slate-950 glow-cyan">
                卫
              </div>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-amber-500 text-slate-950 font-bold text-[10px] flex items-center justify-center border-2 border-slate-950">
                白银
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold font-cyber text-slate-100">守网卫士_01</h3>
                <span className="px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/40 text-xs font-mono">
                  ID: SYS_9821
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1">所属单位：省属地网信应急推演一队 | 职务：舆情处置专员</p>
            </div>
          </div>

          <div className="flex items-center gap-6 bg-slate-950/80 px-5 py-2.5 rounded-2xl border border-slate-800">
            <div className="text-center">
              <div className="text-[10px] text-slate-500">累计推演战力</div>
              <div className="text-lg font-bold font-num text-amber-400">{totalScore.toLocaleString()} PTS</div>
            </div>
            <div className="h-6 w-px bg-slate-800" />
            <div className="text-center">
              <div className="text-[10px] text-slate-500">已点亮权威证书</div>
              <div className="text-lg font-bold font-num text-emerald-400">
                {certificates.filter(c => c.isLitUp).length} / {certificates.length} 本
              </div>
            </div>
          </div>
        </div>

        {/* Modal Navigation Tabs */}
        <div className="flex border-b border-slate-800 text-xs text-center font-bold bg-slate-950">
          <button
            onClick={() => setActiveTab('profile')}
            className={`flex-1 py-3 transition-all ${
              activeTab === 'profile' ? 'text-cyan-400 border-b-2 border-cyan-400 bg-cyan-950/20' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            👤 个人信息与能力画像
          </button>
          <button
            onClick={() => setActiveTab('certificates')}
            className={`flex-1 py-3 transition-all ${
              activeTab === 'certificates' ? 'text-emerald-400 border-b-2 border-emerald-400 bg-emerald-950/20' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            📜 已点亮防伪证书墙 ({certificates.filter(c => c.isLitUp).length})
          </button>
          <button
            onClick={() => setActiveTab('scores')}
            className={`flex-1 py-3 transition-all ${
              activeTab === 'scores' ? 'text-amber-400 border-b-2 border-amber-400 bg-amber-950/20' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            ⭐ 每一关卡得分档案
          </button>
        </div>

        {/* Modal Content Area */}
        <div className="p-6 max-h-[480px] overflow-y-auto space-y-4 text-xs">
          
          {/* TAB 1: Profile */}
          {activeTab === 'profile' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800">
                  <div className="text-slate-400 mb-1">当前演练段位</div>
                  <div className="text-lg font-bold text-amber-300 font-cyber flex items-center gap-2">
                    <Flame className="w-5 h-5 text-amber-400" /> 白银 · 破浪大师
                  </div>
                  <p className="text-[10px] text-slate-500 mt-2">击败全省 95.4% 的参演干部</p>
                </div>

                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800">
                  <div className="text-slate-400 mb-1">公文扫雷准确率</div>
                  <div className="text-lg font-bold text-emerald-400 font-num">100% (揪出所有错别字)</div>
                  <p className="text-[10px] text-slate-500 mt-2">属地发文排错专家</p>
                </div>

                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800">
                  <div className="text-slate-400 mb-1">建议针对性加练</div>
                  <div className="text-sm font-bold text-cyan-300">【指令流转系统】</div>
                  <p className="text-[10px] text-slate-500 mt-2">建议前往靶场练习指令快速催办</p>
                </div>
              </div>

              {/* Achievements Grid */}
              <h4 className="font-bold text-slate-200 text-sm pt-2">🎖️ 已获得趣味勋章墙</h4>
              <div className="grid grid-cols-3 gap-3">
                <div className="p-3 bg-slate-950 rounded-xl border border-amber-500/30 flex items-center gap-2">
                  <span className="text-xl">排</span>
                  <div>
                    <div className="font-bold text-amber-300">火眼金睛排雷手</div>
                    <div className="text-[10px] text-slate-500">属地公文扫雷零失误</div>
                  </div>
                </div>

                <div className="p-3 bg-slate-950 rounded-xl border border-cyan-500/30 flex items-center gap-2">
                  <span className="text-xl">假</span>
                  <div>
                    <div className="font-bold text-cyan-300">一眼假识破者</div>
                    <div className="text-[10px] text-slate-500">全网搜精准打标</div>
                  </div>
                </div>

                <div className="p-3 bg-slate-950 rounded-xl border border-purple-500/30 flex items-center gap-2">
                  <span className="text-xl">水</span>
                  <div>
                    <div className="font-bold text-purple-300">水军粉碎机</div>
                    <div className="text-[10px] text-slate-500">网评系统成功反击</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Lit-Up Certificates */}
          {activeTab === 'certificates' && (
            <div className="space-y-3">
              <p className="text-slate-400">通关各案例关卡并达到合格分数后，可自动**点亮**V8平台官方认证防伪证书，冲抵继续教育学时。</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {certificates.map(cert => (
                  <div
                    key={cert.id}
                    className={`p-4 rounded-2xl border transition-all ${
                      cert.isLitUp
                        ? 'bg-slate-950 border-emerald-500/50 glow-cyan'
                        : 'bg-slate-950/40 border-slate-900 opacity-60'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Award className={`w-5 h-5 ${cert.isLitUp ? 'text-emerald-400' : 'text-slate-600'}`} />
                        <span className={`font-bold text-sm ${cert.isLitUp ? 'text-emerald-300' : 'text-slate-500'}`}>
                          {cert.name}
                        </span>
                      </div>
                      {cert.isLitUp ? (
                        <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-500/40 font-bold text-[10px]">
                          ★ 已点亮
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded bg-slate-900 text-slate-500 text-[10px]">
                          🔒 需完成第{cert.levelRequired}关
                        </span>
                      )}
                    </div>

                    <p className="text-slate-400 text-xs mb-3">{cert.description}</p>

                    <div className="flex items-center justify-between text-[11px] pt-2 border-t border-slate-900 text-slate-500">
                      <span>防伪编号: {cert.code}</span>
                      <span className="text-emerald-400 font-bold">可折算 {cert.creditHours} 学时</span>
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
                    className={`p-3.5 rounded-xl border flex items-center justify-between ${
                      item.isPassed
                        ? 'bg-slate-950 border-cyan-500/30'
                        : item.isUnlocked
                        ? 'bg-slate-950/80 border-slate-800'
                        : 'bg-slate-950/30 border-slate-900 opacity-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm font-num ${
                        item.isPassed ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/40' : 'bg-slate-800 text-slate-500'
                      }`}>
                        第{item.id}关
                      </div>
                      <div>
                        <div className="font-bold text-slate-200 text-sm">{item.title} ({item.subtitle})</div>
                        <div className="text-[11px] text-slate-400">对应案例类别: {item.category}</div>
                      </div>
                    </div>

                    <div className="text-right">
                      {item.isPassed ? (
                        <div>
                          <span className="font-num font-bold text-amber-400 text-base">{item.bestScore} 分</span>
                          <span className="ml-2 px-1.5 py-0.5 rounded bg-amber-950 text-amber-300 font-bold text-[10px]">
                            {item.bestGrade}
                          </span>
                        </div>
                      ) : item.isUnlocked ? (
                        <span className="text-cyan-400 font-bold">已解锁 · 待挑战</span>
                      ) : (
                        <span className="text-slate-600 flex items-center gap-1 justify-end">
                          <Lock className="w-3.5 h-3.5" /> 未解锁
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
        <div className="p-4 bg-slate-950 border-t border-slate-800 text-right">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs rounded-xl transition-all"
          >
            确定
          </button>
        </div>

      </div>
    </div>
  );
};
