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
    <el-dialog v-model="userBannedIsShow" title="封禁时间" width="30%">
      <!-- <el-input v-model="time" placeholder="请输入封禁时间"></el-input> -->
      <div class="bannedContent">
        <div class="typeStatus">
          <span>类型：</span>
          <el-radio-group
            v-model="typeStatus"
            @change="handleBannedTypeClick"
            class="ml-4"
          >
            <el-radio label="1" size="large">可选</el-radio>
            <el-radio label="2" size="large">永久</el-radio>
          </el-radio-group>
        </div>
        <div class="bannedData">
          <span>封禁时间：</span>
          <el-date-picker
            :disabled="disabledTime"
            v-model="time"
            type="date"
            placeholder="请选择封禁时间"
            size="small"
          />
        </div>
      </div>
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

    <!-- 修改新建用户信息 -->
    <el-dialog
      v-model="userModifyIsShow"
      :title="props.modalConfig.header?.title ?? '编辑数据'"
      :width="props.modalConfig.header?.width ?? '30%'"
    >
      <el-form :model="modalForm">
        <template v-for="item in props.modalConfig.modalList" :key="item.prop">
          <el-form-item v-bind="item">
            <template v-if="item.type === 'input'">
              <el-input
                v-model="modalForm[item.prop]"
                :placeholder="item.placeholder"
              ></el-input>
            </template>
          </el-form-item>
        </template>
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
import { gmtToSeconde } from '@/utils/format'
import type { FormInstance, FormRules } from 'element-plus'
import { ElNotification } from 'element-plus'
import { storeToRefs } from 'pinia'
import { computed, reactive, ref } from 'vue'

// 0.
interface IProps {
  modalConfig: {
    header?: {
      title?: string
      width?: string
    }
    modalList?: any[]
  }
}
const props = defineProps<IProps>()

// 1.删除
const openSafeVisible = ref(false)
const word = ref('')
const SAFETYPE = 'safeType'
const DUSERSID = 'dusersId'
const BUSERSID = 'busersId'
const UUSERSID = 'UusersId'
const UPUSERSID = 'UpusersId'
const OLDUSERINFO = 'oldUserInfo'
const PAGENAME = 'pageName'
const ISNEW = 'isNew'

// 1.1、二次认证弹出框是否显示
function openSafeIsShow(
  pageName: string,
  safeSting: string,
  idString: number | object
) {
  openSafeVisible.value = !openSafeVisible.value
  // 缓存本地
  localCache.setCache(SAFETYPE, safeSting)
  localCache.setCache(DUSERSID, idString)
  localCache.setCache(PAGENAME, pageName)
}

// 1.2封装多选单选删除操作
const mainStore = useMainStore()
const systemStore = useSystemStore()
function comfireBtnClick(idsString: number | string[]) {
  // 判断输入密码是否为空
  if (word.value === '') {
    ElNotification({
      title: 'Error',
      message: `请输入密码`,
      type: 'error'
    })
  } else {
    //2.1进行二次验证
    const password = word.value
    const safeType = localCache.getCache(SAFETYPE)
    const pageName = localCache.getCache(PAGENAME)

    console.log(typeof localCache.getCache(DUSERSID))

    // 区分操作
    if (
      safeType === 'user-delete' ||
      safeType === 'manage-delete' ||
      safeType === 'role-delete' ||
      safeType === 'batch-manage-delete' ||
      safeType === 'batch-user-delete'
    ) {
      // 删除 单选？多选？

      if (typeof localCache.getCache(DUSERSID) === 'number') {
        // 单选
        if (password) {
          const id = Number(localCache.getCache(DUSERSID))
          // 二次验证
          mainStore.postOpenSafeAction({ password, safeType }).then((res) => {
            // 关闭弹窗
            openSafeVisible.value = !openSafeVisible.value
            // 发送删除信息
            if (pageName === 'user') {
              const userId = id
              systemStore
                .postUserDeleteAction({ userId, safeType })
                .then((res) => {
                  // 将密码置为空
                  word.value = ''
                  // 删除本地缓存
                  localCache.removeCache(DUSERSID)
                  localCache.removeCache(SAFETYPE)
                })
            } else {
              systemStore.deletePageDeleteAction(pageName, id).then((res) => {
                // 将密码置为空
                word.value = ''
                // 删除本地缓存
                localCache.removeCache(DUSERSID)
                localCache.removeCache(SAFETYPE)
              })
            }
          })
        }
      } else if (typeof localCache.getCache(DUSERSID) === 'object') {
        // 多选
        if (password) {
          const ids = localCache.getCache(DUSERSID)
          mainStore.postOpenSafeAction({ password, safeType }).then((res) => {
            openSafeVisible.value = !openSafeVisible.value
            if (pageName === 'user') {
              systemStore
                .postUsersDeleteAction({ ids, safeType })
                .then((res) => {
                  localCache.removeCache(DUSERSID)
                  word.value = ''
                  localCache.removeCache(DUSERSID)
                  localCache.removeCache(SAFETYPE)
                })
            } else {
              systemStore.deletePagesDeleteAction(pageName, ids).then((res) => {
                localCache.removeCache(DUSERSID)
                word.value = ''
                localCache.removeCache(DUSERSID)
                localCache.removeCache(SAFETYPE)
              })
            }
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
            word.value = ''
            localCache.removeCache(SAFETYPE)
          })
        })
      }
    }
  }
}

