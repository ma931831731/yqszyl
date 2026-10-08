import re

with open('src/components/MTManagement/CustomerCategoryManagement.tsx', 'r') as f:
    content = f.read()

# Add states for the user selection modal
states_addition = """
  const [isSelectUserModalOpen, setIsSelectUserModalOpen] = useState(false);
  const [tempVisibleStaff, setTempVisibleStaff] = useState<string[]>([]);
  const [searchUserQuery, setSearchUserQuery] = useState('');
"""

if "const [isSelectUserModalOpen" not in content:
    content = content.replace("const [isModalOpen, setIsModalOpen] = useState(false);", "const [isModalOpen, setIsModalOpen] = useState(false);\n" + states_addition)

# Add getStaffDetail function inside the component
staff_detail_func = """
  const getStaffDetail = (name: string, orgName: string) => {
    let hash = 0;
    for (let i = 0; i < name.length; i++) hash += name.charCodeAt(i);
    const mockNicknames = ['华风如歌_四川', '博文研策', '雪落锦官城', '蜀道天网_Admin', '微光如梦', '数据先锋', '云端行者', '锦城花开', '天府之国'];
    const mockDepts = ['网络应急处', '态势研判组', '新媒体矩阵组', '网络安全处', '数据分析部', '综合办公室', '技术保障部'];
    const mockJobs = ['应急监测主管', '高级舆情分析师', '融媒分发主管', '系统安全工程师', '数据专员', '主任科员', '技术专家'];
    return {
      name,
      org: orgName,
      nickname: mockNicknames[hash % mockNicknames.length],
      dept: mockDepts[hash % mockDepts.length],
      job: mockJobs[hash % mockJobs.length],
      phone: `13${(hash % 9) + 1}****${(hash * 123 % 9000) + 1000}`
    };
  };
"""

if "const getStaffDetail" not in content:
    content = content.replace("const handleOpenEditModal", staff_detail_func + "\n  const handleOpenEditModal")

# Replace the onChange handlers for the radio buttons to open the modal
old_self_radio = """                        onChange={() => {
                          setFormVisibilityRange('self');
                          const staffList = getOrgStaffList(formCustomerOrg);
                          if (formVisibleStaff.length === 0 || !staffList.includes(formVisibleStaff[0])) {
                            const defaultStaff = staffList.find((s) => s === formCustomerManager) || staffList[0];
                            if (defaultStaff) setFormVisibleStaff([defaultStaff]);
                          } else {
                            setFormVisibleStaff([formVisibleStaff[0]]);
                          }
                        }}"""

new_self_radio = """                        onChange={() => {
                          setFormVisibilityRange('self');
                          const staffList = getOrgStaffList(formCustomerOrg);
                          let currentSelection = formVisibleStaff;
                          if (currentSelection.length === 0 || !staffList.includes(currentSelection[0])) {
                            const defaultStaff = staffList.find((s) => s === formCustomerManager) || staffList[0];
                            currentSelection = defaultStaff ? [defaultStaff] : [];
                          } else {
                            currentSelection = [currentSelection[0]];
                          }
                          setFormVisibleStaff(currentSelection);
                          setTempVisibleStaff(currentSelection);
                          setSearchUserQuery('');
                          setIsSelectUserModalOpen(true);
                        }}"""

content = content.replace(old_self_radio, new_self_radio)

old_specific_radio = """                        onChange={() => {
                          setFormVisibilityRange('specific');
                          const staffList = getOrgStaffList(formCustomerOrg);
                          if (formVisibleStaff.length === 0 && staffList.length > 0) {
                            const defaultStaff = staffList.find((s) => s === formCustomerManager) || staffList[0];
                            if (defaultStaff) setFormVisibleStaff([defaultStaff]);
                          }
                        }}"""

new_specific_radio = """                        onChange={() => {
                          setFormVisibilityRange('specific');
                          const staffList = getOrgStaffList(formCustomerOrg);
                          let currentSelection = formVisibleStaff;
                          if (currentSelection.length === 0 && staffList.length > 0) {
                            const defaultStaff = staffList.find((s) => s === formCustomerManager) || staffList[0];
                            currentSelection = defaultStaff ? [defaultStaff] : [];
                          }
                          setFormVisibleStaff(currentSelection);
                          setTempVisibleStaff(currentSelection);
                          setSearchUserQuery('');
                          setIsSelectUserModalOpen(true);
                        }}"""

content = content.replace(old_specific_radio, new_specific_radio)

with open('src/components/MTManagement/CustomerCategoryManagement.tsx', 'w') as f:
    f.write(content)

print("step 1 done")
