<template>
  <div class="common-page-flex">
    <header-default :title="title"></header-default>
    <div class="common-content-box">
      <div class="common-content-top">
        <span>沟通电话：</span>
        <span class="red">{{tel}}</span>
      </div>

      <div class="imgBox">
        <div class="imgBox-content" v-for="(item,index) in dataList" :key="index">
          <div class="imgBox-content-block">
            <p class="imgPanel" @click="imgBig(index)">
              <img :src="item.picPath" alt>
            </p>
            <p class="title" :class="item.picState==1?'Unqualified':''">{{item.picDesc}}</p>
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
      title: "车厢照片",
      status: 1,
      tel: "",
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
        }
      ]
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      let id = this.$route.query.id;
      this.tel = this.$route.query.tel;
      this.$loading.open()
      let params = {
        docId: "201953256835726101",
        fileName: "WhShipmentDoc",
        picturetyp: "",
        picturecls: "Rczb"
      };
      this.$http.post("/getPictureByType", params).then(res => {
        let result = res.data;
        this.$loading.close()
        if (result.ret_code == 0) {
          this.dataList = result.data.pictures;
          console.log(this.dataList)
        }
      });
    },
    imgBig(index) {
      this.imgPaths.imgPath = this.dataList[index].picPath;
      this.status = 0;
    },
    imgHide() {
      this.status = 1;
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
.imgBox-content {
  width: 50%;
  margin: 0.2rem 0 0 0;
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
  color: #22ae44;
}
.Unqualified {
  color: #c82d3c;
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
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
  }
}
</style>

