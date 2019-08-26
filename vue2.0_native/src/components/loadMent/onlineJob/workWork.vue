<template>
  <div>
  	   <header-default :title="title"></header-default>
      <div class="photo">
	        <template>
					<take-photo
						:title="photoTitle1"
						:poto1="0"
						:flag ="flag"
						:status = true
						class="take-photo"
					></take-photo>
					<take-photo
						:title="photoTitle2"
						:poto1="0"
						:flag ="flag"
						:status = true
						class="take-photo"
					></take-photo><take-photo 
						:title="photoTitle3"
						:poto1="0"
						:flag ="flag"
						:status = true
						class="take-photo"
					></take-photo>
					<take-photo
						:title="photoTitle4"
						:poto1="0"
						:flag ="flag"
						:status = true
						class="take-photo"
					></take-photo>
             </template>
      </div>
      <div>
		   <template>
      	            <take-photo
						:title="photoTitle5"
						:poto1="0"
						:flag ="flag"
						:status = true
						class="take-photo"
					></take-photo>
		    </template>
      </div>
      <div class="common-bottom-button bottom-button-fixed" @click="kryWork">申请下班</div>
  </div>
</template>

<script>
	import HeaderDefault from '@/components/common/HeaderDefault'
	import TakePhoto from '@/components/common/TakePhoto'
	import native from "@/native/bridge.js";
	export default{
		name:"workWork",
		data(){
			return {
				title:"下班卫生",
				flag:true,//图片批量上传
				photoTitle1:"装卸货区拍照",
				photoTitle2:"装卸货区拍照",
				photoTitle3:"装卸货区拍照",
				photoTitle4:"装卸货区拍照",
				photoTitle5:"设备归位拍照",
				arr:[],//后台获取数据
				imgPath:"http://img.logwsd.com/group1/M00/01/39/rBUAEF1TcFqAPnUPAAAEXyS_a5I826.png"
			}
		},
		mounted(){
			this.getData()
		},
		methods:{
			//获取后台数据
			getData(){
				this.$http.get('wms/GoOffWork/getGoOffWorkInspect',{}).then(res=>{
					console.log(res)
					if(res.data.ret_code == 0){
						this.arr = res.data.data
						this.photoTitle1 = res.data.data[0].name
						this.photoTitle2 = res.data.data[1].name
						this.photoTitle3 = res.data.data[2].name
						this.photoTitle4 = res.data.data[3].name
						this.photoTitle5 = res.data.data[4].name
					}
				})
			},
			//申请下班
			kryWork(){
				//获取图片路径
				let img = document.getElementsByClassName('imgUrl')
				    if(img[0].src != this.imgPath && img[1].src!= this.imgPath && img[2].src!= this.imgPath && img[3].src!= this.imgPath && img[4].src!= this.imgPath){
						for (let i = 0; i < this.arr.length; i++) {
							this.arr[i].picPath = img[i].src
							delete 	this.arr[i].picUrl
							delete 	this.arr[i].name					
						}
						//console.log(this.arr)
						let parame = {
							picList:JSON.stringify(this.arr) 
						}
						//console.log(parame)
						this.$http.post('wms/GoOffWork/saveInspectPic',parame).then(res=>{
							console.log(res)
							if(res.data.ret_code == "0"){
								this.$router.push({
									path: "/loadMent/onlineJob",  
								});
							}
						})
					}else{
						 this.$toast("图片路径不全")
                         native.callhandler("showVoice", "图片路径不全");
					}
				}
		},
		components:{
			HeaderDefault,
			TakePhoto
		}
	}
</script>

<style lang="scss" scoped>
	.photo{
    	display: flex;
    	flex-wrap: wrap;
    }
    .take-photo{
    	width: 1.56rem;
	    height: 1.24rem;
	    margin: .14rem auto;
    }
</style>