<template>
  <div>
    <div class="common-page-flex">
        <header-default :title="title"></header-default>
      <ul class="commonTab ">
        <li>
            <span class="wid80"> 运费金额：</span>
            <input type="text" class="wid85" v-model="truckOwner">
            <span class="meter">元</span>
        </li>
        <li>
         
            <span class="wid80">预付金额：</span>
            <input type="text" class="wid85" v-model="truckOwner">
            <span class="meter">元</span>
            <span class="widLeft">占比：</span>
            <span class="meter">20%</span>
            
        
        </li>

        <li>
            <span class="wid80">到位金额：</span>
            <input type="text" class="wid85" v-model="personnam">
            <span class="meter">元</span>
            <span class="widLeft">占比：</span>
            <span class="meter">20%</span>
        </li>
        <li>
          <span class="wid80">回单金额：</span>
          <input type="text" class="wid85" v-model="personnam">
            <span class="meter">元</span>
            <span class="widLeft">占比：</span>
            <span class="meter">20%</span>
        </li>
        <li>
          
            <span class="wid80">开户行：</span>
            <input type="text" class="wid85" :value="nowLoadWeight">
          
          
            <span class="wid50 widLeft25">户名：</span>
            <input type="text" class="wid85" :value="nowLength">
        
        </li>
        <li>
          <span class="wid80">账号：</span>
          <input type="text" class="wid245" v-model="engineNumber">
        </li>
        <li>
          <span class="wid80">油卡充值：</span>
          <input type="text" class="wid85" v-model="personnam">
            <span class="meter">元</span>
            <span class="widLeft">占比：</span>
            <span class="meter">20%</span>
        </li>
        <li>
          <span class="wid80">油卡公司：</span>
          <input type="text" class="wid245" v-model="engineNumber">
        </li>
        <li>
          <span class="wid80">油卡号吗：</span>
          <input type="text" class="wid245" v-model="engineNumber">
        </li>
          <li>
            <span class="wid80"> 运价申请：</span>
            <input type="text" class="wid85" v-model="truckOwner">
            <span class="meter">元/吨</span>
        </li>
          <li>
            <span class="wid80"> 标准运价：</span>
            <input type="text" class="wid85" v-model="truckOwner">
            <span class="meter">元/吨</span>
        </li>
         <li>
          <div class="">
            <span class="min80">上浮运价：</span>
            <input type="text" class="wid50" :value="nowWidth">
            <span class="meter">元</span>
          </div>
          <div class="marLeft05">
            <span class="min80">下调运价：</span>
            <input type="text" class="wid50" v-model="nowHeight">
            <span class="meter">元</span>
          </div>
        </li>
        
      </ul>
    </div>
    <div class="common-bottom-button bottom-button-fixed">确定</div>
  </div>
</template>

<script>
import HeaderDefault from "@/components/common/HeaderDefault"
export default {
  name: "carManage",
  components: { HeaderDefault },
  data() {
    return {
        title:"付费调价",
      photoTitle: '扫描',
      photoTitles:"拍照",
      vehicleInfo: "",
      mobile: "", //司机手机号
      personnam: "", //司机名称
      type: "", //提交类型（“1”:保存；“2”:更新；“3”:删除。）
      licenceDate: "", //上牌日期
      imgUploadInput: "", //逗号隔开base64的图片流
      truckOwner: "", //车主
      ownerMobile: "", //车主电话
      engineNumber: "", //发动机号
      frameNumber: "", //车架号
      vehlicnum: "", //车牌号
      nowWidth: "", //车宽
      nowHeight: "", //车高
      nowLoadWeight: "",
      nowLength: "",
      vehtypnam: ""
    };
  },
  methods: {
    photoActive(){
      this.$router.push({
         path: "/vehicleDispatcher/loadingManagement/Photograph"
      })
    },
    back() {
      this.$router.go(-1);
    }
  }
};
</script>

<style lang="less" scoped>
.common-content-box {
  padding-bottom: 0.5rem;
}
.carNum {
  width: 0.8rem;
  margin-left: 0.35rem;
}

.commonTab {
  display: flex;
  flex-flow: row wrap;
  justify-content: space-around;
  overflow-y: scroll;
  font-size: 0.16rem;
  padding-bottom: 0.5rem;
 
}
.commonTab li {
  display: flex;
  height: auto;
  align-items:center;
  width:90%;
  padding: 0.1rem 0;
  border-bottom: 1px solid #eee;
}
.commonTab .bottom-b{
  padding:  0 0 0.1rem 0;
}

.wid80{
width:.8rem;
}
.commonTabtitle {
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: rgba(0, 0, 0, 1);
}

.selectList img {
  margin: 0 0.05rem 0 0.14rem;
}
.widLeft25{
    margin-left:.25rem;
}
.selectList .weight {
  flex-grow: 1;
}

.selectList .vehlicnum {
  width: 0.8rem;
}

/* tab3 */
.con3TabDiv .photoLine {
  height: 2.35rem;
  flex-wrap: wrap;
  justify-content: space-between;
}

.photoLine .photoBox {
  width: 1.57rem;
  height: 1.1rem;
}

.con3TabDiv li .disFlex {
  display: flex;
  align-items: center;
}
.photo{
  width: 1rem;
  height: 1rem;
  margin: .02rem auto 0;
}
.marLeft05 {
  margin-left: 0.1rem;
}
.widthIt{
  display: inline-block;
  width:.5rem;
  text-align: left;
}
.widLeft {
    margin-left: .3rem;
}
.wid85 {
  width: 0.85rem;
}

.wid135 {
  width: 1.35rem;
}

.wid275 {
  width: 2.75rem;
}

.min75 {
  min-width: 0.75rem;
  text-align: left;
}

.wid245 {
  width: 2.45rem;
}
.wid50 {
  width: .58rem;
}
.wid75 {
  width: 0.75rem;
}

.commonTab li .meter {
  margin-left: 0.05rem;
  color: rgba(227, 29, 43, 1);
  display: inline;
}
</style>
