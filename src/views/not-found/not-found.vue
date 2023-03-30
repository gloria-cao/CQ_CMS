<template>
  <div class="not-found">
    <img src="../../assets/img/not-found.png" />
    <span class="title">无法找到当前页面，请联系相关技术人员~</span>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="less" scoped>
.not-found {
  img {
    width: 100%;
    // height: 100%;
    object-fit: fill;
  }

  .title {
    color: blue;
    position: absolute;
    top: 0;
    left: 0;
    font-size: 50px;
  }
}
</style>
