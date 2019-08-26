<template>
  <div>
    <header-default :title="title"></header-default>
    <div @click="selectedDes">
      <rating ref="rate" v-if="score" :cur="score"></rating>
    </div>
    <!-- <p class="description">{{nowCur}}</p> -->
    <div class="label">
      <span
        v-for="(item, index) in labels"
        :key="index"
        @click="selectLabel(index)"
        :class="nowSelLabel==index?'active':''"
      >{{item.desc}}</span>
    </div>
    <textarea name="service" class="service" v-model="evaluation" placeholder="输入..."></textarea>
    <div class="common-bottom-button bottom-button-fixed" @click="commit">提交</div>
  </div>
</template>

<script>
import HeaderDefault from "@/components/common/HeaderDefault";
import Rating from "@/components/common/Rating";
import { setCache, getCache } from "@/config/utils";

export default {
  components: { HeaderDefault, Rating },
  data() {
    return {
      title: "服务评价",
      nowCur: "",
      score:'',
      // curList: [
      //   "怎么回事，小老弟",
      //   "行不行啊，兄dei",
      //   "just so so",
      //   "你可真棒",
      //   "非常满意，无可挑剔"
      // ],
      number: "",
      numbers: [1, 2, 3, 4, 5],
      labels: [],
      nowSelLabel:-1,
      evaluation: ""
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    selectedDes() {
      // this.nowCur = this.curList[this.$refs.rate.curs - 1];
       this.number = this.numbers[this.$refs.rate.curs - 1];
       this.score = this.number
    },
    selectLabel(index) {
      this.nowSelLabel = index;
    },
    commit() {
console.log(this.score)
console.log(this.nowSelLabel)

if(!this.score||this.nowSelLabel==-1){
         window.instance ? window.instance.close() : "";
          window.instance = this.$toast('请评价！');
      }else{

      
      let data = getCache("bigTruckDriverList").docId;
      this.$loading.open();
      let params = {
        docId: data,
        evaluation:  this.evaluation,
        scoreDesc:this.labels[this.nowSelLabel].num ,
        score: this.score,
        type: 0,
        fileName: "WhShipmentDoc"
      };
      this.$http.post("/setStarScore", params).then(res => {
        this.$loading.close();
        let result = res.data;
        // console.log(result);
        if (result.ret_code == 0) {
          this.$toast(result.msg);
          this.$router.replace({
            path: "/bigTruckDriver/loadWork"
          });
        }
      })
      }
    },
    getData(){
        let data = getCache("bigTruckDriverList").docId;
      this.$loading.open();
      let params = {
        docId: data,
        fileName: "WhShipmentDoc"
      };
      this.$http.post("/getStarScore", params).then(res => {
        this.$loading.close();
        let result = res.data;
        console.log(result.data);
        if (result.ret_code == 0) {
        this.labels=result.data.list
         this.score = result.data.score
        //  this.number = result.data.score
         this.nowSelLabel = result.data.scoreDesc-1
         this.evaluation = result.data.evaluation
          window.instance ? window.instance.close() : "";
          window.instance = this.$toast(result.msg);
        } else {
          window.instance ? window.instance.close() : "";
          window.instance = this.$toast(result.returnInfo);
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.description {
  color: $red;
  font-size: 0.13rem;
  text-align: center;
  @include slim-font();
  margin-bottom: 0.15rem;
}

.label {
  @include flex(row);
  justify-content: space-around;
  align-items: center;
  span {
    width: 0.94rem;
    height: 0.32rem;
    line-height: 0.32rem;
    text-align: center;
    color: rgba(102, 102, 102, 1);
    font-size: 0.15rem;
    @include normal-font();
    background: rgba(249, 249, 249, 1);
    border: 1px solid rgba(192, 192, 192, 1);
    border-radius: 0.05rem;
  }
  .active {
    @include redPanel(0.94rem);
  }
}
.service {
  box-sizing: border-box;
  display: block;
  width: 3.41rem;
  height: 0.99rem;
  padding: 0.05rem;
  margin: 0.21rem auto 0;
  background: rgba(240, 240, 240, 1);
  border: 1px solid rgba(192, 192, 192, 1);
  border-radius: 0.05rem;
  font-size: 0.15rem;
  @include slim-font();
  color: rgba(153, 153, 153, 1);
}
</style>
