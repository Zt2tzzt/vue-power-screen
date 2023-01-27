<script setup>
import WaterBall from './WaterBall.vue';

const props = defineProps({
	percentage: {
		type: Number,
		default: 0
	},
	panelData: {
		type: Array,
		default() {
			return []
		}
	}
})

</script>

<template>
	<div class="right-top-panel">
		<!-- 水球 -->
		<WaterBall class="right-water-ball" :percentage="percentage"></WaterBall>
		<!-- 图例 -->
		<div class="legend">
      <template v-for="item of panelData" :key="item.id">
        <div class="leg-name">
          <span :class="['dot', `area${item.id}`]"></span>
          <span class="name">{{ item.name }}</span>
          <span class="percentage">{{ item.percentage }}</span>
        </div>
      </template>
    </div>
	</div>
</template>

<style scoped>
.right-top-panel {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
}

.right-top-panel .right-water-ball {
  width: 269px;
  height: 199px;
  margin-top: 50px;
  margin-left: 40px;
}

.right-top-panel .legend {
  flex: 1;
}
.right-top-panel .leg-name {
  margin-top: 23px;
  margin-left: 40px;
}
.right-top-panel .leg-name span {
  display: inline-block;
  font-size: 20px;
  margin-right: 11px;
}
.right-top-panel .legend .dot {
  width: 17px;
  height: 17px;
  border-radius: 50%;
}
.right-top-panel .legend .area1 {
  background-color: #209393;
}
.right-top-panel .legend .area2 {
  background-color: #1a54a5;
}
.right-top-panel .legend .area3 {
  background-color: #85caf0;
}
.right-top-panel .legend .area4 {
  background-color: #f5b64a;
}
.right-top-panel .legend .area5 {
  background-color: #ee792e;
}
.right-top-panel .legend .name {
  color: white;
}
.right-top-panel .legend .percentage {
  color: #0cd2ea;
}
</style>