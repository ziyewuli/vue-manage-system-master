<template>
    <div class="table" v-loading.body="">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-menu"></i> 交易管理</el-breadcrumb-item>
                <el-breadcrumb-item>打款列表</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="handle-box">
            <el-input placeholder="订单号" v-model="realName" class="handle-input mr10"></el-input>
            <el-input placeholder="借款人" v-model="mobile" class="handle-input mr10"></el-input>
            <el-input placeholder="手机号" class="handle-input mr10"></el-input>
            <el-select v-model="valueselect1" placeholder="审核状态" style="width:120px;margin-right:10px;">
              <el-option
                v-for="item in option1"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <el-select v-model="valueselect2" placeholder="风险级别" style="width:120px;margin-right:10px;">
              <el-option
                v-for="item in option2"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <div style="margin-top:10px;">
            <el-date-picker
              v-model="value0"
              type="datetimerange"
              format="yyyy/MM/dd HH:mm:ss"
              placeholder="选择下单时间范围"
              :picker-options="pickerOptions0">
            </el-date-picker>
            <!--<router-link :to="{ name: 'auditReport', params: { id: 123 }}">详情</router-link>-->
            <span @click="selectGood()">详情</span>
            <el-button type="primary" icon="search" @click="auditReport()">搜索</el-button>
            </div>
        </div>
        <el-table :data="tableData" border style="width: 100%" ref="multipleTable">
            <el-table-column prop="id" label="编号" width="100">
            </el-table-column>
            <el-table-column prop="id" label="订单号">
            </el-table-column>
            <el-table-column prop="gmt_create" label="下单时间" :formatter="dateFormat">
            </el-table-column>
            <el-table-column prop="memberName" label="借款人">
            </el-table-column>
            <el-table-column prop="telphone" label="手机号" >
            </el-table-column>
            <el-table-column prop="productCode" label="产品名称" >
            </el-table-column>
            <el-table-column prop="amtLoan" label="借款金额(元)">
            </el-table-column>
            <el-table-column prop="amtMoney" label="到账金额(元)" >
            </el-table-column>
            <el-table-column prop="riskGrade" label="风险级别" >
            </el-table-column>
            <el-table-column prop="" label="审核报告" >
              <template scope="scope">
                <el-button type="text" size="small" @click="auditReport()">报告详情</el-button>
              </template>
            </el-table-column>
            <el-table-column prop="" label="操作" >
              <template scope="scope">
                <el-button type="text" size="small" @click="dialogFormVisible = true">打款</el-button>
              </template>
            </el-table-column>
        </el-table>
        <div class="pagination">
            <el-pagination layout="prev, pager, next" :total="total" :page-size="pagesize" @current-change ="handleCurrentChange">
            </el-pagination>
        </div>
        <el-dialog title="打款" size="tiny" :visible.sync="dialogFormVisible">
          <el-form :model="ruleForm" ref="ruleForm">
              <template scope="scope">
                <p class="tranP">到账银行：中国银行</p>
                <p class="tranP">到账卡号：4567 9809 9878 9890</p>
                <p class="tranP">到账金额：980.09元</p>
                <el-input
                  type="textarea"
                  :rows="3"
                  placeholder="请添加打款备注，可为空."
                  v-model="textarea">
                </el-input>
              </template>
              
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="submitForm('ruleForm')">打款</el-button>
            <el-button @click="dialogFormVisible = false">拒绝</el-button>
            <el-button @click="dialogFormVisible = false">取消</el-button>
            
          </div>
        </el-dialog>
    </div>
    

</template>

