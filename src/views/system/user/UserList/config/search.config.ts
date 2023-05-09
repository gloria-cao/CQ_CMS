const searchConfig = {
  formItems: [
    {
      type: 'input',
      prop: 'userName',
      label: '用户名',
      placeholder: '用户名'
    },
    {
      type: 'input',
      prop: 'userPhone',
      label: '手机号码',
      placeholder: '手机号码'
    },
    {
      type: 'input',
      prop: 'identityCard',
      label: '身份证',
      placeholder: '身份证'
    },
    {
      type: 'select',
      prop: 'status',
      label: '状态',
      placeholder: '是否封禁',
      options: [
        { label: '正常', value: 1 },
        { label: '封禁', value: 0 }
      ]
    },

    {
      type: 'select',
      prop: 'sex',
      label: '性别',
      placeholder: '请选择用户性别',
      options: [
        { label: '男', value: 1 },
        { label: '女', value: 0 }
      ]
    },
    {
      type: 'date-picker',
      prop: 'createTime',
      label: '创建时间',
      placeholder: '创建时间'
    }
  ]
}

export default searchConfig
