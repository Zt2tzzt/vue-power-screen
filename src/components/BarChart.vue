<script setup>
import { onMounted, ref, watch } from 'vue'
import useEchart from '@/hook/useEchart'

const props = defineProps({
	width: {
		type: String,
		default: '100%'
	},
	height: {
		type: String,
		default: '100%'
	},
	echartData: {
		type: Array,
		default: function () {
			return []
		}
	}
})

const barChartRef = ref(null)
let ztChart = null

const getOption = (echartData = {}) => {
	const category = echartData.map(item => item.name)
	const categoryData = echartData.map(item => item.value)

	return {
		grid: {
			left: '5%',
			right: '5%',
			top: '30%',
			bottom: '5%',
			containLabel: true // grid 区域是否包含坐标轴的刻度标签
		},
		tooltip: {},
		xAxis: {
			axisLine: {
				show: true,
				lineStyle: {
					color: '#42A4FF'
				}
			},
			axisTick: {
				show: false
			},
			axisLabel: {
				color: 'white'
			},

			data: category
		},
		yAxis: {
			name: '个',
			nameTextStyle: {
				color: 'white',
				fontSize: 13
			},
			axisLine: {
				show: true,
				lineStyle: {
					color: '#42A4FF'
				}
			},
			axisTick: {
				show: false
			},
			splitLine: {
				show: true,
				lineStyle: {
					color: '#42A4FF'
				}
			},
			axisLabel: {
				color: 'white'
			}
		},
		series: [
			{
				name: '销量',
				type: 'bar',
				barWidth: 17,
				itemStyle: {
					color: {
						type: 'linear',
						x: 0,
						y: 0,
						x2: 0,
						y2: 1,
						colorStops: [
							{
								offset: 0,
								color: '#01B1FF' // 0% 处的颜色
							},
							{
								offset: 1,
								color: '#033BFF' // 100% 处的颜色
							}
						],
						global: false // 缺省为 false
					}
				},
				data: categoryData
			}
		]
	}
}

const setupEchart = (echartData = {}) => {
	if (!ztChart) ztChart = useEchart(barChartRef.value)
	const option = getOption(echartData)
	ztChart.setOption(option)
}

onMounted(() => {
	setupEchart(props.echartData)
})

watch(() => props.echartData, newVal => setupEchart(newVal))
</script>

<template>
	<div class="bar-chart" ref="barChartRef" :style="{width, height}"></div>
</template>

<style scoped lang="less"></style>
