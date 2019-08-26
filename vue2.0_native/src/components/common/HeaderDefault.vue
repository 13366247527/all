<template>
  <div :class="headerFixed?'header-default-fixed':'header-default'">
    <div class="header-default-box">
      <div class="header-default-back" @click="back">
            <img src="@/assets/images/common/fanhui.png">
            <span>返回</span>
      </div>
      <span class="header-default-txt">{{title}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "headerDefault",
  inject:['reload'],
  props: {
    title: {
      type: String,
      required: true
    },
    backBtnPath: String,
    headerFixed: Boolean
  },
  methods: {
//     text(){
//        this.reload();
//     },
    back() {
        this.$router.go(-1);
    }
  }
};
</script>

<style lang="scss" scoped>
.header-default {
  height: .5rem;
  line-height: .5rem;
  background: $red;
}
.header-default-box {
  width: 100vw;
  height: .5rem;
  line-height: .5rem;
  position: fixed;
  margin: 0 auto;
  box-sizing: border-box;
  z-index: 997;
  background: $red;
  text-align: center;
}

.header-default-txt {
  font-size:.18rem;
    font-family:PingFangSC-Medium;
    color:rgba(255,255,255,1);
}

.header-default-back {
  position: absolute;
  left: 0.17rem;
  height: 100%;
  display: flex;
  align-items: center;
  img {
    display: block;
    height: 0.21rem;
    width: 0.12rem;
    margin: 0;
  }
  span{
    font-size:.15rem;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(255,255,255,1);
    margin-left: .05rem;
  }
}
</style>
