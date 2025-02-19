<template>
  <el-row
    justify="center"
    class="login-container"
  >
    <el-card class="center-card">
      <template #header>
        <div class="card-header">
          <img
            src="../../../public/login-head.png"
            alt=""
            class="login-bg"
          >
        </div>
      </template>
      <el-link
        type="primary"
        :underline="false"
        class="register-login"
        @click="loginStore.changeStatus"
      >{{ loginStore.status?'注册账号':'返回登录' }}</el-link>
      <!-- 登录模块 -->
      <loginForm/>
    <!-- 注册模块 -->
     <register/>
    </el-card>
  </el-row>

</template>

<script setup>
import loginForm from "./components/loginForm.vue";
import register from "./components/register.vue";
import { reactive, ref } from "vue";
import { useLoginStore } from "../../store/login";
const loginStore=useLoginStore()


</script>

 <style lang="less" scoped>
::v-deep .el-card__header {
  padding: 0;
}
.login-container {
  height: 100%;
  align-items: center;
  .center-card {
    width: 480px;
  }
}
.login-bg {
  width: 100%;
  background-color: #899fe1;
}
.register-login {
  margin-left: 383px;
  text-decoration: none;
}



</style>