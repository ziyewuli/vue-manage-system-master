<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-menu"></i> 数据管理</el-breadcrumb-item>
                <el-breadcrumb-item>审核报告</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="auditBox">
            <div class="auditBox-header">
                <h2>贷前审核报告</h2>
                <ul>
                    <li>报告编号：wefewfew14e452we45f2ewh4h4t</li>
                    <li>申请编号：5848489487744568e45f2ewh4h4t</li>
                </ul>
                <p>报告时间：2017-12-12 18:00</p>
            </div>
            <div class="auditBox-top">
                <div class="auditBox-tople"><img src="images/0.jpg"><span>建议通过</span></div>
                <div class="auditBox-topri">
                    <p>申请用户未检测出高危风险，建议通过</p>
                    <span>共发现<i>1</i>异常信息</span>
                </div>
            </div>
            <div class="auditBox-infor">
                <h2>个人基本信息</h2>
                <dl class="dl1">
                    <dd><span>申请借款日期：2017-12-12</span></dd>
                </dl>
                <dl class="dl1">
                    <dd><span>姓名：</span>小米</dd>
                    <dd><span>身份证号码：</span>42282519987854145</dd>
                    <dd><span>手机号码：</span>18563521452</dd>
                    <dd><span>银行卡号：</span>188489454778556548</dd>
                </dl>
                <dl class="dl2">
                    <dt>第一联系人</dt>
                    <dd><span>姓名：</span>校长</dd>
                    <dd><span>手机号码：</span>152488865544</dd>
                    <dd><span>社会关系：</span>朋友</dd>
                </dl>
                <dl class="dl2">
                    <dt>第二联系人</dt>
                    <dd><span>姓名：</span>校长</dd>
                    <dd><span>手机号码：</span>152488865544</dd>
                    <dd><span>社会关系：</span>朋友</dd>
                </dl>
            </div>
            <div class="auditBox-infor">
                <h2>归属地解析</h2>
                <dl class="dl2">
                    <dd><span>身份证所属地：</span>浙江省</dd>
                    <dd><span>手机号码所属地：</span>浙江省</dd>
                    <dd><span>ip所属地：</span>浙江省</dd>
                    <dd><span>银行卡所属地：</span>浙江省</dd>
                </dl>
            </div>
            <div class="auditBox-infor">
                <h2>贷前风险情况</h2>
                <div class="auditBox-table">
                     

                    <table>
                        <colgroup> 
                            <col width="30%"> 
                            <col width="20%"> 
                            <col width="10%"> 
                            <col width="40%"> 
                        </colgroup>
                        <thead>
                            <tr>
                              <th></th>
                              <th>检查项目</th>
                              <th>风险等级</th>
                              <th>备注</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                              <td class="left">个人基本信息审核</td>
                              <td><span class="cur">正常</span></td>
                              <td></td>
                              <td></td>
                            </tr>
                            <tr>
                              <td class="left">风险信息扫描</td>
                              <td><span class="cur">正常</span></td>
                              <td></td>
                              <td></td>
                            </tr>
                            <tr>
                              <td class="left">多平台借贷申请检测</td>
                              <td><span class="red">3个月内申请多个平台借款</span></td>
                              <td>中</td>
                              <td>
                                <p>小额贷款公司：2</p>
                              </td>
                            </tr>
                            <tr>
                              <td class="left">关联人信息扫描</td>
                              <td><span class="cur">正常</span></td>
                              <td></td>
                              <td></td>
                            </tr>
                            <tr>
                              <td class="left">客户行为检测</td>
                              <td><span class="cur">异常</span></td>
                              <td></td>
                              <td></td>
                            </tr>
                        </tbody>
                    </table>

                </div>
            </div>
        </div>

        
        
    </div>
    

</template>

<script>
export default {
    data() {
      return {
        id: this.$route.query.id,
        loading: false,
        selectedGood: []
      };
    },
    created(){
       this.fetchData();
    },
    methods: {
        fetchData(){
          this.loading = true;

          //拿到查询字段，商品的id后进行http请求
          var id = this.id;
          this.$http.get('/api/goods/' + id)
            .then(response => {
              this.selectedGood = response.data.data;
            }, error => {
              console.log(error);
            })

          this.loading = false;
      }
      
    }
  };
</script>

<style scoped>
.auditBox{width:960px;padding:20px;background:#f1f1f1;float:left;}
.auditBox-header{height:60px;overflow: hidden;}
.auditBox-header h2{float:left;font-size:16px;line-height:60px;}
.auditBox-header ul{float:left;padding-left:10px;padding-top:13px;}
.auditBox-header ul li{list-style:none;font-size:12px;}
.auditBox-header p{float:right;font-size:12px;line-height:60px;}

.auditBox-top{margin-bottom:20px;background:#fff;overflow:hidden;}
.auditBox-tople{float:left;width:125px;height:125px;border-radius:50%;overflow:hidden;position: relative;margin: 30px;background:#ccc;}
.auditBox-tople span{display: block;position: absolute;bottom: 5px;width: 100%;text-align: center; padding: 5px 0;font-size:14px;color:#fff;background:#24B105;}
.auditBox-topri{margin-left:300px;}
.auditBox-topri p{font-size:16px;font-weight: bold;padding-top: 65px;}
.auditBox-topri span{display:block; font-size:14px;margin-top:10px;}
.auditBox-topri span i{color:#1910E4;text-decoration: underline;font-style: normal;margin: 0 5px;}

.auditBox-infor{background: #fff;padding: 20px;overflow: hidden;margin-bottom:20px;}
.auditBox-infor h2{font-size: 16px;font-weight: bold;}
.auditBox-infor dl{padding: 10px 0;overflow: hidden;}
.auditBox-infor dl dt{}
.auditBox-infor dl dd{line-height: 30px;}
.auditBox-infor dl.dl1 dd{float: left;width: 400px; font-size: 14px;color: #333;}
.auditBox-infor dl.dl1 dd span{color: #999;}
.auditBox-infor dl.dl2{float: left;margin-right: 150px;}
.auditBox-infor dl.dl2 dt{color: #333;font-weight: bold;margin-bottom: 10px;}
.auditBox-infor dl.dl2 dd{font-size: 14px;color: #333;}
.auditBox-infor dl.dl2 dd span{color: #999;}

.auditBox-table table{width: 100%;}
.auditBox-table table td{border:0; border-bottom: #ddd solid 1px;padding:20px 10px;text-align: center;font-size: 12px;}
.auditBox-table table tr td span.cur{color: #2A8F06;}
.auditBox-table table tr td span.red{color: #f00;}
.auditBox-table table tr td.left{text-align: left;}
.auditBox-table table tr th{color: #666;border-bottom: #ddd solid 1px;padding:20px 10px;}
</style>

