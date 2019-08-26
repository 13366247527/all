<template>
  <div class="common-page-flex">
    <header-default :title="title"></header-default>
    <div class="common-content-box">

      <div class="imgBox">
        <div class="imgBox-content" v-for="(item,index) in dataList" :key="index">
          <div class="imgBox-content-block">
            <p  class="imgPanel" @click="imgBig(index)">
              <img  :src="item.imgPath" alt>
            </p>
            <p class="title" :class="item.statu==0?'Unqualified':''">{{item.title}}  </p>
           
          </div>
        </div>
      </div>
      <div class="mask" v-show="status==0" @click="imgHide">
        <img :src="imgPaths.imgPath" alt>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderDefault from "@/components/common/HeaderDefault";
export default {
  components: { HeaderDefault },
  data() {
    return {
      title: "卸货照片",
      status:1,
      
      imgPaths: {
        imgPath: require("@/assets/images/common/standard.jpg")
      },
      dataList: [
        {
          statu: "1",
          imgPath: require("@/assets/images/common/standard.jpg"),
          title: "12312"
        },
        {
          statu: "1",
          imgPath: require("@/assets/images/common/standard.jpg"),
          title: "12312"
        },
        {
          statu: "0",
          imgPath: require("@/assets/images/common/standard.jpg"),
          title: "12312"
        },
        {
          statu: "0",
          imgPath: require("@/assets/images/common/shu.png"),
          title: "12312"
        },
        {
          statu: "1",
          imgPath: require("@/assets/images/common/standard.jpg"),
          title: "12312"
        },
        {
          statu: "0",
          imgPath: require("@/assets/images/common/standard.jpg"),
          title: "12312"
        },
        {
          statu: "0",
          imgPath: require("@/assets/images/common/shu.png"),
          title: "12312"
        },
        {
          statu: "1",
          imgPath: require("@/assets/images/common/standard.jpg"),
          title: "12312"
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
}
.common-content-box {
    padding-left: .1rem;
    padding-right: .1rem;}
.imgBox-content {
  width: 50%;
  margin-top: 0.2rem;
  .imgBox-content-block {
    width: 1.57rem;
    margin: 0 auto;
    border-radius: 0.05rem;
    border: 1px solid #ccc;
  }
  .imgPanel {
    background: #ccc;
  }
  img {
    width: 1.57rem;
    height: 1.24rem;
    border-top-left-radius: 0.05rem;
    border-top-right-radius: 0.05rem;
  }
}
.title {
  border-top: 1px solid #ccc;
  color: #22AE44;
}
.Unqualified {
  color:#C82D3C;
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

