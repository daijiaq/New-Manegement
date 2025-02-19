<template>
  <div class="header-container">
    <div class="header-left">
      <el-icon class="icon" size="20" @click="handleOpenClose">
        <Fold />
      </el-icon>
    </div>

    <!-- 中间导航区域 -->
    <ul class="header-middle">
      <li v-for="(item,index) in menuStore.navData" :key="item.meta.path" class="header-middle-item" :class="{selected:route.path===item.meta.path}">
       
        <el-icon size="18" class="header-middle-item-icon">
          <component :is="item.meta.icon"></component>
        </el-icon>
      
        <span @click.stop="handleNavigation(item)">{{ item.meta.name }}</span>
        <el-icon size="18" class="header-middle-item-iconClose" @click="deleteItem(item,index)" >
          <Close/>
        </el-icon>
      </li>
    </ul>
     <!-- 中间导航区域 -->
    <div class="header-right">
      <el-dropdown>
        <div class="el-dropdown-link">
          <el-avatar class="userAvatar" :size="35" src='https://pic3.zhimg.com/v2-5fb13110e1de13d4c11e6e7f5b8026da_r.jpg' />
          <span class="userName">admin</span>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>Action 1</el-dropdown-item>
            <el-dropdown-item>Action 2</el-dropdown-item>
            <el-dropdown-item>Action 3</el-dropdown-item>
            <el-dropdown-item disabled>Action 4</el-dropdown-item>
            <el-dropdown-item divided>Action 5</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
</div>
</template>




<script setup>
  import { useRoute, useRouter } from 'vue-router';
  import { useMenuStore } from '../store/menu';
  import { ref } from 'vue';
  import { onMounted } from 'vue';


  
  const menuStore=useMenuStore()
  const handleOpenClose=()=>{
    // 点击按钮控制目录折叠/展开
    menuStore.clickPopup()
  }
// 跳转到相应路由
const router=useRouter()
 const route=useRoute()
// 跳转
 const handleNavigation=(item)=>{
  console.log(menuStore.navData);
  
    router.push(item.meta.path)
 }

//  一进来先渲染当前路由的导航,注释这个不会出现导航栏重复现象
//  onMounted(()=>{
//     console.log(route.meta.path);
//    console.log(menuStore.navData);
   
//       menuStore.setNavData(route)
    
//   })
 
  // navHeader删除
  const deleteItem=(item,index)=>{
    // 如果点击的与当前的不是同一个路由，则直接删除
    if(route.path!==item.meta.path){
        menuStore.navData.splice(index,1)
    }
    // 如果点击的与当前的是同一个路由
    else{
      // 判断当前位置
      // 如果是最后一个，则给前一个添加selected样式，再删除当前
      if(index===menuStore.navData.length-1){
        // 如果只剩最后一个，就跳转到默认路由，再删除当前
        if(index===0&&menuStore.navData.length===1){
          router.push('/')
          menuStore.navData.splice(index,1)
        }
        else{
          router.push(menuStore.navData[index-1].meta.path)
          menuStore.navData.splice(index,1)
        }
      }
      // 如果不是，则给后一个添加selected样式，再删除当前
      else{
        router.push(menuStore.navData[index+1].meta.path)
        menuStore.navData.splice(index,1)
      }
    }
   
  }

</script>

<style lang="less" scoped>
    .header-container{
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 100%;
      background-color: #fff;
      .icon{
        width: 48px;
        height: 48px;
      }
      .icon:hover{
        background-color: #f5f5f5;
        cursor: pointer;
      }
      .header-middle{
        display: flex;
       flex-grow: 1;
       align-items: center;
        height: 100%;
        .header-middle-item{
          padding-left: 5px;
          a{color: black;}
           display: flex;
           align-items: center;
           margin-left: 6px;
            height: 100%;
            &.selected{
              background-color: #f5f5f5;
              span{color: #409eff;}
              i{color: #409eff;}
             }
            .header-middle-item-icon{
              vertical-align: bottom;
            }
            .header-middle-item-iconClose{
                visibility: hidden;
            }
        }
        .header-middle-item:hover{
          cursor: pointer;
          background-color: #f5f5f5;
          .header-middle-item-iconClose{
            visibility: inherit;
            vertical-align: bottom;
          }
        }
      }
    }

    
   

  .el-dropdown-link{
    text-align: center;
    height: 100%;
    margin-right: 20px;

    .userAvatar{
      vertical-align: middle;
    }
    .userName{
      vertical-align: middle;
      margin-left: 6px;
    }
  }
</style>