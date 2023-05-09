<template>
  <div class="main-header">
    <div class="logo">
      <!-- <img class="logoImg" src="@/assets/img/logo.svg" alt="" /> -->
      <h3 class="title">QcQ后台管理系统</h3>
    </div>
    <!-- 展开图标 -->
    <div class="header-icon" @click="handleMenuIconClick">
      <el-tooltip
        effect="dark"
        :content="isFlod ? '展开' : '收起'"
        placement="bottom"
      >
        <el-icon size="20px" color="rgb(115, 135, 156)">
          <component :is="isFlod ? 'Expand' : 'Fold'"></component>
        </el-icon>
      </el-tooltip>
    </div>

    <!-- 刷新页面按钮 -->
    <div class="refresh" onclick="history.go(0)">
      <el-tooltip effect="dark" content="刷新" placement="bottom">
        <el-icon size="20px" color="rgb(115, 135, 156)"><Refresh /></el-icon>
      </el-tooltip>
    </div>

    <!-- 右边内容 -->
    <div class="content">
      <div class="breadcrumb">
        <header-crumb></header-crumb>
      </div>
      <div class="info">
        <header-info></header-info>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// 0.内部自定义事件
const emit = defineEmits(['foldChange'])

// 1.记录状态
const isFlod = ref(false)
function handleMenuIconClick() {
  // 2.内部改变状态
  isFlod.value = !isFlod.value

  // 3.子组件传递给父组件
  emit('foldChange', isFlod.value)
}
</script>

<style lang="less" scoped>
.main-header {
  display: flex;
  align-items: center;
  flex: 1;
  height: 100%;
  .logo {
    display: inline-block;
    height: 28px;
    padding: 15px 10px 25px 10px;
    margin-right: 55px;

    .logoImg {
      width: 30px;
      height: 30px;
      margin-left: 13px;
    }

    .title {
      display: inline-block;
      margin-top: 5px;
      margin-left: 7px;
    }
  }

  .menu-icon {
    display: flex;
    align-items: center;
    cursor: pointer;
  }

  .refresh {
    margin-left: 20px;
  }

  .content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 1;
    padding: 0 18px;
  }
}
.info {
  :global(.el-dropdown-menu__item) {
    line-height: 36px !important;
    padding: 6px 22px;
    cursor: pointer;
  }
}
</style>

