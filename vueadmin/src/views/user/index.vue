<template>
  <div class="app-container">
    <div style="padding-bottom:20px">
      <el-button  type="primary" icon="el-icon-edit"  @click="adduser()">添加新用户</el-button>
    </div>
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="ID" width="95">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column label="用户名" align="center">
        <template slot-scope="scope">
          {{ scope.row.username }}
        </template>
      </el-table-column>
      <el-table-column label="邮箱" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.email }}</span>
        </template>
      </el-table-column>
      <el-table-column label="电话号码" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.mobile }}
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="状态" width="110" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{ scope.row.status === 1 ? '正常' : '禁用' }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="操作" width="200">
        <template slot-scope="scope">
          <el-button  type="primary" icon="el-icon-edit" circle @click="edit(scope.row.id)"></el-button>
          <el-button  type="danger" icon="el-icon-delete" circle @click="del(scope.row.id)"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="display:flex;justify-content:center;align-ltems:center;margin-top:15px">
      <el-pagination
        background
        layout="prev, pager, next"
        :total= "total"
        @current-change="getPageUsers"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { userList, deluser } from '@/api/admin'

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        '1': 'success',
        '0': 'gray',
        '-1': 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: null,
      listLoading: true,
      total: 0
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      userList().then(response => {
        this.list = response.userlist
        this.total = response.total
        this.listLoading = false
      })
    },
    getPageUsers(page) {
      this.listLoading = true
      userList({ page: page }).then(response => {
        this.list = response.userlist
        this.total = response.total
        this.listLoading = false
      })
    },
    adduser(){
      this.$router.push({
        path: "/user/adduser",
      })
    },
    edit(id){
      this.$router.push({
        path: "/user/edituser",
        query: {id}
      })
    }, 
    async del(id, currentPage) {
      this.$confirm(`确定删除ID为${id}的用户吗？(该操作是不可逆的)`, '确认删除', {
        distinguishCancelAndClose: true,
        confirmButtonText: '删除',
        cancelButtonText: '取消'
      })
        .then (async (response) => {
          this.listLoading = true
          let res = await deluser({ id })
          this.listLoading = false
          this.fetchData()
          this.$message({
            type: 'info',
            message: `${res.msg}`
          })
        })
    }
  }
}
</script>
