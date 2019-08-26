<template>
  <div>
    <mt-header title="标题过长会隐藏后面的内容啊哈哈哈哈">
      <router-link to="/" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
      <mt-button icon="more" slot="right"></mt-button>
    </mt-header>

    <mt-tabbar fixed v-model="selected">
      <mt-tab-item id="外卖" @click.native="active='tab-container1'">
        <img slot="icon" src="@/assets/images/common/down.png">
        外卖
      </mt-tab-item>
      <mt-tab-item id="订单" @click.native="active='tab-container2'">
        <img slot="icon" src="@/assets/images/common/down.png">
        订单
      </mt-tab-item>
      <mt-tab-item id="发现" @click.native="active='tab-container3'">
        <img slot="icon" src="@/assets/images/common/down.png">
        发现
      </mt-tab-item>
      <mt-tab-item id="我的" @click.native="active='tab-container4'">
        <img slot="icon" src="@/assets/images/common/down.png">
        我的
      </mt-tab-item>
    </mt-tabbar>

    <mt-tab-container v-model="active">
      <mt-tab-container-item id="tab-container1">
        <mt-button type="default">default</mt-button>
       
         <!-- <mt-actionsheet :actions="actions" v-model="sheetVisible">
              
          </mt-actionsheet> -->
          

<mt-range v-model="rangeValue">
  <div slot="start">0</div>
  <div slot="end">100</div>
</mt-range>
{{rangeValue}}
<mt-progress :value="values" :barHeight=5>
  
  <div slot="start">0%</div>
  <div slot="end">{{values}}%</div>
</mt-progress>
<!-- <mt-datetime-picker
    ref="picker"
    type="time"
    v-model="pickerValue">
  </mt-datetime-picker> -->
  <mt-datetime-picker
  v-model="pickerVisible"
  type="date" ref="picker"
  year-format="{value} 年"
  month-format="{value} 月"
  date-format="{value} 日">
</mt-datetime-picker>
<!-- <mt-datetime-picker
  v-model="pickerVisible"
  type="time"
  @confirm="handleConfirm">
</mt-datetime-picker> -->
<mt-index-list>
  <mt-index-section index="1">
    <mt-cell title="Aaron"></mt-cell>
    <mt-cell title="Alden"></mt-cell>
    <mt-cell title="Austin"></mt-cell>
  </mt-index-section>
  <mt-index-section index="2">
    <mt-cell title="Baldwin"></mt-cell>
    <mt-cell title="Braden"></mt-cell>
  </mt-index-section>
  <mt-index-section index="3">
    <mt-cell title="Baldwin"></mt-cell>
    <mt-cell title="Braden"></mt-cell>
     <mt-cell title="Baldwin"></mt-cell>
    <mt-cell title="Braden"></mt-cell> <mt-cell title="Baldwin"></mt-cell>
    <mt-cell title="Braden"></mt-cell> <mt-cell title="Baldwin"></mt-cell>
    <mt-cell title="Braden"></mt-cell> <mt-cell title="Baldwin"></mt-cell>
    <mt-cell title="Braden"></mt-cell> <mt-cell title="Baldwin"></mt-cell>
    <mt-cell title="Braden"></mt-cell> <mt-cell title="Baldwin"></mt-cell>
    <mt-cell title="Braden"></mt-cell> <mt-cell title="Baldwin"></mt-cell>
    <mt-cell title="Braden"></mt-cell> <mt-cell title="Baldwin"></mt-cell>
    <mt-cell title="Braden"></mt-cell> <mt-cell title="Baldwin"></mt-cell>
    <mt-cell title="Braden"></mt-cell>
  </mt-index-section>
  <mt-index-section index="4">
    <mt-cell title="Baldwin"></mt-cell>
    <mt-cell title="Braden"></mt-cell>
  </mt-index-section>
  <mt-index-section index="e">
    <mt-cell title="Baldwin"></mt-cell>
    <mt-cell title="Braden"></mt-cell>
  </mt-index-section>
  <mt-index-section index="f">
    <mt-cell title="Baldwin"></mt-cell>
    <mt-cell title="Braden"></mt-cell>
  </mt-index-section>
  <mt-index-section index="g">
    <mt-cell title="Baldwin"></mt-cell>
    <mt-cell title="Braden"></mt-cell>
  </mt-index-section>
  <mt-index-section index="h">
    <mt-cell title="Baldwin"></mt-cell>
    <mt-cell title="Braden"></mt-cell>
  </mt-index-section>
  <mt-index-section index="Z">
    <mt-cell title="Zack"></mt-cell>
    <mt-cell title="Zane"></mt-cell>
  </mt-index-section>
