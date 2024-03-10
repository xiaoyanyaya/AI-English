<template>
  <view class="pb-5">
    <cy-navbar showBack>
      <view class="t-size-30">{{ pageTitle }}</view>
    </cy-navbar>

    <view class="px-4">
      <view class="mt-4" v-if="questionTypes.dict[questionTypes.index] == 'aigc_title'">
        <view class="flex align-item-center justify-content-between mb-2">
          <view style="width: 250rpx">
            <view class="grade flex align-item-center border-box px-1 justify-content-around "
                  @click="questionTypes.show = true">
              <text class="t-size-24 t-color-8A8A8A">{{ questionTypes.value }}</text>
              <u-icon name="arrow-down" color="#8A8A8A" size="28"></u-icon>
            </view>

            <u-picker mode="selector" v-model="questionTypes.show"
                      @confirm="questionTypesConfirm($event)"
                      :title="questionTypes.title"
                      :default-selector="[questionTypes.index]" :range="questionTypes.content"></u-picker>
          </view>
          <view class="flex">
            <view class="grade flex align-item-center border-box px-1 justify-content-around mr-3"
                  @click="selectContent[0].show = true">
              <text class="t-size-24 t-color-8A8A8A">{{ selectContent[0].value }}</text>
              <u-icon name="arrow-down" color="#8A8A8A" size="28"></u-icon>
            </view>

            <view class="grade flex align-item-center border-box px-1 justify-content-around"
                  @click="selectContent[1].show = true">
              <text class="t-size-24 t-color-8A8A8A">{{ selectContent[1].value }}</text>
              <u-icon name="arrow-down" color="#8A8A8A" size="28"></u-icon>
            </view>

            <u-picker mode="selector" v-model="selectContent[0].show"
                      @confirm="selectConfirm($event, 0)"
                      :title="selectContent[0].title"
                      :default-selector="[selectContent[0].index]" :range="selectContent[0].content"></u-picker>

            <u-picker mode="selector" v-model="selectContent[1].show"
                      @confirm="selectConfirm($event, 1)"
                      :title="selectContent[1].title"
                      :default-selector="[selectContent[1].index]" :range="selectContent[1].content"></u-picker>
          </view>
        </view>
        <view class="keywords-ai flex align-item-center border-box pl-1 justify-content-around  t-size-24"
              @click="showDate = true">
          <input placeholder="关键词(多个用逗号分隔)" v-model="infoKeyword"
                 style="color:#333;flex:1;border:none;font-size: 24rpx;flex:1"/>
          <view class="search-box" @click="network().generateTitle()">
            <text class="t-size-26 t-color-fff">生成</text>
          </view>
        </view>
      </view>
      <view class="flex mt-4" v-else>
        <view class="flex align-item-center justify-content-between">
          <view style="width: 250rpx" v-if="pageIndex == 1">
            <view class="grade flex align-item-center border-box px-1 justify-content-around mr-3"
                  @click="questionTypes.show = true">
              <text class="t-size-24 t-color-8A8A8A">{{ questionTypes.value }}</text>
              <u-icon name="arrow-down" color="#8A8A8A" size="28"></u-icon>
            </view>

            <u-picker mode="selector" v-model="questionTypes.show"
                      @confirm="questionTypesConfirm($event)"
                      :title="questionTypes.title"
                      :default-selector="[questionTypes.index]" :range="questionTypes.content"></u-picker>
          </view>
          <view style="width: 250rpx" v-else-if="pageIndex == 0">
            <view @click="showTimeDate = true"
              class="grade flex align-item-center border-box px-1 justify-content-around mr-3">
              <text class="t-size-24 t-color-8A8A8A">
                {{ queryParams.createTime ? queryParams.createTime : '日期' }}
              </text>
              <u-icon name="arrow-down" color="#8A8A8A" size="28"></u-icon>
            </view>

            <u-picker @confirm="timeDateConfirm" @cancel="timeDateCancel"
              mode="time" v-model="showTimeDate" :params="timeDateParams"></u-picker>
          </view>
          <view class="keywords flex align-item-center border-box pl-3 justify-content-between  t-size-24"
                @click="showDate = true">
            <input placeholder="关键词(多个用逗号分隔)" v-model="infoKeyword"
                   style="color:#333;flex:1;border:none;font-size: 24rpx;flex:1"/>
            <view class="search-box" @click="search">
              <u-icon name="search" color="#FFFFFF" size="28"></u-icon>
            </view>
          </view>
        </view>
      </view>

      <view class="mt-5 font-weight-bold t-size-36 flex align-item-center">
        <view class="font-weight-bold t-size-36">
          作文列表
        </view>
      </view>

      <view class="content-border mt-3 border-box px-2 pt-1 pb-2"
            :class="index % 2 === 1 ? 'active' : ''"
            v-for="(item, index) in contentData" :key="index"
            @click="clickItem(item)">
        <view class="flex align-item-center justify-content-between content-top">
          <view class="sort-box">{{ index + 1 }}、</view>
          <view class="title-box">{{ item.compositionTitleText }}</view>
          <view class="t-size-24 t-color-8A8A8A">{{ item.createTime }}</view>
        </view>
        <view class="flex align-item-center mt-2">
          <view class="sort-box"></view>
          <view class="">{{ item.note ? item.note : '' }}</view>
        </view>
        <view class="flex align-item-center mt-2">
          <view class="sort-box"></view>
          <view class="">{{ item.compositionText }}</view>
        </view>
      </view>

    </view>
  </view>
