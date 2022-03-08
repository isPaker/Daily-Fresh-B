<template>
  <div class="add-good-container">
      <el-form :model="FormData" status-icon :rules="rules" ref="myForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="名称" prop="c_item">
          <el-input type="text" v-model="FormData.c_item" autocomplete="off" placeholder="请输入商品名称"></el-input>
        </el-form-item>
        <el-form-item label="标题" prop="title">
          <el-input type="text" v-model="FormData.title" autocomplete="off" placeholder="请输入商品标题"></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="desc">
          <el-input type="text" v-model="FormData.desc" autocomplete="off" placeholder="请输入商品描述"></el-input>
        </el-form-item>
        <el-form-item label="商品类目" prop="category">
          <el-select v-model="FormData.category" placeholder="请选择" @change="selectChange">
            <el-option
              v-for="item in categoryList"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="预售价格" prop="price">
          <el-input type="text" v-model="FormData.price" autocomplete="off" placeholder="请输入预售价格"></el-input>
        </el-form-item>
        <el-form-item label="折扣价格" prop="price_off">
          <el-input type="text" v-model="FormData.price_off" autocomplete="off" placeholder="请输入折扣价格"></el-input>
        </el-form-item>
        <el-form-item label="库存数量" prop="inventory">
          <el-input type="text" v-model="FormData.inventory" autocomplete="off" placeholder="请输入库存数量" ></el-input>
        </el-form-item>
        <el-form-item label="商品标签" prop="tags">
          <el-select v-model="FormData.tags" placeholder="请选择" multiple>
            <el-option
              v-for="(item, index) in FormData.tags"
              :key="index"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品图片" prop="images">
          <el-upload
            :action="'http://mallapi.duyiedu.com/upload/images?appkey=' + $store.state.user.appkey"
            list-type="picture-card"
            :on-success="handleImageSuccess"
            :on-remove="handleImageRemove"
            name="avatar"
            ref="unload"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm()">提交</el-button>
          <el-button @click="resetForm()">重置</el-button>
        </el-form-item>
      </el-form>
  </div>
</template>

<script>
import { getCategory } from "@/api/category";
import { getProduct, editProduct } from "@/api/product";
export default {
    data(){
        return {
            FormData: {
                title: '',
                desc: '',
                category: '',
                c_item: "",
                c_items: [],
                tags: [],
                price: 0,
                price_off: 0,
                unit: '',
                inventory: 0,
                images: [],
            },
            categoryList: [],
            rules: {}
        }
    },
    async created(){
        let id = this.$route.params.id;
        let result = await getCategory();
        this.categoryList = result.data.data;

        getProduct(id).then((res)=>{
          this.FormData = res.data
        })
    },
    methods: {
        submitForm(){
          let params = this.FormData;
          editProduct(params).then((res)=>{
            console.log(res, "修改成功")
            this.resetForm();
            this.$router.push({
              name: "GoodsList",
            })
          })
        },
        resetForm(){
          this.$refs.myForm.resetFields();
          this.$refs.unload.clearFiles();
        },
        handleImageSuccess(res){
          if(res.status === "success"){
            this.FormData.images.push(res.data.url)
          }
        },
        handleImageRemove(){
          this.$confirm("请确认是否删除该图片？", "提示", {
            confirmButtonText: "确认",
            cancelButtonText: "取消",
            type: "warning"
          }).then(()=>{
            this.$message({
              type: "success",
              message: "删除成功!"
            });
          });
        },
        selectChange(category){
          this.FormData.category = category;
          for (let i = 0; i < this.categoryList.length; i++) {
            if (this.categoryList[i].id === category) {
              this.FormData.c_items = this.categoryList[i].c_items;
            }
          }
        }
    }
}
</script>

<style scoped lang="scss">
.add-good-container{
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 2rem 5rem 2rem 1rem;
}
</style>