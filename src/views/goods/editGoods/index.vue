<template>
  <div class="edit-goods-container">
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
import Table from "@/components/Table";
import { getCategory } from "@/api/category";
import { getProducts, deleteProduct } from "@/api/product";
export default {
  data(){
    return {
      tableListData: [],  //表格数据
      categoryObj: {},  //商品类目对象
      pages: {    //翻页数据
        currentPage: 1,
        pageSize: 10,
        total: 1
      }
    }
  },
  components: {
    Table
  },
  async created(){
    let result = await getCategory();
    result.data.data.forEach((item)=>{
      this.categoryObj[item.id] = item;
    });
    // 获取表格数据
    this.getTableData();
  },
  methods: {
    getTableData(){
      getProducts({
        page: this.pages.currentPage,
        size: this.pages.pageSize,
        ...this.searchData,
      }).then((res)=>{
        this.pages.total = res.data.total;
        this.tableListData = res.data.data.map((item)=>({
          ...item,
          categoryName: this.categoryObj[item.category].name
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
          this.getTableData()
        })
        this.$message({
          type: "success",
          message: "删除成功!"
        });
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

<style>

</style>