const Base = require('../base.js');
// const { think } = require('think-cache');

module.exports = class extends Base {
  __before() {
    return this.checkAuth();
  }

  indexAction() {
    return this.json({
      msg: '商品信息请求接口'
    });
  }

  async categorylistAction() {
    const page = this.get('page') ? this.get('page') : 1;
    const categorylist = await this.model('category').order('id').page(page, 10).select();
    const total = await this.model('category').count();
    return this.json({categorylist, total});
  }

  async delcategoryAction() {
    const categoryid = this.get('id');
    await this.model('category').where({id: categoryid}).delete();
    this.json({msg: '删除成功'});
  }

  async addcategoryAction() {
    if (this.method === 'POST') {
      const category = this.post();
      category.status = 1;
      category.name = category.title;
      await this.model('category').add(category);
      this.json({msg: '添加成功'});
    }
  }

  async editcategoryAction() {
    if (this.method === 'POST') {
      const category = this.post();
      category.status = 1;
      await this.model('category').where({id: category.id}).update({title: category.title});
      this.json({msg: '更新成功'});
    }
  }
};
