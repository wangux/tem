<template>
    <div class="dataSelect-page">
        <SideNavbar :menu="menu" />
        <div class="page_main">
            <!-- <transition
            name="fade-transform"
            mode="out-in"
            > -->
                <router-view :key="key" />
            <!-- </transition> -->
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue , Watch } from 'vue-property-decorator'
import { SettingsModule } from '@/store/modules/settings'
import { MenuData } from '@/api/types'
import SideNavbar from '@/components/SideNavBar/index.vue'

@Component({
    name: 'home',
    components: {
        SideNavbar
    }
})
export default class extends Vue {
    private currentTime:string | Number | null = '';
    private timer: NodeJS.Timer | null | Number = null;
    private menu:Array<MenuData> = [{
			url: '/eventLog/index/newEvent',
			title: '最新事件',
			icon: 'el-icon-s-data'
    },{
        url: '/eventLog/index/historyEvent',
        title: '历史事件',
        icon: 'el-icon-refresh'
    }]
    // private isCollapse = SettingsModule.showSideBar;

    created(){
    }

    //类似于computed属性
    get isCollapse() {
      return SettingsModule.showSideBar
    }

    get key() {
      return this.$route.path
    }
    
}
</script>

<style lang="scss" scoped>
.dataSelect-page{
    display: flex;
    width: 100%;
    height: 100%;
    // min-height: calc(100vh-80px);
    .page_main{
        width: 100%;
        min-height: calc(100vh-80px);
        // padding-left: 100px;
    }
}
</style>