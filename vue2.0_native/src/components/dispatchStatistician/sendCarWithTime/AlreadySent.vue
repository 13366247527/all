<template>
<div>
  <div class="common-page-flex">
    <header-default :title="title"></header-default>
    
      <ul class="common-content-box">
        <li class="common-content-title">
          <div @click.stop="allSelected" class="checked">
            <img v-if="isCheckedAll" src="@/assets/images/common/checked.png">
            <img v-else src="@/assets/images/common/check.png">
          </div>
          <div>车队</div>
          <div>客户</div>
          <div>车号</div>
          <div>时间</div>
          <div>重量</div>
        </li>

        <li v-for="(item, index) in tempData" :key="index">
          <div @click.stop="changeStatus(index)" class="checked">
            <img
              v-if="orderStatusLists.indexOf(index)>=0||isCheckedAll"
              src="@/assets/images/common/checked.png"
            >
            <img v-else src="@/assets/images/common/check.png">
          </div>
          <div>{{item.artName}}</div>
          <div>{{item.artName}}</div>

          <div>
            <span>{{item.number}}</span>
          </div>
          <div>
            <span>{{item.number}}</span>
          </div>
          <div>
            <span>{{item.number}}</span>
          </div>

          <!-- <div v-if="item.code == 0">
            <span class="green">完成</span>
        </div>
        <div v-if="item.code == 1" @click="toUploadPhoto(item)">
            <span class="orgBtn">卸货</span>
        </div>
        <div v-if="item.code == 2" @click="toCarPosition(item)">
            <span class="redBtn">在途</span>
        </div>
        <div v-if="item.code == 3">
            <span class="yellow">到达</span>
          </div>-->
        </li>
      </ul>
    
    <div class="common-bottom-button bottom-button-fixed">
      <span class="orangeBtn">撤回</span>
      <span class="redBtner">通知司机</span>
    </div>
  </div>
  </div>
</template>

<script>
import HeaderDefault from "@/components/common/HeaderDefault";
export default {
  name: "carManage",
  components: { HeaderDefault },
  data() {
    return {
      active: 0,
      photoTitle: "添加",
      title: "重新调整派车",
      isCheckedAll: false,
      orderStatusLists: [],
      tempData: [
        
      ]
    };
  },
  methods: {
    changeStatus: function(index) {
      let idIndex = this.orderStatusLists.indexOf(index);

      if (idIndex >= 0) {
        this.orderStatusLists.splice(idIndex, 1);
      } else {
        this.orderStatusLists.push(index);
      }
    },

    allSelected: function() {
      this.isCheckedAll = !this.isCheckedAll;

      if (this.isCheckedAll) {
        this.orderStatusLists = [];

        // this.arrivalData.forEach((item, index) => {
        //   this.orderStatusLists.push(index);
        // });
      } else {
        this.orderStatusLists = [];
      }
    },
    Detail(index) {
      this.active = index;
    },
    back() {
      this.$router.go(-1);
    }
  }
};
</script>

<style lang="less" scoped>
.common-content-box {
  margin-bottom: 0.5rem;
}
.redBtn {
  width: 0.4rem;
}
.wid60 {
  width: 0.6rem;
}
.common-content-box li div:nth-child(1) {
  width: 5%;
}
.common-content-box li div:nth-child(2) {
  width: 20%;
}
.common-content-box li div:nth-child(3) {
  width: 20%;
}
.common-content-box li div:nth-child(4) {
  width: 20%;
}
.common-content-box li div:nth-child(5) {
  width: 20%;
}
.common-content-box li div:nth-child(6) {
  width: 15%;
}

.commonTab li {
  padding: 0.1rem;
}
</style>
