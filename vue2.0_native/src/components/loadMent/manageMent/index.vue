<template>
	<div>
	   <header-default :title="title"></header-default>
	   <div class="tabbarContainer">
	   	 <div class="tabbarBox">
          <span v-for="(item, index) in tabbarList" :key="index" class="tab" :class="nowIndex == index?'activeTab' : ''" @click="LMtabClick(index)">{{item}}</span>
         </div>
	   </div>
	   <blank-space></blank-space>
       <swiper-tabBox></swiper-tabBox>
	</div>
</template>

<script>
	import HeaderDefault from "@/components/common/HeaderDefault"
    import BlankSpace from "@/components/common/BlankSpace"
    import SwiperTabBox from "./children/swiperTabBox"
	export default{
		name:"manageMent",
		data(){
			return{
				itemLists:[],
				title:"冰库出箱",
				tabbarList:["冰库出箱","市场物资","纸箱领用"],
				nowIndex:0
			}
		},
		mounted() {
		    this.title = this.tabbarList[0];
		    this.$root.eventHub.$on("Fcslidetab", this.Fcslidetab);
		    this.$nextTick(() => { 
		        this.initPage()
		    })
		},
		methods: {
		    initPage(){
		        this.nowIndex = this.$route.path === "/loadMent/manageMent/outbound" ? 0  : this.$route.path === "/loadMent/manageMent/marketSupplies" ? 1 : this.$route.path === "/loadMent/manageMent/cartonRecipients" ? 2 : 0;
		    },
		    LMtabClick(index) { 
		    	this.title = this.tabbarList[index];
		        this.$root.eventHub.$emit('FcchangeTab', index)
		    },
		    Fcslidetab(index) { 
		        this.nowIndex = index
		        this.title = this.tabbarList[index];
		        let href = index == 0 ?  '/loadMent/manageMent/outbound' : index === 1 ? '/loadMent/manageMent/marketSupplies' :  '/loadMent/manageMent/cartonRecipients' 
		        this.$router.replace(href)
		    }
        },
		components:{
			HeaderDefault,
			SwiperTabBox,
			BlankSpace
		}
	}
</script>

<style lang="scss" scoped>
	.tabbarContainer{
      @include tabbar(3.43rem, 1.15rem)
    }
</style>