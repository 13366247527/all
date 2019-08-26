<template>
    <div class="common-page-flex">
          <ul class="common-bottom-box">
             <li v-for="(item,index) in tempData" :key="index" class="common-bottom-item">
               <div class="common-bottom-title" :class="index === nowIndex && isShow ?'tab':''">
	               	   <div>姓名：<span>{{item.userName}}</span></div>
		               <div>上班时间：<span>08:00</span></div>
		               <div @click="popup(item,index)">
	               	   	<img v-if="isCheckedAll && nowIndex === index " src="@/assets/images/common/up.png">
			            <img v-else src="@/assets/images/common/down.png">
	                  </div>
               </div>
               <div v-show="isShow && nowIndex === index" class="popup">
               	  <ul class="common-bottom-box">
			           <li>
			           	  <div>
			           	  	
			           	    <label>低血压值:<input  type="text" v-model="lowBloodPressure" /></label> 
			           	  </div>
			           	  <div >
			           	  	 
			           	     <label>高血压值:<input  type="text" v-model="highBloodPressure" /></label>
			           	  </div>
			           </li>
			           <li>
			           	  <label>酒精测试:<input  type="text" v-model="alcoholNum" /></label>
			           </li>
			           <li>
			           	   <div>
			           	   	  <div class="takePhoto">
			           	   	  	<img src="@/assets/images/common/takePhoto.png" />
			           	   	  </div>
			           	   	  <span>测血压照</span>
			           	   </div>
			           	   <div>
			           	   	  <div class="takePhoto">
			           	   	  	<img src="@/assets/images/common/takePhoto.png" />
			           	   	  </div>
			           	   	  <span>酒精测试照</span>
			           	   </div>
			           </li>
			           <li>
			           	<div @click="pushData">确认</div>
			           </li>
               	   </ul>
               </div>
             </li>
          </ul>
             
     </div>
</template>

<script>
	
	export default{
		name:"employee",
		data(){
			return {
				tempData:[],
				nowIndex:null,//开关下标
				isShow:false,//弹框是否显示
				isCheckedAll:false,//开关上下
				lowBloodPressure:"",//低血压值
				highBloodPressure:"",//高血压值
				alcoholNum:"",//酒精测试
				tempDataone:{},//后台数据
			}
		},
		created() {
            this.getData();
        },
		methods:{
			//开关
			popup(item,index){
				if(index != this.nowIndex){
					this.nowIndex = index
					this.isShow = true
					this.isCheckedAll = true
				}else{
					this.nowIndex = index
					this.isShow = !this.isShow
					this.isCheckedAll = !this.isCheckedAll
				}
				this.tempDataone = item
				this.lowBloodPressure=""
				this.highBloodPressure=""
				this.alcoholNum=""
			},
			getData(){
				this.$http.post("wms/sign/detection/detection/list/person",{}).then(res=>{
				  let arr  = res.data.data.list
				  console.log(arr)
				  this.tempData = arr
				}).catch(err=>{
					console.log(err)
				})
			},
			pushData(){
				this.$http.post("/wms/sign/detection/detection/submit",
				{
				 physicalExamId:this.tempDataone.physicalExamId,
				 userId:this.tempDataone.userId,
				 lowBloodPressure:this.lowBloodPressure,
				 highBloodPressure:this.highBloodPressure,
				 alcoholNum:this.alcoholNum,
				 bloodPressureUrl:1,
				 alcoholUrl:1, 
				 type:1
				}).then(res=>{
				  console.log(res)
				}).catch(err=>{
					console.log(err)
				})
				this.isShow = false
				this.isCheckedAll = false
				this.lowBloodPressure=""
				this.highBloodPressure=""
				this.alcoholNum=""
			}
		}
	}
</script>

<style lang="scss" scoped>
    .common-bottom-box{
    	margin-top: 0.04rem;
     	padding: 0.04rem 0.16rem;
     }
     .common-bottom-item{
     	position: relative;
     	font-size: 0.14rem;
     	display: flex;
     	flex-wrap: wrap;
     	font-family:SourceHanSansCN-Regular;
     	color: #333333;
     }
     .common-bottom-item:last-child{
     	border-bottom: solid 1px #D9D9D9;
     }
     .common-bottom-item div:last-child{
     	margin-bottom: 0rem;
     }
     .common-bottom-title{
     	display: flex;
     	justify-content: space-between;
     	font-family:SourceHanSansCN-Regular;
     	width: 100%;
     	padding: 0.15rem 0rem;
     	padding-left: 0.2rem;
     	border-top: solid 1px #D9D9D9;
     }
     .tab{
     	background: #FFD1D1;
     	color: #E31D2B;;
     }
     .common-bottom-title div:nth-of-type(1),
     .common-bottom-title div:nth-of-type(2){
     	width: 40%;
     }
     .common-bottom-title div:nth-of-type(3){
     	width: 10%;
     }
     .common-bottom-title img{
     	width: 50%;
     }
     .popup{
     	width: 100%;
     }
     .popup .common-bottom-box{
     	background:#FFE8E8;
     	margin-top: 0rem;
     	font-size: 0.14rem;
     	padding: 0rem  0rem;
     }
      .popup .common-bottom-box li{
      	padding: 0.05rem 0rem; 
      	border-bottom:solid 1px #FFFFFF; 	
      }
     .popup .common-bottom-box li:nth-of-type(1){
     	display: flex;
     	justify-content: space-around;
     }
     .popup .common-bottom-box li:nth-of-type(2){
     	padding-left: 0.23rem;
     }
     .popup .common-bottom-box li:nth-of-type(3){
     	display: flex;
     	justify-content: space-around;
     }
     .popup .common-bottom-box li:nth-of-type(3) div{
     	text-align: center;
     }
     .popup .common-bottom-box li:nth-of-type(3) .takePhoto{
     	background: #FFFFFF;
     	text-align: center;
     	width: 1rem;
     	height: 1rem;
     	line-height: 1rem;
     }
     .popup .common-bottom-box li:nth-of-type(3) span{
     	padding: 0.04rem 0rem;
     	display: block;
     	color: #E31D2B;
     	font-family:SourceHanSansCN-Medium;
     }
      .popup .common-bottom-box li:nth-of-type(3) img{
      	 width: 30%;
      }
      .popup .common-bottom-box li:nth-of-type(4){
     	display: flex;
     	justify-content: center;
     }
     .popup .common-bottom-box li:nth-of-type(4) div{
     	 width: 2.4rem;
     	 height: 0.31rem;
     	 line-height: 0.31rem;
     	 background:#E31D2B;
     	 text-align: center;
     	 color: #FFFFFF;
     	 border-radius: 0.05rem;
     }
     .popup .common-bottom-box input{
     	width: 0.6rem;
     	height: 0.3rem;
     	margin-left: 0.05rem;
     }
     .popup .common-bottom-box span{
     	margin-right: 0.04rem;
     }
     
</style>