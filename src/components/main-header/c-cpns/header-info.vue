<template>
  <div class="header-info">
    <!-- 操作 -->
    <div class="opration">
      <div class="fullScreen" @click="handleFullScreenClick">
        <el-tooltip
          effect="dark"
          :content="isFull ? '退出全屏' : '全屏'"
          placement="bottom"
        >
          <el-icon size="18" color="rgb(115, 135, 156)">
            <!-- 动态组件 -->
            <component :is="isFull ? 'SwitchButton' : 'FullScreen'"></component>
          </el-icon>
        </el-tooltip>
      </div>
      <div class="message">
        <el-badge is-dot class="item">
          <el-icon size="18" color="rgb(115, 135, 156)"><Message /></el-icon>
        </el-badge>
      </div>
    </div>

    <div class="info">
      <el-dropdown>
        <span class="user-info">
          <span class="headImg">
            <el-avatar :size="34" :src="userInfo.headPortrait" />
          </span>
          <span class="name">{{ userInfo.userName }}</span>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="handleExitClick">
              <el-icon><InfoFilled /></el-icon>
              <span> 退出登录 </span>
            </el-dropdown-item>
            <el-dropdown-item @click="handlelogoutClick">
              <el-icon><CircleCloseFilled /></el-icon>
              <span>注销登录</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
import { LOGIN_TOKEN, USERID } from '@/global/constance'
import router from '@/router'
import useLoginStore from '@/store/login/login'
import { localCache } from '@/utils/cache'
import { ElMessage } from 'element-plus'
import { ref } from 'vue'
import screenfull from 'screenfull'

const loginStore = useLoginStore()
const { userInfo } = loginStore

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

// 页面全屏
const isFull = ref<boolean>(false)
// let isFullscreen = ref(false)
function handleFullScreenClick() {
  isFull.value = !isFull.value
  if (!screenfull.isEnabled) {
    //浏览器是否允许全屏
    ElMessage({
      message: 'you browser can not work',
      type: 'warning'
    })
    return false
  }

  screenfull.toggle() //在全屏和非全屏之间切换
}
</script>

<style lang="less" scoped>
.header-info {
  display: flex;
  align-items: center;
}

.opration {
  margin-right: 14px;
  display: flex;
  margin-top: 5px;

  .fullScreen {
    margin-right: 15px;
    display: inline-block;
  }
  .message {
    display: inline-block;
  }
}

.info {
  .user-info {
    display: flex;
    align-items: center;
    cursor: pointer;

    .name {
      margin-left: 8px;
      font-size: 15px;
      font-weight: 15;
      color: rgb(113, 111, 116);
    }
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
