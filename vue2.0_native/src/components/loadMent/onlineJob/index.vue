<template>
    <div>
	   <header-default :title="title"></header-default>
	   <div class="common-page-head">
		   	<div class="imgbarBox">
		   	  <div v-for="(item, index) in imgbarList" :key="index" class="img"  @click="LMimgClick(index)">
		   	  	 <img :src="item.imgUrl" alt=""/>
		   	  	 <span>{{item.content}}</span>
		   	  </div>
		   </div>
		   <div class="blankSpace">
		   	  <div @click.stop="jobLogging">
		   	  	<img :src="timeUrl" alt=""/>
		   	  	<span>作业记录</span>
		   	  </div>
		   </div>
	   </div>
	   <div class="common-page-flex">
          <ul class="common-bottom-box">
             <li class="common-content-title">
               <div>品名规格</div>
               <div>数量</div>
               <div>码货标准</div>
               <div>拍照</div>
               <div>操作</div>
             </li>            
             <li v-for="(item,index) in tempData" :key="index" class="common-content-item" >
               <div>
               	 <span class="spimg">
               	     <img :src="item.binPicture" alt=""/>
               	 </span>
               	 <span class="text">{{item.binName}}</span>
               </div>
               <div>{{item.num}}</div>
               <div @click="check(item.binPicture)">查看</div>
               <!-- <div><img :src="imgUrl" alt="" class="img"></div> -->
			    <div class="driverPhoto">
                    <p class="takephoto" @click="takePhoto(index)">
                        <img :src="imgUrl">
                    </p>
                </div>
               <div>
               	 <span v-if="item.state == 2" class="ok" >已完成</span>
               	 <span v-if="item.state == 1" class="no" @click="unfinished(item,index)">未完成</span>
               </div>
             </li>
          </ul>
    </div>
		 <mt-popup v-model="popupVisible"  class="mint-popup">
           <ul class="mint-popup-ul">
           	  <li class="mint-popup-text">请确认是否存在尚未处理的商品破损?</li>
			 <li class="mint-popup-tab">
           	  	<span v-for="(v,i) in tabText" :key="i" :class="textIndex==i?'textred':''" class="tab" @click="isEnd(i)">{{v.text}}</span>
           	 </li>
           </ul>
        </mt-popup>
          <div class="foot" v-if="isShow == 1" @click="endtask">
         	     结束任务
          </div>
		  <div class="foot" v-if="isShow == 2"  @click="workDown">
         	     申请下班
          </div>
     
	</div>
</template>

