<template>
  <div class="merchantmanagetype">
    <page-search
      @query-click="handleQueryClick"
      :search-config="searchConfig"
      @reset-click="handleResetClick"
    />
    <page-content
      ref="contentRef"
      @delete-click="handleDeleteClick"
      :content-config="contentConfig"
      @modify-click="handleModifyInfoClick"
    />
    <page-modal :modal-config="modalConfig" ref="modalRef"></page-modal>
  </div>
</template>

<script setup lang="ts" name="merchantmanagetype">
import pageContent from '@/components/page-content/page-content.vue'
import pageSearch from '@/components/page-search/page-search.vue'
import pageModal from '@/components/page-modal/page-modal.vue'
import { ref } from 'vue'
import searchConfig from './config/search.config.ts'
import contentConfig from './config/content.config.ts'
import modalConfig from './config/modal.config'

//content
const contentRef = ref<InstanceType<typeof pageContent>>()
function handleQueryClick(formData: any) {
  contentRef.value?.fetchUsersListData(formData)
}
function handleResetClick() {
  contentRef.value?.fetchUsersListByPage()
}

// modal
const modalRef = ref<InstanceType<typeof pageModal>>()
function handleDeleteClick(
  pageName: string,
  safeType: string,
  usersId: number | string[]
) {
  modalRef.value?.openSafeIsShow(pageName, safeType, usersId)
}
// 修改用户数据
function handleModifyInfoClick(isNew: boolean, pageName: string, info: any) {
  modalRef.value?.modalModifyIsShow(isNew, pageName, info)
}
</script>

<style scoped>
.merchantmanagetype {
}
</style>
