<template>
    <div class="table" v-loading.body="">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-menu"></i> 数据管理</el-breadcrumb-item>
                <el-breadcrumb-item>渠道统计</el-breadcrumb-item>
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
            <el-select v-model="valueselect1" placeholder="渠道名称" style="width:120px;margin-right:10px;">
              <el-option
                v-for="item in option1"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <el-button type="primary" icon="search" @click="search">搜索</el-button>
        </div>
        <el-table :data="tableData" border style="width: 100%" ref="multipleTable">
            <el-table-column prop="id" label="编号">
            </el-table-column>
            <el-table-column prop="" label="渠道ID">
            </el-table-column>
            <el-table-column prop="" label="渠道名称" width="100">
            </el-table-column>
            <el-table-column prop="" label="消耗金额" width="100">
            </el-table-column>
            <el-table-column prop="" label="PV">
            </el-table-column>
            <el-table-column prop="" label="UV">
            </el-table-column>
            <el-table-column prop="" label="注册人数" width="100">
            </el-table-column>
            <el-table-column prop="" label="单个用户注册成本" width="180">
            </el-table-column>
            <el-table-column prop="" label="完成认证人数" width="160">
            </el-table-column>
            <el-table-column prop="" label="单个用户认证成本" width="180">
            </el-table-column>
            <el-table-column prop="" label="绑定银行卡人数" width="160">
            </el-table-column>
            <el-table-column prop="" label="单个用户绑定银行卡成本" width="200">
            </el-table-column>
            <el-table-column prop="" label="申请借款人数" width="150">
            </el-table-column>
            <el-table-column prop="" label="单个用户申请借款成本" width="200">
            </el-table-column>
            <el-table-column prop="" label="ROI">
            </el-table-column>
        </el-table>
        <div class="pagination">
            <el-pagination layout="prev, pager, next" :total="total" :page-size="pagesize" @current-change ="handleCurrentChange">
            </el-pagination>
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
        option1: [{
          value: '选项1',
          label: '1'
        }, {
          value: '选项2',
          label: '2'
        }],
        valueselect1: '',
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

