<template>
  <div>
    <div class="common-page-flex">
         <header-default :title="title"></header-default>
      <ul class="commonTab ">
        <li class="photoLine">
          <div class="photoBox input-file">
              <take-photo :title="photoTitle" :poto1="0" class="photo"></take-photo>
          </div>
        </li>
      </ul>
    </div>
    <div class="common-bottom-button bottom-button-fixed">确定</div>
  </div>
</template>

<script>
import TakePhoto from "@/components/common/TakePhoto"
import HeaderDefault from "@/components/common/HeaderDefault"
export default {
  name: "carManage",
  components: {TakePhoto,HeaderDefault},
  data() {
    return {
      photoTitle: '拍照',
      title:"拍照"
    };
  },
  methods: {
    back() {
      this.$router.go(-1);
    }
  }
};
</script>

<style lang="less" scoped>
.common-content-box {
 // margin-bottom: 0.5rem;
}
.carNum {
  width: 0.8rem;
  margin-left: 0.35rem;
}
.photoLine .photoBox{
  text-align: center;
  
  //background: lime;
}
.photoLine .photoBox p{
  width:1rem;
  height:.8rem;
  background: #ccc;
}
.photoLine .photoBox img{
  width:.5rem;
}
.photoLine{
  display: flex;
   flex-flow: row wrap;
}
// .commonTab {
//   display: flex;
//   flex-flow: row wrap;
//   justify-content: space-around;
//   overflow-y: scroll;
//   font-size: 0.16rem;
//   position: fixed;
//   top:0;
//   bottom: .5rem;
// }
.commonTab li {
  display: flex;
  height: auto;
  margin: 0.1rem 0 0 0;
}
.commonTab .bottom-b{
  padding:  0 0 0.1rem 0;
}
.commonTabtitle {
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: rgba(0, 0, 0, 1);
}

.selectList img {
  margin: 0 0.05rem 0 0.14rem;
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

.wid75 {
  width: 0.75rem;
}

.meter {
  margin-left: 0.05rem;
  color: rgba(227, 29, 43, 1);
}
</style>
