<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-menu"></i> 用户列表</el-breadcrumb-item>
                <el-breadcrumb-item>用户详情</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="detailbox">
            <h2>基本信息</h2>
            <dl>
                <dd>姓名:<span>xxx</span></dd>
                <dd>手机号:<span></span></dd>
                <dd>性别:<span></span></dd>
                <dd>身份证:<span></span></dd>
                <dd>年龄:<span></span></dd>
                <dd>身份证地址:<span></span></dd>
                <dd>认证状态:<span></span></dd>
                <dd>绑卡状态:<span></span></dd>
                <dd>借款总次数:<span></span></dd>
                <dd>借款总金额:<span></span></dd>
                <dd>最后登录时间:<span></span></dd>
                <dd>注册IP:<span></span></dd>
                <dd>注册地址:<span>xxx</span></dd>
                <dd>来源:<span>xxx</span></dd>
                <dd>最后访问地址:<span></span></dd>
                <dd>同IP注册用户数:<span></span></dd>
                <dd>同设备使用用户数:<span></span></dd>
            </dl>
        </div>
        <div class="detailbox">
            <h2>登录日志</h2>
            <el-table border style="width: 100%;margin-top:20px;" ref="multipleTable">
                <el-table-column prop="id" label="编号" width="100">
                </el-table-column>
                <el-table-column prop="time" label="登录时间">
                </el-table-column>
                <el-table-column prop="ip" label="IP地址"   >
                </el-table-column>
                <el-table-column prop="" label="所在地址" >
                </el-table-column>
                <el-table-column prop="" label="登录设备" >
                </el-table-column>
                <el-table-column prop="" label="登录设备号" >
                </el-table-column>
            </el-table>
        </div>
        <div class="detailbox">
            <h2>认证信息</h2>
            <div class="authentication">
                <ul class="authentication1">
                    <li class="li01">身份证</li>
                    <li class="li02">认证通过</li>
                    <li class="li03">
                        <span>姓名：张毅</span>
                        <span>身份证：43098909890981234</span>
                        <span>生日：2001-12-09</span>
                        <span>户籍地址：xxxxxxxx</span>
                        <span>身份证有效期：2040-09-09</span>
                    </li>
                </ul>
                <ul class="authentication1">
                    <li class="li01">人脸识别</li>
                    <li class="li02">认证通过</li>
                    <li class="li03">
                        <span>匹配度：80%</span>
                    </li>
                </ul>
                <ul class="authentication1">
                    <li class="li01">活体认证</li>
                    <li class="li02">认证通过</li>
                    <li class="li03">
                        <span>活体认证通过</span>
                    </li>
                </ul>
                <ul class="authentication1">
                    <li class="li01">手机运营商</li>
                    <li class="li02">认证通过</li>
                    <li class="li03">
                        <span>最频繁的3位联系人：13678789098 ；13578909890 ；15678909098</span>
                    </li>
                </ul>
                <ul class="authentication1">
                    <li class="li01">芝麻信用</li>
                    <li class="li02">认证通过</li>
                    <li class="li03">
                        <span>分数： 780分</span>
                    </li>
                </ul>
                <ul class="authentication1">
                    <li class="li01">个人信息</li>
                    <li class="li02">认证通过</li>
                    <li class="li03">
                        <span>学历：本科</span>
                        <span>家庭住址：x x x x x x x x x x x x x</span>
                        <span>单位：喝到科技</span>
                        <span>单位地址：x x x x x x x x x x x x x</span>
                        <span>紧急联系人1:张三丰（亲人，13789898909）</span>
                        <span>紧急联系人2:刘湾湾（朋友，13009890989）</span>
                    </li>
                </ul>
            </div>
        </div>
        <div class="detailbox">
            <h2>绑卡信息</h2>
            <el-table border style="width: 100%;margin-top:20px;" ref="multipleTable">
                <el-table-column prop="id" label="编号" width="100">
                </el-table-column>
                <el-table-column prop="time" label="卡号">
                </el-table-column>
                <el-table-column prop="ip" label="银行">
                </el-table-column>
                <el-table-column prop="" label="支行" >
                </el-table-column>
                <el-table-column prop="" label="预留手机号" >
                </el-table-column>
                <el-table-column prop="" label="标记" >
                </el-table-column>
                <el-table-column prop="" label="绑定时间" >
                </el-table-column>
            </el-table>
        </div>
        <div class="detailbox">
            <h2>借款信息（共借款20次，8次审核未通过）</h2>
            <el-table border style="width: 100%;margin-top:20px;" ref="multipleTable">
                <el-table-column prop="id" label="编号" width="100">
                </el-table-column>
                <el-table-column prop="time" label="订单编号">
                </el-table-column>
                <el-table-column prop="ip" label="申请时间">
                </el-table-column>
                <el-table-column prop="" label="借款产品" >
                </el-table-column>
                <el-table-column prop="" label="借款金额(元)" >
                </el-table-column>
                <el-table-column prop="" label="借款期限" >
                </el-table-column>
                <el-table-column prop="" label="实际到账(元)" ></el-table-column>
                <el-table-column prop="" label="借款利息(元)" ></el-table-column>
                <el-table-column prop="" label="额度审核费(元)" ></el-table-column>
                <el-table-column prop="" label="征信查询费(元)" ></el-table-column>
                <el-table-column prop="" label="贷后管理费(元)" ></el-table-column>
                <el-table-column prop="" label="介绍费(元)" ></el-table-column>
                <el-table-column prop="" label="贷前折扣(元)" ></el-table-column>
                <el-table-column prop="" label="系统审核" ></el-table-column>
                <el-table-column prop="" label="系统返回" ></el-table-column>
                <el-table-column prop="" label="打款人" ></el-table-column>
                <el-table-column prop="" label="打款时间" ></el-table-column>
                <el-table-column prop="" label="打款到账号" ></el-table-column>
            </el-table>
        </div>
        <div class="detailbox">
            <h2>账单信息(共还款13次，还款金额13458.00元)</h2>
            <el-table border style="width: 100%;margin-top:20px;" ref="multipleTable">
                <el-table-column prop="id" label="编号" width="100">
                </el-table-column>
                <el-table-column prop="time" label="订单编号">
                </el-table-column>
                <el-table-column prop="ip" label="账单号">
                </el-table-column>
                <el-table-column prop="" label="到期日" >
                </el-table-column>
                <el-table-column prop="" label="借款产品" >
                </el-table-column>
                <el-table-column prop="" label="应还金额(元)" >
                </el-table-column>
                <el-table-column prop="" label="贷后管理费(元)" >
                </el-table-column>
                <el-table-column prop="" label="违约金(元)" >
                </el-table-column>
                <el-table-column prop="" label="减免(元)" >
                </el-table-column>
                <el-table-column prop="" label="实际应还(元)" >
                </el-table-column>
            </el-table>
        </div>
         <div class="detailbox">
            <h2>逾期／坏账信息（共产生逾期12次，坏账1次）</h2>
            <el-table border style="width: 100%;margin-top:20px;" ref="multipleTable">
                <el-table-column prop="id" label="编号" width="100">
                </el-table-column>
                <el-table-column prop="time" label="订单号">
                </el-table-column>
                <el-table-column prop="ip" label="分期">
                </el-table-column>
                <el-table-column prop="" label="账单号" >
                </el-table-column>
                <el-table-column prop="" label="还款日" >
                </el-table-column>
                <el-table-column prop="" label="借款产品" >
                </el-table-column>
                <el-table-column prop="" label="借款金额(元)" >
                </el-table-column>
                <el-table-column prop="" label="借款期限" >
                </el-table-column>
                <el-table-column prop="" label="还款日内应还金额" >
                </el-table-column>
                <el-table-column prop="" label="逾期费(元)" >
                </el-table-column>
                <el-table-column prop="" label="减免(元)" >
                </el-table-column>
                <el-table-column prop="" label="最终应款(元)" >
                </el-table-column>
                <el-table-column prop="" label="销账金额" >
                </el-table-column>
                <el-table-column prop="" label="剩余应还金额" >
                </el-table-column>
                <el-table-column prop="" label="是否进入坏账" >
                </el-table-column>
                <el-table-column prop="" label="进入坏账金额" >
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

