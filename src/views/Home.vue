<script setup>
import PieChart from '@/components/PieChart.vue';
import LineChart from '@/components/LineChart.vue';
import BarChart from '@/components/BarChart.vue';
import RightBottomSVG from '@/components/RightBottomSVG.vue';
import CenterSvg from '@/components/CenterSvg.vue';

import { chargingPileData, processMonitoringData, chargingStatisticsData, exceptionMonitoringData, dataAnalysisData, chargingTop4Data } from './config/home-data';
import { getPowerScreenData } from '@/services'
import { ref } from 'vue';
import BottomPanel from '@/components/BottomPanel.vue';
import RightTopPanel from '@/components/RightTopPanel.vue';

const chargingPile = ref(chargingPileData)
const processMonitoring = ref(processMonitoringData)
const chargingStatistics = ref(chargingStatisticsData)
const exceptionMonitoring = ref(exceptionMonitoringData)
const dataAnalysis = ref(dataAnalysisData)
const chargingTop4 = ref(chargingTop4Data)
const percentage = ref(0)

getPowerScreenData().then(res => {
  console.log('res:', res)
  chargingPile.value = res.data.chargingPile.data,
  processMonitoring.value = res.data.processMonitoring.data
  chargingStatistics.value = res.data.chargingStatistics.data
  exceptionMonitoring.value = res.data.exceptionMonitoring.data
  dataAnalysis.value = res.data.dataAnalysis.data
  chargingTop4.value = res.data.chargingTop4.data
  percentage.value = res.data.chargingTop4.totalPercentage
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

    <div class="center">
      <CenterSvg></CenterSvg>
    </div>

    <div class="right-top">
      <RightTopPanel :percentage="percentage" :panel-data="chargingTop4"></RightTopPanel>
    </div>

    <div class="right-center">
      <BarChart :echart-data="chargingStatistics"></BarChart>
    </div>
    
    <div class="right-bottom">
      <RightBottomSVG :dots="exceptionMonitoring"></RightBottomSVG>
    </div>
    
    <div class="bottom">
      <BottomPanel :panel-data="dataAnalysis"></BottomPanel>
    </div>

  </main>
</template>

<style lang="less" scoped>
.screen-bg {
  position: absolute;
  width: 100%;
  height: 100%;

  background-color: #070a3c;
  background-image: url(@/assets/images/bg.png);
  background-repeat: no-repeat;
  background-size: 100% 100%;
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
