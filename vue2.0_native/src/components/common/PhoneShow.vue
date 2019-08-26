
<template>
	<!--照片查看-->
   <div class="common-page-flex">
      <header-default :title="title"></header-default>
	    <div class="tab pageFlex">
	       <img :src="imgUrl" alt=""/>
	    </div>
  </div>
</template>

<script>
	import HeaderDefault from "@/components/common/HeaderDefault";
	export default{
		name:"PhoneShow",
		data(){
			return {
				title:"照片查看",
                imgUrl:""
			}
		},
		created(){
             this.imgUrl = this.$route.query.img
		},
		components:{
			HeaderDefault
		}
	}
</script>

<style lang="scss" scoped>
	.pageFlex{
		width: 100%;
		height: 6.17rem;
	}
	.pageFlex img{
		width: 100%;
		height: 100%;
		display: block;
	}
</style>