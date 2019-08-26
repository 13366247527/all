<template>
    <div class="common-page-flex">
        <header-default :title="title"></header-default>
        <div class="common-line-one-panel">
            <p>
                <span>请假类别：</span>
                <span v-for="(item, index) in catlog" :key="index" class="peddingBtn" :class="catlogIndex == index ? 'active' : ''" @click="selectCat(item,index)">
                    {{item}}
                </span>
            </p>
        </div>
        <textarea name="driverEvalute" class="driverEvalute" v-model="evaluation" placeholder="请假说明:"></textarea>
        <div class="common-line-one-panel">
            <p>
                <span>当月请假时间：</span>
                <span class="red">{{Mday}}天</span>
            </p>
        </div>
        <div class="common-line-one-panel">
            <p>
                <span>开始时间：</span>
                <select-box class="wid156" :selectDataList="leavedatalist" @vehtypnams="fn1"></select-box>      
            </p>
        </div>
        <div class="common-line-one-panel">
            <p>
                <span>结束时间：</span>
                 <select-box class="wid156" :selectDataList="leavedatalist" @vehtypnams="fn2"></select-box>              
            </p>
        </div>
        <div class="common-line-one-panel">
            <p>
                <span>请假天数：</span>
                <span class="selectBox1 wid156">{{day1}}</span>
            </p>
        </div>
        <div class="common-bottom-button bottom-button-fixed" @click="paytheDuty">申请/交岗</div>
    </div>
</template>

<script>

import HeaderDefault from "@/components/common/HeaderDefault"
import SelectBox from "@/components/common/SelectBox"
import { DatetimePicker,Toast,Popup,Picker  } from 'mint-ui';
export default {
    components: { HeaderDefault, SelectBox},
    data() {
        return {
            title: '请假',
            catlog: ['事假', '病假'],
            catlogIndex: 0,//tab下标
            catlogType:'事假',//请假类型
            evaluation:'',//请假说明
			leavedatalist:[
                   {
            		flex: 1,
                    values: ["01","02","03","04","05","06","07",'08','09','10','11','12'],
                    textAlign: 'center',
                    content: '',
                   },
                   {
            		flex: 1,
                    values: ['月'],
                    textAlign: 'center',
                    content: '',
                   },
                   {
            		flex: 1,
                    values: ["01","02","03","04","05","06","07",'08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','18','29','30','31'],
                    textAlign: 'center',
                    content: '',
                   },
                   {
            		flex: 1,
                    values: ['日'],
                    textAlign: 'center',
                    content: '',
                   },
                   {
            		flex: 1,
                    values: ['00',"01","02","03","04","05","06","07",'08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23'],
                    textAlign: 'center',
                    content: '',
                   },
                   {
            		flex: 1,
                    values: ['时'],
                    textAlign: 'center',
                    content: '',
                   }
                ],
            Mday:4,//月请假天数
            day:0,//请假天数
            startData:"",//开始时间
            endData:"",//结束时间
        }
    },
    created(){
    },
    mounted() {
       
    },
    methods: {
        //监听下拉框
        getValues(arr){
             console.log(arr)
        },
    	//tab切换事件
        selectCat(item,index){
            this.catlogIndex = index;
            this.catlogType = item;
        },
        //开始时间
        fn1(m){   
           m = m.replace("月","-") 
           m = m.replace("日"," ")
           m = m.replace("时",":")
           this.startData = m +"00"      
        },
        //结束时间
        fn2(n){   
           n = n.replace("月","-") 
           n = n.replace("日"," ")
           n = n.replace("时",":") 	
           this.endData = n +"00"          	         
        },
      //申请交给
      paytheDuty(){
      	  let params = {
      	  	  catlogType:this.catlogType,
      	  	  evaluation:this.evaluation,
      	  	  Mday:this.Mday,
      	  	  startData:this.startData,
      	  	  endData:this.endData,
      	  	  day:this.day
            }
      	  console.log(params)
      }
    },
    computed: {
      day1:function(){     	    
      	   if(this.startData == "" || this.endData == "" ){
      	   	  return "0天" 
      	   }else{
      	   	    var date1 = new Date(this.startData)
			    var date2 = new Date(this.endData)
			    var s1 = date1.getTime(),
			    s2 = date2.getTime();
			    var total = (s2 - s1)/1000;
			    //计算整数天数
			    if(parseInt(total / (24*60*60)) < 0){
                    this.$toast("开始时间必须小于结束时间")
                    native.callhandler("showVoice", "开始时间必须小于结束时间");
			    }else{	
			    	this.day = parseInt(total / (24*60*60))
			    	return parseInt(total / (24*60*60))+"天" 
			   } 
      	   }
      }
   }
};
</script>

<style lang="scss" scoped>

.wid156{
    width: 1.56rem;   
}
.pickerPop{
        box-sizing: border-box;
		width: 1.56rem;
		height: .32rem;
		border: 1px solid rgba(192, 192, 192, 1);
		border-radius: .05rem;
		padding-left: .05rem;
}
.common-line-one-panel  .peddingBtn{
        @include peddingBtn(.67rem);
        background:rgba(249,249,249,1);
        border:1px solid rgba(192, 192, 192, 1);
        color:rgba(51,51,51,1);
        margin-right: .16rem;
    }
 .common-line-one-panel  .active{
        @include peddingBtn(.67rem);
    }
 .common-line-one-panel .red{
 	  color: #E31D2B;
 }

.driverLine {
    display: flex;
    align-items: center;
    padding: 0 .26rem;
    height: .53rem;
    font-size: .15rem;
    @include slim-font();
    color: rgba(51, 51, 51, 1);
}

.driverEvalute {
    box-sizing: border-box;
    display: block;
    width: 3.41rem;
    height: 2.34rem;
    padding: .05rem;
    margin: .05rem auto;
    background: rgba(240, 240, 240, 1);
    border: 1px solid rgba(192, 192, 192, 1);
    border-radius: .05rem;
    font-size: .15rem;
    @include slim-font();
    color: rgba(51,51,51,1);
}
.selectBox1{
    box-sizing: border-box;
    position: relative;
    width: 1.56rem;
    height: .32rem;
    line-height: .32rem;
    border: 1px solid silver;
    border-radius: .05rem;
    padding-left: .15rem;
     color: #E31D2B;
}
</style>

