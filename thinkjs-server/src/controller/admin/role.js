const Base = require('../base.js');
// const { think } = require('think-cache');

module.exports = class extends Base {
  __before() {
    return this.checkAuth();
  }

  indexAction() {
    return this.json({
      msg: '用户信息请求接口'
    });
  }

  async rolelistAction() {
    const page = this.get('page') ? this.get('page') : 1;
    const rolelist = await this.model('auth_role').order('id').page(page, 10).select();
    const total = await this.model('auth_role').count();
    return this.json({rolelist, total});
  }

  async delroleAction() {
    const roleid = this.get('id');
    await this.model('member').where({id: roleid}).delete();
    this.json({msg: '删除成功'});
  }

  async addroleAction() {
    if (this.method === 'POST') {
      const role = this.post();
      role.status = 1;
      await this.model('auth_role').add(role);
      this.json({msg: '权限添加成功'});
    }
  }

  async editroleAction() {
    if (this.method === 'POST') {
      const role = this.post();
      role.status = 1;
      await this.model('auth_role').where({id: role.id}).update({desc: role.desc, rule_ids: role.rule_ids});
      this.json({msg: '权限更新成功'});
    }
  }
};
