<template>
  <div class="common-page-flex">
    <header-default :title="title"></header-default>
    <div class="tab pageFlex">
      <div class="commonTabDiv pd48 selectBox-r">
        <ul class="commonTab common-content-box">
          <li>
            <span>客户数：</span>
            <span class="red">{{dataList.count}}</span>
          </li>

          <li>
            <span>车队：</span>
            <span class="red wid150">{{dataList.vehgrpnam}}</span>
            <span>重量：</span>
            <span :class="active">{{dataList.totartwgt}}</span>
          </li>
          <li>
            <span>车型选择：</span>
          </li>
        </ul>
        <Select-box
          :selectDataList="Vehicletype"
          :currentTags="currentTags"
          @vehtypnams="shows"
          class="arrivalTime"
        ></Select-box>
      </div>

      <ul class="common-content-box">
        <li class="common-content-title">
          <div @click.stop="allSelected" class="checked">
            <img v-if="isCheckedAll" src="@/assets/images/common/checked.png">
            <img v-else src="@/assets/images/common/check.png">
          </div>
          <div>客户名称</div>
          <div>重量</div>
          <div>数量</div>
          <div>沟通</div>
        </li>
        <li v-for="(item, index) in tempData" :key="index">
          <div @click.stop="changeStatus(index)" class="checked">
            <img
              v-if="orderStatusLists.indexOf(index)>=0||isCheckedAll"
              src="@/assets/images/common/checked.png"
            >
            <img v-else src="@/assets/images/common/check.png">
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
          <div>
            <p class="selectBox wid80">
              <span class="orgBtn" @click="Communicate(item)">沟通</span>
            </p>
          </div>
        </li>
      </ul>
    </div>
    <div class="common-bottom-button bottom-button-fixed">
      <span class="orangeBtn" @click="AssemblyWaybill">选单</span>
      <!-- <span class="redBtner" @click="Determine">确定</span> -->
    </div>
  </div>
</template>

<script>
//import native from '@/native/bridge.js'
import HeaderDefault from "@/components/common/HeaderDefault";
import SelectBox from "@/components/common/SelectBox";

export default {
  components: { HeaderDefault, SelectBox },
  name: "TimeReselect",
  data() {
    return {
      isCheckedAll: false,
      orderStatusLists: [],
      dataList: "",
      tempData: [],
      Vehicletypes: "",
      Vehicletype: [
        {
          flex: 1,
          values: [],
          className: "slot1",
          textAlign: "center"
        }
      ],
      active:'',
      currentTags: "",
      vehlicnum: "123123",
      timeStatus: null,
      wgtlimmax: "",
      wgtlimmin: "",
      vehtyp: "",
      title: "人工拼车"
    };
  },
  reated() {
    this.$store.dispatch("getTags"); // 数据需在create生命周期中设定，否则picker中无法获取
  },
   watch: {

        orderStatusLists: {
            handler (newVal) {
                this.num(newVal)
            }
        }
    },
  mounted() {
    this.getData();
    this.$root.eventHub.$on("vehtypnams", this.shows);
  },
  methods: {
    getData() {
      this.$http
        .get("/dispatcherStatist/vehicleScreening", {})
        .then(res => {
          this.$loading.close();
          let result = res.data;
          this.Vehicletypes = result.data;
          console.log(result);
          if (result.ret_code == 0) {
            let data = [];
            result.data.forEach((item, index) => {
              data.push(item.vehtypnam);
            });
            this.$set(this.Vehicletype[0], "values", data);
          }
        })
        .catch(res => {
         // this.$toast("数据获取错误！");
        });

      this.$http
        .get("/dispatcherStatist/littleDelQuery", {})
        .then(res => {
          this.$loading.close();
          let result = res.data;
          this.tempData = result.data.deliveryDoc2s;
          this.dataList = result.data.before;
          console.log(result);
          if (result.ret_code == 0) {
          }
        })
        .catch(res => {
         // this.$toast("数据获取错误！");
        });
    },
    shows(id) {
      this.Vehicletypes.forEach(element => {
        if (element.vehtypnam == id) {
          this.vehtyp = element.vehtyp;
          this.wgtlimmax = element.wgtlimmax1;
          this.wgtlimmin = element.wgtlimmin1;
        }
      });
  if(this.dataList.totartwgt>this.wgtlimmax){
        this.active="red"
      }else if(this.dataList.totartwgt<this.wgtlimmin){
        this.active = "orange"
      }else{
        this.active = "green"
      }

    },
    Determine() {},
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
    num(newVal){
      let num = 0
      newVal.forEach(item=>{
        num += this.tempData[item].totartwgt/1
      })
      this.dataList.totartwgt = num.toFixed(2)
      if(num>this.wgtlimmax){
        this.active="red"
      }else if(num<this.wgtlimmin){
        this.active = "orange"
      }else{
        this.active = "green"
      }

    },
    changeStatus: function(index) {
      if (!this.vehtyp) {
        this.$toast("请先选择车型！");
      } else {
        let idIndex = this.orderStatusLists.indexOf(index);

        if (idIndex >= 0) {
          this.orderStatusLists.splice(idIndex, 1);
        } else {
          this.orderStatusLists.push(index);
        }
      }
    },
    AssemblyWaybill() {
       if (!this.vehtyp) {
        this.$toast("请先选择车型！");
      }else{
        if(this.dataList.totartwgt>this.wgtlimmax){
        this.$toast("您已超重，请减单！")
      }else if(this.dataList.totartwgt<this.wgtlimmin){
        this.$toast("您重量不足，请加单！")
      }else{

        this.$router.push({
        path: "/vehicleDispatcher/billManagement/AssemblyWaybill",
        query:{
            index:this.orderStatusLists,
            totartwgt:this.dataList.totartwgt
            }
      });
      }
}

      
    },
    allSelected: function() {
      if (!this.vehtyp) {
        this.$toast("请先选择车型！");
      } else {
        this.isCheckedAll = !this.isCheckedAll;

        if (this.isCheckedAll) {
          this.orderStatusLists = [];

          this.tempData.forEach((item, index) => {
            this.orderStatusLists.push(index);
          });
        } else {
          this.orderStatusLists = [];
        }
      }
    },
    Communicate(item) {
      this.$router.push({
        path: "/vehicleDispatcher/billManagement/Communicate",
        query: {
          item: item
        }
      });
    },
    standardBig() {
      this.isBig = !this.isBig;
      this.standardFlag = false;
      this.bigImgUrl = require("@/assets/images/common/standard.jpg");
    }
  }
};
</script>

<style lang="scss" scoped>
.pageFlex {
  font-size: 0.18rem;
  margin-bottom: 0.5rem;
}
.common-content-middle {
  height: 0.4rem;
  line-height: 0.4rem;
  margin-left: 0.1rem;
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

.common-content-box li div {
  width: 22.5%;
}
.common-content-box li div:nth-child(2) {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: inline-block;
  line-height: 0.48rem;
}
.common-content-box li .checked {
  width: 10%;
}
.common-bottom-button span {
  width: 100%;
}
.commonTab li {
  padding: 0.1rem 0;
  //width:50%;
}
.commonTab li span:nth-child(1) {
  margin-left: 0.1rem;
}
.selectsty {
  width: 1rem;
  background: #fff;
  border-radius: 0.05rem;
}
.wid150 {
  text-align: left;
  width: 1.5rem;
  display: inline-block;
}
.selectBox-r {
  position: relative;
}
.selectBox {
  padding: 0 0.1rem;
}
.arrivalTime {
  position: absolute;
  width: 2rem;
  bottom: 0.05rem;
  left: 1.1rem;
}
</style>
