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
    <el-select  v-model="caddress.shi" style="flex: 1;margin-left: 10px" placeholder="请选择市区" 
               @change="getAreaData">
      <el-option
        v-for="item in cityArray"
        :key="item.areacode"
        :label="item.areaname"
        :value="item.areacode">
      </el-option>
    </el-select>
    <el-select  v-model="caddress.qu" style="flex: 1;margin-left: 10px" placeholder="请选择县" 
               @change="onAreaChanged">
      <el-option
        v-for="item in areaArray"
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
    model: {
      prop: 'caddress',
      event: 'change',
    },
    props: {
      caddress: {
        type: Object,
      },
    },
    data() {
      return {
        areaJson: 'address.json',
        addressArray: [],//所有数据
        cityArray: [],
        areaArray: [],
      }
    },
    created() {
      this.getAddressData(data.data);
    },
    mounted(){
        // console.log(data.data)
    },
    methods: {
      getAddressData(data) {
            this.addressArray = data;
            //默认值赋值获取城市数组
            if(this.caddress.sheng){
              for (let ad of that.addressArray) {
                if (ad.areaname === that.caddress.sheng) {
                  this.cityArray = ad.subarea;
                  //---
                  //默认赋值获取区域数组
                  if(this.caddress.shi){
                    for (let area of this.cityArray) {
                      if (area.areaname === this.caddress.shi) {
                        this.areaArray = area.subarea;
                        break;
                      }
                    }
                  }
                }
            }
        }
      },
      //选择省份
      getCityData(val) {
        // console.log("AAA",this.caddress);
        //清空市，和区
        this.caddress.shi='';
        this.caddress.qu='';
        this.$emit('change', this.caddress);//发送改变
        for (let ad of this.addressArray) {
          if (ad.areaname === val) {
            this.cityArray = ad.subarea;
            return
          }
        }
      },
       //选择市份
      getAreaData(val) {
        // console.log("BBB",this.caddress);
        //清空区
        this.caddress.qu='';
        this.$emit('change', this.caddress);//发送改变
        for (let area of this.cityArray) {
          if (area.areaname === val) {
            this.areaArray = area.subarea;
            return
          }
        }
      },
       //选择县份
      //地区数据变动后
      onAreaChanged(val) {
        // console.log("CCC",this.caddress);
        this.$emit('change', this.caddress);//发送改变
      }
    }
  }
</script>
 
<style scoped>
 
</style>