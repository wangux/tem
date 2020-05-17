<template>
    <div class="systemManage">
        <div class="btn">
            <div class="box">
                <i class="el-icon-star-off"></i>
            </div>
            <span>变量管理</span>
        </div>
        <div class="btn">
            <div class="box">
                <i class="el-icon-user"></i>
            </div>
            <span>用户管理</span>
        </div>
        <div class="btn">
            <div class="box">
                <i class="el-icon-setting"></i>
            </div>
            <span>密码修改</span>
        </div>
        <div class="btn">
            <div class="box">
                <i class="el-icon-bangzhu"></i>
            </div>
            <span>通讯管理</span>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue , Watch } from 'vue-property-decorator'

@Component({
    name: 'systemManage'
})
export default class extends Vue {
    private currentTime:string | Number | null = '';
    private timer: NodeJS.Timer | null | Number = null;

    created(){
    }

    private setTime(){
    }

    private gomain(){
        this.$router.push("/main/index");
    }

    beforeDestroy() {
    }
    
}
</script>

<style lang="scss" scoped>
.systemManage{
    width: 100%;
    height: calc(100vh - 80px);
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-around;
    .btn{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        .box{
            width: 120px;
            height: 120px;
            background: #2ebebc;
            box-shadow: 0 2px 12px 0 #999;
            border-radius: 5px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 10px;
            i{
                color: #fff;
                font-size: 50px;
                display: inline-block;
            }
            &:hover{
                i{
                    color: #f00;
                }
            }
        }
    }
    
}
</style>