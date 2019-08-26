<template>
  <div class="sidebar">
    <el-menu
      class="sidebar-el-menu"
      :default-active="onRoutes"
      :collapse="collapse"
      background-color="#fff"
      text-color="#333"
      active-text-color="#fff"
      router
    >
      <template v-for="item in items">
        <template v-if="item.subs">
          <el-submenu :index="item.index" :key="item.index">
            <template slot="title">
              <i :class="item.icon"></i>
              <span slot="title">{{ item.title }}</span>
            </template>
            <template v-for="subItem in item.subs">
              <el-submenu v-if="subItem.subs" :index="subItem.index" :key="subItem.index">
                <template slot="title">
                  <i :class="subItem.icon"></i>
                  <span>{{ subItem.title }}</span>
                </template>
                <el-menu-item
                  v-for="(threeItem,i) in subItem.subs"
                  :key="i"
                  :index="threeItem.index"
                >{{ threeItem.title }}</el-menu-item>
              </el-submenu>
              <el-menu-item v-else :index="subItem.index" :key="subItem.index">{{ subItem.title }}</el-menu-item>
            </template>
          </el-submenu>
        </template>
        <template v-else>
          <el-menu-item :index="item.index" :key="item.index">
            <i :class="item.icon"></i>
            <span slot="title">{{ item.title }}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script>
