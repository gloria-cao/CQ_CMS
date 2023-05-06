<template>
  <div class="pane-account">
    <!-- 中间 -->
    <div class="tabs">
      <el-form
        label-width="70px"
        :model="account"
        :rules="accountRules"
        status-icon
        ref="formRef"
      >
        <el-form-item label="帐号：" prop="userName">
          <el-input
            v-model="account.userName"
            placeholder="请输入账户"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码：" prop="password">
          <el-input
            v-model="account.password"
            placeholder="请输入密码"
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item label="验证码: " prop="code">
          <el-input
            v-model="account.code"
            placeholder="请输入验证码"
          ></el-input>
          <img
            @click="handleCodeClick"
            class="codeImg"
            :src="verifyCode"
            alt=""
          />
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { storeToRefs } from 'pinia'
import type { IAcount } from '@/types'
import useLoginStore from '@/store/login/login'
import type { ElForm, FormRules } from 'element-plus'
import { ElNotification } from 'element-plus'
import { localCache } from '@/utils/cache'
import { ISREMPWD, USERNAME, PASSWORD } from '@/global/constance'

// 定义account数据类型
const account = reactive<IAcount>({
  userName: localCache.getCache(USERNAME) ?? '',
  password: localCache.getCache(PASSWORD) ?? '',
  code: ''
})

// 表单校验规则
const accountRules = reactive<FormRules>({
  userName: [
    { required: true, message: '请输入当前帐户名', trigger: 'blur' },
    {
      pattern: /^[a-z0-9]{3,8}$/,
      message: '必须是3-8位数字或字母组成',
      trigger: 'blur'
    }
  ],
  password: [
    { required: true, message: '请输入当前账户密码', trigger: 'blur' },
    {
      pattern: /^[a-z0-9]{3,8}$/,
      message: '必须是3-8位数字或字母组成',
      trigger: 'blur'
    }
  ],
  code: [{ required: true, message: '请输入验证码', trigger: 'blur' }]
})

// 获取验证码
const loginStore = useLoginStore()
// 一进入该页面就发送网络请求获取验证码
loginStore.getVrifyCodeAction()
// 保存数据并对数据进行展示，异步请求可能数据还没有展示就结束了，所以需要响应式数据
const { verifyCode, loginMsg } = storeToRefs(loginStore)

// 监听验证码的点击
function handleCodeClick() {
  loginStore.getVrifyCodeAction()
}

// 执行账号登录逻辑，并暴露给父组件
const formRef = ref<InstanceType<typeof ElForm>>()
function loginAction(isRemPsw: boolean) {
  // 再点击登录按钮时，验证数据是否符合规范
  formRef.value?.validate((valid) => {
    if (valid) {
      // 登陆成功
      // 获取用户输入的账户密码和验证码
      const userName = account.userName
      const password = account.password
      const code = account.code

      loginStore
        .accountLoginAction({ userName, password, code })
        .then((res) => {
          // 勾选记住密码，将账户密码把保存至本地缓存中
          if (isRemPsw.value) {
            localCache.setCache(USERNAME, userName),
              localCache.setCache(PASSWORD, password)
          } else {
            // 反之则把账号密码在缓存中清理出去
            localCache.removeCache(USERNAME)
            localCache.removeCache(PASSWORD)
            localCache.removeCache(ISREMPWD)
          }

          // 登录过程中的提示框
          // if (
          //   loginMsg.value === '用户名不存在或密码错误' ||
          //   loginMsg.value === '验证码过期/不存在'
          // ) {
          //   // ElNotification({
          //   //   title: 'Error',
          //   //   message: `${loginMsg.value}`,
          //   //   type: 'error'
          //   // })
          // } else {
          //   ElNotification({
          //     title: 'Success',
          //     message: `${loginMsg.value}`,
          //     type: 'success'
          //   })
          // }
        })
    } else {
      // 登陆失败, 信息未填完
      ElNotification({
        title: 'Error',
        message: `抱歉，请输入正确的帐号信息！`,
        type: 'error'
      })
    }
  })
}

defineExpose({
  loginAction
})
</script>

<style lang="less" scoped>
.tabs {
  margin-top: 20px;
}

.codeImg {
  margin-top: 10px;
  height: 30px;
}
</style>