<script>
import qs from 'qs';
import { Loading } from 'element-ui';
import moment from 'moment';
export default {
    data() {
      return {
        pickerOptions0: {
          disabledDate(time) {

          }
        },
        value0: '',
        value1: '',
        option1: [{
          value: '选项1',
          label: '通过'
        }, {
          value: '选项2',
          label: '建议审核'
        }],
        option2: [{
          value: '选项1',
          label: '低'
        }, {
          value: '选项2',
          label: '高'
        }],
        valueselect1: '',
        valueselect2: '',
        dialogTableVisible: false,
        dialogFormVisible: false,
        ruleForm: {
          name: '',
          account: '',
          status:'',
          region: '',
          statusExplain:'',
          organization:''
        },
        formLabelWidth: '120px',
        rolelist:[],
        statuslist:[],
        tableData:[],
        loading: true,
        total:1,
        pagesize:10,
        mobile:'',
        realName:'',
        textarea:''
      };
    },
    created(){
        this.roledata();
        this.tablefunction(this.currentPage,this.pagesize,this.realName,this.mobile);
    },
    methods: {
        roledata(rolelist){
          const self = this;
          let url = self.Interface();
          self.$axios.get(url.enumUrl)
          .then(function (response) {
            const role = response.data.t;
            self.rolelist = role.userTypePreferences;
            self.statuslist = role.userStatusPreferences;

          })
          .catch(function (error) {
            console.log(error);
          });
        },
        submitForm(formName) {
            const self = this;    
            let url = self.Interface();      
            self.$refs[formName].validate((valid) => {
                if (valid) {
                    self.$axios.post(url.userInsert,qs.stringify({
                        mobile: self.ruleForm.account,
                        realName: self.ruleForm.name,
                        type: self.ruleForm.region,
                        status:self.ruleForm.status,
                        statusExplain:self.ruleForm.statusExplain,
                        organization:self.ruleForm.organization
                    }))
                    .then(function (response) {
                        if(response.data.status=='SUCCESS'){
                            self.$message({message:response.data.text,type: 'success'});
                            self.dialogFormVisible = false;
                        }else{
                            self.$message.error(response.data.description);
                            self.dialogFormVisible = false;
                        }
                    })
                    .catch(function (response) {
                        self.$message.error('服务器错误，请稍等！');
                        self.dialogFormVisible = false;
                    });
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
       },
       tablefunction(offset,limit,realName,mobile){
          const self = this;
          let url = self.Interface();
          self.$axios.get(url.transactionMoney,{params:{offset:offset,limit:limit,realName:realName,mobile:mobile}})
          .then(function (response) {
            const rows = response.data.t.rows;
            self.tableData = rows;
            for(var i=0;i<rows.length;i++){
                if(rows[i].type==10){
                    rows[i].type = '普通员工';
                } else if(rows[i].type==20){
                    rows[i].type = '部门管理员';
                } else{
                    rows[i].type = '系统管理员';
                }
            }
            self.loading=false;
            self.total = response.data.t.total
          })
          .catch(function (error) {
            self.loading=false;
            console.log(error);
          });
       },
        dateFormat:function(row, column) {  
            var date = row[column.property];  
            if (date == undefined) {  
                return "";  
            }  
            return moment(date).format("YYYY-MM-DD HH:mm:ss");  
        },
        handleCurrentChange(val){
            this.currentPage = (val-1)*this.pagesize;
            
            this.tablefunction(this.currentPage,this.pagesize,this.realName,this.mobile);
        },
        search(){
            this.tablefunction(0,this.pagesize,this.realName,this.mobile);
        },
        auditReport(){
          //this.$router.push({path:'/auditReport/'+1});
        },
        selectGood(){
         this.$router.push({
            path: 'auditReport',
            query:{id:12}})
        }
      
    }
  };
</script>

<style scoped>
.handle-box{
    margin-bottom: 20px;
}
.handle-select{
    width: 120px;
}
.handle-input{
    width: 150px;
    display: inline-block;
}
.mr10{
    margin-right:10px;
}
.newaddsuer{
    margin-right:20px;
}
.inputwidth{
    width:220px;
}
.tranP{
    margin-bottom:20px;
}
</style>