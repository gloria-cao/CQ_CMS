const contentConfig = {
  pageName: 'user',
  safeType: 'user-delete',
  safeTypes: 'batch-user-delete',
  // 控制新建等按钮是否显示，默认不显示
  header: {
    // btnIsShow: true
  },
  contentList: [
    { type: 'selection' },
    {
      type: 'custom',
      label: '用户信息',
      prop: 'userName',
      width: '220px',
      slotName: 'userInfo',
      align: 'center'
    },
    {
      type: 'custom',
      label: '状态',
      prop: 'status',
      width: '100px',
      slotName: 'status',
      align: 'center'
    },
    {
      type: 'normal',
      label: '电话号码',
      prop: 'userPhone',
      width: '110px',
      align: 'center'
    },
    {
      type: 'normal',
      label: '身份证',
      prop: 'identityCard',
      width: '200px',
      align: 'center'
    },
    {
      type: 'normal',
      label: '创建时间',
      prop: 'createTime',
      width: '160px',
      align: 'center'
    },
    // {
    //   type: 'optionBtn',
    //   label: '数据  ',
    //   prop: 'option',
    //   width: '140px',
    //   id: 'roleId',
    //   align: 'center'
    // },
    {
      type: 'operation',
      label: '操作',
      width: '100px',
      align: 'center',
      prop: 'operate',
      btns: [
        { type: 'edit', label: '编辑数据', color: 'primary', icon: 'Edit' },
        { type: 'delete', label: '删除数据', color: 'danger', icon: 'Delete' },
        {
          type: 'editPwd',
          label: '修改密码',
          color: 'danger',
          icon: 'EditPen'
        },
        {
          type: 'resetPwd',
          label: '重置密码',
          color: 'warning',
          icon: 'Refresh'
        },
        {
          type: 'uploadPic',
          label: '图片上传',
          color: 'primary',
          icon: 'Picture'
        },
        { type: 'kickout', label: '强制下线', color: 'info', icon: 'Close' }
      ]
    }
  ],
  handler: {
    // optionIsShow: true,
    // otherIsShow: true,
    // pictureIsShow: true
  }
}

export default contentConfig
