import re

with open("src/components/MTManagement/SystemPRD.tsx", "r", encoding="utf-8") as f:
    content = f.read()

# The content to insert
target_expectations = """
## 2. 建设目标与业务期望

本系统（数解舆情V8-MT管理后台及收藏管理体系）的建设核心旨在打造一个**统一、安全、精细化、高扩展**的情报资产运营中枢，以支撑跨平台数据的高效分发与流转。具体期望达成以下四大核心目标：

1. **构建统一的数据资产基座 (Unified Data Asset Foundation)**
   通过【主分类管理】与【客户数据仓库】，将离散在各业务线（数解舆情V8、谛听预警等）的原始情报数据进行标准化、标签化归一。为全平台提供一套唯一的、标准的数据分类字典，打破业务数据孤岛。
2. **实现极度精细化的多租户权限管控 (Granular Multi-tenant Access Control)**
   从“机构”、“客户经理”到“具体员工”，实现千人千面的数据可见范围控制（全机构可见、指定人可见、仅本人可见）。确保涉密或高危情报在正确的时间，以合规的方式，触达被授权的指定终端用户，严防数据越权与外泄。
3. **沉淀高价值舆情资产，驱动业务反哺 (Accumulate High-value Intelligence Assets)**
   通过打通V8 PC端与H5移动端的【收藏组件】，沉淀终端用户（决策者、分析师）的主动关注行为。利用【客户收藏数据】与【综合看板】沉淀出的热度趋势与偏好画像，反向指导系统数据模型的优化与分类字典的迭代，实现“用数据养数据”的生态闭环。
4. **打造标准化与高扩展的开放集成架构 (Standardized & Extensible Integration Architecture)**
   通过【来源应用配置】模块，构建起标准化的鉴权（AppKey/Secret）、限流（QPS）及回调基建。使MT系统不仅服务于内部生态，未来更能以OpenAPI或SaaS形态，敏捷、安全地接入更多的外部第三方数据源及上层应用。
"""

# We need to find `## 2. 功能清单总览` and replace it and the subsequent numbering.
# We will do a string replacement.
new_content = content.replace("## 2. 功能清单总览", target_expectations.strip() + "\n\n---\n\n## 3. 功能清单总览")
new_content = new_content.replace("## 3. 详细需求设计：前端组件", "## 4. 详细需求设计：前端组件")
new_content = new_content.replace("### 3.1", "### 4.1")
new_content = new_content.replace("### 3.2", "### 4.2")

new_content = new_content.replace("## 4. 详细需求设计：MT数据仓库管理", "## 5. 详细需求设计：MT数据仓库管理")
new_content = new_content.replace("### 4.1", "### 5.1")
new_content = new_content.replace("### 4.2", "### 5.2")
new_content = new_content.replace("### 4.3", "### 5.3")
new_content = new_content.replace("### 4.4", "### 5.4")
new_content = new_content.replace("### 4.5", "### 5.5")

new_content = new_content.replace("## 5. 外部系统对接说明", "## 6. 外部系统对接说明")
new_content = new_content.replace("## 6. 数据仓库：建库建表说明", "## 7. 数据仓库：建库建表说明")

with open("src/components/MTManagement/SystemPRD.tsx", "w", encoding="utf-8") as f:
    f.write(new_content)

print("PRD Updated Successfully.")
