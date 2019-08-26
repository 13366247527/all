<template>
  <div>
    <div class="common-page-flex">
        <header-default :title="title"></header-default>
      <ul class="commonTab ">
     
        <li>
          <span class="wid80">客户全称：</span>
          <input type="text" class="wid245" v-model="engineNumber">
        </li>
        <li>
          <span class="wid80">客户简称：</span>
          <input type="text" class="wid245" v-model="engineNumber">
        </li><li>
          <span class="wid80">客户编号：</span>
          <input type="text" class="wid245" v-model="engineNumber">
        </li><li>
          <span class="wid80">联系人：</span>
          <input type="text" class="wid245" v-model="engineNumber">
        </li><li>
          <span class="wid80">电话：</span>
          <input type="text" class="wid245" v-model="engineNumber">
        </li><li>
          <span class="wid80">收货地区：</span>
          <my-addresss class="wid245"></my-addresss>
        </li><li>
          <span class="wid80">详细地址：</span>
          <input type="text" class="wid245" v-model="engineNumber">
        </li>
        <li>
          <span class="wid80">拼车路线：</span>
          <input type="text" class="wid245" v-model="engineNumber">
        </li>
        <li>
          <span class="wid80">承运商：</span>
          <input type="text" class="wid245" v-model="engineNumber">
        </li>
        <li>
          <span class="wid80">通行车型：</span>
          <input type="text" class="wid245" v-model="engineNumber">
        </li>
        <li>
          <span class="wid80">通行时间：</span>
          <input type="text" class="wid245" v-model="engineNumber">
        </li>
       
         <li>
          <div class="">
            <span class="min80">整车范围：</span>
            <input type="text" class="wid80" :value="nowWidth">
            <span class="meter">吨</span>
          </div>
          <div class="marLeft05">
            <span class="min80">至：</span>
            <input type="text" class="wid80" v-model="nowHeight">
            <span class="meter">吨</span>
          </div>
        </li>
        
      </ul>
    </div>
    <div class="common-bottom-button bottom-button-fixed">提交</div>
  </div>
</template>

<script>
import HeaderDefault from "@/components/common/HeaderDefault"
import MyAddresss from "@/components/common/MyAddress"

export default {
  name: "carManage",
  components: { HeaderDefault,MyAddresss },
  data() {
    return {
        title:"补录客户信息",
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
      nowWidth: "1234", //车宽
      nowHeight: "12345", //车高
      nowLoadWeight: "",
      nowLength: "",
      vehtypnam: ""
    };
  },
  methods: {
    photoActive(){
      this.$router.push({
         path: "/dispatchStatistician/loadingManagement/Photograph"
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
