import { defineStore } from "pinia";
import { ref } from "vue";

export const useMenuStore=defineStore('menu',()=>{
    // 控制目录弹出与收起
    const isCollapse=ref(false)
    const clickPopup=()=>{
        isCollapse.value=!isCollapse.value
    }
    // 目录相关信息，为了渲染navHeader
    const navData=ref([])
    const setNavData=(item)=>{
        // 数组去重，如果还没有该项数据，则添加进数组
        // if(navData.value.findIndex(every=>every.path==item.path)===-1){
            
        //     navData.value.push(item)
        // }
        // 直接比较path的话，账号管理和陪护管理都是‘’，所以要用meta的path
        if(!navData.value.some(every=>every.meta.path===item.meta.path)){
            navData.value.push(item)
        }
    }
   
    return{
        isCollapse,
        clickPopup,
        navData,
        setNavData
    }
})