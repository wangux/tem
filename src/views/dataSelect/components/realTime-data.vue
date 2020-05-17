<template>
    <div class="app-container realTime-data">
        <el-tabs class="tabcard" type="border-card" v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="实时值" name="first">
                <el-row style="height:100%;">
                    <el-col :span="6" style="padding-right:10px;height:100%;">
                        <el-card style="height:100%;">
                            <el-tree
                                :data="treeData"
                                node-key="id"
                                :default-expand-all="true"
                                :props="defaultProps">
                                <span class="custom-tree-node" slot-scope="{ node, data }">
                                    <span>
                                        <i :class="data.icon"></i>{{ node.label }}
                                    </span>          
                                </span>
                            </el-tree>
                        </el-card>
                    </el-col>
                    <el-col :span="18" style="height:100%;">
                        <el-card style="height:100%;display:flex;flex-direction:column;">
                            <el-row style="margin-bottom: 30px;">
                                <el-checkbox-group v-model="checkList">
                                    <el-checkbox label="电流"></el-checkbox>
                                    <el-checkbox label="温度"></el-checkbox>
                                </el-checkbox-group>
                            </el-row>
                            <el-row style="height:100%;">
                                <el-table
                                    :data="tableData"
                                    :height="tableHeight"
                                    border
                                    style="width: 100%">
                                    <el-table-column
                                    prop="id"
                                    label="id"
                                    width="60">
                                    </el-table-column>
                                    <el-table-column
                                    prop="name"
                                    label="变量名称"
                                    class="red"
                                    min-width="160">
                                    </el-table-column>
                                    <el-table-column
                                    prop="realValue"
                                    label="实时值"
                                    class="red"
                                    width="100">
                                    </el-table-column>
                                    <el-table-column
                                    prop="collectTime"
                                    label="采集时间"
                                    class="red"
                                    >
                                    </el-table-column>
                                    <el-table-column
                                    prop="status"
                                    label="状态"
                                    class="red"
                                    width="120">
                                    </el-table-column>
                                </el-table>
                            </el-row>
                        </el-card>
                    </el-col>
                </el-row>
            </el-tab-pane>
            <el-tab-pane label="实时图表" name="second">
                <el-row style="height:100%;">
                    <el-col :span="6" style="padding-right:10px;height:100%;">
                        <el-card style="height:100%;">
                            <el-tree
                                :data="treeDataChart"
                                node-key="id"
                                :default-expand-all="true"
                                :props="defaultProps">
                                <span class="custom-tree-node" slot-scope="{ node, data }">
                                    <span>
                                        <i :class="data.icon"></i>{{ node.label }}
                                    </span>          
                                </span>
                            </el-tree>
                        </el-card>
                    </el-col>
                    <el-col :span="18" style="height:100%;">
                        <el-card style="height:100%;display:flex;flex-direction:column;">
                            <el-row style="margin-bottom:10px;">
                                <h4 style="text-align:center;margin:0">无线测温</h4>
                            </el-row>
                            <el-row style="margin-bottom: 10px;">
                                <el-checkbox-group v-model="checkListChart">
                                    <el-checkbox label="电流"></el-checkbox>
                                    <el-checkbox label="温度"></el-checkbox>
                                </el-checkbox-group>
                            </el-row>
                            <el-row style="margin-bottom:10px;text-align:right;">
                                <el-button icon="el-icon-search">查询</el-button>
                            </el-row>
                            <el-row style="margin-bottom:10px;">
                                <h5 style="background:#ffb54c;color:#fff;margin:0;padding:10px;padding-left:30px;">实时曲线</h5>
                            </el-row>
                            <el-row class="row">
                                <el-checkbox style="margin-right:30px;padding-left:30px;" v-model="if3d">3D</el-checkbox>
                                <el-radio-group v-model="chartStyle">
                                    <el-radio :label="1">曲线</el-radio>
                                    <el-radio :label="2">柱状图</el-radio>
                                    <el-radio :label="3">饼图</el-radio>
                                </el-radio-group>
                            </el-row>
                            <!-- <el-row style="height:100%;"> -->
                                <el-row :gutter="32" style="height:100%;">
                                    <el-col :xs="24" :sm="24" :lg="18" style="height:100%;" v-show="chartStyle == 3">
                                        <div class="chart-wrapper">
                                            <pie-chart height="300px" width="500px"/>
                                        </div>
                                    </el-col>
                                    <el-col :xs="24" :sm="24" :lg="18" style="height:100%;" v-show="chartStyle == 2">
                                        <div class="chart-wrapper">
                                            <bar-chart height="300px" width="500px"/>
                                        </div>
                                    </el-col>
                                    <el-col :xs="24" :sm="24" :lg="18" style="height:100%;" v-show="chartStyle == 1">
                                        <div class="chart-wrapper">
                                            <line-chart :chartData="lineChartData" height="300px" width="500px"/>
                                        </div>
                                    </el-col>
                                </el-row>
                            <!-- </el-row> -->
                        </el-card>
                    </el-col>
                </el-row>
            </el-tab-pane>
            <el-tab-pane label="通讯状况" name="third">
                <el-row style="height:100%;" class="dispatchStatus">
                    <el-col :span="6" style="padding-right:10px;height:100%;">
                        <el-card style="height:100%;">
                            <el-row>
                                <el-select v-model="unit" placeholder="点击选择单位过滤">
                                    <el-option
                                    v-for="item in unitOptions"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-row>
                            <el-row type="flex" justify="center" align="middle">
                                <div class="deviceControl">
                                    <h5>无线测温</h5>
                                    <span>中断</span>
                                </div>
                            </el-row>
                        </el-card>
                    </el-col>
                    <el-col :span="18" style="height:100%;">
                        <el-card style="height:100%;display:flex;flex-direction:column;">
                            <el-row style="margin-bottom: 30px;">
                                <div class="device">
                                    <div class="device_title row">
                                        <i>设备名称</i>
                                        <span>无线测温</span>
                                    </div>
                                    <div class="device_content">
                                        <el-row class="row">
                                            <div class="baseStatus" style="flex:1;">
                                                <i>状态</i>
                                                <span class="showStatus"></span>
                                            </div>
                                            <div class="putStatus" style="flex:1;">
                                                <i>投运状态</i>
                                                <el-checkbox v-model="deviceInfo.putStatus" disabled></el-checkbox>
                                            </div>
                                        </el-row>
                                        <div class="deviceAdr row">
                                            <i>设备地址</i>
                                            <span>2</span>
                                        </div>
                                        <div class="extendAdr row">
                                            <i>扩展地址</i>
                                        </div>
                                        <el-row class="row">
                                            <div class="repeatNum" style="flex:1;">
                                                <i>重复次数</i>
                                                <span>2</span>
                                            </div>
                                            <div class="breakNum" style="flex:1;">
                                                <i>中断次数</i>
                                                <span>2</span>
                                            </div>
                                        </el-row>
                                        <div class="treaty row">
                                            <i>协议</i>
                                            <span>通用MODBUS规约protocolmodbus</span>
                                        </div>
                                    </div>
                                </div>
                            </el-row>
                        </el-card>
                    </el-col>
                </el-row>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script lang="ts">
