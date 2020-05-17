<template>
    <div class="app-container history-data">
        <el-tabs class="tabcard" type="border-card" v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="历史值" name="first">
                <el-row style="height:100%;">
                    <el-col :span="6" style="padding-right:10px;height:100%;">
                        <el-card style="height:100%;">
                            <el-row class="history_left">
                                <el-select v-model="modeltemp" placeholder="请选择" style="margin-right:8px;">
                                    <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                    </el-option>
                                </el-select>
                                <el-button type="primary" size="mini">保存模板</el-button>
                                <el-button type="primary" size="mini">选项</el-button>
                                <el-button type="primary" size="mini">管理</el-button>
                            </el-row>
                            <el-row>
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
                            </el-row>
                        </el-card>
                    </el-col>
                    <el-col :span="18" style="height:100%;">
                        <el-card style="height:100%;display:flex;flex-direction:column;">
                            <el-row style="margin-bottom: 10px;">
                                <el-form :inline="true" :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">
                                    <el-form-item label="时间间隔(分钟):" prop="interval" label-width="140">
                                        <el-select v-model="ruleForm.interval" placeholder="请选择">
                                        <el-option label="60" value="60"></el-option>
                                        <el-option label="120" value="120"></el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item prop="type">
                                        <!-- <el-checkbox-group v-model="ruleForm.type">
                                            <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
                                        </el-checkbox-group> -->
                                        <el-checkbox v-model="ruleForm.type">变量列方式</el-checkbox>
                                    </el-form-item>
                                    <el-form-item label="查询时间" label-width="60" prop="selectTime">
                                        <el-date-picker
                                        v-model="ruleForm.selectTime"
                                        type="daterange"
                                        range-separator="至"
                                        start-placeholder="开始日期"
                                        end-placeholder="结束日期">
                                        </el-date-picker>
                                    </el-form-item>
                                    <el-form-item>
                                        <el-button type="primary" @click="submitForm('ruleForm')">查询</el-button>
                                        <el-button @click="exportExcel">导出</el-button>
                                    </el-form-item>
                                </el-form>
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
            <el-tab-pane label="历史图表" name="second">
                <el-row style="height:100%;">
                    <el-col :span="6" style="padding-right:10px;height:100%;">
                        <el-card style="height:100%;">
                            <el-row class="history_left">
                                <el-select v-model="modeltemp" placeholder="请选择" style="margin-right:8px;">
                                    <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                    </el-option>
                                </el-select>
                                <el-button type="primary" size="mini">保存模板</el-button>
                                <el-button type="primary" size="mini">选项</el-button>
                                <el-button type="primary" size="mini">管理</el-button>
                            </el-row>
                            <el-row style="height:300px;">
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
                            </el-row>
                            <el-row>
                                <div class="title">
                                    <span style="width:30%;">显示</span>
                                    <span style="width:40%;">变量名</span>
                                    <span style="width:15%;">颜色</span>
                                    <span style="width:15%;">移除</span>
                                </div>
                            </el-row>
                            <!-- <el-row style="">
                                <el-table
                                    :data="tableDataHis">
                                    <el-table-column
                                    prop="show"
                                    label="显示"
                                    width="70">
                                    </el-table-column>
                                    <el-table-column
                                    prop="name"
                                    label="变量名"
                                    class="red"
                                    min-width="90">
                                    </el-table-column>
                                    <el-table-column
                                    prop="realValue"
                                    label="颜色"
                                    class="red"
                                    width="60">
                                    </el-table-column>
                                    <el-table-column
                                    prop="status"
                                    label="移除"
                                    class="red"
                                    width="60">
                                    </el-table-column>
                                </el-table>
                            </el-row> -->
                        </el-card>
                    </el-col>
                    <el-col :span="18" style="height:100%;">
                        <el-card style="height:100%;display:flex;flex-direction:column;">
                            <el-row>
                                <el-form :inline="true" :model="ruleFormHistory" :rules="rules" ref="ruleForm" class="demo-ruleForm">
                                    <el-form-item label="时间" label-width="60" prop="selectTime">
                                        <el-date-picker
                                        v-model="ruleFormHistory.selectTime"
                                        type="daterange"
                                        range-separator="至"
                                        start-placeholder="开始日期"
                                        end-placeholder="结束日期">
                                        </el-date-picker>
                                    </el-form-item>
                                    <el-form-item prop="type">
                                        <el-checkbox v-model="ruleFormHistory.type">自适应</el-checkbox>
                                    </el-form-item>
                                    <el-form-item label="上限" prop="upper">
                                        <el-input style="width:60px;" v-model="ruleFormHistory.upper"></el-input>
                                    </el-form-item>
                                    <el-form-item label="下限" prop="lower">
                                        <el-input style="width:60px;" v-model="ruleFormHistory.lower"></el-input>
                                    </el-form-item>
                                    <el-form-item>
                                        <el-button type="primary" @click="submitForm('ruleFormHistory')">查询</el-button>
                                        <!-- <el-button @click="exportExcel">导出</el-button> -->
                                    </el-form-item>
                                </el-form>
                            </el-row>
                            <el-row style="margin-bottom:10px;">
                                <h5 style="background:#ffb54c;color:#fff;margin:0;padding:10px;padding-left:30px;">历史图表</h5>
                            </el-row>
                            <el-row class="row">
                                <el-checkbox style="margin-right:30px;padding-left:30px;" v-model="if3d">3D</el-checkbox>
                                <el-radio-group v-model="chartStyle">
                                    <el-radio :label="1">曲线</el-radio>
                                    <el-radio :label="2">柱状图</el-radio>
                                    <el-radio :label="3">饼图</el-radio>
                                </el-radio-group>
                            </el-row>
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

