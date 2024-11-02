<template>
  <view class="bottom">
    <view class="bottomTab">
      <view class="bottomTab-item" @click="toNav('/pages/word/index')">
        <image
          :src="
            imageBaseUrl +
            (type == 0 ? '/word/5-21-17.png' : '/word/5-21-18.png')
          "
          mode="heightFix"
        ></image>
        <view
          class="bottomTab-itemText"
          :class="type == 0 ? 'bottomTab-itemTextBlur' : ''"
        >
          词汇速记
        </view>
      </view>
      <view
        class="bottomTab-item"
        @click="toNav('/pages/word/reverseForgetting/index')"
      >
        <image
          :src="
            imageBaseUrl +
            (type == 1 ? '/word/5-21-19.png' : '/word/5-21-20.png')
          "
          mode="heightFix"
        ></image>
        <view
          class="bottomTab-itemText"
          :class="type == 1 ? 'bottomTab-itemTextBlur' : ''"
        >
          抗遗忘复习
        </view>
      </view>
      <view
        class="bottomTab-item"
        @click="toNav('/pages/word/chanllenge/index')"
      >
        <image
          :src="
            imageBaseUrl +
            (type == 2 ? '/word/5-21-21.png' : '/word/5-21-22.png')
          "
          mode="heightFix"
        ></image>
        <view
          class="bottomTab-itemText"
          :class="type == 2 ? 'bottomTab-itemTextBlur' : ''"
        >
          疯狂自测
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import MyMixin from "@/utils/MyMixin";
export default {
  props: ["type"],
  mixins: [MyMixin],
  data() {
    return {};
  },
  methods: {
    toNav(urls) {
      uni.redirectTo({
        url: urls,
      });
    },
  },
};
</script>

<style>
.bottom {
  position: fixed;
  bottom: 0;
  background: #fff;
  height: 150rpx;
  width: 100%;
}

.bottomTab {
  display: flex;
  align-items: center;
  justify-content: space-around;
  text-align: center;
  height: 150rpx;
  color: #bfbfbf;
}

.bottomTab-item image {
  height: 40rpx;
}

.bottomTab-itemText {
  font-size: 22rpx;
}
.bottomTab-itemTextBlur {
  color: #1863e5;
}
</style>
