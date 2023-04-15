// 定义state类型
export interface ILoginState {
  verifyCode: string
  token: string
  userId: number
  loginMsg: string
  menuList: IMenuList[]
  userInfo: IUserInfo
}

export interface IUserInfo {
  userId: number
  userName: string
  headPortrait: string
  permissions: string[]
}

export interface IMenuList {
  path: string
  component: string
  name: string
  redirect: string
  meta: IMenuMeta[]
  children: IChildren[]
}

// 关于菜单的数据类型
export interface IMenuMeta {
  title: string
  icon: string
  roles: string[]
}

export interface IChildren {
  path: string
  component: string
  name: string
  redirect?: any
  meta: IMenuMeta
  children: any[]
}
