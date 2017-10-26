<template>
    <div class="table" >
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-menu"></i> 用户管理</el-breadcrumb-item>
                <el-breadcrumb-item>用户列表</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="handle-box">
            <el-input placeholder="请输入姓名" v-model="realName" class="handle-input mr10"></el-input>
            <el-input placeholder="请输入手机号" v-model="mobile" class="handle-input mr10"></el-input>
            <el-input placeholder="注册IP" v-model="regip" class="handle-input mr10"></el-input>
            <el-input placeholder="注册地址" class="handle-input mr10" ></el-input>
            <el-select v-model="valueselect1" placeholder="风险等级" style="width:120px;margin-right:10px;">
              <el-option
                v-for="item in option1"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <div style="margin-top:10px;">
                <el-select v-model="valueselect2" placeholder="认证状态" style="width:120px;margin-right:10px;">
                  <el-option
                    v-for="item in option2"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
                <el-select v-model="valueselect3" placeholder="绑卡状态" style="width:120px;margin-right:10px;">
                  <el-option
                    v-for="item in option3"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
                <el-date-picker
                  v-model="datetime"
                  type="datetimerange"
                  format="yyyy/MM/dd HH:mm:ss"
                  placeholder="选择注册时间范围"
                  :picker-options="pickerOptions0">
                </el-date-picker>
                <el-button type="primary" icon="search" @click="lookdetail()">搜索</el-button>
            </div>
            
        </div>
        <el-table :data="tableData" border style="width: 100%" ref="multipleTable">
            <el-table-column prop="id" label="编号" width="100">
            </el-table-column>           
            <el-table-column prop="mobile" label="手机号" >
            </el-table-column>
            <el-table-column prop="regTime" label="注册时间" :formatter="dateFormat">
            </el-table-column>
            <el-table-column prop="realName" label="姓名">
            </el-table-column>
            <el-table-column prop="regIp" label="注册IP">
            </el-table-column>
            <el-table-column prop="quanx" label="注册地址" >
            </el-table-column>
            <el-table-column prop="" label="风险等级" >
            </el-table-column>
            <el-table-column prop="authentication" label="认证状态" >
            </el-table-column>
            <el-table-column prop="" label="绑卡状态" >
            </el-table-column>
            <el-table-column prop="" label="详情" >
            </el-table-column>
            <el-table-column prop="" label="操作">
              <template scope="scope">
                <el-button type="text" size="small" @click="lookdetail()">查看详情</el-button>
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
        regip:'',
        option1: [
            {
              value: '1',
              label: '极高'
            },{
              value: '2',
              label: '中高'
            },{
              value: '3',
              label: '低高'
            },{
              value: '4',
              label: '较低'
            }, {
              value: '5',
              label: '未评分'
            }
        ],
        option2: [
            {
              value: '选项1',
              label: '已认证'
            }, {
              value: '选项2',
              label: '认证中'
            }, {
              value: '选项3',
              label: '未认证'
            }
        ],
        option3: [
            {
              value: '选项1',
              label: '已认证'
            }, {
              value: '选项2',
              label: '认证中'
            }, {
              value: '选项3',
              label: '未认证'
            }
        ],
        valueselect1: '',
        valueselect2: '',
        valueselect3: '',
        datetime:''
      };
    },
    created(){
        this.tablefunction(this.currentPage,this.pagesize);
    },
    methods: {
       tablefunction(offset,limit){
          const self = this;
          let url = self.Interface();
          self.$axios.get(url.memberSearch,{params:{offset:offset,limit:limit}})
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
        lookdetail(index,row){
          //this.$router.push('/userlistDetail');
          console.log(index)
          this.$router.push({ path: '/userlistDetail', query: {id:index}});
            
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