const contentConfig = {
  pageName: 'merchantType',
  safeType: 'manage-delete',
  safeTypes: 'batch-manage-delete',
  header: {
    title: '商户列表',
    btnTitle: '新建商户',
    btnIsShow: true,
    bannedBtnIsShow: false
  },
  contentList: [
    { type: 'selection', label: '选择', width: '80px', align: 'center' },
    { type: 'index', label: '序号', width: '80px', align: 'center' },
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
      label: '类型',
      prop: 'typeName',
      width: '120px',
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
      width: '160px',
      align: 'center'
    },
    {
      type: 'operation',
      label: '操作',
      prop: 'option',
      width: '140px',
      id: 'roleId',
      align: 'center',
      btns: [
        { type: 'edit', label: '编辑', color: 'primary', icon: 'Edit' },
        { type: 'delete', label: '删除', color: 'danger', icon: 'Delete' }
      ]
    }
  ]
}

export default contentConfig
