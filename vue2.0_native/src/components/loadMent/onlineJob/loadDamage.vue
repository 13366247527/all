<template>
    <div class="common-page-flex">
        <header-default :title="title"></header-default>
        <ul class="common-content-box">
            <li class="common-content-title">
                <div @click="allSelected">
                    <template v-if="isCheckedAll">
                        <img src="@/assets/images/common/checked.png" alt="">
                    </template>
                    <template v-else>
                        <img src="@/assets/images/common/check.png" alt="">
                    </template>
                </div>
                <div>品名</div>
                <div>瓶数</div>
                <div>包装</div>
                <div>拍照</div>
            </li>
            <li v-for="(item, index) in tempData" :key="index" class="common-content-item" >
                <div @click="changeOrderSelectStatus(index)">
                    <template v-if="orderListsStatus.indexOf(index)>=0">
                        <img src="@/assets/images/common/checked.png" alt="">
                    </template>
                    <template v-else>
                        <img src="@/assets/images/common/check.png" alt="">
                    </template>
                </div>
                <div >
                	<span class="img">
                		<img :src="item.img" alt=""/>
                	</span>
                	<span class="text">{{item.artShoNam}}</span>
                </div>
                <div>
                    <input type="text"  autofocus="autofocus" ref="input1" >
                </div>
                <div>
                    <input type="text"  autofocus="autofocus" ref="input2" >
                </div>
                <div class="driverPhoto">
                    <p class="takephoto" @click="takePhoto(index)">
                        <img :src="imgPath">
                    </p>
                </div>
            </li>
        </ul>
        <div class="common-bottom-button bottom-button-fixed">
            <span class="orangeBtn" @click="orangeFn">筛选</span>
            <span @click="submit">提交</span>
        </div>
    </div>
</template>

<script>

