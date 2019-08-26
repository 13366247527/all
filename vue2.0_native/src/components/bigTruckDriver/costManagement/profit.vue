<template>
  <div class="common-page-flex">
    <div class="common-page-content">
        <div class="common-line-one-panel">
            <p>
                <span>月份查询：</span>
                <select-box class="wid156"></select-box>
            </p>
        </div>
    </div>
    <ul class="common-content-box">
            <li class="common-content-title bgGray">
                <div>日</div>
                <div>地点</div>
                <div>收入</div>
                <div>支出</div>
                <div>利润</div>
            </li>
            <li v-for="(item, index) in tempData" :key="index">
                <div>{{item.artName}}</div>
                <div></div>
                <div></div>
                <div></div>
                <div>{{item.bottlePrice}}</div>
            </li>
        </ul>
  </div>
</template>

<script>

import SelectBox from '@/components/common/SelectBox.vue'

export default {
  components: {SelectBox},
  data(){
    return{

    }
  },
  methods: {

  }
};
</script>

<style lang="scss" scoped>
.common-page-content{
  padding-bottom:.5rem;
  overflow-y: scroll;
}
.common-line-one-panel{
  position: relative;
  .wid156{
    width: 1.56rem;
  }
}

.common-content-box li div{
  width: 20%;
}


</style>
