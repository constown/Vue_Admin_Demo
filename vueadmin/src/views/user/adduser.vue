<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="用户名">
        <el-input v-model="form.username" />
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="form.password" placeholder="请输入您的密码" />
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="form.email" />
      </el-form-item>
      <el-form-item label="电话">
        <el-input v-model="form.mobile" />
      </el-form-item>
      <el-form-item label="管理员角色">
        <el-select v-model="form.role_id" placeholder="选择角色">
          <el-option v-for="(item,index) in rolelist" :key="index" :label="item.desc" :value="item.id" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">添加</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { adduser, userinfo, rolelist, updateUser } from '@/api/admin'
export default {
  data() {
    return {
      form: {
        username: '',
        password: '',
        email: '',
        mobile: '',
        role_id: 1
      },
      role_id: '',
      rolelist: []
    }
  },
  async created() {

  },
  async beforeMount() {
    const res = await rolelist()
    this.rolelist = res.rolelist
  },
  methods: {
    onSubmit() {
      this.$message('添加成功!')
      adduser(this.form);
      this.$router.push('/user/userlist')
    },
    onCancel() {
      this.$router.push('/user/userlist')
    }
  }

}
</script>

<style scoped>
.line{
  text-align: center;
}
</style>