<script>
	import HeaderDefault from "@/components/common/HeaderDefault"
	import native from '@/native/bridge.js'
	export default{
		name:"onlineJob",
		data(){
			return {
				title:"装卸任务",
				imgUrl:require("@/assets/images/common/takePhoto.png"),
				timeUrl:require("@/assets/images/loader/time.png"),
				imgbarList:[
				   {
				   	 imgUrl:require("@/assets/images/loader/rest.png"),
				   	 content:"休息"
				   },
				   {
				   	 imgUrl:require("@/assets/images/loader/breakdown.png"),
				   	 content:"商品破损"
				   },
				   {
				   	 imgUrl:require("@/assets/images/loader/tray.png"),
				   	 content:"托盘破损"
				   },
				],
				tempData:[],
				isShow:false,
				stateArr:[],
				stevedoreNum:"",  //装卸单号
				shipmentNum:"" , //装运单编码
				takePhotoFlag: true,
				imgPath: [],//拍照图片路劲数组
				popupVisible:false,
				tabText:[
				{
					text:"不存在"
				},
				{
					text:"存在"
				}
				],
               textIndex:1,
			}
		},
		created(){
			this.getData()
		},
		methods:{
			//拍照
				takePhoto(index){
					if(this.imgPath[index]){
						this.$router.push({
							path: "/phoneShow",
							query:{img:this.imgPath[index]}
				   	   })
					}else{
						if(this.takePhotoFlag){
						native.callhandler('takePhot', '', data => {
							if (eval("(" + data + ")").ret_code == "0") {
								let dataUrl = eval("(" + data + ")").data.url;
								this.imgPath[index] = dataUrl
								var obj = {
									index:index,
									imgUrl:dataUrl
								}
								obj = JSON.stringify(obj)
								localStorage.setItem("dataUrl",obj);
							}else{
								console.log(eval("(" + data + ")"));
								window.instance ? window.instance.close() : "";
								window.instance = this.$toast(eval("(" + data + ")").msg);
							}
						})
					  }
					}
			},
			//点击图片页面跳转
			LMimgClick(index){
				   if(index === 0){
				   	   this.$router.push({
				   	   	   path: "/loadMent/onlineJob/rest"
				   	   })
				   }else if(index === 1){
				   		this.$router.push({
				   	   	   path: "/loadMent/onlineJob/loadDamage",
				   	   	   query:{shipmentNum:this.shipmentNum}
				   	   })
				   }else if(index === 2){
				   	   this.$router.push({
				   	   	   path: "/loadMent/onlineJob/trayDamage"
				   	   })
				   }				
			},
			//工作记录
			jobLogging(){
				this.$router.push({
			        path: "/loadMent/onlineJob/distributionTask"
			    });
			},
			//查看
			check(imgUrl){
				// this.$router.push({
			    //     path: "/loadMent/onlineJob/goodsStandard",
			    //     query:{imgUrl:imgUrl}
			    // });
			},
			getData(){
				this.$loading.open();
				this.$http.post("wms/stevedore/detail/list",
				{dateTemp:new Date().getTime()}
				).then(res=>{
				  console.log(res)
				  this.$loading.close();
				  if(res.data.ret_code == 0){
					  this.stevedoreNum = res.data.data.stevedoreNum//装卸单号
					  this.shipmentNum = res.data.data.shipmentNum//装运单号
					  this.tempData = res.data.data.details
					  let  obj =  localStorage.getItem("dataUrl")
					  let dataUrl = JSON.parse(obj)
					  console.log(dataUrl,"111111")
					  for (var i = 0; i < this.tempData.length; i++) {
									
							if(this.tempData[i].scenePicture){
									this.imgPath.push(this.tempData[i].scenePicture)
							}else{
								this.imgPath.push('')
							}
							if(dataUrl){
								for (let i = 0; i < this.imgPath.length; i++) {
									if( i == dataUrl.index){
									  this.imgPath[i] = dataUrl.imgUrl	
									}	
								}
							}
							if(this.tempData[i].state == 2){
								this.stateArr.push(this.tempData[i].state)
							}					
					}
					 		 console.log(this.imgPath)
							//判断立即结束是否显示
							if(this.stateArr.length == this.tempData.length){
								this.isShow = 1
							}
				      }
				}).catch(err=>{
					console.log(err)
				})
			},
			
			//未完成
			unfinished(item,index){
				if(this.imgPath[index]){
					localStorage.removeItem("dataUrl")
					item.state = 2
					this.stateArr.push(item.state)
					//判断立即结束是否显示
					if(this.stateArr.length == this.tempData.length){
						this.isShow = 1
					}
					let params = {
							id:item.id,
							sceneUrl:this.imgPath[index]
					}
					console.log(params)	
					this.$http.post("wms/stevedore/detail/complete",params).then(res=>{
						console.log(res)
						}).catch(err=>{ 
						console.log(err)
					})
				}else{
					this.$toast("请先拍照！")
					native.callhandler("showVoice", "请先拍照！");
				}
				
		   },
		   //结束任务
		   endtask(){
			   this.popupVisible = true
		   },
		   //判断是否有商品破损
		   isEnd(i){
			   console.log(i)
			   this.popupVisible = false
			   
			   if(i == 0){//结束任务
				this.$loading.open();
				this.$http.post("wms/stevedore/task/complete",
					{stevedoreNum:this.stevedoreNum}
					).then(res=>{
							console.log(res)
							this.$loading.close();
							if(res.data.ret_code == 0){
								this.$http.post("wms/stevedore/detail/list",{dateTemp:new Date().getTime()}).then(res=>{
									console.log(res)
									if(res.data.data){
										this.stevedoreNum = res.data.data.stevedoreNum//装卸单号
										this.shipmentNum = res.data.data.shipmentNum//装运单号
										this.tempData = res.data.data.details
										this.stateArr = []	
										for (var i = 0; i < this.tempData.length; i++) {
											if(this.tempData[i].state == 2){
												this.stateArr.push(this.tempData[i].state)
											}					
										}
										//判断立即结束是否显示
										if(this.stateArr.length == this.tempData.length){
											this.isShow = 1
										}
									}else{
										this.tempData = []
										this.stateArr = []
										this.isShow = 2
									}
								}).catch(err=>{
									console.log(err)
								})
							}
					}).catch(err=>{
						console.log(err)
					})
			   }else{//跳转商品破损
				   this.$router.push({
				   	   	   path: "/loadMent/onlineJob/loadDamage",
				   	   	   query:{shipmentNum:this.shipmentNum}
				   	})
			   }
		   },
		  //下班
		  workDown(){
			//  this.$router.push({
			//         path: "/loadMent/onlineJob/workWork",  
			//  }); 
			  this.$http.post("wms/stevedore/detail/list",{dateTemp:new Date().getTime()}).then(res=>{
				console.log(res)
					if(res.data.data){
						this.stevedoreNum = res.data.data.stevedoreNum//装卸单号
						this.shipmentNum = res.data.data.shipmentNum//装运单号
						this.tempData = res.data.data.details
						this.stateArr = []	
						for (var i = 0; i < this.tempData.length; i++) {
							if(this.tempData[i].state == 2){
								this.stateArr.push(this.tempData[i].state)
							}					
						}
						//判断立即结束是否显示
						if(this.stateArr.length == this.tempData.length){
								this.isShow = 1
						}
					}else{
							this.$router.push({
			                   path: "/loadMent/onlineJob/workWork",  
			                }); 
					}
				}).catch(err=>{
					console.log(err)
				})
		  }
		},
		components:{
			HeaderDefault
		}
	}
