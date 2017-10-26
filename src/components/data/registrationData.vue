<template>
    <div class="table" v-loading.body="">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-menu"></i> 运营配置</el-breadcrumb-item>
                <el-breadcrumb-item>用户反馈</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="handle-box">
            <el-select v-model="valueselect1" placeholder="注册渠道ID" style="width:120px;margin-right:10px;">
              <el-option
                v-for="item in option1"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <el-select v-model="valueselect1" placeholder="注册渠道" style="width:120px;margin-right:10px;">
              <el-option
                v-for="item in option1"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <el-date-picker
              v-model="value0"
              type="datetimerange"
              format="yyyy/MM/dd HH:mm:ss"
              placeholder="选择注册时间范围"
              :picker-options="pickerOptions0">
            </el-date-picker>
            <el-button type="primary" icon="search" @click="search">搜索</el-button>
        </div>
        <el-table :data="tableData" border style="width: 100%" ref="multipleTable">
            <el-table-column prop="id" label="编号" style="font-size:12px;">
            </el-table-column>
            <el-table-column prop="" label="注册时间" :formatter="dateFormat" width="130">
            </el-table-column>
            <el-table-column prop="" label="注册人数" width="100">
            </el-table-column>
            <el-table-column prop="" label="身份证认证人数" width="140">
            </el-table-column>
            <el-table-column prop="" label="身份证认证率"  width="130">
            </el-table-column>
            <el-table-column prop="" label="手机运营商认证人数" width="170">
            </el-table-column>
            <el-table-column prop="" label="手机运营商认证率" width="170">
            </el-table-column>
            <el-table-column prop="" label="芝麻信用认证人数" width="170">
            </el-table-column>
            <el-table-column prop="" label="芝麻信用认证率" width="160" >
            </el-table-column>
            <el-table-column prop="" label="个人信息认证人数" width="170">
            </el-table-column>
            <el-table-column prop="" label="个人信息认证率"  width="150">
            </el-table-column>
            <el-table-column prop="" label="绑卡人数"  width="100">
            </el-table-column>
            <el-table-column prop="" label="绑卡率" >
            </el-table-column>
            <el-table-column prop="" label="申请借款人数"  width="150">
            </el-table-column>
            <el-table-column prop="" label="借款率" >
            </el-table-column>
            <el-table-column prop="" label="审核通过人数"  width="130">
            </el-table-column>
            <el-table-column prop="" label="审核通过率"  width="130">
            </el-table-column>
            <el-table-column prop="" label="黑名单量"  width="100">
            </el-table-column>
            <el-table-column prop="" label="关注名单量"  width="120">
            </el-table-column>
            <el-table-column prop="" label="编辑" >
              <template scope="scope">
                <el-button type="text" size="small" @click="dialogFormVisible = true">报告详情</el-button>
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
                <dl class="feedbackdl">
                  <dt><img src="images/0.jpg">用户</dt>
                  <dd>
                      <p>2017/09/09 23:23:23</p>
                      <span>你好，我为什么不能借款？</span>
                  </dd>
                </dl>
                <dl class="feedbackdl">
                  <dt><img src="images/0.jpg">客服</dt>
                  <dd>
                      <p>2017/09/09 23:23:23</p>
                      <span>经核查，您的信用存疑。</span>
                  </dd>
                </dl>
                <el-input
                  type="textarea"
                  :rows="3"
                  placeholder=""
                  v-model="textarea">
                </el-input>
              </template>
              
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取消</el-button>
            <el-button type="primary" @click="submitForm('ruleForm')">回复</el-button>
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
          disabledDate() {//开始时间
            //end = pickerOptions1.start;
            //end.setTime(end);
          }
        },
        pickerOptions1: {
          disabledDate() {//结束时间
            //start = pickerOptions1.end;
          }
        },
        value0: '',
        value1: '',
        option1: [{
          value: '选项1',
          label: '已回复'
        }, {
          value: '选项2',
          label: '未回复'
        }],
        valueselect1: '',
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