</template>

<script>
import {
  getCompositionList,
  getCompositionCollectList,
  getCompositionDictList,
  getAIGCComposition
} from '@/api/composition';
import { sseRequestTask} from "@/jslibs/requestUtils";
import {param, tr} from "@dcloudio/vue-cli-plugin-uni/packages/postcss/tags";

export default {
  data() {
    return {
      pageIndex: 0,
      pageTitle: "我的英语作文库",

      // 日期
      dateValue: "日期",
      showDate: false,

      contentData: [],
      queryParams: {
        pageNo: 1,
        pageSize: 10,
        createTime: '',
        compositionType: '',
        titleKeywords: ''
      },

      timeDateParams: {
        year: true,
        month: true,
        day: true,
        hour: false,
        minute: false,
        second: false
      },
      showTimeDate: false,

      infoKeyword: '',
      questionTypes: {
        title: '题目类型',
        content: ['类型'],
        dict: [''],
        show: false,
        value: '类型',
        index: 0,
      },

      selectContent: [{
        title: '年级',
        content: ['年级'],
        dict: [''],
        show: false,
        value: '年级',
        index: 0,
      }, {
        title: '字数',
        content: ['100字', '200字', '300字', '400字', '500字', '600字', '700字', '800字', '900字', '1000字'],
        show: false,
        value: '100字',
        index: 0,
      }],
    }
  },
  onLoad({type}) {
    this.sendRequest();
    this.pageIndex = type
    this.network().getData(type)
    this.network().getCompositionDictList('composition_type')
    this.network().getCompositionDictList('grade')
  },
  // 触底加载
  onReachBottom() {
    this.queryParams.pageNo += 1
    this.network().getData(this.pageIndex)
  },
  methods: {
    param() {
      return param
    },
    async sendRequest() {
      try {
        const response = await sseRequestTask();
        // console.log('Response:', response);
        // 处理成功响应数据
      } catch (error) {
        console.error('Error:', error);
        // 处理请求失败
      }
    },
    clickItem(item) {
      uni.$emit('compositionData', item)
      uni.navigateBack(1)
    },
    questionTypesConfirm(e) {
      console.log(e)
      this.questionTypes.value = this.questionTypes.content[e[0]];
      this.questionTypes.index = e[0];
    },
    selectConfirm(e, index) {
      this.selectContent[index].value = this.selectContent[index].content[e[0]];
      this.selectContent[index].index = e[0];
    },
    search() {
      this.queryParams.compositionType = this.questionTypes.dict[this.questionTypes.index]
      this.queryParams.titleKeywords = this.infoKeyword
      this.queryParams.pageNo = 1
      this.contentData = []
      this.network().getData(1)
    },
    timeDateConfirm(e) {
      console.log(e)
      var year = e.year
      var month = e.month
      var day = e.day
      this.queryParams.createTime = year + '-' + month + '-' + day
    },
    timeDateCancel() {
      this.queryParams.createTime = ''
    },
    network() {
      return {
        getData: async (type) => {
          let data = "";
          if (type == 0) {
            this.pageTitle = "我的英语作文库";
            data = await getCompositionCollectList(this.queryParams);
          } else {
            this.pageTitle = "选择作文题目";
            data = await getCompositionList(this.queryParams);
          }
          data.data.result.records.forEach(d => {
            d.createTime = d.createTime.split(' ')[0]
            this.contentData.push(d)
          })
        },
        getCompositionDictList: async (type) => {
          let params = { type }
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
              break;
            case 'grade':
              result.forEach(d => {
                this.selectContent[0].content.push(d.text)
                this.selectContent[0].dict.push(d.value)
              })
              break;
          }
        },
        generateTitle: async () => {
          if (this.selectContent[0].index === 0) {
            uni.showToast({
              title: '请选择年级',
              icon: 'none'
            })
            return
          }
          uni.showLoading({
            title: '生成中...'
          })
          let params = {
            "info_grade": this.selectContent[0].dict[this.selectContent[0].index],
            "info_word_nums": this.selectContent[1].value.replace('字', ''),
            "info_keyword": this.infoKeyword,
          }
          sseRequestTask({
            url: 'composition/aigc/title',
            method: 'post',
            data: params
          }).then(res => {
            uni.hideLoading()
            console.log("生成内容")
            console.log(res)
          })
        },
      }
    }
  },
}
</script>

<style lang="scss" scoped>
.grade {
  width: 200rpx;
  height: 70rpx;
  border-radius: 10rpx;
  background: #FFFFFF;
  box-sizing: border-box;
  border: 2rpx solid #AAC9FF;
}

.keywords, .keywords-ai {
  width: 422rpx;
  height: 70rpx;
  border-radius: 14rpx;
  background: #FFFFFF;
  box-sizing: border-box;
  border: 1rpx solid #AAC9FF;
  overflow: hidden;

  .search-box {
    width: 100rpx;
    height: 70rpx;
    background: #2A67D2;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

.keywords-ai {
  width: 100%;
}

.content-border {
  border-radius: 10rpx;
  box-sizing: border-box;
  border: 1rpx solid #8A8A8A;
  font-size: 26rpx;

  &.active {
    background: #FFF6EE;
  }

  .sort-box {
    width: 50rpx;
  }

  .content-top {
    color: #3C7BDB;
  }

  .title-box {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 70%;
  }
}
</style>
