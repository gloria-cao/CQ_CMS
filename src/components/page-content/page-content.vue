<template>
  <div class="user-content">
    <div class="content">
      <div class="header">
        <div class="btns">
          <el-button
            size="small"
            type="primary"
            @click="handleNewUserClick(props.contentConfig.pageName)"
            v-show="props.contentConfig.header?.btnIsShow ?? false"
          >
            新建
          </el-button>
          <el-button
            size="small"
            v-show="props.contentConfig.header?.deleteBtnIsShow ?? deleteBtn"
            type="danger"
            @click="handleDeleteClick()"
          >
            批量删除
          </el-button>
          <el-button
            size="small"
            v-model="status1"
            v-show="props.contentConfig.header?.bannedBtnIsShow ?? bannedBtn"
            type="danger"
            @click="handleBannedClick(status1)"
          >
            封禁
          </el-button>
          <el-button
            size="small"
            v-model="status0"
            v-show="props.contentConfig.header?.bannedBtnIsShow ?? bannedBtn"
            type="success"
            @click="handleBannedClick(status0)"
          >
            解封
          </el-button>
        </div>
        <!-- 局部刷新 -->
        <div class="refresh" @click="handleRefreshClick">
          <el-icon><Refresh /></el-icon>
        </div>
      </div>
      <div class="table" v-loading="loading">
        <el-table
          :data="usersList"
          stripe
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <template v-for="item in contentConfig.contentList" :key="item.prop">
            <!-- 将按钮遍历展示 -->
            <template v-if="item.type === 'operation'">
              <el-table-column v-bind="item">
                <template #default="scope">
                  <el-dropdown size="small">
                    <span
                      >{{ item.label }}
                      <el-icon class="el-icon--right"> <arrow-down /> </el-icon
                    ></span>
                    <template #dropdown>
                      <el-dropdown-menu>
                        <template
                          v-for="itemBtn in item.btns"
                          :key="itemBtn.label"
                        >
                          <el-dropdown-item>
                            <el-button
                              size="small"
                              text
                              :type="itemBtn.color"
                              :icon="itemBtn.icon"
                              @click="
                                handleOperationClick(
                                  props.contentConfig.pageName,
                                  scope.row,
                                  itemBtn.type
                                )
                              "
                              >{{ itemBtn.label }}</el-button
                            >
                          </el-dropdown-item>
                        </template>
                      </el-dropdown-menu>
                    </template>
                  </el-dropdown>
                </template>
              </el-table-column>
            </template>
            <!-- 自定义组件展示 -->
            <template v-else-if="item.type === 'custom'">
              <el-table-column v-bind="item">
                <!-- 作用域插槽 -->
                <template #default="{ row }">
                  <slot
                    :name="item.slotName"
                    v-bind="row"
                    :prop="item.slotName"
                  ></slot>
                </template>
              </el-table-column>
            </template>
            <template v-else>
              <el-table-column v-bind="item"></el-table-column>
            </template>
          </template>
        </el-table>
      </div>
      <div class="pagination">
        <el-pagination
          small
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :page-sizes="[5, 10, 20, 30]"
          layout="sizes,jumper, prev, pager, next, total"
          :total="usersTotalCount"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import type { IUsersList } from '@/types'
import { Male, Female } from '@element-plus/icons-vue'
import useSystemStore from '@/store/main/system/system'

interface IProps {
  contentConfig: {
    pageName: string
    safeType?: string
    safeTypes?: string
    header?: {
      btnIsShow?: boolean
      deleteBtnIsShow?: boolean
      bannedBtnIsShow?: boolean
    }
    contentList?: any[]
    handler?: {
      optionIsShow?: boolean
      otherIsShow?: boolean
      pictureIsShow?: boolean
    }
  }
}
const props = defineProps<IProps>()

// 自定义事件
const emit = defineEmits([
  'deleteClick',
  'bannedTimeClick',
  'resetPwdClick',
  'updatePwdClick',
  'modifyClick',
  'newClick'
])

// 1.获取用户列表
const systemStore = useSystemStore()

//2.获取usersList的数据进行展示,要响应式数据
const { usersList, usersTotalCount } = storeToRefs(systemStore)

// 3.新建用户按钮（管理员权限，暂时在这里做一下）
function handleNewUserClick(pageName: string) {
  const isNew = true
  emit('modifyClick', isNew, pageName)
}

