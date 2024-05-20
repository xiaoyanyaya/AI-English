<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
      wx.setInnerAudioOption({
        obeyMuteSwitch: false,

        success: function (res) {
          console.log("开启静音模式下播放音乐的功能");
          console.log(res)
        },

        fail: function (err) {
          console.log("静音设置失败");
          console.log(err)
        },
      });
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
  @import "uview-ui/index.scss";
</style>