</mt-index-list>
<div @click="openPicker">{{birthday}}</div>
        <mt-button type="primary" @click="test">primary</mt-button>
        <mt-button type="danger">danger</mt-button>
        <mt-button size="small">small</mt-button>
        <mt-button size="large">large</mt-button>
        <mt-button size="normal">normal</mt-button>
        <mt-button disabled>disabled</mt-button>
        <mt-button plain>plain</mt-button>
        <mt-button icon="back">back</mt-button>
        <mt-button icon="more">更多</mt-button>
        <mt-badge size="small">30</mt-badge>
        <mt-badge size="normal">10</mt-badge>
        <mt-badge size="large">10</mt-badge>指定类型
        <mt-badge type="primary">30</mt-badge>
        <mt-badge type="error">10</mt-badge>
        <mt-badge type="success">10</mt-badge>
        <mt-badge type="warning">10</mt-badge>指定颜色
        <mt-badge size="small" color="#888">自定义颜色</mt-badge>
      </mt-tab-container-item>
      <mt-tab-container-item id="tab-container2">
        <mt-navbar v-model="selected">
          <mt-tab-item id="1">选项一</mt-tab-item>
          <mt-tab-item id="2">选项二</mt-tab-item>
          <mt-tab-item id="3">选项三</mt-tab-item>
        </mt-navbar>
        <mt-tab-container v-model="selected" :swipeable="swipeable">
          <mt-tab-container-item id="1">
            <!-- <mt-search v-model="value" :result.sync="result"></mt-search> -->
          </mt-tab-container-item>
          <mt-tab-container-item id="2">
            <mt-switch v-model="value">开关</mt-switch>
          </mt-tab-container-item>
          <mt-tab-container-item id="3">
            <!-- <mt-radio title="复选框列表" v-model="value" :options="options"></mt-radio> -->
          </mt-tab-container-item>
        </mt-tab-container>
      </mt-tab-container-item>

      <mt-tab-container-item id="tab-container3">
        <mt-cell title="标题文字" icon="more" value="带 icon"></mt-cell>
        <mt-cell title="标题文字"></mt-cell>
        <mt-cell title="标题文字" value="说明文字"></mt-cell>

        <mt-cell title="标题文字" to="//github.com" is-link value="带链接"></mt-cell>
      </mt-tab-container-item>
      <mt-tab-container-item id="tab-container4">
    

<div>
  <mt-popup
  v-model="sheetVisible"
  position="bottom">
  <mt-picker :slots="myAddressSlots" @change="onMyAddressChange" :show-toolbar="true" ref='picker'> <span @click="handleConfirm" class="sure">取消</span> <span @click="handleConfirm" class="sure">确认</span></mt-picker>
</mt-popup>
  <mt-button type="primary" @click.native="sheetVisible = true">点击触发 </mt-button>
 <p>{{myAddressProvince}} {{myAddressCity}} {{myAddresscounty}} {{myAddresscountyer}}</p>
</div>



      </mt-tab-container-item>
    </mt-tab-container>
  </div>
</template>

