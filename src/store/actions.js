const actions = {
	// 登陆，持久化存储loginParams
	generateContent(context, data) {
		return new Promise((resolve, reject) => {
			context.commit('SET_CONTENT', data)
		})
	}
}

export default actions
