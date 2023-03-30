<template>
  <div class="header-info">
    <el-avatar class="headImg" :size="40" :src="userInfo.headPortrait" />
  </div>

  <span class="userName">{{ userInfo.userName }}</span>
</template>

<script setup lang="ts">
import useLoginStore from '@/store/login/login'

const loginStore = useLoginStore()
const { userInfo } = loginStore
</script>

<style lang="less" scoped>
</style>
