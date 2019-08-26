<template>
  <div class="common-page-flex">
    <header-default :title="title"></header-default>
    <div class="common-content-box">
      <div class="common-content-top">
        <span>沟通电话：</span>
        <span class="red">123456797865</span>
      </div>
      <div class="imgBox">
        <div class="imgBox-content" v-for="(item,index) in dataList" :key="index">
          <div class="imgBox-content-block">
            <p  class="imgPanel" @click="imgBig(index)">
              <img  :src="item.imgPath" alt>
            </p>
            <p class="title" :class="item.statu==1?'Unqualified':''">{{item.title}}</p>
          </div>
        </div>
      </div>
      <div class="mask" v-show="status==0" @click="imgHide">
        <img :src="imgPaths.imgPath" alt>
      </div>
    </div>
    <div class="common-bottom-button bottom-button-fixed">
      <span class="redBtner" >不合格</span>
      <span class="orangeBtn" >合格</span>
    </div>
  </div>
</template>

<script>
import HeaderDefault from "@/components/common/HeaderDefault";
export default {
  components: { HeaderDefault },
  data() {
    return {
      title: "阻车器",
      status:1,
      imgPaths: {
        imgPath: require("@/assets/images/common/standard.jpg")
      },
      dataList: [
        {
        statu:0,
          imgPath: require("@/assets/images/common/standard.jpg"),
          title: "放阻车器"
        },{
            statu:0,
          imgPath: require("@/assets/images/common/standard.jpg"),
          title: "还阻车器"
        }
      ]
    };
  },
  methods: {
      imgBig(index){
          this.imgPaths.imgPath = this.dataList[index].imgPath
          this.status = 0
      },
      imgHide(){
        this.status = 1
      },
    back() {
      this.$router.go(-1);
    }
  }
};
</script>

<style lang="scss" scoped>
.common-page-flex {
  font-size: 0.17rem;
  font-weight: 500;
  font-family: PingFangSC-Medium;
}
.common-content-box{
    padding:0 .3rem;
}
.common-content-top {
  border-bottom: 1px solid #ddd;
  height: 0.5rem;
  line-height: 0.5rem;
  padding-left: 0.1rem;
}
.imgBox {
  display: flex;
  flex-wrap: wrap;
  //justify-content:space-around;
  text-align: center;
  align-content: flex-start;
  width:100%;
}
.imgBox-content {
  margin-top: 0.2rem;
  width:100%;
   border-top-left-radius: 0.05rem;
    border-top-right-radius: 0.05rem;
  .imgBox-content-block {
    border-radius: 0.05rem;
    border: 1px solid #ccc;
  }
  .imgPanel {
    background: #FFF;
  }
  img {
   //  width: 100%;
    height: 1.8rem;
   
  }
}
.common-content-show{
    border-bottom: 1px solid #ddd;
}
.common-content-show div{
   height:.35rem;
   line-height: .35rem;
}
.common-content-show div span{
    display: inline-block;
        width:33.3%;
        text-align: center;
}
.title {
  border-top: 1px solid #ccc;
  color: #22AE44;
  padding:.03rem 0;
}
.Unqualified {
  color: #C82D3C;
}
.mask {
  background: #ccc;
  position: fixed;
  top: 0.5rem;
  left: 0;
  right: 0;
  bottom: 0;
  img {
    width: 100%;
  }
}
</style>

