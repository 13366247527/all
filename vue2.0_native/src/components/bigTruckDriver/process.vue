<template>
    <div class="common-page-flex">
        <header-default :title="title"></header-default>
        <div class="common-line-one-panel">
            <p>
                <span>联系人：</span>
                <span>{{dataList.personnam}}</span>
            </p>
        </div>
        <div class="common-line-one-panel">
            <p>
                <span>电话：</span>
                <span>{{dataList.mobile}}</span>
            </p>
        </div>
        <div class="common-line-one-panel">
            <p>
                <span>流程指引：</span>
                <span>{{dataList.description}}</span>
            </p>
        </div>
        <div class="common-bottom-button bottom-button-fixed" @click="toUnload">到达停车位</div>
    </div>
</template>

<script>

import HeaderDefault from "@/components/common/HeaderDefault"
import { setCache, getCache } from "@/config/utils";

export default {
    components: { HeaderDefault },
    data() {
        return {
            title: '客户交货流程说明',
            dataList:{}
        }
    },
    // created () {
    //     this.$store.dispatch('getTags') // 数据需在create生命周期中设定，否则picker中无法获取
    // },
    mounted() {
        this.getData();
    },
    methods: {
        toUnload(){
            this.$router.push({
                path: '/bigTruckDriver/unload'
            })
        },
        getData(){
           let data = getCache("bigTruckDriverList").smallOrder[0].deldocId;
 console.log(data)

      this.$loading.open();
      let params = {
        docId: data
      };
      this.$http.post("/unLoadProcedure", params).then(res => {
        this.$loading.close();
        let result = res.data;
 console.log(result)
        if (result.ret_code == 0) {
          this.dataList = result.data
        }
      }).catch(res=>{
         // this.$toast("数据获取错误！")
      });
        }
    }
};
</script>

<style lang="scss" scoped>

</style>
