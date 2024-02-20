<template>
  <view>
    <view class="mt-2 px-3 menu-grid" :style="menuGridStyle">
      <view class="mt-3" @click="clickMenu(item, index)"
            v-for="(item, index) in menuList" :key="index">
        <view class="menu-box" :style="menuBoxStyle"></view>
        <view class="mt-1 t-color-3D3D3D t-size-30 text-center">{{item.title}}</view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
    }
  },
  props: {
    menuList: {
      type: Array,
      default: () => []
    },
    column: {
      type: Number,
      default: 3
    },
    gap: {
      type: Number,
      default: 30
    },
    boxHeight: {
      type: Number,
      default: 180
    }
  },
  computed: {
    menuGridStyle() {
      return `grid-template-columns: repeat(${this.column}, 1fr);
      grid-gap: ${this.gap}rpx;`
    },
    menuBoxStyle() {
      return `height: ${this.boxHeight}rpx`
    }
  },
  methods: {
    clickMenu(item, index) {
      this.$emit('clickMenu', item, index);
    }
  },
}
</script>

<style>
.menu-grid {
  display: grid;
}

.menu-box {
  border-radius: 20rpx;
  background: #CCDFFF;
}
</style>
