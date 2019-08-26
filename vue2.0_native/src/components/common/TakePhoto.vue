<template>
  <div>
    <div @touchmove.prevent.stop @click="normalImg" v-if="isBig">
      <div class="mask"></div>
      <img :src="bigImgUrl" class="active">
      <div class="common-bottom-button bottom-button-fixed retake" @click.stop="takePhoto(1)">重拍</div>
    </div>
    <div class="imgBox" @click="takePhoto">
      <p class="imgPanel">
        <img :src="outImg" class="out" v-show="status==false">
        <img
          v-if="poto1==0"
          :src="imagePath?imagePath:imgPath"
          :class="[imgFlag?'':'photo',imagePath?'photo':'']"
          class="imgUrl"
          alt
        >
        <img v-else :src="imgPath1" :class="imgFlag?'':'photo'" class="imgUrl" alt>
      </p>
      <p class="title" :class="status?'':'red'">{{title}}</p>
    </div>
  </div>
</template>

<script>
import native from "@/native/bridge.js";
import { setCache, getCache } from "@/config/utils";
export default {
  name: "takePhoto",
  props: [
    "title", // 照片名称
    "poto1", // 初始照片
    "imagePath", // 路径
    "status", // 判断是否合格
    "list", // 传参数
    "lists", // 传参数
    "flag",  // 判断是否上传
    "flags", // 私有
    "Whether", // 判断状态是否可拍照
    "Damaged", // 破损拍照
    "AscendHeight", //登高
    "text"
  ],
  data() {
    return {
      imgPath:
        "http://img.logwsd.com/group1/M00/01/39/rBUAEF1TcFqAPnUPAAAEXyS_a5I826.png",
      imgPath1: require("@/assets/images/common/takePhoto.png"),
      outImg: require("@/assets/images/common/outs.png"),
      isBig: false,
      takePhotoFlag: true,
      imgFlag: true,
      imgData: "",
      photoImgs: []
    };
  },
  mounted() {},
  methods: {
    takePhoto(type = 0) {
      console.log(this.Whether);
      if (this.Whether) {
        native.callhandler(
          "showVoice",
          "审核状态中和审核通过不可拍照！",
          data => {}
        );
        window.instance ? window.instance.close() : "";
        window.instance = this.$toast("审核状态中和审核通过不可拍照！");
        return false;
      }
      if (this.AscendHeight) {
        native.callhandler(
          "showVoice",
          "请先点击登高作业！",
          data => {}
        );
        window.instance ? window.instance.close() : "";
        window.instance = this.$toast("请先点击登高作业！");
        return false;
      }
      
      if (this.Damaged) {
        native.callhandler(
          "showVoice",
          "没有破损，不可拍照！",
          data => {}
        );
        window.instance ? window.instance.close() : "";
        window.instance = this.$toast("没有破损，不可拍照！");
        return false;
      }
      if (!this.flags) {
        if (type == 1) {
          this.takePhotoFlag = true;
          this.imgFlag = false;
          this.isBig = false;
        }
        if (this.takePhotoFlag) {
          native.callhandler("takePhot", "", data => {
            this.$loading.close();
            if (eval("(" + data + ")").ret_code == "0") {
              let dataUrl = eval("(" + data + ")").data.url;
              //this.takePhotoFlag = false;
              this.imgFlag = false;
              this.imagePath = dataUrl;
              this.imgPath = dataUrl;
              this.status = true;
              if (!this.flag) {
                this.$loading.open();
                let params = {
                  imgUploadInput: dataUrl,
                  picturecls: this.lists.picturecls,
                  picturetyp: this.list,
                  docId: this.lists.docId
                };
                console.log(params);
                this.$http.post("/uploadPicture", params).then(res => {
                  this.$loading.close();
                  let result = res.data;
                  console.log(result);
                  if (result.ret_code == "0") {
                    window.instance ? window.instance.close() : "";
                    window.instance = this.$toast(result.msg);
                     native.callhandler("showVoice", result.msg);
                  }
                });
              }
            } else {
              console.log(eval("(" + data + ")"));
              window.instance ? window.instance.close() : "";
              window.instance = this.$toast(eval("(" + data + ")").msg);
               native.callhandler("showVoice", eval("(" + data + ")").msg);
            }
          });
        } else {
          // this.isBig = !this.isBig;
          this.bigImgUrl = this.imgPath;
        }
      } else {
        native.callhandler("showVoice", "请先点击开始卸货！", data => {});
        window.instance ? window.instance.close() : "";
        window.instance = this.$toast("请先点击开始卸货！");
      }
    },
    normalImg() {
      this.isBig = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.mask {
  width: 100%;
  height: 100%;
  background: #333;
  opacity: 0.7;
  display: block;
  margin: 0 auto;
  position: fixed;
  top: -0.5rem;
  bottom: -0.5rem;
  left: 0;
  right: 0;
  z-index: 999;
}
.active {
  width: 100%;
  height: 100%;
  display: block;
  margin: 0 auto;
  position: fixed;
  top: -0.5rem;
  bottom: -0.5rem;
  left: 0;
  right: 0;
  // top: 50%;
  // left: 50%;
  // transform: translateX(-50%) translateY(-50%);
  // -webkit-transform: translateX(-50%) translateY(-50%);
  z-index: 10000;
}
.imgBox {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: column nowrap;
  border-radius: 0.05rem;
  overflow: hidden;
  border: 1px solid rgba(192, 192, 192, 1);
  .imgPanel {
    width: 100%;
    flex-grow: 1;
    flex-basis: 0;
    background: rgba(240, 240, 240, 1);
    display: flex;
    justify-content: center;
    align-items: center;

    img {
      width: 0.59rem;
      height: 0.48rem;
    }
    .photo {
      width: 100%;
      height: 100%;
    }
  }
  .out {
    position: absolute;
    top: 0.7rem;
    left: 0.1rem;
  }
  .title {
    display: block;
    height: 0.27rem;
    line-height: 0.27rem;
    text-align: center;
    font-size: 0.15rem;
    @include normal-font();
    border-top: 1px solid rgba(192, 192, 192, 1);
  }
}

.retake {
  z-index: 99999;
}
</style>
