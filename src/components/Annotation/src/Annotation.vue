<template>
  <el-container id="container" class="shadow">
    <el-header class="header">
      <el-row align="middle">
        <el-tag
            v-for="item in dynamicTags"
            :key="item.label"
            type="success"
            closable
            @close="handleClose(item.label)"
            @click="handleClick(item)"
            :effect="item.effect">
          {{ item.label }}
        </el-tag>
        <el-input
            v-if="inputVisible"
            ref="saveTagInput"
            v-model="inputValue"
            class="input-new-tag"
            size="mini"
            @keyup.enter="handleInputConfirm"
            @blur="handleInputConfirm"
        >
        </el-input>
        <el-button v-else class="button-new-tag" size="small" @click="showInput">
          + New Tag
        </el-button>
      </el-row>
    </el-header>
    <el-main class="main">
      <el-row>
        <p id="text">
          <span id="1">想要</span><span id="2">和你</span>
          <span id="3">低空</span><span id="4">飞行</span>
          <span id="5">和你</span><span id="6">到处</span>
          <span id="7">收集</span><span id="8">氧气</span>
          <span id="9">假如</span><span id="10">迷雾</span>
          <span id="11">你</span><span id="12">看不清</span>
          <span id="13">不如</span><span id="14">坠入</span>
          <span id="15">我的</span><span id="16">怀里</span>
        </p>

      </el-row>
    </el-main>
  </el-container>
  <el-affix position="bottom" :offset="20">
    <el-button type="success" class="operation">上一个</el-button>
    <el-button type="success" class="operation">下一个</el-button>
  </el-affix>
</template>

<script>
import Highlighter from "../../../utils/Highlighter/Highlighter.js";

export default {
  data() {
    return {
      dynamicTags: [
        {label: 'tag1', effect: 'plain'},
        {label: 'tag2', effect: 'dark'},
        {label: 'tag3', effect: 'plain'}
      ],
      inputVisible: false,
      inputValue: '',
      chosenLabel: {
        value: 'tag2'
      }
    }
  },
  mounted() {
    console.log(this.chosenLabel, this.chosenLabel.value, 1)
    const highlighter = new Highlighter({
      labelTag: this.chosenLabel
    })
    highlighter.run()
    document.querySelector('#container').style.height = window.outerHeight
  },
  methods: {
    handleClose(label) {
      this.dynamicTags.splice(this.dynamicTags.findIndex(tag => tag.label === label), 1)
    },
    showInput() {
      this.inputVisible = true
      this.$nextTick((_) => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },
    handleInputConfirm() {
      const inputValue = this.inputValue
      if (inputValue) {
        this.dynamicTags.push({
          label: inputValue,
          effect: 'plain'
        })
      }
      this.inputVisible = false
      this.inputValue = ''
    },
    handleClick(item) {
      if (item.effect === 'dark') return
      // const switchMapper = {'plain': 'dark', 'dark': 'plain'}
      this.dynamicTags.forEach(tag => {
        tag.effect = 'plain'
      })
      item.effect = 'dark'
      this.chosenLabel.value = item.label
      console.log(this.chosenLabel)
    }
  }
}
</script>

<style scoped>
.header {
  background-color: bisque;
}

.main {
  background-color: white;
}

.el-row {
  height: 100%;
}

.el-tag {
  margin: 0 5px;
}

#text span {
  margin: 10px 3px;
}

.shadow {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04)
}

.el-affix {
  margin-top: 80px;
}

.operation {
  margin: 0 50px;
  height: 100px;
  width: 100px;
}
</style>