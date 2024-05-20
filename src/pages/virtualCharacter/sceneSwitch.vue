<template>
  <view class="main-body">
    <cy-navbar showBack>
      <view class="t-size-30">场景切换</view>
    </cy-navbar>

    <view class="px-4 py-3">
      <view class="ChatRoom-box">
        <view class="flex justify-content-between">
          <view class="t-size-32 t-color-3D3D3D font-weight-bold">随意聊</view>
          <view class=" Scene flex align-item-center justify-content-center" @click="showPopup = true">
            <view>
              <image :src="`${imageBaseUrl}/new_icon6.png`" mode="widthFix"></image>
            </view>
            <view class="t-size-22 t-color-2A67D2">自定义场景</view>
          </view>
        </view>
        <view class="t-color-3D3D3D mt-3">可以自己决定话题，自定义对话练习场景</view>
      </view>

      <view class="py-4">
        <u-tabs bg-color="transparent" inactive-color="#8A8A8A"
          :list="optinsList" :current="currentOptions" @change="changeOptions"></u-tabs>
      </view>

      <view v-if="gripCellList.length < 1"
            class="flex mt-3 justify-content-center align-item-center t-size-26 t-color-3D3D3D">
        暂无数据~
      </view>
      <view v-else class="flex flex-wrap grid-container">
        <view class="grip-cell mt-2" v-for="(item, index) in gripCellList" :key="index" @click="clickGripCell(item)">
          <view class="mt-3 ml-3 font-weight-bold t-color-3D3D3D t-size-32 table-nowrap">{{item.sceneName}}</view>
          <view class="mt-1 ml-3 t-size-26 t-color-595959 table-nowrap">{{item.tips}}</view>
          <view class="left-image">
          </view>
          <view class="right-image">
            <image :src="item.sceneLogo"></image>
          </view>
        </view>
      </view>
    </view>

    <u-popup v-model="showPopup" mode="bottom" border-radius="20">
      <view class="popup-content pt-2">
        <view class="px-5 pt-5 flex align-item-center justify-content-between t-size-30 ">
          <view style="color: #6d6d6d" @click="showPopup = false">取消</view>
          <view style="color: #1863E5" @click="customScene">确认</view>
        </view>

        <view class="px-5 pb-5" style="margin-top: 70rpx">
          <view class="input-box flex align-item-center px-2">
            <input type="text" placeholder="请输入自定义场景"
                   v-model="randomSceneNameValue"
                   style="width: 100%"
                   class="t-size-30 t-color-3D3D3D"></input>
          </view>
        </view>

        <view class="flex justify-content-center">
          <view class="random-btn flex align-item-center justify-content-center t-color-fff" @click="randomSceneName">
            <image :src="`${imageBaseUrl}/5-19-01.png`" mode="widthFix" style="width: 30rpx"></image>
            <view class="ml-2">随机话题</view>
          </view>
        </view>
      </view>
    </u-popup>
  </view>
</template>

<script>
import MyMixin from "@/utils/MyMixin";
import {customScene, randomSceneName, sceneCategoryList, sceneList, sceneSwitch} from "@/api/aiFriend";
export default {
  mixins: [MyMixin],
  data() {
    return {
      currentOptions: 0,
      optinsList: [],

      gripCellList: [],
      queryParams: {
        pageNo: 1,
        pageSize: 10,
      },
      isModeData: true,
      showPopup: false,
      randomSceneNameValue: ''
    }
  },
  // 触底加载
  onReachBottom() {
    this.queryParams.pageNo += 1
    this.network().getData()
  },
  methods: {
    initData() {
      this.gripCellList = []
      this.isModeData = true
      this.queryParams.pageNo = 1
      this.network().getData()
    },
    changeOptions(index) {
      this.currentOptions = index;
      this.queryParams.sceneCategoryId = this.optinsList[index].id
      this.initData()
    },
    clickGripCell(item) {
      this.network().sceneSwitch(item.id)
    },
    randomSceneName() {
      randomSceneName().then(res => {
        console.log(res.data.result)
        this.randomSceneNameValue = res.data.result
      })
    },
    customScene() {
      if (this.randomSceneNameValue === '') return
      customScene({sceneName: this.randomSceneNameValue}).then(res => {
        console.log(res.data)
        if (res.data.code === 200) {
          uni.showToast({
            title: '切换成功',
            icon: 'success',
            duration: 2000
          })
          this.showPopup = false
          uni.setStorageSync("sceneData", res.data.result)
          this.$navigateTo("/pages/virtualCharacter/introduction")
        } else {
          uni.showToast({
            title: res.data.message,
            icon: 'none',
            duration: 2000
          })
        }
      })
    },
    network() {
      var that = this;
      return {
        sceneCategoryList: async () => {
          sceneCategoryList().then(res => {
            that.optinsList = res.data.result
            that.optinsList.unshift({name: '全部', id: 0})
            that.initData();
          })
        },
        getData() {
          if (!that.isModeData) return
          sceneList(that.queryParams).then(res => {
            that.gripCellList = that.gripCellList.concat(res.data.result.records)
            if (res.data.result.records.length < that.queryParams.pageSize) {
              that.isModeData = false
            }
          })
        },
        sceneSwitch(id) {
          sceneSwitch({sceneId: id}).then(res => {
            if (res.data.code === 200) {
              uni.showToast({
                title: '切换成功',
                icon: 'success',
                duration: 2000
              })
              uni.setStorageSync("sceneData", res.data.result)
              that.$navigateTo("/pages/virtualCharacter/introduction")
            } else {
              uni.showToast({
                title: res.data.message,
                icon: 'none',
                duration: 2000
              })
            }
          })
        }
      }
    }
  },
  onLoad() {
    this.network().sceneCategoryList()
  },
}
</script>

<style lang="scss" scoped>
.ChatRoom-box {
  height: 210rpx;
  border-radius: 40rpx;
  background: linear-gradient(180deg, rgba(225, 237, 255, 0.5) 0%, rgba(151, 189, 255, 0.5) 100%);
  box-sizing: border-box;
  border-top: 6rpx solid rgba(92, 150, 250, 0.5);
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
    height: 330rpx;
    width: 320rpx;
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
      height: 130rpx;
    }
  }
}

.popup-content {
  height: 600rpx;

  .input-box {
    width: 620rpx;
    height: 83rpx;
    border-radius: 20rpx;
    background: #EDEDED;
  }

  .random-btn {
    width: 288rpx;
    height: 83rpx;
    border-radius: 201rpx;
    background: linear-gradient(180deg, #5694FF 0%, #1833E5 100%);
    margin-top: 150rpx;
  }
}
</style>
