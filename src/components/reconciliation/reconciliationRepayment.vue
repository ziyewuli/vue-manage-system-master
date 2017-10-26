<template>
    <div class="table" v-loading.body="">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-menu"></i> 财务对账</el-breadcrumb-item>
                <el-breadcrumb-item>还款金额</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="handle-box">
            <el-input placeholder="渠道ID" v-model="realName" class="handle-input mr10"></el-input>
            <el-input placeholder="渠道名称" v-model="realName" class="handle-input mr10"></el-input>
            <el-date-picker
              v-model="value0"
              type="datetimerange"
              format="yyyy/MM/dd HH:mm:ss"
              placeholder="选择还款日期范围">
            </el-date-picker>
            <el-button type="primary" icon="search" @click="search">搜索</el-button>
        </div>
        <el-table :data="tableData" border style="width: 100%" ref="multipleTable">
            <el-table-column prop="id" label="编号">
            </el-table-column>
            <el-table-column prop="" label="还款日期" :formatter="dateFormat" width="100">
            </el-table-column>
            <el-table-column prop="" label="还款">
                <el-table-column prop="" label="发起金额" width="100">
                </el-table-column>
                <el-table-column prop="" label="成功金额" width="100">
                </el-table-column>
                <el-table-column prop="" label="发起笔数" width="100">
                </el-table-column>
                <el-table-column prop="" label="成功笔数" width="100">
                </el-table-column>
                <el-table-column prop="" label="手续费">
                </el-table-column>
            </el-table-column>
            <el-table-column prop="" label="支付宝还款">
                <el-table-column prop="" label="发起金额" width="100">
                </el-table-column>
                <el-table-column prop="" label="成功金额" width="100">
                </el-table-column>
                <el-table-column prop="" label="发起笔数" width="100">
                </el-table-column>
                <el-table-column prop="" label="成功笔数" width="100">
                </el-table-column>
                <el-table-column prop="" label="手续费">
                </el-table-column>
            </el-table-column>
            <el-table-column prop="" label="银行卡代扣还款">
                <el-table-column prop="" label="发起金额" width="100">
                </el-table-column>
                <el-table-column prop="" label="成功金额" width="100">
                </el-table-column>
                <el-table-column prop="" label="发起笔数" width="100">
                </el-table-column>
                <el-table-column prop="" label="成功笔数" width="100">
                </el-table-column>
                <el-table-column prop="" label="手续费">
                </el-table-column>
            </el-table-column>
            <el-table-column prop="" label="打款到支付宝">
                <el-table-column prop="" label="成功金额" width="100">
                </el-table-column>
                <el-table-column prop="" label="成功笔数" width="100">
                </el-table-column>
                <el-table-column prop="" label="提现手续费" width="110">
                </el-table-column>
            </el-table-column>
            <el-table-column prop="" label="详情">
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
        value0:'',
        formLabelWidth: '120px',
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
        this.tablefunction(this.currentPage,this.pagesize,this.realName,this.mobile);
    },
    methods: {
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