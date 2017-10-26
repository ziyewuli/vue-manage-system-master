<template>
    <div class="table" v-loading.body="loading">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-menu"></i> 权限管理</el-breadcrumb-item>
                <el-breadcrumb-item>角色管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="handle-box">
            <el-input placeholder="角色名" v-model="searchs.name" class="handle-input mr10"></el-input>
            <el-input placeholder="角色代码" v-model="searchs.code" class="handle-input mr10"></el-input>
            <el-select v-model="searchs.status" placeholder="状态" class="mr10">
              <el-option
                v-for="item in options1"
                :key="item.name"
                :label="item.name"
                :value="item.value">
              </el-option>
            </el-select>
            <el-button type="primary" icon="search" @click="search">搜索</el-button>
            <el-button type="info" class="newaddsuer" @click="addroleshow">新增角色</el-button>
            
        </div>
        <el-table :data="tableData" border style="width: 100%" ref="multipleTable">
            <el-table-column prop="id" label="序号">
            </el-table-column>
            <el-table-column prop="name" label="角色名" width="140">
            </el-table-column>
            <el-table-column prop="code" label="角色代码" width="120">
            </el-table-column>
            <el-table-column prop="remarks" label="描述" width="200">
            </el-table-column>
            <el-table-column prop="status" label="状态" width="100">
            </el-table-column>
            <el-table-column prop="modifyName" label="更新人" width="100">
            </el-table-column>
            <el-table-column prop="gmtCreate" label="更新时间" :formatter="dateFormat" width="180">
            </el-table-column>
            <el-table-column prop="" label="操作" :formatter="dateFormat" width="250">
              <template scope="scope">
                <el-button size="small" prop="id" @click="editAccount(scope.row,scope.$index,'ruleForm')">编辑</el-button>
                <el-button size="small">权限分配</el-button>
                <el-button size="small" type="danger">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="pagination">
            <el-pagination layout="prev, pager, next" :total="total" :page-size="pagesize" @current-change ="handleCurrentChange">
            </el-pagination>
        </div>


        <el-dialog title="新增角色" size="tiny" :visible.sync="dialogFormVisible">
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
            <el-form-item label="角色名" :label-width="formLabelWidth" prop="name" >
              <el-input v-model="ruleForm.uname" auto-complete="off" class="inputwidth"></el-input>
            </el-form-item>
            <el-form-item label="角色代码" :label-width="formLabelWidth" prop="code" >
              <el-input v-model="ruleForm.ucode" auto-complete="off" class="inputwidth"></el-input>
            </el-form-item>
            <el-form-item label="用户状态" :label-width="formLabelWidth" prop="status" >
                <el-select v-model="ruleForm.ustatus" placeholder="请选择">
                <el-option v-for="item in options1" :key="item.value.toString()" :label="item.name" :value="item.value.toString()"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="描述" :label-width="formLabelWidth" prop="remarks" >
              <el-input type="textarea" v-model="ruleForm.uremarks" auto-complete="off" class="inputwidth"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="closeRole('ruleForm')">取 消</el-button>
            <el-button type="primary" @click="addrole('ruleForm')">确 定</el-button>
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
        ruleForm:{
          uname:'',
          ucode:'',
          ustatus:'',
          uremarks:''
        },
        rules:{
          name: [{ required: true, message: '请输入角色名', trigger: 'blur' }],
          code: [{ required: true, message: '请输入角色代码', trigger: 'blur' }],
          status: [{ required: true, message: '请选择状态', trigger: 'blur' }],
        },
        options1:[],
        dialogTableVisible: false,
        dialogFormVisible: false,
        formLabelWidth: '120px',
        tableData:[],
        loading: true,
        total:1,
        pagesize:10,
        searchs:{
          name:'',
          code:'',
          status:''
        }
        
      };
    },
    created(){
        this.roledata();
        this.tablefunction(this.currentPage,this.pagesize,this.searchs.name,this.searchs.code,this.status);
    },
    methods: {
        //下拉状态
        roledata(rolelist){
          const self = this;
          let url = self.Interface();
          self.$axios.get(url.enumUrl)
          .then(function (response) {
            //状态
            const userStatus = response.data.t.roleStatusPreferences;
            self.options1 = userStatus;

          })
          .catch(function (error) {
            console.log(error);
          });
        },

       //列表渲染
       tablefunction(offset,limit,name,code,status){
          const self = this;
          let url = self.Interface();
          self.$axios.get(url.juese,{params:{offset:offset,limit:limit,name:name,code:code,status:status}})
          .then(function (response) {
            const rows = response.data.t.rows;
            self.tableData = rows;
            for(var i=0;i<rows.length;i++){
                if(rows[i].status==0){
                    rows[i].status = '正常';
                } else if(rows[i].status==1){
                    rows[i].status = '停用';
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
       //显示添加角色弹窗
       addroleshow(){
          //初始化数据
          this.ruleForm={};
          //显示弹窗
         this.dialogFormVisible=true;
       },
       //添加角色
       addrole(formName){
          const self = this;    
          let url = self.Interface();      
          self.$refs[formName].validate((valid) => {
                if (valid) {
                    self.$axios.post(url.addjuese,qs.stringify({
                        name: self.ruleForm.uname,
                        code: self.ruleForm.ucode,
                        status:self.ruleForm.ustatus,
                        remarks:self.ruleForm.uremarks
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

        //关闭添加编辑角色
        closeRole(formName){
           this.$refs[formName].resetFields();
           this.dialogFormVisible = false;
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
       //时间转换
        dateFormat:function(row, column) {  
            var date = row[column.property];  
            if (date == undefined) {  
                return "";  
            }  
            return moment(date).format("YYYY-MM-DD HH:mm:ss");  
        },
        //翻页
        handleCurrentChange(val){
            this.currentPage = (val-1)*this.pagesize;
            
            this.tablefunction(this.currentPage,this.pagesize,this.searchs.name,this.searchs.code,this.status);
        },
        //搜索
        search(){
            this.tablefunction(0,this.pagesize,this.searchs.name,this.searchs.code,this.status);
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