const Base = require('../base.js');

module.exports = class extends Base {
  __before() {
    return this.checkAuth();
  }

  indexAction() {
    return this.json({
      msg: '用户信息请求接口'
    });
  }

  async userlistAction() {
    const page = this.get('page') ? this.get('page') : 1;
    const userlist = await this.model('member').order('id').page(page, 10).select();
    const total = await this.model('member').count();
    this.json({userlist, total});
  }

  async deluserAction() {
    const userid = this.get('id');
    await this.model('member').where({id: userid}).delete();
    this.json({msg: '删除成功'});
  }

  async userinfoAction() {
    const userid = this.get('id');
    const user = await this.model('member').where({
      'cmswing_member.id': userid
    }).join({
      table: 'auth_user_role',
      join: 'left',
      as: 'm',
      on: ['id', 'user_id']
    }).join({
      table: 'auth_role',
      join: 'left',
      as: 'c',
      on: ['m.role_id', 'id']
    }).find();
    this.json({ user });
  }

  async updateUserAction() {
    const postUser = this.post();
    if (this.method === 'POST' && postUser.password !== '') {
      await this.model('member').where({ id: postUser.id }).update({
        password: this.verifyPassword(postUser.password),
        email: this.postUser.email,
        mobile: this.postUser.mobile
      });
    } else {
      await this.model('member').where({ id: postUser.id }).update({
        email: this.postUser.email,
        mobile: this.postUser.mobile
      });
    }
    const role = await this.model('auth_user_role').where({
      user_id: postUser.id
    }).find();
    // 判断是否有设置该用户的权限角色，如果有就修改，否则就添加
    if (role.id) {
      await this.model('auth_user_role').where({
        user_id: postUser.id
      }).update({
        role_id: postUser.id
      });
    } else {
      await this.model('auth_user_role').add({
        user_id: postUser.id,
        role_id: postUser.role_id
      });
    }
    this.json({
      msg: '信息更新成功'
    });
  }

  async addUserAction() {
    if (this.method === 'POST') {
      const postUser = this.post();
      const user = this.model('member').where({ username: postUser.username }).find();
      if (!user.username) {
        postUser.status = 1;
        await this.model('member').add(postUser);
        const user = await this.model('member').where({ username: postUser.username }).find();
        await this.model('auth_user_role').add({ user_id: user.id, role_id: postUser.role_id });
        this.json({msg: '添加成功'});
      } else {
        this.json({msg: '添加失败', content: '用户名已存在'});
      }
    }
  }

  verifyPassword(password) {
    return think.md5(think.md5('www.cmswing.com') + think.md5(password) + think.md5('Arterli'));
  }
};
