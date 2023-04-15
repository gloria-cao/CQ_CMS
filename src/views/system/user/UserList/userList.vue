<template>
  <div class="userlist">
    <user-search
      @query-click="handleQueryClick"
      @reset-click="handleResetClick"
    ></user-search>
    <user-content
      ref="contentRef"
      @delete-click="handleDeleteClick"
      @deletes-click="handleDeletesClick"
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
function handleDeleteClick(userId: string, safeType: string) {
  modalRef.value?.openSafeIsShow()
  modalRef.value?.comfireBtnClick(userId, safeType)
}
function handleDeletesClick(ids: string[], safeType: string) {
  modalRef.value?.openSafeIsShow()
  modalRef.value?.comfiresBtnClick(ids, safeType)
}
</script>

<style scoped>
.userlist {
}
</style>
