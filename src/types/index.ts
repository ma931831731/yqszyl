export interface RegionData {
  regionName: string;
  salesRep: string;
  repaymentTarget: {
    completedRate: number;
    currentAmount: number;
    targetAmount: number;
    quarters: {
      q1: { targetWeight: number; actualRate: number };
      q2: { targetWeight: number; actualRate: number };
      q3: { targetWeight: number; actualRate: number };
      q4: { targetWeight: number; actualRate: number };
    };
  };
  signingTarget: {
    completedRate: number;
    currentAmount: number;
    targetAmount: number;
    quarters: {
      q1: { targetWeight: number; actualRate: number };
      q2: { targetWeight: number; actualRate: number };
      q3: { targetWeight: number; actualRate: number };
      q4: { targetWeight: number; actualRate: number };
    };
  };
  customerStats: {
    total: number;
    type1: number;
    type2: number;
    type3: number;
    monthlyTrend: number[];
  };
  receivables: {
    totalCount: number;
    totalAmount: number;
    aging: {
      within30Days: { count: number; amount: number };
      month1To3: { count: number; amount: number };
      month3ToYear1: { count: number; amount: number };
      year1To2: { count: number; amount: number };
      over2Years: { count: number; amount: number };
    };
  };
  invoices: {
    totalCount: number;
    totalAmount: number;
  };
}

export interface CategoryChangeLogItem {
  id: string;
  timestamp: string;
  operator: {
    type: 'MT' | 'CUSTOMER';
    name: string;
    avatarUrl?: string;
    wechatNickname?: string;
  };
  changeType: 'CREATE' | 'UPDATE';
  changes: {
    field: 'name' | 'icon' | 'description' | 'remark' | 'callId';
    fieldLabel: string;
    oldValue: string;
    newValue: string;
  }[];
  snapshot?: {
    callId?: number;
    name: string;
    icon?: string;
    description: string;
    remark?: string;
  };
}

export interface CategoryItem {
  id: string;
  callId: number; // 调用唯一ID (整数数字，1, 2, 3, 4, 5... 全局唯一不可重复)
  name: string;
  icon?: string;
  description: string;
  remark?: string;
  customerCount: number;
  creator: string;
  updatedAt: string;
  enabled: boolean;
  changeLogs?: CategoryChangeLogItem[];
}

export interface TagChangeLogItem {
  id: string;
  timestamp: string;
  operator: {
    type: 'MT' | 'CUSTOMER';
    name: string;
    avatarUrl?: string;
    wechatNickname?: string;
  };
  changeType: 'CREATE' | 'UPDATE';
  changes: {
    field: 'categoryName' | 'categoryRemark' | 'status' | 'displayScope' | 'visibilityRange' | 'visibleStaff';
    fieldLabel: string;
    oldValue: string;
    newValue: string;
  }[];
  snapshot: {
    categoryName: string;
    categoryRemark: string;
    status: 'enabled' | 'disabled';
    displayScope?: 'MT_V8' | 'MT_ONLY';
    visibilityRange?: 'all' | 'specific' | 'self';
    visibleStaff?: string[];
  };
}

export interface CustomerUsedTagItem {
  id: string;
  seq: number;
  categoryName: string; // 分类名称
  categoryRemark: string; // 分类备注（客户撰写的分类备注）
  dataVolume: number; // 数据量（已挂载、关联的总数据条数）
  customerOrg: string; // 客户机构
  customerManager: string; // 客户经理名称
  statisticalUnit: string; // 所属统计单元（如四川区域、西藏区域、政务运营单元等）
  mainCategory: string; // 对应主分类（舆情类、融媒体类、境外类、递归类等）
  status: 'enabled' | 'disabled'; // 启停状态：启用 / 停用
  displayScope?: 'MT_V8' | 'MT_ONLY'; // 显示范围：MT后台 + V8客户 或 仅MT后台
  visibilityRange?: 'all' | 'specific' | 'self'; // 可见范围：all(全机构可见) | specific(指定人多选可见) | self(仅本人单选可见)
  visibleStaff?: string[]; // 可见的人员列表
  createdAt: string; // 该标签的创建时间
  editSource?: 'MT' | 'CUSTOMER'; // 编辑来源：MT用户 / 客户
  lastUpdater: {
    type: 'MT' | 'CUSTOMER'; // MT用户 或 客户
    name: string; // 姓名（MT员工姓名 或 客户姓名/微信昵称）
    remarkName?: string; // 客户备注名
    avatarUrl?: string; // 头像
    wechatNickname?: string; // 客户微信昵称
  };
  changeLogs?: TagChangeLogItem[]; // 操作变更历史日志
  // 保持向前兼容
  creator?: {
    nickname: string;
    remarkName?: string;
    avatarUrl?: string;
    wechatId?: string;
  };
}

export interface FavoriteItem {
  id: string;
  seq: number;
  title: string; // 收藏信息标题
  summary?: string; // 摘要
  originalUrl?: string; // 原文链接
  sourcePlatform: '谛听预警' | '数解舆情' | '极速舆情' | '点点速报' | '五道杠' | '融媒体' | '全球眼'; // 收藏系统来源
  favoriteTime: string; // 收藏时间
  mainCategory: string; // 主分类名称
  subCategory: string; // 子分类名称（客户已使用标签）
  customerOrg: string; // 客户机构全称
  statisticalUnit: string; // 所属统计区域/单元
  customerManager: string; // 客户经理名称
  collector: {
    wechatNickname: string; // 微信昵称
    remarkName: string; // 客户备注姓名
    avatarUrl: string; // 微信头像
    role?: string;
  };
  keywords?: string[];
  docType?: string; // 涉事主体/文档类型
  sentiment?: '正面' | '中性' | '敏感' | '高危';
}

export type FavoriteSourceType = 
  | '全部来源'
  | '谛听预警'
  | '数解舆情'
  | '极速舆情'
  | '点点速报'
  | '五道杠'
  | '融媒体'
  | '全球眼';

export type ActiveTab = 
  | 'dashboard'
  | 'category-management'
  | 'customer-category-management'
  | 'customer-favorite-data'
  | 'source-app-config'
  | 'database-docs'
  | 'system-functions-docs'
  | 'system-prd';

export interface AppChangeLogItem {
  id: string;
  timestamp: string;
  operator: {
    type: 'MT' | 'CUSTOMER';
    name: string;
    avatarUrl?: string;
  };
  changeType: 'CREATE' | 'UPDATE';
  changes: {
    field: 'appName' | 'appIcon' | 'status' | 'description' | 'refId' | 'mainCategories';
    fieldLabel: string;
    oldValue: string;
    newValue: string;
  }[];
  snapshot: {
    refId?: number;
    appName: string;
    appIcon: string;
    status: 'active' | 'disabled';
    description: string;
    mainCategories?: string[];
  };
}

export interface SourceAppConfigItem {
  id: string;
  refId: number; // 引用唯一ID (整数数字，全局唯一不可重复)
  appCode: string;
  appName: string;
  componentKey: string;
  appType: 'PC端Web' | '移动微端' | 'SDK插件' | 'H5嵌入式' | 'OpenAPI接口' | 'SaaS云端';
  appIcon?: string;
  apiKey: string;
  secretKey: string;
  allowedDomains: string[];
  callbackUrl?: string;
  syncCategories: string[];
  mainCategories?: string[];
  rateLimit: number; // QPS
  status: 'active' | 'disabled';
  description: string;
  creator: string;
  updatedAt: string;
  callCount: number;
  changeLogs?: AppChangeLogItem[];
}


