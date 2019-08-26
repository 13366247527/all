<template>
  <div>
     <header-default :title="title"></header-default>
     <div class="common-content-fiex">
     	<div class="common-content-title">
     		<div class="img">
     			<img :src="imgUrl" alt=""/>
     		</div>
     		<div class="text">
     			码货标准照片
     		</div>
     	</div>
     	<ul class="common-content-box">
            <li >
                <div><span class="red">七</span>层</div>
                <div><span class="red">72</span>箱/托</div> 
            </li>
            <li >
                <div>第一层：<span class="red">横6竖4</span></div>
                <div>第二层：<span class="red">横6竖4</span></div>
            </li>
            <li >
                <div>第三层：<span class="red">横6竖4</span></div>
                <div>第四层：<span class="red">横6竖4</span></div>
            </li>
             <li >
                <div>第五层：<span class="red">横6竖4</span></div>
                <div>第六层：<span class="red">横6竖4</span></div>
             </li>
           
        </ul>
     </div>
  </div>
</template>

<script>
	import HeaderDefault from "@/components/common/HeaderDefault"
	export default{
		name:"goodsStandard",
		data(){
			return {
				title:"码货标准",
				imgUrl:""
			}
		},
		created(){
			this.getData()
		},
		methods:{
			getData(){
				this.imgUrl = this.$route.query.imgUrl
			}
		},
		components:{
			HeaderDefault
		}
	}
</script>

<style lang="scss" scoped>
	.common-content-fiex{
		padding:0.06rem 0.16rem ;
	}
	.common-content-title{
		text-align: center;
	}
	.common-content-title img{
		width: 100%;
		border-radius: 0.05rem 0.05rem 0 0;
	}
	.common-content-title .text{
		font-size: 0.14rem;
		padding: 0.03rem 0;
		border: solid 1px #C0C0C0;
		border-radius:0 0 0.05rem 0.05rem;
	}
	.common-content-box li div{
		width: 50%;
	}
	.common-content-box li span{
		margin-right: 0.03rem;
	}
</style>