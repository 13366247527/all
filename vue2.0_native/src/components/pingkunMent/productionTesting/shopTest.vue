<template>
  <div>
    <header-default :title="title"></header-default>
     <mt-loadmore
      :top-method="loadTop"
      @top-status-change="handleTopChange"
      ref="loadmore"
      class="loadmoreCss"
    >

    <div class="shopTest">
        <ul>
			      <li class="common-content-title">
			        <div>生产线名称</div>
			        <div>品名规格</div>
			        <div>数量(箱)</div>
			        <div></div>
			      </li>
			      <li v-for="(item, index) in tempData" :key="index" class="tempData">
			        <div>{{item.productLineName}}</div>
			        <div>
                	<span class="img">
                		<img :src="item.artUrl" alt=""/>
                	</span>
                	<span class="text">{{item.artName}}</span>
                </div>
			        <div>
			          <span >{{item.box}}</span>
			        </div>
			        <div @click="changeNext(index)">
			          <span > <img  src="@/assets/images/common/next.png" class="leftimg"></span>
			        </div> 
			      </li>
        </ul>  
    </div>
    </mt-loadmore>
    <div class="total">
        <span>合计:</span>
        <span>{{spnum}}</span>
        <span>箱</span>
    </div>
  </div>
</template>

<script>

import HeaderDefault from "@/components/common/HeaderDefault"
import native from "@/native/bridge.js";

export default {
  name: "shopTest",
  data() {
    return {
      title: "生产检验",
      tempData: [],
      ids:"",//详情接口参数
      spnum:0,//合计
     }   
  },
  components: {
      HeaderDefault
  },
  mounted(){
     this.getData()
     document.getElementsByClassName("mint-loadmore-content")[0].style.position='relative'
      document.getElementsByClassName("mint-loadmore-content")[0].style.top='0'
  },
  methods: {
      //跳转到详情页面
      changeNext(index){
         this.ids = this.tempData[index].ids;
          this.$router.push({
                path: "/pingkunMent/shopTestShow", 
                query:{
                  ids:this.ids,
                } 
			    });
      },
      //获取后台数据
      getData(){
         this.$loading.open();
         this.$http.post('wms/product/control/production/list',{}).then(res=>{
          console.log(res)
           this.$loading.close();
          if(res.data.ret_code == '0'){
            this.spnum = res.data.data.totalBox
            this.tempData = res.data.data.list
          }
        })
      },
      handleTopChange(status) {
      this.topStatus = status;
    },
    dispatchList(flag) {
      this.$http.post('wms/product/control/production/list',{}).then(res=>{
          console.log(res)
           this.$loading.close();
          if(res.data.ret_code == '0'){
            this.spnum = res.data.data.totalBox
            this.tempData = res.data.data.list
            if (flag == 1) {
              this.$toast("刷新成功");
              this.$refs.loadmore.onTopLoaded();
            }
          }
        })
    },
    loadTop() {
      //传1说明是下拉刷新
      this.dispatchList(1);
    }

  }
};
</script>

<style lang="scss" scoped>
    .loadmoreCss {
      position: absolute;
      top: 0rem;
      bottom: 0.05rem;
      right: 0;
      left: 0;
    }

    .tabbarContainer{
      @include tabbar(3.43rem, 1.15rem)
    }
    .shopTest{
     padding: 0.1rem 0.16rem;
     position: relative;
     height: 100%;
    }
    .shopTest ul{
       padding: 0.2rem 0rem;
      //  margin-top: 0.4rem;
        margin-bottom: 0.5rem;
    }
    .shopTest ul li{
      display: flex;
      align-items: center;
      font-size: 15px;
      padding: 0.10rem 0.09rem;
      border-bottom: solid 1px #D9D9D9;
    }
    .shopTest  li div{
      width: 30%;
      text-align: center;
    }
    .shopTest li div:last-child{
       width: 10%;
    }
    .shopTest ul  .common-content-title{
    	justify-content: space-between;
    	color: #000000;
    	font-weight: 600;
    	border: none;
    	background:#F1F1F0 ;
    }
    
    .shopTest .tempData{
        justify-content: space-between;
        align-items: center;
    }
    .tempData div:nth-of-type(2){
    	display: flex;
      flex-wrap: wrap;
      justify-content: center;
    }
    .img{
    	display: block;
      width:0.8rem;
      height:0.45rem;
      background:rgba(224,224,224,1);
      line-height: 0.42rem;
    }
    .img img{
    	width:0.55rem;
		  height:0.35rem;
    }
    .tempData  .text{
    	font-size: 0.12rem;
    	padding-top:0.02rem;
    	width:100%;
     	display: inline-block;
     	word-break: break-all;
     	/*overflow:hidden;
		  text-overflow:ellipsis;
		  white-space:nowrap;*/
    }
    .tempData .leftimg{
      width: 0.12rem;
      height: 0.20rem;
    }
    .total{
       display: flex;
       justify-content: flex-start;
       align-items: center;
       border: none;
       color: #E31D2B;
       width: 100%;
       position: fixed;
       bottom: 0rem;
       left:0rem ;
       font-size: 15px;
       font-weight: 600;
       background: #FFFFFF;
       padding: 0.15rem  0.09rem 0.15rem 0.3rem ;
    }
    .total span{
      display: block;
    }
    .total span:nth-of-type(2){
       margin:0 0.1rem;
    }
    
</style>
<style>
    .mint-loadmore .mint-loadmore-top {
        position: static;
    }
</style>
