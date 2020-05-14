<template>
    <div class="sidenavbar">
        <el-collapse-transition>
            <el-row class="navcontent" v-show="isCollapse">
                <div class="Sideexpand" @click="Collapse(false)">
                    <i class="el-icon-arrow-left"></i>
                </div>
                <el-menu
                    :default-active="defaultActive"
                    class="el-menu-vertical-demo"
                    background-color="#abdedf"
                    active-text-color="#fff"
                    @open="handleOpen"
                    @close="handleClose"
                    router>
                    <el-menu-item v-for="(item,index) in menu" :key="index" :index="item.url">
                        <i :class="item.icon"></i>
                        <span slot="title">{{ item.title }}</span>
                    </el-menu-item>
                    <!-- <el-menu-item index="/dataSelect/index/realtimeData">
                        <i class="el-icon-s-data"></i>
                        <span slot="title">实时数据</span>
                    </el-menu-item>
                    <el-menu-item index="/dataSelect/index/historyData">
                        <i class="el-icon-refresh"></i>
                        <span slot="title">历史数据</span>
                    </el-menu-item> -->
                </el-menu>
            </el-row>
        </el-collapse-transition>
        <transition name="el-fade-in">
            <div class="expandContent" v-show="!isCollapse">
                <div class="Sideexpand" @click="Collapse(true)">
                    <i class="el-icon-arrow-right"></i>
                </div>
            </div>
        </transition>
    </div>
</template>

<script lang="ts">
import { Component, Vue , Prop } from 'vue-property-decorator'
import { SettingsModule } from '@/store/modules/settings'
import { MenuData } from '@/api/types'

@Component({
  name: 'SideNavbar',
  components: {
  }
})
export default class extends Vue {
    @Prop() private menu!: Array<MenuData>

    get isCollapse() {
        return SettingsModule.showSideBar
    }

    get defaultActive(){
        return this.$route.path;
    }

    private Collapse(value:boolean){
        var isCollapse = !SettingsModule.showSideBar;
        SettingsModule.ChangeSetting({ key: 'showSideBar', value })
    }

    private gohome(){
        this.$router.push("/home");
    }

    private handleOpen(key:string, keyPath:string) {
        console.log(key, keyPath);
    }

    private handleClose(key:string, keyPath:string) {
        console.log(key, keyPath);
    }
}
</script>

<style lang="scss">
.sidenavbar .el-menu-item{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    line-height: 1em;
    background: #abdedf;
    i{
        color: #3aacac;
    }
    span{
        margin-top: 8px;
    }
    &.is-active{
        background: #04aeae!important;
        i{
            color: #fff;
        }
    }
    &:hover{
        background: #04aeae!important;
        i{
            color: #fff;
        }
    }
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 100px;
    min-height: 400px;
}
</style>

<style lang="scss" scoped>
.sidenavbar {
    height: calc(100vh - 80px);
    position: relative;
    .navcontent{
        position: relative;
        width:100px;
        height: calc(100vh - 80px);
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        background: #abdedf;
        box-shadow: 0 1px 4px rgba(0,21,41,.08);
        .Sideexpand{
            width: 10px;
            height: 60px;
            background: #36bfad;
            position: absolute;
            left: 100px;
            top: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            border-top-right-radius: 5px;
            border-bottom-right-radius: 5px;
            i{
                color: #fff;
            }
        }
    }
    .expandContent{
        position: absolute;
        top: 50%;
        bottom: 0;
        .Sideexpand{
            width: 10px;
            height: 60px;
            background: #36bfad;
            position: absolute;
            left: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            border-top-right-radius: 5px;
            border-bottom-right-radius: 5px;
            i{
                color: #fff;
            }
        }
    }
    .nav_left{
        display: flex;
        height: 100%;
        flex-direction: column;
        justify-content: center;
        padding-left: 50px;
        color: #fff;
        .title{
            font-size: 30px;
            cursor: pointer;
            &:hover{
                color: #f00;
            }
        }
        .title_en{
            cursor: pointer;
            &:hover{
                color: #f00;
            }
        }
    }
    .menu{
        display: flex;
        justify-content: flex-end;
        padding-right: 50px;
        height: 100%;
        .menuItem{
            display: flex;
            flex-direction: column;
            justify-content: center;
            margin-right: 12px;
            .menucard{
                box-shadow: -2 2px 4px rgba(0,21,41,.08);
                width: 40px;
                height: 40px;
                background: linear-gradient(to bottom,#699ba6,#fff);
                margin-bottom: 5px;
                i{
                    font-size: 24px;
                }
            }
            .menu_title{
                font-size: 9px;
                text-align: center;
            }
        }
        .menuItem:hover .menucard{
            background: linear-gradient(to bottom,#c9987a,#fff);
        }
        .menuItem:hover .menu_title{
            color: #f00;
        }
        .menuItem:last-child{
            margin-right: 0;
        }
    }
}
</style>