import { defineStore } from "pinia";
import { ref } from "vue";

export const useLoginStore=defineStore('login',()=>{
    // 注册 登录 true代表注册
    const status = ref(true);
    const changeStatus = () => {
      status.value = !status.value;
    };

    return{
        status,
        changeStatus
    }
})