<template>
  <div>
    <div class="common-page-flex">
      <header-default :title="title"></header-default>
      <ul class="commonTab">
        <li>
          <span class="wid80">客户全称：</span>
          <input type="text" class="wid245" v-model="dataList.outnam">
        </li>
        <!-- <li>
          <span class="wid80">客户简称：</span>
          <input type="text" class="wid245" v-model="dataList.deloutnam">
        </li>-->
        <li>
          <span class="wid80">客户编号：</span>
          <input type="text" class="wid245" readonly v-model="dataList.outnum">
        </li>
        <li>
          <span class="wid80">联系人：</span>
          <input type="text" class="wid245" v-model="dataList.conprnnam">
        </li>
        <li>
          <span class="wid80">电话：</span>
          <input type="text" class="wid245" v-model="dataList.conprntel1" @blur="tel">
        </li>
        <li>
          <span class="wid80">收货地区：</span>
          <my-addresss class="wid245"></my-addresss>
        </li>
        <li>
          <span class="wid80">详细地址：</span>
          <input type="text" class="wid245" v-model="dataList.outadr1">
        </li>
        <li>
          <span class="wid80">拼车路线：</span>

          <select-box
            class="wid245"
            id="pinche1"
            ref="reason"
            :selectDataList="Routes"
            @vehtypnams="shows"
          ></select-box>
        </li>
        <li>
          <span class="wid80">承运商：</span>
           <input type="text" class="wid245" readonly v-model="vehgrpnam">
          <!-- <select-box class="wid245" id="pinche2" ref="reason"  :selectDataList="vehgrpnamList"></select-box> -->
        </li>
        <li>
          <span class="wid80">通行车型：</span>
          <select-box class="wid245" id="pinche3" ref="reason" :selectDataList="Vehicletype"></select-box>
        </li>
        <li>
          <span class="wid80">通行时间：</span>
          <p class="selectBox wid80"  @click="openPicker">
            <input
              class="red times"
              type="text"
              readonly
              v-model="beststrtim"
              id="picker-describe-licenceDate"
             
            >
            <img src="@/assets/images/common/selectIcon.png" alt>
          </p>
          <span>&nbsp;至：&nbsp;</span>
          <p class="selectBox wid80" @click="openPickers">
            <input
              class="red times"
              type="text"
              readonly
              v-model="bestendtim"
              id="picker-describe-licenceDate"
              
            >
            <img src="@/assets/images/common/selectIcon.png" alt>
          </p>
        </li>

        <li>
          <div class>
            <span class="min80">整车范围：</span>
            <input type="text" class="wid80" v-model="dataList.whlwgtmin" @input ="clearNoNum(dataList.whlwgtmin,'whlwgtmin')">
            <span class="meter">吨</span>
          </div>
          <div class="marLeft05">
            <span class="min80">至：</span>
            <input type="text" class="wid80" v-model="dataList.whlwgtmax" @blur="wgtmax" @input ="clearNoNum(dataList.whlwgtmax,'whlwgtmax')">
            <span class="meter">吨</span>
          </div>
        </li>
      </ul>
    </div>
    <mt-datetime-picker ref="picker" type="time" v-model="beststrtim" @confirm="handleConfirm"></mt-datetime-picker>
    <mt-datetime-picker ref="picker1" type="time" v-model="bestendtim" @confirm="handleConfirms"></mt-datetime-picker>
    <div class="common-bottom-button bottom-button-fixed" @click="Submission">提交</div>
  </div>
</template>

<script>
import HeaderDefault from "@/components/common/HeaderDefault";
import MyAddresss from "@/components/common/MyAddress";
import SelectBox from "@/components/common/SelectBox";