// 2.用户封禁
const userBannedIsShow = ref(false)
const time = ref('')
const typeStatus = ref('1')
const disabledTime = ref<boolean>(false)
function modalBannedIsShow(usersId: number | number[]) {
  userBannedIsShow.value = !userBannedIsShow.value
  localCache.setCache(BUSERSID, usersId)
}
// 选择封禁时间
function handleBannedTypeClick() {
  if (typeStatus.value === '1') {
    disabledTime.value = false
  } else {
    disabledTime.value = true
  }
}
function bannedComfireBtnClick() {
  // 自定义封禁时间
  if (typeStatus.value === '1') {
    // 将时间进行处理
    const bannedTime = Number(gmtToSeconde(time.value))
    const id = localCache.getCache(BUSERSID)
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
          // if (bannedmsg.value === '批量用户列表中含有已被封禁的用户') {
          //   ElNotification({
          //     message: '批量用户列表中含有已被封禁的用户,请重新选择',
          //     type: 'warning'
          //   })
          // }
        })
    }
  } else if (typeStatus.value === '2') {
    // 永久封禁
    const id = localCache.getCache(BUSERSID)
    const bannedTime = -1
    systemStore.postUserBannedAction({ id, bannedTime }).then((res) => {
      time.value = ''
      userBannedIsShow.value = !userBannedIsShow.value
      localCache.removeCache(BUSERSID)
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
          ElNotification({ message: '修改密码成功', type: 'success' })
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

// 定义form数据
// 编辑用户数据
const initialForm: any = {}
if (props.modalConfig.modalList) {
  for (const item of props.modalConfig.modalList) {
    initialForm[item.prop] = item.initialForm ?? ''
  }
}
// 新建用户数据
const initialNewForm: any = {}
if (props.modalConfig.modalList) {
  for (const item of props.modalConfig.modalList) {
    if (item.type !== 'id') {
      initialNewForm[item.prop] = item.initialNewForm ?? ''
    }
  }
}
let modalForm = reactive(initialForm)

const userModifyIsShow = ref(false)
function modalModifyIsShow(isNew: boolean, pageName: string, info?: any) {
  userModifyIsShow.value = !userModifyIsShow.value
  localCache.setCache(OLDUSERINFO, info)
  localCache.setCache(PAGENAME, pageName)
  localCache.setCache(ISNEW, isNew)
  if (!isNew) {
    // 数据回显
    for (const key in modalForm) {
      modalForm[key] = info[key]
    }
  } else {
    modalForm = reactive(initialNewForm)
  }
}
function modifyComfireBtnClick() {
  // 点击确认按钮
  const oldModifyForm = localCache.getCache(OLDUSERINFO)
  const pageName = localCache.getCache(PAGENAME)
  const isNew = Boolean(localCache.getCache(ISNEW))
  // 编辑操作
  if (!isNew) {
    // 将改变的数据收集起来发送给服务器
    const userInfo: any = {}
    const indexId = ref(true)
    for (const key in modalForm) {
      // 让表格中的第一个数据写入
      if (indexId.value) {
        userInfo[key] = modalForm[key]
        indexId.value = false
      }
      // 改变数据
      if (modalForm[key] != oldModifyForm[key]) {
        userInfo[key] = modalForm[key]
      }
    }
    // 发送网络请求，刚刚新增的数据无法进行修改，没有id
    systemStore.putInfoModifyAction(pageName, userInfo).then((res) => {
      userModifyIsShow.value = !userModifyIsShow.value
      localCache.removeCache(OLDUSERINFO)
    })
    localCache.removeCache(ISNEW)
  } else {
    // 发送网络请求
    systemStore.postNewInfoAction(pageName, modalForm).then((res) => {
      userModifyIsShow.value = !userModifyIsShow.value
      // 将数据变回编辑的form，不然编辑操作无法拿到id
      modalForm = reactive(initialForm)
    })
    localCache.removeCache(ISNEW)
  }
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
  .bannedContent {
    text-align: center;

    .typeStatus {
      margin-bottom: 20px;
    }
  }
}
</style>
