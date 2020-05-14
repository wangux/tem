<template>
    <div class="app-container">
        <el-row class="lineone">
            <div class="btncontent">
                <el-button type="primary" class="btn" @click="gohome">主页面</el-button>
            </div>
            <div class="title">无线测温监测系统</div>
        </el-row>
        <el-row class="mainPageContent">
            <TemShow />
        </el-row>
    </div>
</template>

<script lang="ts">
import { Component, Vue , Watch } from 'vue-property-decorator'
import { parseTime } from '@/utils/index.ts'
import { TemShow } from './component'

@Component({
    name: 'mainPage',
    components: {
        TemShow
    }
})
export default class extends Vue {
    private currentTime:string | Number | null = '';
    private timer: NodeJS.Timer | null | Number = null;

    created(){
        
    }

    private gohome(){
        this.$router.push("/home");
    }

    beforeDestroy() {

    }
    
}
</script>

<style lang="scss" scoped>
.app-container{
    width: 100%;
    height: 100%;
    // min-height: calc(100vh-80px);
    .lineone{
        position: relative;
        .btncontent{
            position: absolute;
            left: 0;
            top: 0;
        }
        .title{
            height: 50px;
            line-height: 50px;
            font-size: 32px;
            text-align: center;
        }
    }
    .content{
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
    .btn{
        width: 100px;
        height: 50px;
    }
    .mainPageContent{
        display: flex;
        justify-content: center;
        margin-top: 45px;
    }
}
</style>