<script setup>
import { RouterView } from 'vue-router'
import useScalePage from '@/hook/useScalePage'

const designLayout = {
  targetX: 1920, // 设计稿宽
  targetY: 1080, // 设计稿高
  targetRatio: 16 / 9 // 设计稿宽高比
}

// 大屏适配
useScalePage(designLayout)
</script>

<template>
  <RouterView />
</template>

<style scoped>
</style>
