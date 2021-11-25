<template>
    <el-container>
      <Menu></Menu>
      <el-main>
        <el-row>
          <el-col :span="16" style="margin: 20px 40px;">
            <router-view></router-view>
          </el-col>
        </el-row>
      </el-main>
    </el-container>
</template>

<script setup>
import Menu from './Menu/index.js'

defineProps({
  userName: String
})

</script>
<style scoped>
</style>
