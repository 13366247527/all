<template>
  <div class="common-page-flex">
    <header-default :title="title"></header-default>
    <div class="common-content-box">
      <div class="common-content-top">
        <span>沟通电话：</span>
        <span class="red">{{tel}}</span>
      </div>
      <div class="common-content-show">
        <div>
          <span :class="dataLists.LowBloodStatus==0?'green':dataLists.LowBloodStatus==1?'red':'org'">{{dataLists.LowBloodPre}}</span>
          <span :class="dataLists.HighBloodStatus==0?'green':dataLists.HighBloodStatus==1?'red':'org'">{{dataLists.HighBloodPre}}</span>
          <span :class="dataLists.alcStatus==0?'green':dataLists.alcStatus==1?'red':'org'">{{dataLists.alcPre}}</span>
        </div>
        <div>
          <span>低血压值</span>
          <span>高血压值</span>
          <span>酒精值</span>
        </div>
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
      title: "标准检测",
      status: 1,
      tel: "",
     dataLists:'',
      imgPaths: {
        picPath: require("@/assets/images/common/standard.jpg")
      },
      dataList: [
        {
          picState: 1,
          picPath: require("@/assets/images/common/standard.jpg"),
          picDesc: "标准照片"
        },
        {
          picState: 0,
          picPath: require("@/assets/images/common/standard.jpg"),
          picDesc: "妆容照"
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
      let params = {
        docId: "201953256835726101",
        fileName: "WhShipmentDoc",
        picturetyp: "Zrz",
        picturecls: "Qd"
      };
      
      this.$http.post("/signDriver", params).then(res => {
        let result = res.data;
        if (result.ret_code == 0) {
          this.dataLists = result.data
          result.data.imagePath?this.dataList[1].picPath=result.data.imagePath:'';
          console.log(result.data);
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
.common-content-box {
  padding: 0 0.3rem;
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
  width: 100%;
}
.imgBox-content {
  margin-top: 0.2rem;
  width: 100%;
  border-top-left-radius: 0.05rem;
  border-top-right-radius: 0.05rem;
  .imgBox-content-block {
    border-radius: 0.05rem;
    border: 1px solid #ccc;
  }
  .imgPanel {
    background: #fff;
  }
  img {
    //  width: 100%;
    height: 1.8rem;
  }
}
.common-content-show {
  border-bottom: 1px solid #ddd;
}
.common-content-show div {
  height: 0.35rem;
  line-height: 0.35rem;
}
.common-content-show div span {
  display: inline-block;
  width: 33.3%;
  text-align: center;
}
.title {
  border-top: 1px solid #ccc;
  color: #22ae44;
  padding: 0.03rem 0;
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

