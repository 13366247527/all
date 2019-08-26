<template>
  <div>
    <header-default :title="title"></header-default>
    <div class="shopTest">
      <ul>
        <li class="testqu">
          <span class="text">生产商：</span>
          <span>{{cpycodNum}}</span>
        </li>
        <li class="common-content-title">
          <div @click.stop="allSelected" class="checked">
            <img v-if="isCheckedAll" src="@/assets/images/common/checked.png">
            <img v-else src="@/assets/images/common/check.png">
          </div>
          <div>库位</div>
          <div>品名规格</div>
          <div>数量(箱)</div>
          <div>生产日期</div>
        </li>
        <li v-for="(item, index) in tempData" :key="index" class="tempData">
          <div @click.stop="changeStatus(index)" class="checked">
            <img
              v-if="orderStatusLists.indexOf(index)>=0||isCheckedAll"
              src="@/assets/images/common/checked.png"
            >
            <img v-else src="@/assets/images/common/check.png">
          </div>
          <div>
            <span>{{item.binName}}</span>
          </div>
          <div>
            <span class="img">
              <img :src="item.artUrl" alt class="picPathBox">
            </span>
            <span class="text">{{item.artName}}</span>
          </div>
          <div>
            <span>{{item.box}}</span>
          </div>
          <div>
            <span>{{item.time | formatDate}}</span>
          </div>
        </li>
        <li class="total">
          <span>合计：</span>
          <span>{{boxnum}}</span>
          <span>箱</span>
        </li>
      </ul>
      <mt-popup v-model="popupVisible" class="mint-popup">
        <ul class="mint-popup-ul">
          <li class="mint-popup-text" v-if="nowIndex==0">
            <p>请确定是否隔离！</p>
          </li>
          <li class="mint-popup-text" v-if="nowIndex==1">
            <p>请确定是否放行！</p>
          </li>
          <li class="mint-popup-tab">
            <span
              v-for="(v,i) in tabText"
              :key="i"
              :class="textIndex==i?'textred':''"
              class="tab"
              @click="isOk(i,nowIndex)"
            >{{v}}</span>
          </li>
        </ul>
      </mt-popup>
    </div>
    <div class="btnchange">
      <span v-for="(itme,index) in btnchang" :key="index" @click="btnclick(index)">{{itme}}</span>
    </div>
  </div>
</template>

<script>
import HeaderDefault from "@/components/common/HeaderDefault";
import native from "@/native/bridge.js";

export default {
  name: "intgoodTestShow",
  inject: ["reload"], //页面刷新
  data() {
    return {
      title: "来货货品详情",
      tempData: [],
      isCheckedAll: false,
      btnchang: ["隔离", "放行"],
      orderStatusLists: [],
      boxnum: 0, //箱数
      cpycodNum: "", //生产商
      list: [], //后台数据
      popupVisible: false,
      tabText: ["取消", "确定"],
      nowIndex: 0, //判断是隔离/放行
      textIndex: 1 //默认为确定
    };
  },
  components: {
    HeaderDefault
  },
  mounted() {
    this.getdata();
  },
  methods: {
    //全选
    allSelected() {
      this.isCheckedAll = !this.isCheckedAll;
      if (this.isCheckedAll) {
        for (let i = 0; i < this.tempData.length; i++) {
           this.orderStatusLists.push(i);
        }
      } else {
        this.orderStatusLists = [];
      }
    },
    //单选
    changeStatus(index) {
      let idIndex = this.orderStatusLists.indexOf(index);
      if (idIndex >= 0) {
        this.orderStatusLists.splice(idIndex, 1);
        this.isCheckedAll = false;
      } else {
        this.orderStatusLists.push(index);
        if (this.orderStatusLists.length == this.tempData.length) {
          this.isCheckedAll = true;
        }
      }
    },
    //获取后台数据
    getdata() {
      this.$loading.open();
      let params = {
         ids :this.$route.query.ids
       }
        this.$http.post('wms/product/control/detail',params).then(res=>{
           console.log(res)
            this.$loading.close();
           if(res.data.ret_code == '0'){
             this.boxnum = res.data.data.totalBox
             this.cpycodNum = res.data.data.producer
             this.tempData = res.data.data.infos
             this.list = res.data.data.infos
           }
        })
    },
    //隔离----放行
    btnclick(index) {
      //隔离
      if (index == 0) {
        if (this.orderStatusLists.length > 0) {
          this.nowIndex = 0;
          this.popupVisible = true;
          console.log(this.orderStatusLists)
        } else {
          this.$toast("请先勾选商品！");
          native.callhandler("showVoice", "请先勾选商品！");
        }
      }
      //放行
      if (index == 1) {
        if (this.orderStatusLists.length > 0) {
          this.nowIndex = 1;
          this.popupVisible = true;
           console.log(this.orderStatusLists)
        } else {
          this.$toast("请先勾选商品！");
          native.callhandler("showVoice", "请先勾选商品！");
        }
      }
    },
    //确定----取消
    isOk(i, nowIndex) {
      if (i == 1 && nowIndex == 0) {
        this.popupVisible = false;
        let fxlist = ""
            for (let i = 0; i < this.orderStatusLists.length; i++) {
                if(this.orderStatusLists.length == 1){
                    fxlist += this.tempData[this.orderStatusLists[i]].id
                }else{
                  if(i == this.orderStatusLists.length-1 ){
                      fxlist += this.tempData[this.orderStatusLists[i]].id
                   }else{
                     fxlist += this.tempData[this.orderStatusLists[i]].id+","
                   }
                } 
            } 
            let params = {
              ids:fxlist,
              type:1     //1-隔离；2-放行
            }
           console.log(fxlist)
            this.$http.post('wms/product/control/operation',params).then(res=>{
               console.log(res)
               if (res.data.ret_code == 0) {
                    this.reload()//页面刷新
				        }
            })
      } else if (i == 1 && nowIndex == 1) {
        this.popupVisible = false;
        let fxlist = ""
            for (let i = 0; i < this.orderStatusLists.length; i++) {
                if(this.orderStatusLists.length == 1){
                    fxlist += this.tempData[this.orderStatusLists[i]].id
                }else{
                  if(i == this.orderStatusLists.length-1 ){
                      fxlist += this.tempData[this.orderStatusLists[i]].id
                   }else{
                     fxlist += this.tempData[this.orderStatusLists[i]].id+","
                   }
                } 
            } 
            let params = {
              ids:fxlist,
              type:2     //1-隔离；2-放行
            }
           console.log(fxlist)
            this.$http.post('wms/product/control/operation',params).then(res=>{
               console.log(res)
               if (res.data.ret_code == 0) {
                    this.reload()//页面刷新
				        }
            })
      } else {
        this.popupVisible = false;
        this.orderStatusLists = [];
        this.isCheckedAll = false;
      }
    }
  },
  filters: {
			//转换日
			formatDate: function (value) {
				if(value){
					let a =  parseInt(value)
					let date = new Date(a);
          var n = date.getFullYear();
          var y = date.getMonth()+1;
          var r = date.getDate(); 
					return n+"-"+y+"-"+r 		
				}
			}
	}
};
</script>

