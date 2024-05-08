<template>
  <view class="">
    <cy-navbar showBack>
      <view class="t-size-30">选择AI朋友</view>
    </cy-navbar>
    <view class="px-4 mt-4">
      <view class="flex flex-direction-column align-item-center">
        <view class="item mb-5" :class="{active: item.isSelected}"
              v-for="(item, index) in personList" :key="index"
              @click="selectClick(item, index)">
          <view class="recommend" v-if="item.isRecommend">推荐</view>
          <view v-if="item.isSelected" class="select-box flex align-item-center justify-content-center">
            <u-icon name="checkbox-mark" color="#FFFFFF" size="22"></u-icon>
          </view>
          <view class="info-box flex align-item-center pr-2 pl-2 border-box">
            <view class="image-box flex align-item-center justify-content-centerq">
              <image :src="`${item.avatar}`"></image>
            </view>
            <view class="info ml-3 flex flex-direction-column">
              <view class="flex align-item-end justify-content-between">
                <view class="t-size-32 font-weight-bold">{{item.name}}</view>
                <image mode="widthFix" class="trumpet" :src="`${imageBaseUrl}/ai_person_01.png`"></image>
              </view>
              <view class="tags flex align-item-center mt-2 mb-2">
                <view class="tag mr-2">{{item.age}}岁</view>
                <view class="tag mr-2">{{item.weight}}kg</view>
                <view class="tag">{{item.height}}cm</view>
              </view>
              <view class="t-size-22 t-color-3D3D3D desc">
                {{item.intro}}
              </view>
              <view class="flex number-box mt-2 align-item-center t-size-24">
                <image class="mr-3" mode="widthFix" :src="`${imageBaseUrl}/ai_person_02.png`"></image>
                <view class="font-weight-bold t-color-3D3D3D">
                  <text>对话过</text>
                  <text class="number">{{item.imageUsage}}</text>
                  <text>次</text>
                </view>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>

  </view>
</template>

<script>
import cyNavbar from "@/components/cy-navbar.vue";
import MyMixin from "@/utils/MyMixin";
import {getAIFriendList, switchVirtual} from "@/api/aiFriend";
export default {
  mixins: [MyMixin],
  components: {cyNavbar},
  data() {
    return {
      personList: []
    };
  },
  onLoad() {
    this.network().getAIFriendList();
  },
  methods: {
    selectClick(item, index) {
      console.log("item", item)
      this.personList.forEach((data, dataIndex) => {
        this.$set(data, 'isSelected', index === dataIndex);
      });
      this.$forceUpdate()
      this.network().switchVirtual(item.id);
    },
    network() {
      return {
        getAIFriendList: async () => {
          const res = await getAIFriendList();
          this.personList = res.data.result.records;
          this.personList.forEach(d => {
            d.isSelected = false;
          })
          console.log(this.personList)
        },
        switchVirtual: async (id) => {
          const res = await switchVirtual({imageId: id});
          if (res.data.code == 200) {
            uni.showToast({
              title: '切换成功',
              icon: 'success',
              duration: 2000
            })
            // 延时300s
            setTimeout(() => {
              uni.navigateBack()
            }, 300)
            uni.$emit('switchVirtual', "success")
          } else {
            uni.showToast({
              title: '切换失败',
              icon: 'none',
              duration: 2000
            })
          }
        }
      }
    }
  },
}
</script>

<style lang="scss">
page {
  background: #F5FBFD;
}


.item {
  width: 680rpx;
  height: 280rpx;
  border-radius: 10rpx;
  background: linear-gradient(110deg, #DAEEFF 0%, #FFFFFF 99%);
  position: relative;
  border: 1px solid #FFFFFF;

  &.active {
    border: 1px solid #24A800;
  }

  .recommend {
    position: absolute;
    padding: 4rpx 20rpx;
    color: #FFFFFF;
    font-size: 18rpx;
    letter-spacing: 0.5rpx;
    background: #EC9600;
    border-bottom-right-radius: 10rpx;
  }

  .info-box {
    height: 280rpx;

    .trumpet {
      width: 40rpx;
    }
    .image-box {
      width: 160rpx;
      height: 200rpx;
      image {
        width: 160rpx;
        height: 200rpx;
      }
    }

    .info {
      flex: 1;

      .tags {
        .tag {
          background: #D2E4FE;
          color: #002BA3;
          font-size: 24rpx;
          padding: 6rpx 20rpx;
          border-radius: 10rpx;
        }
      }

      .desc {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }

      .number-box {
        image {
          width: 20rpx;
        }

        .number {
          color: #FF1900;
        }
      }
    }
  }

  .select-box {
    position: absolute;
    width: 40rpx;
    height: 40rpx;
    right: -2rpx;
    bottom: -2rpx;
    border-radius: 10rpx;
    background: #03AF00;
  }
}
</style>
