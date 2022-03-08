## 每日优鲜网页

## 介绍
基于admin-element-ui组件库开发后台管理页面；
包括首页统计页面，商品列表展示、添加、编辑页面，实现了对商品类目和信息的管理；

1. 使用Vue-router实现单页面跳转，使用router-link实现无刷新跳转，router-view显示不同组件。
2. 使用Vuex帮忙管理页面组件的状态，将状态存储在store中，改变 store 中的状态的唯一途径就是显式地提交 (commit) mutation，对于异步状态，使用action提交一个mutation。
3. 使用axios网络请求库，作用于node.js(http模块)和浏览器(XMLHttpRequest)