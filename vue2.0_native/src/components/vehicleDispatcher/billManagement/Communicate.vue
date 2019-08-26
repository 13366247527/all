<template>
  <div class="common-page-flex">
    <header-default :title="title"></header-default>
    <div class="tab pageFlex">
      <div class="commonTabDiv pd48">
        <ul class="commonTab common-content-box">
          <li>
            <span>送货单：</span>
            <span class="red">{{dataList.deldocnum}}</span>
          </li>
          <li>
            <span>重量：</span>
            <span :class="active">{{dataList.totartwgt}}&nbsp;吨</span>
          </li>
          <li>
            <span>客户：</span>
            <span>{{dataList.deloutnam}}</span>
          </li>
          <li>
            <span>电话：</span>
            <span class="red">{{dataList.contracttel}}</span>
          </li>
          <li>
            <span>业代：</span>
            <span>{{dataList.repnam}}</span>
          </li>
          <li>
            <span>电话：</span>
            <span class="red">{{dataList.repmobilenum}}</span>
          </li>
        </ul>
      </div>

      <ul class="common-content-box">
        <li class="common-content-title">
          <div>品名规格</div>
          <div>数量</div>
          <div>调整</div>
          <div>重量(kg)</div>
        </li>

        <li v-for="(item, index) in tempData" :key="index">
          <div>
            <span>{{item.artnam}}</span>
          </div>
          <div>
            <span>{{item.shpartqty}}</span>
          </div>
          <div>
            <p class="selectBox wid90">
              <input
                class="red"
                type="text"
                v-model="item.rcvartsuu"
                oninput = "value=value.replace(/[^\d]/g,'')"
                @keyup="num(item.rcvartsuu)"
              >
            </p>
          </div>
          <div>
            <span>{{item.artwgt}}</span>
          </div>
        </li>
      </ul>
    </div>
    <div class="common-bottom-button bottom-button-fixed">
      <span class="orangeBtn">计算</span>
      <span class="redBtner" @click="retreat">退单</span>
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
      active:'red',
      tempData: [
        
      ],
      dataList: {},
      vehlicnum: "123123",
      timeStatus: null,
      title: "沟通"
    };
  },
  computed: {
   
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      let item = this.$route.query.item;
      this.dataList = item;
      console.log(item);

      this.$loading.open();
      let params = {
        id: item.id
      };
      this.$http
        .get("/dispatcherStatist/oneDelivery", params)
        .then(res => {
          this.$loading.close();
          console.log(res);
          let result = res.data;
          if (result.ret_code == 0) {
            this.tempData = result.data;
            this.tempData.forEach((item, index) => {
              if (item.rcvartsuu == 0) {
                this.tempData[index].rcvartsuu = "";
              }
            });
          }
        }).catch(res => {
          //this.$toast("数据获取错误！");
        });
    },
    num(newVal) {
      
       let totartwgt = 0;
        this.tempData.forEach((item, index) => {
          // newVal<item.number?'':item.bottlePrice=item.number
          totartwgt += item.rcvartsuu/1 * item.artwgt/1;
        });
       this.dataList.totartwgt = (totartwgt/1000).toFixed(2);
        if(this.dataList.totartwgt>this.dataList.whlwgtmax){
          this.active="red"
        }else if(this.dataList.totartwgt<this.dataList.whlwgtmin){
          this.active="orange"
        }else{
          this.active="green"
        }
       

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
    retreat(){
      
       this.$loading.open();
      let params = {
        id: this.dataList.id
      };
      this.$http
        .get("/dispatcherStatist/deleteDelivery", params)
        .then(res => {
          this.$loading.close();
          console.log(res);
          let result = res.data;
          if (result.ret_code == 0) {
           this.$toast(result.msg);
           this.back()
          }
        }).catch(res => {
         // this.$toast("数据获取错误！");
        });
    },
    standardBig() {
      this.isBig = !this.isBig;
      this.standardFlag = false;
      this.bigImgUrl = require("@/assets/images/common/standard.jpg");
    },
    back() {
      this.$router.go(-1);
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
.common-content-box li div:nth-child(1) {
  width: 25%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: inline-block;
  line-height: 0.48rem;
}
.common-content-box li div {
  width: 25%;
}
.common-content-box li .checked {
  width: 5%;
}
.common-bottom-button span {
  width: 50%;
}
.commonTab li {
  padding: 0.1rem 0;
  width: 50%;
}
.commonTab li span:nth-child(1) {
  margin-left: 0.1rem;
}
</style>
