
<template>
  <div class="user-content">
    <div class="content">
      <div class="header">
        <h3 class="title">用户列表</h3>
        <div class="btns">
          <el-button type="primary" @click="handleNewUserClick">
            新建用户
          </el-button>
          <el-button
            v-show="deleteBtn"
            type="danger"
            @click="handleDeleteClick()"
            disabled
          >
            删除用户
          </el-button>
          <el-button
            v-model="status1"
            v-show="bannedBtn"
            type="danger"
            @click="handleBannedClick(status1)"
          >
            封禁账户
          </el-button>
          <el-button
            v-model="status0"
            v-show="bannedBtn"
            type="success"
            @click="handleBannedClick(status0)"
          >
            解封账户
          </el-button>
        </div>
      </div>
      <div class="table">
        <el-table
          :data="usersList"
          stripe
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column align="center" type="selection" width="55">
          </el-table-column>
          <el-table-column
            align="center"
            type="index"
            label="序号"
            width="55"
          />
          <el-table-column
            align="center"
            prop="userName"
            label="用户名"
            width="120"
          />
          <el-table-column
            align="center"
            prop="nickName"
            label="昵称"
            width="150"
          />
          <el-table-column prop="headPortrait" label="头像" width="100">
            <!-- 作用于插槽 -->
            <template #default="scope">
              <!-- <span>{{ scope.row.headPortrait }}</span> -->
              <el-image class="headimg" :src="scope.row.headPortrait" />
              <!-- <img /> -->
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            prop="userPhone"
            label="手机号码"
            width="150"
          />
          <el-table-column
            align="center"
            prop="identityCard"
            label="身份证"
            width="190"
          />
          <el-table-column align="center" prop="sex" label="性别" width="80">
            <template #default="scope">
              <el-button
                :type="scope.row.sex ? 'primary' : 'danger'"
                :icon="scope.row.sex ? 'Male' : 'Female'"
                text
              >
                {{ scope.row.sex ? '男' : '女' }}
              </el-button>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="status" label="状态" width="80">
            <!-- 作用域插槽 -->
            <template #default="scope">
              <el-button
                size="small"
                :type="scope.row.status ? 'success' : 'danger'"
                plain
                @click="handleBannedClick(scope.row.status, scope.row.userId)"
                >{{ scope.row.status ? '正常' : '封禁' }}
              </el-button>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            prop="createTime"
            label="创建时间"
            width="170"
          />
          <el-table-column align="center" label="密码" width="140">
            <template #default="scope">
              <el-button
                size="small"
                text
                type="danger"
                icon="Refresh"
                @click="handleResetPwdClick(scope.row.userId)"
                >重置</el-button
              >
              <el-button
                size="small"
                text
                type="primary"
                icon="EditPen"
                @click="handleUpdatePwdClick(scope.row.userId)"
                >修改</el-button
              >
            </template>
          </el-table-column>
          <el-table-column align="center" label="操作" width="220">
            <template #default="scope">
              <el-button
                size="small"
                text
                type="info"
                icon="SwitchButton"
                @click="handleKickOutClick(scope.row.userId)"
                >强制下线</el-button
              >
              <el-button
                size="small"
                text
                type="primary"
                icon="Edit"
                @click="handleModifyInfoClick(scope.row)"
                >编辑</el-button
              >
              <el-button
                size="small"
                text
                type="danger"
                icon="Delete"
                @click="handleDeleteClick(scope.row.userId)"
                >删除</el-button
              >
            </template>
          </el-table-column>
          <el-table-column align="center" label="图片" width="100">
            <template #default="scope">
              <el-upload
                class="upload-demo"
                action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
              >
                <el-button
                  size="small"
                  text
                  type="primary"
                  icon="UploadFilled"
                  @click="handleUploadPicClick"
                  >上传图片</el-button
                >
              </el-upload>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="pagination">
        <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :page-sizes="[5, 10, 20, 30]"
          layout="total, sizes, prev, pager, next, jumper"
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

// 自定义事件
const emit = defineEmits([
  'deleteClick',
  'bannedTimeClick',
  'resetPwdClick',
  'updatePwdClick',
  'modifyClick'
])

// 1.获取用户列表
const systemStore = useSystemStore()

//2.获取usersList的数据进行展示,要响应式数据
const { usersList, usersTotalCount } = storeToRefs(systemStore)

// 3.新建用户按钮（管理员权限，暂时在这里做一下）
function handleNewUserClick() {
  console.log('点击了新建用户')
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
      ids.push(item.userId)
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
function handleDeleteClick(userId?: number) {
  // 1.进行二次验证
  const safeType = 'user-delete'
  // 将事件发送给父组件,进行类型缩小,判断是多选还是单选
  if (userId) {
    emit('deleteClick', safeType, userId)
  } else if (ids) {
    emit('deleteClick', safeType, ids)
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
      console.log('单个用户解封')
      emit('bannedTimeClick', userId, status)
    } else if (ids) {
      console.log('多个用户解封')
      emit('bannedTimeClick', ids, status)
    }
  }
}

// 重置密码 先进行二次验证
function handleResetPwdClick(userId: number) {
  const safeType = 'reset-password'
  emit('resetPwdClick', safeType, userId)
}

// 修改密码
function handleUpdatePwdClick(userId: number) {
  emit('updatePwdClick', userId)
}

// 强制下线
function handleKickOutClick(userId: number) {
  systemStore.postUserKickOutAction(userId)
}

// 编辑用户信息
function handleModifyInfoClick(info: any) {
  emit('modifyClick', info)
}

// 图片上传
function handleUploadPicClick() {
  console.log('点击了图片上传')
}

// 3.分页器
//改变页码
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
  systemStore.getUsersList2Action(queryInfo)
}
// 有点bug，分页器再点击后不能记录当前的长度
function fetchUsersListByPage() {
  const size = pageSize.value
  const current = currentPage.value
  systemStore.getUsersList1Action({ size, current })
}

// 将网络请求的方法暴露出去，让父组件能够进行调用
defineExpose({ fetchUsersListData, fetchUsersListByPage })
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
  }

  .table {
    .headimg {
      width: 30px;
      // height: 10px;
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
