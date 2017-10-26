<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-menu"></i> 数据管理</el-breadcrumb-item>
                <el-breadcrumb-item>数据总览</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="detailbox">
            <h2>总数据</h2>
            <dl>
                <dd>注册总量:<span>12350</span></dd>
                <dd>完成认证人数:<span>5624</span></dd>
                <dd>完成绑卡人数:<span>5442</span></dd>
                <dd>申请借款人数（人）:<span>12000</span></dd>
                <dd>申请借款笔数（笔）:<span>425</span></dd>
                <dd>申请借款金额（元）:<span>451</span></dd>
                <dd>审核通过笔数（笔）:<span>0</span></dd>
                <dd>审核通过金额（元）:<span>1200</span></dd>
                <dd>打款笔数（笔）:<span>100</span></dd>
                <dd>打款金额（元）:<span>100</span></dd>
                <dd>收回金额（元）:<span></span></dd>
                <dd>正常还款金额（元）:<span></span></dd>
                <dd>逾期后还款金额（元）:<span>xxx</span></dd>
                <dd>坏账金额（元）:<span>xxx</span></dd>
            </dl>
        </div>
        <div class="detailbox">
            <h2>借款数据</h2>
            <dl>
                <dd>日期:<span>1250</span></dd>
                <dd>应还笔数:<span>1250</span></dd>
                <dd>应还金额:<span>1250</span></dd>
                <dd>实际还款笔数:<span>1250</span></dd>
                <dd>实际还款金额:<span>1250</span></dd>
                <dd>实际还款率(笔):<span>1250</span></dd>
                <dd>实际还款率(元):<span>1250</span></dd>
            </dl>
        </div>

        <div class="detailbox">
            <h2>逾期数据</h2>
            <dl>
                <dd>逾期笔数:<span>1250</span></dd>
                <dd>逾期金额:<span>1250</span></dd>
                <dd>平均逾期时间:<span>1250</span></dd>
                <dd>逾期总罚金:<span>1250</span></dd>
                <dd>逾期比(笔数):<span>1250</span></dd>
                <dd>逾期比(金额):<span>1250</span></dd>

            </dl>
        </div>
        <div class="detailbox">
            <h2>坏账数据</h2>
            <dl>
                <dd>坏账笔数:<span>1250</span></dd>
                <dd>坏账金额:<span>1250</span></dd>
                <dd>总体坏账率(笔):<span>1250</span></dd>
                <dd>逾期坏账率(笔):<span>1250</span></dd>

            </dl>
        </div>
        <div class="detailbox">
            <h2>渠道数据</h2>
            <dl>
                <dd>渠道数量:<span>1250</span></dd>
                <dd>渠道花费:<span>1250</span></dd>
                <dd>账单号:<span>1250</span></dd>
                <dd>到期日:<span>1250</span></dd>
                <dd>借款产品:<span>1250</span></dd>
                <dd>应还金额(元):<span>1250</span></dd>
                <dd>贷后管理费(元):<span>1250</span></dd>
                <dd>违约金(元):<span>1250</span></dd>
                <dd>减免(元):<span>1250</span></dd>
                <dd>实际应还(元):<span>1250</span></dd>

            </dl>

        </div>

        
        
    </div>
    

</template>

<script>
export default {
    data() {
      return {

      };
    },
    created(){
       
    },
    methods: {
      
    }
  };
</script>

<style scoped>
.detailbox{
    margin-top:50px;
    padding-left:10px;
}
.detailbox h2{
    font-size:13px;
    color:#666;
    border-left: #666 solid 3px;
    padding-left: 10px;
    height: 16px;
    line-height: 16px;
}
.detailbox dl{
    padding:10px 0;
    overflow: hidden;
}
.detailbox dl dd{
    float:left;
    width:30%;
    font-size:13px;
    padding:5px 0;
}
.detailbox dl dd span{
    margin-left:5px;
    color:#000;
    font-size:14px;
    overflow: hidden;
}
.authentication{
    margin-top:20px;
    border:#dfe6ec solid 1px;
}
.authentication1{
    border-bottom:#dfe6ec solid 1px;
    overflow:hidden;
    position: relative;
}
.authentication1 li{
    display: inline-block;
    list-style:none;
    border-left:#dfe6ec solid 1px;
    height:100%;
    line-height:100%;
}
.authentication1 li.li01{
    position: absolute;
    width:200px;
    text-align: center;
    border-left:0;
    padding-top:15px;
}
.authentication1 li.li02{
    position: absolute;
    width:200px;
    left:200px;
    text-align: center;
    padding-top:15px;
}
.authentication1 li.li03{
    margin-left:400px;
    padding:10px 20px;
}
.authentication1 li span{
    display:block;
    line-height:25px;
    font-size:12px;
}
</style>

