<template>
  <view class="container">
    <view class="cropper" style="width: 100%; height: 90vh;">
      <camera v-if="src == ''" device-position="back" flash="auto" @error="error"
              style="width: 100%; height: 85vh;">
      </camera>
      <image :src="src" style="width: 100%;" mode="widthFix" v-else></image>
    </view>

    <view class="footer">
      <view class="btnGroup">
        <view class="" @click="cancel">
          <image style="width: 50rpx" mode="widthFix" :src="`${imageBaseUrl}/4-15-05.png`"></image>
        </view>
        <view class="" @click="takePhoto">
          <image style="width: 100rpx" mode="widthFix" :src="`${imageBaseUrl}/4-15-04-2.png`"></image>
        </view>
        <view class="" @click="chooseImage">
          <image style="width: 50rpx" mode="widthFix" :src="`${imageBaseUrl}/4-15-02.png`"></image>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import myMixin from "@/utils/MyMixin";

export default {
  mixins: [myMixin],
  data() {
    return {
      src: "",
      pageType: ''
    }
  },
  onLoad(options) {
    this.pageType = options.type
  },
  methods: {
    cancel() {
      uni.navigateBack()
    },
    chooseImage() {
      uni.chooseMedia({
        count: 1,
        mediaType: ['image'],
        success: (res) => {
          let tempFilePaths = res.tempFiles[0].tempFilePath
          uni.navigateTo({
            url: `/pages/full-screen/full-screen?src=${tempFilePaths}&type=${this.pageType}`
          })
        }
      })
    },
    takePhoto() {
      var _this = this;

      if (_this.src == '') {
        const ctx = uni.createCameraContext();
        ctx.takePhoto({
          quality: 'high',
          success: (res) => {
            _this.src = res.tempImagePath
            console.log("takePhoto", res.tempImagePath)
            uni.navigateTo({
              url: `/pages/full-screen/full-screen?src=${res.tempImagePath}&type=${_this.pageType}`
            })
          }
        });
      } else {
        this.src = ''
      }

    },
    error(e) {
      console.log(e.detail);
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  // #ifndef H5
  height: 100vh;
  // #endif
  // #ifdef H5
  height: 100%;
  // #endif

}

.photos-box {
  width: 750rpx;
}

.footer {


  .btnGroup {
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 100%;
    height: 15vh;

    .btn {
      width: 200rpx;
      background-color: #007AFF;
      color: #FFFFFF;
      border-radius: 99px;
      text-align: center;
      color: #FFFFFF;
      line-height: 70rpx;

      &.choose {
        margin-right: 20rpx;
        background-color: #a29d9d;
        //  background-color: #F0AD4E;
      }
    }
  }
}
</style>
