<template>
  <div class="user-modal">
    <!-- 二次验证弹出框 -->
    <el-dialog
      v-model="openSafeVisible"
      title="请输入账户密码进行确认操作"
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

    <!-- 修改密码弹出框 -->
    <el-dialog
      v-model="updatePwdVisible"
      title="请输入账户密码进行确认操作"
      width="30%"
      draggable
    >
      <el-form
        ref="rulePwdRef"
        status-icon
        :model="password"
        :rules="userListrules"
      >
        <el-form-item label="用户旧密码：" prop="oldPassword">
          <el-input
            v-model="password.oldPassword"
            placeholder="请输入旧密码"
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item label="用户新密码：" prop="newPassword">
          <el-input
            v-model="password.newPassword"
            placeholder="请输入新密码"
            show-password
          ></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="updatePwdVisible = false">取消</el-button>
          <el-button type="primary" @click="updatePwdComfireBtnClick">
            确认
          </el-button>
        </span>
      </template>
    </el-dialog>

    <!-- 修改用户信息 -->
    <el-dialog v-model="userModifyIsShow" title="请修改用户的信息" width="30%">
      <el-form :model="modifyForm">
        <el-form-item label="用户名">
          <el-input v-model="modifyForm.userName" clearable></el-input>
        </el-form-item>
        <el-form-item label="头像">
          <el-input v-model="modifyForm.headPortrait" clearable></el-input>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="modifyForm.userPhone" clearable></el-input>
        </el-form-item>
        <el-form-item label="昵称">
          <el-input v-model="modifyForm.nickName" clearable></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-select v-model="modifyForm.sex">
            <el-option label="男" :value="1" />
            <el-option label="女" :value="0" />
          </el-select>
        </el-form-item>
        <el-form-item label="身份证">
          <el-input v-model="modifyForm.identityCard" clearable></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="userModifyIsShow = false">取消</el-button>
          <el-button type="primary" @click="modifyComfireBtnClick">
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
import type { FormInstance, FormRules } from 'element-plus'
import { storeToRefs } from 'pinia'
import { reactive, ref } from 'vue'

// 1.删除
const openSafeVisible = ref(false)
const word = ref('')
const SAFETYPE = 'safeType'
const DUSERSID = 'dusersId'
const BUSERSID = 'busersId'
const UUSERSID = 'UusersId'
const UPUSERSID = 'UpusersId'
const OLDUSERINFO = 'oldUserInfo'

// 1.1、二次认证弹出框是否显示
function openSafeIsShow(safeSting: string, idString: number | object) {
  openSafeVisible.value = !openSafeVisible.value
  // 缓存本地
  localCache.setCache(SAFETYPE, safeSting)
  localCache.setCache(DUSERSID, idString)
}

// 1.2封装多选单选删除操作
const mainStore = useMainStore()
const systemStore = useSystemStore()
function comfireBtnClick(idsString: number | string[]) {
  //2.1进行二次验证
  const password = word.value
  const safeType = localCache.getCache(SAFETYPE)
  // 区分操作
  if (safeType === 'user-delete') {
    // 删除 单选？多选？
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
  } else if (safeType === 'reset-password') {
    const userId = localCache.getCache(DUSERSID)
    if (typeof userId === 'number') {
      // 二次验证
      mainStore.postOpenSafeAction({ safeType, password }).then((res) => {
        openSafeVisible.value = !openSafeVisible.value
        systemStore.postUserResetPwdAction(userId).then((res) => {
          ElMessage({ message: '重置密码成功', type: 'success' })
          word.value = ''
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

// 4.修改用户密码
const updatePwdVisible = ref(false)
const password = ref({
  newPassword: '',
  oldPassword: ''
})
const rulePwdRef = ref<FormInstance>()
const userListrules = reactive<FormRules>({
  oldPassword: [
    { required: true, message: '请输入用户旧密码', trigger: 'blur' }
  ],
  newPassword: [
    { required: true, message: '请输入用户新密码', trigger: 'blur' }
  ]
})
function modalUpdatePwdIsShow(userId: number) {
  updatePwdVisible.value = !updatePwdVisible.value
  localCache.setCache(UPUSERSID, userId)
}
function updatePwdComfireBtnClick() {
  const userId = localCache.getCache(UPUSERSID)
  rulePwdRef.value?.validate((valid) => {
    if (valid) {
      // 验证成功
      const { newPassword, oldPassword } = password.value
      systemStore
        .postUserUpdatePwdAction({ userId, newPassword, oldPassword })
        .then((res) => {
          updatePwdVisible.value = !updatePwdVisible.value
          ElMessage({ message: '修改密码成功', type: 'success' })
          localCache.removeCache(UPUSERSID)
          password.value.newPassword = ''
          password.value.oldPassword = ''
        })
    } else {
      // 验证失败
      return false
    }
  })
}

// 编辑用户信息
const modifyForm = reactive<any>({
  userName: '',
  headPortrait: '',
  userPhone: '',
  nickName: '',
  sex: '',
  identityCard: ''
})
const userModifyIsShow = ref(false)
function modalModifyIsShow(userInfo: any) {
  userModifyIsShow.value = !userModifyIsShow.value
  localCache.setCache(OLDUSERINFO, userInfo)
  // 数据回显
  for (const key in modifyForm) {
    modifyForm[key] = userInfo[key]
  }
}
function modifyComfireBtnClick() {
  // 点击确认按钮
  const oldModifyForm = localCache.getCache(OLDUSERINFO)
  const userId = oldModifyForm.userId
  // 将改变的数据收集起来发送给服务器
  const userInfo: any = { userId: userId }
  for (const key in modifyForm) {
    if (modifyForm[key] != oldModifyForm[key]) {
      console.log(modifyForm[key] != oldModifyForm[key])
      userInfo[key] = modifyForm[key]
    }
  }
  // 发送网络请求
  systemStore.putUserInfoModifyAction(userInfo).then((res) => {
    userModifyIsShow.value = !userModifyIsShow.value
    localCache.removeCache(OLDUSERINFO)
    ElMessage({ message: '修改数据成功', type: 'success' })
  })
}

defineExpose({
  openSafeIsShow,
  comfireBtnClick,
  modalBannedIsShow,
  bannedComfireBtnClick,
  modalUntieDisabledIsShow,
  untieDisabledBtnClick,
  modalUpdatePwdIsShow,
  updatePwdComfireBtnClick,
  modalModifyIsShow
})
</script>

<style lang="less" scoped>
.user-modal {
  color: red;
}
</style>

