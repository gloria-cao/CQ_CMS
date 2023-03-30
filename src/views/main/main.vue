<template>
  <div class="main">
    <!-- <el-button @click="handleExitClick">退出登录</el-button>
    <el-button @click="handlelogoutClick">注销登录</el-button> -->
    <el-container class="main-contaniner">
      <el-aside width="230px">
        <main-menu />
      </el-aside>
      <el-container>
        <el-header>
          <main-header />
        </el-header>
        <el-main>Main</el-main>
        <el-footer>Footer</el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { LOGIN_TOKEN, USERID } from '@/global/constance'
import router from '@/router'
import useLoginStore from '@/store/login/login'
import { localCache } from '@/utils/cache'
import { reject } from 'lodash'

const loginStore = useLoginStore()

// 退出登录
function handleExitClick() {
  // 将缓存的数据全部清空
  localCache.removeCache(LOGIN_TOKEN)
  // 刷新当前页面
  // location.reload()
  router.push('/login')
}

// 注销登录
function handlelogoutClick() {
  var userId = +localCache.getCache(USERID)
  loginStore.accountLogoutAction(userId).then((res) => {
    ElMessage({
      message: '注销登录成功',
      type: 'success'
    })
  })
}
</script>

<style lang="less" scoped>
.main {
  height: 100%;
}

.main-contaniner {
  height: 100%;

  .el-aside {
    overflow-x: hidden;
    overflow-y: auto;
    // line-height: 200px;
    text-align: left;
    cursor: pointer;
    background-color: rgba(42, 63, 84, 1);
    transition: width 0.3s linear;
    scrollbar-width: none; /* firefox */
    -ms-overflow-style: none; /* IE 10+ */

    &::-webkit-scrollbar {
      display: none;
    }
  }
  .el-header {
    background-color: rgb(237, 237, 237);
  }

  .el-main {
    background-color: rgb(247, 247, 247);
  }

  .el-footer {
    background-color: rgb(255, 255, 255);
  }
}
</style>

