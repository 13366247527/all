<template>
  <div class="common-page-flex">
    <header-default :title="title"></header-default>
    <div class="tab pageFlex">
      <div class="commonTabDiv pd48">
        <ul class="commonTab common-content-box">
          <li>
            <span>装运单：</span>
            <span class="red"></span>
          </li>
          <li>
            <span>重量：</span>
            <span class="green">{{totartwgt}}</span>
          </li>
        </ul>
      </div>

      <ul class="common-content-box">
        <li class="common-content-title">
          <div>顺序</div>
          <div>送货单号</div>
          <div>客户名称</div>
          <div>重量</div>
          <div>数量</div>
        </li>

        <li v-for="(item, index) in tempData" :key="index">
          <div>
            <p class="selectBox wid60" @click="openPicker(index)">
              <input class="red" type="text" :value="index+1" readonly >
              <img src="@/assets/images/common/selectIcon.png" alt>
            </p>
          </div>
          <div>
            <span>{{item.deldocnum}}</span>
          </div>
          <div>
            <span>{{item.deloutnam}}</span>
          </div>
          <div>
            <span>{{item.totartwgt}}</span>
          </div>
          <div>
            <span>{{item.shpartqty}}</span>
          </div>
        </li>
      </ul>
    </div>
    <mt-popup v-model="popupVisible" position="bottom" :modal="modalFlag" class="mint-popup">
            <mt-picker :slots="selectDataList" :show-toolbar="true" ref="picker">
                <span @click="handleConfirm" class="sure">确认</span>
            </mt-picker>
        </mt-popup>
    <div class="common-bottom-button bottom-button-fixed">
      <span class="redBtner" @click="Determine">确定</span>
    </div>
  </div>
</template>

<script>
//import native from '@/native/bridge.js'
import HeaderDefault from "@/components/common/HeaderDefault";

export default {
  components: { HeaderDefault },
  name: "TimeReselect",
  data() {
    return {
       popupVisible: false,
        modalFlag: false,
        selectDataList:[ {
          flex: 1,
          values: [],
          className: "slot1",
          textAlign: "center"
        }],
      tempData: [
        
      ],
      totartwgt: "",
      vehlicnum: "123123",
      timeStatus: null,
      number:null,
      title: "组成装运单"
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      this.$http
        .get("/dispatcherStatist/littleDelQuery", {})
        .then(res => {
          this.$loading.close();
          let result = res.data;
          if (result.ret_code == 0) {
            let tempData = result.data.deliveryDoc2s;
            let data = this.$route.query.index;
            let datas = []
            let totartwgt = this.$route.query.totartwgt;
            this.totartwgt = totartwgt;
            let dataList = [];
            data.forEach((item,index) => {
              dataList.push(tempData[index]);
              datas.push(index/1+1)
            });
            this.tempData = dataList;
            this.$set(this.selectDataList[0], "values", datas);
          }
        })
        .catch(res => {
          //this.$toast("数据获取错误！");
        });
    },

    changeTimeSelectStatus(index) {
      this.timeStatus = index;
    },
    toInstruction() {
      this.$router.push({
        path: "/vehicleDispatcher/loadingManagement/aboutCar"
        // query:{
        //     index:this.$route.query.index,
        //     timeStatus: this.dataList[this.timeStatus].selval
        //     }
      });
    },
    standardBig() {
      this.isBig = !this.isBig;
      this.standardFlag = false;
      this.bigImgUrl = require("@/assets/images/common/standard.jpg");
    },
     openPicker(index){
            this.popupVisible = !this.popupVisible;
            this.number = index
        },
    handleConfirm(){
      let data = this.$refs.picker.getValues()
      this.$refs.picker.getValues()
      let dataList = this.tempData[this.number]
      this.tempData.splice(this.number,1)
      this.tempData.splice(data/1-1,0,dataList)

 this.popupVisible = false;
    },
   
    Determine() {
      console.log(this.tempData)
      let ids = [];
      this.tempData.forEach((item, index) => {
        
        ids.push(item.id);
      });
      let params = {
        ids: ids.join(",")
      };
      this.$http
        .post("/dispatcherStatist/packagingDelivery", params)
        .then(res => {
          let result = res.data;
          if (result.ret_code == 0) {
            this.$toast(result.msg);
            this.back();
          }
        });
    },
    back(){
      this.$router.go(-1)
    }
  }
};
</script>

<style lang="scss" scoped>
.pageFlex {
  margin-bottom: 0.5rem;
}
.common-content-box {
  //margin-bottom: 0.5rem;
  display: flex;
  flex-flow: row wrap;
  font-size: 0.16rem;
}
.common-content-box .common-content-title {
  background: #eee;
}
// .common-content-box li div {
//   width: 23.3%;
// }
.common-content-box li div:nth-child(1) {
  width: 15%;
}
.common-content-box li div:nth-child(2) {
  width: 30%;
}
.common-content-box li div:nth-child(3) {
  width: 25%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: inline-block;
  line-height: 0.48rem;
}
.common-content-box li div:nth-child(4) {
  width: 15%;
}
.common-content-box li div:nth-child(5) {
  width: 15%;
}
.common-content-box li .checked {
  width: 5%;
}
.common-bottom-button span {
  width: 100%;
}
.commonTab li {
  padding: 0.15rem 0;
  width: 50%;
}
.commonTab li span:nth-child(1) {
  margin-left: 0.1rem;
}
.wid60 {
  width: 0.5rem;
}
.common-content-box .selectBox img {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0.07rem;
  margin: auto;
  width: 0.11rem !important;
  height: 0.06rem !important;
}
</style>
