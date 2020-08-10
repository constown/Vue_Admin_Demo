<template>
  <div class="dashboard-container">
    <div class="dashboard-text">当前登录: {{ name }}</div>
    <p>一个简单的后台管理系统demo</p>
    <p>主要技术栈：Vue、Thinkjs、MySQL、ElementUI</p>
    <p>主要实现功能：</p>
    <p>1.JWT跨域身份验证</p>
    <p>2.登录</p>
    <p>3.用户列表、用户增删查改</p>
    <p>4.角色权限增删改，权限增删改</p>
    <p>5.商品分类增删改</p>
    <p>6.商品详情增删改查</p>
    <p>7.文件上传，富文本编辑器</p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name'
    ])
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
