<template>
     <div class="common-page-flex">
          <header-default :title="title"></header-default>
                    <div class="tab pageFlex">
                        <div class="commonTabDiv pd48">
                            <ul class="commonTab common-content-box">
                                <li class="selectList" v-for="(item, index) in dataList" @click.stop="changeTimeSelectStatus(index)"
                                    :key="item.id">
                                    <template v-if="timeStatus == index">
                                        <img src="@/assets/images/common/checked.png" alt="">
                                    </template>
                                    <template v-else>
                                        <img src="@/assets/images/common/check.png" alt="">
                                    </template>
                                    <span>{{item.selval}}</span>
                                </li>
                            </ul>
                        </div>
        </div>
        <div class="common-bottom-button bottom-button-fixed">确定</div>
    </div>
</template>

<script>
import HeaderDefault from "@/components/common/HeaderDefault";
export default {
  name: "carManage",
components: { HeaderDefault },
   data() {
        return {
            showCar:"",
            title:"车队选择",
            dataList:[],
            timeStatus:null,

           
        }
    },
    mounted() {
        this.getData();
    },
  methods: {
     changeTimeSelectStatus(index){
            this.timeStatus = index
            
        },
        getData(){
            let data = this.$route.query.index
            this.showCar = data
            console.log(data)
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
  overflow-y: scroll;
  display: flex;
  flex-flow: row wrap;
  font-size: .16rem;
  height: -webkit-fill-available;
}
.common-content-box li {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  width: 100%;
  //justify-content:center;
  //padding-left:1rem;
  border-bottom: 1px solid #ececec;
}
.selectList{
    padding-left:.3rem;
}
b{
    color: red;
}
.tel{
    margin-left:.6rem;
}
.common-content-box li span {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: center;
  height: .46rem;
  text-align: center;
  font-size: .16rem;
  word-break: break-all;
}


.commonTab img {
    width: .15rem;
    height: .15rem;
    margin: 0 .1rem 0 .1rem;
}

.commonTab li:first-of-type{
    font-family: SourceHanSansCN-Regular;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
}

</style>
