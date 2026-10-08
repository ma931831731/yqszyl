import React, { useState } from 'react';
import { 
  Target, CheckCircle2, ShieldAlert, Award, Zap, ArrowLeft, ArrowRight, Sparkles, 
  Radar, Search, Building2, MessageSquareText, FileText, Users, Globe, ShieldCheck, Trophy
} from 'lucide-react';
import { SystemId, UserCertificate } from '../types';

interface TargetPracticeViewProps {
  onReturnToBattle: () => void;
  certificates?: UserCertificate[];
  onUnlockCertificate?: (certId: string) => void;
  onAddEquipmentScore?: (points: number) => void;
}

interface CampItem {
  id: SystemId;
  name: string;
  codeName: string;
  actualSystem: string;
  badgeColor: string;
  borderColor: string;
  icon: React.ReactNode;
  desc: string;
  exerciseTitle: string;
  certName: string;
  certId: string;
  level: number; // Current upgraded level 1~3
  score: number;
}

export const TargetPracticeView: React.FC<TargetPracticeViewProps> = ({ 
  onReturnToBattle,
  certificates,
  onUnlockCertificate,
  onAddEquipmentScore
}) => {
  // Selected camp ID (null means camp list view)
  const [selectedCampId, setSelectedCampId] = useState<SystemId | null>(null);

  // Camp progress states
  const [campLevels, setCampLevels] = useState<Record<SystemId, { level: number; score: number; completed: boolean }>>({
    shudi: { level: 2, score: 200, completed: true },
    diting: { level: 1, score: 150, completed: true },
    quanwang: { level: 1, score: 100, completed: false },
    diandian: { level: 1, score: 100, completed: false },
    zhihui: { level: 1, score: 100, completed: false },
    wangping: { level: 1, score: 1, completed: false },
    quanqiu: { level: 1, score: 0, completed: false },
    v8: { level: 1, score: 100, completed: true }
  });

  const [activeTabSub, setActiveTabSub] = useState<'task' | 'cert'>('task');
  const [justAwardedCert, setJustAwardedCert] = useState<string | null>(null);

  // 8 Practice Camps Configuration
  const camps: CampItem[] = [
    {
      id: 'shudi',
      name: '属地中枢扫雷练兵营',
      codeName: '公文扫雷排错装备',
      actualSystem: '属地管理系统',
      badgeColor: 'bg-amber-400 text-slate-950',
      borderColor: 'border-amber-400',
      icon: <Building2 className="w-6 h-6" />,
      desc: '专精属地公文错别字与领导职务排查扫雷，提高属地通报公信力。',
      exerciseTitle: '【属地抢险救灾通报公文扫雷排错】',
      certName: '《属地公文扫雷与发文排错认证证书》',
      certId: 'cert1',
      level: campLevels.shudi.level,
      score: campLevels.shudi.score
    },
    {
      id: 'diting',
      name: '谛听全域雷达练兵营',
      codeName: '全域监测预警装备',
      actualSystem: '谛听预警系统',
      badgeColor: 'bg-emerald-400 text-slate-950',
      borderColor: 'border-emerald-400',
      icon: <Radar className="w-6 h-6" />,
      desc: '专精 24 小时全网声量走势捕捉与阈值校准，自动生成全生命周期简报。',
      exerciseTitle: '【24小时声量峰值雷达校准与简报】',
      certName: '《全域舆情雷达监测与预警专家证书》',
      certId: 'cert2',
      level: campLevels.diting.level,
      score: campLevels.diting.score
    },
    {
      id: 'quanwang',
      name: '全网搜探针打标练兵营',
      codeName: '探针精准打标装备',
      actualSystem: '全网搜',
      badgeColor: 'bg-sky-400 text-slate-950',
      borderColor: 'border-sky-400',
      icon: <Search className="w-6 h-6" />,
      desc: '海量帖文中秒级抓取造谣源头，打上分类标签归档证据链。',
      exerciseTitle: '【帖文分类打标与证据链精准打捞】',
      certName: '《全网探针打标与证据打捞证书》',
      certId: 'cert_quanwang',
      level: campLevels.quanwang.level,
      score: campLevels.quanwang.score
    },
    {
      id: 'diandian',
      name: '点点密信通信练兵营',
      codeName: '加密协同调度装备',
      actualSystem: '点点密信',
      badgeColor: 'bg-cyan-400 text-slate-950',
      borderColor: 'border-cyan-400',
      icon: <MessageSquareText className="w-6 h-6" />,
      desc: '跨部门加密即时通信，剧情式人机即时剧情剧情指令派发。',
      exerciseTitle: '【跨部门多群加密调度即时推演】',
      certName: '《多部门加密通信与指令闭环认证证书》',
      certId: 'cert3',
      level: campLevels.diandian.level,
      score: campLevels.diandian.score
    },
    {
      id: 'zhihui',
      name: '指令流转调度练兵营',
      codeName: '应急公文流转装备',
      actualSystem: '指令流转系统',
      badgeColor: 'bg-blue-400 text-slate-950',
      borderColor: 'border-blue-400',
      icon: <FileText className="w-6 h-6" />,
      desc: '规范化下发、接收、处置及反馈，考核黄金时效签批闭环。',
      exerciseTitle: '【应急指令快速催办与反馈流转】',
      certName: '《应急处置指令流转闭环能力证书》',
      certId: 'cert_zhihui',
      level: campLevels.zhihui.level,
      score: campLevels.zhihui.score
    },
    {
      id: 'wangping',
      name: '网评兵团战术练兵营',
      codeName: '认知四维对抗装备',
      actualSystem: '网评系统',
      badgeColor: 'bg-purple-400 text-slate-950',
      borderColor: 'border-purple-400',
      icon: <Users className="w-6 h-6" />,
      desc: '指挥宣传员兵团执行“赞/转/评/报”四维战术，反击网络水军。',
      exerciseTitle: '【四维战术矩阵疏导与水军对抗】',
      certName: '《网评战术矩阵对抗能力证书》',
      certId: 'cert_wangping',
      level: campLevels.wangping.level,
      score: campLevels.wangping.score
    },
    {
      id: 'quanqiu',
      name: '境外天眼防范练兵营',
      codeName: '境外源头阻断装备',
      actualSystem: '全球眼',
      badgeColor: 'bg-rose-400 text-slate-950',
      borderColor: 'border-rose-400',
      icon: <Globe className="w-6 h-6" />,
      desc: '监控 Twitter/YouTube 平台推文，防范化解境外涉我炒作倒灌。',
      exerciseTitle: '【境外倒灌推文图谱分析与源头阻断】',
      certName: '《境外源头阻断与天眼防范证书》',
      certId: 'cert_quanqiu',
      level: campLevels.quanqiu.level,
      score: campLevels.quanqiu.score
    },
    {
      id: 'v8',
      name: 'V8 权限总控练兵营',
      codeName: '权限SSO单点登录装备',
      actualSystem: 'V8 平台',
      badgeColor: 'bg-yellow-400 text-slate-950',
      borderColor: 'border-yellow-400',
      icon: <ShieldCheck className="w-6 h-6" />,
      desc: '机构/人员单点登录与防伪证书总控，随等级解锁高阶特种装备。',
      exerciseTitle: '【防伪证书总控与SSO单点鉴权】',
      certName: '《全域舆情应急推演通关防伪总证书》',
      certId: 'cert4',
      level: campLevels.v8.level,
      score: campLevels.v8.score
    }
  ];

  const currentCamp = camps.find(c => c.id === selectedCampId);

  // Complete exercise in selected camp
  const handleCompleteCampExercise = (campId: SystemId) => {
    const targetCamp = camps.find(c => c.id === campId);
    if (!targetCamp) return;

    setCampLevels(prev => ({
      ...prev,
      [campId]: {
        level: Math.min(3, prev[campId].level + 1),
        score: prev[campId].score + 100,
        completed: true
      }
    }));

    if (onAddEquipmentScore) {
      onAddEquipmentScore(100);
    }

    if (onUnlockCertificate) {
      onUnlockCertificate(targetCamp.certId);
    }

    setJustAwardedCert(targetCamp.certName);
  };

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6 space-y-6 select-none font-sans relative z-10">
      
      {/* 2D Cartoon RPG Header Bar (100% yqyl.jfif Artwork Style) */}
      <div className="bg-[#1b2b4b] p-5 md:p-6 rounded-3xl border-4 border-sky-400 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-2xl">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-amber-400 border-2 border-white flex items-center justify-center text-slate-950 shadow-lg">
            <Target className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-black text-white flex items-center gap-2 tracking-wide drop-shadow">
              练 兵 场 <span className="text-xs px-3 py-1 rounded-full bg-amber-400 text-slate-950 font-black">8 大应用装备特训营</span>
            </h2>
            <p className="text-xs text-sky-100 font-bold mt-1 max-w-xl">
              在此选择不同练兵营学习升级应用功能装备！每升级一个装备都会自动颁发专属证书，积累的装备积分直接用于实战案例战力结算。
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {selectedCampId && (
            <button
              onClick={() => { setSelectedCampId(null); setJustAwardedCert(null); }}
              className="px-4 py-2 bg-[#0d1629] hover:bg-sky-600 text-white font-black text-xs rounded-2xl border-2 border-sky-400 flex items-center gap-1.5 transition-transform hover:scale-105 cursor-pointer shadow"
            >
              <ArrowLeft className="w-4 h-4" /> 选择其他练兵营
            </button>
          )}

          <button
            onClick={onReturnToBattle}
            className="px-5 py-2.5 bg-gradient-to-r from-amber-400 to-yellow-300 hover:from-amber-300 hover:to-yellow-200 text-slate-950 font-black text-xs rounded-2xl shadow-lg flex items-center gap-2 transition-transform hover:scale-105 cursor-pointer border-2 border-white"
          >
            <span>返回主大厅 ➔</span>
          </button>
        </div>
      </div>

      {/* VIEW A: MULTIPLE PRACTICE CAMPS SELECTION GRID (多个练兵营的选择) */}
      {!selectedCampId ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between bg-[#121c33] p-3.5 rounded-2xl border-2 border-sky-400/60 text-xs text-slate-100 font-bold shadow">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>练兵积分提升提示：选择下方任意练兵营完成特训，提升装备等级 (Lv.1 ➔ Lv.3) 并点亮专属证书！</span>
            </div>
            <span className="px-3 py-1 bg-amber-400 text-slate-950 text-xs font-black rounded-xl shadow">
              已积累装备总积分: {Object.values(campLevels).reduce((acc, curr) => acc + curr.score, 0)} PTS
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {camps.map((camp) => (
              <div
                key={camp.id}
                onClick={() => setSelectedCampId(camp.id)}
                className={`group p-5 rounded-3xl border-4 ${camp.borderColor} bg-gradient-to-b from-[#1b2b4b] to-[#121c33] hover:border-white hover:scale-[1.03] transition-all cursor-pointer shadow-2xl flex flex-col justify-between space-y-4 relative overflow-hidden`}
              >
                <div>
                  {/* Top Badge & Level Row */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-2xl bg-[#0d1629] border-2 border-white flex items-center justify-center text-sky-300 shadow">
                      {camp.icon}
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-black shadow ${camp.badgeColor}`}>
                      装备 Lv.{camp.level}
                    </span>
                  </div>

                  <h3 className="text-xl font-black text-white group-hover:text-amber-300 transition-colors drop-shadow">
                    {camp.name}
                  </h3>
                  <div className="text-xs font-bold text-sky-300 mt-1 mb-2">【{camp.codeName}】</div>

                  <p className="text-xs text-slate-200 font-bold leading-relaxed line-clamp-2">
                    {camp.desc}
                  </p>
                </div>

                {/* Certificate Awarded Preview */}
                <div className="pt-3 border-t border-sky-400/30 space-y-2">
                  <div className="flex items-center justify-between text-[11px] text-amber-300 font-black">
                    <span className="flex items-center gap-1">
                      <Award className="w-3.5 h-3.5" /> 专属技能证书
                    </span>
                    <span>+{camp.score} PTS</span>
                  </div>

                  <button className="w-full py-2 bg-gradient-to-r from-sky-400 to-blue-500 hover:from-sky-300 hover:to-blue-400 text-slate-950 font-black text-xs rounded-xl shadow transition-transform group-hover:scale-105 border border-white">
                    进入本营特训 ➔
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* VIEW B: INSIDE SPECIFIC PRACTICE CAMP INTERACTIVE EXERCISE */
        currentCamp && (
          <div className="space-y-6">
            
            {/* Camp Detail Banner */}
            <div className={`p-6 rounded-3xl border-4 ${currentCamp.borderColor} bg-gradient-to-r from-[#1b2b4b] to-[#121c33] shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6`}>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-[#0d1629] border-3 border-white flex items-center justify-center text-sky-300 shadow-xl">
                  {currentCamp.icon}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-2xl font-black text-white drop-shadow">{currentCamp.name}</h3>
                    <span className={`px-3 py-0.5 rounded-full text-xs font-black ${currentCamp.badgeColor}`}>
                      当前装备等级: Lv.{currentCamp.level}
                    </span>
                  </div>
                  <div className="text-xs text-sky-200 font-bold mt-1">
                    系统对应: {currentCamp.actualSystem} | 装备名称: {currentCamp.codeName}
                  </div>
                </div>
              </div>

              <div className="bg-[#0d1629] p-4 rounded-2xl border-2 border-sky-400/50 text-right min-w-[220px]">
                <div className="text-xs text-slate-400 font-bold">练兵场积累装备战力分</div>
                <div className="text-2xl font-black font-num text-amber-300 drop-shadow">
                  +{currentCamp.score} PTS
                </div>
              </div>
            </div>

            {/* Interactive Learning Exercise Content */}
            <div className="bg-[#1b2b4b] p-6 rounded-3xl border-4 border-sky-400 shadow-2xl space-y-5">
              <div className="flex items-center justify-between border-b border-sky-400/40 pb-4">
                <h3 className="font-black text-white text-xl flex items-center gap-2">
                  <Zap className="w-6 h-6 text-amber-400" /> {currentCamp.exerciseTitle}
                </h3>
                <span className="text-xs text-sky-200 bg-[#0d1629] px-3 py-1 rounded-xl border border-sky-400/40 font-bold">
                  解谜难度: 基础特训
                </span>
              </div>

              {/* CAMP 1: 属地公文扫雷 */}
              {currentCamp.id === 'shudi' && (
                <div className="space-y-4">
                  <p className="text-xs text-sky-200 font-bold">请点击下方草拟官方通报中的高危错别字，完成装备技能升级并打卡领证：</p>
                  <div className="p-4 bg-[#0d1629] rounded-2xl border-2 border-slate-700 text-xs leading-relaxed text-slate-100 font-bold">
                    高新区突发火情救援处置指挥部，已调集消防车辆 20 辆救援。在现场指挥处置的
                    <span className="px-2 py-0.5 bg-rose-500 text-white rounded-lg font-black mx-1 cursor-pointer">
                      市应急局主作 (⚠️应为: 主任)
                    </span>
                    指示全员搜救，确保
                    <span className="px-2 py-0.5 bg-rose-500 text-white rounded-lg font-black mx-1 cursor-pointer">
                      无人员伤伤亡 (⚠️重字)
                    </span>
                    。
                  </div>
                </div>
              )}

              {/* CAMP 2: 谛听全域雷达 */}
              {currentCamp.id === 'diting' && (
                <div className="space-y-4">
                  <p className="text-xs text-sky-200 font-bold">校准全网 24 小时舆情走势雷达，设定声量峰值告警阈值：</p>
                  <div className="p-4 bg-[#0d1629] rounded-2xl border-2 border-slate-700 text-xs text-emerald-300 font-bold flex items-center justify-between">
                    <span>设置告警阈值: 500 条/分 | 当前监测声量: 840 条/分</span>
                    <span className="px-3 py-1 bg-emerald-500 text-slate-950 rounded-xl font-black">雷达精准捕捉</span>
                  </div>
                </div>
              )}

              {/* OTHER CAMPS DEFAULT INTERACTIVE */}
              {currentCamp.id !== 'shudi' && currentCamp.id !== 'diting' && (
                <div className="p-4 bg-[#0d1629] rounded-2xl border-2 border-slate-700 text-xs text-slate-100 font-bold space-y-2">
                  <div className="text-amber-300 font-black">【{currentCamp.name}特训要点】</div>
                  <p className="text-slate-300 leading-relaxed">{currentCamp.desc}</p>
                </div>
              )}

              {/* Action & Certificate Issuance Button */}
              <div className="pt-4 border-t border-sky-400/40 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-xs text-amber-300 font-bold">
                  <Trophy className="w-5 h-5 text-amber-400" />
                  <span>完成本营特训可自动颁发/点亮：<strong className="text-white">{currentCamp.certName}</strong></span>
                </div>

                <button
                  onClick={() => handleCompleteCampExercise(currentCamp.id)}
                  className="px-6 py-3 bg-gradient-to-r from-amber-400 to-yellow-300 hover:from-amber-300 hover:to-yellow-200 text-slate-950 font-black text-xs rounded-2xl shadow-xl hover:scale-105 transition-transform flex items-center gap-2 cursor-pointer border-2 border-white"
                >
                  <CheckCircle2 className="w-5 h-5 text-slate-950" />
                  <span>完成本营练兵 ➔ 升级装备并颁发证书</span>
                </button>
              </div>

              {/* Awarded Certificate Success Card Popup */}
              {justAwardedCert && (
                <div className="p-4 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl text-slate-950 font-black text-xs flex items-center justify-between shadow-2xl animate-fadeIn border-2 border-white">
                  <div className="flex items-center gap-3">
                    <Award className="w-8 h-8 text-slate-950 shrink-0" />
                    <div>
                      <div className="text-base text-slate-950 font-black">🎉 恭喜获得专属装备证书！</div>
                      <div className="text-slate-900 font-extrabold">{justAwardedCert} 已计入个人证书展柜！</div>
                    </div>
                  </div>
                  <span className="px-3 py-1.5 bg-slate-950 text-amber-300 rounded-xl text-xs font-black shadow">
                    装备完成度 +100 PTS
                  </span>
                </div>
              )}
            </div>

          </div>
        )
      )}

    </div>
  );
};

