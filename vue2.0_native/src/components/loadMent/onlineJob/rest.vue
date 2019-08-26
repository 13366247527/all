<template>
    <div class="common-page-flex">
        <header-default :title="title"></header-default>
        <div class="restBox">
            <template v-for="(item, index) in boxData">
                <div @click="gorest(index)" :key="index" :class="nowIndex == index && nowIndex == 0 ? 'activegreen' : nowIndex == index && nowIndex == 1 ? 'activeorange' : nowIndex == index && nowIndex == 2 ? 'activeblue' : nowIndex == index && nowIndex == 3 ? 'activered' : nowIndex == index && nowIndex == 4 ? 'activepurple' : nowIndex == index && nowIndex == 5 ? 'activesky' : ''">
                    <p :class="index == 0 ? 'green' : index == 1 ? 'orange' : index == 2 ? 'blue' : index == 3 ? 'red' : index == 4 ? 'purple' : index == 5 ? 'sky' : ''">
                        <img :src="item.imgPath" alt="">
                        <span>{{item.title}}</span>
                    </p>
                </div>
            </template>
        </div>
        <div class="blankSpace">
	   	  <span>当天休息时间</span>
	   </div>
        <ul class="common-content-box">
            <li class="common-content-title">
                <div>类别</div>
                <div>开始</div>
                <div>结束</div>
                <div>用时</div>
            </li>
            <li v-for="(item ,index) in timelist" :key="index">
            	<div>{{item.info}}</div>
            	<div>{{item.startTime | formatDate}}</div>
            	<div>{{item.endTime | formatDate}}</div>
            	<div>{{item.time | minuteDate }}</div>
            </li>
        </ul>
       <mt-popup v-model="popupVisible"  class="mint-popup">
           <ul class="mint-popup-ul">
           	  <li class="mint-popup-text" v-if="nowIndex==0">确定是否休息用午餐么?</li>
           	  <li class="mint-popup-text" v-if="nowIndex==1">确定是否休息用晚餐么?</li>
           	  <li class="mint-popup-text" v-if="nowIndex==2">确定是否休息用夜宵么?</li>
           	  <li class="mint-popup-text" v-if="nowIndex==3">确定是去卫生间么?</li>
           	  <li class="mint-popup-text" v-if="nowIndex==4">确定是否休息么?</li>
           	  <li class="mint-popup-tab">
           	  	<span v-for="(v,i) in tabText" :key="i" :class="textIndex==i?'textred':''" class="tab" @click="isRest(i,nowIndex)">{{v.text}}</span>
           	  </li>
           </ul>
        </mt-popup>
        <div  class="finishdiv"  @click="finishFn" v-show="finish">结束</div>
    </div>
</template>

<script>

