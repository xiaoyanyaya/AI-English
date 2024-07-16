<template>
  <view class="shop-list">
    <view class="list-left">
      <view
        @click="handleChangeType(item._id)"
        class="list-left-item"
        :class="typeValue === item._id ? 'active' : ''"
        v-for="item in typeList"
        :key="item._id"
      >
        <view class="text1"> {{ item.label.split("（")[0] }}</view>
        <view v-if="item.label.split('（')[1]" class="text2"
          >（{{ item.label.split("（")[1] }}
        </view>
      </view>
    </view>

    <view class="content-box">
      <view class="flex align-item-center">
        <view class="anchor mr-2"></view>
        <view class="t-size-24 t-color-3D3D3D font-weight-bold">{{
          typeList[typeValue - 1].label
        }}</view>
      </view>
      <view class="list-content mt-2">
        <view
          class="shop-item"
          v-for="item in shopList"
          :key="item.id"
          @click="handleDetail(item)"
        >
          <image
            :class="{ img: true, checked: item.id == bookId }"
            :src="item.bookImage"
          ></image>
          <view
            class="t-size-22 font-weight-bold flex align-item-center justify-content-center mt-1"
          >
            {{ item.bookName }}
            <uni-icons
              v-if="item.id == bookId"
              type="checkbox"
              color="#2196f3"
              size="22"
            ></uni-icons>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    typeValue: {
      type: Number,
    },
    typeList: {
      type: Array,
      default: [],
    },
    shopList: {
      type: Array,
      default: [],
    },
    bookId: {
      type: String,
    },
  },
  data() {
    return {};
  },
  methods: {
    handleChangeType(typeValue) {
      this.$emit("changeType", typeValue);
    },
    handleDetail(item) {
      this.$emit("detail", item);
    },
  },
};
</script>

<style lang="scss" scoped>
page {
  background: #fff;
}

.shop-list {
  display: flex;
  font-size: 24rpx;

  .list-left {
    position: fixed;
    width: 250rpx;
    letter-spacing: 6rpx;
    background: rgb(248, 248, 248);
    height: 88%;
    overflow-y: auto;
    padding-bottom: 36rpx;

    &-item {
      padding: 25rpx 15rpx;
      border-bottom: 2rpx solid #dbdbdb;
      text-align: center;

      &.active {
        background: #2196f3;
        color: #ffffff;
      }
      .text1 {
        font-weight: 400;
        font-size: 26rpx;
        margin-bottom: 2rpx;
      }
      .text1 {
        font-size: 24rpx;
      }
    }
  }

  .content-box {
    margin-left: 300rpx;

    .anchor {
      width: 10rpx;
      height: 24rpx;
      border-radius: 10rpx;
      background: #2196f3;
    }

    .list-content {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20rpx;

      .shop-item {
        position: relative;
        padding: 10rpx;

        .img {
          flex-shrink: 0;
          width: 170rpx;
          height: 220rpx;
        }
        .checked {
          border: 2px solid #2196f3;
          border-radius: 10rpx;
        }
        // .r_img {
        //   position: absolute;
        //   z-index: 999;
        //   bottom: 50rpx;
        //   right: 10rpx;
        // }
      }
    }
  }
}
</style>
