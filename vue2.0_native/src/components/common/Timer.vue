<template>
    <div class="timerbox">
        <div class="timer">
            <p class="title">
                <span class="operate">开始</span>
                <span class="time">12:00</span>
                <img src="@/assets/images/common/timer.png" alt="">
                <span class="time">12:00</span>
                <span class="operate">结束</span>
            </p>
            <p class="red">60分钟</p>
            <p class="button">开始/结束</p>
        </div>
    </div>
</template>

<script>
export default {
  name: "timer",
  data(){
        return{
            
        }
  },
  methods: {
      
  }
};
</script>

<style lang="scss" scoped>
.timerbox {
    padding: 0 .16rem;
    .timer{
        height: 1.29rem;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        border-top: 1px solid rgba(236,236,236,1);
        border-bottom: 1px solid rgba(236,236,236,1);
        .title{
            width: 80%;
            display: flex;
            align-items: center;
            justify-content: space-around;
            font-size: .15rem;
            color:rgba(51,51,51,1);
            .operate{
                width: .2rem;
                writing-mode: vertical-lr;
                @include normal-font();
            }
            .time{
                font-family:PingFangSC-Semibold;
                font-weight:600;
            }
            img{
                width: .26rem;
                height: .26rem;
            }
        }
        .red{
            width: 100%;
            text-align: center;
            font-size: .15rem;
        }
        .button{
            width: 1.77rem;
            height: .32rem;
            line-height: .32rem;
            text-align: center;
            background: $red;
            border: 1px solid $red;
            border-radius: .05rem;
            font-size: .15rem;
            color:rgba(255,255,255,1);
        }
    }
}
</style>