import HeaderDefault from "@/components/common/HeaderDefault"
import native from "@/native/bridge.js";
export default {
    components: {HeaderDefault},
    data() {
        return {
            title: '装卸破损',
            orderListsStatus: [],
            isCheckedAll: false,
            isShow:true,
            tempData: [],
            resData:[],//后台数据 ,
            sxListsStatus:[],//筛选后的下标数组
            shipmentNum:"",//装运单编码
            imgPath: require("@/assets/images/common/takePhoto.png"),
            imgUrl:[],//拍照图片数组
            takePhotoFlag:true,
        }
    },
    created(){
    	this.getData()	
    },
    mounted() {
		//解决页面加载显示最上方数据		      
        
    },
    methods: {
       //拍照
		takePhoto(index){
            if(this.orderListsStatus.length == 0 && this.sxListsStatus.length == 0 ){
                this.$toast("请选择破损商品,并进行筛选操作")
                native.callhandler("showVoice", "请选择破损商品,并进行筛选操作");
            }else{
                if(this.imgUrl[index]){
                    this.$toast("图片已存在")
                     native.callhandler("showVoice", "图片已存在");
				}else{
					if(this.takePhotoFlag){
						native.callhandler('takePhot', '', data => {
							if (eval("(" + data + ")").ret_code == "0") {
								let dataUrl = eval("(" + data + ")").data.url;
								this.imgUrl[index] = dataUrl
							}else{
								console.log(eval("(" + data + ")"));
								window.instance ? window.instance.close() : "";
								window.instance = this.$toast(eval("(" + data + ")").msg);
							}
						})
					  }
				}
            }
					
		},
    	//复选框
        changeOrderSelectStatus: function (index) {
            let idIndex = this.orderListsStatus.indexOf(index)
            if (idIndex >= 0) {
                this.orderListsStatus.splice(idIndex, 1)
                this.isCheckedAll = false
            } else {
                this.orderListsStatus.push(index);
            }
        },
        //全选
        allSelected: function () {
            this.isCheckedAll = !this.isCheckedAll;
            this.orderListsStatus = []
            if (this.isCheckedAll && this.tempData.length != 0) {               
                this.tempData.forEach((item, index) => {
                      this.orderListsStatus.push(index)
                })
            }
        },
        //筛选
        orangeFn(){
        	if(this.orderListsStatus.length > 0){
	        	//console.log(this.$refs.input1[0].value)
	        	this.tempData = []
	        	this.resData.forEach((item, index) => {
	        		 if(this.orderListsStatus.indexOf(index) != -1){
	                   	   this.tempData.push(item)
	                 }
	            })
               // console.log(this.tempData)
                for (var i = 0; i < this.tempData.length; i++) {
                    this.imgUrl.push('')  
                }
	           // console.log(this.$refs.input1)
	        	this.orderListsStatus.forEach((item, index) => {
                    this.sxListsStatus.push(index)
                })
	        	this.orderListsStatus = []
	        	for (var i = 0; i < this.tempData.length; i++) {
	        		this.orderListsStatus.push(i)
	        	}
        	}else{
                this.$toast("请选择破损商品")
                native.callhandler("showVoice", "请选择破损商品");
        	}
        },
        //提交
        submit(){
        	if(this.orderListsStatus.length > 0 && this.sxListsStatus.length > 0){      		
	        	for (var i = 0; i < this.tempData.length; i++) {
	        		if(this.$refs.input1[i].value =="0"){
	        			//console.log(this.$refs.input1[i].value)
                        this.$toast("瓶数不能为零")
                        native.callhandler("showVoice", "瓶数不能为零");
	        			return
	        		}else if(this.$refs.input1[i].value==""){
                        this.$toast("瓶数不能为空")
                        native.callhandler("showVoice", "瓶数不能为空");
	        			return
	        		}else if(this.$refs.input2[i].value==""){
                        this.$toast("包装数不能为空")
                        native.callhandler("showVoice", "包装数不能为空");
	        			return
	        		}else if(!this.imgUrl[i]){
                        this.$toast("破损照片不存在,请拍照！")
                        native.callhandler("showVoice", "破损照片不存在,请拍照！");
	        			return
	        		}else{	        			
	        			this.tempData[i].breakageQty = parseInt(this.$refs.input1[i].value)	        		
	        			this.tempData[i].breakPackageNum = parseInt(this.$refs.input2[i].value)
	        			this.tempData[i].pId =  this.shipmentNum
	        			this.tempData[i].damagedPath = this.imgUrl[i]
	        			delete this.tempData[i].picPathBox
	        			delete this.tempData[i].artShoNam
	        		}	        		
	        	}
	           //	console.log( this.tempData)
			    let params = JSON.stringify(this.tempData) 
			    const data = {
			    	'array': params
			    }
			    console.log(params)
                this.$http.post("wms/bedavmaged/tray/insertAllWhBreakage",data).then(res=>{
					  console.log(res)					  
					 if (res.data.ret_code == 0) {
						 this.$router.push({
						  	path: "/loadMent/onlineJob"
						  })
					 }
				}).catch(err=>{ 
						console.log(err)
				})
        	}else if(this.orderListsStatus.length == 0 && this.sxListsStatus.length == 0){
                this.$toast("请选择破损商品,并进行筛选操作")
                native.callhandler("showVoice", "请选择破损商品,并进行筛选操作");
        	}else if(this.orderListsStatus.length >  0 && this.sxListsStatus.length == 0){
                this.$toast("请进行筛选操作")
                native.callhandler("showVoice", "请进行筛选操作");
            }else if(this.orderListsStatus.length ==  0 && this.sxListsStatus.length > 0){
                this.$toast("请选择破损商品")
                native.callhandler("showVoice", "请选择破损商品");
        	}else {
        		return
        	}      	
        },
        getData(){
               this.$loading.open();
        	    //装运单编码
        	    this.shipmentNum = this.$route.query.shipmentNum 
        	    console.log(this.shipmentNum)
        	   this.$http.post("wms/bedavmaged/tray/queryOutboundList",
					{
						traDocNum:this.shipmentNum
					}).then(res=>{
                      console.log(res)
                      this.$loading.close();
					 if(res.data.ret_code == 0){
					 	 this.tempData = res.data.data
                         this.resData = res.data.data
                     }
					}).catch(err=>{ 
						console.log(err)
				})      	       
        }        
    }
};
</script>

<style lang="scss" scoped>
	.common-content-box{
	     padding-bottom: .5rem;
	}
	.common-content-box li {
	    display: flex; 
	    flex-flow: row nowrap;
	    align-items: center;
	    width: 100%;
	    border-bottom: 1px solid #ececec;
    }
    .common-content-box li div{
        width: 22%;
        height: auto;
    }    
    .take-photo{
            display: inline-block;
            width: .52rem;
            height: .32rem;
            background: rgba(249,249,249,1) url(../../../assets/images/common/takePhoto.png) no-repeat center;
            background-size: .24rem .2rem;
            border:1px solid rgba(192, 192, 192, 1);
            border-radius: .05rem;
    }
    input{
        width: .52rem;
        text-align: center;
        color: #E31D2B;
        padding-left: 0rem;
    }
    .common-content-title{
    	padding: 0.16rem 0;
    	font-weight: 600;
    } 
    .common-content-item{
    	padding: 0.05rem 0;
    }
    .common-content-item div:nth-of-type(2){
    	flex-wrap: wrap;
    }
    .img{
    	display: block;
    	width:2rem;
		height:0.45rem;
		background:rgba(224,224,224,1);
		line-height: 0.42rem;
    }
    .img img{
    	width:0.55rem;
		height:0.35rem;
    }
    .driverPhoto .takephoto img{
		 width: 40%;
	 }
    .common-content-box  .text{
    	font-size: 0.12rem;
    	padding-top:0.02rem;
    	width:100%;
     	display: inline-block;
     	word-break: break-all;
     	/*overflow:hidden;
		text-overflow:ellipsis;
		white-space:nowrap;*/
    }
</style>
