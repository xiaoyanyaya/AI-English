<template>
  <view>
    <cy-navbar showBack>
      <view class="t-size-30">场景切换</view>
    </cy-navbar>

    <view class="px-4 py-3">
      <view class="ChatRoom-box">
        <view class="flex justify-content-between">
          <view class="t-size-32 t-color-3D3D3D font-weight-bold">随意聊</view>
          <view class=" Scene flex align-item-center justify-content-center">
            <view>
              <image :src="`${imageBaseUrl}/new_icon6.png`" mode="widthFix"></image>
            </view>
            <view class="t-size-22 t-color-2A67D2">自定义场景</view>
          </view>
        </view>
        <view class="t-color-3D3D3D mt-3">可以自己决定话题，自定义对话练习场景</view>
      </view>

      <view class="py-4">
        <u-tabs :list="optinsList" :current="currentOptions" @change="changeOptions"></u-tabs>
      </view>

      <view class="flex flex-wrap grid-container">
        <view class="grip-cell mt-2" v-for="(item, index) in gripCellList" :key="index">
          <view class="mt-3 ml-3 font-weight-bold t-size-30">{{item.title}}</view>
          <view class="mt-1 ml-3 t-size-26">{{item.subTitle}}</view>
          <view class="left-image">
          </view>
          <view class="right-image">
            <image :src="item.image" mode="widthFix"></image>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import MyMixin from "@/utils/MyMixin";
export default {
  mixins: [MyMixin],
  data() {
    return {
      currentOptions: 0,
      optinsList: [{
        name: '全部',
      },{
        name: '兴趣',
      },{
        name: '职场相关',
      },{
        name: '考试话题',
      },{
        name: '自我发展',
      }],

      gripCellList: [],
    }
  },
  methods: {
    changeOptions(index) {
      this.currentOptions = index;
    }
  },
  onLoad() {
    this.gripCellList = [{
      title: '最爱的电影',
      subTitle: 'Favorite movies',
      image: `${this.imageBaseUrl}/img_35.png`,
    },{
      title: '艺术和博物馆',
      subTitle: 'Art and museums',
      image: `${this.imageBaseUrl}/img_36.png`,
    },{
      title: '书籍和文学',
      subTitle: 'Books and litera...',
      image: `${this.imageBaseUrl}/img_37.png`,
    },{
      title: '娱乐和媒体',
      subTitle: 'Entertainment a...',
      image: `${this.imageBaseUrl}/img_38.png`,
    },{
      title: '运动和锻炼',
      subTitle: 'Sports and exer...',
      image: `${this.imageBaseUrl}/img_39.png`,
    },{
      title: '最爱的电视...',
      subTitle: 'Favorite TV shows',
      image: `${this.imageBaseUrl}/img_40.png`,
    }]
  },
}
</script>

<style lang="scss" scoped>
.ChatRoom-box {
  height: 210rpx;
  border-radius: 40rpx;
  background: linear-gradient(180deg, rgba(225, 237, 255, 0.5) 0%, rgba(151, 189, 255, 0.5) 100%);
  box-sizing: border-box;
  border: 5rpx solid;
  border-image: linear-gradient(180deg, #1863E5 0%, #E1EDFF 100%);
  box-sizing: border-box;
  padding: 35rpx;
  overflow: hidden;

  .Scene {
    width: 215rpx;
    height: 50rpx;
    border-radius: 216rpx;
    background: #FFFFFF;

    image {
      width: 24rpx;
      height: 24rpx;
      margin-top: 10rpx;
      margin-right: 10rpx;
    }
  }
}

.grid-container {
  display: grid;
  grid-template-columns: repeat(2, auto);
  grid-column-gap: 20rpx;

  .grip-cell {
    width: calc(100% - 10rpx); /* 每个网格项的宽度 */
    height: 326rpx;
    border-radius: 20rpx;
    background: #FFFFFF;
    box-shadow: 0rpx 0rpx 10rpx 0rpx #D8D8D8;
    position: relative;
    overflow: hidden;

    .left-image  {
      position: absolute;
      left: -20rpx;
      bottom: -20rpx;
      width: 100rpx;
      height: 100rpx;
      border-radius: 50%;
      background: linear-gradient(220deg, #CCDFFF 12%, rgba(204, 223, 255, 0) 74%);
    }

    .right-image image {
      position: absolute;
      right: 20rpx;
      bottom: 10rpx;
      width: 150rpx;
    }
  }
}

</style>
