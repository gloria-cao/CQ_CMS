<template>
  <div class="user-search" :style="isFold ? 'height: 40px' : 'height: auto'">
    <!-- 搜索表单 -->
    <div class="formItem">
      <el-form
        :label-width="searchForm.labelWidth ?? '80px'"
        :model="searchForm"
        ref="formRef"
      >
        <el-row :gutter="20">
          <template v-for="item in searchConfig.formItems" :key="item.prop">
            <el-col :span="8">
              <el-form-item :label="item.label" :prop="item.prop">
                <template v-if="item.type === 'input'">
                  <el-input
                    size="small"
                    v-model="searchForm[item.prop]"
                    :placeholder="item.placeholder"
                  ></el-input>
                </template>
                <template v-if="item.type === 'date-picker'">
                  <el-date-picker
                    size="small"
                    v-model="searchForm[item.prop]"
                    :placeholder="item.placeholder"
                    format="yyyy-MM-dd"
                  />
                </template>
              </el-form-item>
            </el-col>
          </template>
        </el-row>
      </el-form>
    </div>
    <!-- 重置和搜索按钮 -->
    <div class="btns">
      <el-button size="small" type="primary" @click="handleSearchClick"
        >搜索</el-button
      >
      <el-button size="small" type="info" @click="handleResetClick"
        >重置</el-button
      >
      <el-button
        v-show="isFold"
        style="font-size: 12px"
        type="primary"
        @click="handleisFoldClick"
        link
        >展开<el-icon><ArrowDown /></el-icon
      ></el-button>
      <el-button
        v-show="!isFold"
        style="font-size: 12px"
        type="primary"
        @click="handleisFoldClick"
        link
        >收起<el-icon><ArrowUp /></el-icon
      ></el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ElForm } from 'element-plus'
import { onMounted, reactive, ref } from 'vue'

interface IProps {
  searchConfig: {
    labelWidth?: string
    formItems: any[]
  }
}

// 接收父组件传来的数据
const props = defineProps<IProps>()

// 0.自定义事件
const emit = defineEmits(['queryClick', 'resetClick'])

// 1.定义form数据
// 初始化searchForm数据，遍历数据 for in遍历的是数组的索引（index），而for of遍历的是数组元素值（value）
const initialForm: any = {}
for (const item of props.searchConfig.formItems) {
  initialForm[item.prop] = item.initialForm ?? ''
}
const searchForm = reactive(initialForm)

// 搜索按钮逻辑 重置按钮逻辑
// 需要在组件挂载后自动触发一次，这样就不需要user-content自动触发该函数了
onMounted(() => {
  emit('queryClick', searchForm)
})
// 折叠按钮，默认是折叠状态
const isFold = ref<boolean>(true)
function handleisFoldClick() {
  console.log('点击了收起按钮')
  isFold.value = !isFold.value
  console.log(isFold.value)
}
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
</style>

