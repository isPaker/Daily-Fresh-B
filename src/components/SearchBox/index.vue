<template>
  <div class="search-box-container">
    <!-- 搜索表单 -->
    <el-form :inline="true" :model="formData" class="search-form">
      <el-form-item label="检索关键字">
        <el-input v-model="formData.searchWord" placeholder="请输入关键字"></el-input>
      </el-form-item>
      <el-form-item label="商品类目">
        <el-select v-model="formData.category" placeholder="请选择商品类目">
          <el-option 
           v-for="item in categoryData"
           :key="item.id"
           :label="item.name"
           :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSubmit">搜索</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>

export default {
    data(){
        return {
            formData: {
              searchWord: "",
              category: ""
            }
        }
    },
    props: ["categoryData"],
    created(){
    
    },
    methods: {
        handleSubmit(){
          this.$emit("submit", this.formData)
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