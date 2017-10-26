<template>
    <div class="table" v-loading.body="">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-menu"></i> 运营配置</el-breadcrumb-item>
                <el-breadcrumb-item>版本升级</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="handle-box">
            <el-select v-model="valueselect1" placeholder="平台" style="width:120px;margin-right:10px;">
              <el-option
                v-for="item in option1"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <el-select v-model="valueselect2" placeholder="版本号" style="width:120px;margin-right:10px;">
              <el-option
                v-for="item in option2"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <el-input placeholder="更新人" v-model="realName" class="handle-input mr10"></el-input>
            
            <el-button type="primary" icon="search" @click="search">查询</el-button>
            <el-button type="primary" icon="search" @click="dialogFormVisible = true">更新</el-button>
        </div>
        <el-table :data="tableData" border style="width: 100%" ref="multipleTable">
            <el-table-column prop="id" label="编号">
            </el-table-column>
            <el-table-column prop="" label="平台">
            </el-table-column>
            <el-table-column prop="" label="版本号">
            </el-table-column>
            <el-table-column prop="" label="更新时间" :formatter="dateFormat">
            </el-table-column>
            <el-table-column prop="" label="更新功能" >
            </el-table-column>
            <el-table-column prop="" label="更新文案" >
            </el-table-column>
            <el-table-column prop="" label="更新人" >
            </el-table-column>
        </el-table>
        <el-dialog title="新版本升级" size="tiny" :visible.sync="dialogFormVisible">
          <el-form :model="ruleForm" ref="ruleForm">
            <el-form-item label="平台:" :label-width="formLabelWidth" prop="name">
              <el-input v-model="ruleForm.mode" auto-complete="off" class="inputwidth"></el-input>
            </el-form-item>
            <el-form-item label="版本号:" :label-width="formLabelWidth" prop="account">
              <el-input v-model="ruleForm.mode" auto-complete="off" class="inputwidth"></el-input>
            </el-form-item>
            <el-form-item label="更新功能:" :label-width="formLabelWidth" prop="account">
              <el-input type="textarea" :rows="3" placeholder="" v-model="textarea" class="inputwidth"></el-input>
            </el-form-item>
            <el-form-item label="更新文案:" :label-width="formLabelWidth" prop="account">
              <el-input type="textarea" :rows="3" placeholder="" v-model="textarea" class="inputwidth"></el-input>
            </el-form-item>
            <el-form-item label="上传包:" :label-width="formLabelWidth" prop="account">
              
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取消</el-button>
            <el-button type="primary">提交</el-button>
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
          label: '兴趣贷'
        }, {
          value: '选项2',
          label: '悟空理财'
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

</style>