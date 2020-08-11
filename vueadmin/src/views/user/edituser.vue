<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="用户名">
        <el-input v-model="form.username" :disabled="true" />
      </el-form-item>
      <el-form-item label="密码">
        <el-input placeholder="如不修改密码，请置空" />
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
        <el-button type="primary" @click="onSubmit">更新</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { userinfo, rolelist, updateUser } from '@/api/admin'
export default {
  data() {
    return {
      form: {
        username: '',
        password: '',
        email: '',
        mobile: '',
        role_id: ''
      },
      role_id: '',
      rolelist: []
    }
  },
  async created() {
    const userid = this.$router.currentRoute.query.id;
    const res = await userinfo({ id: userid });
    this.form.username = res.user.username;
    this.form.mobile = res.user.mobile ;
    this.form.password = res.user.password;
    this.form.email = res.user.email;
    this.form.role_id = res.user.role_id;
    this.form.id = userid;
    this.role_id = res.user.role_id;
  },
  async beforeMount() {
    const res = await rolelist()
    this.rolelist = res.rolelist
  },
  methods: {
    async onSubmit() {
      const res = await updateUser(this.form)
      this.$message(`${res.msg}`)
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

