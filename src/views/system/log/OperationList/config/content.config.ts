const ContentConfig = {
  pageName: 'system/log',
  header: {
    title: '登录日志列表',
    btnIsShow: false,
    deleteBtnIsShow: false,
    bannedBtnIsShow: false
  },
  contentList: [
    { type: 'index', label: '序号', width: '80px' },
    { type: 'normal', label: '创建者', prop: 'createdBy', width: '80px' },
    { type: 'normal', label: '登录Ip', prop: 'logIp', width: '130px' },
    { type: 'normal', label: '登录方式', prop: 'logMethod', width: '100px' },
    // { type: 'normal', label: '登录参数', prop: 'logParams', width: '80px' },
    // { type: 'normal', label: '登录结果', prop: 'logResult', width: '80px' },
    { type: 'normal', label: '登录状态', prop: 'logStatus', width: '100px' },
    { type: 'normal', label: '登录次数', prop: 'logTime', width: '80px' },
    { type: 'normal', label: '登录Url', prop: 'logUrl', width: '200px' },
    // {
    //   type: 'normal',
    //   label: '登录管控者',
    //   prop: 'logController',
    //   width: '100px'
    // },
    {
      type: 'normal',
      label: '创建时间',
      prop: 'createTime',
      width: '180px'
    }
    // { type: 'normal', label: '登录浏览器', prop: 'logUa', width: '380px' }
  ]
}

export default ContentConfig
