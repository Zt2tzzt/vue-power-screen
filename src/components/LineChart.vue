<script setup>
import { onMounted, ref, watch } from 'vue';
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

const lineChartRef = ref(null)
let ztChart = null

const getOption = (echartData = {}) => ({
		grid: {
			left: '5%',
			right: '1%',
			top: '20%',
			bottom: '15%',
			containLabel: true // grid 区域是否包含坐标轴的刻度标签
		},
		legend: {
			right: 'center',
			bottom: '5%',
			itemGap: 20,
			itemWidth: 13,
			itemHeigth: 12,
			textStyle: {
				color: '#64BCFF'
			},
			icon: 'rect'
		},
		tooltip: {
			trigger: 'axis',
			axisPointer: {
				type: 'line',
				lineStyle: {
					color: '#20FF89'
				}
			}
		},
		xAxis: [
			{
				type: 'category',
				axisLine: {
					show: false
				},
				axisLabel: {
					color: '#64BCFF'
				},
				splitLine: {
					show: false
				},
				axisTick: {
					show: false
				},
				data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
			}
		],
		yAxis: [
			{
				type: 'value',
				splitLine: {
					show: false
				},
				axisLine: {
					show: false
				},
				axisLabel: {
					show: true,
					color: '#64BCFF'
				}
			}
		],
		series: [
			{
				name: echartData[0].name,
				type: 'line',
				smooth: true,
				stack: '总量',
				symbolSize: 5,
				showSymbol: false,
				itemStyle: {
					color: '#20FF89',
					lineStyle: {
						color: '#20FF89',
						width: 2
					}
				},
				areaStyle: {
					color: {
						type: 'linear',
						x: 0,
						y: 0,
						x2: 0,
						y2: 1,
						colorStops: [
							{
								offset: 0,
								color: '#20FF89'
							},
							{
								offset: 1,
								color: 'rgba(255, 255, 255, 0)'
							}
						]
					}
				},
				data: echartData[0].data
			},
			{
				name: echartData[1].name,
				type: 'line',
				smooth: true,
				stack: '总量',
				symbolSize: 5,
				showSymbol: false,
				itemStyle: {
					color: '#EA9502',
					lineStyle: {
						color: '#EA9502',
						width: 2
					}
				},
				areaStyle: {
					color: {
						type: 'linear',
						x: 0,
						y: 0,
						x2: 0,
						y2: 1,
						colorStops: [
							{
								offset: 0,
								color: '#EA9502'
							},
							{
								offset: 1,
								color: 'rgba(255, 255, 255, 0)'
							}
						]
					}
				},
				data: echartData[1].data
			}
		]
})

const setupEchart = echartData => {
	if (!ztChart) ztChart = useEchart(lineChartRef.value)
	const option = getOption(echartData)
	ztChart.setOption(option)
}

onMounted(() => {
	setupEchart(props.echartData)
})

watch(() => props.echartData, newVal => setupEchart(newVal))

</script>

<template>
	<div class="line-chart" ref="lineChartRef" :style="{width, height}">
	</div>
</template>

<style scoped lang="less"></style>
