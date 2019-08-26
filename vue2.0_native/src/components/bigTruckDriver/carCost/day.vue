<template>
    <div class="common-page-flex">
      <div class="common-page-content">
        <div class="common-line-one-panel">
          <p>
              <span>车号：</span>
              <select-box class="wid110"></select-box>
          </p>
        </div>
        <div class="common-line-one-panel">
          <p>
              <span>类别：</span>
              <select-box class="wid110"></select-box>
          </p>
        </div>
        <div class="common-line-one-panel">
          <p>
              <span>报销原因：</span>
              <select-box class="wid110"></select-box>
          </p>
        </div>
        <div class="common-line-one-panel">
          <p>
              <span>报销人：</span>
              <span></span>
          </p>
        </div>
        <div class="common-line-one-panel">
          <p>
              <span>报销金额：</span>
              <input type="text" class="wid110">
              <span class="black">元</span>
          </p>
        </div>
        <take-photo :title="photoTitle" class="photo"></take-photo>
      </div>
      <div class="common-bottom-button bottom-button-fixed">申请</div>
    </div>
</template>

<script>

import TakePhoto from "@/components/common/TakePhoto"
import SelectBox from "@/components/common/SelectBox"

export default {
  components: {TakePhoto, SelectBox},
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
.common-line-one-panel{
  p{
    span:first-of-type{
      min-width: .75rem;
    }
  }
}

.photo{
  width: 1.63rem;
  height: 1.56rem;
  margin: .1rem auto 0;
}

.wid110{
  width: 1.1rem;
}

</style>
