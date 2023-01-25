/*
 * axios封装的2点好处。
 * 1. 如果axios某天不再维护，所有依赖axios的代码都不需要修改，只需要更改封装的代码。
 * 2. 发送请求代码，存在很多相同的逻辑。
 */
import axios from 'axios'

class ZTRequest {
	instance = null
	interceptors = null
	showLoading = true

	constructor(config) {
		// 创建axios实例
		this.instance = axios.create(config)
		if (config.showLoading === false) {
			this.showLoading = false
		}
		// 保存基本信息
		this.interceptors = config.interceptor
		// 使用拦截器（单个实例拦截器）
		this.instance.interceptors.request.use(
			this.interceptors?.requestInterceptor,
			this.interceptors?.requestInterceptorCatch
		)
		this.instance.interceptors.response.use(
			this.interceptors?.responseInterceptor,
			this.interceptors?.responseInterceptorCatch
		)
		// 使用拦截器（全局拦截器）
		this.instance.interceptors.request.use(
			config => {
				if (this.showLoading) {
				}
				return config
			},
			err => {
				return err
			}
		)
		this.instance.interceptors.response.use(
			res => {
				const data = res.data
				return data
			},
			err => {
				return err
			}
		)
	}

	// 封装request方法
	request(config) {
		return new Promise((resolve, reject) => {
			// 1.单个请求对请求 config 的处理
			if (config.interceptor?.requestInterceptor) {
				config = config.interceptor.requestInterceptor(config)
			}
			if (config.showLoading === false) {
				this.showLoading = false
			}

			this.instance
				.request(config)
				.then(res => {
					console.log('---请求成功---')
					// 单个请求对 res 的处理
					if (config.interceptor?.responseInterceptor) {
						res = config.interceptor.responseInterceptor(res)
					}
					this.showLoading = true // showLoading 还原，不影响下一个请求
					resolve(res)
				})
				.catch(err => {
					console.log('---请求失败---', err)
					this.showLoading = true // showLoading 还原，不影响下一个请求
					reject(err)
				})
		})
	}

	get(config) {
		return this.request({ ...config, method: 'GET' })
	}
	post(config) {
		return this.request({ ...config, method: 'POST' })
	}
	delete(config) {
		return this.request({ ...config, method: 'DELETE' })
	}
	patch(config) {
		return this.request({ ...config, method: 'PATCH' })
	}
}

export default ZTRequest

/**
 * 服务器返回失败的2种模式
	1. HttpErrorCode -> 在 resposeCatch 中拦截，返回一个 err -> err.respons.status
		- 2xx -> 成功
		- 4xx -> 失败
		- 5xx -> 一般指服务器端发生错误的失败
	2. HttpErrorCode
		- 200，数据 {data: "", success: false, returCode: -1001} - 在返回的数据中体现失败。
 */
