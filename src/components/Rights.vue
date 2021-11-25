<template>
<h1>Right Page</h1>
  <input v-model="labelTag">
  <p id="text" ref="text" @click="addActiveTag">
    <span id="1">this</span><span id="2">is</span>
    <span id="3">one</span><span id="4">conversation</span>
    <span id="5">to</span><span id="6">check</span>
  </p>


</template>
<script setup>
import Highlighter from "../utils/Highlighter/Highlighter.js"
import {onMounted, ref} from "vue";
document.oncontextmenu = e => false;
const labelTag = ref('person')
onMounted(() =>{
  const highlighter = new Highlighter({
    labelTag,
    rootSelector: '#text'
  })
  highlighter.run()
  highlighter.addActiveTagFromStorage()
})

</script>

<style scoped>
:deep(.highlight){
  background-color: deepskyblue;
}
#text span{
  margin: 0 5px;
}
:deep(.label){
  color: blueviolet;
}
</style>