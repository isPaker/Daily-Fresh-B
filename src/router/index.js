import Vue from 'vue'
import Router from 'vue-router'

import store from "@/store"

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
    hidden: true,
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true,
  },

  {
    path: '/',
    component: Layout,
    redirect: '/count',
    name: 'Dashboard',
    meta: { title: '控制台', icon: 'el-icon-s-home' },
    alwaysShow: true,
    children: [
      {
        path: 'count',
        name: 'Count',
        component: () => import('@/views/count/index'),
        meta: { title: '统计', icon: 'el-icon-s-data', auth: true }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  // { path: '*', redirect: '/404', hidden: true }
]

// 动态路由
export const dynamicRoutes = [
  {
    path: '/goods',
    component: Layout,
    redirect: '/goodsList',
    name: 'Goods',
    meta: { title: '商品', icon: 'el-icon-s-goods', auth: true },
    children: [
      {
        path: 'goodsList',
        name: 'GoodsList',
        component: () => import('@/views/goods/goodsList/index'),
        meta: { title: '商品列表', icon: 'el-icon-s-grid', auth: true }
      },
      {
        path: 'addGoods',
        name: 'AddGoods',
        component: () => import('@/views/goods/addGoods/index'),
        meta: { title: '添加商品', icon: 'el-icon-circle-plus', auth: true }
      },
      {
        path: 'editGoods',
        name: 'EditGoods',
        component: () => import('@/views/goods/editGoods/index'),
        meta: { title: '编辑商品', icon: 'el-icon-edit', auth: true }
      },
      {
        path: 'editGoods/:id',
        name: 'EditGood',
        hidden: true,
        component: () => import('@/views/goods/editGood/index'),
        meta: { title: '编辑商品', icon: 'el-icon-edit', auth: true, activeMenu: "/goods/editGoods" }
      },
      {
        path: 'category',
        name: 'Category',
        component: () => import('@/views/goods/category/index'),
        meta: { title: '类目管理', icon: 'el-icon-circle-plus', auth: true }
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes,
  mode: "history"
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
