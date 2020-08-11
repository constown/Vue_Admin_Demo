<template>
  <div class="app-container">
      <div style="padding-bottom:20px;">
          <el-button @click="add" type="primary" icon="el-icon-edit">添加商品</el-button>
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
      <el-table-column label="商品名称" width="150" align="center">
        <template slot-scope="scope">
          {{ scope.row.title }}
        </template>
      </el-table-column>
      <el-table-column label="产品图片"  align="center">
        <template slot-scope="scope">
          <el-image v-if="scope.row.imgs" :src="base+'/static/upload/'+JSON.parse(scope.row.imgs)[0].filename" style="width: 100px; height: 100px"  fit="cover"></el-image>
        <el-image v-else src="https://blog.juanertu.com/images/avatar.png" style="width: 100px; height: 100px"  fit="cover"></el-image>
        </template>
      </el-table-column>
      <el-table-column label="产品类别" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.category }}
        </template>
      </el-table-column>
      
      <el-table-column align="center" prop="created_at" label="操作" width="200">
        <template slot-scope="scope">
          <el-button @click="edit(scope.row)" type="primary" icon="el-icon-edit" circle></el-button>
          <el-button @click="del(scope.row.id)" type="danger" icon="el-icon-delete" circle></el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="height:100px;display:flex;justify-content: center;align-items:center;">
    <el-pagination
    background
    layout="prev, pager, next"
    :total="total" @current-change="getPageUsers">
    </el-pagination>
    </div>
  </div>
</template>

<script>
import { productlist,delproduct,categorylist} from '@/api/shop'
const base = process.env.VUE_APP_BASE_API;
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
      list: [],
      listLoading: true,
      total:0,
      base:base
      
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
      add(){
          this.$router.push({
           path:"/shop/addproduct",
       })
      },
    fetchData() {
      this.listLoading = true
        productlist().then(response => {

        this.list = response.productlist;
        this.total = response.total;
        this.listLoading = false
      })
    },
    getPageUsers(page){
        productlist({page:page}).then(response => {

        this.list = response.productlist;
        this.total = response.total;
        console.log(response)
        this.listLoading = false
      })
    },
   edit(product){
       this.$router.push({
           path:"/shop/editproduct",
           query:product
       })
    },
    async del(id){
        this.$confirm(`是否需要删除${id}的商品？`, '确认删除', {
          distinguishCancelAndClose: true,
          confirmButtonText: '删除',
          cancelButtonText: '取消'
        })
          .then(async () => {
            this.listLoading = true;
            let res = await delproduct({id})
            this.listLoading = false;
            this.fetchData()
          })
    }
  }
}
</script>
