<template>
  <view class="container">
    <view class="tool-list">
      <view class="tool-list-item" @click="navigate(item)" v-for="(item, index) in toolList">
        <span>{{ item.name }}</span>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'
const toolList = ref([
  {
    name: '通勤时间记录',
    path: '/pages/commuteTime/commuteTime',
  },
  {
    name: '加班时长计算',
    path: '/pages/overtimeRecord/overtimeRecord',
  },
])

const navigate = (tool) => {
  uni.navigateTo({
    url: tool.path,
  })
}
</script>

<style lang="scss">
.container {
  height: 100vh;
  box-sizing: border-box;
  padding: 20px;
  font-size: 14px;
  line-height: 24px;

  .tool-list {
    &-item {
      padding: 10px;
      border-bottom: 1px solid #eee;
      cursor: pointer;
    }
  }
}
</style>
