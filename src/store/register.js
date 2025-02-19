import { defineStore } from "pinia";
import { ref,reactive } from "vue";

export const useRegisterStore=defineStore('register',()=>{
    const loginForm=reactive({
      userName:'',
      passWord:'',
      validCode:''
    })
    return{
        loginForm
    }
})