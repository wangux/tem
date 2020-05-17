<template>
    <div class="navbar">
        <el-row style="width:100%;">
            <el-col :span="10" class="nav_left">
                <el-row class="title" >
                    <span @click="gohome">温度在线监测系统</span>
                </el-row>
                <el-row class="title_en">
                    <span @click="gohome">Temperature Online Monitoring System</span>
                </el-row>
            </el-col>
            <el-col :span="14" class="menu">
                <template v-for="item in menuOptions">
                    <div class="menuItem" :key="item.label" v-if="!item.hidden"  @click="goLink(item.url)">
                        <el-card :body-style="{ height:'100%',display:'flex',justifyContent:'center',alignItems:'center' }" class="menucard">
                            <i :class="item.icon"></i>
                        </el-card>
                        <span class="menu_title">{{ item.label }}</span>
                    </div>
                </template>
            </el-col>
        </el-row>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { AppModule } from '@/store/modules/app'
import { UserModule } from '@/store/modules/user'

@Component({
  name: 'Navbar',
  components: {
  }
})
export default class extends Vue {
    private menuOptions = [
        { id: '1', icon: 'el-icon-s-data' , label: '温度一览' , url: '/home' },
        { id: '2', icon: 'el-icon-s-marketing' , label: '工况图' },
        { id: '3', icon: 'el-icon-s-platform' , label: '数据查询' , url: '/dataSelect/index' },
        { id: '4', icon: 'el-icon-platform-eleme' , label: '事件记录' , url: '/eventLog/index' },
        { id: '5', icon: 'el-icon-s-order' , label: '系统管理' , url: '/systemManage/index' },
        { id: '6', icon: 'el-icon-s-tools' , label: '登录' , url: '/login' , hidden: false },
        { id: '7', icon: 'el-icon-s-custom' , label: '退出' , hidden: true  },
    ];

    get device() {
        return AppModule.device.toString()
    }

    get avatar() {
        return UserModule.avatar
    }

    private toggleSideBar() {
        AppModule.ToggleSideBar(false)
    }

    private goLink(url:string){
        if( url && url != this.$route.path ){
            this.$router.push(url);
        }
    }

    private gohome(){
        this.$router.push("/home");
    }

    private async logout() {
        await UserModule.LogOut()
        this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    }
}
</script>

<style lang="scss" scoped>
.navbar {
    height: 80px;
    box-sizing: border-box;
    display: flex;
    justify-content:space-between;
    overflow: hidden;
    position: relative;
    background: #699ba6;
    box-shadow: 0 1px 4px rgba(0,21,41,.08);
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
                cursor: pointer;
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
