<template>
  <div id="app">
    <router-view v-if="isRouterAlive">
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive">
          <app-home></app-home>
        </router-view>
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive">
        <app-home></app-home>
      </router-view>
    </router-view>
  </div>
</template>
<script>
export default {
  name: "App",
  provide() {
    return {
      reload: this.reload
    };
  },
  data() {
    return {
      isRouterAlive: true
    };
  },
  methods: {
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(function() {
        this.isRouterAlive = true;
      });
    }
  }
};
</script>
<style lang="less">
.amap-info-content {
  font-size: 0.16rem;
}
</style>
