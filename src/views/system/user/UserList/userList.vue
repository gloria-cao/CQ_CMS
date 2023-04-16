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
// 删除可以用联合类型进行区分，typof进行类型缩小
function handleDeleteClick(safeType: string, usersId: number | string[]) {
  modalRef.value?.openSafeIsShow(safeType, usersId)
  //判断userId的类型，然后进行区分
  if (typeof usersId === 'number') {
    // 单选
    modalRef.value?.deleteComfireBtnClick(usersId)
  } else if (typeof usersId === 'object') {
    modalRef.value?.deleteComfireBtnClick(usersId)
  }
}
//封禁
function handleBannedTimeClick(usersId: number | number[], status: number) {
  if (status) {
    modalRef.value?.modalBannedIsShow(usersId)
    modalRef.value?.bannedComfireBtnClick()
    // if (typeof usersId === 'number') {
    //   // 单个封禁解封
    //   modalRef.value?.bannedComfireBtnClick()
    // } else if (typeof usersId === 'object') {
    //   // 批量封禁
    //   modalRef.value?.bannedComfireBtnClick()
    // }
  } else if (!status) {
    modalRef.value?.modalUntieDisabledIsShow(usersId)
    // if (typeof usersId === 'number') {
    //   // 单个解封
    //   modalRef.value?.untieDisabledBtnClick()
    // } else if (typeof usersId === 'object') {
    //   // 批量解封
    //   modalRef.value?.untieDisabledBtnClick()
    // }
  }
}
</script>

<style scoped>
.userlist {
}
</style>
