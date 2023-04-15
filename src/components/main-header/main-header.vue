<template>
  <div class="main-header">
    <!-- 展开图标 -->
    <div class="header-icon" @click="handleMenuIconClick">
      <el-icon size="28px" color="rgb(115, 135, 156)">
        <component :is="isFlod ? 'Expand' : 'Fold'"></component>
      </el-icon>
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

  .menu-icon {
    display: flex;
    align-items: center;
    cursor: pointer;
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

