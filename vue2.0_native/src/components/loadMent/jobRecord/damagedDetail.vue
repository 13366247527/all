<template>
   <!--破损明细-->
   <div class="common-page-flex">
    <header-default :title="title"></header-default>
    <div class="tab pageFlex">
      <div class="commonTabDiv pd48">
        <ul class="commonTab common-content-box">
          <li  >
            <span>破损率：</span>
            <span class="red">{{rate}}%</span>
          </li>
           <li >
            <div>
            	<span>排名：</span>
                <span class="red">{{ranking}}</span>
            </div>
          </li>
        </ul>
      </div>

      <ul class="common-content-box">
        <li class="common-content-title" v-show="tempData.length > 0">
          <div>品名规格</div>
          <div>数量</div>
          <div>单价</div>
          <div>金额</div>
        </li>

        <li v-for="(item, index) in tempData" :key="index" class="common-content-item">
           <div>
                	<span class="img">
                		<img :src="item.artUrl" alt=""/>
                	</span>
                	<span class="text">{{item.artName}}</span>
                </div>
          <div>
            <span>{{item.box}}</span>
          </div>
           <div>
            <span>{{item.price}}</span>
          </div>
          <div>
            <span>{{item.totalPrice}}</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
	import HeaderDefault from "@/components/common/HeaderDefault";
	export default{
		name:"damagedDetail",
		data(){
			return {
				  title:"破损明细",
			  	tempData: [],
		      rate: "",//破损率
		      ranking: "",//排名
			}
    },
    mounted(){
        this.getData()
    },
		methods:{
			  getData(){
          localStorage.setItem('key', 4)
          let type =  this.$route.query.type

          if(type == 1){//日破损
           this.$loading.open();
            let params = {
                ids:this.$route.query.monthQuery,
                type:3
				    }
            this.$http.post('wms/damage/record/detail',params).then(res=>{
              console.log(res)
               this.$loading.close();
               if(res.data.ret_code == '0'){
                 this.ranking = res.data.data.ranking
                 this.rate = res.data.data.damageRatio
                 this.tempData = res.data.data.infos
					    }
				    })
          }else if(type == 2){//月破损
          this.$loading.open();
             let params = {
                time:new Date(this.$route.query.monthQuery).getTime(),
                type:1
				    }
            this.$http.post('wms/damage/record/detail',params).then(res=>{
              console.log(res)
               this.$loading.close();
              if(res.data.ret_code == '0'){
                 this.ranking = res.data.data.ranking
                 this.rate = res.data.data.damageRatio
                 this.tempData = res.data.data.infos
					    }
				    })
          }else{
             return
          }
        }
		},
		components:{
			HeaderDefault
		}
	}
</script>

<style lang="scss" scoped>
    .common-content-box {
      display: flex;
      flex-flow: row wrap;
      font-size: 0.16rem;
    }
    .common-content-box .common-content-title {
      background: #eee;
    }
    .common-content-box li div {
      width: 25%;
    }
    .commonTab li {
      padding: 0rem 0rem;
      width:50%;
    }
    .commonTab li span:nth-child(1){
      margin-left:.1rem;
    }
    .commonTab li:nth-of-type(2) div{
      width: 100%;
    }


    .common-content-item{
    	display: flex;
      justify-content: space-around;
      align-items: center;
      font-size: 0.14rem;
      padding:0.05rem  0.09rem;
      border-bottom: solid 1px #D9D9D9;	 	
    }
	  .common-bottom-box  li div{
     	width: 50%;
     	text-align: center;
     }
    .common-content-item div:nth-of-type(1){
    	display: flex;
      flex-wrap: wrap;
      justify-content: center;
      height: auto;
    }
      .img{
      display: block;
      width:0.8rem;
      height:0.45rem;
      background:rgba(224,224,224,1);
      line-height: 0.42rem;
      }
    .common-content-box .common-content-item div:first-of-type img{
        width:0.55rem;
		    height:0.35rem;
    }
    .common-content-box  .text{
    	font-size: 0.12rem;
    	padding-top:0.02rem;
    	width:100%;
     	display: inline-block;
     	word-break: break-all;
     	overflow:hidden;
      text-overflow:ellipsis;
      white-space:nowrap;
    }
</style>