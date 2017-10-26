<template>
    <div class="table" >
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-menu"></i> 交易列表</el-breadcrumb-item>
                <el-breadcrumb-item>列表详情</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="detailbox">
            <h2>订单信息</h2>
            <dl>
                <dd>订单号:<span>xxx</span></dd>
                <dd>借款人:<span></span></dd>
                <dd>手机号:<span></span></dd>
                <dd>申请时间:<span></span></dd>
                <dd>下单时IP:<span></span></dd>
                <dd>下单时地址:<span></span></dd>
                <dd>借款产品:<span></span></dd>
                <dd>借款金额:<span></span></dd>
                <dd>借款期限:<span></span></dd>
                <dd>实际到账:<span></span></dd>
                <dd>借款利息:<span></span></dd>
                <dd>额度审核费:<span></span></dd>
                <dd>征信查询费:<span>xxx</span></dd>
                <dd>贷后管理费:<span>xxx</span></dd>
                <dd>介绍费:<span></span></dd>
                <dd>下单减免:<span></span></dd>
                <dd>应还金额:<span></span></dd>
                <dd>审核状态:<span></span></dd>
                <dd>审核返回:<span></span></dd>
                <dd>风险等级:<span></span></dd>
                <dd>打款人:<span></span></dd>
                <dd>打款时间:<span></span></dd>
                <dd>打款到账号:<span></span></dd>
                <dd>所在银行:<span></span></dd>
            </dl>
        </div>
        <div class="detailbox">
            <h2>借款人信息</h2>
            <dl>
                <dd>注册时间:<span>xxx</span></dd>
                <dd>注册账号:<span></span></dd>
                <dd>姓名:<span></span></dd>
                <dd>身份证:<span></span></dd>
                <dd>申请借款次数:<span></span></dd>
                <dd>申请借款金额:<span></span></dd>
                <dd>成功借款次数:<span></span></dd>
                <dd>成功借款金额:<span></span></dd>
                <dd>逾期次数:<span></span></dd>
                <dd>逾期金额:<span></span></dd>
                <dd>坏账次数:<span></span></dd>
                <dd>坏账金额:<span></span></dd>
                <dd>风险等级:<span>xxx</span></dd>
                <dd>紧急联系人1:<span>xxx</span></dd>
                <dd>紧急联系人2:<span></span></dd>
                <dd>通话记录TOP3:<span></span></dd>
            </dl>
        </div>
        <div class="detailbox">
            <h2>账单信息</h2>
            <el-table border style="width: 100%;margin-top:20px;" ref="multipleTable">
                <el-table-column prop="id" label="编号" width="100">
                </el-table-column>
                <el-table-column prop="time" label="还款单号">
                </el-table-column>
                <el-table-column prop="ip" label="期数">
                </el-table-column>
                <el-table-column prop="" label="还款日" >
                </el-table-column>
                <el-table-column prop="" label="应还金额(元)" >
                </el-table-column>
                <el-table-column prop="" label="是否逾期" >
                </el-table-column>
                <el-table-column prop="" label="逾期时间(天)" >
                </el-table-column>
                <el-table-column prop="" label="逾期金额(元)" >
                </el-table-column>
                <el-table-column prop="" label="减免(元)" >
                </el-table-column>
                <el-table-column prop="" label="应还总金额(元)" >
                </el-table-column>
                <el-table-column prop="" label="还款状态" >
                </el-table-column>
                <el-table-column prop="" label="实际还款金额(元)" >
                </el-table-column>
                <el-table-column prop="" label="还款时间" >
                </el-table-column>
                <el-table-column prop="" label="还款方式" >
                </el-table-column>
                <el-table-column prop="" label="是否坏账" >
                </el-table-column>
                <el-table-column prop="" label="坏账金额(元)" >
                </el-table-column>
            </el-table>
        </div>
        <div class="detailbox">
            <h2>逾期信息</h2>
            <el-table border style="width: 100%;margin-top:20px;" ref="multipleTable">
                <el-table-column prop="id" label="编号" width="100">
                </el-table-column>
                <el-table-column prop="time" label="还款单号">
                </el-table-column>
                <el-table-column prop="ip" label="逾期单号">
                </el-table-column>
                <el-table-column prop="" label="期数" >
                </el-table-column>
                <el-table-column prop="" label="产生时间" >
                </el-table-column>
                <el-table-column prop="" label="逾期金额" >
                </el-table-column>
                <el-table-column prop="" label="应还金额" >
                </el-table-column>
                <el-table-column prop="" label="实际还款" >
                </el-table-column>
            </el-table>
        </div>
        <div class="detailbox">
            <h2>减免信息</h2>
            <el-table border style="width: 100%;margin-top:20px;" ref="multipleTable">
                <el-table-column prop="id" label="编号" width="100">
                </el-table-column>
                <el-table-column prop="time" label="减免产品">
                </el-table-column>
                <el-table-column prop="ip" label="减免金额">
                </el-table-column>
                <el-table-column prop="" label="减免时间" >
                </el-table-column>
                <el-table-column prop="" label="操作人" >
                </el-table-column>
                <el-table-column prop="" label="减免备注" >
                </el-table-column>
                <el-table-column prop="" label="剩余应还金额" >
                </el-table-column>
            </el-table>
        </div>
    </div>
    

</template>

<script>
import qs from 'qs';
import { Loading } from 'element-ui';
import moment from 'moment';
export default {
    name:'detail',
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
</style>