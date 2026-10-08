import React, { useState } from 'react';
import { PortalSelection } from './components/PortalSelection';
import { V8Lobby } from './components/V8Client/V8Lobby';
import { LevelSelectionView } from './components/V8Client/LevelSelectionView';
import { TargetPracticeView } from './components/TargetPracticeView';
import { BattlefieldView } from './components/BattlefieldView';
import { SecretMessageView } from './components/V8Client/SecretMessageView';
import { UserProfileModal } from './components/V8Client/UserProfileModal';
import { MTAdminView } from './components/MTAdmin/MTAdminView';
import { GrowthBaseView } from './components/CocosGrowth/GrowthBaseView';
import { SettlementModal } from './components/SettlementModal';
import { LeaderboardModal } from './components/LeaderboardModal';
import { LevelIncidentCase, UserCertificate, SystemEquipment, DocumentErrorItem, CommentItem } from './types';

export const App: React.FC = () => {
  // Navigation View State
  const [viewMode, setViewMode] = useState<
    'portal' | 'cocos-base' | 'v8-lobby' | 'v8-level-select' | 'v8-battlefield' | 'v8-practice' | 'v8-secret-chat' | 'mt-admin'
  >('portal');

  // Game Progression States
  const [isPracticeCompleted, setIsPracticeCompleted] = useState<boolean>(false);
  const [activeLevelId, setActiveLevelId] = useState<number>(1);
  const [totalScore, setTotalScore] = useState<number>(12850);
  const [trustScore, setTrustScore] = useState<number>(94);
  const [lastActionMessage, setLastActionMessage] = useState<string | null>(null);

  // Modals
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSettlementOpen, setIsSettlementOpen] = useState(false);
  const [isLeaderboardOpen, setIsLeaderboardOpen] = useState(false);


  // 6 Real Incident Cases Progression Map
  const [levelCases, setLevelCases] = useState<LevelIncidentCase[]>([
    {
      id: 1,
      title: '顺藤摸瓜',
      subtitle: '自媒体碰瓷博主爆料维权案例',
      category: '自媒体维权与属地发文',
      difficulty: '简单',
      difficultyColor: 'emerald',
      discoveryDesc: '谛听与全网搜捕捉到自媒体号“都市爆料王”发布的针对高新区的质疑贴。',
      propagationDesc: '小范围同城博主转发，尚未形成全网大规模热搜爆破。',
      trackingDesc: '追踪首发博主真实身份与证据链打捞。',
      disposalDesc: '发布首发属地澄清通报，进行公文错别字扫雷排错。',
      unlockedSystems: ['quanwang', 'shudi', 'v8'],
      isUnlocked: true,
      isPassed: true,
      bestScore: 98,
      bestGrade: 'S+',
      stars: 3
    },
    {
      id: 2,
      title: '雷达警报',
      subtitle: '高新区工业园突发火灾救援推演',
      category: '生产安全突发救援事故',
      difficulty: '中等',
      difficultyColor: 'sky',
      discoveryDesc: '工业园仓库突发火情，网民现场拍摄浓烟视频上传抖音爆料。',
      propagationDesc: '短视频平台声量短时间激增，负面声量峰值达 840 条/分。',
      trackingDesc: '谛听预警系统全天候雷达监控趋势，捕捉倒灌节点。',
      disposalDesc: '规范下发应急响应指令，属地通报排错，引导网评氛围。',
      unlockedSystems: ['diting', 'quanwang', 'shudi', 'v8'],
      isUnlocked: true,
      isPassed: true,
      bestScore: 95,
      bestGrade: 'S',
      stars: 3
    },
    {
      id: 3,
      title: '密令如山',
      subtitle: '汛期强降雨防汛救援多部门协同',
      category: '自然灾害与多部门协同',
      difficulty: '中等',
      difficultyColor: 'amber',
      discoveryDesc: '气象预警降雨超历史极值，局部暴雨积水引发市民微信群热议。',
      propagationDesc: '跨部门调度需求高，需快速通过加密密信下发抢险指示。',
      trackingDesc: '指令流转系统实时跟踪各承办单位签批与反馈闭环。',
      disposalDesc: '点点密信多群推送，指挥流转闭环耗时考核。',
      unlockedSystems: ['diting', 'quanwang', 'shudi', 'diandian', 'zhihui', 'v8'],
      isUnlocked: true,
      isPassed: false,
      bestScore: null,
      bestGrade: null,
      stars: 0
    },
    {
      id: 4,
      title: '逆流突围',
      subtitle: '热门景区文旅宰客次生舆情反击',
      category: '消费维权与网评战术反击',
      difficulty: '较难',
      difficultyColor: 'rose',
      discoveryDesc: '游客发布“景区天价餐饮”维权视频，水军号恶意带节奏抹黑形象。',
      propagationDesc: '微博/小红书双榜热搜，水军组织群体性评论挑刺。',
      trackingDesc: '全网探针定向打标水军号源，全球眼排查是否有境外联动。',
      disposalDesc: '网评系统执行“赞/转/评/报”四维战术矩阵反击，肃清网络水军。',
      unlockedSystems: ['diting', 'quanwang', 'shudi', 'diandian', 'zhihui', 'wangping', 'v8'],
      isUnlocked: false,
      isPassed: false,
      bestScore: null,
      bestGrade: null,
      stars: 0
    },
    {
      id: 5,
      title: '暗度陈仓',
      subtitle: '境外黑客推文炒作舆情倒灌',
      category: '涉外舆情与倒灌防范',
      difficulty: '高',
      difficultyColor: 'purple',
      discoveryDesc: 'Twitter / YouTube 上境外账号捏造涉我省政策谣言并向境内倒灌。',
      propagationDesc: '境内自媒体号搬运翻译，形成内外交织复杂炒作。',
      trackingDesc: '全球眼深度挖掘境外传播源头推文与账号图谱。',
      disposalDesc: '境外天眼源头阻断，谛听系统精准追踪境内扩散链条。',
      unlockedSystems: ['diting', 'quanwang', 'shudi', 'diandian', 'zhihui', 'wangping', 'quanqiu', 'v8'],
      isUnlocked: false,
      isPassed: false,
      bestScore: null,
      bestGrade: null,
      stars: 0
    },
    {
      id: 6,
      title: '惊涛骇浪',
      subtitle: '重特大复合型公信力危机综合考查',
      category: '复合型重特大危机',
      difficulty: '王者',
      difficultyColor: 'purple',
      discoveryDesc: '谣言、事故、水军与境外反动势力多点同时发难的极端情况。',
      propagationDesc: '全网传播峰值突破极限，各属地账号频繁触发预警。',
      trackingDesc: '8 大系统全开，考验指挥官全局调度与全生命周期推演战术。',
      disposalDesc: '8 大装备全矩阵高强度联动，防范化解重大意识形态风险。',
      unlockedSystems: ['diting', 'quanwang', 'shudi', 'diandian', 'zhihui', 'wangping', 'quanqiu', 'v8'],
      isUnlocked: false,
      isPassed: false,
      bestScore: null,
      bestGrade: null,
      stars: 0
    }
  ]);

  // Certificates Collection (8 Equipment Certificates from Practice Camps)
  const [certificates, setCertificates] = useState<UserCertificate[]>([
    {
      id: 'cert1',
      name: '属地公文扫雷与发文排错认证证书',
      code: 'V8-2026-SHUDI-9841',
      isLitUp: true,
      levelRequired: 1,
      minScoreRequired: 90,
      description: '证明学员已掌握属地管理系统公文发文前错别字与职务排查“扫雷”能力。',
      creditHours: 2
    },
    {
      id: 'cert2',
      name: '全域舆情雷达监测与预警专家证书',
      code: 'V8-2026-DITING-8491',
      isLitUp: true,
      levelRequired: 2,
      minScoreRequired: 90,
      description: '证明学员已掌握谛听预警系统声量峰值捕捉与全生命周期简报生成能力。',
      creditHours: 4
    },
    {
      id: 'cert_quanwang',
      name: '全网探针打标与证据打捞证书',
      code: 'V8-2026-SEARCH-5521',
      isLitUp: false,
      levelRequired: 1,
      minScoreRequired: 90,
      description: '证明学员已掌握全网搜精准搜索、谣言帖快速识别打标与证据链归档能力。',
      creditHours: 3
    },
    {
      id: 'cert3',
      name: '多部门加密通信与指令闭环认证证书',
      code: 'V8-2026-ZHIHUI-7419',
      isLitUp: false,
      levelRequired: 3,
      minScoreRequired: 90,
      description: '证明学员具备点点密信与指令流转系统的高效多部门调度协同能力。',
      creditHours: 4
    },
    {
      id: 'cert_zhihui',
      name: '应急处置指令流转闭环能力证书',
      code: 'V8-2026-FLOW-3312',
      isLitUp: false,
      levelRequired: 3,
      minScoreRequired: 90,
      description: '证明学员熟练掌握应急公文全生命周期流转、签批下发与处置时效闭环能力。',
      creditHours: 3
    },
    {
      id: 'cert_wangping',
      name: '网评战术矩阵对抗能力证书',
      code: 'V8-2026-COMMENT-9921',
      isLitUp: false,
      levelRequired: 4,
      minScoreRequired: 90,
      description: '证明学员具备运用网评系统“赞/转/评/报”四维战术矩阵对抗网络水军的能力。',
      creditHours: 4
    },
    {
      id: 'cert_quanqiu',
      name: '境外源头阻断与天眼防范证书',
      code: 'V8-2026-GLOBAL-8814',
      isLitUp: false,
      levelRequired: 5,
      minScoreRequired: 95,
      description: '证明学员具备全球眼跨国平台监测、推特源头推文深度研判与境内倒灌阻断能力。',
      creditHours: 5
    },
    {
      id: 'cert4',
      name: '全域舆情应急推演通关防伪总证书',
      code: 'V8-2026-MASTER-0001',
      isLitUp: false,
      levelRequired: 6,
      minScoreRequired: 95,
      description: 'V8 平台官方最高权威认证，通关全部 6 大实战演练场，精通 8 大软件装备。',
      creditHours: 8
    }
  ]);

  // 8 Systems Equipment Definition
  const [systems] = useState<SystemEquipment[]>([
    { id: 'diting', name: '全域雷达', codeName: '谛听预警系统', actualSystem: '谛听预警系统', unlocked: true, unlockedAtLevel: 2, iconName: 'Radar', desc: '规则发现监测、关键词+时间跨度监测传播与跟踪汇总。', gamePlayDesc: '捕获舆情苗头，监控声量峰值，自动生成全生命周期简报。' },
    { id: 'quanwang', name: '全网探针', codeName: '全网搜', actualSystem: '全网搜', unlocked: true, unlockedAtLevel: 1, iconName: 'Search', desc: '规则搜索全网舆情信息；加入收藏、精准打标签。', gamePlayDesc: '定向打捞证据链，对造谣贴、核心博主精准打上分类标签。' },
    { id: 'shudi', name: '属地中枢', codeName: '属地管理系统', actualSystem: '属地管理系统', unlocked: true, unlockedAtLevel: 1, iconName: 'Building2', desc: '属地自媒体维护、发文监测、发文前错误排查。', gamePlayDesc: '通报发布前在线排错“公文扫雷”，接收属地发文违规预警。' },
    { id: 'diandian', name: '密级通信', codeName: '点点密信', actualSystem: '点点密信', unlocked: true, unlockedAtLevel: 3, iconName: 'MessageSquareText', desc: '加密通信聊天、发起指令任务、群聊推送、监测汇总。', gamePlayDesc: '沉浸式剧情即时对话，加密调度多部门协同配合。' },
    { id: 'zhihui', name: '指挥流转', codeName: '指令流转系统', actualSystem: '指令流转系统', unlocked: true, unlockedAtLevel: 3, iconName: 'FileText', desc: '指令下发、转发、接收、处置及反馈。', gamePlayDesc: '规范化应急公文流转，考核签批响应与处置反馈时效闭环。' },
    { id: 'wangping', name: '认知兵团', codeName: '网评系统', actualSystem: '网评系统', unlocked: true, unlockedAtLevel: 4, iconName: 'Users', desc: '宣传员网评处置：下发/接收/处置反馈(点赞/转发/评论/举报)。', gamePlayDesc: '组织网评力量对抗网络水军，执行“赞/转/评/报”四维战术。' },
    { id: 'quanqiu', name: '境外天眼', codeName: '全球眼', actualSystem: '全球眼', unlocked: false, unlockedAtLevel: 5, iconName: 'Globe', desc: '境外规则监测、深度挖掘境外舆情传播与发展。', gamePlayDesc: '监控推特/YouTube，深度挖掘境外源头推文与倒灌链路。' },
    { id: 'v8', name: '权限总控', codeName: 'V8 平台', actualSystem: 'V8 平台', unlocked: true, unlockedAtLevel: 1, iconName: 'ShieldCheck', desc: '机构/外部用户与应用权限管理、单点登录。', gamePlayDesc: '统一单点登录入口，随关卡解锁高阶权限，出具防伪认证。' }
  ]);

  // Initial Document Errors (公文扫雷)
  const [documentErrors, setDocumentErrors] = useState<DocumentErrorItem[]>([
    { id: 'err1', originalText: '应急救援指挥长 张伟大', errorWord: '张伟大', correctWord: '张伟', type: '职务错误', explanation: '通报中领导姓名多打一个字，易被网民挑刺为套用错模版！', isFixed: false },
    { id: 'err2', originalText: '无人员伤伤亡', errorWord: '伤伤亡', correctWord: '伤亡', type: '错别字', explanation: '重复错别字，影响官方通报严肃性。', isFixed: false }
  ]);

  // Handler: Fix Document Error (公文扫雷)
  const handleFixDocumentError = (errorId: string) => {
    setDocumentErrors(prev => prev.map(item => item.id === errorId ? { ...item, isFixed: true } : item));
    setTrustScore(prev => Math.min(100, prev + 3));
    setLastActionMessage('【公文扫雷成功】已更正属地通报错误字段！官方公信力 +3，网民挑刺情绪降低。');
  };

  // Handler: Save Case in MT Admin
  const handleSaveLevelCase = (updatedCase: LevelIncidentCase) => {
    setLevelCases(prev => prev.map(c => c.id === updatedCase.id ? updatedCase : c));
  };

  // Handler: Complete Current Level & Trigger Battle Power Settlement Screen
  const handlePassLevel = () => {
    setLevelCases(prev => prev.map(c => {
      if (c.id === activeLevelId) {
        return { ...c, isPassed: true, bestScore: 95, bestGrade: 'S+' };
      }
      if (c.id === activeLevelId + 1) {
        return { ...c, isUnlocked: true };
      }
      return c;
    }));

    setCertificates(prev => prev.map(cert => {
      if (cert.levelRequired === activeLevelId) {
        return { ...cert, isLitUp: true };
      }
      return cert;
    }));

    setTotalScore(prev => prev + 1500);
    setIsSettlementOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#060a14] font-sans antialiased text-slate-100 select-none">
      
      {/* ROUTE 1: ENTRY PORTAL (系统入口选择器 - 100% 契合 yqyl.jfif 整体入口) */}
      {viewMode === 'portal' && (
        <PortalSelection
          onSelectCocosGrowth={() => setViewMode('cocos-base')}
          onSelectV8Client={() => setViewMode('v8-lobby')}
          onSelectMTAdmin={() => setViewMode('mt-admin')}
          onSelectPractice={() => setViewMode('v8-practice')}
          onSelectBattlefield={() => setViewMode('v8-level-select')}
          onOpenLeaderboard={() => setIsLeaderboardOpen(true)}
          onOpenProfile={() => setIsProfileOpen(true)}
        />
      )}

      {/* ROUTE 1.5: COCOS CREATOR GROWTH SYSTEM BASE (全新 Cocos 养成系指挥主基地) */}
      {viewMode === 'cocos-base' && (
        <GrowthBaseView
          onReturnToPortal={() => setViewMode('portal')}
          onOpenLevelSelect={() => setViewMode('v8-level-select')}
          onOpenPractice={() => setViewMode('v8-practice')}
          onOpenProfile={() => setIsProfileOpen(true)}
        />
      )}


      {/* ROUTE 2: V8 CLIENT LOBBY (V8客户端 - 游戏大厅) */}
      {viewMode === 'v8-lobby' && (
        <V8Lobby
          onReturnToPortal={() => setViewMode('portal')}
          onOpenProfile={() => setIsProfileOpen(true)}
          onOpenPractice={() => setViewMode('v8-practice')}
          onOpenLevelSelect={() => setViewMode('v8-level-select')}
          onOpenLeaderboard={() => setIsLeaderboardOpen(true)}
          onOpenSecretChat={() => setViewMode('v8-secret-chat')}
          isPracticeCompleted={isPracticeCompleted}
          trustScore={trustScore}
          totalScore={totalScore}
          levelCases={levelCases}
        />
      )}

      {/* ROUTE 3: NOVICE TARGET PRACTICE (练兵场 · 8大练兵营特训与装备升级颁证) */}
      {viewMode === 'v8-practice' && (
        <div className="min-h-screen bg-[#09152b] py-6">
          <TargetPracticeView
            certificates={certificates}
            onUnlockCertificate={(certId) => {
              setCertificates(prev => prev.map(c => c.id === certId ? { ...c, isLitUp: true } : c));
            }}
            onAddEquipmentScore={(pts) => setTotalScore(prev => prev + pts)}
            onReturnToBattle={() => setViewMode('portal')}
          />
        </div>
      )}

      {/* ROUTE 4: LEVEL SELECTION MAP (实战演练室 · 演练场分块案例大厅) */}
      {viewMode === 'v8-level-select' && (
        <LevelSelectionView
          levelCases={levelCases}
          onSelectLevel={(levelId) => {
            setActiveLevelId(levelId);
            setViewMode('v8-battlefield');
          }}
          onReturnToLobby={() => setViewMode('portal')}
        />
      )}

      {/* ROUTE 5: 1920*1080 BATTLEFIELD VIEW (推演作战室) */}
      {viewMode === 'v8-battlefield' && (
        <div className="min-h-screen bg-[#09152b] p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between bg-[#1b2b4b] p-4 rounded-3xl border-4 border-sky-400 mb-4 text-xs shadow-xl">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setViewMode('v8-level-select')}
                className="px-4 py-2 bg-[#0d1629] hover:bg-sky-600 text-white font-black rounded-2xl border-2 border-sky-400 cursor-pointer transition-transform hover:scale-105"
              >
                ➔ 退出实战演练室
              </button>
              <span className="font-black text-amber-300 text-sm drop-shadow">
                【演练场 {activeLevelId} 实战推演中】{levelCases.find(l => l.id === activeLevelId)?.title}
              </span>
            </div>

            <button
              onClick={handlePassLevel}
              className="px-6 py-2.5 bg-gradient-to-r from-amber-400 to-yellow-300 hover:from-amber-300 hover:to-yellow-200 text-slate-950 font-black text-xs rounded-2xl shadow-xl border-2 border-white cursor-pointer transition-transform hover:scale-105"
            >
              ★ 通关当前案例 & 触发战力结算
            </button>
          </div>

          <div className="flex-1">
            <BattlefieldView
              systems={systems}
              activeSystem="shudi"
              setActiveSystem={() => {}}
              documentErrors={documentErrors}
              onFixDocumentError={handleFixDocumentError}
              onExecuteNetComment={() => {}}
              onDispatchCommand={() => {}}
              trustScore={trustScore}
            />
          </div>
        </div>
      )}

      {/* ROUTE 6: SECRET MESSAGES CHAT (点点密信) */}
      {viewMode === 'v8-secret-chat' && (
        <SecretMessageView onReturnToLobby={() => setViewMode('portal')} />
      )}

      {/* ROUTE 7: MT MANAGEMENT ADMIN (MT 管理端保持冰蓝企业风格不变) */}
      {viewMode === 'mt-admin' && (
        <MTAdminView
          onReturnToPortal={() => setViewMode('portal')}
          levelCases={levelCases}
          onSaveLevelCase={handleSaveLevelCase}
        />
      )}

      {/* MODALS */}
      <UserProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        trustScore={trustScore}
        levelCases={levelCases}
        certificates={certificates}
        totalScore={totalScore}
      />

      <SettlementModal
        isOpen={isSettlementOpen}
        onClose={() => setIsSettlementOpen(false)}
        trustScore={trustScore}
        fixedErrorsCount={documentErrors.filter(e => e.isFixed).length}
        levelTitle={`演练场 ${activeLevelId} · ${levelCases.find(l => l.id === activeLevelId)?.title}`}
        nextLevelId={activeLevelId + 1}
        equipmentScore={1250}
      />

      <LeaderboardModal
        isOpen={isLeaderboardOpen}
        onClose={() => setIsLeaderboardOpen(false)}
      />

    </div>
  );
};

export default App;
