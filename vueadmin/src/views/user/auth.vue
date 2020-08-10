<template>
  <div class="app-container">
    <div style="padding-bottom:20px">
      <el-button  type="primary" icon="el-icon-edit"  @click="adduser()">添加权限</el-button>
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
      <el-table-column label="权限名称" align="center">
        <template slot-scope="scope">
          {{ scope.row.desc }}
        </template>
      </el-table-column>
      <el-table-column label="权限路径" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="状态" width="110" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{ scope.row.status === 1 ? '正常' : '禁用' }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="操作" width="200">
        <template slot-scope="scope">
          <el-button  type="primary" icon="el-icon-edit" circle @click="edit(scope.row)"></el-button>
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
import { rulelist, delrule } from '@/api/admin'

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
      rulelist().then(response => {
        this.list = response.rulelist
        this.total = response.total
        this.listLoading = false
      })
    },
    getPageUsers(page) {
      this.listLoading = true
      rulelist({ page: page }).then(response => {
        this.list = response.rulelist
        this.total = response.total
        this.listLoading = false
      })
    },
    adduser(){
      this.$router.push({
        path: "/user/addrule",
      })
    },
    edit(rule){
      this.$router.push({
        path: "/user/editrule",
        query: rule
      })
    }, 
    async del(id, currentPage) {
      this.$confirm(`确定删除ID为${id}的权限吗？(该操作是不可逆的)`, '确认删除', {
        distinguishCancelAndClose: true,
        confirmButtonText: '删除',
        cancelButtonText: '取消'
      })
        .then (async () => {
          this.listLoading = true
          await delrule({ id })
          this.listLoading = false
          this.fetchData()
          this.$message({
            type: 'info',
            message: '删除成功'
          })
        })
    }
  }
}
</script>
