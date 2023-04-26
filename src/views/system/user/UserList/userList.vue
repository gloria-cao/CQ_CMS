<template>
  <div class="userlist">
    <user-search
      @query-click="handleQueryClick"
      @reset-click="handleResetClick"
    ></user-search>
    <user-content
      ref="contentRef"
      @delete-click="handleDeleteClick"
      @banned-time-click="handleBannedTimeClick"
      @reset-pwd-click="handleResetPwdClick"
      @update-pwd-click="handleUpdatePwdClick"
      @modify-click="handleModifyInfoClick"
    ></user-content>
    <user-modal ref="modalRef"></user-modal>
  </div>
</template>

<script setup lang="ts" name="userlist">
import userSearch from './c-cpns/user-search.vue'
import userContent from './c-cpns/user-content.vue'
import userModal from './c-cpns/user-modal.vue'
import { ref } from 'vue'
// import userList from '@/router/system/user/UserList/userList'

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
// 删除 采用用联合类型进行区分，typof进行类型缩小,可在后面完成
function handleDeleteClick(safeType: string, usersId: number | string[]) {
  modalRef.value?.openSafeIsShow(safeType, usersId)
}
//封禁
function handleBannedTimeClick(usersId: number | number[], status: number) {
  if (status) {
    modalRef.value?.modalBannedIsShow(usersId)
    // modalRef.value?.bannedComfireBtnClick()
  } else if (!status) {
    modalRef.value?.modalUntieDisabledIsShow(usersId)
  }
}
// 重置密码
function handleResetPwdClick(safeType: string, userId: number) {
  modalRef.value?.openSafeIsShow(safeType, userId)
  // modalRef.value?.comfireBtnClick(userId)
}
// 修改密码
function handleUpdatePwdClick(userId: number) {
  modalRef.value?.modalUpdatePwdIsShow(userId)
}
// 修改用户数据
function handleModifyInfoClick(userInfo: any) {
  modalRef.value?.modalModifyIsShow(userInfo)
}
</script>

<style scoped>
.userlist {
}
</style>
