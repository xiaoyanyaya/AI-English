<script>
export default {
  onLaunch: function () {
    console.log("App Launch");
    wx.setInnerAudioOption({
      obeyMuteSwitch: false,

      success: function (res) {
        console.log("开启静音模式下播放音乐的功能");
        console.log(res);
      },

      fail: function (err) {
        console.log("静音设置失败");
        console.log(err);
      },
    });
  },
  onShow: function () {
    console.log("App Show");
    const updateManager = uni.getUpdateManager(); // 获取更新管理器对象
    updateManager.onCheckForUpdate(function (res) {
      console.log("res=====", res);
      if (res.hasUpdate) {
        updateManager.onUpdateReady(function () {
          uni.showModal({
            title: "更新提示",
            content: "新版本已经准备好，点击确定重新启动",
            showCancel: false,
            success: (res) => {
              if (res.confirm) {
                updateManager.applyUpdate();
              }
            },
          });
        });
        updateManager.onUpdateFailed(function () {
          uni.showModal({
            title: "提示",
            content: "检查到有新版本，但是下载失败，请检查网络设置",
            showCancel: false,
          });
        });
      }
    });
  },
  onHide: function () {
    console.log("App Hide");
  },
};
</script>

<style lang="scss">
/*每个页面公共css */
@import "uview-ui/index.scss";
</style>
