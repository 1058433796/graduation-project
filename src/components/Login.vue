<template>
  <el-container>
    <el-main>
      <el-form label-position="left" label-width="80px" :model="profile">
        <el-form-item label="用户名">
          <el-input v-model="profile.userName"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input type="password" v-model="profile.pswd"></el-input>
        </el-form-item>
        <el-button type="success" @click="onLogin">登录</el-button>
      </el-form>
    </el-main>
  </el-container>
</template>

<script setup>
import { reactive } from "vue";
import {useRouter} from "vue-router";

const router = useRouter()
const profile = reactive({
  userName: '',
  pswd: ''
})
function onLogin(){
  if(profile.userName === 'admin' && profile.pswd === '1234'){
    router.push({name: 'index'})
    localStorage.setItem('token', JSON.stringify(profile.userName))
  }else{
    localStorage.removeItem('token')
  }
}

</script>

<style scoped>
.el-container {
  background-color: deepskyblue;
  height: 100%;
  margin: 140px 0;
}
.el-form {
  width: 30%;
  margin: auto;
}
</style>