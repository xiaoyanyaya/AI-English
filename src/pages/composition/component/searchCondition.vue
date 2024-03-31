<template>
  <view class="pb-5">
    <cy-navbar showBack>
      <view class="t-size-30">查询条件</view>
    </cy-navbar>

    <view class="pb-5 px-4 mt-5">
      <view class="t-size-26 t-color-3D3D3D">作文类型</view>
      <view class="composition">
        <view class="mt-3 composition-item t-color-3D3D3D flex align-item-center justify-content-center"
              :class="{active: questionTypes.index === index}"
              @click="questionTypes.index = index"
              v-for="(item, index) in questionTypes.content" :key="index">
          {{item}}
        </view>
      </view>

      <view class="t-size-26 t-color-3D3D3D mt-8">收藏来源</view>
      <view class="composition">
        <view class="mt-3 composition-item t-color-3D3D3D flex align-item-center justify-content-center"
              :class="{active: compositionFavoritesSource.index === index}"
              @click="compositionFavoritesSource.index = index"
              v-for="(item, index) in compositionFavoritesSource.content" :key="index">
          {{item}}
        </view>
      </view>

      <view class="t-size-26 t-color-3D3D3D mt-8">收藏时间范围</view>
      <view class="flex align-item-center mt-3 t-color-AEAEAE">
        <view @click="clickTime(0)" class="time-box flex align-item-center justify-content-center">
          {{queryParams.createTime}}
        </view>
        <view class="t-size-26 ml-3 mr-3">—</view>
        <view @click="clickTime(1)" class="time-box flex align-item-center justify-content-center">
          {{queryParams.endTime}}
        </view>
      </view>

      <view class="mt-8 flex align-item-end">
        <view class="t-size-26 t-color-3D3D3D ">作文题目关键字</view>
        <view class="ml-2 flex align-item-center">
          <u-icon name="info-circle-fill" color="#FFAB2D" size="28"></u-icon>
          <view class="ml-1 t-size-22 t-color-FFAB2D">多个用逗号隔开</view>
        </view>
      </view>
      <view class="mt-3 title-input-box px-2 pt-2 pb-2">
        <textarea class="t-size-26 t-color-3D3D3D" placeholder="请输入作文题目关键字"
                  v-model="titleKeywords"
                  style="width: 100%; height: 100%; border: none; outline: none;"></textarea>
      </view>

      <view class="mt-8 flex align-item-end">
        <view class="t-size-26 t-color-3D3D3D ">作文内容关键字</view>
        <view class="ml-2 flex align-item-center">
          <u-icon name="info-circle-fill" color="#FFAB2D" size="28"></u-icon>
          <view class="ml-1 t-size-22 t-color-FFAB2D">多个用逗号隔开</view>
        </view>
      </view>
      <view class="mt-3 title-input-box px-2 pt-2 pb-2">
        <textarea class="t-size-26 t-color-3D3D3D" placeholder="请输入作文内容关键字"
                  v-model="contentKeywords"
                  style="width: 100%; height: 100%; border: none; outline: none;"></textarea>
      </view>
    </view>

    <view class="mt-8 flex align-item-center justify-content-center">
      <view class="cancel-btn flex align-item-center justify-content-center" @click="cancel">
        取消
      </view>
      <view class="ml-5 confirm-btn flex align-item-center justify-content-center" @click="confirm">
        确认
      </view>
    </view>

    <u-picker @confirm="timeDateConfirm" @cancel="timeDateCancel"
              mode="time" v-model="showTimeDate" :params="timeDateParams"></u-picker>


  </view>
</template>

<script>
import {getCompositionDictList} from "@/api/composition";

