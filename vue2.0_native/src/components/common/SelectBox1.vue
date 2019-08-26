<template>
	
    <div class="select">
    	<!--遮罩-->
        <div class="modal" v-if="mymodal" @click="changeModal"></div>
       	<!--下拉-->
        <div class="selectBox" @click="openPicker">
            <span class="red currentTag" v-if="value">{{currentTags=='请选择！'?value:currentTags}}</span>
            <span class="red currentTag" v-else>{{currentTags}}</span>
            <img src="@/assets/images/common/selectIcon.png" alt="">
        </div>
		<!--日期选择-->
        <mt-popup v-model="popupVisible" position="bottom" :modal="modalFlag" class="mint-popup" >
            <mt-picker :slots="selectDataList" :show-toolbar="true" ref="picker">
                <span @click="handleConfirm" class="sure">确认</span>
            </mt-picker>
        </mt-popup>
         
    </div>
</template>

<script>

// eslint-disable-next-line
import { Popup, Picker } from 'mint-ui';

export default {
    name: "selectBox",
    props: { 
        selectDataList: Array,
         value: {
            type: String,
            default:'',
        }
    },
    data(){
        return{
            currentTags:"请选择！",
            popupVisible: false,
            modalFlag: false,
            mymodal: false
        }
    },
    methods: {
        openPicker(){
            this.popupVisible = !this.popupVisible;
            this.mymodal = true;
           let ss = document.getElementsByClassName('mint-loadmore-content')
           if(ss){
                for (let i = 0; i < ss.length; i++) {
                ss[i].style.overflow='hidden' 
                 ss[i].style.position='absolute'
             }
           }
          let foot = document.getElementsByClassName('footer')
            if(foot){
                for (let i = 0; i < foot.length; i++) {
                    foot[i].style.display = 'none' 
                }
            }
        },
        changeModal(){
            this.mymodal = false;
            this.popupVisible = false;
            let ss = document.getElementsByClassName('mint-loadmore-content')
                 if(ss){
                    for (let i = 0; i < ss.length; i++) {
                       ss[i].style.overflow=''
                     }
                 }
            let foot = document.getElementsByClassName('footer')
            if(foot){
                for (let i = 0; i < foot.length; i++) {
                    foot[i].style.display = '' 
                }
            }
            let data = "1"
             this.$emit("vehtypnams", data)
        },
        handleConfirm () {
            this.currentTags = '';
            let data = this.$refs.picker.getValues();
            if(data.length > 1) {
					for(let i = 0; i < data.length; i++) {
						if(i == data.length - 1) {
							this.currentTags += data[i]
						} else {
							this.currentTags += data[i] + this.selectDataList[i].content
						}
					}
				} else {
					this.currentTags = data[0]
                }
                 //子传父
                this.$emit("vehtypnams", this.currentTags)
				this.popupVisible = false;
                this.mymodal = false;
                let ss = document.getElementsByClassName('mint-loadmore-content')
                 if(ss){
                    for (let i = 0; i < ss.length; i++) {
                     ss[i].style.overflow=''
                      
                     }
                 }
                 let foot = document.getElementsByClassName('footer')
                    if(foot){
                        for (let i = 0; i < foot.length; i++) {
                            foot[i].style.display = '' 
                        }
                    }
        }
    }
}
</script>

<style lang="scss" scoped>
	.modal{
	    position: absolute;
	    z-index: 2000;
	    left: 0;
	    top: 0;
	    width: 100vw;
	    top: auto;
	    right: auto;
	    bottom: 0;
	    height: 100vh;
	    background: rgba(0, 0, 0, 0.5);
	}
	.selectBox{
	    box-sizing: border-box;
	    position: relative;
	    top: 0rem;
	    left: 0rem;
	    width: 100%;
	    height: .32rem;
	    border: 1px solid rgba(192, 192, 192, 1);
	    border-radius:.05rem;
	    padding-left:.05rem;
    }
   .selectBox span{
        display: inline-block;
        height: .32rem;
        line-height: .32rem;
        width: 100%;
        padding-left: 0.05rem;
    }
    .selectBox img{
        position: absolute;
        top: 0;
        bottom: 0;
        right: .05rem;
        margin: auto;
        width: .11rem;
        height: .06rem;
    }
     .mint-popup {
     	position: static;
     }
</style>
<style>
 .mint-loadmore-content {
    position: relative;
    top: -0.4rem;
    bottom: 0rem;
    right: 0px;
    left: 0px;
    overflow: auto;
}
.mint-loadmore .mint-loadmore-top {
    position: static;
    top:0;
    margin-top: 0;
    height: .4rem;
    line-height: .4rem;
    z-index: 1;
    font-size: .14rem;
    width: 100%;
}
</style>

