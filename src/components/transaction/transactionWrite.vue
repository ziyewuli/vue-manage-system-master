<template>
    <div class="table" v-loading.body="">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-menu"></i> 交易管理</el-breadcrumb-item>
                <el-breadcrumb-item>手动销账</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="handle-box">
            <el-input placeholder="订单号" v-model="realName" class="handle-input mr10"></el-input>
            <el-input placeholder="借款人" v-model="mobile" class="handle-input mr10"></el-input>
            <el-input placeholder="借款人手机号" class="handle-input mr10"></el-input>
            <el-input placeholder="订单号" style="width:240px;"></el-input>
            <el-button type="primary" icon="search" @click="search">搜索</el-button>
        </div>
        <el-table :data="tableData" border style="width: 100%" ref="multipleTable">
            <el-table-column prop="id" label="编号" width="100">
            </el-table-column>
            <el-table-column prop="" label="订单号">
            </el-table-column>
            <el-table-column prop="" label="下单时间" :formatter="dateFormat" width="100">
            </el-table-column>
            <el-table-column prop="" label="借款人信息">
              <el-table-column prop="" label="借款人">
              </el-table-column>
              <el-table-column prop="" label="手机号" >
              </el-table-column>
            </el-table-column>
            <el-table-column prop="" label="还款账单号" width="120">
            </el-table-column>
            <el-table-column prop="" label="还款日" >
            </el-table-column>
            <el-table-column prop="" label="还款情况" >
              <el-table-column prop="" label="应还总金额" width="120">
              </el-table-column>
              <el-table-column prop="" label="逾期费">
              </el-table-column>
              <el-table-column prop="" label="减免">
              </el-table-column>
              <el-table-column prop="" label="实际应还金额" width="130">
              </el-table-column>
              <el-table-column prop="" label="已还金额" width="100">
              </el-table-column>
              <el-table-column prop="" label="还款状态" width="100">
              </el-table-column>
            </el-table-column>
            <el-table-column prop="" label="详情">
              <template scope="scope">
                <el-button type="text" size="small" @click="dialogFormVisible = true">手动销账</el-button>
              </template>
            </el-table-column>
        </el-table>
        <div class="pagination">
            <el-pagination layout="prev, pager, next" :total="total" :page-size="pagesize" @current-change ="handleCurrentChange">
            </el-pagination>
        </div>


        <el-dialog title="手动销账" size="tiny" :visible.sync="dialogFormVisible">
          <el-form :model="ruleForm" ref="ruleForm">
            <el-form-item label="销账金额(元):" :label-width="formLabelWidth" prop="name">
              <el-input v-model="ruleForm.money" auto-complete="off" class="inputwidth"></el-input>
            </el-form-item>
            <el-form-item label="支付方式:" :label-width="formLabelWidth" prop="account">
              <el-input v-model="ruleForm.mode" auto-complete="off" class="inputwidth"></el-input>
            </el-form-item>
            <el-form-item label="支付账号:" :label-width="formLabelWidth" prop="account">
              <el-input v-model="ruleForm.zhangh" auto-complete="off" class="inputwidth"></el-input>
            </el-form-item>
            <el-form-item label="备注:" :label-width="formLabelWidth" prop="account">
              <el-input type="textarea" :rows="3" placeholder="备注，可为空." v-model="textarea" class="inputwidth"></el-input>
            </el-form-item>
              
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取消</el-button>
            <el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
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
          money: '',
          mode: '',
          zhangh:''
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
       tablefunction(offset,limit,realName,mobile){
          const self = this;
          let url = self.Interface();
          self.$axios.get(url.userSearch,{params:{offset:offset,limit:limit,realName:realName,mobile:mobile}})
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
          this.$router.push('/auditReport');
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

</style>