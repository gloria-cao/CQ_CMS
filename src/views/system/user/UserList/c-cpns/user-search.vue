<template>
  <div class="user-search">
    <!-- 搜索表单 -->
    <div class="formItem">
      <el-form label-width="80px" :model="searchForm" ref="formRef">
        <el-row :gutter="24">
          <el-col :span="8">
            <el-form-item label="用户名" prop="userName">
              <el-input
                v-model="searchForm.userName"
                placeholder="请输入查询用户名"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="身份证" prop="identityCard">
              <el-input
                v-model="searchForm.identityCard"
                placeholder="请输入查询身份证"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="电话号码" prop="userPhone">
              <el-input
                v-model="searchForm.userPhone"
                placeholder="请输入查询电话"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="状态" prop="status">
              <el-select
                v-model="searchForm.status"
                placeholder="请输入查询状态"
              >
                <el-option label="封禁" :value="0" />
                <el-option label="正常" :value="1" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="性别" prop="sex">
              <el-select v-model="searchForm.sex" placeholder="请输入查询性别">
                <el-option label="男" :value="1" />
                <el-option label="女" :value="0" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="创建时间" prop="createTime">
              <el-date-picker
                v-model="searchForm.createTime"
                placeholder="请输入创建时间"
                format="yyyy-MM-dd"
              />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <!-- 重置和搜索按钮 -->
    <div class="btns">
      <el-button type="primary" icon="Search" @click="handleSearchClick"
        >搜索</el-button
      >
      <el-button type="info" icon="Refresh" @click="handleResetClick"
        >重置</el-button
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ElForm } from 'element-plus'
import { onMounted, reactive, ref } from 'vue'

// 0.自定义事件
const emit = defineEmits(['queryClick', 'resetClick'])

// 1.定义form数据
const searchForm = reactive({
  userName: '',
  identityCard: '',
  userPhone: '',
  status: '',
  sex: '',
  createTime: ''
})

// 搜索按钮逻辑 重置按钮逻辑
// 需要在组件挂载后自动触发一次，这样就不需要user-content自动触发该函数了
onMounted(() => {
  emit('queryClick', searchForm)
})
function handleSearchClick() {
  emit('queryClick', searchForm)
}
const formRef = ref<InstanceType<typeof ElForm>>()
function handleResetClick() {
  formRef.value?.resetFields()
  emit('resetClick')
}
</script>

<style lang="less" scoped>
.user-search {
  background-color: #fff;
  padding: 20px;
  .el-form-item {
    padding: 10px 5px;
    margin-bottom: 0;
  }
  .btns {
    text-align: right;
    padding: 10px 25px 5px 0;
  }
}
:deep(.el-input__wrapper.is-focus) {
  --el-input-focus-border-color: rgb(206, 212, 218) !important;
}
// 修改时间选择中选中边框颜色
:deep(.el-date-editor.is-active) {
  --el-input-focus-border-color: rgb(206, 212, 218);
}

//
</style>

