<template>
     <div class="common-page-flex">
          <ul class="common-bottom-box">
            <li class="box-select">
		            	<span>年份查询：</span>
		          	    <select-box1 class="wid156"  :selectDataList="equirymonthList" @vehtypnams="okFn" :value="value"></select-box1>
            </li>
            <li class="common-content-title">
               <div>月份</div>
               <div>生产停机</div>
               <div>仓库停机</div>
             </li>
             <li v-for="(item,index) in tempData" :key="index" class="common-content-item">
               <div>{{item.time}}</div>
               <div>{{item.shTime | minuteDate}}</div>
               <div>{{item.ptTime | minuteDate}}</div>
             </li>
          </ul>
     </div>
</template>

<script>
import SelectBox1 from "@/components/common/SelectBox1"
	export default{
		name:"year",
		components:{
			SelectBox1
		},
		data(){
			return {
        tempData:[],
        value:"",//默认值
        equirymonthList:[
				     {
				     	flex: 1,
	            values: ['2012','2013','2014','2015','2016','2017','2018','2019','2020','2021','2022','2023','2024','2025','2026','2027','2028','2029','2030','2031','2032','2033','2034','2035'],
              defaultIndex:0,
              textAlign: 'center',
	            className: 'slot1',
	            content:""
				    }
			   ]
			}
    },
    mounted(){
        let data = new Date()
				let y =parseInt(data.getFullYear())
				if(y >= 2019){
					this.equirymonthList[0].defaultIndex = 7 +(y-2019)
				}
      this.getData()
    },
		methods:{
        //默认值
        getData(){
          this.$loading.open();
            let data = new Date()
            this.value = data.getFullYear()+""
            let params = {
              time:new Date(this.value).getTime(),
              type:2 //1：日统计；2：月统计
            }
            this.$http.post('wms/producer/anomaly/record',params).then(res=>{
              console.log(res)
              this.$loading.close();
              if(res.data.ret_code == '0'){
                this.tempData = res.data.data
              }
            })
        },
        //下拉确定事件
        okFn(data){
          this.$loading.open();
          let params = {
            time:new Date(data).getTime(),
            type: 2 //1：日统计；2：月统计
          }
          console.log(params)
          this.$http.post('wms/producer/anomaly/record',params).then(res=>{
            console.log(res)
            this.$loading.close();
            if(res.data.ret_code == '0'){
              this.tempData = res.data.data
            }
          })
        }
    },
    filters: {
          //毫秒转分钟
          minuteDate: function (value){
            if(value){
              var m = (value/60/1000).toFixed(1)
              return   m +"分" ;     		
            }
          }
    }
}
</script>

<style lang="scss" scoped>
    .common-bottom-box{
     	padding: 0rem 0.16rem;
     }
     .common-bottom-box  li{
     	display: flex;
     	font-size: 0.15rem;
     	padding: 0.15rem 0;
      align-items: center;
     } 
     .common-bottom-box .box-select{
      padding:0.10rem  0.09rem;
      display: flex;
      align-items: center;
      justify-content: initial;
    }
     .common-bottom-box  li .wid156{
     	 width: 1rem;
     }
     .common-bottom-box  .box-select div{ 
     	text-align: left;
     }
     .common-content-title{
     	font-weight: 600;
     	justify-content: space-around;
     	background: #F1F1F0;
     }
     .common-bottom-box  .common-content-item{
     	justify-content: space-around;
     	border-bottom: solid 1px #D9D9D9;
     }
    .common-bottom-box  li div{
     	width: 25%;
     	text-align: center;
     }
</style>