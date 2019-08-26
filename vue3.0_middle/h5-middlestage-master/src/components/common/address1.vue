<template>
  <div style="display: flex">
    <el-select  v-model="caddress.sheng" style="flex: 1;" placeholder="请选择省份"  @change="getCityData">
      <el-option
        v-for="item in addressArray"
        :key="item.areacode"
        :label="item.areaname"
        :value="item.areacode"
      >
      </el-option>
    </el-select>
    <el-select  v-model="caddress.shi" style="flex: 1;margin-left: 10px" placeholder="请选择市" 
               @change="getAreaData">
      <el-option
        v-for="item in cityArray"
        :key="item.areacode"
        :label="item.areaname"
        :value="item.areacode">
      </el-option>
    </el-select>
  </div>
</template>
 
<script>
 import data from "./address.json";
  export default {
    //通过 model 选项配置子组件接收的 prop 名以及派发的事件名
    // model: {
    //   prop: 'caddress',
    //   event: 'change',
    // },
    props: {
      caddress: {
        type: Object,
      },
    },
    data() {
      return {
        areaJson: 'address.json',
        addressArray: [],//所有数据
        cityArray: [],//市数据
        areaArray: [],
        addressobj:{},//省市对象数据
      }
    },
    created(){
       this.caddress.shi = ''
    },
    mounted() {
        let _this=this;
        let {caddress}=_this._props;
        setTimeout(()=>{
           //获取省数据
            this.addressArray = data.data
           //获取市数据
            if(this.caddress){
                for (let ad of this.addressArray) {
                      if (ad.areacode === caddress.sheng) {
                        this.cityArray = ad.subarea;
                      }
                }
            }
        },100)
   },
    methods: {
      // getAddressData(data) {
      //       this.addressArray = data;
      //       //默认值赋值获取城市数组
      //       if(this.caddress.sheng){
      //         for (let ad of this.addressArray) {
      //           if (ad.areacode === this.caddress.sheng) {
      //             this.cityArray = ad.subarea;
      //             console.log( this.cityArray)
      //           }
      //         }
      //       }
      // },
      //选择省份
      getCityData(val) {
        //清空市，和区
        this.caddress.shi='';
        // this.$emit('change', this.caddress);//发送改变
        for (let ad of this.addressArray) {
          if (ad.areacode === val) {
            this.cityArray = ad.subarea;
            return
          }
        }
      },
      //选择市份 数据变动后
      getAreaData(val) {
        // console.log("CCC",this.caddress);
        this.$emit('change', this.caddress);//发送改变
      }
    }
  }
</script>
 
<style scoped>
 
</style>