interface Node{
  id: string|null|number,
  label: string|null|number,
  [propname:string]: any
}

@Component({
    name: 'HistoryData',
    components: {
        BarChart,
        LineChart,
        PieChart
    }
})
export default class extends Vue {
    private activeName:string = 'first';
    private treeData = [{
        id: 1,
        label: '设备列表',
        icon: 'el-icon-tickets',
        children: [{
            id: 2,
            label: '无线测温',
            icon: 'el-icon-wind-power',
            children: [{
                id: 3,
                label: '电流',
                icon: 'el-icon-printer'
            },{
                id: 4,
                label: '温度',
                icon: 'el-icon-printer'
            }]
        }]
    }];
    private defaultProps = {
        children: 'children',
        label: 'label'
    }
    private modeltemp = '';
    private options = [{
        value: '选项1',
        label: '黄金糕'
    }, {
        value: '选项2',
        label: '双皮奶'
    }];
    private checkList = ['电流','温度'];

    private ruleForm = {
        interval: '',
        type: true,
        selectTime: ''
    };
    private ruleFormHistory = {
        interval: '',
        type: true,
        selectTime: '',
        upper: 120,
        lower: 0
    };
    private rules = {
        interval: [
            { message: '请选择时间', trigger: 'change' }
        ],
        selectTime: [
            { type: 'date', message: '请选择时间', trigger: 'change' }
        ],
        type: [
            { type: 'boolean', message: '请至少选择一个活动性质', trigger: 'change' }
        ]
    };

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

    //历史图表
    private if3d = true;
    private chartStyle = 1;
    private lineChartData = lineChartData.newVisitis
    private tableDataHis = [];

    created(){
    }

    private handleClick(tab:any) {
        console.log(tab);
    }

    private exportExcel(){
        console.log(11);
    }

    // private renderContent(h:any, { node }:Node){
    //     return (
              
    //     );
    // }
    
}
</script>

<style lang="scss">
    .history-data .el-tabs__content{
        height: 100%;
        .el-tab-pane{
            height: 100%;
        }
    }
    .history-data .el-table--border td:first-child .cell{
        color: #1f2d3d;
    }
    .history-data .el-card__body{
        padding: 8px;
    }
    .history-data .el-table__body td{
        color: #f00;
    }
    .demo-ruleForm .el-select{
        width: 140px;
    }
    .history_left .el-select{
        width: 42%;
    }
    .history-data .el-button--mini{
        padding-left: 8px;
        padding-right: 8px;
    }
    .history-data .el-button + .el-button{
        margin-left: 4px;
    }
    .history-data .el-date-editor{
        width: 320px;
    }
    // .history-data .el-input{
    //     width: 50%;
    // }
</style>

<style lang="scss" scoped>
.app-container{
    display: flex;
    width: 100%;
    height: 100%;
    // min-height: calc(100vh-80px);
    .tabcard{
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
    }
    .chart-wrapper {
        background: #fff;
        width: 100%;
        height: 100%;
        padding: 16px 16px 0;
        margin-bottom: 32px;
    }
    .title{
        height: 40px;
        padding: 0 10px;
        display: flex;
        align-items: center;
        background: #f5f6f8;
    }
}
</style>