import Vue from "vue";
import App from "./App";
import "./uni.promisify.adaptor";
import "@/assets/css/cyGlobal.css";
import "@/assets/icons/font/iconfont.css";
import "@/assets/icons/font_4171829_v39knp8d7pe/iconfont.css";
import "@/assets/icons/font_4268092_3iny96i2kdb/iconfont.css";
import "@/assets/icons/font_4268092_i5deccm2h7d/iconfont.css";
import store from "./store";

Vue.config.productionTip = false;

// navigateTo
Vue.prototype.$navigateTo = function (url) {
  uni.navigateTo({
    url: url,
  });
};

App.mpType = "app";

import uView from "uview-ui";

Vue.use(uView);

const app = new Vue({
  ...App,
  store,
});
app.$mount();
