import router from '@/router'
import type { RouteRecordRaw } from 'vue-router'

// 加载本地路由
function loadLoaclRoutes() {
  // ! 动态添加路由
  // 1.动态获取所有的路由对象，放到数组中
  // * 路由对象都在独立的文件中
  // * 从文件中将所有路由对象先读取数组中
  const localRoutes: RouteRecordRaw[] = []
  // 读取router/main中所有的ts文件,eager是立刻加载出来不加则为懒加载
  const files: Record<string, any> = import.meta.glob('@/router/***/**/*.ts', {
    eager: true
  })
  // 遍历所有对象
  for (const key in files) {
    const module = files[key]
    localRoutes.push(module.default)
  }
  return localRoutes
}

// 动态添加路由

// 保存动态加载的第一个菜单
export let firstMenu: any = null
export function mapMenusToRoutes(userMenus: any[]) {
  const localRoutes = loadLoaclRoutes()
  // 根据菜单去匹配正确的路由
  // router.addRoute['main', xxx]
  const routes: RouteRecordRaw[] = []
  for (const menu of userMenus) {
    for (const submenu of menu.children) {
      const route = localRoutes.find((item) => item.path === submenu.component)
      // const subpath = route?.path.split('/')
      // if (route) router.addRoute(subpath![1], route)
      if (route) {
        // 给route的顶层菜单增加重定向功能（但只需要增加一次）
        if (!routes.find((item) => item.path === menu.path)) {
          routes.push({ path: menu.path, redirect: route.path })
        }

        routes.push(route)
      }
      if (!firstMenu && route) firstMenu = submenu
      // 在遍历子
      for (const itemmenu of submenu.children) {
        const subroute = localRoutes.find(
          (item) => item.path === itemmenu.component
        )

        if (subroute) {
          if (!routes.find((item) => item.path === submenu.path)) {
            routes.push({
              path: submenu.path,
              redirect: subroute.path
            })
          }
          routes.push(subroute)
        }
      }
    }
  }
  return routes
}

/**
 *根根据路径去匹配需要显示的菜单
 * @param path 需要匹配的路径
 * @param menuList 所有的菜单
 */
export function mapPathToMenu(path: string, menuList: any[]) {
  for (const menu of menuList) {
    for (const submenu of menu.children) {
      if (submenu.component === path) return submenu
      // 判断下一级菜单的childre是否不为空，进行遍历
      if (JSON.stringify(submenu.children) != '[]') {
        for (const itemmenu of submenu.children) {
          if (itemmenu.component === path) return itemmenu
        }
      }
    }
  }
}

/**
 *
 * 面包屑路径
 * @export mapPathToBreadcrumbs
 * @param {string} path
 * @param {any[]} menuList
 */
interface IBreadcrumbs {
  name: string
  path: string
}
export function mapPathToBreadcrumbs(path: string, menuList: any[]) {
  //定义面包屑
  const breadcrumbs: IBreadcrumbs[] = []

  // 遍历菜单
  for (const menu of menuList) {
    for (const submenu of menu.children) {
      if (submenu.component === path) {
        // 父级菜单
        breadcrumbs.push({ name: menu.meta.title, path: menu.path })
        // 子级菜单
        breadcrumbs.push({ name: submenu.meta.title, path: submenu.path })
      }
      // 判断下一级菜单的childre是否不为空，进行遍历
      if (JSON.stringify(submenu.children) != '[]') {
        for (const itemmenu of submenu.children) {
          if (itemmenu.component === path) {
            // 父级菜单
            breadcrumbs.push({ name: menu.meta.title, path: menu.path })
            // 子级菜单
            breadcrumbs.push({ name: submenu.meta.title, path: submenu.path })
            // 子子级菜单
            breadcrumbs.push({ name: itemmenu.meta.title, path: itemmenu.path })
          }
        }
      }
    }
  }

  return breadcrumbs
}
