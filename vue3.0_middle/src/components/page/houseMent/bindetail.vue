<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-school"></i>仓库管理 </el-breadcrumb-item>
                <el-breadcrumb-item>仓库详情</el-breadcrumb-item>
                <el-breadcrumb-item>库房详情</el-breadcrumb-item>
                <el-breadcrumb-item>库区详情</el-breadcrumb-item>
                <el-breadcrumb-item>库位详情</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container head">
            <div class="d_head">
                 <div> <span>库位编号</span><span >{{binnum}}</span> </div>
                 <el-button type="primary" @click="edit">编辑</el-button>
            </div>
            <el-divider></el-divider>
            <div class="tops">
                <span><a class="publicolor">所属库区：</a>{{regionName}}</span>
                <span><a class="publicolor">所属库房: </a>{{storehouseName}}</span>
                <span><a class="publicolor">所属仓库: </a>{{wareHouseName}}</span>
            </div>
         </div>
        <!-- 库位列表 -->
        <div class="containers">
            <div class="ups">
               <div><span>长:</span><span>{{long}}cm </span></div>
               <div><span>码放模式:</span><span>{{binhondcr}}</span></div>
               <div><span></span><span></span></div>
               <div><span>宽:</span><span>{{wide}}cm </span></div>
               <div><span>可放托数:</span><span>{{palletNumber}}托</span></div>
               <div><span></span><span></span></div>
               <div><span>高:</span><span>{{height}}cm </span></div>
               <div><span>可放垛数:</span><span>{{stackingNumber}}垛</span></div>
               <div><span></span><span></span></div>
               <div><span>面积:</span><span>{{area}}㎡</span></div>
               <div><span>库位类型:</span><span>{{binmindcr == 'p' ?'托盘库位':binmindcr == 'a'?'物品库位':binmindcr == 'i' ?'隔离库位':''}}</span></div>
               <div><span></span><span></span></div>
            </div>    
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
           binnum:'' ,//库位编号
           regionName:'',//库区名称
           wareHouseName:'',//仓库名称
           storehouseName:'',//库房名称
           binTypeId:'',//库位面积id
           binhondcr:'',//码放模式
           binmindcr:'',//库位类型 p:托盘库位 a:物品库位 l:隔离库位）
           palletNumber:'',//可放托数
           stackingNumber:'',//可放垛数
           long:'',//长
           wide:'',//宽
           height:'',//高
           area:'',//面积
        }
    },
    mounted(){       
         this.getData()
    },
    methods:{
        //获取库位面积
        getbinArea(){
            this.$http.get('/api/warehouse/getBinStyles',{}).then(res => {
                 //console.log(res)
                    if(res.data.ret_code == 0){
                        var arr = res.data.data
                        for (let i = 0; i < arr.length; i++) {
                           if(arr[i].id == this.binTypeId){
                               this.long = arr[i].length
                               this.wide = arr[i].width
                               this.height = arr[i].height
                               this.area = arr[i].area
                           }
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
        //获取库位详情信息
        getData(){
            const data = new URLSearchParams();
             //库位id
            var binId = this.$route.query.binId
            data.append('binId',binId)
            this.$http.get('/api/warehouse/getBinDetail',{params:data}).then(res => {
                  console.log(res)
                    if(res.data.ret_code == 0){
                       this.storehouseName = res.data.data.storehouseName
                        this.regionName = res.data.data.regionName
                       this.binnum = res.data.data.binnum
                       this.wareHouseName = res.data.data.wareHouseName
                       this.binTypeId = res.data.data.bindcr
                       this.binhondcr = res.data.data.binhondcr
                       this.binmindcr = res.data.data.binmindcr
                       this.palletNumber = res.data.data.palletNumber
                       this.stackingNumber = res.data.data.stackingNumber
                        this.getbinArea()
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
        //编辑 库位
        edit(){
             //库位id
            var binId = this.$route.query.binId
            this.$router.push({
                path:'/editbin',
                query:{binId:binId}
            })
        }
    }
}
</script>
<style scoped  lang="less">
 .head{
    margin-bottom: 20px;
    .publicolor {
        color: rgb(148, 144, 144);
        font-weight: normal
    }
    .d_head{
        display: flex;
        justify-content: space-between;
        width: 100%;
        div{
            display: flex;
            align-items: center;
            span{
                font-size: 18px;
                margin-right: 40px;
            }
        }
    }
    .tops {
      height: 15px;
      width: 960px;
      display: flex;
      span {
           flex: 1;
        display: inline-block;
        float: left;
        margin-left: 10px;
      }
      span:first-child {
        margin-left: 0;
      }
    }
    .contents {
      margin-top:15px;
      height: 20px;
      width: 960px;
      display: flex;
      span {
        flex: 1;
        display: inline-block;
        float: left;
        margin-left: 10px;
      }
      span:first-child {
        margin-left: 0;
      }
    }
 }
 .containers{
     background: white;
     border: 1px solid #ddd;
     border-radius: 5px;
     padding: 30px;
     .ups{
        height: 200px;
        width: 960px;
        display: flex;
        flex-wrap: wrap;
        div{
            display: block;
            margin-top: 15px;
            width: 320px;
            display: flex;
            span:first-child{
                 display: block;
                 width: 70px;
                 text-align: right;
            }
            span:last-child{
                 display: block;
                 margin-left: 50px;
            }
        } 
     }
 }
</style>
