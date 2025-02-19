<template>
         <!-- 手机号 密码 登录 -->
         <el-form
        v-if="loginStore.status==true"
        class="formBox"
        ref="formRef"
        :model="loginForm"
        :rules="rules"
        label-width="auto"
        style="max-width: 600px"
      >
        <el-form-item prop="userName">
          <el-input v-model="loginForm.userName" 
          placeholder="手机号"
          >
          <template #prefix>
            <el-icon class="el-input__icon"><UserFilled /></el-icon>
          </template>
        </el-input>
        </el-form-item>
        <el-form-item prop="passWord">
          <el-input v-model="loginForm.passWord" 
          type="password"
          placeholder="密码"
          >
          <template #prefix>
            <el-icon class="el-input__icon"><Lock /></el-icon>
          </template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="onLogin(formRef,loginForm)"
            class="loginButton"
          >登录</el-button>
        </el-form-item>
      </el-form>
      <!-- 登录模板结束 -->
</template>

<script setup>
    import { useRouter } from "vue-router";
    import { ref,reactive,onMounted } from "vue";
    import { storeToRefs } from "pinia";
    import {useLoginStore} from '../../../store/login'
    import { useRegisterStore } from "../../../store/register";
    import { login } from "../../../api/login";
    import { ElMessage } from "element-plus";
    const loginStore=useLoginStore()
    const registerStore=useRegisterStore()
    const {loginForm}=storeToRefs(registerStore)

    

    const rules=reactive({
       userName:[
         {required:true,message:'手机号码是必填项',trigger:'blur'},
         {pattern: /^1[3-9]\d{9}$/, message: '手机号码格式不正确', trigger: 'blur'}
       ],
     
       passWord:[
         {required:true,message:'密码为必填项',trigger:'blur'}
       ]
     })


     onMounted(()=>{
        if(localStorage.getItem('token')){
          router.push({path:'/'})
        }
     })

   // 登录
   const formRef=ref(null)
    const router=useRouter()
    const onLogin=(formRef,loginForm)=>{
        if(!formRef) return
        formRef.validate((valid,fields)=>{
          if(valid){
            const {userName,passWord}=loginForm
            login(userName,passWord).then((res)=>{
              console.log(res);
              
              if(res.code==10000){
                let timer
                  ElMessage.success('登录成功')
                  localStorage.setItem('token',res.data.token)
                  localStorage.setItem('userInfo',JSON.stringify(res.data.userInfo))
                timer= setTimeout(()=>{
                    router.push({path:'/'})
                  },3000)
              }
              else if(res.code==-1){
                  ElMessage.error (res.message)

              }
            })
            
          }
        })
       
        
    }
</script>

<style lang="less" scoped>
.formBox{
  margin-top: 13px;
}
.loginButton{
  width: 600px;
}
</style>