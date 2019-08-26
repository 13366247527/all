<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item><i class="el-icon-s-cooperation"></i> 物品管理</el-breadcrumb-item>
        <el-breadcrumb-item>物品列表</el-breadcrumb-item>
        <el-breadcrumb-item>添加物品</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <el-form :model="matterForm" class="matterStyle">
<!--        <el-form-item label="物品供应商：">-->
<!--          <el-select v-model="matterForm.supplier" placeholder="选择商品品牌">-->
<!--            <el-option v-for="item in brandList" :key="item.value" :label="item.label" :value="item.value"></el-option>-->
<!--          </el-select>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="物品分类：">-->
<!--          <el-select v-model="matterForm.classify" placeholder="选择物品分类">-->
<!--            <el-option v-for="item in classifyList" :key="item.value" :label="item.label" :value="item.value"></el-option>-->
<!--          </el-select>-->
<!--        </el-form-item>-->
        <el-form-item label="物品名称：">
          <el-input v-model="matterForm.artName" clearable placeholder="请输入商品名称"></el-input>
        </el-form-item>
        <el-form-item label="物品编号：">
          <el-input v-model="matterForm.artNum" clearable placeholder="请输入物品编号"></el-input>
        </el-form-item>
        <el-form-item label="物品重量（箱）：">
          <el-input v-model="matterForm.artWeight" clearable placeholder="请输入物品重量"></el-input>&nbsp;&nbsp;&nbsp;kg
        </el-form-item>
        <el-form-item label="托箱数：">
          <el-input v-model="matterForm.boxes" clearable placeholder="请输入物品一托的箱数"></el-input>&nbsp;&nbsp;&nbsp;箱
        </el-form-item>
        <el-form-item label="托层数：">
          <el-input v-model="matterForm.layerNum" clearable placeholder="请输入物品一托的层数"></el-input>&nbsp;&nbsp;&nbsp;层
        </el-form-item>
        <div class="uploadImg">
          <div style="float:left;">
            <span class="title">物品图片：</span>
            <el-upload
                    action="http://test-upload.logwsd.com/image/upload"
                    list-type="picture-card"
                    :file-list="single"
                    :on-preview="handlePictureCardPreview"
                    :beforeUpload="beforeAvatarUpload"
                    :on-success="singleUpload"
                    :before-remove="beforeRemovethree"
                    accept="jpg,jpeg,png,gif"
                    class="itemUpload">
              <i class="el-icon-upload"></i>
              <span class="photoTitle">单品照片</span>
            </el-upload>
            <el-upload
                    action="http://test-upload.logwsd.com/image/upload"
                    list-type="picture-card"
                    :file-list="piece"
                    :on-preview="handlePictureCardPreview"
                    :beforeUpload="beforeAvatarUpload"
                    :on-success="wholeUpload"
                    :before-remove="beforeRemovethree"
                    accept="jpg,jpeg,png,gif"
                    class="itemUpload">
              <i class="el-icon-upload"></i>
              <span class="photoTitle">整件图片</span>
            </el-upload>
            <el-upload
                    action="http://test-upload.logwsd.com/image/upload"
                    list-type="picture-card"
                    :file-list="support"
                    :on-preview="handlePictureCardPreview"
                    :beforeUpload="beforeAvatarUpload"
                    :on-success="torrUpload"
                    :before-remove="beforeRemovethree"
                    accept="jpg,jpeg,png,gif"
                    class="itemUpload">
              <i class="el-icon-upload"></i>
              <span class="photoTitle">整托图片</span>
            </el-upload>
          </div>
          <div style="float:left; margin-left: 30px;">
            <span class="title">商品封面：</span>
            <el-upload
                action="http://test-upload.logwsd.com/image/upload"
                list-type="picture-card"
                :file-list="coverList"
                :on-preview="handlePictureCardPreview"
                :beforeUpload="beforeAvatarUpload"
                :on-success="cover"
                :before-remove="beforeRemovethree"
                accept="jpg,jpeg,png,gif"
                class="itemUpload">
              <i class="el-icon-upload"></i>
              <span class="photoTitle">商品封面</span>
            </el-upload>
          </div>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
        </div>
        <el-form-item label="物品详情：" class="areaText">
            <el-input type="textarea" placeholder="请输入内容" :row="8" v-model="matterForm.textContent"></el-input>
        </el-form-item>
        <div class="bottomForm">
          <el-form-item label="成本价格：">
            <el-input v-model="matterForm.cost" clearable placeholder="请输入商品成本价格"></el-input>
          </el-form-item>
          <el-form-item label="销售价格：">
            <el-input v-model="matterForm.sale" clearable placeholder="请输入商品销售价格"></el-input>
          </el-form-item>
          <el-form-item label="渠道价格：">
            <el-input v-model="matterForm.channel" clearable placeholder="请输入商品渠道价格"></el-input>
          </el-form-item>
          <el-form-item label="商品单位：">
            <el-select v-model="matterForm.company" placeholder="选择商品单位">
              <el-option v-for="item in companyList" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="初始库存：">
            <el-input v-model="matterForm.stock" clearable placeholder="请输入商品初始库存"></el-input>
          </el-form-item>
        </div>
        <div class="bottonBtn">
          <el-button type="primary" @click="submitMsg">提交</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
    export default {
        data() {
            return {
                matterForm: {
                    supplier: '', // 供应商默认
                    classify: '', // 物品分类默认
                    artName: '', // 商品名称
                    artNum: '', // 物品编号
                    artWeight: '', // 物品重量
                    boxes: '', // 托箱数
                    layerNum: '', // 托层数
                    textContent: '', // 物品详情
                    cost: '', // 成本价格
                    sale: '', // 销售价格
                    channel: '', // 渠道价格
                    company: '', // 商品单位默认
                    stock: '' // 初始库存
                },
                brandList: [], // 品牌列表
                classifyList: [], // 分类列表
                dialogImageUrl: '', // 图片url
                dialogVisible: false, // 图片放大弹框开关
                single: [], // 单品图片列表
                piece: [], // 整件图片列表
                support: [], // 整托图片列表
                coverList: [], // 商品封面列表
                companyList: [], // 商品单位列表
            }
        },
        mounted() {
        },
        methods: {
            // 单品照片上传成功
            singleUpload(file) {
                this.single = []
                this.single.push({ url: file.data.url, name: 'aa.jpg' })
                this.$message.success('单品照片上传成功')
            },
            // 整件照片上传成功
            wholeUpload(file) {
                this.piece = []
                this.piece.push({ url: file.data.url, name: 'bb.jpg' })
                this.$message.success('整件照片上传成功')
            },
            // 整托图片上传成功
            torrUpload(file) {
                this.support = []
                this.support.push({ url: file.data.url, name: 'cc.jpg' })
                this.$message.success('整托照片上传成功')
            },
            cover(file) {
                this.coverList = []
                this.coverList.push({ url: file.data.url, name: 'dd.jpg' })
                this.$message.success('商品封面上传成功')
            },
            // 放大
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
            // 照片删除前
            beforeRemovethree(file, fileList) {
                // console.log(file.name.substring(file.name.lastIndexOf('.')+1))
                let format = file.name.substring(file.name.lastIndexOf('.')+1)
                if (format === 'jpg' || format === 'jpeg' || format === 'png' || format === 'gif') {
                    return this.$confirm('确定移除此文件？')
                }
            },
            // 上传之前
            beforeAvatarUpload(file) {
                const format = file.name.substring(file.name.lastIndexOf('.')+1)
                // const isLt500kb = file.size / 1024 < 500
                // if (!isLt500kb) {
                //     this.$message.error('上传文件大小不能超过500kb')
                //     return false
                // }
                if (format !== 'jpg' && format !== 'jpeg' && format !== 'png' && format !== 'gif') {
                    this.$message.error('请上传正确的文件格式')
                    return false
                }
                // return isLt500kb && format
                return format
            },
            // 提交
            submitMsg: function () {
                console.log(this.single)
                console.log(this.piece)
                console.log(this.support)
                console.log(this.coverList)
            }
        }
    }
