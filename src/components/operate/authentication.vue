<template>
    <div class="table" v-loading.body="">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-menu"></i> 运营配置</el-breadcrumb-item>
                <el-breadcrumb-item>认证配置</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
    
        <el-table :data="tableData" border style="width: 100%" ref="multipleTable">
            <el-table-column prop="id" label="项目">
            </el-table-column>
            <el-table-column prop="" label="有效时间">
            </el-table-column>          
            <el-table-column prop="" label="配置" >
              <template scope="scope">
                <el-button type="text" size="small">配置</el-button>
              </template>
            </el-table-column>
        </el-table>
    </div>
    

</template>

<script>
import qs from 'qs';
import { Loading } from 'element-ui';
import moment from 'moment';
export default {
    data() {
      return {
        
      };
    },
    created(){
    },
    methods: {
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