import HeaderDefault from "@/components/common/HeaderDefault"
//import Popup from "@/components/common/Popup"
import canjubai from "@/assets/images/loader/canjubai.png"
import canju from "@/assets/images/loader/canjulv.png"
import wancanbai from "@/assets/images/loader/wancanbai.png"
import wancan from "@/assets/images/loader/wancan.png"
import yexiaobai from "@/assets/images/loader/yexiaobai.png"
import yexiao from "@/assets/images/loader/yexiao.png"
import cesuobai from "@/assets/images/loader/cesuobai.png"
import cesuo from "@/assets/images/loader/cesuo.png"
import xiuxibai from "@/assets/images/loader/xiuxibai.png"
import xiuxi from "@/assets/images/loader/xiuxi.png"
import qingjiabai from "@/assets/images/loader/qingjiabai.png"
import qingjia from "@/assets/images/loader/qingjia.png"
import native from "@/native/bridge.js";
export default {
    components: {HeaderDefault},
    data() {
        return {
            title: '用餐休息',
            boxData: [
                {title: '午餐', imgPath: canju},
                {title: '晚餐', imgPath: wancan},
                {title: '夜宵', imgPath: yexiao},
                {title: '卫生间', imgPath: cesuo},
                {title: '休息', imgPath: xiuxi},
                {title: '请假', imgPath: qingjia},
            ],
            nowIndex: -1,
            tempData: [1,2,3],
            popupVisible:false,
            tabText:[
              {
              	text:"取消"
              },
              {
              	text:"确定"
              }
            ],
            textIndex:1,
            finish:false,
            type:"",//休息类型，
            id:"",//异常id
            timelist:[]
        }
    },
    mounted() {
		this.getData();
    },
    methods: {
		//图片点击事件
	    gorest(index){
            this.nowIndex = index
            if(index == 5){
				this.$toast("功能正在开发中...")
				native.callhandler("showVoice", "功能正在开发中...");
            	// this.$router.push({
			    //     path: "/loadMent/onlineJob/leave"
			    // });
            }else{
            	this.popupVisible = true
            }
            switch(index){
                case 0:
                    this.boxData = [
                        {title: '午餐', imgPath: canjubai},
                        {title: '晚餐', imgPath: wancan},
                        {title: '夜宵', imgPath: yexiao},
                        {title: '卫生间', imgPath: cesuo},
                        {title: '休息', imgPath: xiuxi},
                        {title: '请假', imgPath: qingjia},
                    ]
                    break
                case 1:
                    this.boxData = [
                        {title: '午餐', imgPath: canju},
                        {title: '晚餐', imgPath: wancanbai},
                        {title: '夜宵', imgPath: yexiao},
                        {title: '卫生间', imgPath: cesuo},
                        {title: '休息', imgPath: xiuxi},
                        {title: '请假', imgPath: qingjia},
                    ]
                    break
                case 2:
                    this.boxData = [
                        {title: '午餐', imgPath: canju},
                        {title: '晚餐', imgPath: wancan},
                        {title: '夜宵', imgPath: yexiaobai},
                        {title: '卫生间', imgPath: cesuo},
                        {title: '休息', imgPath: xiuxi},
                        {title: '请假', imgPath: qingjia},
                    ]
                    break
                case 3:
                    this.boxData = [
                        {title: '午餐', imgPath: canju},
                        {title: '晚餐', imgPath: wancan},
                        {title: '夜宵', imgPath: yexiao},
                        {title: '卫生间', imgPath: cesuobai},
                        {title: '休息', imgPath: xiuxi},
                        {title: '请假', imgPath: qingjia},
                    ]
                    break
                case 4:
                    this.boxData = [
                        {title: '午餐', imgPath: canju},
                        {title: '晚餐', imgPath: wancan},
                        {title: '夜宵', imgPath: yexiao},
                        {title: '卫生间', imgPath: cesuo},
                        {title: '休息', imgPath: xiuxibai},
                        {title: '请假', imgPath: qingjia},
                    ]
                    break
                case 5:
                    this.boxData = [
                        {title: '午餐', imgPath: canju},
                        {title: '晚餐', imgPath: wancan},
                        {title: '夜宵', imgPath: yexiao},
                        {title: '卫生间', imgPath: cesuo},
                        {title: '休息', imgPath: xiuxi},
                        {title: '请假', imgPath: qingjiabai},
                    ]
                    break
                default:
                    this.boxData = [
                        {title: '午餐', imgPath: canju},
                        {title: '晚餐', imgPath: wancan},
                        {title: '夜宵', imgPath: yexiao},
                        {title: '卫生间', imgPath: cesuo},
                        {title: '休息', imgPath: xiuxi},
                        {title: '请假', imgPath: qingjia},
                    ]
                    break
            }
        },
        //获取休息记录
        getData(){
            this.$http.post( 'wms/work/task/rest/record/list/clerk', {}).then(res => {
            	 console.log(res)
					if(res.data.ret_code == 0){
						this.timelist = res.data.data
						this.$http.post( 'wms/work/task/show/rest', {}).then(res => {
							console.log(res)
							if(res.data.data.type == 2){
								this.finish = true
								this.id = res.data.data.id
							}
						})
					}
            })
             
        },
       //确认休息
        isRest(i,nowIndex){ 
        	if(i == 0){
        		this.popupVisible = false
        	}else{
        		this.popupVisible = false
        		this.type = nowIndex == 0 ?  "20" : nowIndex == 1 ? "21" :  nowIndex == 2 ? "22" :nowIndex ==3 ? "0" :nowIndex == 4 ? "1" :"4";
        		this.$http.post( 'wms/work/task/apply/rest/operation/clerk',
        			{
	        		    type:this.type,
	        			operationType:1
        			}).then(res => {
        				console.log(res)
        				if(res.data.ret_code == 0){
	        				this.id = res.data.data.id
	        				this.finish=true
		                    //获取休息记录
		                     this.$http.post( 'wms/work/task/rest/record/list/clerk', {}).then(res => {
		                     	console.log(res)
			                 this.timelist=res.data.data		                
	           				 })
	                    }else{
							this.$toast("已经存在未结束的休息。请结束，才能开始新的休息申请!")
							 native.callhandler("showVoice", "已经存在未结束的休息。请结束，才能开始新的休息申请!");
						}
                    }).catch(err=>{
                    	console.log(err)
                    })
        	}
        },
        //结束
        finishFn(){
        	console.log(this.type)
        	this.$http.post( 'wms/work/task/apply/rest/operation/clerk', 
	        	{
	        		id:this.id,
	        	    operationType:2
	        	}).then(res => {
	                console.log(res)
	                //获取休息记录
	                this.$http.post( 'wms/work/task/rest/record/list/clerk', {}).then(res => {
		                  console.log(res)
		                 this.timelist=res.data.data
                    })
                }).catch(err=>{
                    	console.log(err)
                })
                this.finish=false
        }
    },
    filters: {
    //转换时分
      formatDate: function (value) {
      	if(value){
      		let date = new Date(value);
      		let h = date.getHours();
      		h = h < 10 ? ('0' + h) : h;
      		let m = date.getMinutes();
      		m = m < 10 ? ('0' + m) : m;
      		return  h + ':' + m ;     		
      	}
      },
      //毫秒转分钟
      minuteDate: function (value) {
      	if(value){
      		var m = Math.floor(value/60/1000)
      		return   m +"分" ;     		
      	}
      }
    }

};
</script>

