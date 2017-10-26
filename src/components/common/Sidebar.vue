<template>
    <div class="sidebar">
        <el-menu :default-active="onRoutes" class="el-menu-vertical-demo" theme="dark" unique-opened router>
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index">
                        <template slot="title"><i :class="item.icon"></i>{{ item.title }}</template>
                        <el-menu-item v-for="(subItem,i) in item.subs" :key="i" :index="subItem.index">{{ subItem.title }}
                        </el-menu-item> 
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index">
                        <i :class="item.icon"></i>{{ item.title }}
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                items: [
                    {
                        icon: 'el-icon-upload',
                        index: 'readme',
                        title: '数据管理',
                        subs: [
                            {
                                index: 'dataOverview',
                                title: '数据总览'
                            },
                            {
                                index: 'dataChart',
                                title: '实时监控'
                            },
                            {
                                index: 'registrationData',
                                title: '注册统计'
                            },
                            {
                                index: 'loanData',
                                title: '借款统计'
                            },
                            {
                                index: 'channelData',
                                title: '渠道统计'
                            },
                            {
                                index: 'invitationData',
                                title: '邀请统计'
                            }
                        ]
                    },
                    {
                        icon: 'el-icon-star-on',
                        index: 'userlist',
                        title: '用户管理',
                        subs: [
                            {
                                index: 'userlist',
                                title: '用户列表'
                            },
                            {
                                index: 'userAssets',
                                title: '用户资产'
                            }
                        ]
                    },
                    {
                        icon: 'el-icon-d-caret',
                        index: 'transactionList',
                        title: '交易管理',
                        subs: [
                            {
                                index: 'transactionMoney',
                                title: '打款'
                            },
                            {
                                index: 'transactionLoan',
                                title: '借款列表'
                            },
                            {
                                index: 'transactionPlayList',
                                title: '打款列表'
                            },
                            {
                                index: 'transactionBill',
                                title: '账单列表'
                            },
                            {
                                index: 'transactionWrite',
                                title: '手动销账'
                            }
                        ],
                    },
                    {
                        icon: 'el-icon-date',
                        index: 'feedback',
                        title: '运营配置',
                        subs: [
                            {
                                index: 'feedback',
                                title: '用户反馈'
                            },
                            {
                                index: 'product',
                                title: '产品配置'
                            },
                            {
                                index: 'closedArea',
                                title: '关闭区域'
                            },
                            {
                                index: 'authentication',
                                title: '认证配置'
                            },
                            {
                                index: 'repaymentMethods',
                                title: '还款方式配置'
                            },
                            {
                                index: 'versionUpgrade',
                                title: '版本升级'
                            }
                        ]
                    },
                    {
                        icon: 'el-icon-minus',
                        index: 'channel',
                        title: '渠道管理',
                        subs: [
                            {
                                index: 'channelList',
                                title: '渠道列表'
                            },
                            {
                                index: 'channelInfor',
                                title: '渠道数据'
                            }
                        ]
                    },
                    {
                        icon: 'el-icon-message',
                        index: 'reconciliation',
                        title: '财务对账',
                        subs: [
                            {
                                index: 'reconciliationPlay',
                                title: '打款金额'
                            },
                            {
                                index: 'reconciliationRepayment',
                                title: '还款金额'
                            },
                            {
                                index: 'reconciliationChannel',
                                title: '渠道对账'
                            }
                        ]
                    },
                    {
                        icon: 'el-icon-setting',
                        index: 'jurisdictio',
                        title: '权限管理',
                        subs: [
                            {
                                index: 'jurisdictioLists',
                                title: '用户列表'
                            }
                        ]
                    }
                ]
            }
        },
        computed:{
            onRoutes(){
                //return this.$route.path.replace('/','');

                var returnData=this.$route.name ? this.$route.name : this.$route.path.replace('/','');
                return returnData;
                
            }
        }
    }
</script>

<style scoped>
    .sidebar{
        display: block;
        position: absolute;
        width: 250px;
        left: 0;
        top: 70px;
        bottom:0;
        background: #2E363F;
    }
    .sidebar > ul {
        height:100%;
    }
</style>
