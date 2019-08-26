
<template>
	<!--吸烟违规-->
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
		name:"photoDetail",
		data(){
			return {
				title:"吸烟违规",
				imgUrl:""
			}
		},
		methods:{
			
		},
		created(){
			 this.imgUrl = this.$route.query.img
			 localStorage.setItem('key', 5)
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