<template>
  <div class="userlist">
    <user-search
      @query-click="handleQueryClick"
      @reset-click="handleResetClick"
    ></user-search>
    <user-content
      ref="contentRef"
      @delete-click="handleDeleteClick"
    ></user-content>
    <user-modal ref="modalRef"></user-modal>
  </div>
</template>

<script setup lang="ts" name="userlist">
import userSearch from './c-cpns/user-search.vue'
import userContent from './c-cpns/user-content.vue'
import userModal from './c-cpns/user-modal.vue'
import { ref } from 'vue'
import userList from '@/router/system/user/UserList/userList'

// 对content组件进行操作
const contentRef = ref<InstanceType<typeof userContent>>()
function handleQueryClick(formData: any) {
  contentRef.value?.fetchUsersListData(formData)
}
function handleResetClick() {
  contentRef.value?.fetchUsersListByPage()
}

// 对modal组件进行操作
const modalRef = ref<InstanceType<typeof userModal>>()
// 可以用联合类型进行区分，typof进行类型缩小
function handleDeleteClick(safeType: string, usersId: number | string[]) {
  modalRef.value?.openSafeIsShow(safeType, usersId)
  //判断userId的类型，然后进行区分
  if (typeof usersId === 'number') {
    console.log('单选' + usersId + safeType)
    // 单选
    modalRef.value?.comfireBtnClick(usersId)
  } else if (typeof usersId === 'object') {
    console.log('多选' + usersId + safeType)
    modalRef.value?.comfireBtnClick(usersId)
  }
  // modalRef.value?.openSafeIsShow(safeType, userId, ids)
  // console.log(typeof userId)
  // console.log(ids)
  // console.log(typeof ids)
  // 区分是单选还是多选
  // if (userId) {
  //   // 单选
  //   modalRef.value?.comfireBtnClick(userId)
  //   console.log('单选' + userId + safeType)
  // } else if (ids) {
  //   // 多选
  //   // modalRef.value?.comfireBtnClick(safeType, ids)
  //   console.log('多选' + ids + safeType)
  // }
}
// function handleDeletesClick(ids: string[], safeType: string) {
//   modalRef.value?.openSafeIsShow()
//   modalRef.value?.comfiresBtnClick(ids, safeType)
// }
</script>

<style scoped>
.userlist {
}
</style>
