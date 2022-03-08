<template>
  <div class="goods-list-container">
      <SearchBox :categoryData="categoryList" @submit="handleSubmit" />
      <el-button type="primary" class="add-product-btn">
        <router-link :to="{name: 'AddGoods'}">添加商品</router-link>
      </el-button>
      <!-- 商品列表 -->
      <Table 
      :tableData="tableListData" 
      :pages="pages"
      @currentPage="handleCurrentChange"
      @prevClick="handlePrevClick"
      @nextClick="handleNextClick"
      @edit="handleEdit"
      @delete="handleDelete"
       />
  </div>
</template>

<script>
import SearchBox from "@/components/SearchBox";
import Table from "@/components/Table";
import { getCategory } from "@/api/category";
import { getProducts, deleteProduct } from "@/api/product";
export default {
  data(){
    return {
      categoryList: [], //商品类目数组
      tableListData: [],  //表格数据
      searchData: {},   //检索数据
      categoryObj: {},  //商品类目对象
      pages: {    //翻页数据
        currentPage: 1,
        pageSize: 10,
        total: 1
      }
    }
  },
  components: {
    SearchBox,
    Table
  },
  async created(){
    // 获取商品类目
    let result = await getCategory();
    
    this.categoryList = result.data.data;
    
    result.data.data.forEach((item)=>{
      this.categoryObj[item.id] = item;
    });
    // 获取表格数据
    this.getTableData()
  },
  methods: {
    handleSubmit(formData){
      // console.log("formData>1111", formData)
      this.searchData = formData;
      this.getTableData();
    },
    getTableData(){
      getProducts({
        page: this.pages.currentPage,
        size: this.pages.pageSize,
        ...this.searchData,
      }).then((res)=>{
        
        this.pages.total = res.data.total;
        this.tableListData = res.data.data.map((item)=>({
          ...item,
          categoryName: this.categoryObj[item.category] ? this.categoryObj[item.category].name : ""
        }));
      });
    },
    handleCurrentChange(page){
      this.pages.currentPage = page;
      this.getTableData()
    },
    handlePrevClick(){
      this.pages.currentPage -= 1;
    },
    handleNextClick(){
      this.pages.currentPage += 1;
    },
    handleEdit(info){
      this.$router.push({
        name: "EditGood",
        params: {
          id: info.id,
        }
      })
    },
    handleDelete(info){
      this.$confirm("请确认是否删除？", "提示", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning"
      }).then(()=>{
        deleteProduct(info.id).then(()=>{
          this.getTableData();
          this.$message({
          type: "success",
          message: "删除成功!"
        });
        })
      }).catch(()=>{
        this.$message({
          type: "info",
          message: "已取消"
        });
      });
    }
  }
}
</script>

<style lang="scss" scoped>
.goods-list-container{
  position: relative;
  .add-product-btn{
    position: absolute;
    top: 1.2rem;
    right: 2rem
  }
}
</style>