<template>
  <div class="common-page-flex">
    <div class="common-page-content">
      <div class="common-line-one-panel">
        <p>
          <span>分类：</span>
          <span class="red"></span>
        </p>
        <span class="map orangePanel">地图定位</span>
      </div>
      <div class="common-line-two-panel">
        <p>
          <span>加油站：</span>
          <select-box class="wid67"></select-box>
        </p>
        <p>
          <span>油站名：</span>
          <input type="text" class="wid67">
        </p>
      </div>
      <div class="common-line-two-panel">
        <p>
          <span>加油量：</span>
          <input type="text" class="wid67">
          <span class="black">升</span>
        </p>
        <p>
          <span>油价：</span>
          <input type="text" class="wid67">
          <span class="black">元/升</span>
        </p>
      </div>
      <div class="common-line-two-panel">
        <p>
          <span>金额：</span>
          <input type="text" class="wid67">
          <span class="black">元</span>
        </p>
        <p>
          <span>拍照：</span>
          <span class="photoPanel"></span>
        </p>
      </div>
      <div class="common-line-one-panel">
        <p>
          <span>分类：</span>
          <span class="red">路桥费</span>
        </p>
      </div>
      <div class="common-line-one-panel">
        <p>
          <span>路线：</span>
          <span class="red">路桥费</span>
        </p>
      </div>
      <div class="common-line-two-panel">
        <p>
          <span>金额：</span>
          <input type="text" class="wid67">
          <span class="black">元</span>
        </p>
        <p>
          <span>拍照：</span>
          <span class="photoPanel"></span>
        </p>
      </div>
      <div class="common-line-one-panel">
        <p>
          <span>分类：</span>
          <span class="red">罚款</span>
        </p>
      </div>
      <div class="common-line-one-panel">
        <p>
          <span>类别：</span>
          <select-box class="wid67"></select-box>
        </p>
      </div>
      <div class="common-line-two-panel">
        <p>
          <span>金额：</span>
          <input type="text" class="wid67">
          <span class="black">元</span>
        </p>
        <p>
          <span>拍照：</span>
          <span class="photoPanel"></span>
        </p>
      </div>
    </div>

    <div class="common-bottom-button bottom-button-fixed">提交</div>
  </div>
</template>

<script>
import SelectBox from "@/components/common/SelectBox";

export default {
  components: { SelectBox },
  data() {
    return {};
  },
  methods: {
    toReceipt(index) {
      this.$router.push({
        path: "/dealerReceipt/ReceiptConfirm",
        query: { index: index }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.common-page-content{
  padding-bottom:.5rem;
  overflow-y: scroll;
}
  
.common-line-one-panel {
  position: relative;
  .map {
    @include peddingBtn(0.67rem);
    background: $orange;
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0.58rem;
    margin: auto 0;
  }
}

p {
  display: flex;
  align-items: center;
  span:first-of-type {
    min-width: 0.58rem;
  }
}

.common-line-two-panel {
  p:first-of-type {
    width: 48%;
  }
}
.wid67 {
  width: 0.67rem;
}
.photoPanel {
  @include takePhotoPanel(0.67rem);
  background-image: url(../../../assets/images/common/takePhoto.png);
}
.common-page-content{
  position: flex;
  top:0;
  bottom:0;
  left:0;
  right:0;
  height:auto;
}
</style>
