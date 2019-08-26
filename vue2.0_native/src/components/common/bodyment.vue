<template>
    <div class="common-page-flex">
        <header-default :title="title"></header-default>
        <ul class="common-bottom-box">
		             <li class="box-select">
				          <span >姓名：</span>		          
				          <select-box class="wid156"  :selectDataList="nameList"  @vehtypnams="fn" :value="value" ></select-box>  
		            </li>
		             <li class="common-content-title">
		               <div>低血压值</div>
		               <div>高血压值</div>
		               <div>酒精值</div>
		             </li>
		             <li class="common-content-item">
		               <input type="text" v-model="lowBloodPressure" class="orange" autofocus="autofocus"/>
                       <input type="text" v-model="highBloodPressure" class="orange" autofocus="autofocus" />
                       <input type="text" v-model="alcoholNum" class="green" autofocus="autofocus" />
		             </li>
                     <li class="common-content-item  photo">
                        <take-photo
						:title="photoTitle1"
						:poto1="0"
						:flag = true 
                        :status = true
						class="take-photo"
					></take-photo>
                     <take-photo
						:title="photoTitle2"
						:poto1="0"
						:flag = true
                        :status = true
						class="take-photo"
					></take-photo>
                        <div class="stand"><img :src="personUrl"> </div>
                         <take-photo
						:title="photoTitle3"
						:poto1="0"
						:flag = true
                        :status = true
						class="take-photo"
					></take-photo>
                     </li>

		</ul>
         <div class="common-bottom-button bottom-button-fixed" @click="okFn">提交</div>
    </div>
</template>

<script>

import native from '@/native/bridge.js'
import HeaderDefault from "@/components/common/HeaderDefault"
import TakePhoto from '@/components/common/TakePhoto'
import SelectBox from "@/components/common/SelectBox"
export default {
    components: { HeaderDefault,TakePhoto,SelectBox},
    data() {
        return {
            title:"身体检测",
            physicalExamId:'',//体检id
            userId:'',//体检人id
            lowBloodPressure:0,//低血压值
            highBloodPressure:0,//高血压值
            alcoholNum:0,//酒精值
            bloodPressureUrl:'',//血压照片url
            alcoholUrl:'',//酒精照片url
            otherUrl:'',//装容照url。当type=0时，必填
            type:'',//当酒精测试员调用时为1；其他为0；
            photoTitle1:'血压测试照',
            photoTitle2:'酒精测试照',
            photoTitle3:'拍照',
            nameList:[],//下拉数据数组
            list:[],//后台数据
            personUrls:[],//妆容照模本图片路径数组
            namelists:[],//姓名数组
            personUrl:require('@/assets/images/common/standard.jpg'),//妆容照模本图片路径
            value:"",//下拉框默认值
            imgPath:"http://img.logwsd.com/group1/M00/01/39/rBUAEF1TcFqAPnUPAAAEXyS_a5I826.png",//拍照默认照片
        }
    },
    mounted() {
        this.getData()
    },
    methods: {
        fn(n){
            console.log(n)
             for(let i = 0;i<this.namelists.length;i++){
                if(this.namelists[i].indexOf(n) != -1){
                    this.personUrl = this.personUrls[i]
                }                 	
            }
        },
        //获取后台数据
        getData(){
             this.$http.post('wms/sign/detection/detection/list/person',{}).then(res => {
                console.log(res)
                if(res.data.ret_code == "0"){
                    this.list = res.data.data.list
                    let obj =  {
		                flex: 1,
		                values: [],
                        textAlign: 'center',
                    }
                    let arr = []
                    for(let i = 0;i<res.data.data.list.length;i++){
                        arr.push(res.data.data.list[i].userName) 
                        this.personUrls.push(res.data.data.list[i].personUrl)               	
                    }
                     obj.values = arr
                     this.namelists = arr
                     this.value = arr[0]
                     this.personUrl = this.personUrls[0] ? this.personUrls[0] :  this.personUrl
                     this.nameList = [obj]
                }
            })
        },
        //提交
        okFn(){
            //获取图片路径
			let arr = document.getElementsByClassName('imgUrl')
            this.bloodPressureUrl = arr[0].src == this.imgPath ?'':arr[0].src
            this.alcoholUrl=arr[1].src == this.imgPath ?'':arr[1].src
            this.otherUrl= arr[2].src == this.imgPath ?'':arr[2].src
            console.log(this.bloodPressureUrl)
            let username = document.getElementsByClassName('currentTag')[0].innerHTML;
        	for (var i = 0; i <  this.list.length; i++) {
        		 if(this.list[i].userName.indexOf(username) != -1){
                      this.physicalExamId = this.list[i].physicalExamId
                      this.userId = this.list[i].userId
        		 }
        	}
            let param = {
                physicalExamId: this.physicalExamId ,
                userId: this.userId,
                lowBloodPressure:this.lowBloodPressure,
                highBloodPressure:this.highBloodPressure,
                alcoholNum:this.alcoholNum,
                bloodPressureUrl: this.bloodPressureUrl,
                alcoholUrl: this.alcoholUrl,
                otherUrl:this.otherUrl,
                type:0
            }
            console.log(param)
            console.log(username)
            if(username != "请选择！" && this.lowBloodPressure >= 0 && this.highBloodPressure >= 0 && this.alcoholNum >= 0 && this.bloodPressureUrl !="" && this.alcoholUrl != "" && this.otherUrl !=""){
                this.$http.post('wms/sign/detection/detection/submit',param).then(res => {
                    console.log(res)
                    if(res.data.ret_code == "0"){
                        this.$router.replace({
                        path: '/SignIns',
                        })
                    }
                })
            }else{
                this.$toast("身体检测数据不全,请完善！")
                 native.callhandler("showVoice", "身体检测数据不全,请完善！");
            }
       }
    }
}
</script>

<style lang="scss" scoped>
     .common-bottom-box{
     	padding: 0rem 0.16rem;
         overflow-y: scroll;
     }
     .common-bottom-box  li{
     	display: flex;
     	justify-content: space-around;
     	align-items: center;
     	font-size: 0.14rem;
     	padding: 0.15rem 0;
     	border-bottom: solid 1px #D9D9D9;
     } 
     .common-bottom-box .box-select{
      padding:0.10rem  0.09rem;
      display: flex;
      align-items: center;
      justify-content: initial;
    }
     .common-bottom-box  li div{
     	width: 25%;
     	text-align: center;
     }
     .common-bottom-box  li .wid156{
     	 width: 1.5rem;
     }
     .common-bottom-box  li:nth-of-type(1){
        padding-left: 0.25rem;
     }
     .common-bottom-box  li:nth-of-type(1) div{ 
     	text-align: left;
     }
     .common-bottom-box .common-content-title{
     	 background: #F1F1F0;
    	 border: none;
    	 font-weight: 600;
     }
     .common-content-item input{
         width: 0.75rem;
         text-align: center;
         font-size: 0.16rem;
     }
     .stand{
	    height: 1.6rem;
        background:rgba(255,255,255,1);
        border: 1px solid rgba(192, 192, 192, 1);
        border-radius: .05rem;
        overflow: hidden;
         margin: .14rem auto;
        img{
            width: 100%;
            height: 100%;
        }
    }
     .common-bottom-box  li:nth-of-type(4){
         border: none;
     }
    .common-bottom-box  li:nth-of-type(4) div{ 
     	width: 45%;
     }
    .photo{
    	display: flex;
    	flex-wrap: wrap;
        margin-bottom: 0.5rem;
    }
    .take-photo{
    	width: 1.56rem;
	    height: 1.6rem;
	    margin: .14rem auto;
    }
</style>
