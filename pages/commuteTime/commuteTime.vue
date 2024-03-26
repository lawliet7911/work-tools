<template>
  <view class="container">
    <view class="tab-type">
      <view class="tab-type-morning" :class="{ active: currentType === TYPE_MORNING }">上班</view>
      <view class="tab-type-afternoon" :class="{ active: currentType === TYPE_AFTERNOON }">下班</view>
    </view>
    <uni-calendar
      :insert="true"
      :lunar="true"
      :start-date="'1970-1-1'"
      :end-date="'2222-5-20'"
      @change="dateChangeHandler"
    />

    <view class="button" @click="recordClickHandler">记 录</view>

    <view class="time-list">
      <view class="time-list-item" v-for="(item, index) in timeList">
        <text>{{ nameMap[index] }}：</text>
        <text> {{ item }}</text>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, watchEffect, computed } from 'vue'
import { formatDate } from '../../shared/date'
const timeList = ref([])

const TYPE_AFTERNOON = 'TYPE_AFTERNOON'
const TYPE_MORNING = 'TYPE_MORNING'

// 读取storage里的数据
let storageData = uni.getStorageSync('timeMap')
if (!storageData) {
  uni.setStorageSync('timeMap', {})
  storageData = {
    [currentType.value]: {},
  }
} else storageData = storageData

// 初始化 今日
const today = formatDate(new Date(), 'yyyy-MM-dd')
let curDate = ref(today)
const currentType = computed(() => {
  // 根据当前时间是否大于12:00 判断是上班还是下班 12:00之前是上班 之后是下班为1
  return new Date().getHours() >= 12 ? TYPE_AFTERNOON : TYPE_MORNING
})

console.log(currentType.value)

watchEffect(() => {
  debugger
  storageData[currentType.value] = storageData[currentType.value] || {}
  storageData[currentType.value][curDate.value] = storageData[currentType][curDate.value] || timeList.value
  uni.setStorageSync('timeMap', storageData)
})

const dateChangeHandler = (date) => {
  curDate.value = date.fulldate
  timeList.value = storageData[currentType.value][curDate.value] || []
}

// 时间段index对应的名称map
const timeNameMapMorning = {
  0: '出发',
  1: '上4号线',
  2: '上2号线',
  3: '出站上电梯',
  4: '打卡完毕',
}

const timeNameMapAfternoon = {
  0: '下班',
  1: '上2号线',
  2: '上4号线',
  3: '出站上电梯',
  4: '到家',
}

const nameMap = computed(() => {
  return currentType.value === 0 ? timeNameMapMorning : timeNameMapAfternoon
})

// 时间最多可以记录 出发 -  上4号线  -  上2号线  -  出站上电梯  - 打卡完毕 5个时间端 超过不push
const recordClickHandler = () => {
  const date = formatDate(new Date(), 'yyyy-MM-dd HH:mm:ss')
  if (timeList.value.length >= 5) return
  timeList.value.push(date)
}
</script>

<style lang="scss">
.container {
  height: 100vh;
  box-sizing: border-box;
  font-size: 14px;
  line-height: 24px;

  .tab-type {
    display: flex;
    padding: 20px;
    &-morning,
    &-afternoon {
      flex: 1;
      text-align: center;
      height: 60rpx;
      line-height: 60rpx;
      border-radius: 10rpx;
      &.active {
        background-color: deepskyblue;
        color: #fff;
      }
    }
  }

  .time-list {
    &-item {
    }
  }

  .button {
    width: 300rpx;
    height: 300rpx;
    background-color: deepskyblue;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    font-weight: bold;
    font-size: 80rpx;
    border-radius: 50%;
    color: #fff;
    margin: 100rpx auto;
  }
}
</style>
