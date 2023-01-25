import * as echarts from 'echarts'
import { onUnmounted } from 'vue'

export default function useEchart(containerEl) {
	
	const echartInstance = echarts.init(containerEl, null, { renderer: 'svg' })

	const setOption = option => echartInstance.setOption(option)

	const resize = () => echartInstance.resize()

	onUnmounted(() => {
		echartInstance.dispose()
	})

	return {
		echartInstance,
		setOption,
		resize
	}

}