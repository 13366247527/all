<template>
  <div class="common-page-flex">
    <header-default :title="title"></header-default>
    <div class="tab pageFlex">
      <div class="commonTabDiv pd48 selectBox-r">
        <ul class="commonTab common-content-box">
          <li>
            <span>客户数：</span>
            <span class="red">{{vehlicnum}}</span>
          </li>
          
          <li>
            <span>车队：</span>
            <span class="red wid150">{{vehlicnum}}</span>
            <span >重量：</span>
            <span class="red">{{vehlicnum}}</span>
          </li>
          <li>
            <span >车型选择：</span>        
          </li>
        </ul>
        <Select-box :selectDataList="selectDataList" :currentTags='currentTags' class="arrivalTime" ></Select-box>
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
            <span>{{item.number}}</span>
          </div>
          <div>
            <span>{{item.number}}</span>
          </div>
          <div>
            <span>{{item.number}}</span>
          </div>
           <div>
            <p class="selectBox wid80">
              <span class="orgBtn" @click="Communicate(index)">沟通</span>
            </p>
          </div>
        </li>
      </ul>
      
    </div>
    <div class="common-bottom-button bottom-button-fixed">
        <span class="orangeBtn" @click="AssemblyWaybill">选单</span>
        <span class="redBtner">确定</span>
    </div>
  </div>
</template>

<script>
//import native from '@/native/bridge.js'
import HeaderDefault from "@/components/common/HeaderDefault";
import SelectBox from "@/components/common/SelectBox"

export default {
  components: { HeaderDefault,SelectBox },
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
      title: "人工拼车"
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
    changeStatus: function(index) {
      let idIndex = this.orderStatusLists.indexOf(index);

      if (idIndex >= 0) {
        this.orderStatusLists.splice(idIndex, 1);
      } else {
        this.orderStatusLists.push(index);
      }
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
    }
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
  background: #eee;
}

.common-content-box li div {
  width: 22.5%;
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
.selectsty{
  width:1rem;
  background: #fff;
  border-radius: .05rem;

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
