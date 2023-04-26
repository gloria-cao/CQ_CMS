const searchConfig = {
  formItems: [
    {
      type: 'input',
      prop: 'userName',
      label: '用户名',
      placeholder: '请输入查询用户名'
    },
    {
      type: 'date-picker',
      prop: 'createTime',
      label: '开始时间',
      placeholder: '请输入开始时间'
    },
    {
      type: 'date-picker',
      prop: 'unlockTime',
      label: '结束时间 ',
      placeholder: '请输入结束时间'
    }
  ]
}

export default searchConfig
