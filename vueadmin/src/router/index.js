import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/admin',
    component: Layout,
    redirect: '/admin/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页看板', icon: 'dashboard' }
    }]
  },
  {
    path: '/user',
    component: Layout,
    name: 'user',
    meta: { title: '用户管理', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'userlist',
        name: 'userlist',
        component: () => import('@/views/user/index'),
        meta: { title: '用户列表', icon: 'user' }
      },
      {
        path: 'edituser',
        name: 'edituser',
        component: () => import('@/views/user/edituser'),
        meta: { title: '角色编辑', icon: 'edit' },
        hidden: true
      },
      {
        path: 'adduser',
        name: 'adduser',
        component: () => import('@/views/user/adduser'),
        meta: { title: '添加用户', icon: 'edit' },
        hidden: true
      },
      {
        path: 'addrule',
        name: 'addrule',
        component: () => import('@/views/user/addrule'),
        meta: { title: '添加权限', icon: 'edit' },
        hidden: true
      },
      {
        path: 'addrole',
        name: 'addrole',
        component: () => import('@/views/user/addrole'),
        meta: { title: '添加角色', icon: 'edit' },
        hidden: true
      },
      {
        path: 'editrule',
        name: 'editrule',
        component: () => import('@/views/user/editrule'),
        meta: { title: '修改权限', icon: 'edit' },
        hidden: true
      },
      {
        path: 'editrole',
        name: 'editrole',
        component: () => import('@/views/user/editrole'),
        meta: { title: '编辑角色', icon: 'edit' },
        hidden: true
      },
      {
        path: 'rolelist',
        name: 'rolelist',
        component: () => import('@/views/user/role'),
        meta: { title: '角色管理', icon: 'user' }
      },
      {
        path: 'authlist',
        name: 'authlist',
        component: () => import('@/views/user/auth'),
        meta: { title: '权限管理', icon: 'user' }
      }
    ]
  },

  {
    path: '/shop',
    component: Layout,
    name: 'shop',
    meta: { title: '商城管理', icon: 'example' },
    children: [
      {
        path: 'category',
        name: 'category',
        component: () => import('@/views/shop/category'),
        meta: { title: '商品分类', icon: 'table' }
      },
      {
        path: 'product',
        name: 'product',
        component: () => import('@/views/shop/product'),
        meta: { title: '商品列表', icon: 'tree' }
      },
      {
        path: 'addcategory',
        name: 'addcategory',
        component: () => import('@/views/shop/addcategory'),
        meta: { title: '添加分类', icon: 'edit' },
        hidden: true
      },
      {
        path: 'editcategory',
        name: 'editcategorye',
        component: () => import('@/views/shop/editcategory'),
        meta: { title: '修改分类', icon: 'edit' },
        hidden: true
      },{
        path: 'addproduct',
        name: 'addproduct',
        component: () => import('@/views/shop/addproduct'),
        meta: { title: '添加商品', icon: 'edit' },
        hidden: true
      },
      {
        path: 'editproduct',
        name: 'editproduct',
        component: () => import('@/views/shop/editproduct'),
        meta: { title: '修改商品', icon: 'edit' },
        hidden: true
      },
    ]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
