<template>
  <div class="main-header">
    <!-- 展开图标 -->
    <div class="header-icon">
      <el-icon size="28px" color="rgb(115, 135, 156)"><Fold /></el-icon>
    </div>

    <!-- 右边内容 -->
    <div class="content">
      <div class="breadcrumb">面包屑</div>
      <div class="info">
        <header-info></header-info>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

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
</style>

