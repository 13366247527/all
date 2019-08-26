<template>
  <div>
    <div class="common-page-flex">
      <ul class="commonTab">
        <li class="photoLine">
          <div class="photoBox input-file">
            <take-photo :title="photoTitle" :poto1="0" :flag='1' class="photo"></take-photo>
          </div>
          <div class="photoBox input-file">
            <take-photo :title="photoTitles" :poto1="0" :flag='1' class="photo"></take-photo>
          </div>
        </li>
        <li>
          <div class="disFlex">
            <span>车牌：</span>
            <input type="text" class="wid85" placeholder="例：京" v-model="vehli">
          </div>
          <div class="disFlex marLeft05">
            <span></span>
            <input type="text" class="wid184" v-model="vehnum">
          </div>
        </li>
        <li>
          <div class="disFlex">
            <span>车主：</span>
            <input type="text" class="wid85" v-model="truckOwner">
          </div>
          <div class="disFlex marLeft05">
            <span>电话：</span>
            <input
              type="text"
              class="wid135"
              v-model="ownerMobile"
              @blur="tel(ownerMobile,'ownerMobile')"
            >
          </div>
        </li>

        <li>
          <div class="disFlex">
            <span>司机：</span>
            <input type="text" class="wid85" v-model="personnam">
          </div>
          <div class="disFlex marLeft05">
            <span>电话：</span>
            <input type="text" class="wid135" v-model="mobile" @blur="tel(mobile,'mobile')">
          </div>
        </li>
        <li>
          <span>车型：</span>
          <p class="selectBox wid275">
            <!-- <input
              class="red"
              type="text"
              readonly
              v-model="vehtypnam"
              id="picker-describe-vehtypnam"
            >-->
            <select-box class="wid198" ref="reason" :selectDataList="dataList" @vehtypnams="shows"></select-box>
          </p>
        </li>
        <li>
          <span>发动机号：</span>
          <input type="text" class="wid245" v-model="vehtypnam">
        </li>
        <li>
          <span class="min75">车架号：</span>
          <input type="text" class="wid245" v-model="frameNumber">
        </li>
        <li>
          <div>
            <span class="min75 widthIt">载重量：</span>
            <input type="text" class="wid75"  readonly v-model="nowLoadWeight">
            <span class="meter">吨</span>
          </div>
          <div class="disFlex marLeft05">
            <span class="min75 disFlex">车长：</span>
            <input type="text" class="wid75" readonly v-model="nowLength">
            <span class="meter">米</span>
          </div>
        </li>
        <li>
          <div class="disFlex">
            <span class="min75 widthIt">车宽：</span>
            <input type="text" class="wid75" readonly v-model="nowWidth">
            <span class="meter">米</span>
          </div>
          <div class="disFlex marLeft05">
            <span class="min75 disFlex">车高：</span>
            <input type="text" class="wid75" readonly v-model="nowHeight">
            <span class="meter">米</span>
          </div>
        </li>

        <li class="bottom-b">
          <span>上牌日期：</span>
          <p class="selectBox wid245">
            <input
              class="red"
              type="text"
              readonly
              v-model="licenceDate"
              id="picker-describe-licenceDate"
              @click="openPicker"
            >
            <img src="@/assets/images/common/selectIcon.png" alt>
          </p>
        </li>
      </ul>
    </div>
    <mt-datetime-picker
      ref="picker"
      type="date"
      year-format="{value} 年"
      month-format="{value} 月"
      date-format="{value} 日"
      v-model="pickerValue"
      @confirm="handleConfirm"
    ></mt-datetime-picker>
    <div class="common-bottom-button bottom-button-fixed" @click="Determine">确定</div>
  </div>
</template>

<script>
import TakePhoto from "@/components/common/TakePhoto";
import SelectBox from "@/components/common/SelectBox";
import { setCache, getCache } from "@/config/utils";

