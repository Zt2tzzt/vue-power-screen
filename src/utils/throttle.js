export default function ztthrottle(fn, interval, { leading = true, trailing = false } = {}) {
	let startTime = 0
	let timer = null
	const _throttle = function(...args) {
		return new Promise((resolve, reject) => {
			try {
				const nowTime = new Date().getTime() // 1.获取当前时间
				if (!leading && startTime === 0) { // 对立即执行进行控制
					startTime = nowTime
				}
				const waitTime = interval - (nowTime - startTime) // 2.计算需要等待的时间执行函数
				if (waitTime <= 0) {
					if (timer) clearTimeout(timer)
					const res = fn.apply(this, args)
					resolve(res)
					startTime = nowTime
					timer = null
					return
				}
				if (trailing && !timer) { // 3.判断是否需要执行尾部
					timer = setTimeout(() => {
						const res = fn.apply(this, args)
						resolve(res)
						startTime = leading ? new Date().getTime() : 0
						timer = null
					}, waitTime);
				}
			} catch (error) {
				reject(error)
			}
		})
	}
	_throttle.cancel = function() {
		if (timer) clearTimeout(timer)
		startTime = 0
		timer = null
	}
	return _throttle
}