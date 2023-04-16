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
          <el-button type="primary" @click="deleteComfireBtnClick">
            确认
          </el-button>
        </span>
      </template>
    </el-dialog>

    <!-- 封禁弹出框 -->
    <el-dialog
      v-model="userBannedIsShow"
      title="请输入封禁时间(单位：s)"
      width="30%"
    >
      <el-input v-model="time" placeholder="请输入封禁时间"></el-input>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="userBannedIsShow = false">取消</el-button>
          <el-button type="primary" @click="bannedComfireBtnClick">
            确认
          </el-button>
        </span>
      </template>
    </el-dialog>

    <!-- 解封弹出框 -->
    <el-dialog v-model="userUntieDisableIsShow" title="Tips" width="30%">
      <span>是否对该用户进行解封</span>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="userUntieDisableIsShow = false">取消</el-button>
          <el-button type="primary" @click="untieDisabledBtnClick">
            确认
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import useMainStore from '@/store/main/main'
import useSystemStore from '@/store/main/system/system'
import { localCache } from '@/utils/cache'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'

// 1.删除
const openSafeVisible = ref(false)
const word = ref('')
const SAFETYPE = 'safeType'
const DUSERSID = 'dusersId'
const BUSERSID = 'busersId'
const UUSERSID = 'UusersId'

// 1.1、二次认证弹出框是否显示
function openSafeIsShow(safeSting: string, idString: number | object) {
  openSafeVisible.value = !openSafeVisible.value
  // 缓存本地
  localCache.setCache(SAFETYPE, safeSting)
  localCache.setCache(DUSERSID, idString)
}
const mainStore = useMainStore()
const systemStore = useSystemStore()
// 1.2封装多选单选删除操作
function deleteComfireBtnClick(idsString: number | string[]) {
  //2.1进行二次验证
  const password = word.value
  const safeType = localCache.getCache(SAFETYPE)
  // 区分单选还是多选
  if (typeof localCache.getCache(DUSERSID) === 'number') {
    // 单选
    if (password) {
      const userId = localCache.getCache(DUSERSID)
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
          localCache.removeCache(DUSERSID)
          localCache.removeCache(SAFETYPE)
        })
      })
    }
  } else if (typeof localCache.getCache(DUSERSID) === 'object') {
    // 多选
    if (password) {
      const ids = localCache.getCache(DUSERSID)
      mainStore.postOpenSafeAction({ password, safeType }).then((res) => {
        openSafeVisible.value = !openSafeVisible.value
        systemStore.postUsersDeleteAction({ ids, safeType }).then((res) => {
          localCache.removeCache(DUSERSID)
          ElMessage({ message: '多条数据删除成功', type: 'success' })
          word.value = ''
          localCache.removeCache(DUSERSID)
          localCache.removeCache(SAFETYPE)
        })
      })
    }
  }
}

// 2.用户封禁
const userBannedIsShow = ref(false)
const time = ref('')
const { bannedmsg } = storeToRefs(systemStore)
function modalBannedIsShow(usersId: number | number[]) {
  userBannedIsShow.value = !userBannedIsShow.value
  localCache.setCache(BUSERSID, usersId)
}
function bannedComfireBtnClick() {
  const id = localCache.getCache(BUSERSID)
  const bannedTime = Number(time.value)
  if (typeof id === 'number' && bannedTime) {
    // 单个封禁
    systemStore.postUserBannedAction({ id, bannedTime }).then((res) => {
      time.value = ''
      userBannedIsShow.value = !userBannedIsShow.value
      localCache.removeCache(BUSERSID)
    })
  } else if (typeof id === 'object' && bannedTime) {
    // 批量封禁
    const userIdList = id
    systemStore
      .postUsersBannedAction({ userIdList, bannedTime })
      .then((res) => {
        time.value = ''
        userBannedIsShow.value = !userBannedIsShow.value
        localCache.removeCache(BUSERSID)
        if (bannedmsg.value === '批量用户列表中含有已被封禁的用户') {
          ElMessage({
            message: '批量用户列表中含有已被封禁的用户,请重新选择',
            type: 'warning'
          })
        }
      })
  }
}

// 3.用户解封
const userUntieDisableIsShow = ref(false)
function modalUntieDisabledIsShow(UuserId: number | number[]) {
  userUntieDisableIsShow.value = !userUntieDisableIsShow.value
  localCache.setCache(UUSERSID, UuserId)
}
function untieDisabledBtnClick() {
  const userId = localCache.getCache(UUSERSID)
  console.log('解封操作' + typeof userId)
  if (typeof userId === 'number') {
    // 单个解封
    systemStore.postUserUntieDisableAction(userId).then((res) => {
      userUntieDisableIsShow.value = !userUntieDisableIsShow.value
      localCache.removeCache(UUSERSID)
    })
  } else if (typeof userId === 'object') {
    // 批量解封
    systemStore.postUsersUntieDisableAction(userId).then((res) => {
      userUntieDisableIsShow.value = !userUntieDisableIsShow.value
      localCache.removeCache(UUSERSID)
    })
  }
}

defineExpose({
  openSafeIsShow,
  deleteComfireBtnClick,
  modalBannedIsShow,
  bannedComfireBtnClick,
  modalUntieDisabledIsShow,
  untieDisabledBtnClick
})
</script>

<style lang="less" scoped>
.user-modal {
  color: red;
}
</style>

