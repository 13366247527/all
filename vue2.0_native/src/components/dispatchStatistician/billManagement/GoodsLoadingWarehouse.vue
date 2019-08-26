<template>
  <div class="common-page-flex">
    <header-default :title="title"></header-default>
    <div class="tab pageFlex">
      <ul class="common-content-box">
        <li class="common-content-title">
          <div @click.stop="allSelected" class="checked">
          <img v-if="isCheckedAll" src="@/assets/images/common/checked.png">
          <img v-else src="@/assets/images/common/check.png">
        </div>
          <div>品名规格</div>
          <div>数量</div>
          <div>库号</div>
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
            <span>{{item.number}}</span>
          </div>
          <div>
            <span>{{item.number}}</span>
          </div>
          <div>
            <p class="selectBox wid60" @click="Storehouse(index)">
              <input class="red" type="text" required :value="index+1">
              <img src="@/assets/images/common/selectIcon.png" alt>
            </p>
          </div>
        </li>
      </ul>
      
    </div>
    <div class="common-bottom-button bottom-button-fixed">
        <span class="redBtner" @click="test">确定</span>
    </div>
  </div>
</template>

<script>
//import native from '@/native/bridge.js'
import HeaderDefault from "@/components/common/HeaderDefault";
//import SelectBox from "@/components/common/SelectBox"

export default {
  components: { HeaderDefault },
  name: "TimeReselect",
  data() {
    return {
       isCheckedAll: false,
      orderStatusLists: [],
      tempData: [
        
      ],
      selectDataList: [
                {
                    flex: 1,
                    values: ["十三米","十四米","十五米","十六米","十七米"],
                    className: 'slot1',
                    textAlign: 'center'
                }
            ],
      currentTags:"大型/中型/小型",
      vehlicnum: "123123",
      timeStatus: null,
      title: "货品装货仓库"
    };
  },
  reated () {
        this.$store.dispatch('getTags') // 数据需在create生命周期中设定，否则picker中无法获取
     },
  mounted() {},
  methods: {
    changeTimeSelectStatus(index) {
      this.timeStatus = index;
    },
    toInstruction() {
      this.$router.push({
        path: "/dispatchStatistician/loadingManagement/aboutCar"
        // query:{
        //     index:this.$route.query.index,
        //     timeStatus: this.dataList[this.timeStatus].selval
        //     }
      });
    },
    test(){
      this.$router.push({
        path: "/test"
        // query:{
        //     index:this.$route.query.index,
        //     timeStatus: this.dataList[this.timeStatus].selval
        //     }
      });
    },
    AssemblyWaybill(){
this.$router.push({
        path: "/dispatchStatistician/billManagement/AssemblyWaybill"
        // query:{
        //     index:this.$route.query.index,
        //     timeStatus: this.dataList[this.timeStatus].selval
        //     }
      });
    },
    allSelected: function() {
      this.isCheckedAll = !this.isCheckedAll;

      if (this.isCheckedAll) {
        this.orderStatusLists = [];

        // this.arrivalData.forEach((item, index) => {
        //   this.orderStatusLists.push(index);
        // });
      } else {
        this.orderStatusLists = [];
      }
    },
    Storehouse(index){
        this.$router.push({
          path: "/dispatchStatistician/billManagement/Storehouse",
          query:{
            index:index
          }
      })
    },
    Communicate(index){
      this.$router.push({
          path: "/dispatchStatistician/billManagement/Communicate",
          query:{
            index:index
          }
      })
       
    },
    standardBig() {
      this.isBig = !this.isBig;
      this.standardFlag = false;
      this.bigImgUrl = require("@/assets/images/common/standard.jpg");
    },
    changeStatus: function(index) {
      let idIndex = this.orderStatusLists.indexOf(index);

      if (idIndex >= 0) {
        this.orderStatusLists.splice(idIndex, 1);
      } else {
        this.orderStatusLists.push(index);
      }
    },
  }
};
</script>

<style lang="scss" scoped>
.pageFlex{
    font-size: .18rem;
    margin-bottom: 0.5rem;
}
.common-content-middle{
    height:.4rem;
    line-height: .4rem;
    margin-left:.1rem;
}
.common-content-box {
  //margin-bottom: 0.5rem;
  display: flex;
  flex-flow: row wrap;
  font-size: 0.16rem;
}
.common-content-box .common-content-title {
  background: #fff;
}

.common-content-box li div {
  width: 33.3%;
}
.common-content-box li .checked {
  width: 10%;
}
.common-bottom-button span {
  width: 50%;
}
.commonTab li {
  padding: 0.1rem 0;
  //width:50%;
}
.commonTab li span:nth-child(1){
  margin-left:.1rem;
}
.selectBox img{
    position: absolute;
    top: 0;
    bottom: 0;
    right: .2rem;
    margin: auto;
    width: .11rem!important;
    height: .06rem!important;
}
.selectsty{
  width:1rem;
  background: #fff;
  border-radius: .05rem;

}
.wid60{
    width:.6rem;
}
.wid150{
  text-align: left;
  width:1.5rem;
  display: inline-block;
}
.selectBox-r{
  position: relative;
}
.selectBox{
  padding: 0 .1rem;
}
.arrivalTime{
    position: absolute;
    width: 2rem;
    bottom: .05rem;
    left: 1.1rem;
    
}
</style>
