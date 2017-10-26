<template>
    <div class="table" v-loading.body="">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-menu"></i> 运营配置</el-breadcrumb-item>
                <el-breadcrumb-item>关闭区域</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="handle-box">
            <el-button type="primary" icon="search">新增</el-button>
        </div>
        <el-table :data="tableData" border style="width: 100%" ref="multipleTable">
            <el-table-column prop="id" label="省份">
            </el-table-column>
            <el-table-column prop="" label="市区">
            </el-table-column>
            <el-table-column prop="" label="状态">
            </el-table-column>            
            <el-table-column prop="" label="配置" >
              <template scope="scope">
                <el-button type="text" size="small">移除</el-button>
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
.tranP{
    margin-bottom:20px;
}
.feedbackdl{overflow: hidden;margin-bottom:20px;}
.feedbackdl dt{float:left;width:40px;height:40px;border-radius:50%;overflow: hidden;border:#ddd solid 1px;text-align: center;font-size:12px;line-height:40px;}
.feedbackdl dd{margin-left:50px;padding-top:5px;}
.feedbackdl dd p{font-size:12px;color:#999;}
.feedbackdl dd span{font-size:14px;color:#333;}
</style>