</script>

<style lang="scss" scoped>
     .common-page-head{
     	width: 100%;
     	height: 1.18rem;
     	position: fixed;
     	top: 0.5rem;
     	left: 0;
     }
	.imgbarBox{
		background: #FFFFFF;
		display: flex;
		justify-content: space-between;
		padding: 0.11rem 0.20rem;
	}
	.imgbarBox .img{
		text-align: center;
		font-size: 0.16rem;
		font-weight: 600;
	}
	.imgbarBox .img img{
		width: 0.4rem;
		height: 0.4rem;
		padding-bottom: 0.02rem;		
	}
	.imgbarBox div{
		text-align: center;
	}
	.imgbarBox .img span{
		display: block;
	}
	.blankSpace{
		padding: 0.07rem 0.18rem;
		font-size: 0.14rem;
		background: #F1F1F0;
		color: #FF7F00;
		font-weight: 500;
		display: flex;
		justify-content: flex-end;
		
	}
	.blankSpace div{
		width: 25%;
		display: flex;
		align-items: center;
		justify-content: flex-end;
	}
	.blankSpace img{
		width: 0.14rem;
		height: 0.14rem;
		margin-right: 0.03rem;	
	}
	.common-page-flex{
		margin-top: 1.18rem;
	}
	.common-bottom-box{
     	padding: 0.08rem 0.16rem;
     	margin-bottom: 0.48rem;
     }
     .common-bottom-box  li{
     	display: flex;
     	justify-content: space-around;
     	align-items: center;
     	font-size: 0.14rem;
     	padding: 0.15rem 0;
     	border-bottom: solid 1px #D9D9D9;
     } 
     .common-bottom-box  li:last-child{
     	border: none;
     }
     .common-bottom-box  li div{
     	width: 20%;
     	text-align: center;
     }
     .img {
     	width: 40%;
     }
     .common-bottom-box .common-content-title{
     	 background: #F1F1F0;
    	 border: none;
    	 font-weight: 600;
     }
    .common-content-item div:first-child{
    	flex-wrap: wrap;
    }
    .common-content-item div:first-child .spimg{
    	display: block;
    	width:100%;
		height:0.45rem;
		background:rgba(224,224,224,1);
		line-height: 0.42rem;
    }
     .common-content-item .spimg img{
     	width:0.55rem;
		height:0.35rem;
     }
     .common-content-item div:first-child .text{
     	font-size: 0.12rem;
    	padding-top:0.02rem;
    	width: 0.68rem;
     	display: inline-block;
     	width:100%;
     	/*overflow:hidden;
		text-overflow:ellipsis;
		white-space:nowrap;*/
		word-break: break-all;
     }
     .common-content-item div:last-child span{
     	display: block;
     }
	 .driverPhoto .takephoto img{
		 width: 40%;
	 }
	 .mint-popup{			
			border-radius: 0.05rem;
	}
	.mint-popup-ul{
		   width: 3rem;
		   height: 1.5rem;
	}
	.mint-popup-text{
	    	text-align: center;
	    	padding: 0.35rem 0.6rem;
	    	font-size: 0.16rem;
	    	font-weight: 500;
	    	border-bottom: solid 1px #ECECEC;	
	}
	.mint-popup-tab{
	    	display: flex;
	    	justify-content: center;
	}
	.mint-popup-tab .tab{
	    	display: block;
	    	width: 1.5rem;
	    	text-align: center;
	    	font-size: 0.16rem;
	    	font-weight: 500;
	    	padding: 0.09rem 0rem;	
			background: white;    	
	}
	.mint-popup-tab .tab:nth-child(1){
		border-radius: 0 0 0 0.05rem;
	}
	.mint-popup-tab .textred{
	    	background: #E31D2B;
	    	border-radius: 0 0 0.05rem 0;	
			border:none;   
			padding: 0.09rem 0rem; 	
	}
     .ok{
     	background: #F0FEF1;
     	border: solid 1px #00B42A;
     	padding: 0.04rem 0rem;
     	border-radius: 0.05rem;
     	font-weight: 500;
     	margin: 0.05rem 0rem;
     	}
     .no{
     	background: #FFECEC;
     	border: solid 1px #E31D2B;
     	color: #E31D2B;
     	padding: 0.04rem 0rem;
     	border-radius: 0.05rem;
     	font-weight: 500;
     	margin: 0.05rem 0rem;
     	}
     .foot{
		text-align: center;
		height: 0.48rem;
		line-height: 0.48rem;
		width: 100%;
		background:#E31D2B ;
		color: white;
		font-size: 0.16rem;
		position: fixed;
		bottom: 0rem;
		left: 0rem;
	}
</style>