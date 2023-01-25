import ztRequest from '../index'

/**
 * @description: 此函数用于：获取所有城市列表
 * @Author: ZeT1an
 * @return {Promise} 返回一个 promise，用于处理请求结果/
 */
export const getPowerScreenData = () => ztRequest.get({
	url: '/powerscreen'
})
