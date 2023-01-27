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

const pieRef = ref(null)
let ztChart = null

const getOption = (echartData = {}) => {

	const colors = echartData.map(item => item.color)
	const data = echartData.map(item => ({
		value: item.value,
		name: item.name
	}))
	const total = echartData.reduce(
		(accumulate, currentVal) => accumulate + currentVal.value * 1,
		0
	)

	return {
		color: colors,
		title: {
			text: `{nameSty| 充电桩总数}\n{number|${total}}`,
			top: '50%',
			left: '30%',
			textStyle: {
				rich: {
					nameSty: {
						fontSize: 19,
						color: 'white',
						padding: [10, 0]
					},
					number: {
						fontSize: 24,
						color: 'white',
						padding: [4, 0, 0, 20]
					}
				}
			}
		},
		legend: {
			orient: 'vertical',
			right: '10%',
			top: '18%',
			itemGap: 20,
			itemWidth: 16,
			itemHeigth: 16,
			icon: 'rect',
			formatter: function (name) {
				var currentItem = echartData.find(item => item.name === name)
				return (
					'{nameSty|' +
					currentItem.name +
					'}\n' +
					'{numberSty|' +
					currentItem.value +
					'个 }' +
					'{preSty|' +
					currentItem.percentage +
					'}'
				)
			},
			textStyle: {
				rich: {
					nameSty: {
						fontSize: 12,
						color: '#FFFFFF',
						padding: [10, 14]
					},
					numberSty: {
						fontSize: 12,
						color: '#40E6ff',
						padding: [0, 0, 0, 14]
					},
					preSty: {
						fontSize: 12,
						color: '#40E6ff'
					}
				}
			}
		},
		series: [
			{
				type: 'pie',
				center: ['40%', '57%'],
				radius: ['30%', '75%'],
				label: {
					show: false
				},
				data: data,
				roseType: 'area'
			}
		]
	}

}

const setupEchart = echartData => {
	if (!ztChart) ztChart = useEchart(pieRef.value)
	const option = getOption(echartData)
	ztChart.setOption(option)
}

onMounted(() => {
	setupEchart(props.echartData)
})

watch(() => props.echartData, newVal => setupEchart(newVal))
</script>

<template>
	<div class="pie-chart" ref="pieRef" :style="{ width, height }"></div>
</template>

<style scoped lang="less"></style>
