const actions = {
	// 登陆，持久化存储loginParams
	generateContent(context, data) {
		return new Promise((resolve, reject) => {
			context.commit('SET_CONTENT', data)
		})
	},
	// 保存token
	setToken(context, data) {
		return new Promise((resolve, reject) => {
			context.commit('SET_TOKEN', data)
		})
	},
	userInfo(context, data) {
		return new Promise((resolve, reject) => {
			context.commit('SET_USERINFO', data)
		})
	}
}

export default actions