export default {
  data() {
    return {
      questionTypes: {
        content: ['不限'],
        dict: [''],
        value: '不限',
        index: 0,
      },

      compositionFavoritesSource: {
        content: ['不限', '我写的作文', '收藏的作文'],
        dict: ['', '1', '2'],
        value: '不限',
        index: 0,
      },

      queryParams: {
        createTime: '开始时间',
        endTime: '结束时间',
      },
      titleKeywords: '',
      contentKeywords: '',

      timeDateParams: {
        year: true,
        month: true,
        day: true,
        hour: false,
        minute: false,
        second: false
      },
      showTimeDate: false,
      timeDateIndex: 0,
    };
  },
  onLoad() {
    this.network().getCompositionDictList('composition_type')
    // this.network().getCompositionDictList('grade')
  },
  methods: {
    cancel() {
      uni.navigateBack(1)
    },
    confirm() {
      let params = {
        compositionType: this.questionTypes.dict[this.questionTypes.index],
        compositionFavoritesSource: this.compositionFavoritesSource.dict[this.compositionFavoritesSource.index],
        startTime: this.queryParams.createTime == '开始时间' ? '' : this.queryParams.createTime,
        endTime: this.queryParams.endTime == '结束时间' ? '' : this.queryParams.endTime,
        titleKeywords: this.titleKeywords,
        textKeywords: this.contentKeywords,
      }
      uni.$emit('compositionSearchParams', params)
      uni.navigateBack(1)
    },
    clickTime(index) {
      this.timeDateIndex = index
      this.showTimeDate = true
    },
    timeDateConfirm(e) {
      console.log(e)
      var year = e.year
      var month = e.month
      var day = e.day
      this.queryParams.createTime = year + '-' + month + '-' + day
      if (this.timeDateIndex == 0) {
        this.queryParams.createTime = year + '-' + month + '-' + day
      } else {
        this.queryParams.endTime = year + '-' + month + '-' + day
      }
    },
    timeDateCancel() {
      if (this.timeDateIndex == 0) {
        this.queryParams.createTime = '开始时间'
      } else {
        this.queryParams.endTime = '结束时间'
      }
    },
    network() {
      return {
        getCompositionDictList: async (type) => {
          let params = {type}
          let data = await getCompositionDictList(params);
          var result = data.data.result
          console.log(result)

          switch (type) {
            case 'composition_type':
              result.forEach(d => {
                console.log(d)
                this.questionTypes.content.push(d.text)
                this.questionTypes.dict.push(d.value)
              })
              console.log(this.questionTypes)
              break;
            case 'grade':
              /*result.forEach(d => {
                this.selectContent[0].content.push(d.text)
                this.selectContent[0].dict.push(d.value)
              })*/
              break;
          }
        },
      }
    }
  },
}
</script>

<style lang="scss">
.composition {
  display: grid;
  grid-template-columns: repeat(3, 1fr);

  .composition-item {
    width: 178rpx;
    height: 73rpx;
    border-radius: 10rpx;
    background: #FFFFFF;
    box-sizing: border-box;
    border: 1rpx solid #AEAEAE;

    &.active {
      background: #E5F1FF;
      box-sizing: border-box;
      border: 2rpx solid #1863E5;
    }
  }
}

.time-box {
  width: 260rpx;
  height: 73rpx;
  border-radius: 10rpx;
  opacity: 1;
  background: #FFFFFF;
  box-sizing: border-box;
  border: 1rpx solid #AEAEAE;
}

.title-input-box {
  width: 640rpx;
  height: 135rpx;
  border-radius: 10rpx;
  background: #FFFFFF;
  box-sizing: border-box;
  border: 1rpx solid #AEAEAE;
}

.cancel-btn {
  width: 200rpx;
  height: 80rpx;
  border-radius: 163rpx;
  opacity: 1;
  box-sizing: border-box;
  color: #1359D1;
  border: 1px solid #5793F9;
}
.confirm-btn {
  width: 200rpx;
  height: 80rpx;
  border-radius: 163rpx;
  opacity: 1;
  box-sizing: border-box;
  color: #FFFFFF;
  background: linear-gradient(180deg, #5A95FB 0%, #1258D0 100%);
}
</style>
