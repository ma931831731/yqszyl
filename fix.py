import re

with open('src/components/MTManagement/SystemPRD.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# We need to escape backticks inside PRD_CONTENT so it doesn't break JS template literal.
# Since we replaced the string blindly using Python before, the backticks inside the Markdown content
# caused the JS file to have syntax errors. Let's fix this by finding the definition of PRD_MARKDOWN 
# and escaping all internal backticks, but keeping the wrapping backticks.

# Wait, the JS string is `...`. We just need to replace ` inside it with \`

# We know the content was corrupted. Let's recreate it.
PRD_CONTENT = """# 数解舆情V8（MT管理后台）- 核心业务模块详细需求说明书 (PRD)
**文档版本：V2.0-prd-Detailed**

## 1. 文档概述
本文档在V1.0版本基础上，针对【数解舆情V8（MT管理后台）】的核心模块进行了极度深度的细化。详细定义了每个菜单、模块、数值、列表、字段的展现形式、底层数据逻辑、用户交互逻辑以及与外部系统的对接标准。旨在为研发、测试及UI/UX团队提供精确到字段级别的开发与验收依据。

---

## 2. 全局菜单与导航结构

| 一级菜单 | 路由/Hash | 展现形式 | 交互逻辑 | 权限控制 |
| :--- | :--- | :--- | :--- | :--- |
| **综合看板** | `#/mt/dashboard` | 顶部导航项，默认选中 | 点击高亮，右侧加载Dashboard大盘 | 仅MT后台管理员可见 |
| **主分类管理** | `#/mt/category-management` | 左侧独立菜单项 | 点击高亮，右侧加载分类字典列表 | 管理员具备CRUD权限 |
| **客户数据仓库** | `#/mt/customer-category-management` | 左侧独立菜单项 | 点击高亮，右侧加载客户分配明细表 | 管理员具备配置与赋权权限 |
| **客户收藏数据** | `#/mt/customer-favorite-data` | 左侧独立菜单项 | 点击高亮，右侧加载客户前端收藏记录 | 全局只读，不允许修改 |
| **来源应用配置** | `#/mt/source-app-config` | 左侧独立菜单项 | 点击高亮，右侧加载底层数据源配置 | 超级管理员可见 |

---

## 3. 模块详细说明

### 3.1 综合看板 (Dashboard)
#### 3.1.1 模块定位
为MT运营人员提供全局宏观数据统计，掌握当前系统分类资源的使用率、活跃客户状态及财务回款进度（模拟演示）。

#### 3.1.2 页面布局与展现形式
1. **全局控制区**：顶部右侧提供“区域筛选”下拉框（如：川藏区域、华南区域等）。
2. **核心指标卡 (Top Cards)**：一行四列布局，展示关键总数。
3. **指标进度区 (Progress Bars)**：展示区域目标完成率（双环形进度条+季度分解）。
4. **图表分析区 (Charts)**：客户类型分布（饼图）、月度新增趋势（柱状图）。
5. **明细列表区 (Tables)**：回款账龄分析表、开票明细表。

#### 3.1.3 字段字典与数据逻辑
| 模块 | 字段名称 | 展现形式 | 数据逻辑说明 | 交互逻辑 |
| :--- | :--- | :--- | :--- | :--- |
| **控制区** | 区域选择器 | Select下拉框 | 取值字典：川藏、华北、华南等。 | 切换后，页面所有组件重新发起接口请求刷新数据。 |
| **指标卡** | 统一主分类总数 | 大字号数字+图标 | 统计`enabled=true`的主分类总数。 | 点击卡片，路由跳转至`#/mt/category-management`。 |
| **指标卡** | 已挂载客户数据 | 大字号数字+图标 | 统计【客户数据仓库】中分配出去的数据总条数。 | 点击跳转至`#/mt/customer-category-management`。 |
| **进度区** | 回款目标达成率 | 环形进度条(百分比) | 公式：`当前回款额 / 年度目标额 * 100%`。 | 鼠标悬浮(Hover)展示各季度(Q1-Q4)的具体金额细项。 |
| **列表区** | 账龄分析(表) | 嵌套表格 | 按30天内、1-3月、3月-1年、1-2年、2年以上分列。 | 每列展示“笔数”与“金额”，金额需做千分位格式化(如`¥1,234.00`)。 |

---

### 3.2 主分类管理 (Category Management)
#### 3.2.1 模块定位
系统最底层的数据字典基座，维护标准化的行业/话题分类（如：金融、汽车、突发事件）。所有分发给客户的数据必须挂载在主分类之下。

#### 3.2.2 列表展示与字段说明
列表采用分页Table展示，默认按更新时间倒序（DESC）。

| 列名 | 字段类型 | 展现形式 | 数据逻辑 | 交互逻辑 |
| :--- | :--- | :--- | :--- | :--- |
| **调用ID** | Number | 文本 | 全局唯一的自增整数（如 `1024`）。 | 不可修改，对接外部系统的主键。 |
| **分类名称** | String | 文本+可选Icon | 最长20字符，必填，全局不可重复。 | 列表页超长隐藏并显示Tooltip。 |
| **描述说明** | String | 灰色副文本 | 选填，不超过100字符。 | - |
| **已分配客户数** | Number | 蓝色链接文本 | 统计【客户数据仓库】中引用该分类的条数。 | **高优交互**：点击数字，携参跳转至【客户数据仓库】，自动按该分类过滤出明细。 |
| **状态** | Boolean | Switch开关 | `true` 启用，`false` 停用。 | - |

#### 3.2.3 表单与操作逻辑
1. **新增/编辑弹窗**：
   * **必填校验**：分类名称失焦时（`onBlur`）需异步请求校验是否重名。
   * **保护逻辑**：若“已分配客户数 > 0”，则**不允许修改分类名称**，只允许修改描述和状态。
2. **删除逻辑**：
   * **软约束**：若“已分配客户数 > 0”，点击删除弹出强警告提示框：“该分类已被N个客户使用，无法直接删除。建议将其状态置为【停用】。”，并隐藏确认删除按钮。
   * **确认机制**：允许删除时，需进行二次弹窗确认。

---

### 3.3 客户数据仓库 (Customer Category Management) - <span style="color:red">核心模块</span>
#### 3.3.1 模块定位
MT运营人员的“分发枢纽”。将主分类数据，以客户可理解的自定义名称（别名）分配给指定机构，并进行极度精细的**可见范围（精确到人）**权限控制。

#### 3.3.2 筛选与检索逻辑
* **基础筛选**：机构名称（输入框模糊查询）、客户经理（输入框模糊查询）。
* **高级筛选**：主分类（多选下拉树）、状态（下拉框：启用/停用）、显示范围（下拉框）、编辑来源（MT创建/客户自建）。
* **联动逻辑**：每次筛选条件的改变，前端应采用防抖（Debounce 500ms）自动刷新列表，无需手动点击搜索按钮。

#### 3.3.3 表单配置与核心交互：权限管控
新增/编辑配置弹窗是整个系统的核心交互点。

| 表单字段 | 展现形式 | 数据逻辑与规则 | 深度交互说明 |
| :--- | :--- | :--- | :--- |
| **客户可见名称** | Input | 必填，不超过30字符。 | 这是V8客户端用户实际看到的标签名称。 |
| **关联主分类** | Select | 单选，必填。 | 数据源来自于【主分类管理】中状态为“启用”的列表。 |
| **显示范围** | Radio组 | 枚举：`MT_V8` (两端均展示), `MT_ONLY` (仅MT后台可见)。 | 若选`MT_ONLY`，下方“可见范围”配置区直接隐藏并清空数据。 |
| **可见范围** | Radio组 | 枚举：`all`(全机构可见)、`specific`(指定人可见)、`self`(仅本人可见)。 | **动态面板逻辑**：选中`specific`或`self`时，下方展开“已选人员汇总面板”。 |
| **人员选择面板** | Modal弹窗 | 包含搜索栏（姓名/部门/手机号）与人员列表。 | 1. `specific`模式下：列表展示复选框(Checkbox)，支持多选。<br/>2. `self`模式下：列表展示单选框(Radio)，强制只能选1人。<br/>3. **数据展示**：必须展示人员真实头像（或姓名首字母占位）、姓名、所在部门、脱敏手机号（如`138****5678`）。 |

#### 3.3.4 数据流与拦截逻辑
* **底层拦截**：当该条数据的可见范围被设定为 `specific` (包含 User A, User B) 时。V8客户端请求数据列表接口时，网关层必须解析当前Token，若当前登录用户不在 `[User A, User B]` 数组中，则该条数据在数据库查询层（SQL/ORM级）就被过滤，绝不允许返回给前端（防越权）。

---

### 3.4 客户收藏数据 (Customer Favorite Data)
#### 3.4.1 模块定位
运营分析工具。只读展示V8客户及移动H5客户主动收藏的高价值数据，用于分析客户关注偏好，从而优化主分类字典。

#### 3.4.2 展现形式与逻辑
* **展现形式**：采用瀑布流卡片（Card）或紧凑型列表（List）展示。
* **卡片内容**：
  * **标题/摘要**：收藏文章或数据的摘要，超2行显示省略号。
  * **情感倾向**：通过色块标签展示。正面(绿色)、中性(灰色)、敏感(橙色)、高危(红色)。
  * **收藏人信息**：微信头像 + 微信昵称（带括号备注名） + 所属机构。
  * **来源标识**：右上角带有应用平台标识（如：来自“数解舆情”或“谛听预警”）。
* **交互逻辑**：纯只读列表。提供按时间跨度（本周/本月/近3月）、情感倾向、客户机构的组合过滤。不支持任何删除或修改操作。

---

### 3.5 来源应用配置 (Source App Config)
#### 3.5.1 模块定位
系统集成的底层基建。定义外部数据源（如外部爬虫系统、舆情模型引擎）接入MT系统的认证密钥与限流规则。

#### 3.5.2 字段说明
| 字段名称 | 类型 | 展现形式 | 数据逻辑 |
| :--- | :--- | :--- | :--- |
| **应用编码(AppCode)** | String | Input | 英文数字组合，全局唯一（如 `SPIDER_V1`）。 |
| **应用类型** | Select | 下拉框 | 取值：PC端Web、移动微端、OpenAPI接口、SaaS云端等。 |
| **API密钥(AppKey/Secret)** | String | 掩码文本 | 默认显示星号(******)，提供“一键复制”和“重置密钥”按钮。 |
| **限流(QPS)** | Number | 数字输入框 | 限制该应用每秒最多调用MT接口的次数，防CC攻击。 |
| **回调地址(Webhook)** | String | Input | 选填，当MT有分类数据更新时，向该URL发送POST推送。 |

---

## 4. 外部系统对接说明

### 4.1 与 V8 客户端 (前端应用) 对接
* **接口：获取可用标签列表 `GET /api/v8/customer-tags`**
  * **请求头**：携带客户的登录 Token (含 `userId` 和 `orgId`)。
  * **处理逻辑**：
    1. MT系统提取 `orgId`，在【客户数据仓库】中筛选出归属该机构的所有数据。
    2. 过滤 `status === 'enabled'` 且 `displayScope === 'MT_V8'` 的数据。
    3. **权限鉴定**：遍历数据，若 `visibilityRange === 'all'`，放行；若为 `specific`，校验 `userId` 是否在 `visibleStaff` 数组中；若为 `self`，同理校验。
  * **返回数据**：仅返回通过上述3层校验的纯净数据数组。

### 4.2 与 统一用户中心 (SSO) 对接
* **接口：获取机构人员清单 `GET /api/sso/org-users`**
  * **触发时机**：在【客户数据仓库】点击配置“可见范围”，打开人员选择弹窗时。
  * **请求参数**：传入当前正在配置的 `orgId` 和模糊搜索关键字 `keyword`。
  * **返回结构**：包含 `userId`, `name`, `avatarUrl`, `department`, `phone` (要求后端返回脱敏后的手机号，前端不处理脱敏逻辑，防止抓包泄露)。

---

## 5. 权限与安全规范

1. **水平越权防护 (IDOR)**：所有查询、更新、删除接口，必须校验操作对象（如记录ID）是否属于当前登录MT管理员的管辖范围。
2. **敏感信息脱敏**：前端页面禁止明文展示任何客户手机号、身份证号、银行卡号。统一采用掩码（`138****1234`）展示。
3. **日志审计**：【主分类管理】与【客户数据仓库】的所有新增、修改、删除操作，必须记录详细的 Audit Log，包含：操作时间、操作人ID、IP地址、操作类型（CREATE/UPDATE/DELETE）、变更前后的 JSON Snapshot。并在前端提供“操作日志”抽屉供追溯。
"""

escaped_content = PRD_CONTENT.replace("`", "\\`").replace("$", "\\$")

# Find the start and end of the PRD_MARKDOWN variable definition and replace it
match = re.search(r'const PRD_MARKDOWN = `([\s\S]*?)`;\n\nexport const SystemPRD', content)
if match:
    new_content = content[:match.start()] + f"const PRD_MARKDOWN = `{escaped_content}`;\n\nexport const SystemPRD" + content[match.end():]
    with open('src/components/MTManagement/SystemPRD.tsx', 'w', encoding='utf-8') as f:
        f.write(new_content)
    print("Fixed SystemPRD.tsx")
else:
    print("Could not find PRD_MARKDOWN match in SystemPRD.tsx")

