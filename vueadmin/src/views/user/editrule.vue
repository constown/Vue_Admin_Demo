<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="权限名称">
        <el-input v-model="form.desc" />
      </el-form-item>
      <el-form-item label="权限路径">
        <el-input v-model="form.name"  />
      </el-form-item>
      <el-form-item label="状态">
        <el-switch
          v-model="form.status"
          active-text="启用"
          inactive-text="禁用"
          active-color="#13ce66"
          inactive-color="#ff4949">
        </el-switch>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">更新</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { editrule} from '@/api/admin'
export default {
  data() {
    return {
      form: {
        desc: '',
        name: '',
        status: true
      }
    }
  },
  beforeMount(){
    this.form = this.$route.query;
    this.form.status = this.form.status === 1 ? true : false
  },
  methods: {
    onSubmit() {
      this.$message('添加成功!')
      editrule(this.form);
      this.$router.push('/user/authlist')
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

