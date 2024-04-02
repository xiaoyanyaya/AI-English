<template>
  <view class="pb-5 main-body">
    <cy-navbar showBack @returnPageNum="returnPageNum">
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
          <view class="keywords flex align-item-center border-box pl-3 justify-content-between  t-size-24"
                @click="$navigateTo('/pages/composition/component/searchCondition')">
            <input placeholder=" " disabled v-model="infoKeyword"
                   style="color:#333;flex:1;border:none;font-size: 24rpx;flex:1"/>
            <view class="search-box flex"> <!-- @click="search"-->
              <u-icon name="search" color="#FFFFFF" size="28"></u-icon>
              <view class="t-color-fff ml-1">搜索</view>
            </view>
          </view>
        </view>
      </view>

      <view class="mt-3 parent-content-box" v-for="(item, index) in contentData" :key="index">
        <view class="sort-box flex align-item-center justify-content-center t-size-22 t-color-fff">{{ index + 1 }}
        </view>
        <uni-swipe-action>
          <uni-swipe-action-item
            @click="bindClick"
          >
            <template v-slot:right>
              <view class="slot-button">
                <view @click="bindClick({position:'right',content:{text:'删除'}, index: index})"
                      class="delete-btn flex flex-direction-column justify-content-center align-item-center">
                  <view>
                    <image :src="`${imageBaseUrl}/3-22-15.png`" style="width: 30rpx; height: 30rpx"></image>
                  </view>
                  <view class="t-size-26" style="color: #DC0C0C">删除</view>
                </view>
              </view>
            </template>
            <view class="content-box px-3 pb-3 pt-1" @click="contentClick(item)">
              <view class="flex justify-content-between align-item-center">
                <view class="content-text"></view>
                <view class="flex align-item-start">
                  <view class="mr-1">
                    <image :src="`${imageBaseUrl}/3-22-04.png`" style="width: 30rpx; height: 30rpx"></image>
                  </view>
                  <view class="t-size-24 t-color-8A8A8A">{{ item.createTime }}</view>
                </view>
              </view>

              <view class="content-text mt-2 table-nowrap">
                <text class="t-size-26 t-color-3D3D3D">{{ item.compositionTitleText }}</text>
              </view>
              <view class="desc-text mt-1 table-nowrap-2">
                <text class="t-size-24 t-color-8A8A8A">{{ item.compositionText }}</text>
              </view>
            </view>
          </uni-swipe-action-item>
        </uni-swipe-action>
      </view>

      <view v-if="contentData.length < 1" class="flex mt-3 justify-content-center align-item-center t-size-22 t-color-3D3D3D">
        暂无数据~
      </view>

    </view>

    <u-modal v-model="showDelete"
             :show-cancel-button="true"
             @confirm="confirmDelete"
             content="温馨提示：删除后将不会出现在我的作文库。"></u-modal>

  </view>
</template>

<script>
import MyMixin from "@/utils/MyMixin";
import {
  getCompositionList,
  getCompositionCollectList,
  getCompositionDictList,
  getAIGCComposition, deleteCompositionCollect
} from '@/api/composition';
import {sseRequestTask} from "@/jslibs/requestUtils";
import {param, tr} from "@dcloudio/vue-cli-plugin-uni/packages/postcss/tags";

export default {
  mixins: [MyMixin],
  data() {
    return {
      pageIndex: 0,
      pageTitle: "我的作文库",

      // 日期
      dateValue: "日期",
      showDate: false,

      contentData: [],
      queryParams: {
        pageNo: 1,
        pageSize: 10,
      },

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

      show: false,
      isOpened: 'none',
      showDelete: false
    }
  },
  onReady() {
    // 模拟延迟赋值
    setTimeout(() => {
      this.isOpened = 'right';
    }, 1000);

    uni.$on('update', res => {
      this.swipeClick({
        content: {
          text: '添加'
        }
      })
    })
  },
  // 页面销毁
  onUnload() {
    uni.$off('compositionSearchParams')
    uni.$off('update')
  },
  onLoad({type}) {
    this.sendRequest();
    this.pageIndex = type
    this.network().getData(type)

    uni.$on('compositionSearchParams', res => {
      this.queryParams = {
        ...this.queryParams,
        ...res
      }
      this.queryParams.pageNo = 1
      this.contentData = []
      this.network().getData(1)
    })
  },
  // 触底加载
  onReachBottom() {
    this.queryParams.pageNo += 1
    this.network().getData(this.pageIndex)
  },
  methods: {
    returnPageNum() {
      console.log("触发")
      uni.$off('compositionSearchParams')
    },
    contentClick(item) {
      console.log(item)
      this.$navigateTo(`/pages/composition/new/titleSubject?pageIndex=5&pageTitle=AI作文批改&title=${item.compositionTitleText}&content=${item.compositionText}&generateContent=${item.compositionReview || ''}`);
    },
    bindClick(e) {
      console.log(e)
      if (e.content.text == "删除") {
        this.showDelete = true
        this.deleteIndex = e.index
      }
    },
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
    confirmDelete() {
      this.network().deleteCompositionCollect(this.contentData[this.deleteIndex].id)
    },
    network() {
      return {
        deleteCompositionCollect: async (id) => {
          let data = await deleteCompositionCollect({
            id,
            status: 0
          })
          console.log(data)
        },
        getData: async (type) => {
          let data = "";
          this.pageTitle = "我的作文库";
          data = await getCompositionCollectList(this.queryParams);
          /*if (type == 1) {
            this.pageTitle = "选择作文题目";
            data = await getCompositionList(this.queryParams);
          } else {
            this.pageTitle = "我的作文库";
            data = await getCompositionCollectList(this.queryParams);
          }*/
          data.data.result.records.forEach(d => {
            d.createTime = d.createTime.split(' ')[0]
            d.compositionTitleText = d.compositionTitleText.replace(/<[^>]+>/g, "")
            d.compositionText = d.compositionText.replace(/<[^>]+>/g, "")
            this.contentData.push(d)
          })
          console.log(this.contentData)
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
  width: 680rpx;
  height: 70rpx;
  border-radius: 14rpx;
  background: #FFFFFF;
  box-sizing: border-box;
  overflow: hidden;

  .search-box {
    width: 120rpx;
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

.parent-content-box {
  position: relative;
  z-index: 999;
  overflow: hidden;
  border-radius: 20rpx;
}

.sort-box {
  position: absolute;
  z-index: 1000;
  width: 40rpx;
  height: 40rpx;
  background: #4E8FFF;
  border-radius: 0 0 10rpx 0;
}

.content-box {
  flex: 1;
  /* #ifdef APP-NVUE */
  justify-content: center;
  /* #endif */
  height: 214rpx;
  position: relative;
  background-color: #fff;
  border-bottom-color: #f5f5f5;
  border-bottom-width: 1rpx;
  border-bottom-style: solid;
}

.content-text {
  font-size: 15px;
}


.button-text {
  font-size: 15px;
}

.slot-button {
  /* #ifndef APP-NVUE */
  display: flex;
  height: 100%;
  /* #endif */
  flex: 1;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0 20px;
  background-color: #FFE2E2;
}

.slot-button-text {
  color: #ffffff;
  font-size: 14px;
}

.delete-btn {
  width: 100rpx;
}
</style>
