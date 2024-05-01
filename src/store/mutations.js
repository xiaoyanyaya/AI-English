// mutations 同步变更state数据，传多个参数需要用对象的方式
const mutations = {
	// 保存登录信息
	SET_CONTENT: (state, data) => {
		state.generateContent = data
	},
	// 保存token
	SET_TOKEN: (state, data) => {
		state.token = data
	},
	SET_USERINFO: (state, data) => {
		console.log("改变信息", data)
		state.userInfo = data
	}
}

export default mutations
