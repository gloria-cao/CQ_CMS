const userList = () => import('@/views/system/user/UserList/userList.vue')
export default {
  path: '/system/user/UserList',
  name: 'userList',
  component: userList,
  children: []
}
