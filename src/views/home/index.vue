<template>
    <div class="app-container">
        <el-row style="margin-bottom:30px;" class="ts-font24">{{ currentTime }}</el-row>
        <div class="content ts-font40">
            <el-row style="margin-bottom:15px;text-align:center;">浙江精锐莱</el-row>
            <el-row style="margin-bottom:50px;text-align:center;">无线测温监测系统</el-row>
            <el-row style="text-align:center;">
                <el-button type="primary" class="btn" @click="gomain">无线测温</el-button>
            </el-row>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue , Watch } from 'vue-property-decorator'
import { parseTime } from '@/utils/index.ts'

@Component({
    name: 'home'
})
export default class extends Vue {
    private currentTime:string | Number | null = '';
    private timer: NodeJS.Timer | null | Number = null;

    created(){
        let CTime = new Date;
        this.currentTime = parseTime(CTime, '{y}/{m}/{d} {h}:{i}:{s}');
        this.setTime();
    }

    private setTime(){
        this.timer = setInterval(()=>{
            let CTime = new Date;
            this.currentTime = parseTime(CTime, '{y}/{m}/{d} {h}:{i}:{s}');
        },1000);
    }

    private gomain(){
        this.$router.push("/main/index");
    }

    beforeDestroy() {
        clearInterval(Number( this.timer ));
    }
    
}
</script>

<style lang="scss" scoped>
.app-container{
    width: 100%;
    height: 100%;
    // min-height: calc(100vh-80px);
    .content{
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
    .btn{
        width: 100px;
        height: 50px;
    }
}
</style>