<template>
    <div>
        <!-- 添加车队  弹框 -->
    <el-dialog title="新建路线" :visible.sync="routeVisible" class="routeVisible" :before-close="handleDialogClose">
      <el-form :model="addform" class="demo-form-inline" label-width="100px">
        <el-form-item label="线路名称：">
          <el-input v-model="addform.name" placeholder="例如：广西省桂林市——广西省南宁线路A" maxlength="40"></el-input>
        </el-form-item>
        <el-form-item label="起始仓库：" class="qishi">
           <el-select v-model="addform.house" placeholder="请选择仓库">
                    <el-option
                        v-for="item in houseoptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
           </el-select>
        </el-form-item>
        <el-form-item label="终点：" class="weight">
          <vaddress :caddress="addform.zhongdian" @change="zchanges"></vaddress>
        </el-form-item>
        <el-form-item label="选择承运商：">
          <el-select
                        v-model="addform.user"
                        filterable
                        placeholder="选择承运商"
                         >
                        <el-option
                        v-for="item in useroptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
        </el-form-item>
        <el-form-item label="路线备注：">
          <el-input type="textarea" v-model="addform.info" placeholder="请输入至少五个字符"  maxlength="100" minlength="5"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="Cancellation">取 消</el-button>
        <el-button type="primary" @click="define">确 定</el-button>
      </div>
    </el-dialog>
    </div>
</template>
<script>
import vaddress from "../../../components/common/address";
export default {
    props:['routeVisible'],
    data(){
        return{
            addform: {
                name: "", //线路名称
                house:'',//起始仓库
                zhongdian: {
                //终点 省
                sheng: "",
                shi: "",
                qu: ""
                },
                user: "", //客户
                info: "" //路线备注
            },
            houseoptions:[],//仓库数据
            useroptions: [],//承运商筛选数组
            useralloptions: [],//承运商名称数组
            loading: false,
        }
    },
    components:{
        vaddress
    },
    mounted(){
      this.getHouse()  
      this.remoteMethod()
    },
    methods:{
        //获取仓库信息
        getHouse(){
          this.$http.get('/api/whtransportroute/wareHouse').then(res => {
                  //  console.log(res)
                    if(res.data.ret_code == 0){
                        for (let i = 0; i < res.data.data.length; i++) {
                          var obj = {}
                          obj.label = res.data.data[i].whshondcr
                          obj.value = res.data.data[i].whsnum
                          this.houseoptions.push(obj)
                      }
                    }else{
                        this.$message({
                            type: 'error',
                            message: res.data.msg
                        })
                    }
            }).catch(err=>{
                console.log(err)
            })
        },
        //获取承运商信息  远程搜索
        remoteMethod(){
            var query = ''
            this.$http.get('/api/whtransportroute/vehicleGroup?keyword='+query).then(res => {
                  // console.log(res)
                    if(res.data.ret_code == 0){
                      this.useralloptions = []
                      this.useroptions = []
                      this.useralloptions = res.data.data
                    //  console.log(this.useralloptions)
                      for (let i = 0; i < res.data.data.length; i++) {
                        var obj = {}
                        obj.label = res.data.data[i].vehgrnam
                        obj.value = res.data.data[i].vehgrnum
                        this.useroptions.push(obj)
                      }
                    }else{
                        this.$message({
                            type: 'error',
                            message: res.data.msg
                        })
                    }
            }).catch(err=>{
                console.log(err)
            })
        },
        //终点 三级联动
        zchanges(obj) {
        this.addform.zhongdian = obj;
        },
         //遮罩 x
        handleDialogClose(){
             this.addform={
                          name: "", //线路名称
                          house:'',//起始仓库
                          zhongdian: {
                          //终点 省
                          sheng: "",
                          shi: "",
                          qu: ""
                          },
                          user: "", //客户
                          info: "" //路线备注
                      },
             this.useroptions = []
             this.$emit('changes',this.routeVisible)
        },
         //遮罩 取消
        Cancellation(){
             this.addform={
                          name: "", //线路名称
                          house:'',//起始仓库
                          zhongdian: {
                          //终点 省
                          sheng: "",
                          shi: "",
                          qu: ""
                          },
                          user: "", //客户
                          info: "" //路线备注
                      },
             this.useroptions = []
             this.$emit('changes',this.routeVisible)
        },
         //遮罩 确定
        define() {
            
              //获取仓库所在数组
               let houseItem = this.houseoptions.filter(item =>{
                return item.value == this.addform.house
            })
            
             //获取承运商所在数组
            let userItem = this.useralloptions.filter(item =>{
                return item.vehgrnum == this.addform.user
            })
           
             //目的地省-市-区/县
             var destination = this.addform.zhongdian.sheng+'-'+this.addform.zhongdian.shi+'-'+this.addform.zhongdian.qu
             var params = {
                endloc:this.addform.name,//线路名称
                delooc:houseItem[0].value,//起始地点/仓库编号
                strloc:houseItem[0].label,//起始地点/仓库名称
                destination:destination,//目的地省-市-区/县
                rehgrpcpycod:userItem[0].cpycod,//车队的公司编号
                vehgrpnum:userItem[0].vehgrnum,//承运商车队编号
                trprteesc:this.addform.info,//路线描述信息
             }
             
            this.$http.post("/api/whtransportroute/save",params).then(res => {
                  if (res.data.ret_code == 0) {
                      this.$message({
                        type: "success",
                        message: res.data.data
                    });
                    this.addform={
                          name: "", //线路名称
                          house:'',//起始仓库
                          zhongdian: {
                          //终点 省
                          sheng: "",
                          shi: "",
                          qu: ""
                          },
                          user: "", //客户
                          info: "" //路线备注
                      },
                      this.useroptions = []
                     this.$emit('changes',this.routeVisible)
                  } else {
                    this.$message({
                      type: "error",
                      message: res.data.msg
                    });
                  }
            }).catch(err => {
              console.log(err);
            });
        },
    }
}
</script>
<style lang="less" scoped>
.routeVisible {
  /deep/ .el-dialog__body {
    border-bottom: solid 1px #ebebeb !important;
    border-top: solid 1px #ebebeb !important;
  }
  .el-form {
    width: 70%;
    margin: 0 auto;
    .el-form-item {
      margin-bottom: 50px;
    }
    .qishi{
      .el-select {
        width: 200px;
      }
    }
    .weight {
      .el-select {
        width: 30%;
        margin-right: 10px;
      }
    }
    .el-form-item:last-child {
      margin-bottom: 0px;
    }
  }
}
</style>
