<template>
  <div class="count-container">
    <!-- 卡片 -->
    <div class="card">
      <el-row :gutter="16">
        <el-col :span="8">
          <el-card>
            <div slot="header">商品总览</div>
            <div class="card-text">card count</div>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card>
            <div slot="header">用户总览</div>
            <div class="card-text">card count</div>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card>
            <div slot="header">销售总览</div>
            <div class="card-text">card count</div>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <!-- 表格 -->
    <div class="chart">
      <Charts />
    </div>
  </div>
</template>

<script>
import Charts from "@/components/Charts"
export default {
  components: {
    Charts,
  }
};
</script>

<style lang="scss" scoped>
.count-container{
  width: 100%;
  height: 100%;
  .card{
    padding: 20px;
    background: #eee;
  }
  .card-text{
    font-size: 14px;
    margin-bottom: 18px;
  }
}
</style>