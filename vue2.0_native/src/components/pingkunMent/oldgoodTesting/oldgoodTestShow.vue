<template>
  <div>
    <header-default :title="title"></header-default>
    <div class="shopTest">
        <ul>
			          <li class="testqu" >
			              <span class="text">生产商：</span>
                    <span>111</span>
			          </li>
			      <li class="common-content-title">
			        <div @click.stop="allSelected" class="checked">
			          <img v-if="isCheckedAll" src="@/assets/images/common/checked.png">
			          <img v-else src="@/assets/images/common/check.png">
			        </div>
			        <div>库位</div>
			        <div>品名规格</div>
			        <div>数量(箱)</div>
			        <div>生产日期</div>
			      </li>
			      <li v-for="(item, index) in tempData" :key="index" class="tempData">
			        <div @click.stop="changeStatus(index)" class="checked">
			         <img
			            v-if="orderStatusLists.indexOf(index)>=0||isCheckedAll"
			            src="@/assets/images/common/checked.png"
			          >
			          <img v-else src="@/assets/images/common/check.png">
			        </div>
			        <div>{{item.storageNum}}</div>
			        
			        <div>
			          <span >{{item.artName}}</span>
			        </div>
			        <div>
			          <span >{{item.torr}}</span>
			        </div>
			        <div>
			          <span >{{item.time}}</span>
			        </div> 
			      </li>
			      <li class="total">
               <span>合计：</span>
               <span>{{boxnum}}</span>
                <span>箱</span>
            </li>
        </ul>
        
    </div>
    
    <div class="btnchange" >
        <span v-for="(itme,index) in btnchang" :key="index" @click="btnclick(index)">{{itme}}</span>
    </div>
  </div>
</template>

<script>

import HeaderDefault from "@/components/common/HeaderDefault"
/*import BlankSpace from "@/components/common/BlankSpace"
import SwiperTabBox from "./children/swiperTabBox"*/

export default {
  name: "oldgoodTestShow",
  data() {
    return {
      itemLists: [],
      title: "原材料货品详情",
      tempData: [
            {
            code: 0,
            storageNum:"A01",//库位
            artName: "123456",//品名
            torr: "25",//托数
            time: "2019-4-18"//箱数
            },
            {
            code: 1,
            storageNum:"A01",//库位
            artName: "123456",//品名
            torr: "30",//托数
            time: "2019-4-18"//箱数
            }
        ],
        isCheckedAll:false,
        btnchang:["隔离","放行","撤销"],
        orderStatusLists :[],
        boxnum:6000
     }   
  },
  components: {
  HeaderDefault
  },
  mounted() {
   
  },
  methods: {
    //全选
    allSelected(){
       this.isCheckedAll = !this.isCheckedAll
       if (this.isCheckedAll) {
          for (let i = 0; i < this.tempData.length; i++) {
           this.orderStatusLists.push(i)
          }
      } else {
        this.orderStatusLists = [];
      }
    },
      //单选
    changeStatus(index) {
      let idIndex = this.orderStatusLists.indexOf(index);
      if (idIndex >= 0) {
        this.orderStatusLists.splice(idIndex, 1);
        this.isCheckedAll = false
      } else {
        this.orderStatusLists.push(index);
        if(this.orderStatusLists.length == this.tempData.length){
           this.isCheckedAll = true
        }
      }
    },
    btnclick(index){
      //隔离
      if(index == 0){
           console.log('隔离')
      }
      //放行
      if(index == 1){
          console.log('放行')
      }
      //撤销
      if(index == 2){
        console.log('撤销')
      }
    }
  }
};
</script>

<style lang="scss" scoped>
    .tabbarContainer{
      @include tabbar(3.43rem, 1.15rem)
    }
    .shopTest{
     padding: 10px 0.16rem;
     position: relative;
     height: 100%;
    }
    .shopTest ul{
        margin-bottom: 1.01rem;
    }
    .shopTest ul li{
      display: flex;
      font-size: 15px;
      color:#333333 ;
      padding: 0.14rem 0.09rem;
      border-bottom: solid 1px #D9D9D9;
      align-items: center;
    }
    .shopTest ul li:nth-of-type(1){
      padding:0.10rem  0.09rem;
      display: flex;
      align-items: center;
    }
    .shopTest ul li img{
     width: 0.15rem;
     height: 0.15rem;
    }
    .shopTest  li div:nth-of-type(2){
      width: 10%;
      text-align: center;
    }
     .shopTest  li div:nth-of-type(3){
      width: 30%;
      text-align: center;
    }
     .shopTest  li div:nth-of-type(4){
      width: 20%;
      text-align: center;
    }
     .shopTest  li div:nth-of-type(5){
      width: 30%;
      text-align: center;
    }
    .shopTest ul li .checked{
        width: 10%;
        text-align: center;
    }
    .shopTest ul  .common-content-title{
    	padding: 0.15rem 0.02rem;
    	justify-content: space-between;
    	color: #000000;
    	font-weight: 600;
    	border: none;
    	background:#F1F1F0 ;
    }
    
    .shopTest .tempData{
        padding: 0.15rem 0.02rem;
        justify-content: space-between;
    }
    .shopTest ul .total{
       display: flex;
       justify-content: flex-start;
       border: none;
       color: #E31D2B;
       width: 100%;
       position: fixed;
       bottom: 0.5rem;
       left:0.3rem ;
       font-size: 15px;
       font-weight: 600;
       display: flex;
       background: #FFFFFF;
    }
    .shopTest  .total span:nth-of-type(2){
       margin:0 0.1rem;
    }
    .btnchange{
        width: 100%;
        position: fixed;
		bottom: 0rem;
		left: 0rem;
		display: flex;
    }
    .btnchange span{
     flex: 1;
     text-align: center;
     font-size: 17px;
     padding: 0.15rem 0.43rem;
     color: #FFFFFF;
    }
    .btnchange span:nth-of-type(1){
       background: #E31D2B;
    }
    .btnchange span:nth-of-type(2){
    		background: #FF7F00;
    }
    .btnchange span:nth-of-type(3){
    	background: #FFBA00;
    }
</style>

