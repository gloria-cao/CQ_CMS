const modalConfig = {
  header: {
    title: '请修改角色信息'
  },
  modalList: [
    {
      type: 'id',
      prop: 'roleId'
    },
    {
      type: 'input',
      label: '角色名',
      prop: 'roleName',
      placeholder: '请输入角色名',
      width: '80px'
    },
    {
      type: 'input',
      label: '权限',
      prop: 'remark',
      placeholder: '请输入权限',
      width: '80px'
    }
  ]
}

export default modalConfig
