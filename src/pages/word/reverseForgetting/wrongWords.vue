<template>
  <view class="main">
    <cy-navbar :showBack="true" bgColor="#3A73D9">
      <view class="t-size-30">我的错词本</view>
    </cy-navbar>
    <view class="content">
      <view class="contentItem" v-for="(item, index) in allData" :key="item.id">
        <u-swipe-action :show="item.show" :index="index" @click="click(index,item.id)" @open="open" :options="options">
          <view class="listItem" @click="play(item.audioUsa,item.id)">
            <view class="listItem-l">
              <image v-if="gif&&selectId==item.id" class="listItem-lGif"
                     :src="imageBaseUrl + '/word/in_play.gif'" mode=""></image>
              <u-icon v-else name="volume-up" size="36" color="rgba(24, 99, 229, 1)"></u-icon>
            </view>
            <view class="listItem-c">
              <view class="listItem-cTitle">
                <view class="listItem-cTitle-word">
                  {{ item.wordEn }}
                </view>
                <view class="listItem-cTitle-definition">
                  {{ "['" + getNameWithEllipsis(item.symbolUsa, 15) + "']" }}
                </view>
              </view>
              <view class="listItem-cContent">
                <view class="listItem-cContent-item">
                  {{ item.wordCn }}
                </view>
              </view>
            </view>
            <view class="listItem-r" @click.stop="toNav(`/pages/word/definition?wordEn=${item.wordEn}&showBtn=0`)">
              词汇讲解
            </view>
          </view>
        </u-swipe-action>
      </view>
    </view>
  </view>
</template>

<script>
import MyMixin from "@/utils/MyMixin";
import {
  queryWordWrongDict,
  updateStatus
} from "@/api/word";

export default {
  mixins: [MyMixin],
  data() {
    return {
      list: [{
        id: 1,
        title: '长安回望绣成堆，山顶千门次第开，一骑红尘妃子笑，无人知是荔枝来',
        images: 'https://cdn.uviewui.com/uview/common/logo.png',
        show: false
      },
        {
          id: 2,
          title: '新丰绿树起黄埃，数骑渔阳探使回，霓裳一曲千峰上，舞破中原始下来',
          images: 'https://cdn.uviewui.com/uview/common/logo.png',
          show: false
        },
        {
          id: 3,
          title: '登临送目，正故国晚秋，天气初肃。千里澄江似练，翠峰如簇',
          images: 'https://cdn.uviewui.com/uview/common/logo.png',
          show: false,
        }
      ],
      disabled: false,
      btnWidth: 180,
      show: false,
      options: [{
        text: '删除',
        style: {
          color: '#DC0C0C',
          backgroundColor: '#FFE2E2'
        }
      }],
      data: {
        id: 0
      },
      bookData: {},
      allData: {},
      gif: false,
      selectId: 0,
    };
  },
  onLoad(e) {
    this.data.id = e.id
    this.bookData = uni.getStorageSync('bookData')
  },
  onShow() {
    this.getWord()
  },
  methods: {
    async getWord() {
      var that = this
      let data = await queryWordWrongDict();
      this.allData = data.data.result
      this.allData.forEach(function (item, i) {
        that.allData[i].show = false
      })
      uni.setStorageSync('wordList', data.data.result)
    },
    play(src, id) {
      var auditManager = uni.createInnerAudioContext();
      let voicePath = ""
      this.gif = true
      this.selectId = id

      if (this.deviceBrand === 'android') {
        uni.downloadFile({
          url: src,
          success: (res) => {
            if (res.statusCode === 200) {
              voicePath = res.tempFilePath
            }
          }
        })
      } else {
        voicePath = src
        auditManager.obeyMuteSwitch = false;
      }

      auditManager.src = voicePath
      auditManager.play()
      // 播放中
      auditManager.onPlay(() => {
      })
      // 播放结束
      auditManager.onEnded(() => {
        this.gif = false
      })
    },
    async click(index, id) {
      var newData = {
        id: id
      }
      let data = await updateStatus(newData);
      this.allData.splice(index, 1);
      this.$u.toast(`删除了第${index}个cell`);

    },
    // 如果打开一个的时候，不需要关闭其他，则无需实现本方法
    open(index) {
      // 先将正在被操作的swipeAction标记为打开状态，否则由于props的特性限制，
      // 原本为'false'，再次设置为'false'会无效
      this.list[index].show = true;
      this.list.map((val, idx) => {
        if (index != idx) this.list[idx].show = false;
      })
    },
    toNav(urls) {
      uni.navigateTo({
        url: urls
      })
    }
  }
};
</script>

<style>
.main {
  min-height: 100vh;
  background: linear-gradient(180deg, #DEF0FF 0%, #F7FCFF 100%);
}

.item {
  display: flex;
  padding: 20rpx;
}

image {
  width: 120rpx;
  flex: 0 0 120rpx;
  height: 120rpx;
  margin-right: 20rpx;
  border-radius: 12rpx;
}

.title {
  text-align: left;
  font-size: 28rpx;
  color: $u-content-color;
  margin-top: 20rpx;
}

.listItem {
  background: #fff;
  display: flex;
  padding: 20rpx 40rpx;
  border-radius: 10rpx;
}

.listItem-c {
  margin-left: 25rpx;
  flex: 1;
}

.listItem-cTitle {
  display: flex;
  align-items: center;
  margin-bottom: 10rpx;
}

.listItem-cTitle-word {
  font-weight: 600;
}

.listItem-cTitle-definition {
  margin-left: 20rpx;
  color: rgba(109, 109, 109, 1);
  font-size: 22rpx;
}

.listItem-cContent-item {
  color: rgba(109, 109, 109, 1);
  font-size: 22rpx;
  margin-bottom: 2rpx;
  white-space: pre-line;
  line-height: 36rpx;
}

.listItem-r {
  background: #F7A751;
  border-radius: 50rpx;
  color: #fff;
  font-size: 20rpx;
  height: 50rpx;
  line-height: 50rpx;
  padding: 0 20rpx;
}

.listItem-l {
  position: relative;
  top: 4rpx;
}

.button {
  position: fixed;
  bottom: 70rpx;
  width: 206rpx;
  height: 80rpx;
  background: linear-gradient(180deg, #5692F9 0%, #1863E5 100%);
  border-radius: 50rpx;
  color: #fff;
  line-height: 80rpx;
  text-align: center;
  left: 0;
  right: 0;
  margin: auto;
  font-size: 26rpx
}

.listItem-lGif {
  width: 38rpx;
  height: 26rpx;
  position: relative;
}

.content {
  padding: 40rpx;
}

.contentItem {
  margin-bottom: 30rpx;
  border-radius: 10rpx;
  overflow: hidden;
}
</style>
