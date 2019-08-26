<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-calendar"></i>客户管理 </el-breadcrumb-item>
                <el-breadcrumb-item>客户导入</el-breadcrumb-item>
            </el-breadcrumb>
         </div>
        <div class="container">
             <div class="title">客户导入</div>
             <el-divider></el-divider>
             <div class="ones">
                 <p class="text">第一步</p>
                 <p>下载导入文件模板，并将客户信息按要求填写到模板文件中；</p>
                 <img src="../../../assets/img/u1430.png" alt="">
                 <p>客户模板</p>
                 <p class="red">点击下载模板</p>
             </div>
              <div class="tows">
                 <p class="text">第二步</p>
                 <p>将填好的模板文件上传到系统中；</p>
                 <el-button type="primary" >选择文件</el-button>
             </div>
              <div class="sans">
                 <p class="text">注意</p>
                 <p>1、根据模板Excel文件中带*号的内容为必填项，缺填记录将不会被录入。</p>
                 <p>2、数据模板Excel文件中，表头带有注意事项与格式要求，请按照格式要求进行填写。</p>
             </div>
        </div>
    </div>
</template>
<script>
export default {
    
}
</script>
<style scoped lang="less">
    .container{
        .title{
          color: #0069DD;
          padding-left: 10px;
      }
      .el-divider{
          margin: 16px 0;
      }
       p{
           line-height: 3;
       }
       .text{
           font-size: 20px;
        }
        .red{
             color: #F5222D;
             font-size: 12px;
        }
        .el-button{
            width: 180px;
            height: 40px;
            font-size: 16px;
        }
    }
  
</style>
