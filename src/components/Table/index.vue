<template>
  <div class="table-container">
      <!-- 表格 -->
      <el-table :data="tableData" border style="width: 100%">

          <el-table-column label="序号" fixed width="80" align="center">
            <template slot-scope="scope">{{ (pages.currentPage - 1 )*pages.pageSize + scope.$index + 1 }}</template>
          </el-table-column>

          <el-table-column prop="c_item" label="名称" width="80" align="center">
          </el-table-column>

          <el-table-column prop="title" label="标题" width="180" align="center">
          </el-table-column>

          <el-table-column prop="desc" label="描述" align="center">
          </el-table-column>

          <el-table-column prop="categoryName" label="类目" width="180" align="center">
          </el-table-column>

          <el-table-column prop="price" label="预售价格" align="center" width="80">
          </el-table-column>

          <el-table-column prop="price_off" label="折扣价格" align="center" width="80">
          </el-table-column>

          <el-table-column prop="inventory" label="库存数量" align="center" width="80">
          </el-table-column>

          <el-table-column prop="tags" label="商品标签" align="center">
          </el-table-column>

          <el-table-column label="操作" align="center" width="160">
            <template slot-scope="scope">
              <el-button 
                size="mini"
                @click="handleEdit(scope.row)">编辑</el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.row)">删除</el-button>
            </template>
          </el-table-column>
      </el-table>
      <!-- 分页 -->
      <div class="pagination-container">
        <el-pagination
          class="pagination"
          background
          layout="prev, pager, next"
          :page-size="pages.pigeSize"
          :current-page="pages.currentPage"
          :total="pages.total"
          @current-change="handleCurrentChange"
          @prev-click="handlePrevClick"
          @next-click="handleNextClick"
          >
        </el-pagination>
      </div>
  </div>
</template>

<script>
export default {
    data(){
        return {
            
        }
    },
    props: ["tableData", "pages"],
    methods: {
        handleEdit(row){
          
          this.$emit("edit", row)
        },
        handleDelete(row){
          // console.log("handleDelete>", row)
          this.$emit("delete", row)
        },
        handleCurrentChange(page){
          this.$emit("currentPage", page)
        },
        handlePrevClick(){
          this.$emit("prevClick")
        },
        handleNextClick(){
          this.$emit("nextClick")
        }
    }
}
</script>

<style scoped lang="scss">
.table-container{
    width: 100%;
    height: 100%;
    padding: 1rem;
}
.pagination-container{
  width: 100%;
  height: 3em;
  position: relative;
  .pagination{
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>