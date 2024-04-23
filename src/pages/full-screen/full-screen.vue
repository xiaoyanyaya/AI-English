<template>
	<view class="container">
		<view class="cropper">
			<bt-cropper v-if="imageSrc" ref="croper" :ratio="ratio" :dWidth="400" :rotate="rotate" fileType="png" showGrid @change="onChange"
				:imageSrc="imageSrc" :mask="mask">
			</bt-cropper>
		</view>
		<view class="footer">
      <view class="btnGroup">
        <view class="btn flex align-item-center justify-content-center" @click="onCrop">
          <image class="mr-1" style="width: 30rpx" mode="widthFix" :src="`${imageBaseUrl}/4-15-03.png`"></image>
          <view class="ml-1">裁剪</view>
        </view>
        <view class="btn-reload flex align-item-center justify-content-center" @click="cancel">
          <image class="mr-1" style="width: 30rpx" mode="widthFix" :src="`${imageBaseUrl}/4-15-01.png`"></image>
          <view class="ml-1">重拍</view>
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
        pageType: "",
				imageSrc: "",
				// 蒙版，非黑色区域会裁剪为透明
				// mask: "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-a3b890b4-7cb2-4b29-aa78-e652572bdef6/d6bc69ee-cdc0-4a13-a744-d79db42e0dbe.png",
				mask: "",
				dWidth: 500,
				rotate: 0,
				// 输出的宽高比例
				// ratio: 3 / 2,
				ratio: 0,
			}
		},
		onLoad({src, type}) {
			this.imageSrc = decodeURIComponent(src)
      this.pageType = type
		},
		mounted() {},
		methods: {
			onChange(ev) {
				console.log(ev)
			},
			chooseImage() {
        uni.navigateBack()
				/*uni.chooseImage({
					count: 1,
					sizeType: ['original'],
					success: (res) => {
						let tempFilePaths = res.tempFilePaths[0]
						this.imageSrc = tempFilePaths
            console.log("chooseImage", tempFilePaths);
					}
				})*/
			},
      cancel() {
        // 返回到上上个页面
        uni.navigateBack({
          delta: 1
        })
      },
			onCrop(cb) {
				this.$refs.croper.crop().then(path => {
          console.log("onCrop", path);
          // uni.$emit("cropImage", {path: this.imageSrc, type: this.pageType})
					uni.$emit("cropImage", {path, type: this.pageType})
          uni.navigateBack({
            delta: 2
          })
				})
			},
			onRotate(ev){
				this.rotate = 360 * (ev.detail.value / 100)
			}
		},
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
		background-color: #000;
		.cropper{
			flex: 1;
		}
	}


	.footer {

		.btnGroup {
			display: flex;
			align-items: center;
			justify-content: space-around;
			background-color: #000000;
			width: 100%;
      height: 10vh;

      /*margin-bottom: 100rpx;
      height: calc(100rpx + env(safe-area-inset-bottom));
      padding-bottom: 20rpx;
      padding-top: 20rpx;*/

			.btn {
				width: 300rpx;
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

      .btn-reload {
        width: 300rpx;
        border-radius: 99px;
        text-align: center;
        color: #FFFFFF;
        line-height: 70rpx;
        border: 1px solid #FFFFFF;
      }
		}
	}
</style>
