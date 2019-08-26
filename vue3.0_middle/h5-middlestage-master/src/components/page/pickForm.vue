<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-calendar"></i> 单据管理</el-breadcrumb-item>
                <el-breadcrumb-item>采购单拆单</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <el-form :model="form" class="formseo">
                <el-form-item>
                    <el-select v-model="form.supplyName" placeholder="全部供应商">
                        <el-option v-for="item in supply" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-select v-model="form.oderStatus" placeholder="订单状态">
                        <el-option v-for="item in oderList" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-select v-model="form.payment" placeholder="付款条件">
                        <el-option v-for="item in paymentList" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-input v-model="form.oderNameNum" clearable placeholder="请输入订单编号/客户名称"></el-input>
                </el-form-item>
                <el-button type="primary" @click="searchList()">搜索</el-button>
            </el-form>
            <div id="tableIds">
                <el-table :data="tableData" :header-cell-style="rowClass" style="width: 100%; margin-top: 20px;">
                    <el-table-column align="center" prop="date" label="订单编号" width="180">
                        <template slot-scope="scope">
                            <a></a>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" prop="date" label="供应商" width="180"></el-table-column>
                    <el-table-column align="center" prop="date" label="订单金额" width="120"></el-table-column>
                    <el-table-column align="center" prop="date" label="总数量" width="120"></el-table-column>
                    <el-table-column align="center" prop="date" label="总重量" width="120"></el-table-column>
                    <el-table-column align="center" prop="date" label="付款条件" width="140"></el-table-column>
                    <el-table-column align="center" prop="date" label="操作" width="180">
                        <template slot-scope="scope">
                            <el-button type="text" size="small">拆单</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <el-pagination
                    style="margin-top: 20px;"
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-sizes="[10, 20, 30, 40]"
                    :page-size="pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="totalSize">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    export default {
        data: function(){
            return {
                form: {
                    supplyName: '', // 默认供应商
                    oderStatus: '', // 订单状态默认
                    payment: '', // 付款条件默认
                    oderNameNum: '' // 订单编好/客户名称
                },
                supply: [], // 供应商数据
                oderList: [], // 订单状态数据
                paymentList: [], // 付款条件数据
                tableData: [], // 表格数据
                currentPage: 1, // 当前页
                pageSize: 20, // 每页条数
                totalSize: 0 // 总条数
            }
        },
        mounted() {
            // this.test()
        },
        methods: {
            // test: function () {
            //     this.$http.get('/api/report/delivergoods/efficiency', 'D').then(res => {
            //         console.log(res)
            //     })
            // }
            // 表头样式
            rowClass() {
                return 'background:rgba(248,248,248,1); height: 45px;font-weight: normal;'
            },
            // 列表搜索
            searchList: function () {
                this.$router.push('/demolition')
            },
            // 每页条数
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            // 当前页
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
            }
        }
    }
</script>

<style scoped lang="less">
    .formseo {
        height: 34px;
        .el-form-item {
            display: inline-block;
            float: left;
            margin-left: 20px;
        }
        .el-form-item:first-child {
            margin-left: 0;
        }
        .el-select, .el-input {
            width: 200px;
            /*float: left;*/
        }
        .el-button {
            float: left;
            margin-left: 20px;
        }
    }
    .magSend {
        clear: both;
        .el-button {
            width: 80px;
        }
    }
    #tableIds {
        width: 100%;
    }
    @media screen and (min-width: 1400px) {
        #tableIds {
            width: 1040px;
        }
    }
</style>