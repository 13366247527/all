<template>
    <div class="common-page-flex">
      <div class="common-page-content">
        <div class="common-line-one-panel">
          <p>
              <span>月份：</span>
              <select-box class="wid110"></select-box>
          </p>
        </div>
        <div class="common-line-one-panel">
          <p>
              <span>原因：</span>
              <select-box class="wid110"></select-box>
          </p>
        </div>
        <ul class="common-content-box">
            <li class="common-content-title bgGray">
                <div>日</div>
                <div>车号</div>
                <div>金额</div>
                <div>状态</div>
            </li>
            <li v-for="(item, index) in tempData" :key="index">
                <div>{{item.artName}}</div>
                <div>{{item.bottlePrice}}</div>
                <div>{{item.bottlePrice}}</div>
                <div></div>
            </li>
        </ul>
      </div>
    </div>
</template>

<script>

import SelectBox from "@/components/common/SelectBox"

export default {
  components: { SelectBox },
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
.common-content-box li div{
    width: 25%;
}

.common-line-one-panel{
    position: relative;
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
