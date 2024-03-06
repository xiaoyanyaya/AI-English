<template>
  <div class="container">
    <div class="triangle-left"></div>
    <div class="rectangle"></div>
  </div>
</template>

<script>
export default {
};
</script>

<style >
page {
  background: #000000;
}
.container {
  position: relative;
  width: 350rpx; /* 调整长方形容器的宽度 */
  height: 100rpx; /* 调整长方形容器的高度 */
}

.triangle-left {
  position: absolute;
  top: 0;
  left: 30rpx;
  width: 0;
  border-top: 40rpx solid transparent; /* 调整三角形的大小 */
  border-bottom: 40rpx solid transparent; /* 调整三角形的大小 */
  border-right: 40rpx solid #FFFFFF; /* 调整三角形的颜色 */
}

.rectangle {
  position: absolute;
  top: 0;
  left: 50rpx; /* 调整长方形的位置 */
  width: 350rpx; /* 调整长方形的宽度 */
  height: 80rpx; /* 调整长方形的高度 */
  border-radius: 10rpx;
  background-color: #FFFFFF; /* 调整长方形的颜色 */
}
</style>
