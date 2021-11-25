<template>
  <el-aside width="200px">
    <el-row class="tac">
      <el-col>
        <el-menu
            :default-active="this.$route.path"
            class="el-menu-vertical-demo"
            router>
          <el-menu-item index="">
            <i class="el-icon-setting"></i>
            <span slot="title">文本导入</span>
          </el-menu-item>
          <el-menu-item index="/index/annotation">
            <i class="el-icon-setting"></i>
            <span slot="title">文本标注</span>
          </el-menu-item>
          <el-menu-item index="">
            <i class="el-icon-setting"></i>
            <span slot="title">文本审核</span>
          </el-menu-item>
          <el-menu-item index="">
            <i class="el-icon-setting"></i>
            <span slot="title">文本导出</span>
          </el-menu-item>
          <el-menu-item index="">
            <i class="el-icon-setting"></i>
            <span slot="title" @click="onLogout">退出登录</span>
          </el-menu-item>
        </el-menu>
      </el-col>
    </el-row>
  </el-aside>
</template>

<script setup>
import {useRouter} from "vue-router";

const router = useRouter()

function onLogout() {
  localStorage.removeItem('token')
  router.push({
    name: 'login'
  })
}
</script>

<style scoped>

</style>