export default {
  name: "carManage",
  components: { TakePhoto, SelectBox },
  data() {
    return {
      photoTitle: "扫描",
      photoTitles: "拍照",
      vehicleInfo: "",
      pickerValue: "",
      mobile: "", //司机手机号z
      personnam: "", //司机名称
      type: "", //提交类型（“1”:保存；“2”:更新；“3”:删除。）
      licenceDate: "", //上牌日期
      imgUploadInput:
        "http://192.144.172.42/group1/M00/01/04/rBUAB1xuZZuAVlwUAAA43XTB3D4911.jpg,http://192.144.172.42/group1/M00/01/04/rBUAB1xuZZuAVlwUAAA43XTB3D4911.jpg", //逗号隔开base64的图片流
      truckOwner: "", //车主
      ownerMobile: "", //车主电话
      engineNumber: "", //发动机号
      frameNumber: "", //车架号
      vehnum: "",
      vehli: "",
      vehlicnum: "", //车牌号
      nowWidth: "", //车宽
      nowHeight: "", //车高
      nowLoadWeight: "",
      nowLength: "",
      vehtypnam: "",
      dataLists: [],
      vehtyp: "",
      dataList: [
        {
          flex: 1,
          values: [],
          textAlign: "center"
        }
      ]
    };
  },
  mounted() {
    this.getData();
    this.$root.eventHub.$on("vehtypnams", this.shows);
  },

  methods: {
    openPicker() {
      this.$refs.picker.open();
    },
    handleConfirm(value) {
      console.log(value);
      let date = new Date(value);
      let date_value =
        date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
      this.licenceDate = date_value;
      //最后显示yyyy-MM-dd hh:mm:ss
      this.$refs.picker.close();
    },
    tel(value, el) {
      if (value === "") {
        this.$toast("手机号不可为空");
      } else {
        if (value !== "") {
          var reg = /^((0\d{2,3}-\d{7,8})|(1[3584]\d{9}))$/;
          if (!reg.test(value)) {
            this.$toast("请输入有效的手机号码");
            this[el] = "";
          }
        }
      }
    },
    Determine() {
      let  imgUploadInput = []
      imgUploadInput.push(document.getElementsByClassName('imgUrl')[0].src) 
      imgUploadInput.push(document.getElementsByClassName('imgUrl')[1].src) 
     this.imgUploadInput = imgUploadInput.join(',')
      if (
        !this.vehtyp ||
        !this.vehnum ||
        !this.vehli ||
        !this.imgUploadInput ||
        !this.licenceDate ||
        !this.personnam ||
        !this.mobile
      ) {
        this.$toast("请先完善数据！");
        return;
      }
      let id = getCache("CarId");
      console.log(id);
      let vehgrpnum = getCache("vehgrpnum");
      let user = getCache("user");

      let param = {
        params: JSON.stringify({
          cpycod: user.cpycod,
          username: this.vehnum,
          jobpost: "14",
          roles: ["14"],
          personnam: this.personnam,
          mobile1: this.mobile,
          utype: "1",
          vehgrpnum: "",
          whsnum:user.delwhsnum
        })
      };

      this.$http
        .post("/regist", param)
        .then(res => {
          let result = res.data;
          if (result.ret_code == 0) {
            let params = {
              paramMap: JSON.stringify({
                id: id,
                cpycod: "0006",
                vehtyp: this.vehtyp,
                vehnum: this.vehnum,
                whsnum: "ea01",
                vehlicnum: this.vehli + this.vehnum,
                picPath: this.imgUploadInput,
                purcdate: this.licenceDate,
                personnam: this.personnam,
                vehgrpnum: ""
              })
            };
            this.$http
              .post("/dispatcherStatist/saveTemporaryCar", params)
              .then(res => {
                this.$toast(res.data.msg);
                this.back();
              })
              .catch(res => {
                //this.$toast("数据获取错误！");
              });
          }
        })
        .catch(res => {
          //this.$toast("数据获取错误！");
        });
    },
    // photoActive() {
    //   this.$router.push({
    //     path: "/vehicleDispatcher/loadingManagement/Photograph"
    //   });
    // },
    shows(id) {
      this.dataLists.forEach(element => {
        if (element.vehtypnam == id) {
          // console.log(element)
          this.vehtyp = element.vehtyp;
          this.nowWidth = element.vehwdt1;
          this.nowHeight = element.vehhgt1;
          this.nowLoadWeight = element.wgtlim1;
          this.nowLength = element.vehlen1;
        }
      });
    },
    getData() {
      this.$http
        .get("/dispatcherStatist/vehicleScreening", {})
        .then(res => {
          // console.log(res.data.data);
          //this.$toast(res.data.msg)
          this.dataLists = res.data.data;
          let dataList = [];
          res.data.data.forEach(element => {
            dataList.push(element.vehtypnam);
          });
          this.dataList[0].values = dataList;
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
// .common-content-box {
//   //margin-bottom: 0.5rem;
// }
.carNum {
  width: 0.8rem;
  margin-left: 0.35rem;
}
.photoLine .photoBox {
  text-align: center;

  //background: lime;
}
.photoLine .photoBox p {
  width: 1rem;
  height: 0.8rem;
  background: #ccc;
}
.photoLine .photoBox img {
  width: 0.5rem;
}
.photoLine {
  display: flex;
  flex-flow: row wrap;
}.common-page-flex{
  position: absolute;
  top: 0;
  bottom: 0.5rem;
  height: auto;
}
.commonTab {
  display: flex;
  flex-flow: row wrap;
  justify-content: space-around;
  overflow-y: scroll;
  font-size: 0.16rem;
  position: relative;
  top: 0;
  bottom: 0.5rem;
}
.commonTab li {
  display: flex;
  height: auto;
  margin: 0.1rem 0 0 0;
}
.commonTab .bottom-b {
  padding: 0 0 0.1rem 0;
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

.wid85 {
  width: 0.85rem;
}

.wid135 {
  width: 1.35rem;
}
.wid184 {
  width: 1.84rem;
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
