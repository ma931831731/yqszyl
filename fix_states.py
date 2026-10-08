with open('src/components/MTManagement/CustomerCategoryManagement.tsx', 'r') as f:
    content = f.read()

states_addition = """
  const [isSelectUserModalOpen, setIsSelectUserModalOpen] = useState<boolean>(false);
  const [tempVisibleStaff, setTempVisibleStaff] = useState<string[]>([]);
  const [searchUserQuery, setSearchUserQuery] = useState<string>('');
"""

if "const [isSelectUserModalOpen" not in content:
    content = content.replace("const [isModalOpen, setIsModalOpen] = useState<boolean>(false);", "const [isModalOpen, setIsModalOpen] = useState<boolean>(false);\n" + states_addition)

with open('src/components/MTManagement/CustomerCategoryManagement.tsx', 'w') as f:
    f.write(content)
print("done")
