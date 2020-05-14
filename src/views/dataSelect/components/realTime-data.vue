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
            <el-tab-pane label="实时图表" name="second">实时图表</el-tab-pane>
            <el-tab-pane label="通讯管理" name="third">通讯管理</el-tab-pane>
        </el-tabs>
    </div>
</template>

<script lang="ts">
import { Component, Vue , Watch } from 'vue-property-decorator'
import { getWindowHeight } from '@/utils'

interface Node{
  id: string|null|number,
  label: string|null|number,
  [propname:string]: any
}

@Component({
    name: 'RealTimeData',
    components: {
    }
})
export default class extends Vue {
    private msg:string | Number | null = '实时数据';
    private activeName:string = 'first';
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

    created(){
    }

    private handleClick(tab:any) {
        console.log(tab);
    }

    // private renderContent(h:any, { node }:Node){
    //     return (
              
    //     );
    // }
    
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
</style>

<style lang="scss" scoped>
.app-container{
    display: flex;
    width: 100%;
    height: 100%;
    .tabcard{
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
    }
}
</style>