<script>
import myaddress from '@/assets/json/MyAddress.json' //引入省市区数据
export default {
  name: "selectBox",
  props: {},
  data() {
    return {
myAddressProvince:'省',
  myAddressCity:'市',
  myAddresscounty:'区/县',
  myAddresscountyer:'区/县',
 myAddressSlots: [
   {
   flex: 1,
   defaultIndex: 1, 
   values: Object.keys(myaddress), //省份数组
   className: 'slot1',
   textAlign: 'center'
   }, {
   divider: true,
   content: '-',
   className: 'slot2'
   }, {
   flex: 1,
   values: [],
   className: 'slot3',
   textAlign: 'center'
   },
   {
   divider: true,
   content: '-',
   className: 'slot4'
   },
   {
   flex: 1,
   values: [],
   className: 'slot5',
   textAlign: 'center'
   },
   {
   divider: true,
   content: '-',
   className: 'slot6'
   },
   {
   flex: 1,
   values: [],
   className: 'slot7',
   textAlign: 'center'
   }
  ],
  














      rangeValue:50,
      sheetVisible:false,
      values:60,
      birthday:12,
      actions:[{
name:"123456",
method:this.getCamera
     },{
name:"1234567",
method:this.getCameras},{
name:"12345678",
method:this.getCamerass}],
      selected: "2",
      active: "tab-container2",
      swipeable: true,
      value: true,
      allLoaded: false,
      pickerValue:123,
      pickerVisible:'1968-01-01',
      options: [
        {
          label: "被禁用",
          value: "值F",
          disabled: true
        },
        {
          label: "选中禁用",
          value: "选中禁用的值",
          disabled: true
        },
        {
          label: "选项A",
          value: "值A"
        },
        {
          label: "选项B",
          value: "值B"
        }
      ]
    };
  },
 mounted(){
  this.$nextTick(() => { //vue里面全部加载好了再执行的函数 （类似于setTimeout）
  this.myAddressSlots[0].defaultIndex = 0 
  // 这里的值需要和 data里面 defaultIndex 的值不一样才能够初始化
  //因为我没有看过源码（我猜测是因为数据没有改变，不会触发更新）
  });
 },
 methods:{
  onMyAddressChange(picker, values) {
  if(myaddress[values[0]]){ //这个判断类似于v-if的效果（可以不加，但是vue会报错，很不爽）
   picker.setSlotValues(1,Object.keys(myaddress[values[0]])); // Object.keys()会返回一个数组，当前省的数组
   picker.setSlotValues(2,Object.keys(myaddress[values[0]][values[1]])); // 区/县数据就是一个数组
    picker.setSlotValues(3,myaddress[values[0]][values[1]][values[2]]);
   this.myAddressProvince = values[0];
   this.myAddressCity = values[1];
   this.myAddresscounty = values[2];
   this.myAddresscountyer = values[3];
  }
  },
 
 













     openPicker() {
        this.$refs.picker.open();
      },
    getCamera(){
      console.log(123132131)
    },
    getData() {
      console.log(myaddress);
    },
    loadTop() {
      this.$refs.loadmore.onTopLoaded();
    },
    loadBottom() {
      this.allLoaded = true; // 若数据已全部获取完毕
      this.$refs.loadmore.onBottomLoaded();
    },
    handleConfirm(){
      let data = this.$refs.picker.getValues();
            console.log(this.$refs.picker.getValues())
    },
    test() {
      
      this.$messagebox
        .confirm("确定执行此操作?")
        .then(action => {
          console.log(1234);
        })
        .catch(action => {
          console.log(4321);
        });
      let instance = this.$toast({
        message: "提示一下",
        position: "bottom",
        duration: -1
      });
      setTimeout(() => {
        instance.close();
      }, 2000);
      this.$indicator.open({
        text: "加载中...",
        spinnerType: "triple-bounce"
      });
      setTimeout(() => {
        this.$indicator.close();
      }, 2000);
    }
  }
};
</script>

<style lang="scss" scoped>
* {
  touch-action: none;
}
</style>
