<template>
  <div class="userlist">
    <page-search
      @query-click="handleQueryClick"
      @reset-click="handleResetClick"
      :search-config="searchConfig"
    ></page-search>
    <page-content
      ref="contentRef"
      @delete-click="handleDeleteClick"
      @modify-click="handleModifyInfoClick"
      @reset-pwd-click="handleResetPwdClick"
      @update-pwd-click="handleUpdatePwdClick"
      @banned-time-click="handleBannedTimeClick"
      :content-config="contentConfig"
    >
      <!-- 自定义插槽内容 -->
      <!-- 用户基本信息 -->
      <template #userInfo="row">
        <div class="userInfo">
          <el-avatar :size="40" :src="row.headPortrait" />
          <div class="info">
            <div class="title">
              {{ row.userName }}
              <el-button
                size="small"
                text
                :type="row.sex ? 'primary' : 'danger'"
                :icon="row.sex ? 'Male' : 'Female'"
              ></el-button>
            </div>
            <div class="nickName">昵称：{{ row.nickName }}</div>
          </div>
        </div>
      </template>
      <!-- 用户状态 -->
      <template #status="row">
        <div class="status">
          <el-button
            size="small"
            :type="row.status ? 'success' : 'danger'"
            plain
            @click="handleBannedTimeClick(row.userId, row.status)"
            >{{ row.status ? '正常' : '封禁' }}</el-button
          >
        </div>
      </template>
    </page-content>
    <page-modal :modal-config="modalConfig" ref="modalRef"></page-modal>
  </div>
</template>

<script setup lang="ts" name="userlist">
import pageContent from '@/components/page-content/page-content.vue'
import pageSearch from '@/components/page-search/page-search.vue'
import pageModal from '@/components/page-modal/page-modal.vue'
import searchConfig from './config/search.config.ts'
import contentConfig from './config/content.config.ts'
import modalConfig from './config/modal.config.ts'

import { ref } from 'vue'

// 对content组件进行操作 查询、重数据；置重置、修改密码
const contentRef = ref<InstanceType<typeof pageContent>>()
function handleQueryClick(formData: any) {
  contentRef.value?.fetchUsersListData(formData)
}
function handleResetClick() {
  contentRef.value?.fetchUsersListByPage()
}
function handleResetPwdClick(
  pageName: string,
  safeType: string,
  userId: number
) {
  modalRef.value?.openSafeIsShow(pageName, safeType, userId)
}
function handleUpdatePwdClick(userId: number) {
  console.log(userId)
  modalRef.value?.modalUpdatePwdIsShow(userId)
}

// 对modal组件进行操作
// 删除 采用用联合类型进行区分，typof进行类型缩小,可在后面完成
const modalRef = ref<InstanceType<typeof pageModal>>()
function handleDeleteClick(
  pageName: string,
  safeType: string,
  usersId: number | string[]
) {
  modalRef.value?.openSafeIsShow(pageName, safeType, usersId)
}
// 修改用户数据
function handleModifyInfoClick(isNew: boolean, pageName: string, info?: any) {
  modalRef.value?.modalModifyIsShow(isNew, pageName, info)
  console.log(info)
}

// 自定义组件
// 是否封禁账户
function handleBannedTimeClick(usersId: number | number[], status: number) {
  if (status) {
    modalRef.value?.modalBannedIsShow(usersId)
  } else if (!status) {
    modalRef.value?.modalUntieDisabledIsShow(usersId)
  }
}
</script>

<style scoped>
.info {
  display: inline-block;
  margin-left: 10px;
  text-align: left;
  .title {
    font-size: 14px;
    font-weight: 1000;
  }
  .nickName {
    font-size: 4px;
    color: rgb(164, 161, 161);
  }
}

.demo-basic {
  text-align: center;
}
</style>
