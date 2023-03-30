<template>
  <div class="login">
    <login-panel></login-panel>
  </div>
</template>

<script setup lang="ts">
import loginPanel from './c-cpns/login-panel.vue'
</script>

<style lang="less" scoped>
.login {
  display: flex;
  align-items: center;
  justify-content: center;
  // background: url('../../assets/img/login1.png');
  background: url('../../assets/img/login2.jpg');
  background-size: 90%;

  height: 100%;
  width: 100%;
}
</style>

