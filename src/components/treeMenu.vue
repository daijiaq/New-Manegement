<template>
        <template v-for="(item) in props.routeData">
          <!--当没有二级目录时  -->
          <el-menu-item 
          @click="handleClick(item,index)"
           v-if="!item.children||item.children.length==0"
           :index='`${props.index}-${item.meta.id}`'
           :key="`${props.index}-${item.meta.id}`"
           :class="{isActive:item.meta.path===route.path}">
            <el-icon size="20">
              <component :is="item.meta.icon"></component>
            </el-icon>
            <span>{{item.meta.name}}</span>
          </el-menu-item>
          <!-- 当有二级目录时 -->
          <el-sub-menu v-else :index='`${props.index}-${item.meta.id}`'>
              <template #title>
                <el-icon size="20">
                  <component :is="item.meta.icon"></component>
                </el-icon>
                <span>{{item.meta.name}}</span>
              </template>
              <tree-menu :index="`${props.index}-${item.meta.id}`" :routeData="item.children" />
         </el-sub-menu>
        </template>
</template>

<script setup>
  import { useRouter,useRoute } from 'vue-router';
  import { useMenuStore } from '../store/menu';
import { onMounted } from 'vue';
  
  const props=defineProps(['routeData','index'])
 const route=useRoute()
  const  router=useRouter()
  const menuStore=useMenuStore()
  // onMounted(()=>{
  //   if()
  // })
  const handleClick=(item,active)=>{
    // 点击对应目录时把数据存进store中
    menuStore.setNavData(item)
    
    // 跳转到对应页面
    router.push(item.meta.path)
    // 展示存入的数据
    console.log(menuStore.navData);
     
  }
</script>

<style lang="less" scoped>
  .isActive{
    color: orange !important;
  }
</style>