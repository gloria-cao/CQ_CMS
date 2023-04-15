<template>
  <div class="header-crumb">
    <el-breadcrumb separator="/">
      <template v-for="item in breadcrumbs" :key="item.name">
        <el-breadcrumb-item :to="item.path">{{ item.name }}</el-breadcrumb-item>
      </template>
    </el-breadcrumb>
  </div>
</template>

<script setup lang="ts">
import useLoginStore from '@/store/login/login'
import { mapPathToBreadcrumbs } from '@/utils/map-menus'
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const loginStore = useLoginStore()
const { menuList } = loginStore
// setup只执行一次，所以要用计算属性监听最新的值，然后发生改变
const breadcrumbs = computed(() => {
  return mapPathToBreadcrumbs(route.path, menuList)
})
</script>

<style lang="less" scoped>
.header-crumb {
  color: red;
}
</style>

