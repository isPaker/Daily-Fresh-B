import router from './router'
import store from './store'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import getPageTitle from '@/utils/get-page-title'

import {constantRoutes, dynamicRoutes} from "./router"
import getDynamicRoute from "./utils/getDynamicRoute"

NProgress.configure({ showSpinner: false }) // NProgress Configuration

// const whiteList = ['/login'] // no redirect whitelist
let addRoutes = false;
router.beforeEach((to, from, next) => {
  // start progress bar
  NProgress.start();

  // set page title
  document.title = getPageTitle(to.meta.title);

  const userInfo = store.getters.user;

  if(to.path === "/login"){
    // 去往登录页面
    next();
  }else{
    // 去往非登录页面
    if( userInfo.username && userInfo.appkey && userInfo.role ){
      // 登录过
      if(!addRoutes){
        // 没添加动态路由
        const menuRoutes = getDynamicRoute(userInfo.role, dynamicRoutes);
        store.dispatch("user/changeMenuRoutes", constantRoutes.concat(menuRoutes)).then(()=>{
          router.addRoutes(menuRoutes);
          next();
        });
        addRoutes = true;
      }
      next();
    }else{
      // 未登录/过期
      next(`/login?redirect=${to.path}`);
    }
  };
  NProgress.done();
});

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
