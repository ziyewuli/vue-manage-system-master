import Vue from 'vue';
import App from './App';
import router from './router';
import axios from 'axios';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-default/index.css';    // 默认主题
// import '../static/css/theme-green/index.css';       // 浅绿色主题
import "babel-polyfill";

Vue.use(ElementUI);
Vue.prototype.$axios = axios;
Vue.prototype.Interface = function(){
	return {
	 	loginUrl:'http://59.110.228.218:15555/oauth/login',//http://59.110.228.218:15555/oauth/login',//登录接口地址
	 	enumUrl:'http://59.110.228.218:15555/manage/manage/preferences/list',//枚举值http://59.110.228.218:15555/manage/manage/preferences/list
	 	userInsert:'http://59.110.228.218:15555/manage/manage/user/insert',// 用户新增 http://59.110.228.218:15555/manage/manage/user/insert 
	 	userSearch:'http://59.110.228.218:15555/manage/manage/user/search',// 用户列表查询分页
	 	memberSearch:'http://59.110.228.218:15555/manage/manage/user/search',//'http://59.110.228.218:15555/payday/payday/member/search'//
		transactionMoney:'http://59.110.228.218:15555/manage/manage/loan/queryLoanBank',//打款列表
		juese:'http://59.110.228.218:15555/manage/manage/role/search',//角色管理
		addjuese:'http://59.110.228.218:15555/manage/manage/role/insert',//新增角色
	}
	
	
};
// 全局导航钩子
 router.beforeEach((to, from, next) => {
     // 判断该路由是否需要登录权限
     if (to.meta.requireAuth) {
         // 通过vuex state获取当前的token是否存在
         // console.log(isEmptyObject(store.state.user)) 
         if(isLogin()) {   
             next();
         }
         else { 
             next({
                 path: '/login',
                query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
            })
         }
     }
     else {
         next();
     }
 })


 function isLogin() {
 	var value = sessionStorage.getItem("islogin"); 
     return true;
 }



new Vue({
    router,
    render: h => h(App)
}).$mount('#app');