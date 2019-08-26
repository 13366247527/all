<template>
  <div>
    <div class="modals" v-if="mymodal" @click="changeModal"></div>
    <div class="selectBoxs" @click="openPicker">
      <span class="red myAddress">{{myAddressProvince}}/{{myAddressCity}}/{{myAddresscounty}}</span>
      <img src="@/assets/images/common/selectIcon.png" alt>
    </div>
    <mt-popup v-model="popupVisible" position="bottom" :modal="modalFlag" class="mint-popup">
      <mt-picker
        :slots="myAddressSlots"
        @change="onMyAddressChange"
        :show-toolbar="true"
        ref="picker"
      >
        <span class="cancel" @click="handleConfirmCancel">取消</span>
        <span @click="handleConfirm" class="sure">确认</span>
      </mt-picker>
    </mt-popup>
  </div>
</template>

<script>
import myaddress from "@/assets/json/MyAddress.json"; //引入省市区数据
export default {
  name: "myaddress",
  data() {
    return {
      popupVisible: false,
      modalFlag: false,
      mymodal: false,
      myAddressProvince: "省",
      myAddressCity: "市",
      myAddresscounty: "区/县",
      myAddressSlots: [
        {
          flex: 1,
          defaultIndex: 1,
          values: Object.keys(myaddress), //省份数组
          className: "slot1",
          textAlign: "center"
        },
        {
          divider: true,
          content: "-",
          className: "slot2"
        },
        {
          flex: 1,
          values: [],
          className: "slot3",
          textAlign: "center"
        },
        {
          divider: true,
          content: "-",
          className: "slot4"
        },
        {
          flex: 1,
          values: [],
          className: "slot5",
          textAlign: "center"
        }
      ]
    };
  },
  mounted() {
    this.$nextTick(() => {
      //vue里面全部加载好了再执行的函数 （类似于setTimeout）
      this.myAddressSlots[0].defaultIndex = 0;
    });
  },
  methods: {
    openPicker() {
      //this.$refs.picker.open();
      this.popupVisible = !this.popupVisible;
      this.mymodal = true;
    },
    changeModal() {
      this.mymodal = false;
      this.popupVisible = false;
    },
    onMyAddressChange(picker, values) {
      if (myaddress[values[0]]) {
        picker.setSlotValues(1, Object.keys(myaddress[values[0]])); // Object.keys()会返回一个数组，当前省的数组
        picker.setSlotValues(2, myaddress[values[0]][values[1]]); // 区/县数据就是一个数组
      }
    },
    handleConfirm() {
      let data = this.$refs.picker.getValues();
      this.myAddressProvince = data[0];
      this.myAddressCity = data[1];
      this.myAddresscounty = data[2];
      this.popupVisible = false;
      this.mymodal = false;
    },
    handleConfirmCancel(){
      this.popupVisible = false;
      this.mymodal = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.modal {
  position: fixed;
  z-index: 2000;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
}

.selectBoxs {
  box-sizing: border-box;
  position: relative;
  width: 100%;
  height: 0.32rem;
  border: 1px solid rgba(192, 192, 192, 1);
  border-radius: 0.05rem;
  padding-left: 0.05rem;
  span {
    display: inline-block;
    height: 0.32rem;
    line-height: 0.32rem;
  }
  img {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0.05rem;
    margin: auto;
    width: 0.11rem;
    height: 0.06rem;
  }
}
</style>


