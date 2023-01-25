<script setup>
import PieChart from '@/components/PieChart.vue';
import LineChart from '@/components/LineChart.vue';
import BarChart from '@/components/BarChart.vue';
import RightBottomSVG from '@/components/RightBottomSVG.vue';

import { chargingPileData, processMonitoringData, chargingStatisticsData } from './config/home-data';
import { getPowerScreenData } from '@/services'
import { ref } from 'vue';

const chargingPile = ref(chargingPileData)
const processMonitoring = ref(processMonitoringData)
const chargingStatistics = ref(chargingStatisticsData)

getPowerScreenData().then(res => {
  console.log('res:', res)
  chargingPile.value = res.data.chargingPile.data,
  processMonitoring.value = res.data.processMonitoring.data
  chargingStatistics.value = res.data.chargingStatistics.data
})

</script>

<template>
  <main class="screen-bg">
    <div class="header"></div>

    <div class="left-top">
      <PieChart :echart-data="chargingPile"></PieChart>
    </div>

    <div class="left-bottom">
      <LineChart :echart-data="processMonitoring"></LineChart>
    </div>

    <div class="enter"></div>

    <div class="right-top"></div>

    <div class="right-center">
      <BarChart :echart-data="chargingStatistics"></BarChart>
    </div>
    
    <div class="right-bottom">
      <RightBottomSVG></RightBottomSVG>
    </div>
    
    <div class="bottom"></div>

  </main>
</template>

<style lang="less" scoped>
.screen-bg {
  position: absolute;
  width: 100%;
  height: 100%;
  background-image: url(@/assets/images/bg.png);
  color: red;
}

.reuse {
  position: absolute;
  background-repeat: no-repeat;
}

.header {
  .reuse();
  top: 21px;
  left: 0;
  right: 0;
  height: 56px;

  background-image: url(@/assets/images/bg_header.svg);
}

.left-top {
  .reuse();

  top: 116px;
  left: 16px;
  width: 536px;
  height: 443px;

  background-image: url(@/assets/images/bg_left-top.svg);
}

.left-bottom {
  .reuse();

  bottom: 49px;
  left: 16px;
  width: 536px;
  height: 443px;

  background-image: url(@/assets/images/bg_left_bottom.svg);
}

.right-top {
  .reuse();

  right: 17px;
  top: 96px;
  width: 519px;
  height: 327px;

  background-image: url(@/assets/images/bg_right_top.svg);
}

.right-center {
  .reuse();

  right: 17px;
  top: 443px;
  width: 519px;
  height: 327px;

  background-image: url(@/assets/images/bg_right_center.svg);
}

.right-bottom {
  .reuse();

  right: 17px;
  bottom: 49px;
  width: 519px;
  height: 242px;

  display: flex;
  justify-content: center;
  align-items: center;

  background-image: url(@/assets/images/bg_right_bottom.svg);
}

.center {
  .reuse();

  right: 540px;
  bottom: 272px;
  width: 823px;
  height: 710px;
  
  border: 5px pink solid;
}

.bottom {
  .reuse();

  right: 540px;
  bottom: 49px;
  width: 823px;
  height: 209px;

  background-image: url(@/assets/images/bg_bottom.svg);
}
</style>
