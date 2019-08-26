<template>
  <div>
    <header-default :title="title"></header-default>
    <!-- <div class="codeBox">
            <img src="@/assets/images/common/half-star.png" alt="">
            <img src="@/assets/images/common/half-star.png" alt="">
        </div>
    <p class="codeTitle red">破损扫码赔偿</p>-->
    <div class="common-line-one-panel">
      <p>
        <span>赔偿金额：</span>
        <span>{{damagePay}}</span>
        <span class="red">元</span>
      </p>
    </div>
    <ul class="common-content-box">
      <li class="common-content-title bgGray">
        <div>品名规格</div>
        <div>数量</div>
        <div>单价</div>
        <div>金额</div>
      </li>
      <li v-for="(item, index) in tempData" :key="index">
        <div>{{item.artName}}</div>
        <div>{{item.quantity}}</div>
        <div>{{item.price}}</div>
        <div>{{item.totalPrice}}</div>
      </li>
    </ul>
    <div class="driverLine">
      <span>司机服务评价：</span>
      <rating v-if="score"  :cur="score" ref="rated" ></rating>
    </div>
    <textarea name="driverEvalute" class="driverEvalute" @input="textarea(evaluation)" v-model="evaluation" placeholder="输入..."></textarea>
    <div class="common-bottom-button bottom-button-fixed" @click="toSignSettle">提交</div>
  </div>
</template>

<script>
import HeaderDefault from "@/components/common/HeaderDefault";
import Rating from "@/components/common/Rating";
import { setCache, getCache } from "@/config/utils";
import native from "@/native/bridge.js";

