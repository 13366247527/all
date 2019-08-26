<template>
<div>
  <header-default :title="title"></header-default>
    <div class="common-page-flex">
      <div class="common-bottom-button bottom-button-fixed">提交</div>
    </div>
  </div>
</template>

<script>
import HeaderDefault from "@/components/common/HeaderDefault"
export default {
  name: "aboutCar",
  components: {HeaderDefault},
  data(){
    return{
      title:'人工拼车',
      isCheckedAll: false
    }
  },
  methods: {
    allSelected(){
      console.log('hhh')
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
