import router from './router'
import store from './store'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import getPageTitle from '@/utils/get-page-title'

import {constantRoutes, dynamicRoutes} from "./router"
import getDynamicRoute from "./utils/getDynamicRoute"

NProgress.configure({ showSpinner: false }) // NProgress Configuration

// const whiteList = ['/login'] // no redirect whitelist
let isAddRoutes = false;

router.beforeEach((to, from, next) => {
  // start progress bar
  NProgress.start();
  
  // set page title
  document.title = getPageTitle(to.meta.title);
  
  const userInfo = store.getters.user;
  
  if(to.meta.auth){
    // 需要鉴权
    if(userInfo.username && userInfo.appkey && userInfo.role){

      if(!isAddRoutes){
        
        const menuRoutes = getDynamicRoute(store.getters.user.role, dynamicRoutes)
       
        store.dispatch("user/changeMenuRoutes", constantRoutes.concat(menuRoutes)).then(()=>{
          router.addRoutes(menuRoutes);
          
          next()
        });
        isAddRoutes = true;
      }
      next()
    }else{
      next("/login")
    }
    NProgress.done();
  }else{
    // 不需要鉴权
    next()
    NProgress.done();
  }
});

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
