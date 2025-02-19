<template>
     <!-- 注册模板开始 -->
     <el-form
        v-if="loginStore.status==false"
        class="formBox"
        ref="loginFormRef"
        :model="loginForm"
        :rules="rules"
        label-width="auto"
        style="max-width: 600px"
      >
          
          <el-form-item prop="userName">
          <el-input v-model="loginForm.userName" 
          placeholder="手机号"
          class="userName-input"
          >
          <template #prefix>
            <el-icon class="el-input__icon"><UserFilled /></el-icon>
          </template>
        </el-input>
        </el-form-item>
        <el-form-item prop="passWord">
          <el-input v-model="loginForm.passWord" 
          type="passWord"
          placeholder="密码"
          >
          <template #prefix>
            <el-icon class="el-input__icon"><Lock /></el-icon>
          </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="validCode">
          <el-input v-model="loginForm.validCode" 
          placeholder="验证码"
          style="width: 340px;"
          class="validCode-input"
          >
          <template #prefix>
            <el-icon class="el-input__icon"><Lock /></el-icon>
          </template>
          </el-input>
          <!-- 获取验证码 -->>
          <el-button type="primary" class="validCodeButton" @click="getCode" :disabled="ifDisabledClick">{{ isChange?validCodeInit:countDown }}</el-button>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="onRegister(loginFormRef,loginForm)"
            class="registerButton"
          >注册账号</el-button>
        </el-form-item>
      </el-form>
       <!-- 注册模板结束 -->
</template>

<script setup>
    import { ref,reactive,computed} from 'vue';
    import { storeToRefs } from 'pinia';
    import { useLoginStore } from '../../../store/login';
    import { useRegisterStore } from '../../../store/register';
    import { getConfirmWord,verifyConfirmCode } from '../../../api/confirmWord';
    import { ElMessage } from 'element-plus';
    const loginStore=useLoginStore()
    const registerStore=useRegisterStore()
    const {loginForm}=storeToRefs(registerStore)
     const loginFormRef=ref(null)
  
    //  true显示获取验证码
     const isChange=ref(true)
     const countDownNumber=ref(60)
    const validCodeInit=ref('获取验证码')
    //false表示获取验证码可点击
     const ifDisabledClick=ref(false)
     //true表示可以发送获取验证码的请求
     const ifSendGetCode=ref(true)
  
    const countDown=computed(()=>{
      return `${countDownNumber.value}s`
    })





     const rules=reactive({
       userName:[
         {required:true,message:'手机号码是必填项',trigger:'blur'},
         {pattern: /^1[3-9]\d{9}$/, message: '手机号码格式不正确', trigger: 'blur'}
       ],
     
       passWord:[
         {required:true,message:'密码为必填项',trigger:'blur'},
         {min:6,max:12, message: '密码长度在 6 到 12 个字符之间', trigger: 'blur'}
       ],
       validCode:[
      {required:true,message:'验证码为必填项',trigger:'blur'}
       ]
     })



    // 获取验证码
    let timer
    const getCode=async ()=>{
      if(timer!==null){
        clearTimeout(timer)
        timer=null
      }
      isChange.value=false
      ifDisabledClick.value=true
      // 发送获取验证码请求
      if(ifSendGetCode.value){
        await getConfirmWord(loginForm.userName)
        ifSendGetCode.value=false
      }
      timer=setTimeout(()=>{
        if(countDownNumber.value>0){
          countDownNumber.value--
          getCode()
        }
        else{
          isChange.value=true
          ifDisabledClick.value=false
          countDownNumber.value=60
          ifSendGetCode.value=true
        }
      },1000)
      
    }

         // 注册账号
  const onRegister=(loginFormRef,loginForm)=>{
    if (!loginFormRef) return
   loginFormRef.validate ((valid, fields) => {
    if (valid) {
      verifyConfirmCode(loginForm).then((data)=>{
      console.log(data);
      // 如果成功
      if(data.code==10000){
        ElMessage.success('注册成功,请登录')
      }
      // 如果失败
      else if(data.code==-1){
        ElMessage.error (data.message.msg)
      }

      })
        
    } else {
      console.log('error submit!', fields)
    }
  })
   
  }


</script>

<style lang="less" scoped>
.registerButton{
  width: 600px;
}
.validCodeButton{
  width: 100px;
  position: absolute;
  right: 0;
//  margin-left: 100px;
  background-color: #dcdcdc;
  color: #696969;
  border: none;
}
.validCode-input ::v-deep .el-input__wrapper{
  border-top-right-radius: 0px !important;
  border-bottom-right-radius: 0px !important;
}
::v-deep .validCodeButton[data-v-483bae2b]{
  border-top-left-radius: 0px !important;
  border-bottom-left-radius: 0px !important;
}

.userName-input ::v-deep .el-input__wrapper{
    margin-top: 20px;
}
</style>