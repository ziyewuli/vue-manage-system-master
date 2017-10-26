<template>
    <div class="table" v-loading.body="loading">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-menu"></i> 交易管理</el-breadcrumb-item>
                <el-breadcrumb-item>交易列表</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="handle-box">
            <el-input placeholder="订单号" v-model="realName" class="handle-input mr10"></el-input>
            <el-input placeholder="手机号" v-model="mobile" class="handle-input mr10"></el-input>
            <el-input placeholder="借款人" v-model="regip" class="handle-input mr10"></el-input>
            <el-input placeholder="产品名称" class="handle-input mr10" ></el-input>
            <el-button type="primary" icon="search">搜索</el-button>
        </div>
        <el-table :data="tableData" border style="width: 100%" ref="multipleTable">
            <el-table-column prop="id" label="编号" width="100">
            </el-table-column>
            <el-table-column prop="realName" label="订单号" width="100">
            </el-table-column>
            <el-table-column prop="mobile" label="手机号" >
            </el-table-column>
            <el-table-column prop="authentication" label="借款人" >
            </el-table-column>
            <el-table-column prop="quanx" label="产品名称" >
            </el-table-column>
            <el-table-column prop="regTime" label="下单时间" :formatter="dateFormat">
            </el-table-column>
            <el-table-column prop="" label="操作">
              <template scope="scope">
                <el-button type="text" size="small" @click="lookdetail(scope.$index)">查看详情</el-button>
              </template>
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
        formLabelWidth: '120px',
        tableData:[],
        loading: true,
        total:1,
        pagesize:10,
        mobile:'',
        realName:'',
        regip:''
      };
    },
    created(){
        this.tablefunction(this.currentPage,this.pagesize);
    },
    methods: {
       tablefunction(offset,limit){
          const self = this;
          let url = self.Interface();
          self.$axios.get(url.userSearch,{params:{offset:offset,limit:limit}})
          .then(function (response) {
            const rows = response.data.t.rows;
            self.tableData = rows;
            for(var i=0;i<rows.length;i++){
                if(rows[i].authentication==10){
                    rows[i].authentication = '未认证';
                } else if(rows[i].authentication==20){
                    rows[i].authentication = '审核中';
                } else if(rows[i].authentication==30){
                    rows[i].authentication = '审核失败';
                } else if(rows[i].authentication==90){
                    rows[i].authentication = '已认证';
                } else{
                    rows[i].authentication = '其他';
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
            
            this.tablefunction(this.currentPage,this.pagesize);
        },
        search(){
            this.tablefunction(0,this.pagesize,this.realName,this.mobile);
        },
        lookdetail(id){
            //this.$router.push('/transactionListDetail');
            this.$router.push({ name: 'detail', query: {id: id}});
            //console.log(row)
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
</style>