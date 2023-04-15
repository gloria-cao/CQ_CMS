<template>
  <div class="user-modal">
    <!-- 删除弹出框 -->
    <el-dialog
      v-model="openSafeVisible"
      title="请输入账户密码进行确认"
      width="30%"
      draggable
    >
      <el-input
        v-model="word"
        placeholder="请输入密码"
        show-password
      ></el-input>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="openSafeVisible = false">取消</el-button>
          <el-button type="primary" @click="comfireBtnClick"> 确认 </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import useMainStore from '@/store/main/main'
import useSystemStore from '@/store/main/system/system'
import { localCache } from '@/utils/cache'
import { main } from '@popperjs/core'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
// 自定义组件

const openSafeVisible = ref(false)
const word = ref('')
const SAFETYPE = 'safeType'
const USERSID = 'usersId'
// 1、二次认证弹出框是否显示
function openSafeIsShow(safeSting: string, idString: number | object) {
  openSafeVisible.value = !openSafeVisible.value
  // 缓存本地
  localCache.setCache(SAFETYPE, safeSting)
  localCache.setCache(USERSID, idString)
}

const mainStore = useMainStore()
const systemStore = useSystemStore()
function comfireBtnClick(idsString: number | string[]) {
  //2.1进行二次验证
  const password = word.value
  const safeType = localCache.getCache(SAFETYPE)
  // 区分单选还是多选
  if (typeof localCache.getCache(USERSID) === 'number') {
    // 单选
    if (password) {
      const userId = localCache.getCache(USERSID)
      // 二次验证
      mainStore.postOpenSafeAction({ password, safeType }).then((res) => {
        // 关闭弹窗
        openSafeVisible.value = !openSafeVisible.value
        // 发送删除信息
        systemStore.postUserDeleteAction({ userId, safeType }).then((res) => {
          // 弹出删除成功信息框
          ElMessage({ message: '单条数据删除成功', type: 'success' })
          // 将密码置为空
          word.value = ''
          // 删除本地缓存
          localCache.removeCache(USERSID)
          localCache.removeCache(SAFETYPE)
        })
      })
    }
  } else if (typeof localCache.getCache(USERSID) === 'object') {
    // 多选
    if (password) {
      const ids = localCache.getCache(USERSID)
      mainStore.postOpenSafeAction({ password, safeType }).then((res) => {
        openSafeVisible.value = !openSafeVisible.value
        systemStore.postUsersDeleteAction({ ids, safeType }).then((res) => {
          localCache.removeCache(USERSID)
          ElMessage({ message: '多条数据删除成功', type: 'success' })
          word.value = ''
          localCache.removeCache(USERSID)
          localCache.removeCache(SAFETYPE)
        })
      })
    }
  }
}
// function comfireBtnClick(userIds: string, safe: string) {
//   // 1.进行二次验证
//   const password = word.value
//   // 因为只有点击的那一下有值导致输入password没有值，所以把数据存本地利用完后删除
//   const SAFETYPE = 'safeType'
//   const USERIDS = 'userIds'
//   localCache.setCache(SAFETYPE, safe)
//   localCache.setCache(USERIDS, userIds)

//   if (password) {
//     const safeType = localCache.getCache(SAFETYPE)
//     const userId = localCache.getCache(USERIDS)
//     // 删除单挑用户数据
//     mainStore.postOpenSafeAction({ password, safeType }).then((res) => {
//       // 关闭弹窗
//       openSafeVisible.value = !openSafeVisible.value
//       // 发送删除信息请求
//       systemStore.postUserDeleteAction({ userId, safeType })
//       // 删除本地缓存中该条数据
//       localCache.removeCache(SAFETYPE)
//       localCache.removeCache(USERIDS)
//       // 弹出删除成功信息框
//       ElMessage({ message: '删除成功', type: 'success' })
//       // 将密码设置为空
//       word.value = ''
//     })
//   }
// }
// function comfiresBtnClick(ids1: string[], safe: string) {
//   // 1.进行二次验证
//   const password = word.value
//   // 因为只有点击的那一下有值导致输入password没有值，所以把数据存本地利用完后删除

//   const IDS = 'usersIds'
//   const SAFETYPE = 'safeType'
//   localCache.setCache(IDS, ids1)
//   localCache.setCache(SAFETYPE, safe)
//   const ids = localCache.getCache(IDS)
//   const safeType = localCache.getCache(SAFETYPE)
//   console.log(word.value)

//   if (password) {
//     // 删除条用户数据
//     mainStore.postOpenSafeAction({ password, safeType }).then((res) => {
//       // 关闭弹窗
//       openSafeVisible.value = !openSafeVisible.value
//       // 发送删除信息请求
//       systemStore.postUsersDeleteAction({ ids, safeType })
//       console.log({ ids, safeType })

//       // 删除本地缓存中该条数据
//       localCache.removeCache(IDS)
//       // 弹出删除成功信息框
//       ElMessage({ message: '删除成功', type: 'success' })
//       // 将密码设置为空
//       word.value = ''
//     })
//   }
// }

// 2、多选单选操作的封装

defineExpose({ openSafeIsShow, comfireBtnClick })
</script>

<style lang="less" scoped>
.user-modal {
  color: red;
}
</style>

