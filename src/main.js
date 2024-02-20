import Vue from 'vue'
import App from './App'
import './uni.promisify.adaptor'
import '@/assets/css/cyGlobal.css'
import '@/assets/font/iconfont.css'

Vue.config.productionTip = false

// navigateTo
Vue.prototype.$navigateTo = function (url) {
	uni.navigateTo({
		url: url
	})
}

App.mpType = 'app'

import uView from "uview-ui";
Vue.use(uView);

const app = new Vue({
  ...App
})
app.$mount()
