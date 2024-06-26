<template>
  <view class="shop-list">
    <view class="list-left">
      <view @click="handleChangeType(item._id)" class="list-left-item"
            :class="typeValue === item._id ? 'active':'' " v-for="item in typeList" :key="item._id">
        {{ item.label }}
      </view>
    </view>

    <view class="content-box">
      <view class="flex align-item-center">
        <view class="anchor mr-2"></view>
        <view class="t-size-24 t-color-3D3D3D font-weight-bold">{{ typeList[typeValue - 1].label }}</view>
      </view>
      <view class="list-content mt-2">
        <view class="shop-item" v-for="item in shopList" :key="item.id" @click="handleDetail(item)">
          <image class="img" :src="item.bookImage"></image>
          <view class="t-size-22 font-weight-bold flex align-item-center justify-content-center mt-1">
            {{ item.bookName }}
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
      default: []
    },
    shopList: {
      type: Array,
      default: []
    },
  },
  data() {
    return {};
  },
  methods: {
    handleChangeType(typeValue) {
      this.$emit('changeType', typeValue)
    },
    handleDetail(item) {
      this.$emit('detail', item)
    },
  }
}
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
    width: 280rpx;
    background: rgb(248, 248, 248);
    height: 100%;
    overflow-y: auto;
    padding-bottom: 36rpx;

    &-item {
      padding: 30rpx;

      &.active {
        background: #1863E5;
        color: #FFFFFF;
      }
    }
  }

  .content-box {
    margin-left: 300rpx;

    .anchor {
      width: 10rpx;
      height: 24rpx;
      border-radius: 10rpx;
      background: #1863E5;
    }

    .list-content {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20rpx;

      .shop-item {
        padding: 10rpx;


        .img {
          flex-shrink: 0;
          width: 170rpx;
          height: 220rpx;
        }
      }
    }
  }
}
</style>
