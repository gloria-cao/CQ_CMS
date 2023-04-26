const modalConfig = {
  header: {
    title: '请修改角色信息'
  },
  modalList: [
    {
      type: 'id',
      prop: 'manageId'
    },
    {
      type: 'input',
      label: '类型',
      prop: 'typeName',
      placeholder: '请输入类型',
      width: '80px'
    }
  ]
}

export default modalConfig
