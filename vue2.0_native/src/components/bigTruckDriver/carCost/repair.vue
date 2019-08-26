<template>
    <div class="common-page-flex">
      <div class="common-page-content">
        <div class="common-line-one-panel">
          <p>
              <span>维修单位：</span>
              <input type="text" class="wid182">
          </p>
        </div>
        <div class="common-line-one-panel">
          <p>
              <span>联系人：</span>
              <input type="text" class="wid182">
          </p>
        </div>
        <div class="common-line-one-panel">
          <p>
              <span>电话：</span>
              <input type="text" class="wid182">
          </p>
        </div>
        <div class="common-line-one-panel">
          <p>
              <span>名称：</span>
              <select-box class="wid182"></select-box>
          </p>
        </div>
        <div class="common-line-two-panel">
          <p>
              <span>配件：</span>
              <input type="text" class="wid67">
              <span class="black">元</span>
          </p>
          <p>
              <span>工时：</span>
              <input type="text" class="wid67">
              <span class="black">元</span>
          </p>
        </div>
        <div class="common-line-two-panel">
          <p>
              <span>救援费：</span>
              <input type="text" class="wid67">
              <span class="black">元</span>
          </p>
          <p>
              <span>税金：</span>
              <input type="text" class="wid67">
              <span class="black">元</span>
          </p>
        </div>
        <div class="common-line-two-panel">
          <p @click="toChangeTirePosition">
              <span>换轮胎：</span>
              <select-box class="wid67"></select-box>
          </p>
          <p @click="toChangeTirePosition">
              <span>调轮胎：</span>
              <select-box class="wid67"></select-box>
          </p>
        </div>
        <div class="common-line-one-panel">
          <p>
              <span>行程公里数：</span>
              <span></span>
          </p>
        </div>
        <take-photo :title="photoTitle" class="takePhoto"></take-photo>
      </div>
      <div class="common-bottom-button bottom-button-fixed">申请</div>
    </div>
</template>

<script>

import TakePhoto from "@/components/common/TakePhoto"
import SelectBox from "@/components/common/SelectBox"

export default {
  components: {SelectBox, TakePhoto},
  data() {
    return {
      photoTitle: '照片'
    };
  },
  methods: {
    toChangeTirePosition(){
      this.$router.push({
        path: '/bigTruckDriver/changeTirePosition',
      })
    }
  }
};
</script>

<style lang="scss" scoped>
.common-page-content{
  padding-bottom:.5rem;
  overflow-y: scroll;
}
.pdTop115{
  flex-grow: 1;
  overflow-y: scroll;
}

.common-line-one-panel{
  p{
    span:first-of-type{
      min-width: .75rem;
    }
  }
}

.common-line-two-panel{
  p{
    display: flex;
    align-items: center;
    span:first-of-type{
      min-width: .65rem;
    }
  }
}

.wid182{
  width: 1.82rem;
}

.wid67{
  width: .67rem;
}

.takePhoto{
  width: 1.63rem;
  height: 1.56rem;
  margin: .1rem auto;
}

</style>
