export type SystemId = 
  | 'diting'    // 全域雷达 - 谛听预警系统
  | 'quanwang'  // 全网探针 - 全网搜
  | 'shudi'     // 属地中枢 - 属地管理系统 (含公文扫雷)
  | 'diandian'  // 密级通信 - 点点密信
  | 'zhihui'    // 指挥流转 - 指令流转系统
  | 'wangping'  // 认知兵团 - 网评系统
  | 'quanqiu'   // 境外天眼 - 全球眼
  | 'v8';       // 权限总控 - V8平台

export interface SystemEquipment {
  id: SystemId;
  name: string;
  codeName: string;
  actualSystem: string;
  unlocked: boolean;
  unlockedAtLevel: number;
  iconName: string;
  desc: string;
  gamePlayDesc: string;
}

export interface LevelIncidentCase {
  id: number;
  title: string;
  subtitle: string;
  category: string; // 舆情事件类别 (自媒体维权 / 生产安全 / 救援协同 / 文旅消费 / 境外倒灌 / 复合危机)
  difficulty: '简单' | '中等' | '较难' | '高' | '王者';
  difficultyColor: string;
  discoveryDesc: string;   // 事件发现阶段特征
  propagationDesc: string; // 传播扩散特征
  trackingDesc: string;    // 跟踪监控难度
  disposalDesc: string;    // 处置考核重点
  unlockedSystems: SystemId[];
  isUnlocked: boolean;
  isPassed: boolean;
  bestScore: number | null; // 历史最高得分
  bestGrade: string | null; // S+ / S / A
  stars: number;            // 0 ~ 3
}

export interface UserCertificate {
  id: string;
  name: string;
  code: string;
  isLitUp: boolean;
  levelRequired: number;
  minScoreRequired: number;
  description: string;
  litUpDate?: string;
  creditHours: number;
}

export interface MTUserRecord {
  id: string;
  name: string;
  department: string;
  completedLevels: number;
  totalScore: number;
  rank: number;
  lastActive: string;
  status: '正常' | '优秀' | '需加强';
}

export interface DocumentErrorItem {
  id: string;
  originalText: string;
  errorWord: string;
  correctWord: string;
  type: '错别字' | '职务错误' | '标点及格式' | '涉密用语';
  explanation: string;
  isFixed: boolean;
}

export interface CommandTask {
  id: string;
  title: string;
  department: string;
  priority: '特急' | '加急' | '平急';
  status: '待签批' | '处置中' | '已归档';
  time: string;
  content: string;
}

export interface CommentItem {
  id: string;
  username: string;
  avatar: string;
  platform: '微博' | '抖音' | '小红书' | '论坛' | 'X/Twitter';
  content: string;
  sentiment: 'negative' | 'neutral' | 'positive';
  likes: number;
  timeAgo: string;
}

// ==========================================
// Cocos Creator 养成系重构新增类型定义
// ==========================================

export type FacilityId = SystemId;

export interface BaseFacility {
  id: FacilityId;
  name: string;
  buildingName: string; // 养成系设施名称 (如：谛听天眼情报阵列)
  level: number;
  maxLevel: number;
  upgradeCostData: number; // 升级所需情报点
  upgradeCostGold: number; // 升级所需应急经费
  dataRatePerSec: number;  // 每秒情报产出
  computeRatePerSec: number; // 每秒算力产出
  assignedOfficerId: string | null; // 当前驻扎特聘干员ID
  perkDesc: string; // 设施加成描述
  unlocked: boolean;
}

export type OfficerRole = '舆情分析师' | '公文审校员' | '网评先锋' | '指挥调度员' | '境外防御专家';
export type OfficerRarity = 'SR' | 'SSR' | 'UR';

export interface OfficerSkill {
  id: string;
  name: string;
  desc: string;
  icon: string;
}

export interface OfficerItem {
  id: string;
  name: string;
  avatar: string;
  role: OfficerRole;
  rarity: OfficerRarity;
  level: number;
  maxLevel: number;
  exp: number;
  maxExp: number;
  combatPower: number; // 战力值
  skills: OfficerSkill[];
  assignedFacilityId: FacilityId | null;
  status: '空闲' | '驻扎中' | '外派处置中';
}

export interface GameResources {
  trustScore: number;     // 公信力 (0~100)
  dataPoints: number;     // 情报点数
  computePower: number;   // 舆情算力
  goldCoins: number;      // 应急经费
  honorMedals: number;    // 荣誉勋章
}

export interface EmergencyEvent {
  id: string;
  title: string;
  category: string;
  difficulty: '普通' | '紧急' | '特急';
  timeLeftSeconds: number;
  maxTimeSeconds: number;
  requiredRole: OfficerRole;
  rewardData: number;
  rewardGold: number;
  trustPenalty: number;
  assignedOfficerId: string | null;
  status: '待处置' | '处置中' | '已化解';
}