export default {
  data() {
    return {
      title: "交货服务",
      tempData: [],
      evaluation: "",
      damagePay: "",
      score:''
    };
  },
  components: { HeaderDefault, Rating },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      let data = getCache("bigTruckDriverList").smallOrder[0].deldocId;
      this.$loading.open();
      let params = {
        docId: data
      };
      this.$http
        .post("/getDamageConfirm", params)
        .then(res => {
          this.$loading.close();
          let result = res.data;

          if (result.ret_code == 0) {
            this.tempData = result.data.damageDetails;
            console.log(this.score);
            this.damagePay = result.data.damagePay;
            this.nextPageStatus = result.data.nextPageStatus;
            setCache("pageIndex",this.nextPageStatus)
            this.evaluation = result.data.evaluation
            this.score = result.data.score?result.data.score:(-1)
            console.log(result);
          }
        })
        .catch(res => {
          // this.$toast("数据获取错误！")
        });
    },
    textarea(value){
      var reg2=/([\u00A9\u00AE\u203C\u2049\u2122\u2139\u2194-\u2199\u21A9-\u21AA\u231A-\u231B\u2328\u23CF\u23E9-\u23F3\u23F8-\u23FA\u24C2\u25AA-\u25AB\u25B6\u25C0\u25FB-\u25FE\u2600-\u2604\u260E\u2611\u2614-\u2615\u2618\u261D\u2620\u2622-\u2623\u2626\u262A\u262E-\u262F\u2638-\u263A\u2640\u2642\u2648-\u2653\u2660\u2663\u2665-\u2666\u2668\u267B\u267F\u2692-\u2697\u2699\u269B-\u269C\u26A0-\u26A1\u26AA-\u26AB\u26B0-\u26B1\u26BD-\u26BE\u26C4-\u26C5\u26C8\u26CE-\u26CF\u26D1\u26D3-\u26D4\u26E9-\u26EA\u26F0-\u26F5\u26F7-\u26FA\u26FD\u2702\u2705\u2708-\u270D\u270F\u2712\u2714\u2716\u271D\u2721\u2728\u2733-\u2734\u2744\u2747\u274C\u274E\u2753-\u2755\u2757\u2763-\u2764\u2795-\u2797\u27A1\u27B0\u27BF\u2934-\u2935\u2B05-\u2B07\u2B1B-\u2B1C\u2B50\u2B55\u3030\u303D\u3297\u3299]|\uD83C[\uDC04\uDCCF\uDD70-\uDD71\uDD7E-\uDD7F\uDD8E\uDD91-\uDD9A\uDDE6-\uDDFF\uDE01-\uDE02\uDE1A\uDE2F\uDE32-\uDE3A\uDE50-\uDE51\uDF00-\uDF21\uDF24-\uDF93\uDF96-\uDF97\uDF99-\uDF9B\uDF9E-\uDFF0\uDFF3-\uDFF5\uDFF7-\uDFFF])|(\uD83D[\uDC00-\uDCFD\uDCFF-\uDD3D\uDD49-\uDD4E\uDD50-\uDD67\uDD6F-\uDD70\uDD73-\uDD7A\uDD87\uDD8A-\uDD8D\uDD90\uDD95-\uDD96\uDDA4-\uDDA5\uDDA8\uDDB1-\uDDB2\uDDBC\uDDC2-\uDDC4\uDDD1-\uDDD3\uDDDC-\uDDDE\uDDE1\uDDE3\uDDE8\uDDEF\uDDF3\uDDFA-\uDE4F\uDE80-\uDEC5\uDECB-\uDED2\uDEE0-\uDEE5\uDEE9\uDEEB-\uDEEC\uDEF0\uDEF3-\uDEF6])|(\uD83E[\uDD10-\uDD1E\uDD20-\uDD27\uDD30\uDD33-\uDD3A\uDD3C-\uDD3E\uDD40-\uDD45\uDD47-\uDD4B\uDD50-\uDD5E\uDD80-\uDD91\uDDC0])/g;


  this.evaluation = this.evaluation.replace(reg2, '');

    },
  
    toSignSettle() {
      let data = getCache("bigTruckDriverList").smallOrder[0].deldocId;
      this.$loading.open();
      let params = {
        docId: data,
        evaluation: this.evaluation,
        scoreDesc: '',
        score: this.$refs.rated.curs,
        type: 0,
        fileName: "WhDeliveryDoc"
      };
      this.$http.post("/setStarScore", params).then(res => {
        this.$loading.close();
        let result = res.data;
        // console.log(result);
        if (result.ret_code == 0) {
          this.$toast(result.msg);
      native.callhandler("showVoice", result.msg, data => {});

           this.$router.replace({
        path: "/bigTruckDriver/unloadConfirm"
      });
        }
      }).catch(res=>{
      native.callhandler("showVoice", "数据获取错误！", data => {});

          this.$toast("数据获取错误！")
      });
     
     }
  }
};
</script>

<style lang="scss" scoped>
.codeBox {
  display: flex;
  justify-content: space-around;
  img {
    width: 1.5rem;
    height: 1.5rem;
  }
}
.codeTitle {
  font-size: 0.15rem;
  height: 0.46rem;
  line-height: 0.46rem;
  text-align: center;
}

.common-line-one-panel p {
  border-top: 1px solid rgba(236, 236, 236, 1);
}

.common-content-box {
  height: 2rem;
  overflow-y: scroll;
}

.common-content-box li div:nth-child(1) {
  width: 40%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: inline-block;
  line-height: 0.48rem;
}
.common-content-box li div:nth-child(2) {
  width: 20%;
}
.common-content-box li div:nth-child(3) {
  width: 20%;
}
.common-content-box li div:nth-child(4) {
  width: 20%;
}

.driverLine {
  display: flex;
  align-items: center;
  padding: 0 0.26rem;
  height: 0.44rem;
  font-size: 0.15rem;
  @include slim-font();
  color: rgba(51, 51, 51, 1);
}

.driverEvalute {
  box-sizing: border-box;
  display: block;
  width: 3.28rem;
  height: 0.6rem;
  padding: 0.05rem;
  margin: 0 auto;
  background: rgba(240, 240, 240, 1);
  border: 1px solid rgba(192, 192, 192, 1);
  border-radius: 0.05rem;
  font-size: 0.15rem;
  @include slim-font();
  color: rgba(153, 153, 153, 1);
}
</style>
