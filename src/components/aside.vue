<template>
     <el-menu
        :style="{ width: menuStore.isCollapse ? '100px' : '230px' }"
        
        active-text-color="#fff"
        background-color="#545c64"
        class="aside-container"
        text-color="#fff"
        :collapse="menuStore.isCollapse"
        @open="handleOpen"
        @close="handleClose"
      >
      <p class="logo-lg">{{  menuStore.isCollapse ? '招新' : '招新后台管理系统' }}</p>
        <TreeMenu :routeData="routeData" :index="1"/>
    </el-menu>
</template>

<script setup>
    import TreeMenu from './treeMenu.vue';
    import { useRouter } from 'vue-router';
    import { ref,reactive } from 'vue';
    import { useMenuStore } from '../store/menu';
    const menuStore=useMenuStore()
    const router=useRouter()
    

    // 传入路由数据
    const routeData=reactive(router.options.routes[0].children)

    
    const handleOpen=()=>{

    }
    const handleClose=()=>{

    }
</script>

<style lang="less" scoped>
    .menuOpen{
        width: 230px;
    }
    .menuClose{
        width: 100px;
    }

    .aside-container{
        height: 100%;
        .logo-lg{
            text-align: center;
            height: 50px;
            line-height: 50px;
            font-size: 20px;
            color: #fff;
        }
    }
</style>