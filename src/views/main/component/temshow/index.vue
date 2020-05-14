<template>
    <div class="temShow">
        <div class="showColumn" v-for="(item,index) in listData" :key="index">
            <div class="title box">{{ item.name }}</div>
            <div class="linebox box">
                <span class="line"></span>
            </div>
            <div class="content">
                <div class="contentRow box" v-for="(item1,index1) in item.children" :key="index1+'son'">
                    <span class="label box">{{ item1.name }}</span>
                    <span class="value">{{ item1.value }}</span>
                </div>
                <!-- <div class="contentRow box">
                    <span class="label box">上A</span>
                    <span class="value">17.7</span>
                </div>
                <div class="contentRow box">
                    <span class="label box">上A</span>
                    <span class="value">17.7</span>
                </div> -->
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue , Watch } from 'vue-property-decorator'
import { parseTime } from '@/utils/index.ts'
import { gettem } from '@/api/getData'

@Component({
    name: 'TemShow'
})
export default class extends Vue {
    private currentTime:string | Number | null = '';
    private timer: NodeJS.Timer | null | Number = null;

    private listData = [{
        name: '1#主变柜',
        children: [{
            name: '上A',
            value: '17.7'
        },{
            name: '上B',
            value: '17.7'
        },{
            name: '上C',
            value: '17.3'
        },{
            name: '下A',
            value: '0'
        },{
            name: '下B',
            value: '0'
        },{
            name: '下C',
            value: '0'
        },{
            name: '电A',
            value: '0'
        },{
            name: '电B',
            value: '0'
        },{
            name: '电C',
            value: '0'
        }]
    },{
        name: '联络柜',
        children: [{
            name: '上A',
            value: '0'
        },{
            name: '上B',
            value: '0'
        },{
            name: '上C',
            value: '0'
        },{
            name: '下A',
            value: '0'
        },{
            name: '下B',
            value: '0'
        },{
            name: '下C',
            value: '0'
        }]
    },{
        name: '2#主变柜',
        children: [{
            name: '上A',
            value: '0'
        },{
            name: '上B',
            value: '0'
        },{
            name: '上C',
            value: '0'
        }]
    }]

    created(){
        this.gettem();
    }

    private async gettem(){
        let res = await gettem();
        const temList = res.data;
        console.log(temList);
    }

    beforeDestroy() {

    }
    
}
</script>

<style lang="scss" scoped>
.temShow{
    display: flex;
    .showColumn{
        width: 120px;
        .box{
            height: 40px;
        }
        .title{
            width: 100%;
            text-align: center;
            border-bottom: 1px solid #699ba6;
        }
        .linebox{
            text-align: center;
            .line{
                display: inline-block;
                width: 1px;
                height: 100%;
                background: #699ba6;
            }
        }
        .content{
            padding: 0 24px;
            margin: 0;
            .contentRow{
                position: relative;
                width: 100%;
                padding-left: 10px;
                line-height: 40px;
                border: 1px solid #699ba6;
                border-bottom: 0;
                .label{
                    display: block;
                    position: absolute;
                    left: -30px;
                    top: 0;
                    bottom: 0;
                    font-size: 12px;
                }
            }
            .contentRow:last-child{
                border-bottom: 1px solid #699ba6;
            }
            .contentRow:nth-child(1n){
                .value{
                    color: #f6e589;
                }
            }
            .contentRow:nth-child(2n){
                .value{
                    color: #9ac667;
                }
            }
            .contentRow:nth-child(3n){
                .value{
                    color: #e47f83;
                }
            }
        }
    }
}
</style>