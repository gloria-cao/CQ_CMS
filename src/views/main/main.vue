<template>
  <div class="main">
    <!-- <el-button @click="handleExitClick">退出登录</el-button>
    <el-button @click="handlelogoutClick">注销登录</el-button> -->
    <el-container class="main-contaniner">
      <el-aside :width="isFlod ? '60px' : '230px'">
        <main-menu :is-fold="isFlod" />
      </el-aside>
      <el-container>
        <el-header>
          <main-header @fold-change="handleFoldChange" />
        </el-header>
        <el-main>
          <!-- 占位 -->
          <router-view></router-view>
        </el-main>
        <el-footer>
          <main-footer></main-footer>
        </el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
// import adminUser from '../system/adminUser/AdminUser/adminUser.vue'
import { ref } from 'vue'

// 记录菜单折叠状态
const isFlod = ref(false)
function handleFoldChange(flag: boolean) {
  // 将子组件传来的isflod赋值给父组件定义的isflod
  isFlod.value = flag
  console.log(isFlod + 'aside')
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
    // transition: width 0.3s linear;
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
    height: 30px;
  }
}
</style>

