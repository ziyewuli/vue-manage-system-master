<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-menu"></i> 数据管理</el-breadcrumb-item>
                <el-breadcrumb-item>实时监控</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="chartbox">
            <h2>注册实时监控</h2>
            <div class="search">
                <el-input placeholder="" class="handle-input" style="width:160px;"></el-input>
                <el-button type="primary" icon="search" >查询</el-button>
            </div>
            <div class="chartdetail">
                <div id="main" style="width: 800px;height: 450px;"></div>
            </div>
        </div>
        <div class="chartbox">
            <h2>借款申请实时监控</h2>
            <div class="search">
                <el-input placeholder="" class="handle-input" style="width:160px;"></el-input>
                <el-button type="primary" icon="search" >查询</el-button>
            </div>
            <div class="chartdetail">
                
            </div>
        </div>
        <div class="chartbox">
            <h2>人脸识别实时监控</h2>
            <div class="search">
                <el-input placeholder="" class="handle-input" style="width:160px;"></el-input>
                <el-button type="primary" icon="search" >查询</el-button>
            </div>
            <div class="chartdetail">
               
            </div>
        </div>
        <div class="chartbox">
            <h2>手机运营商实时监控</h2>
            <div class="search">
                <el-input placeholder="" class="handle-input" style="width:160px;"></el-input>
                <el-button type="primary" icon="search" >查询</el-button>
            </div>
            <div class="chartdetail">
                
            </div>
        </div>
        <div class="chartbox">
            <h2>芝麻信用实时监控</h2>
            <div class="search">
                <el-input placeholder="" class="handle-input" style="width:160px;"></el-input>
                <el-button type="primary" icon="search" >查询</el-button>
            </div>
            <div class="chartdetail">
                
            </div>
        </div>
        

        
        
    </div>
    

</template>

<script>
    //import Schart from 'vue-schart';
    import echarts from 'echarts'
export default {  
    data() {  
            return {  
                // 初始化空对象  
                chart: null,  
                // 初始化图表配置  
                opinion: ['今日注册', '昨日注册', '前日注册', '3日前注册', '7日前注册'],  
                opinionData: [{  
                    value: 26,  
                    name: '今日注册'  
                }, {  
                    value: 31,  
                    name: '昨日注册'  
                }, {  
                    value: 18,  
                    name: '前日注册'  
                }, {  
                    value: 28,  
                    name: '3日前注册'  
                }, {  
                    value: 21,  
                    name: '7日前注册'  
                }]  
            }  
        },  
        methods: {  
            // 绘图  
            drawGraph(id) {  
                // 绘图方法  
                this.chart = echarts.init(document.getElementById(id))  
                    // 皮肤添加同一般使用方式  
                this.chart.showLoading()  
                    // 返回到data中  
                var that = this  
                    // ajax 请求数据  
            
                this.chart.setOption({  
                    title: {
                        text: ''
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        data:['今日注册', '昨日注册', '前日注册', '3日前注册', '7日前注册']
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: ['周一','周二','周三','周四','周五','周六','周日']
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [
                        {
                            name:'今日注册',
                            type:'line',
                            stack: '总量',
                            data:[120, 132, 101, 134, 90, 230, 210]
                        },
                        {
                            name:'昨日注册',
                            type:'line',
                            stack: '总量',
                            data:[220, 182, 191, 234, 290, 330, 310]
                        },
                        {
                            name:'前日注册',
                            type:'line',
                            stack: '总量',
                            data:[150, 232, 201, 154, 190, 330, 410]
                        },
                        {
                            name:'3日前注册',
                            type:'line',
                            stack: '总量',
                            data:[320, 332, 301, 334, 390, 330, 320]
                        },
                        {
                            name:'7日前注册',
                            type:'line',
                            stack: '总量',
                            data:[820, 932, 901, 934, 1290, 1330, 1320]
                        }
                    ]  
                })  
                this.chart.hideLoading()  
            }  
        },    
        mounted() {  
            this.$nextTick(function() {  
                this.drawGraph('main');
            })  
        }  
}     
</script>

<style scoped>
.chartbox{width:850px;margin-bottom:40px;}
.chartbox h2{line-height:45px;font-size:16px;text-align: center;}
.chartbox ul{text-align:center;padding:10px 0;}
.chartbox ul li{display: inline-block;list-style: none;font-size:14px;margin:0 5px;}
.chartbox ul li i{display:inline-block;width:12px;height:12px;background: #009688;
    vertical-align: inherit;margin-right:5px;border-radius:2px;}
.chartbox ul li.cur i{background:#1d90e6;}
.search{float: right;margin-bottom: 20px;}
.chartdetail{width:800px;}

</style>

