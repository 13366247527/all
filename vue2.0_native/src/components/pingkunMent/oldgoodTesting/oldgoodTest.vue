<template>
  <div>
    <header-default :title="title"></header-default>
    <div class="shopTest">
        <ul>
			      <li class="common-content-title">
			        <div>车号</div>
			        <div>单号</div>
			        <div>数量(箱)</div>
			        <div></div>
			      </li>
			      <li v-for="(item, index) in tempData" :key="index" class="tempData">
			       
			        <div>{{item.storageNum}}</div>
			        
			        <div>
			          <span >{{item.artName}}</span>
			        </div>
			        <div>
			          <span >{{item.number}}</span>
			        </div>
			        <div @click="changeNext">
			          <span > <img  src="@/assets/images/common/next.png" class="leftimg"></span>
			        </div> 
			      </li>
			      <li class="total">
               <span>合计:</span>
               <span>{{spnum}}</span>
               <span>箱</span>
            </li>
        </ul>  
    </div>
  </div>
</template>

<script>

import HeaderDefault from "@/components/common/HeaderDefault"
/*import BlankSpace from "@/components/common/BlankSpace"
import SwiperTabBox from "./children/swiperTabBox"*/

export default {
  name: "oldgoodTest",
  data() {
    return {
      title: "原材料检验",
      tempData: [
        {
          code: 0,
          storageNum:"12345",//库位
          artName: "123456",//品名
          number: "3000"//数量
        },
        {
          code: 1,
          storageNum:"12345",//库位
          artName: "123456",//品名
          number: "3000"//数量
        },
        {
          code: 1,
          storageNum:"12345",//库位
          artName: "123456",//品名
          number: "3000"//数量
        },
        {
          code: 1,
          storageNum:"12345",//库位
          artName: "123456",//品名
          number: "3000"//数量
        },
        {
          code: 1,
          storageNum:"12345",//库位
          artName: "123456",//品名
          number: "3000"//数量
        },
        {
          code: 1,
          storageNum:"12345",//库位
          artName: "123456",//品名
          number: "3000"//数量
        },
        {
          code: 1,
          storageNum:"12345",//库位
          artName: "123456",//品名
          number: "3000"//数量
        },
        {
          code: 1,
          storageNum:"12345",//库位
          artName: "123456",//品名
          number: "3000"//数量
        },
        {
          code: 1,
          storageNum:"12345",//库位
          artName: "123456",//品名
          number: "3000"//数量
        },
        {
          code: 1,
          storageNum:"12345",//库位
          artName: "123456",//品名
          number: "3000"//数量
        },
        {
          code: 1,
          storageNum:"12345",//库位
          artName: "123456",//品名
          number: "3000"//数量
        },
        {
          code: 1,
          storageNum:"12345",//库位
          artName: "123456",//品名
          number: "3000"//数量
        },
        {
          code: 1,
          storageNum:"12345",//库位
          artName: "123456",//品名
          number: "3000"//数量
        },
        {
          code: 1,
          storageNum:"12345",//库位
          artName: "123456",//品名
          number: "3000"//数量
        },
        {
          code: 1,
          storageNum:"12345",//库位
          artName: "123456",//品名
          number: "3000"//数量
        },
        {
          code: 1,
          storageNum:"12345",//库位
          artName: "123456",//品名
          number: "3000"//数量
        },
        {
          code: 1,
          storageNum:"12345",//库位
          artName: "123456",//品名
          number: "3000"//数量
        },
        {
          code: 1,
          storageNum:"12345",//库位
          artName: "123456",//品名
          number: "3000"//数量
        },
        {
          code: 1,
          storageNum:"12345",//库位
          artName: "123456",//品名
          number: "3000"//数量
        }
        ],
        spnum:6000//合计
     }   
  },
  components: {
  HeaderDefault
  },
  mounted() {
    
  },
  methods: {
      //跳转到详情页面
      changeNext(){
          this.$router.push({
			          path: "/pingkunMent/oldgoodTestShow",  
			    });
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
       padding: 0.2rem 0rem;
        margin-bottom: 0.5rem;
    }
    .shopTest ul li{
      display: flex;
      align-items: center;
      font-size: 15px;
      padding: 0.15rem 0.09rem;
      border-bottom: solid 1px #D9D9D9;
    }
    .shopTest ul li img{
     width: 0.15rem;
     height: 0.15rem;
    }
    .shopTest  li div{
      width: 30%;
      text-align: center;
    }
     .shopTest li div:last-child{
       width: 10%;
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
        align-items: center;
    }
    .tempData .leftimg{
      width: 0.12rem;
      height: 0.20rem;
    }
    .shopTest  .total{
      display: flex;
       justify-content: flex-start;
       border: none;
       color: #E31D2B;
       width: 100%;
       position: fixed;
       bottom: 0rem;
       left:0rem ;
       font-size: 15px;
       font-weight: 600;
       display: flex;
       background: #FFFFFF;
       padding-left: 0.3rem;
    }
    .shopTest  .total span:nth-of-type(2){
       margin:0 0.1rem;
    }
</style>

