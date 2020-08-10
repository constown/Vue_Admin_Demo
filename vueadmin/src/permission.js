import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login'] // no redirect whitelist

router.beforeEach(async(to, from, next) => {
  // start progress bar
  NProgress.start()

  // set page title
  document.title = getPageTitle(to.meta.title)

  // determine whether the user has logged in
  const hasToken = getToken()

  if (hasToken) {
    next()
    NProgress.done()
    const response = await store.dispatch('user/getInfo')
    const userinfo = response.userInfo;
    const rulelist = response.rulelist;
    const userRuleIds = userinfo.rule_ids.split(',');
    const ruleObj = {};
    rulelist.forEach((item, index) => {
      ruleObj[item.name]  = item.id;
    });
    if (ruleObj[to.path] ) {
      if (userRuleIds.indexOf(String(ruleObj[to.path])) != -1) {
        next()
      } else {
        Message({
          message: '你未获取权限',
          type: 'error',
          duration: 2 * 1000
        })
        next('/admin/dashboard')
      }
    } else {
      next()
    }
  } else {
    /* has no token*/
    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