import bus from "./bus";
import { mapState } from "vuex";
export default {
  props: ["sendMsg"],
  data() {
    return {
      collapse: false,
      items: []
    };
  },
  watch: {
    sendMsg(val) {
      this.pageIndex(val);
    }
  },
  mounted() {
    let ind = this.$common.getSessionStorage("ind");
    this.pageIndex(ind ? ind : 1);
  },
  methods: {
    pageIndex(val) {
      if (val == 1) {
        this.$router.push({ path: "/housereport" });
        this.items = [
          {
            icon: "el-icon-s-home",
            index: "housement",
            title: "仓库管理",
            subs: [
              {
                index: "housereport",
                title: "仓库报表"
              }
            ]
          }
          // {
          //   icon: "el-icon-tickets",
          //   index: "table",
          //   title: "客户管理"
          //   // subs: [
          //   //     {
          //   //         index: 'searchinput',
          //   //         title: '查询输入页'
          //   //     },
          //   //     {
          //   //         index: 'tabpage',
          //   //         title: '标签选项卡'
          //   //     },
          //   //      {
          //   //         index: 'tablepage',
          //   //         title: '综合表格页'
          //   //     },
          //   //      {
          //   //         index: 'formpage',
          //   //         title: '表单页'
          //   //     },
          //   //      {
          //   //         index: 'treepage',
          //   //         title: '树组件页'
          //   //     }
          //   // ]
          // },
          // {
          //   icon: "el-icon-setting",
          //   index: "wuliu",
          //   title: "物流商管理",
          //   subs: [
          //     {
          //       index: "organizationTree",
          //       title: "物流商管理报表"
          //     },
          //     // {
          //     //     index: 'sysUser',
          //     //     title: '客户管理'
          //     // },
          //     {
          //       icon: "el-icon-setting",
          //       index: "sysRole",
          //       title: "运输报表",
          //       subs: [
          //         {
          //           index: "sysAcl",
          //           title: "现场违规"
          //         },
          //         {
          //           index: "sysResource",
          //           title: "资源管理"
          //         }
          //       ]
          //     }
          //     // {
          //     //     index: 'sysAcl',
          //     //     title: '现场违规'
          //     // },
          //     // {
          //     //     index: 'sysResource',
          //     //     title: '资源管理'
          //     // },
          //     // {
          //     //     index: 'sysMenu',
          //     //     title: '菜单管理'
          //     // }
          //   ]
          // }
          // {
          //     icon: 'el-icon-message',
          //     index: 'tabs',
          //     title: '费用管理'
          // },
          // {
          //     icon: 'el-icon-date',
          //     index: 'chang',
          //     title: '厂内效率',
          //     // subs: [
          //     //     {
          //     //         index: 'form',
          //     //         title: '基本表单'
          //     //     },
          //     //     {
          //     //         index: 'editor',
          //     //         title: '富文本编辑器'
          //     //     },
          //     //     {
          //     //         index: 'markdown',
          //     //         title: 'markdown编辑器'
          //     //     },
          //     //     {
          //     //         index: 'upload',
          //     //         title: '文件上传'
          //     //     }
          //     // ]
          // },
          // {
          //     icon: 'el-icon-star-on',
          //     index: 'charts',
          //     title: '发车明细'
          // },
          // {
          //     icon: 'el-icon-warning',
          //     index: 'drag',
          //     title: '未发明细'
          // },
          // {
          //     icon: 'el-icon-rank',
          //     index: 'permission',
          //     title: '标准设置'
          // },
          // {
          //     icon: 'el-icon-error',
          //     index: '404',
          //     title: '404页面'
          // }
        ];
      } else if (val == 2) {
        this.$router.push({ path: "/organizationTree" });
        this.items = [
          // {
          //     icon: 'el-icon-setting',
          //     index: 'index',
          //     title: '单据管理',
          // },
          // {
          //     icon: 'el-icon-tickets',
          //     index: 'table',
          //     title: '客户管理',
          //     // subs: [
          //     //     {
          //     //         index: 'searchinput',
          //     //         title: '查询输入页'
          //     //     },
          //     //     {
          //     //         index: 'tabpage',
          //     //         title: '标签选项卡'
          //     //     },
          //     //      {
          //     //         index: 'tablepage',
          //     //         title: '综合表格页'
          //     //     },
          //     //      {
          //     //         index: 'formpage',
          //     //         title: '表单页'
          //     //     },
          //     //      {
          //     //         index: 'treepage',
          //     //         title: '树组件页'
          //     //     }
          //     // ]
          // },
          {
            icon: "iconfont icon-huoche",
            index: "wuliu",
            title: "物流商管理",
            subs: [
              {
                index: "organizationTree",
                title: "物流商管理报表"
              },
              // {
              //     index: 'sysUser',
              //     title: '客户管理'
              // },
              {
                icon: "iconfont icon-baobiao",
                index: "sysRole",
                title: "运输报表",
                subs: [
                  {
                    index: "sysAcl",
                    title: "发车明细"
                  },
                  {
                    index: "sysResource",
                    title: "未发车明细"
                  }
                ]
              }
              // {
              //     index: 'sysAcl',
              //     title: '现场违规'
              // },
              // {
              //     index: 'sysResource',
              //     title: '资源管理'
              // },
              // {
              //     index: 'sysMenu',
              //     title: '菜单管理'
              // }
            ]
          },
          // {
          //     icon: 'el-icon-message',
          //     index: 'tabs',
          //     title: '费用管理'
          // },
          {
            icon: "iconfont icon-xiaoshuai",
            index: "chang",
            title: "厂内效率",
            subs: [
              {
                index: "sysMenu",
                title: "厂内效率报表"
              }
              // {
              //     index: 'sysRole',
              //     title: '发运明细'
              // },
              // {
              //     index: 'markdown',
              //     title: 'markdown编辑器'
              // },
              // {
              //     index: 'upload',
              //     title: '文件上传'
              // }
            ]
          }
          // {
          //     icon: 'el-icon-star-on',
          //     index: 'charts',
          //     title: '发车明细',
          //     subs: [
          //         {
          //             index: 'form',
          //             title: '基本表单'
          //         }]
          // },
          // {
          //     icon: 'el-icon-warning',
          //     index: 'drag',
          //     title: '未发明细'
          // },
          // {
          //     icon: 'el-icon-rank',
          //     index: 'permission',
          //     title: '标准设置'
          // },
          // {
          //     icon: 'el-icon-error',
          //     index: '404',
          //     title: '404页面'
          // }
        ];
      } else {
        this.$message({
          type: "success",
          message: "暂未开发!",
          duration: "1000"
        });
      }
    }
  },
  computed: mapState({
    //menuList:state=>state.menu.menuList,
    onRoutes() {
      return this.$route.path.replace("/", "");
    }
  }),

  created() {
    // 通过 Event Bus 进行组件间通信，来折叠侧边栏
    bus.$on("collapse", msg => {
      this.collapse = msg;
    });
  }
};
</script>

<style lang="scss" scoped>
.icon-huoche {
  font-size: 32px;
}
.icon-baobiao {
  font-size: 20px;
}
.sidebar {
  display: block;
  position: absolute;
  left: 0;
  top: 90px;
  bottom: 0;
  overflow-y: scroll;
  .el-menu-item.is-active {
    background: linear-gradient(
      90deg,
      rgba(244, 18, 34, 1),
      rgba(237, 63, 62, 1),
      rgba(255, 94, 96, 1)
    ) !important;
    opacity: 0.8;
  }
}
.sidebar::-webkit-scrollbar {
  width: 0;
}
.el-menu-item.is-active {
  background: linear-gradient(
    90deg,
    rgba(244, 18, 34, 1),
    rgba(237, 63, 62, 1),
    rgba(255, 94, 96, 1)
  ) !important;
  opacity: 0.8;
}
.sidebar-el-menu:not(.el-menu--collapse) {
  width: 200px;
}
.sidebar > ul {
  height: 100%;
}
</style>