// 3.多选操作
const deleteBtn = ref(false)
const bannedBtn = ref(false)
const multipleSelection = ref<IUsersList[]>([])
// 存储多选用户的id
let ids: number[] = []
const handleSelectionChange = (val: IUsersList[]) => {
  multipleSelection.value = val
  // 数组去重
  if (val && ids) {
    ids = []
    for (const item of val) {
      // console.log(Object.values(item)[0]) //一般第一个数据都是id所以这样子拿数据，后面应优化
      ids.push(Object.values(item)[0])
    }
  }
  // 控制删除封禁按钮的显示与隐藏
  if (ids.length >= 1) {
    if (deleteBtn.value === false && bannedBtn.value === false) {
      deleteBtn.value = !deleteBtn.value
      bannedBtn.value = !bannedBtn.value
    }
  } else if (!ids.length) {
    if (deleteBtn.value === true && bannedBtn.value === true) {
      deleteBtn.value = !deleteBtn.value
      bannedBtn.value = !bannedBtn.value
    }
  }
}

// 多选和单选删除操作的封装
function handleDeleteClick(id?: number) {
  // 1.进行二次验证
  const safeType = props.contentConfig.safeType
  const safeTypes = props.contentConfig.safeTypes
  const pageName = props.contentConfig.pageName

  // 将事件发送给父组件,进行类型缩小,判断是多选还是单选
  if (id) {
    emit('deleteClick', pageName, safeType, id)
  } else if (ids) {
    emit('deleteClick', pageName, safeTypes, ids)
  }
}

// 封禁解封操作 0封禁1正常
const status1 = ref(1)
const status0 = ref(0)
function handleBannedClick(status: number, userId?: number) {
  if (status === 1) {
    // 此时账户是正常状态，采取封禁
    if (userId) {
      emit('bannedTimeClick', userId, status)
    } else if (ids) {
      emit('bannedTimeClick', ids, status)
    }
  } else if (status === 0) {
    // 账户处于封禁状态，要提前解封
    if (userId) {
      emit('bannedTimeClick', userId, status)
    } else if (ids) {
      emit('bannedTimeClick', ids, status)
    }
  }
}

// 数据列表按钮操作
function handleOperationClick(pageName: string, row: any, btnType: string) {
  console.log(pageName, row, btnType)
  if (btnType === 'delete') {
    // id是数据返回的第一个值
    const idValue = Object.values(row)[0]
    handleDeleteClick(idValue as number)
  } else if (btnType === 'edit') {
    const isNew = false
    emit('modifyClick', isNew, pageName, row)
  } else if (btnType === 'resetPwd') {
    const safeType = 'reset-password'
    emit('resetPwdClick', pageName, safeType, row.userId)
  } else if (btnType === 'kickout') {
    systemStore.postUserKickOutAction(row.userId)
  } else if (btnType === 'editPwd') {
    emit('updatePwdClick', row.userId)
  } else if (btnType === 'uploadPic') {
    console.log('点击了图片上传')
  }
}

// 3.分页器 改变页码
const currentPage = ref(1)
const pageSize = ref(10)
function handleSizeChange() {
  fetchUsersListByPage()
}
function handleCurrentChange() {
  fetchUsersListByPage()
}
// 分页器发送网络请求
function fetchUsersListData(formData: any = {}) {
  // 获取current和offset
  const size = pageSize.value
  const current = currentPage.value
  const pageInfo = { current, size }

  // 发送网咯请求
  const queryInfo = { ...pageInfo, ...formData }
  systemStore.getPageListAction(props.contentConfig.pageName, queryInfo)
}
// 有点bug，分页器再点击后不能记录当前的长度
function fetchUsersListByPage() {
  const size = pageSize.value
  const current = currentPage.value
  systemStore.getPageListAction(props.contentConfig.pageName, { size, current })
  return false
}
// 第一次请求数据
const size = pageSize.value
const current = currentPage.value
systemStore.getPageListAction(props.contentConfig.pageName, { size, current })
// 将网络请求的方法暴露出去，让父组件能够进行调用
defineExpose({ fetchUsersListData, fetchUsersListByPage })

// 局部刷新按钮点击
const loading = ref(false)
function handleRefreshClick() {
  // 重新获取分页器的内容即可
  // 开始加载
  loading.value = !loading.value
  const result = fetchUsersListByPage()
  // 结束加载
  setTimeout(() => {
    if (!result) {
      loading.value = !loading.value
    }
  }, 300)
}
</script>

<style lang="less" scoped>
.user-content {
  padding: 20px;
  margin-top: 15px;
  background-color: #fff;

  .header {
    display: flex;
    justify-content: space-between;
    // 底部对齐
    align-items: flex-end;
    margin-bottom: 20px;

    .title {
      font-size: 20px;
    }
    .refresh {
      margin-right: 30px;
    }
  }

  .table {
    .headimg {
      width: 30px;
    }
    .el-table {
      font-size: 13px;
    }
    .el-button {
      margin-left: 0;
      padding: 5px 8px;
    }
  }

  .pagination {
    display: flex;
    justify-content: flex-end;
    margin-top: 10px;
  }
}
</style>