export default {
  name: "carManage",
  components: { HeaderDefault, MyAddresss, SelectBox },
  data() {
    return {
      Routes: [
        {
          flex: 1,
          values: [],
          textAlign: "center"
        }
      ],
      pickerValue: "02:10",
      pickerValues: "02:10",
      Route: "",
      vehgrpnamList: [
        {
          flex: 1,
          values: [],
          textAlign: "center"
        }
      ],
      vehgrpnamLists: "",
      Vehicletype: [
        {
          flex: 1,
          values: [],
          textAlign: "center"
        }
      ],
      Vehicletypes: "",
      title: "补录客户信息",
      photoTitle: "扫描",
      photoTitles: "拍照",
      vehicleInfo: "",
      vehgrpnam: "",
      vehgrpnum: "",
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
      vehtypnam: "",
      dataList: "",
      trprte: "",
      vehtyp: "",
      licenceDates: "",
      beststrtim: "",
      bestendtim: "",
      salrtes: ""
    };
  },
  mounted() {
    this.getData();
   // this.$root.eventHub.$on("vehtypnams", this.shows);
  },
  methods: {
    getData() {
      this.$loading.open()
      let item = this.$route.query.item;
      this.$route.query.info
        ? (this.title = "客户信息")
        : (this.title = "补录客户信息");
      this.vehgrpnum = item.vehgrpnum;
      // console.log(item);
      let params = {
        outnum: item.deloutnum
      };
      this.$http
        .get("/outlet/getOutletMessage", params).then(res => {
          this.$loading.close();
          let result = res.data;
          this.dataList = result.data;
          console.log(result.data)
          if (result.ret_code == 0) {
            let regions = "无";
            if (
              this.dataList.region &&
              this.dataList.city &&
              this.dataList.county
            ) {
              regions =
                this.dataList.region +
                "/" +
                this.dataList.city +
                "/" +
                this.dataList.county;
            }

            document.getElementsByClassName("myAddress")[0].innerText = regions;

            this.beststrtim = this.dataList.beststrtim
              ? this.dataList.beststrtim
              : "";
            this.bestendtim = this.dataList.bestendtim
              ? this.dataList.bestendtim
              : "";

            this.$http
              .get("/dispatcherStatist/routeDelivery", {})
              .then(res => {
                this.$loading.close();
                let result = res.data;
                this.Route = result.data;
                // console.log(result);
                if (result.ret_code == 0) {
                  let data = [];
                  result.data.forEach((item) => {
                    data.push(item.strloc + " -- " + item.endloc);
                    if (item.trprte == this.dataList.salrte) {
                      this.salrtes = item.strloc + " -- " + item.endloc;
                      document.getElementsByClassName(
                        "currentTag"
                      )[0].innerText = this.dataList.salrte
                        ? this.salrtes
                        : "无";
                    }
                  });

                  this.$set(this.Routes[0], "values", data);
                }
              })
              .catch(() => {
               // this.$toast("数据获取错误！");
              });

            this.$http
              .get("/dispatcherStatist/vehicleGroupsQuery", {})
              .then(res => {
                this.$loading.close();
                let result = res.data;
                this.vehgrpnamLists = result.data;
                // console.log(result);
                if (result.ret_code == 0) {
                  let data = [];
                  result.data.forEach((item) => {
                    data.push(item.vehgrpnam);
                    if (this.vehgrpnum == item.vehgrpnum) {
                      // document.getElementsByClassName(
                      //   "currentTag"
                      // )[1].innerText = item.vehgrpnum ? item.vehgrpnam : "无";
                      this.vehgrpnam = item.vehgrpnam
                    }
                  });
                 // this.$set(this.vehgrpnamList[0], "values", data);
                }
              })
              .catch(() => {
               // this.$toast("数据获取错误！");
              });

               this.$http
        .get("/dispatcherStatist/vehicleScreening", {})
        .then(res => {
          this.$loading.close();
          let result = res.data;
          this.Vehicletypes = result.data;
          if (result.ret_code == 0) {
            let data = [];
            result.data.forEach((item) => {
              data.push(item.vehtypnam);
              if (this.dataList.vehtyp == item.vehtyp) {
                document.getElementsByClassName(
                  "currentTag"
                )[1].innerText = item.vehtyp ? item.vehtypnam : "无";
              }
            });
            this.$set(this.Vehicletype[0], "values", data);
          }
        })
        .catch(() => {
         // this.$toast("数据获取错误！");
        });
          }
        }).catch(() => {
        //  this.$toast("数据获取错误！");
        });

     
    },
    
 clearNoNum(obj,item){ 
    obj = obj.replace(/[^\d.]/g,"");  //清除“数字”和“.”以外的字符  
    obj = obj.replace(/\.{2,}/g,"."); //只保留第一个. 清除多余的  
    obj = obj.replace(".","$#$").replace(/\./g,"").replace("$#$","."); 
    obj = obj.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3');//只能输入两个小数  
    if(obj.indexOf(".")< 0 && obj !=""){//以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额 
        obj= parseFloat(obj); 
    } 
    this.dataList[item] = obj
},
    openPicker() {
      this.$refs.picker.open();
    },
    openPickers() {
      this.$refs.picker1.open();
    },
    wgtmax(){
      if(this.dataList.whlwgtmax/1 <= this.dataList.whlwgtmin/1){
        this.$toast('请填写合适的范围！')
        this.dataList.whlwgtmax = ''
      }
    },
    tel(){
      let value = this.dataList.conprntel1
        if (value === '') {
          //this.$toast('手机号不可为空');
        } else {
          if (value !== '') { 
            var reg =/^((0\d{2,3}-\d{7,8})|(1[3584]\d{9}))$/;
            if(!reg.test(value)){
              this.$toast('请输入有效的手机号码');
              this.dataList.conprntel1=''
            }
          }
        }
    },
    handleConfirm(value) {
      this.beststrtim = value;
      // console.log(value)
      this.$refs.picker.close();
    },
    handleConfirms(value) {
      // console.log(value)
      this.bestendtim = value;
     if(this.bestendtim <= this.beststrtim){
       this.$toast('结束时间不能小于和等于开始时间！')
       this.bestendtim=''

     }
      this.$refs.picker1.close();
    },
    Submission() {
     
      let postion = document.getElementsByClassName("myAddress")[0].innerText;
      let RouteId = document.getElementsByClassName("currentTag")[0].innerText;
      // let vehgrpnumId = document.getElementsByClassName("currentTag")[1]
      //   .innerText;
      let VehicletypeId = document.getElementsByClassName("currentTag")[1]
        .innerText;
      this.Route.forEach(element => {
        if (element.strloc + " -- " + element.endloc == RouteId) {
          this.trprte = element.trprte;
          // console.log(this.trprte);
        }
      });
      // this.vehgrpnamLists.forEach(element => {
      //   if (element.vehgrpnam == vehgrpnumId) {
      //     this.vehgrpnum = element.vehgrpnum;
      //     // console.log(this.vehgrpnum);
      //   }
      // });
      this.Vehicletypes.forEach(element => {
        if (element.vehtypnam == VehicletypeId) {
          this.vehtyp = element.vehtyp;
          //   console.log(this.vehtyp);
        }
      });

      let params = {
        outlet: JSON.stringify({
          cpycod: this.dataList.cpycod,
          outnam: this.dataList.outnam,
          outnum: this.dataList.outnum,
          conprnnam: this.dataList.conprnnam,
          conprntel1: this.dataList.conprntel1,
          region: postion.split("/")[0] ? postion.split("/")[0] : "",
          city: postion.split("/")[1] ? postion.split("/")[1] : "",
          county: postion.split("/")[2] ? postion.split("/")[2] : "",
          outadr1: this.dataList.outadr1,
          salrte: this.trprte,
          vehgrpnum: this.vehgrpnum,
          vehtyp: this.vehtyp,
          beststrtim: this.beststrtim,
          bestendtim: this.bestendtim,
          whlwgtmin: this.dataList.whlwgtmin,
          whlwgtmax: this.dataList.whlwgtmax
        })
      };
      if(!this.dataList.outnam || !this.dataList.outnum || !this.dataList.conprnnam || !this.dataList.conprntel1 || params.outlet.region || params.outlet.city || params.outlet.county || !this.dataList.outadr1|| !this.trprte|| !this.vehgrpnum|| !this.vehtyp || !this.beststrtim|| !this.bestendtim|| !this.dataList.whlwgtmin||!this.dataList.whlwgtmax){
        this.$toast('请先完善数据！')
        return
      }
 this.$loading.open();
      this.$http
        .post("/outlet/modifyWhOutlet", params)
        .then(res => {
          this.$loading.close();
          let result = res.data;
          // console.log(result);
          if (result.ret_code == 0) {
            this.$toast(result.msg);
            this.back();
          }else{
             this.$toast(result.msg);
          }
        })
        .catch(() => {
         // this.$toast("数据获取错误！");
        });
    },
    shows(id) {
      this.Route.forEach(element => {
        if (element.strloc + " -- " + element.endloc == id) {
          this.trprte = element.trprte;
          //  console.log(this.trprte);
        }
      });
    },
    photoActive() {
      this.$router.push({
        path: "/vehicleDispatcher/loadingManagement/Photograph"
      });
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
  align-items: center;
  width: 90%;
  padding: 0.1rem 0;
  border-bottom: 1px solid #eee;
}
.commonTab .bottom-b {
  padding: 0 0 0.1rem 0;
}

.wid80 {
  width: 0.8rem;
}
.commonTabtitle {
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: rgba(0, 0, 0, 1);
}

.selectList img {
  margin: 0 0.05rem 0 0.14rem;
}
.widLeft25 {
  margin-left: 0.25rem;
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
.photo {
  width: 1rem;
  height: 1rem;
  margin: 0.02rem auto 0;
}
.marLeft05 {
  margin-left: 0.1rem;
}
.widthIt {
  display: inline-block;
  width: 0.5rem;
  text-align: left;
}
.widLeft {
  margin-left: 0.3rem;
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
   overflow: hidden;
  text-overflow: ellipsis;
 
}
.wid50 {
  width: 0.58rem;
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