import { Component, Vue , Watch } from 'vue-property-decorator'
import { getWindowHeight } from '@/utils'
import PieChart from './PieChart.vue'
import BarChart from './BarChart.vue'
import LineChart , { ILineChartData } from './LineChart.vue'
// import LineChart , { ILineChartData } from '@/views/dashboard/admin/components/Charts/LineChart.vue'

interface Node{
  id: string|null|number,
  label: string|null|number,
  [propname:string]: any
}

const lineChartData: { [type: string]: ILineChartData } = {
  newVisitis: {
    expectedData: [100, 120, 161, 134, 105, 160, 165],
    actualData: [120, 82, 91, 154, 162, 140, 145]
  },
  messages: {
    expectedData: [200, 192, 120, 144, 160, 130, 140],
    actualData: [180, 160, 151, 106, 145, 150, 130]
  },
  purchases: {
    expectedData: [80, 100, 121, 104, 105, 90, 100],
    actualData: [120, 90, 100, 138, 142, 130, 130]
  },
  shoppings: {
    expectedData: [130, 140, 141, 142, 145, 150, 160],
    actualData: [120, 82, 91, 154, 162, 140, 130]
  }
}

@Component({
    name: 'RealTimeData',
    components: {
        BarChart,
        LineChart,
        PieChart
    }
})
export default class extends Vue {
    private msg:string | Number | null = '实时数据';
    private activeName:string = 'first';
    //实时值数据
    private treeData = [{
        id: 1,
        label: '设备列表',
        icon: 'el-icon-tickets',
        children: [{
            id: 2,
            label: '无线测温',
            icon: 'el-icon-wind-power'
        }]
    }];
    private defaultProps = {
        children: 'children',
        label: 'label'
    }

