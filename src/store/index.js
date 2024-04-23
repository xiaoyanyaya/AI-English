import Vue from 'vue'
import Vuex from 'vuex'

//数据持久化插件
import createPersistedState from 'vuex-persistedstate'
import state from './state.js'
import getters from './getters.js'
import mutations from './mutations.js'
import actions from './actions.js'
import modules from './modules.js'

Vue.use(Vuex)

/**
 * @前言
 * getter 和 action 的意义是为了做 统一处理，类似于 computed，单个属性的赋值和获取直接操作即可。
 *
 */

const store = new Vuex.Store({
	state,
	getters,
	mutations,
	actions,
	modules,
	plugins: [
		createPersistedState({
			paths: ['generateContent','token','loginParams', 'loginInfo', 'userInfo', 'mineInfo', 'provinceList', 'orderDone'], //要持久化的状态，在state里面取，如果有嵌套，可以  a.b.c
			storage: {
				getItem: (key) => uni.getStorageSync(key), // 获取
				setItem: (key, value) => uni.setStorageSync(key, value), // 存储
				removeItem: (key) => uni.removeStorageSync(key) // 删除
			}
		})
	]
})

export default store
