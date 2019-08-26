<template>
  <div>
      <header-default :title="title"></header-default>
    <div class="common-page-flex">
      
      <ul class="common-content-box">
        <li class="common-content-li" v-for="(item, index) in dataList" :key="index">
          <button @click.stop="Detail(item.outnum,index)" :title="item.outnam" :id="active==index?'act':''">{{item.outnam}}</button>
        </li>
      </ul>
      <ul class="common-content-box">
        <li class="common-content-title">
          <div>品名规格</div>
          <div>数量</div>
          <div>重量</div>
        </li>

        <li v-for="(item, index) in dataLists" :key="index">
          <div>
            <span class="">{{item.artminnam}}</span>
          </div>
          <div>
            <span>{{item.shpartqty}}</span>
          </div>
          <div>
            <span>{{item.artwgt}}</span>
          </div>
        </li>
        <li class="red">
          <div>合计</div>
          <div>{{shpartqtys}}</div>
          <div>{{artwgts}}</div>
        </li>
      </ul>
    </div>
    <!-- <div class="common-bottom-button bottom-button-fixed">确定</div> -->
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
      shpartqtys:'',
      artwgts:'',
      title: "客户装运单货品明细",
      dataList: [],
      dataLists:[]
    };
  },mounted() {
       this.getData()
       
    },
  methods: {
    getData(){
      
       let id = this.$route.query.id;
            let params = {
                id:id
            }
             this.$http.get("/dispatcherStatist/details_outlet",params)
        .then(res => {
         // console.log(res)
         this.dataList =res.data.data
         this.Detail(this.dataList[0].outnum,0)
        })
        .catch(res => {
          console.log(res);
        });
    },
    Detail(outnum,index) {
      let id = this.$route.query.id;
      this.active = index;
            let params = {
                outnum:outnum,
                id:id
            }
             this.$http.get("/dispatcherStatist/detailsByoutnum",params)
        .then(res => {
          let shpartqtys = null
          let artwgts = null
         this.dataLists =res.data.data
         this.dataLists.forEach((item,index)=>{
           shpartqtys +=item.shpartqty/1
           artwgts += item.artwgt/1
         })
         this.artwgts = artwgts.toFixed(2)
         this.shpartqtys = shpartqtys

        })
        .catch(res => {
          console.log(res);
        });
    },
    back() {
      this.$router.go(-1);
    }
  }
};
</script>

<style lang="less" scoped>
.common-page-flex{
    padding-bottom: .5rem;
    overflow-y: scroll;
}
.common-content-box {
  display: flex;
  flex-flow: row wrap;
  //justify-content: space-around;
  text-align: center;
  div{
        display: inline-block;
  }
}
.common-content-box button {
  background: rgb(247, 244, 244);
  border: 1px solid #ccc;
  border-radius: 0.05rem;
  padding: 0.02rem;
  font-size: 0.16rem;
  width: 0.8rem;
  font-family: SourceHanSansCN-Regular;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.common-content-li {
  border: 0;
  margin-top:.1rem;
  width:25%;

}
#act {
  background: red;
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

.commonTabtitle {
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: rgba(0, 0, 0, 1);
}
.common-content-box .common-content-title {
  background: #eee;
  height:.4rem;
  margin-top:.1rem;
}

.common-content-box .common-content-title div {
  width: 33.3%;
  
  
}

.common-content-box div {
  width: 33.3%;
  height:.4rem;
  line-height: .4rem;
  overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.commonTab li {
  padding: 0.1rem;
}
</style>