<style lang="scss" scoped>
.tabbarContainer {
  @include tabbar(3.43rem, 1.15rem);
}
.shopTest {
  padding: 10px 0.16rem;
  position: relative;
  height: 100%;
}
.shopTest ul {
  margin-bottom: 1.01rem;
}
.shopTest ul li {
  display: flex;
  font-size: 15px;
  color: #333333;
  padding: 0.14rem 0.09rem;
  border-bottom: solid 1px #d9d9d9;
  align-items: center;
}
.shopTest ul li:nth-of-type(1) {
  padding: 0.1rem 0.09rem;
  display: flex;
  align-items: center;
}
.shopTest ul li img {
  width: 0.15rem;
  height: 0.15rem;
}
.shopTest li div:nth-of-type(2) {
  width: 15%;
  text-align: center;
}
.shopTest li div:nth-of-type(3) {
  width: 30%;
  text-align: center;
}
.shopTest li div:nth-of-type(4) {
  width: 18%;
  text-align: center;
}
.shopTest li div:nth-of-type(5) {
  width: 27%;
  text-align: center;
}
.num {
  margin-left: 0.14rem;
}
.shopTest ul li .checked {
  width: 10%;
  text-align: center;
}
.shopTest ul .common-content-title {
  padding: 0.15rem 0.02rem;
  justify-content: space-between;
  color: #000000;
  font-weight: 600;
  border: none;
  background: #f1f1f0;
}

.shopTest .tempData {
  padding: 0.15rem 0.02rem;
  justify-content: space-between;
}
.tempData div:nth-of-type(3) {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.img {
  display: block;
  width: 0.8rem;
  height: 0.45rem;
  background: rgba(224, 224, 224, 1);
  line-height: 0.42rem;
}
.img .picPathBox {
  width: 0.55rem;
  height: 0.35rem;
}
.tempData .text {
  font-size: 0.12rem;
  padding-top: 0.02rem;
  width: 100%;
  display: inline-block;
  word-break: break-all;
  /*overflow:hidden;
		  text-overflow:ellipsis;
		  white-space:nowrap;*/
}
.shopTest ul .total {
  display: flex;
  justify-content: flex-start;
  border: none;
  color: #e31d2b;
  width: 100%;
  position: fixed;
  bottom: 0.48rem;
  left: 0rem;
  font-size: 15px;
  font-weight: 600;
  display: flex;
  background: #ffffff;
  padding-left: 0.3rem;
}
.shopTest .total span:nth-of-type(2) {
  margin: 0 0.1rem;
}
.btnchange {
  width: 100%;
  position: fixed;
  bottom: 0rem;
  left: 0rem;
  display: flex;
}
.btnchange span {
  flex: 1;
  text-align: center;
  font-size: 17px;
  padding: 0.15rem 0.43rem;
  color: #ffffff;
}
.btnchange span:nth-of-type(1) {
  background: #e31d2b;
}
.btnchange span:nth-of-type(2) {
  background: #ff7f00;
}
.btnchange span:nth-of-type(3) {
  background: #ffba00;
}
.shopTest .mint-popup {
  border-radius: 0.05rem;
}
.shopTest .mint-popup-ul {
  width: 3rem;
  margin-bottom: 0rem;
}
.shopTest .mint-popup-ul .mint-popup-text {
  justify-content: center;
  padding: 0.45rem 0.6rem;
  font-size: 0.16rem;
  font-weight: 500;
  border-bottom: solid 1px #ececec;
}
.shopTest .mint-popup-ul .mint-popup-tab {
  display: flex;
  justify-content: center;
  padding: 0rem 0rem;
  border-bottom: none;
}
.mint-popup-tab .tab {
  display: block;
  width: 1.5rem;
  text-align: center;
  font-size: 0.16rem;
  font-weight: 500;
  padding: 0.15rem 0rem;
}
.shopTest .mint-popup-ul .mint-popup-tab .textred {
  background: #e31d2b;
  border-radius: 0 0 0.05rem 0;
}
</style>

