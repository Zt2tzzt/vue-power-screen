import ZTRequest from './request'
import { BASE_URL, TIME_OUT } from './request/config'
// import storage from '@/utils/cache'

export default new ZTRequest({
	baseURL: BASE_URL,
	timeout: TIME_OUT,
	showLoading: true,
	interceptor: {
		requestInterceptor(config) {
			// 携带token的拦截
			// const token = storage.getCache('token')
			// if (token) config.headers.Authorization = `Bearer ${token}`
			// console.log('单例拦截，请求成功')
			return config
		},
		requestInterceptorCatch(err) {
			// console.log('单例拦截，请求失败')
			return err
		},
		responseInterceptor(res) {
			// console.log('单例拦截，响应成功')
			return res
		},
		responseInterceptorCatch(err) {
			// console.log('单例拦截，响应失败')
			return err
		}
	}
})

export * from './modules/power-screen'
