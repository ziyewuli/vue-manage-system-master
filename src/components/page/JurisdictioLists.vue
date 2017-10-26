<template>
    <div class="table" v-loading.body="loading">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-menu"></i> 权限管理</el-breadcrumb-item>
                <el-breadcrumb-item>用户列表</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="handle-box">
            <el-input placeholder="登录名" v-model="realName" class="handle-input mr10"></el-input>
            <el-input placeholder="手机号" v-model="mobile" class="handle-input mr10"></el-input>
            <el-input placeholder="昵称" class="handle-input mr10"></el-input>
            <el-input placeholder="组织机构" class="handle-input mr10"></el-input>
            <el-select v-model="valueselect0" placeholder="用户类型" class="mr10">
              <el-option
                v-for="item in options1"
                :key="item.name"
                :label="item.name"
                :value="item.value">
              </el-option>
            </el-select>
            <div style="margin-top:10px;">
                <el-select v-model="valueselect1" placeholder="状态" class="mr10">
                  <el-option
                    v-for="item in options2"
                    :key="item.value"
                    :label="item.name"
                    :value="item.value">
                  </el-option>
                </el-select>
                <el-button type="primary" icon="search" @click="search">搜索</el-button>
                <el-button type="info" class="newaddsuer"  @click="addAccount">新增账号</el-button>
            </div>

            
        </div>
        <el-table :data="tableData" border style="width: 100%" ref="multipleTable">
            <el-table-column prop="id" label="序号">
  
            </el-table-column>
            <el-table-column prop="mobile" label="登录名" width="140">
            </el-table-column>
            <el-table-column prop="realName" label="昵称" width="120">
            </el-table-column>
            <el-table-column prop="organization" label="组织机构" width="100">
            </el-table-column>
            <el-table-column prop="type" label="用户类型" width="140">
            </el-table-column>
            <el-table-column prop="mobile" label="移动电话" width="160">
            </el-table-column>
            <el-table-column prop="email" label="邮箱地址" width="160">
            </el-table-column>
            <el-table-column prop="status" label="状态" width="100">
            </el-table-column>
            <el-table-column prop="modifyName" label="更新人" width="140">
            </el-table-column>
            <el-table-column prop="gmtCreate" label="更新时间" :formatter="dateFormat" width="180">
            </el-table-column>
            <el-table-column prop="" label="操作" :formatter="dateFormat" width="250">
              <template scope="scope">
                <el-button size="small" prop="id" @click="editAccount(scope.row,scope.$index)">编辑</el-button>
                <el-button size="small">重置密码</el-button>
                <el-button size="small" type="danger">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="pagination">
            <el-pagination layout="prev, pager, next" :total="total" :page-size="pagesize" @current-change ="handleCurrentChange">
            </el-pagination>
        </div>
        <el-dialog title="新增用户" size="small" :visible.sync="dialogFormVisible">
          <div style="overflow: hidden;">
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
            <el-form-item label="登录名" :label-width="formLabelWidth" prop="mobile" style="float:left;height:36px;">
              <el-input v-model="ruleForm.mobile" auto-complete="off" class="inputwidth"></el-input>
            </el-form-item>
            <el-form-item label="呢称" :label-width="formLabelWidth" prop="realName" style="float:left;height:36px;">
              <el-input v-model="ruleForm.realName" auto-complete="off" class="inputwidth"></el-input>
            </el-form-item>
            <el-form-item label="用户类型" :label-width="formLabelWidth" prop="type" style="float:left;height:36px;">
                <el-select v-model="ruleForm.type" placeholder="请选择">
                <el-option v-for="item in options1" :key="item.value.toString()" :label="item.name" :value="item.value.toString()"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="用户状态" :label-width="formLabelWidth" prop="status" style="float:left;height:36px;">
                <el-select v-model="ruleForm.status" placeholder="请选择状态">
                <el-option v-for="item in options2" :key="item.value.toString()" :label="item.name" :value="item.value.toString()"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="用户状态说明" :label-width="formLabelWidth" prop="statusExplain" style="float:left;">
              <el-input v-model="ruleForm.statusExplain" auto-complete="off" class="inputwidth"></el-input>
            </el-form-item>
            <el-form-item label="组织机构" :label-width="formLabelWidth" prop="organization" style="float:left;">
              <el-input v-model="ruleForm.organization" auto-complete="off" class="inputwidth"></el-input>
            </el-form-item>
            <el-form-item label="邮箱地址" :label-width="formLabelWidth" prop="email" style="float:left;">
              <el-input v-model="ruleForm.email" auto-complete="off" class="inputwidth"></el-input>
            </el-form-item>
            <el-form-item label="QQ" :label-width="formLabelWidth" prop="qq" style="float:left;">
              <el-input v-model="ruleForm.qq" auto-complete="off" class="inputwidth"></el-input>
            </el-form-item>
            <el-form-item label="座席号" :label-width="formLabelWidth" prop="agentNo" style="float:left;">
              <el-input v-model="ruleForm.agentNo" auto-complete="off" class="inputwidth"></el-input>
            </el-form-item>
            <el-form-item label="描述" :label-width="formLabelWidth" prop="remarks" style="float:left;">
              <el-input v-model="ruleForm.remarks" auto-complete="off" class="inputwidth"></el-input>
            </el-form-item>
          </el-form>
          </div>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
          </div>
        </el-dialog>
        <el-dialog title="编辑用户" size="tiny" :visible.sync="dialogTableVisible">
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
            <el-form-item label="姓名" :label-width="formLabelWidth" prop="name">
              <el-input v-model="ruleForm.name" auto-complete="off" class="inputwidth"></el-input>
            </el-form-item>
            <el-form-item label="手机号码" :label-width="formLabelWidth" prop="account">
              <el-input v-model="ruleForm.account" auto-complete="off" class="inputwidth"></el-input>
            </el-form-item>
            
            <el-form-item label="用户类型" :label-width="formLabelWidth" prop="region">
                <el-select v-model="ruleForm.region" placeholder="请选择角色">
                <el-option v-for="item in options1" :key="item.value.toString()" :label="item.name" :value="item.value.toString()"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="用户状态" :label-width="formLabelWidth" prop="status">
                <el-select v-model="ruleForm.status" placeholder="请选择状态">
                <el-option v-for="item in options2" :key="item.value.toString()" :label="item.name" :value="item.value.toString()"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="用户状态说明" :label-width="formLabelWidth" prop="statusExplain">
              <el-input v-model="ruleForm.statusExplain" auto-complete="off" class="inputwidth"></el-input>
            </el-form-item>
            <el-form-item label="组织机构" :label-width="formLabelWidth" prop="organization">
              <el-input v-model="ruleForm.organization" auto-complete="off" class="inputwidth"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
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
        options1:[],
        options2:[],
        valueselect0:'',
        valueselect1:'',
        dialogTableVisible: false,
        dialogFormVisible: false,
        ruleForm: {
          mobile: '',
          realName: '',
          type:'',
          status:'',
          organization:'',
          statusExplain:'',
          email:'',
          qq:'',
          agentNo:'',
          remarks:''
        },
        rules: {
          mobile: [
            { required: true, message: '请输入登录名', trigger: 'blur' },
            { min: 2, max: 32, message: '长度在 2 到 32 个字符', trigger: 'blur' }
          ],
          realName: [
            { required: true, message: '请输入呢称', trigger: 'blur' },
            { min: 1, max: 11, message: '长度在 2 到 32个字符', trigger: 'blur' }
          ],
          type: [{ required: true, message: '请选择类型', trigger: 'blur' }],
          status:[
            { required: true, message: '请选择状态', trigger: 'blur' }
          ],
          organization:[
            { required: true, message: '请输入组织机构', trigger: 'blur' }
          ],
          statusExplain:[
            { required: true, message: '请输入用户状态说明', trigger: 'blur' }
          ]
        },
        formLabelWidth: '120px',
        rolelist:[],
        statuslist:[],
        tableData:[],
        loading: true,
        total:1,
        pagesize:10,
        mobile:'',
        realName:''
      };
    },
    created(){
        this.roledata();
        this.tablefunction(this.currentPage,this.pagesize,this.realName,this.mobile);
    },
    methods: {
        //下拉用户类型，状态
        roledata(rolelist){
          const self = this;
          let url = self.Interface();
          self.$axios.get(url.enumUrl)
          .then(function (response) {
            //用户类型
            const userType = response.data.t.userTypePreferences;  
            self.options1 = userType;
            //状态
            const userStatus = response.data.t.userStatusPreferences;
            self.options2 = userStatus;

          })
          .catch(function (error) {
            console.log(error);
          });
        },
        //添加新用户
        submitForm(formName) {
            const self = this;    
            let url = self.Interface();      
            self.$refs[formName].validate((valid) => {
                if (valid) {
                    self.$axios.post(url.userInsert,qs.stringify({
                        mobile: self.ruleForm.mobile,
                        realName: self.ruleForm.realName,
                        type:self.ruleForm.type,
                        status:self.ruleForm.status,
                        region: self.ruleForm.region,
                        organization:self.ruleForm.organization,
                        statusExplain:self.ruleForm.organization,
                        email:self.ruleForm.email,
                        qq:self.ruleForm.qq,
                        agentNo:self.ruleForm.agentNo,
                        remarks:self.ruleForm.remarks
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
       //添加用户
       addAccount(){
         //添加默认数据为空
         this.ruleForm={
          mobile: '',
          realName: '',
          type:'',
          status:'',
          organization:'',
          statusExplain:'',
          email:'',
          qq:'',
          agentNo:'',
          remarks:''
        };
         //显示弹窗
         this.dialogFormVisible=true;
        },
       //编辑用户
       editAccount(row,_index){
         //记录索引
         this.listIndex=_index;
         //记录数据
         this.ruleForm=row;
         //显示弹窗
         this.dialogFormVisible=true;
        },
       //列表渲染
       tablefunction(offset,limit,realName,mobile){
          const self = this;
          let url = self.Interface();
          self.$axios.get(url.userSearch,{params:{offset:offset,limit:limit,realName:realName,mobile:mobile}})
          .then(function (response) {
            const rows = response.data.t.rows;
            self.tableData = rows;
            for(var i=0;i<rows.length;i++){
                if(rows[i].status==10){
                    rows[i].status = '正常';
                } else if(rows[i].status==60){
                    rows[i].status = '冻结';
                } else if(rows[i].status==70){
                    rows[i].status = '停职';
                } else if(rows[i].status==90){
                    rows[i].status = '离职';
                }
            }
            for(var i=0;i<rows.length;i++){
                if(rows[i].type==10){
                    rows[i].type = '普通员工';
                } else if(rows[i].type==20){
                    rows[i].type = '部门管理员';
                } else if(rows[i].type==30){
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
    width: 200px;
    display: inline-block;
}
.newaddsuer{
    margin-right:20px;
}
.inputwidth{
    width:220px;
}
.mr10{
    margin-right:10px;
}
</style>