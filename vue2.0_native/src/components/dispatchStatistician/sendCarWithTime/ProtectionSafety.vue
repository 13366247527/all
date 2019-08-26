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
            <p class="title" :class="item.statu==0?'Unqualified':''">{{item.title}}</p>
             <div @click.stop="changeStatus(index)" class="checked">
          <img
            v-if="orderStatusLists.indexOf(index)>=0||isCheckedAll"
            src="@/assets/images/common/checked.png"
          >
          <img v-else src="@/assets/images/common/check.png">
        </div>
          </div>
        </div>
      </div>
      <div class="mask" v-show="status==0" @click="imgHide">
        <img :src="imgPaths.imgPath" alt>
      </div>
    </div>
    <div class="common-bottom-button bottom-button-fixed">
      <span class="redBtner" >合格</span>
      <span class="orangeBtn" >不合格</span>
    </div>
  </div>
</template>

<script>
import HeaderDefault from "@/components/common/HeaderDefault";
export default {
  components: { HeaderDefault },
  data() {
    return {
      title: "防护安全",
      status:1,
       isCheckedAll: false,
      orderStatusLists: [],
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
       changeStatus: function(index) {
      let idIndex = this.orderStatusLists.indexOf(index);

      if (idIndex >= 0) {
        this.orderStatusLists.splice(idIndex, 1);
      } else {
        this.orderStatusLists.push(index);
      }
    },
    back() {
      this.$router.go(-1);
    }
  }
};
</script>

<style lang="scss" scoped>
.common-content-box {
  margin-bottom: 0.5rem;
}

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
    position: relative;
    P img{
 width: 1.57rem;
    height: 1.24rem;
    border-top-left-radius: 0.05rem;
    border-top-right-radius: 0.05rem;
    }
  }
  .imgPanel {
    background: #ccc;
  }
  img {
   width: .16rem;
   
  }
  .checked{
position: absolute;
    bottom: .025rem;
    right: .16rem;
  }
}
.title {
  border-top: 1px solid #ccc;
  color: #FEBA02;
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

