<template>
  <div class="common-page-flex">
    <header-default :title="title"></header-default>
    <div class="tab pageFlex">
      <div class="commonTabDiv pd48">
        <ul class="commonTab common-content-box">
          <li
            class="selectList"
            v-for="(item, index) in dataList"
            @click.stop="changeTimeSelectStatus(index)"
            :key="item.id"
          >
            <template v-if="timeStatus == index">
              <img src="@/assets/images/common/checked.png" alt>
            </template>
            <template v-else>
              <img src="@/assets/images/common/check.png" alt>
            </template>
            <span>{{item.vehgrpnam}}</span>
          </li>
        </ul>
      </div>
    </div>
    <div class="common-bottom-button bottom-button-fixed" @click="Determine">确定</div>
  </div>
</template>

<script>
import HeaderDefault from "@/components/common/HeaderDefault";
import { setCache, getCache } from "@/config/utils";

export default {
  name: "carManage",
  components: { HeaderDefault },
  data() {
    return {
      showCar: "",
      title: "车队选择",
      dataList: [
       
      ],
      timeStatus: null
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    changeTimeSelectStatus(index) {
      this.timeStatus = index;
    },
    getData() {
      this.$http
        .get("/dispatcherStatist/vehicleGroupsQuery", {})
        .then(res => {
          // console.log(res);
          this.dataList = res.data.data;
        })
        .catch(res => {
          //this.$toast("数据获取错误！");
        });
      let data = this.$route.query.index;
      this.showCar = data;
    },
    Determine(){
        let id = getCache("CarId");
        let vehgrpnum = getCache("vehgrpnum");
        let user = getCache("user");
        let data = this.$route.query.item
        console.log(data)
        let datas =  this.dataList[this.timeStatus].vehgrpnum
        let param = {
          params: JSON.stringify({
            cpycod: user.cpycod,
            username: data.vehnum,
            jobpost: "14",
            roles: ["14"],
            personnam: data.personnam,
            mobile1: data.mobile,
            utype: user.utype,
            vehgrpnum: datas
          })
        };

         this.$http
            .post("/regist", param)
            .then(res => {
              let result = res.data;
              if (result.ret_code == 0) {
                let params = {
                  paramMap: JSON.stringify({
                    id: "",
                    cpycod: "0006",
                    vehtyp: data.vehtyp,
                    vehnum: data.vehnum,
                    whsnum: "ea01",
                    vehlicnum: data.vehli + data.vehnum,
                    picPath: data.picPath,
                    purcdate: data.purcdate,
                    personnam: data.personnam,
                    vehgrpnum: datas
                  })
                };
                this.$http
                  .post("/dispatcherStatist/saveTemporaryCar", params)
                  .then(res => {
                    this.$toast(res.data.msg);
                    this.back();
                  })
                  .catch(res => {
                   // this.$toast("数据获取错误！");
                  });
              }
            })
            .catch(res => {
             // this.$toast("数据获取错误！");
            });
    //    setCache("vehgrpnum_num",data)
    //    this.$toast('车队设置成功！')
    //    this.back()
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
  font-size: 0.16rem;
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
.selectList {
  padding-left: 0.3rem;
}
b {
  color: red;
}
.tel {
  margin-left: 0.6rem;
}
.common-content-box li span {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: center;
  height: 0.46rem;
  text-align: center;
  font-size: 0.16rem;
  word-break: break-all;
}

.commonTab img {
  width: 0.15rem;
  height: 0.15rem;
  margin: 0 0.1rem 0 0.1rem;
}

.commonTab li:first-of-type {
  font-family: SourceHanSansCN-Regular;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
}
</style>