</script>

<style scoped lang="less">
  .matterStyle {
    height: 600px;
    margin-left: -40px;
    padding-bottom: 80px;
    .el-form-item {
      display: inline-block;
      float: left;
      margin-left: 40px;
    }
    .el-select, .el-input {
      width: 200px;
      /*float: left;*/
    }
    .uploadImg {
      clear: both;
      margin-left: 20px;
      .title {
        display: block;
        margin-left: 20px;
        color: #606266;
      }
    }
    .bottomForm {
      width: 100%;
      clear:both;
    }
  }
  .bottonBtn {
    clear: both;
    margin-left: 40px;
    padding-top: 30px;
    .el-button {
      width: 120px;
    }
  }
</style>
<style lang="less">
  .itemUpload:first-child {
    margin-left: 0;
  }
  .itemUpload {
    position:relative;
    float: left;
    margin-top: 20px;
    margin-left: 20px;
    .el-upload-list--picture-card .el-upload-list__item {
      position: absolute;
    }
    .el-icon-upload {
      font-size: 64px;
      float: left;
      margin: 20px 0 0 40px;
    }
    .photoTitle {
      float: left;
      color: #606266;
      line-height: 0;
      margin: 20px 0 0 42px;
    }
  }
  .areaText {
    clear: both;
    width: 500px;
    margin-top: 18px;
    .el-textarea__inner {
      min-height: 100px!important;
    }
  }
</style>