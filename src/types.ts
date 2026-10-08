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
