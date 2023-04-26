const contentConfig = {
  pageName: 'user/banned',
  header: {
    title: '封禁列表',
    btnTitle: '新建商户',
    btnIsShow: false,
    deleteBtnIsShow: false,
    bannedBtnIsShow: false
  },
  contentList: [
    // { type: 'selection', label: '选择', width: '80px' },
    { type: 'index', label: '序号', width: '80px' },
    { type: 'normal', label: '用户名', prop: 'userName', width: '100px' },
    { type: 'normal', label: '创建封禁者', prop: 'createBy', width: '100px' },
    { type: 'normal', label: '更新封禁者', prop: 'updateBy', width: '100px' },
    { type: 'normal', label: '封禁时长:s', prop: 'delayTime', width: '100px' },
    {
      type: 'normal',
      label: '解锁时间',
      prop: 'unlockTime',
      width: '160px'
    },
    {
      type: 'normal',
      label: '手动解锁时间',
      prop: 'manualUnlockTime',
      width: '160px'
    },
    {
      type: 'normal',
      label: '创建时间',
      prop: 'createTime',
      width: '160px'
    },
    {
      type: 'normal',
      label: '更新时间',
      prop: 'updateTime',
      width: '160px'
    }
  ]
}

export default contentConfig
