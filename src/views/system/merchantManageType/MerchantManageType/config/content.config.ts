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
    { type: 'selection', label: '选择', width: '80px' },
    { type: 'index', label: '序号', width: '80px' },
    { type: 'normal', label: '创建人', prop: 'createBy', width: '100px' },
    { type: 'normal', label: '更新人', prop: 'updateBy', width: '100px' },
    { type: 'normal', label: '类型', prop: 'typeName', width: '120px' },
    { type: 'normal', label: '创建时间', prop: 'createTime', width: '160px' },
    { type: 'normal', label: '更新时间', prop: 'updateTime', width: '160px' },
    {
      type: 'optionBtn',
      label: '操作',
      prop: 'option',
      width: '140px',
      id: 'roleId'
    }
  ]
}

export default contentConfig
