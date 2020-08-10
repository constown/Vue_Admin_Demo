<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="商品名称">
        <el-input v-model="form.title" />
      </el-form-item>
      <el-form-item label="商品价格">
        <el-input v-model="form.price" />
      </el-form-item>
      <el-form-item label="商品类别">
        <el-select v-model="form.categoryid" placeholder="请选择商品类别">
          <el-option v-for="(item,i) in clist" :key="i" :label="item.title" :value="item.id" />
        </el-select>
      </el-form-item>


      <el-form-item label="上传图片">
        <el-upload
          name="uploadFile"
          class="upload-demo"
          :file-list="fileList"
          drag
          action="/api/assets/upload/upImgs"
          :on-success="uploadSuccess"
          list-type="picture"
          multiple>
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div class="el-upload__tip" slot="tip">只能上传jpg/png文件的商品图片</div>
        </el-upload>
      </el-form-item>
      <el-form-item label="sku设置">
        <el-table class="skuInput"
            :data="skuList"
            stripe
            style="width: 100%">
            <el-table-column
              label="名称"
              width="180">
              <template slot-scope="scope">
                {{ scope.row.name }}
              </template>
            </el-table-column>
            <el-table-column
              label="类型"
              width="180">
              <template slot-scope="scope">
                {{ scope.row.type }}
              </template>
            </el-table-column>
            <el-table-column
              label="价格">
              <template slot-scope="scope">
                {{ scope.row.sku_price }}
              </template>
            </el-table-column>
            <el-table-column
              label="数量">
              <template slot-scope="scope">
                {{ scope.row.sku_stock }}
              </template>
            </el-table-column>
            <el-table-column
              label="编码">
              <template slot-scope="scope">
                {{ scope.row.sku_code }}
              </template>
            </el-table-column>
            <el-table-column
              label="删除">
            </el-table-column>
         </el-table>
        <el-form-item label="sku名称" class="skuInput">
          <el-input v-model="sku.name" />
        </el-form-item>
        <el-form-item label="sku类型" class="skuInput">
          <el-input v-model="sku.type" />
        </el-form-item>
        <el-form-item label="sku价格" class="skuInput">
          <el-input v-model="sku.sku_price"  />
        </el-form-item>
        <el-form-item label="sku数量" class="skuInput">
          <el-input v-model="sku.sku_stock" />
        </el-form-item>
        <el-form-item label="sku编码" class="skuInput">
          <el-input v-model="sku.sku_code" />
        </el-form-item>
        <el-button type="primary" @click="addSku">添加SKU</el-button>
      </el-form-item>
      <el-form-item label="商品详细编辑">
        <tinymce v-model="form.content" :height="500" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">添加</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { categorylist,delcategory,editProduct } from '@/api/shop'
import Tinymce from '@/components/Tinymce'
let base = process.env.VUE_APP_BASE_API;
export default {

  components: { Tinymce },
  data() {
    return {
      form: {
        title:"",
        categoryid: '',
        price: '',
        imgs: '',
        sku:"",
        content:""

      },
      clist:[],
      fileList:[],
      skuObj:{},
      sku:{
        name:"",
        type:"",
        sku_price:"",
        sku_stock:"",
        sku_stock:""
      }
    }
  },
  computed:{
    skuList:function(){
      let list = [];
      for (let key in this.skuObj){
        for(let item of this.skuObj[key]){
          list.push(item)
        }
      }
      console.log(list)
      return list;
    }
  },
  
  methods: {
    onSubmit() {
      editProduct(this.form)
      this.$message('submit!')
      this.$router.push('/shop/product')
    },
    onCancel() {
      this.$message({
        message: 'cancel!',
        type: 'warning'
      })
    },
    uploadSuccess(res){
      this.fileList.push({name:res.data.originName,filename:res.data.filename,url:base+'/static/upload/'+res.data.filename})
      this.form.imgs = JSON.stringify(this.fileList)
    },
    addSku(){
      if(this.skuObj[this.sku.type]){
        this.skuObj[this.sku.type].push(this.sku);
      }else{
        this.$set(this.skuObj,this.sku.type,[])
        this.skuObj[this.sku.type].push({...this.sku});
      }
      this.form.sku = JSON.stringify(this.skuObj)
    }
  },
  async beforeMount() {
    let res = await categorylist()
    this.clist = res.categorylist;
    this.form = this.$route.query;
    this.skuObj = JSON.parse(this.form.sku)
    this.fileList = JSON.parse(this.form.imgs)
  },
}


</script>

<style scoped>
.line{
  text-align: center;
}
.skuInput{
  margin-bottom: 5px;
}
</style>
