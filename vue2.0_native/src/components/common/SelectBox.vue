<template>
    <div>
        <div class="modal" v-if="mymodal" @click="changeModal"></div>
        <div class="selectBox" @click="openPicker">
            <span class="red currentTag" v-if="value">{{currentTags=='请选择！'?value:currentTags}}</span>
            <span class="red currentTag" v-else>{{currentTags}}</span>
            <img src="@/assets/images/common/selectIcon.png" alt="">
        </div>
        <mt-popup v-model="popupVisible" position="bottom" :modal="modalFlag" class="mint-popup" @touchmove.native.stop.prevent>
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
        },
        changeModal(){
            this.mymodal = false;
            this.popupVisible = false;
        },
        handleConfirm () {
            this.currentTags = '';
            let data = this.$refs.picker.getValues();
            console.log(this.$refs.picker.getValues())
            this.$root.eventHub.$emit("vehtypnams", this.$refs.picker.getValues());
            if(data.length > 1){
                for(let i = 0; i < data.length; i ++){
                    if(i == data.length - 1){
                        this.currentTags += data[i]
                    }else{
                        this.currentTags += data[i] + this.selectDataList[i].content
                    }
                }
            }else{
                this.currentTags = data[0]
            }
             //子传父
           this.$emit("vehtypnams", this.currentTags)
            this.popupVisible = false;
            this.mymodal = false;
        }
    }
};
</script>

<style lang="scss" scoped>

.modal{
    position: fixed;
    z-index: 2000;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0,0,0, .5);
}

.selectBox{
    box-sizing: border-box;
    position: relative;
    width: 100%;
    height: .32rem;
    border: 1px solid rgba(192, 192, 192, 1);
    border-radius:.05rem;
    padding-left:.05rem;
    span{
        display: inline-block;
        height: .32rem;
        line-height: .32rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        padding-right:.14rem;
    }
    img{
        position: absolute;
        top: 0;
        bottom: 0;
        right: .05rem;
        margin: auto;
        width: .11rem;
        height: .06rem;
    }
}
</style>
