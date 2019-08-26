<template>
    <div>
        <header-default :title="title"></header-default>
        <div class="common-page-flex">
            <div class="common-line-one-panel">
                <p>
                    <span>名称：</span>
                    <select-box class="wid110" :selectDataList='nameList'></select-box>
                </p>
                <p>
                    <span>数量：</span>
                    <select-box class="wid110" :selectDataList='numList' @vehtypnams="fn"></select-box>
                </p>
                <p>
                    <span>原因：</span>
                    <select-box class="wid110" :selectDataList='causeList' ></select-box>
                </p>
            </div>
            <div class="photo" >
				 <template v-for="v in breakageqty">
					<take-photo
						:title="photoTitle"
						:poto1="0"
						:flag ="flag"
						:status = true
						:key="v"
						class="take-photo"
					></take-photo>
             </template>
            </div>
        </div>
        <div class="common-bottom-button bottom-button-fixed" @click="submit">提交</div>
    </div>
</template>

<script>

import HeaderDefault from '@/components/common/HeaderDefault'
import SelectBox from '@/components/common/SelectBox'
import TakePhoto from '@/components/common/TakePhoto'
import native from "@/native/bridge.js";
export default {
	name:"trayDamage",
    data() {
        return {
            title: '托盘破损',
            photoTitle: '破损拍照',
            nameList: [],//名称集合
            causeList: [],//名称集合
            numList:[],//数量集合
            breakageqty:0,//破损原因集合
            breakofdamage:"",//名称
            breakdamage:"",//破损原因
            damagedpath:"",//图片路径拼接
            getDataArr:[],//后台获取数据
			artnum:"",//托盘编号 
			flag:true,//图片批量上传
			imgPath:"http://img.logwsd.com/group1/M00/01/39/rBUAEF1TcFqAPnUPAAAEXyS_a5I826.png",//拍照默认照片
		}
    },
    components: { HeaderDefault, SelectBox, TakePhoto },
    mounted() {
        this.getData();
    },
    methods: {
        //记录数量
    	fn(n){   
    	   this.breakageqty = n
    	},
        getData(){
        	this.$http.get('wms/bedavmaged/tray/queryBedavmagedList',{}).then(res =>{
               console.log(res)
               if (res.data.ret_code == 0) {
	               this.getDataArr = res.data.data.whArticlesList
	               let obj =  {
		                flex: 1,
		                values: [],
		                textAlign: 'center',
		            }
	                let obj1 =  {
	                    flex: 1,
	                    values: [],
	                    textAlign: 'center',
	                }
	                let obj2 =  {
	                    flex: 1,
	                    values: [],
	                    textAlign: 'center',
	                }
	                let arr = []
	                let arr1 = []
	                let arr2 = []
	                for(let i = 0;i<res.data.data.whArticlesList.length;i++){
		                arr.push(res.data.data.whArticlesList[i].artshonam)               	
	                }
	                for(let i = 0;i<res.data.data.whPalletValueList.length;i++){
		                arr1.push(res.data.data.whPalletValueList[i].velseq)               	
	                }
	                for(let i = 0;i<res.data.data.whCauseOfDamageList.length;i++){
		                arr2.push(res.data.data.whCauseOfDamageList[i].valdescl)               	
	                }
	                obj.values = arr
	                obj1.values = arr1
	                obj2.values = arr2
	                this.nameList = [obj]
	                this.numList = [obj1]
	                this.causeList = [obj2]
               }
            }).catch(err=>{
            	console.log(err)
            })
        },
        //提交
        submit(){
        	this.breakofdamage = document.getElementsByClassName('currentTag')[0].innerHTML;
        	for (var i = 0; i <  this.getDataArr.length; i++) {
        		 if(this.getDataArr[i].artshonam.indexOf(this.breakofdamage) != -1){
        		 	 this.artnum = this.getDataArr[i].artnum
        		 }
        	}
        	if( document.getElementsByClassName('currentTag')[1].innerHTML != '请选择' ){
        		this.breakageqty = parseInt(document.getElementsByClassName('currentTag')[1].innerHTML);         		
        	}else{
        		this.breakageqty = 0;        		
        	}
			this.breakdamage = document.getElementsByClassName('currentTag')[2].innerHTML;   
			//获取图片路径并用逗号拼接
			let arr = document.getElementsByClassName('imgUrl')
			for (let i = 0; i < arr.length; i++) {
			  if(i == arr.length-1 ) {
				   this.damagedpath += arr[i].src == this.imgPath ?'':arr[i].src
			  }else{
				    this.damagedpath += arr[i].src == this.imgPath ?'':arr[i].src +","
			  }
			} 	 
	        if(this.breakofdamage != '请选择！' && this.breakageqty != 0 && this.breakdamage !='请选择！' && this.damagedpath != ''){
	        	let params =  {
	        	    	breakofdamage:this.breakofdamage,
	        	    	breakdamage:this.breakdamage,
	        	    	breakageqty:this.breakageqty,
	        	    	damagedpath:this.damagedpath,
	        	    	artnum:this.artnum
	        	    }
	        		console.log(params)	        	
	        		this.$http.post('wms/bedavmaged/tray/insertWhBreakage',params).then(res => {
	        	        console.log(res) 
	        	         if (res.data.ret_code == 0) {
	        	         	this.$router.replace({
				        		 path: "/loadMent/onlineJob",
				        	})
	        	         }
	        	    }).catch(err=>{
	        	    	console.log(err)
	        	    })
	        }else{
				this.$toast("托盘破损信息不全")
				native.callhandler("showVoice", "托盘破损信息不全");
	        }
        }
    }
};
</script>

<style lang="scss" scoped>
	.common-page-flex{
		margin-bottom: 0.5rem;
	}
	.common-line-one-panel{
		display: flex;
		flex-wrap: wrap;
	}
	.wid110{
	    width: 2.8rem;
	}
	.wid111{
	    width:1.4rem;
	}
    .photo{
    	display: flex;
    	justify-content: space-between;
    	flex-wrap:wrap;	
    }
    .photo:after {
         content:"";
		 display:block;
         width: 1.56rem;
	     margin: 0rem auto;
     }
    .take-photo{
    	width: 1.56rem;
	    height: 1.24rem;
	    margin: .14rem auto;
    }
</style>
