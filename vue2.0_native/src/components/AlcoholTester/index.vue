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
		name:"AlcoholTester",
		data(){
			return{
				itemLists:[],
				title:"血压酒精测试员",
				tabbarList:["员工","司机"],
				nowIndex:0
			}
		},
		mounted() {
		    this.$root.eventHub.$on("JjslideTab", this.JjslideTab);
		    this.$nextTick(() => { 
		        this.initPage()
		    })
		},
		methods: {
		    initPage(){
		    	 this.nowIndex = this.$route.path === '/AlcoholTester/employee' ? 0  : this.$route.path === '/AlcoholTester/motorman' ? 1 : 0;
		    },
		    LMtabClick(index) { 
		    	       
		        this.$root.eventHub.$emit('JjchangeTab', index)
		    },
		    JjslideTab(index) { 
		        this.nowIndex = index
		        let href = index == 0 ?  '/AlcoholTester/employee' : '/AlcoholTester/motorman'
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
    .tabbarContainer .tabbarBox{
			width: 2.8rem;
		}
    .tabbarContainer .tabbarBox .tab{
    	width: 50%;
    }
</style>