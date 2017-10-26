<template>
    <div class="table" v-loading.body="">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-menu"></i> 渠道管理</el-breadcrumb-item>
                <el-breadcrumb-item>渠道列表</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="handle-box">
            <el-input placeholder="渠道ID" v-model="realName" class="handle-input mr10"></el-input>
            <el-input placeholder="渠道名称" v-model="realName" class="handle-input mr10"></el-input>
            <el-select v-model="valueselect1" placeholder="结算方式" style="width:120px;margin-right:10px;">
              <el-option
                v-for="item in option1"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <el-input placeholder="添加人" v-model="realName" class="handle-input mr10"></el-input>
            <el-date-picker
              v-model="value0"
              type="datetimerange"
              format="yyyy/MM/dd HH:mm:ss"
              placeholder="选择下单时间范围"
              :picker-options="pickerOptions0">
            </el-date-picker>
            <el-button type="primary" icon="search" @click="search">搜索</el-button>
            <el-button type="info" class="newaddsuer" @click="dialogFormVisible = true">添加渠道</el-button>
        </div>
        <el-table :data="tableData" border style="width: 100%" ref="multipleTable">
            <el-table-column prop="id" label="编号">
            </el-table-column>
            <el-table-column prop="" label="渠道ID">
            </el-table-column>
            <el-table-column prop="" label="渠道名称">
            </el-table-column>
            <el-table-column prop="" label="结算方式">
            </el-table-column>
            <el-table-column prop="" label="结算价格">
            </el-table-column>
            <el-table-column prop="" label="渠道地址">
            </el-table-column>
            <el-table-column prop="" label="添加人">
            </el-table-column>
            <el-table-column prop="" label="添加时间" :formatter="dateFormat">
            </el-table-column>
        </el-table>
        <div class="pagination">
            <el-pagination layout="prev, pager, next" :total="total" :page-size="pagesize" @current-change ="handleCurrentChange">
            </el-pagination>
        </div>
        <el-dialog title="新增产品" size="tiny" :visible.sync="dialogFormVisible">
          <el-form :model="ruleForm" ref="ruleForm">
            <el-form-item label="渠道名称:" :label-width="formLabelWidth" prop="name">
              <el-input v-model="ruleForm.money" auto-complete="off" class="inputwidth"></el-input>
            </el-form-item>
            <el-form-item label="结算方式" :label-width="formLabelWidth" prop="status">
                <el-select v-model="ruleForm.status" placeholder="请选择状态">
                <el-option v-for="item in statuslist" :key="item.value.toString()" :label="item.name" :value="item.value.toString()"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="结算价格:" :label-width="formLabelWidth" prop="name">
              <el-input auto-complete="off" class="inputwidth80"></el-input> 元
            </el-form-item>
            <el-form-item label="渠道地址:" :label-width="formLabelWidth" prop="name">
              
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取消</el-button>
            <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
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
        option1: [{
          value: '选项1',
          label: '上架'
        }, {
          value: '选项2',
          label: '下架'
        }],
        value0:'',
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
.inputwidth80{
    width:80px;
}


</style>