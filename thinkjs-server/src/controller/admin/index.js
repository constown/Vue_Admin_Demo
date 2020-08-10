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

  async userInfoAction() {
    const username = this.ctx.state.username;
    // const user = await this.model('member').where({username: username}).find();
    const user = await this.model('member').where({
      'cmswing_member.username': username
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
    const rulelist = await this.model('auth_rule').order('id').select();
    const filepath = think.ROOT_PATH + '/www/static/image/avatar/avatar' + user.id + '.png';
    if (think.isFile(filepath)) {
      user.avatar = this.config('hostIpPort') + '/static/image/avatar/avatar' + user.id + '.png';
    } else {
      user.avatar = this.config('hostIpPort') + '/static/image/avatar/avatar.jpg';
    }
    return this.json({ userInfo: user, rulelist });
  }
};
