<template>
  <div>
    <header-default :title="title"></header-default>
    <div class="signContract">signTxt.signContract</div>
    <take-photo :title="signTitle" ref="takephoto" class="sign"></take-photo>
    <div class="veriBox">
      <div class="verification">
        <span>验证码：</span>
        <input type="text" class="input-panel" />
        <span class="veriBtn">验证码</span>
      </div>
    </div>
    <div class="common-bottom-button bottom-button-fixed">确认</div>
  </div>
</template>

<script>

import HeaderDefault from '@/components/common/HeaderDefault'
import TakePhoto from '@/components/common/TakePhoto.vue'

export default {
  props: ['signTxt'],
  components: { TakePhoto, HeaderDefault },
  data(){
    return{
      title: '客户签收',
      signTitle: '点击进行指纹识别'
    }
  },
  methods: {
    
  }
};
</script>

<style lang="scss" scoped>
.signContract {
    width: 3rem;
    padding: .15rem 0 0;
    margin: 0 auto;
    font-size: .15rem;
    line-height: 1.5em;
    text-indent: 2em;
    @include normal-font();
    color: rgba(51, 51, 51, 1);
}
.sign{
  width: 2.08rem;
  height: 1.33rem;
  margin: .1rem auto;
}
.veriBox{
  padding: 0 .16rem;
}
.verification{
  display: flex;
  align-items: center;
  height: .46rem;
  font-size: .15rem;
  padding-left: .1rem;
  border-top: 1px solid rgba(236,236,236,1);
  @include slim-font();
  .input-panel{
    @include input-panel(1.98rem)
  }
  .veriBtn{
    margin-left: .05rem;
    width: .62rem;
    height: .32rem;
    line-height: .32rem;
    text-align: center;
    background: $red;
    border-radius: .05rem;
    font-size: .15rem;
    @include normal-font();
    color:rgba(255,255,255,1);
  }
}
</style>