<style lang="scss" scoped>
		.common-content-box{
			margin-bottom: 0.48rem;
		}
		.common-content-box div{
		        width: 25%;
		}
		.red{
		    justify-content: center;
		}
		
		.restBox{
		    display: flex;
		    flex-wrap: wrap;
		    justify-content: space-around;
		    align-items: center;
		    height: 1.98rem;
		    padding: 0 .3rem;
		 }
		 .restBox  div{
		    border-radius: .05rem;
		}
        .restBox p{
            display: flex;
            flex-flow: column nowrap;
            justify-content: space-around;
            align-items: center;
            width: .78rem;
            height: .78rem;
            border-radius: .05rem;
        }
        .restBox img{
                width: .36rem;
                height: .36rem;
        }
        .restBox span{
                font-size: .15rem;
        }
        .restBox .green{
            border: 1px solid $green;
        }
        .restBox .orange{
            border: 1px solid $orange;
        }
        .restBox .blue{
            border: 1px solid $blue;
        }
        .restBox .red{
            border: 1px solid $red;
        }
        .restBox .purple{
            border: 1px solid $purple;
        }
        .restBox .sky{
            border: 1px solid $sky;
        }
		.blankSpace{
		   	 width: 100%;
		   	 height: 0.35rem;
		   	 line-height: 0.35rem;
		   	 text-align: center;
		   	 font-size: 0.16rem;
		   	 font-weight: 600;
		   	 background:#F1F1F1 ;
		   }
		.activegreen{
		    background: $green;
		    
		}
		.activegreen span{
		        color: rgba(255,255,255,1);
		    }
		.activeorange{
		    background: $orange;
		}
		.activeorange span{
		        color: rgba(255,255,255,1);
		    }
		.activeblue{
		    background: $blue;   
		}
		.activeblue span{
		        color: rgba(255,255,255,1);
		    }
		.activered{
		    background: $red;  
		}
		 .activered span{
		        color: rgba(255,255,255,1);
		    }
		.activepurple{
		    background: $purple;   
		}
		 .activepurple span{
		        color: rgba(255,255,255,1);
		    }
		.activesky{
		    background: $sky;   
		}
		.activesky span{
		        color: rgba(255,255,255,1);
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
	    	padding: 0.45rem 0.6rem;
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
	    }
	    .mint-popup-text1{
	    	text-align: center;
	    	padding: 0.25rem 0.6rem;
	    	font-size: 0.16rem;
	    	font-weight: 500;
	    	border-bottom: solid 1px #ECECEC;
	    }
	    .mint-popup-text1 p{
	    	font-size: 0.14rem;
	    	margin: 0.06rem 0rem;
	    	text-align: center;
	    }
	    .mint-popup-text1 p:nth-of-type(1){
	    	padding-left: 0.1rem;
	    }
	    .mint-popup-tab1{
	    	background:#E31D2B;
	    	text-align: center;
	    	padding: 0.11rem 0rem;
	    	font-size: 0.16rem;
	    	color: white;
	    	border-radius:0 0 0.05rem 0.05rem;
	    }
	    /*.Payduty{
	    	position: fixed;
	    	bottom: 0;
	    	left:0;
	    	width: 100%;
	    }
	    .Payduty div:nth-of-type(1){    	
	    	font-size: 0.14rem;
	    	text-align: center;
	    	height: 0.44rem;
	    	line-height: 0.44rem;
	    	color:#E31D2B ;
	    	background: #FFECEC;
	    }
	    .Payduty div:nth-of-type(2){    	
	    	font-size: 0.16rem;
	    	text-align: center;
	    	height: 0.48rem;
	    	line-height: 0.48rem;
	    	color:#FFFFFF ;
	    	background: #E31D2B;
	    }*/
	    .finishdiv{
	    	position: fixed;
	    	bottom: 0;
	    	left:0;
	    	width: 100%;
	    	font-size: 0.16rem;
	    	text-align: center;
	    	height: 0.48rem;
	    	line-height: 0.48rem;
	    	color:#FFFFFF ;
	    	background: #E31D2B;
	    }
</style>
