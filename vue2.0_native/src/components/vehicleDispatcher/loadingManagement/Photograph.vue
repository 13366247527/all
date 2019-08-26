<template>
  <div>
    <div class="common-page-flex">
      <header-default :title="title"></header-default>
      <ul class="commonTab">
        <li class="photoLine">
          <template v-for="(item, index) in dataList">
            <div class="photoBox input-file" :key="index">
              <take-photo
                :key="index"
                :title="item.imageDesc?item.imageDesc:photoTitle"
                :imagePath="item.imagePath"
                :poto1="0"
                :list="'Qdzp'+index"
                :lists="lists"
                :flag="0"
                status=true
                :Whether="Whether"
                class="photo"
              ></take-photo>
            </div>
          </template>
        </li>
      </ul>
    </div>
    <div class="common-bottom-button bottom-button-fixed">
      <span class="orangeBtn" @click="add">添加照片</span>
      <span @click="back">确定</span>
    </div>
  </div>
</template>

<script>
import TakePhoto from "@/components/common/TakePhoto";
import HeaderDefault from "@/components/common/HeaderDefault";
import { setCache, getCache } from "@/config/utils";
import native from "@/native/bridge.js";

export default {
  name: "carManage",
  components: { TakePhoto, HeaderDefault },
  data() {
    return {
      photoTitle: "签单拍照",
      title: "拍照",
      dataList: [0, 1],
      Whether: false,
      cfmStatus: "",
      lists: {
        docId: "",
        picturecls: "Qdjs"
      }
    };
  },
  mounted() {
    this.getData();
  },

  methods: {
    add() {
      if (this.cfmStatus == 0) {
        this.dataList.push(this.dataList.length);
      } else {
        native.callhandler("showVoice", "已确认不能再拍照片！", data => {});

        window.instance ? window.instance.close() : "";
        window.instance = this.$toast("已确认不能再拍照片！");
      }
     // console.log(this.dataList);
    },
    getData() {
      let data = getCache("bigTruckDriverList").smallOrder[0].deldocId;
      this.lists.docId = data;
      this.$loading.open();
      let params = {
        docId: data
      };
      this.$http
        .post("/getSigningBalance", params)
        .then(res => {
          this.$loading.close();
          let result = res.data;
          if (result.ret_code == 0) {
            this.cfmStatus = result.data.cfmStatus;
            if (this.cfmStatus == 1) {
              this.Whether = true;
            }
            if (result.data.data.imagePaths.length == 0) {
              this.dataList = [0];
            } else {
              this.dataList = result.data.data.imagePaths;
            }
          }
        })
    },
    back() {
      let data = getCache("bigTruckDriverList").smallOrder[0].deldocId;
      this.lists.docId = data;
      this.$loading.open();
      let params = {
        docId: data,
        statecls: "Qdqr",
        statetyp: "Qdqr",
        tableName: "WhDeliveryDoc",
        artnum: ""
      };
      this.$http
        .post("/setTransState", params)
        .then(res => {
          this.$loading.close();
          let result = res.data;
          window.instance ? window.instance.close() : "";
          window.instance = this.$toast(result.msg);
          native.callhandler("showVoice", result.msg, data => {});
        })
        .catch(res => {
          // this.$toast("数据获取错误！");
        });
      this.$router.replace({
        path: "/bigTruckDriver/sign"
      });
    }
  }
};
</script>

<style lang="less" scoped>
.carNum {
  width: 0.8rem;
  margin-left: 0.35rem;
}
.photoLine .photoBox {
  width: 50%;
  height: 1.5rem;
  text-align: center;

  //background: lime;
}
.photoLine .photoBox p {
  width: 1rem;
  height: 0.8rem;
  background: #ccc;
}
.photoLine .photoBox img {
  width: 0.5rem;
}
.photoLine {
  display: flex;
  flex-flow: row wrap;
}
// .commonTab {
//   display: flex;
//   flex-flow: row wrap;
//   justify-content: space-around;
//   overflow-y: scroll;
//   font-size: 0.16rem;
//   position: fixed;
//   top:0;
//   bottom: .5rem;
// }
.commonTab{
  margin-bottom: 0.5rem ;
}
.commonTab li {
  display: flex;
  height: auto;
  margin: 0.1rem 0 0 0;
}
.commonTab .bottom-b {
  padding: 0 0 0.1rem 0;
}
.commonTabtitle {
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: rgba(0, 0, 0, 1);
}

.selectList img {
  margin: 0 0.05rem 0 0.14rem;
}

.selectList .weight {
  flex-grow: 1;
}

.selectList .vehlicnum {
  width: 0.8rem;
}

/* tab3 */
.con3TabDiv .photoLine {
  height: 2.35rem;
  flex-wrap: wrap;
  justify-content: space-between;
}

.photoLine .photoBox {
  width: 50%;
  height: 1.5rem;
}

.con3TabDiv li .disFlex {
  display: flex;
  align-items: center;
}
.photo {
  width: 1.57rem;
  height: 1.24rem;
  margin: 0.02rem auto 0;
}
.marLeft05 {
  margin-left: 0.1rem;
}
.widthIt {
  display: inline-block;
  width: 0.5rem;
  text-align: left;
}

.wid85 {
  width: 0.85rem;
}

.wid135 {
  width: 1.35rem;
}

.wid275 {
  width: 2.75rem;
}

.min75 {
  min-width: 0.75rem;
  text-align: left;
}

.wid245 {
  width: 2.45rem;
}

.wid75 {
  width: 0.75rem;
}

.meter {
  margin-left: 0.05rem;
  color: rgba(227, 29, 43, 1);
}
</style>
