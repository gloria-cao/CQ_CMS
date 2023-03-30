
<template>
  <div class="main-menu">
    <div class="logo">
      <img class="logoImg" src="@/assets/img/logo.svg" alt="" />
      <h3 class="title">QcQ后台管理系统</h3>
    </div>
    <div class="userInfo">
      <el-avatar class="headImg" :size="60" :src="userInfo.headPortrait" />
      <div class="right">
        <div class="top">欢迎使用,</div>
        <div class="userName">{{ userInfo.userName }}</div>
      </div>
    </div>

    <!-- 菜单 -->
    <div class="menu">
      <el-menu
        default-active="userList"
        class="el-menu-vertical-demo"
        background-color="rgb(42, 63, 84)"
        active-text-color="rgb(242, 245, 247)"
        text-color="rgba(231, 231, 231, 0.5)"
      >
        <template v-for="item in menuList" :key="item.name">
          <el-sub-menu :index="(item as any).name">
            <template #title>
              <!-- 图标采用动态组件component -->
              <el-icon>
                <component :is="(item as any).meta.icon"></component>
              </el-icon>
              <span>{{ (item as any).meta.title }}</span>
            </template>
            <template
              v-for="subitem in (item as any).children"
              :key="subitem.name"
            >
              <el-menu-item :index="subitem.name">
                <el-icon>
                  <component :is="subitem.meta.icon"></component>
                </el-icon>
                <span>{{ subitem.meta.title }}</span>
              </el-menu-item>
            </template>
          </el-sub-menu>
        </template>
      </el-menu>
    </div>
  </div>
</template>

<script setup lang="ts">
import useLoginStore from '@/store/login/login'
import type { IMenuList } from '@/store/login/types/login'

// 设置头像
const loginStore = useLoginStore()
const { userInfo, menuList } = loginStore
console.log(menuList)
</script>

<style lang="less" scoped>
.main-menu {
  .logo {
    height: 28px;
    padding: 15px 10px 25px 10px;

    .logoImg {
      width: 30px;
      height: 30px;
      margin-left: 13px;
    }

    .title {
      display: inline-block;
      margin-top: 5px;
      margin-left: 7px;
      font-family: fangsong;
      color: rgb(231, 231, 231);
    }
  }

  .userInfo {
    padding: 10px 0px 0px 30px;

    .right {
      display: inline-block;
      margin-left: 20px;
      margin-bottom: 9px;
      font-family: fangsong;

      .top {
        margin-bottom: 16px;
        color: rgba(231, 231, 231, 0.5);
      }

      .userName {
        color: rgba(231, 231, 231, 0.9);
      }
    }
  }
}

.el-menu {
  border-right: none;
  user-select: none;
  font-weight: 700;

  .el-menu:hover {
    background-color: rgb(49, 68, 86) !important;
  }

  .el-sub-menu {
    .el-menu-item {
      padding-left: 50px !important;
      background-color: rgb(42, 63, 84);
      font-weight: 500;
    }

    .el-menu-item:hover {
      color: rgb(242, 245, 247);
      background-color: rgb(53, 73, 93);
    }

    .el-menu-item.is-active {
      background-color: rgb(55, 74, 94);
    }
  }
}
</style>

