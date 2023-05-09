const contentConfig = {
  pageName: 'user',
  safeType: 'user-delete',
  header: {
    btnIsShow: true
  },
  contentList: [
    { type: 'selection' },
    // { type: 'index', label: '序号', width: '80px' },
    {
      type: 'custom',
      label: '用户信息',
      prop: 'userName',
      width: '220px',
      slotName: 'userInfo'
    },
    {
      type: 'custom',
      label: '状态',
      prop: 'status',
      width: '100px',
      slotName: 'status'
    },
    { type: 'normal', label: '电话号码', prop: 'userPhone', width: '110px' },
    { type: 'normal', label: '身份证', prop: 'identityCard', width: '200px' },
    {
      type: 'normal',
      label: '创建时间',
      prop: 'createTime',
      width: '160px'
    },
    {
      type: 'optionBtn',
      label: '操作',
      prop: 'option',
      width: '140px',
      id: 'roleId'
    }
    // {
    //   type: 'otherOption',
    //   label: '其他',
    //   prop: 'option',
    //   width: '400px',
    //   id: 'roleId',
    //   slotName: 'otherOption'
    // }
  ],
  handler: {
    optionIsShow: true,
    otherIsShow: true,
    pictureIsShow: true
  }
}

export default contentConfig
