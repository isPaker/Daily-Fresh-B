<template>
  <div class="search-box-container">
    <el-form :inline="true" :model="formData" class="search-form">
      <el-form-item label="检索关键字">
        <el-input v-model="formData.keywords" placeholder="请输入关键字"></el-input>
      </el-form-item>
      <el-form-item label="商品类目">
        <el-select v-model="formData.categoryList" placeholder="请选择商品类目" v-for="item in categoryList" :key="item.id">
          <el-option label="区域一" value="{{item.name}}"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSearchClick">搜索</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {getCategory} from "@/api/category"
export default {
    data(){
        return {
            categoryList: [],
            formData: {}
        }
    },
    created(){
        getCategory().then((res)=>{
            console.log(res.data)
            this.categoryList = res.data
        })
    },
    methods: {
        handleSearchClick(){

        }
    }
};
</script>

<style scoped lang="scss">
.search-box-container{
    padding: 20px;
    border-bottom: 1px solid #ccc;
}
</style>