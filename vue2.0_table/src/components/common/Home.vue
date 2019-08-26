<template>
  <div class="wrapper">
    <v-head v-on:getChildIndex="getChild"></v-head>
    <v-sidebar :sendMsg="ChildIndex"></v-sidebar>
    <div class="content-box" :class="{'content-collapse':collapse}">
      <div class="content_wrapper">
        <!-- <v-tags></v-tags> -->
        <div class="content" style="flex:1;">
          <div class="content_inner">
            <transition name="move" mode="out-in">
              <keep-alive :include="tagsList">
                <router-view></router-view>
              </keep-alive>
            </transition>
          </div>
        </div>
        <!-- <v-footer></v-footer> -->
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.content_wrapper {
  display: flex;
  flex-direction: column;
  height: 100%;
  position: relative;
  .content_inner {
    height: 100%;
  }
}

.content-box {
  position: absolute;
  left: 200px;
  right: 0;
  top: 80px;
  bottom: 0;
  overflow-y: scroll;
  -webkit-transition: left 0.3s ease-in-out;
  transition: left 0.3s ease-in-out;
  background: #f0f0f0;
}
</style>

<script>
import vHead from "./Header.vue";
import vSidebar from "./Sidebar.vue";
import vTags from "./Tags.vue";
import vFooter from "./Footer.vue";
import bus from "./bus";
export default {
  data() {
    return {
      tagsList: [],
      collapse: false,
      ChildIndex: ""
    };
  },
  components: {
    vHead,
    vSidebar,
    vTags,
    vFooter
  },
  methods: {
    getChild(data) {
      this.ChildIndex = data;
      console.log(data);
    }
  },
  mounted() {
    if(document.getElementsByClassName("content-box")[0].style){
       document.getElementsByClassName("content-box")[0].style.left = 200 + "px";
    if (document.body.clientWidth < 1366) {
      document.getElementsByClassName("content-box")[0].style.left = 64 + "px";
    }
    }

  },
  created() {
    bus.$on("collapse", msg => {
      this.collapse = msg;
      if (msg) {
        document.getElementsByClassName("content-box")[0].style.left =
          64 + "px";
      } else {
        document.getElementsByClassName("content-box")[0].style.left =
          200 + "px";
      }
    });

    // 只有在标签页列表里的页面才使用keep-alive，即关闭标签之后就不保存到内存中了。
    bus.$on("tags", msg => {
      let arr = [];
      for (let i = 0, len = msg.length; i < len; i++) {
        msg[i].name && arr.push(msg[i].name);
      }
      this.tagsList = arr;
    });
  }
};
</script>
