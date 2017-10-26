import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);
export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/login'
        },
        {
            path: '/dataScreening',
            component: resolve => require(['../components/common/Home.vue'], resolve),
            children:[
                {
                    path: '/',
                    component: resolve => require(['../components/page/Readme.vue'], resolve)
                },
                {
                    path: '/jurisdictioLists',
                    component: resolve => require(['../components/page/JurisdictioLists.vue'], resolve)
                },
                {
                    path: '/juese',
                     meta: {
                    // 添加该字段，表示进入这个路由是需要登录的
                     requireAuth: true,  
                    },
                    component: resolve => require(['../components/page/juese.vue'], resolve)
                },
                {
                    path: '/dataScreening',
                    component: resolve => require(['../components/page/DataScreening.vue'], resolve)
                },
                {
                    path: '/userlist',
                    name:'userlist',
                    component: resolve => require(['../components/page/userlist.vue'], resolve)
                },
                {
                    path: '/userlistDetail',
                    name:'userlist',
                    component: resolve => require(['../components/page/userlistDetail.vue'], resolve)
                },
                {
                    path: '/transactionList',
                    name:'transactionList',
                    component: resolve => require(['../components/page/transactionList.vue'], resolve)
                },
                {
                    path: '/transactionListDetail',
                    name:'detail',
                    component: resolve => require(['../components/page/transactionListDetail.vue'], resolve)
                },
                {
                    path: '/userAssets',
                    name:'userAssets',
                    component: resolve => require(['../components/page/userAssets.vue'], resolve)
                },
                {
                    path: '/dataOverview',
                    name:'dataOverview',
                    component: resolve => require(['../components/data/dataOverview.vue'], resolve)
                },
                {
                    path: '/loanData',
                    name:'loanData',
                    component: resolve => require(['../components/data/loanData.vue'], resolve)
                },
                {
                    path: '/channelData',
                    name:'channelData',
                    component: resolve => require(['../components/data/channelData.vue'], resolve)
                },
                {
                    path: '/invitationData',
                    name:'invitationData',
                    component: resolve => require(['../components/data/invitationData.vue'], resolve)
                },
                {
                    path: '/dataChart',
                    name:'dataChart',
                    component: resolve => require(['../components/data/dataChart.vue'], resolve)
                },
                {
                    path: '/registrationData',
                    name:'registrationData',
                    component: resolve => require(['../components/data/registrationData.vue'], resolve)
                },
                {
                    path: '/transactionMoney',
                    name: 'transactionMoney',
                    component: resolve => require(['../components/transaction/transactionMoney.vue'], resolve)
                },
                {
                    path: '/auditReport',
                    name:'transactionMoney',
                    component: resolve => require(['../components/transaction/auditReport.vue'], resolve)
                },
                {
                    path: '/transactionLoan',
                    name:'transactionLoan',
                    component: resolve => require(['../components/transaction/transactionLoan.vue'], resolve)
                },
                {
                    path: '/transactionPlayList',
                    name:'transactionPlayList',
                    component: resolve => require(['../components/transaction/transactionPlayList.vue'], resolve)
                },
                {
                    path: '/transactionBill',
                    name:'transactionBill',
                    component: resolve => require(['../components/transaction/transactionBill.vue'], resolve)
                },
                {
                    path: '/transactionWrite',
                    name:'transactionWrite',
                    component: resolve => require(['../components/transaction/transactionWrite.vue'], resolve)
                },
                {
                    path: '/feedback',
                    name:'feedback',
                    component: resolve => require(['../components/operate/feedback.vue'], resolve)
                },
                {
                    path: '/product',
                    name:'product',
                    component: resolve => require(['../components/operate/product.vue'], resolve)
                },
                {
                    path: '/closedArea',
                    name:'closedArea',
                    component: resolve => require(['../components/operate/closedArea.vue'], resolve)
                },
                {
                    path: '/authentication',
                    name:'authentication',
                    component: resolve => require(['../components/operate/authentication.vue'], resolve)
                },
                {
                    path: '/repaymentMethods',
                    name:'repaymentMethods',
                    component: resolve => require(['../components/operate/repaymentMethods.vue'], resolve)
                },
                {
                    path: '/versionUpgrade',
                    name:'versionUpgrade',
                    component: resolve => require(['../components/operate/versionUpgrade.vue'], resolve)
                },
                {
                    path: '/channelList',
                    name:'channelList',
                    component: resolve => require(['../components/channel/channelList.vue'], resolve)
                },
                {
                    path: '/channelInfor',
                    name:'channelInfor',
                    component: resolve => require(['../components/channel/channelInfor.vue'], resolve)
                },
                {
                    path: '/reconciliationPlay',
                    name:'reconciliationPlay',
                    component: resolve => require(['../components/reconciliation/reconciliationPlay.vue'], resolve)
                },
                {
                    path: '/reconciliationRepayment',
                    name:'reconciliationRepayment',
                    component: resolve => require(['../components/reconciliation/reconciliationRepayment.vue'], resolve)
                },
                {
                    path: '/reconciliationChannel',
                    name:'reconciliationChannel',
                    component: resolve => require(['../components/reconciliation/reconciliationChannel.vue'], resolve)
                }
                
                
            ]
        },
        {
            path: '/login',
            component: resolve => require(['../components/page/Login.vue'], resolve)
        }
    ]
})
