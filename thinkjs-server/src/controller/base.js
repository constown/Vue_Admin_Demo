const jsonwebtoken = require('jsonwebtoken');

module.exports = class extends think.Controller {
  __before() {

  }
  // JWT(JSON WEB TOKEN) 跨域身份验证方案
  // 1.用户发送用户名和密码
  // 2.验证信息,保留验证信息
  // 3.返回口令给到前端
  // 4.前端将口令保存起来
  // 5.下次发送请求的时候,将口令发送给服务器
  // 6.服务器可以验证口令,判断用户的信息和登录状态
  // 7.更新口令
  authFail() {
    this.json({ error: 'JWT校验失败' });
    return false;
  }

  checkAuth() {
    const token = this.ctx.headers['x-token'];
    const {secret} = this.config('jwt');
    try {
      var tokenObj = token ? jsonwebtoken.verify(token, secret) : {};
      this.ctx.state.username = tokenObj.name;
    } catch (error) {
      return this.authFail();
    }
    if (!tokenObj.name) {
      return this.authFail();
    }
    this.updateAuth(token.name);
  }

  updateAuth(userName) {
    const userInfo = {
      name: userName
    };
    // 获取JWT的配置信息
    const {secret, cookie, expire} = this.config('jwt');
    const token = jsonwebtoken.sign(userInfo, secret, {expiresIn: expire});
    this.cookie(cookie, token);
    // this.header('authorization', token);
    this.header('authoriztion', token);
    return token;
  }
};
