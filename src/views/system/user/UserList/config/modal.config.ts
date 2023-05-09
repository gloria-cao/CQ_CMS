const modalConfig = {
  header: {
    title: '请修改用户信息'
  },
  modalList: [
    {
      type: 'id',
      prop: 'userId'
    },
    {
      type: 'input',
      label: '用户名',
      prop: 'userName',
      placeholder: '请输入用户名',
      width: '80px'
    },
    {
      type: 'input',
      label: '头像',
      prop: 'headPortrait',
      placeholder: '请输入用户头像',
      width: '80px'
    },
    {
      type: 'input',
      label: '手机号',
      prop: 'userPhone',
      placeholder: '请输入手机号',
      width: '80px'
    },
    {
      type: 'input',
      label: '昵称',
      prop: 'nickName',
      placeholder: '请输入昵称',
      width: '80px'
    },
    {
      type: 'select',
      label: '性别',
      prop: 'sex',
      placeholder: '请输入性别',
      width: '80px'
    },
    {
      type: 'input',
      label: '身份证',
      prop: 'identityCard',
      placeholder: '请输入身份证',
      width: '80px'
    }
  ]
}

export default modalConfig
