<template>
  <div class="rating">
        <span v-for="(n, index) in 5" :key="index" @click="types?'':selectedStar(n)" :class="{'on':curs>=n}"></span>
    </div>
</template>

<script>
export default {
  name: "rating",
  props:["cur","types"],
  data(){
      return{
           curs: this.cur
      }
  },
  methods: {
      selectedStar(n) {
        this.curs = n;
      },
  }
};
</script>

<style lang="scss" scoped>
.rating {
    display: flex;
    justify-content: center;
    align-items: center;
    height: .44rem;
    span{
        display: inline-block;
        width: .21rem;
        height: .21rem;
        margin-right: .1rem;
        background: url(../../assets/images/common/empty-star.png) no-repeat center;
        background-size: 100%;
    }
    .on{
        background: url(../../assets/images/common/shining-star.png) no-repeat center;
        background-size: 100%;
    }
}
</style>