    private checkList = ['电流','温度'];

    //实时图表数据
    private treeDataChart = [{
        id: 1,
        label: '设备列表',
        icon: 'el-icon-tickets',
        children: [{
            id: 2,
            label: '无线测温',
            icon: 'el-icon-wind-power'
        }]
    }];
    private if3d = true;
    private chartStyle = 1;
    private lineChartData = lineChartData.newVisitis
    // private lineChartWidth = 100

    private checkListChart = ['电流','温度'];

    private tableData = [{
        id: '1',
        name: '无线测温 测温点',
        realValue: '17.700',
        collectTime: '2020-01-01 12:50:30',
        status: '中断'
    }, {
        id: '2',
        name: '无线测温 测温点',
        realValue: '17.700',
        collectTime: '2020-01-01 12:50:30',
        status: '中断'
    }, {
        id: '3',
        name: '无线测温 测温点',
        realValue: '17.700',
        collectTime: '2020-01-01 12:50:30',
        status: '中断'
    }];
    private tableHeight = getWindowHeight() - 300

    //通讯状况数据
    private unit = '';
    private unitOptions = [{
        value: '选项1',
        label: '黄金糕'
    }, {
        value: '选项2',
        label: '双皮奶'
    }];

    private deviceInfo = {
        putStatus: true
    }
    

    created(){
    }

    private handleClick(tab:any) {
        console.log(tab);
    }
    
}
</script>

<style lang="scss">
    .realTime-data .el-tabs__content{
        height: 100%;
        .el-tab-pane{
            height: 100%;
        }
    }
    .realTime-data .el-table--border td:first-child .cell{
        color: #1f2d3d;
    }
    .realTime-data .el-table__body td{
        color: #f00;
    }
    .dispatchStatus .el-select{
        width: 100%;
    }
</style>

<style lang="scss" scoped>
.app-container{
    display: flex;
    width: 100%;
    height: 100%;
    position: relative;
    .tabcard{
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
    }
    .deviceControl{
        display: flex;
        flex-direction: column;
        // justify-content: center;
        align-items: center;
        width: 60%;
        height: 120px;
        margin-top: 20px;
        border: 1px solid #9bd1e3;
        background: #d1eaf5;
        border-radius: 5px;
        span{
            width: 42px;
            height: 42px;
            line-height: 42px;
            font-size: 12px;
            text-align: center;
            background: #f00;
            color: #fff;
            display: inline-block;
            border-radius: 50%;
            cursor: pointer;
            &:hover{
                box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
            }
        }
    }
    .device{
        width: 212px;
        height: 160px;
        border: 1px solid #9bd1e3;
        background: #fff;
        border-radius: 5px;
        font-size: 12px;
        i{
            font-style: normal;
        }
        .row{
            display: flex;
            align-items: flex-start;
            margin-bottom: 4px;
            i{
                margin-right: 12px;
                white-space: nowrap;
            }
        }
        .device_title{
            height: 34px;
            line-height: 34px;
            padding-left: 10px;
            background: #d1eaf5;
            border-top-right-radius: 5px;
            border-top-left-radius: 5px;
        }
        .device_content{
            // background: #fff;
            padding:10px 0 10px 10px;
            display: flex;
            flex-direction: column;
            .showStatus{
                width: 12px;
                height: 12px;
                background: #f00;
                border-radius: 50%;
                display: inline-block;
            }
        }
    }
    .chart-wrapper {
        background: #fff;
        width: 100%;
        height: 100%;
        padding: 16px 16px 0;
        margin-bottom: 32px;
    }
}
</style>