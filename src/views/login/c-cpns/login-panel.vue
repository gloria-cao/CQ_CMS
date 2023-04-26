<template>
  <div class="login-panel">
    <!-- 头部 -->
    <h1 class="title">欢迎使用</h1>
    <el-divider>
      <span>请输入账号信息</span>
    </el-divider>

    <!-- 中间部分 -->
    <pane-account ref="accountRef" />
    <!-- 是否记住密码 -->
    <div class="control">
      <el-checkbox
        v-model="isRemPsw"
        label="记住密码"
        size="large"
      ></el-checkbox>
      <el-link class="forget" type="primary" :underline="false"
        >忘记密码</el-link
      >
    </div>

    <!-- 尾部 -->
    <div>
      <el-button
        class="login-btn"
        type="primary"
        size="large"
        @click="handleLoginClick"
        >立即登录</el-button
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { ISREMPWD } from '@/global/constance'
import { localCache } from '@/utils/cache'
import { ref, watch } from 'vue'
import paneAccount from './pane-account.vue'

// 是否记住密码(需要传到子组件中)
const isRemPsw = ref<boolean>(localCache.getCache(ISREMPWD) ?? false)
// 实时拿到isRemPwd的值
watch(isRemPsw, (newValue) => {
  localCache.setCache(ISREMPWD, newValue)
})

// localCache.setCache(ISREMPWD, isRemPsw.value)
const accountRef = ref<InstanceType<typeof paneAccount>>()

// 立即登录按钮点击
// const loginStore = useLoginStore()
const handleLoginClick = async () => {
  // 发送网络请求
  // loginStore.accountLoginAction(account)
  // 1.获取子组件实例
  // 2.调用子组件方法
  accountRef.value?.loginAction(isRemPsw)
}
</script>

<style lang="less" scoped>
.login-panel {
  width: 330px;
  margin-bottom: 150px;
  .title {
    color: rgb(64, 158, 255);
    text-align: center;
    font-size: 30px;
    font-family: SimHei;
  }

  .control {
    display: flex;
    align-content: center;
    justify-content: space-around;
  }

  .login-btn {
    margin-top: 10px;
    width: 100%;

    --el-button-size: 40px;
    border-radius: 9px;
  }
}
</style>
