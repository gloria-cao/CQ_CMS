const contentConfig = {
  pageName: 'role',
  safeType: 'role-delete',
  header: {
    // title: '角色列表',
    // btnTitle: '新建角色',
    btnIsShow: true,
    deleteBtnIsShow: false,
    bannedBtnIsShow: false
  },
  contentList: [
    // { type: 'selection', label: '选择', width: '80px' },
    { type: 'index', label: '序号', width: '80px', align: 'center' },
    {
      type: 'normal',
      label: '角色名称',
      prop: 'roleName',
      width: '100px',
      align: 'center'
    },
    {
      type: 'normal',
      label: '角色信息备注',
      prop: 'remark',
      width: '110px',
      align: 'center'
    },
    {
      type: 'normal',
      label: '创建人',
      prop: 'createBy',
      width: '100px',
      align: 'center'
    },
    {
      type: 'normal',
      label: '更新人',
      prop: 'updateBy',
      width: '100px',
      align: 'center'
    },
    {
      type: 'normal',
      label: '创建时间',
      prop: 'createTime',
      width: '160px',
      align: 'center'
    },
    {
      type: 'normal',
      label: '更新时间',
      prop: 'updateTime',
      width: '160px'
    },
    // {
    //   type: 'normal',
    //   label: '可否删除',
    //   prop: 'isDeleted',
    //   width: '160px'
    // },
    {
      type: 'operation',
      label: '操作',
      prop: 'option',
      width: '100px',
      // id: 'roleId'
      align: 'center',
      btns: [
        { type: 'edit', label: '编辑', color: 'primary', icon: 'Edit' },
        { type: 'delete', label: '删除', color: 'danger', icon: 'Delete' }
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
