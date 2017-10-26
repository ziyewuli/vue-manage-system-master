<template>
    <div class="table" >
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-menu"></i> 用户管理</el-breadcrumb-item>
                <el-breadcrumb-item>用户资产</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="handle-box">
            <el-input placeholder="请输入姓名" v-model="realName" class="handle-input mr10"></el-input>
            <el-input placeholder="请输入手机号" v-model="mobile" class="handle-input mr10"></el-input>
            <el-select v-model="valueselect1" placeholder="发起借款" style="width:120px;margin-right:10px;">
              <el-option
                v-for="item in option1"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <el-select v-model="valueselect2" placeholder="发起借款金额" style="width:140px;margin-right:10px;">
              <el-option
                v-for="item in option2"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <el-select v-model="valueselect3" placeholder="借款成功" style="width:120px;margin-right:10px;">
              <el-option
                v-for="item in option1"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <el-select v-model="valueselect4" placeholder="借款成功金额" style="width:140px;margin-right:10px;">
              <el-option
                v-for="item in option2"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <div style="margin-top:10px;">
                <el-select v-model="valueselect5" placeholder="逾期" style="width:120px;margin-right:10px;">
                  <el-option
                    v-for="item in option1"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
                <el-select v-model="valueselect6" placeholder="逾期" style="width:140px;margin-right:10px;">
                  <el-option
                    v-for="item in option2"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
                <el-select v-model="valueselect7" placeholder="坏账" style="width:120px;margin-right:10px;">
                  <el-option
                    v-for="item in option1"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
                <el-select v-model="valueselect8" placeholder="坏账" style="width:140px;margin-right:10px;">
                  <el-option
                    v-for="item in option2"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
                <el-button type="primary" icon="search" @click="lookdetail()">搜索</el-button>
            </div>
            
        </div>
        <el-table :data="tableData" border style="width: 100%" ref="multipleTable">
            <el-table-column prop="id" label="编号">
            </el-table-column>           
            <el-table-column prop="" label="手机号" >
            </el-table-column>
            <el-table-column prop="" label="注册时间" :formatter="dateFormat">
            </el-table-column>
            <el-table-column prop="" label="姓名">
            </el-table-column>
            <el-table-column prop="" label="发起借款(次)">
            </el-table-column>
            <el-table-column prop="" label="发起借款(元)" >
            </el-table-column>
            <el-table-column prop="" label="成功借款(次)" >
            </el-table-column>
            <el-table-column prop="" label="成功借款(元)" >
            </el-table-column>
            <el-table-column prop="" label="逾期(次)" >
            </el-table-column>
            <el-table-column prop="" label="逾期(元)" >
            </el-table-column>
            <el-table-column prop="" label="坏账(次)" >
            </el-table-column>
            <el-table-column prop="" label="坏账(元)" >
            </el-table-column>
            <el-table-column prop="" label="最近一次发起借款的时间" width="120">
            </el-table-column>
            <el-table-column prop="" label="操作">
              <template scope="scope">
                <el-button type="text" size="small">查看详情</el-button>
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
              label: '0次'
            },{
              value: '2',
              label: '1次'
            },{
              value: '3',
              label: '2次'
            },{
              value: '4',
              label: '3次'
            },{
              value: '5',
              label: '4次'
            },{
              value: '6',
              label: '5-10次'
            },{
              value: '7',
              label: '10次以上'
            }
        ],
        option2: [
            {
              value: '选项1',
              label: '0-1000元'
            }, {
              value: '选项2',
              label: '1000-2000元'
            }, {
              value: '选项3',
              label: '2000-3000元'
            }, {
              value: '选项4',
              label: '3000-5000元'
            }, {
              value: '选项5',
              label: '5000-10000元'
            }, {
              value: '选项6',
              label: '10000-30000元'
            }, {
              value: '选项7',
              label: '30000元以上'
            }
        ],
        option4: [
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
        valueselect4: '',
        valueselect5: '',
        valueselect6: '',
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