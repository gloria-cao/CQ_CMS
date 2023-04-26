const searchConfig = {
  formItems: [
    {
      type: 'input',
      prop: 'roleName',
      label: '角色名称',
      placeholder: '角色名称'
    },
    {
      type: 'input',
      prop: 'remark',
      label: '角色信息',
      placeholder: '角色信息'
    },
    {
      type: 'date-picker',
      prop: 'createTime',
      label: '创建时间',
      placeholder: '创建时间'
    },
    {
      type: 'input',
      prop: 'createBy',
      label: '创建者',
      placeholder: '创建者'
    }
  ]
}

export default searchConfig
