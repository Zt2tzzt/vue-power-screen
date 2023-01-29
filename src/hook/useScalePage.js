import throttle from '@/utils/throttle'
import { onMounted, onUnmounted } from 'vue'

export default function useScalePage({
	targetX = 1920,
	targetY = 1080,
	targetRatio = 16 / 9
} = {}) {

	const resize = throttle(() => {
		// 拿到当前设备(浏览器)的宽度
		const currentX = document.documentElement.clientWidth || document.body.clientWidth
		const currentY = document.documentElement.clientHeight || document.body.clientHeight
		//  1920 * 1080  -> 3840 * 2160

		// 3.计算缩放比例
		const currentRatio = currentX / currentY // 当前宽高比率
		let scaleRatio = 0

		// 超宽屏
		if(currentRatio > targetRatio) {
			scaleRatio = currentY / targetY
			document.body.style = `width:${targetX}px; height:${targetY}px; transform: scale(${scaleRatio}) translateX(-50%); left: 50%` // 使用 transform，新增一个渲染层
		} else {
			scaleRatio = currentX / targetX;
			document.body.style = `width:${targetX}px; height:${targetY}px; transform: scale(${scaleRatio})`
		}
	}, 100, { trailing: true })

	onMounted(() => {
		resize()
		window.addEventListener('resize', resize)
	})

	onUnmounted(() => {
		window.removeEventListener('resize', resize)
	})


}