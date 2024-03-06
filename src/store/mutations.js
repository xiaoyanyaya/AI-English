// mutations 同步变更state数据，传多个参数需要用对象的方式
const mutations = {
	// 保存登录信息
	SET_LOGINPARAMS: (state, data) => {
		state.loginParams = data
	},
}

export default mutations
