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
        <!--        <view class="flex align-item-center justify-content-between">
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
                    <view class="search-box flex"> &lt;!&ndash; @click="search"&ndash;&gt;
                      <u-icon name="search" color="#FFFFFF" size="28"></u-icon>
                      <view class="t-color-fff ml-1">搜索</view>
                    </view>
                  </view>
                </view>-->
        <view class="type-box flex">
          <view class="btn-1 flex align-item-center justify-content-center"
                :class="{'active' : isActiveBtn == 1}" @click="clickActiveBtn(1)">
            我的作文
          </view>
          <view class="btn-2 flex align-item-center justify-content-center"
                :class="{'active' : isActiveBtn == 2}" @click="clickActiveBtn(2)">
            收藏的作文
          </view>
        </view>
      </view>

      <view class="mt-3 parent-content-box" v-for="(item, index) in contentData" :key="index">
        <!--        <view class="sort-box flex align-item-center justify-content-center t-size-22 t-color-fff">{{ index + 1 }}
                </view>-->
        <uni-swipe-action>
          <uni-swipe-action-item
            @click="bindClick"
          >
            <template v-slot:right>
              <view class="slot-button" @click="bindClick({position:'right',content:{text:'删除'}, index: index})">
                <view class="delete-btn flex flex-direction-column justify-content-center align-item-center">
                  <view>
                    <image :src="`${imageBaseUrl}/3-22-15.png`" style="width: 30rpx; height: 30rpx"></image>
                  </view>
                  <view class="t-size-26" style="color: #DC0C0C">删除</view>
                </view>
              </view>
            </template>
            <view class="content-box px-3 pb-3 pt-1" @click="contentClick(item)">
              <!--              <view class="flex justify-content-between align-item-center">
                              <view class="content-text"></view>
                              <view class="flex align-item-start">
                                <view class="mr-1">
                                  <u-icon name="star-fill" class="t-size-32"
                                          @click="network().addCompositionCollectOther(item)"
                                          :class="item.status == 1 ? 't-color-fea831' : 't-color-d9d9d9'"></u-icon>
                                </view>
                                <view class="t-size-24 t-color-8A8A8A">{{ item.createTime }}</view>
                              </view>
                            </view>

                            <view class="content-text mt-2 table-nowrap">
                              <text class="t-size-26 t-color-3D3D3D">{{ item.compositionTitleText }}</text>
                            </view>
                            <view class="desc-text mt-1 table-nowrap-2">
                              <text class="t-size-24 t-color-8A8A8A">{{ item.compositionText }}</text>
                            </view>-->

              <view class="flex justify-content-between align-item-center"
                    style="height: 120rpx; border-bottom: 1px solid #e9ebee">
                <view class="flex align-item-center justify-content-center">
                  <image :src="item.avatar" mode="widthFix" style="width: 80rpx; border-radius: 50rpx"></image>
                  <view class="ml-3 font-weight-bold t-size-32">{{ item.nickName }}</view>
                </view>
                <view class="flex flex-direction-column">
                  <view class="flex align-item-center">
                    <image :src="`${imageBaseUrl}/4-30-02.png`" mode="widthFix" style="width: 30rpx; border-radius: 50%"></image>
                    <view class="ml-1 t-color-8A8A8A t-size-22">{{ item.createTime }}</view>
                  </view>
                  <view class="flex align-item-center mt-1">
                    <image :src="`${imageBaseUrl}/4-30-01.png`" mode="widthFix" style="width: 20rpx; "></image>
                    <view class="ml-1 t-color-8A8A8A t-size-22">收藏来源：{{ item.compositionFavoritesSourceStr || "收藏作文" }}</view>
                  </view>
                </view>
              </view>

              <view class="content-text mt-2" v-show="item.compositionTitleText">
                <view class="font-weight-bold t-size-30">题目：</view>
                <view class="content-text-mask"></view>
                <rich-text class="t-size-26 t-color-3D3D3D mt-2" style="line-height: 40rpx" :nodes="item.compositionTitleText"></rich-text>
              </view>
              <view class="desc-text mt-2">
                <view class="font-weight-bold t-size-30">内容：</view>
                <view class="desc-text-mask"></view>
                <rich-text class="t-size-24 t-color-8A8A8A mt-2" style="line-height: 40rpx" :nodes="item.compositionText"></rich-text>
              </view>
            </view>
          </uni-swipe-action-item>
        </uni-swipe-action>
      </view>

      <view class="flex align-item-center justify-content-center" v-if="contentData.length < 1">
        <image :src="`${imageBaseUrl}/nodata.png`" style="width: 400rpx; height: 400rpx"></image>
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
  getAIGCComposition,
  deleteCompositionCollect,
  getCompositionCollect,
  deleteCancelCompositionCollectOther
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
      showDelete: false,
      isModeData: true,

      isActiveBtn: 1,
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
    initData() {
      this.contentData = []
      this.isModeData = true
      this.queryParams.pageNo = 1
      this.network().getData()
    },
    returnPageNum() {
      console.log("触发")
      uni.$off('compositionSearchParams')
    },
    contentClick(item) {
      console.log(item)
      uni.setStorageSync('compositionCorrect', item.compositionCorrect)
      this.$navigateTo(`/pages/composition/new/titleSubject?pageIndex=5&pageTitle=作文详情&id=${item.id}&title=${item.compositionTitleText}&content=${item.compositionText}`);
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
      this.network().deleteCompositionCollect(this.contentData[this.deleteIndex].id, this.deleteIndex)
    },
    clickActiveBtn(type) {
      this.isActiveBtn = type
      this.initData()
    },
    network() {
      return {
        deleteCompositionCollect: async (id, index) => {
          let data = "";
          let params = {
            id,
            status: 0
          }
          if (this.isActiveBtn == 1) {
            data = await deleteCompositionCollect(params);
          } else {
            data = await deleteCancelCompositionCollectOther(params);
          }
          console.log(data.data.code)
          if (data.data.code == 200) {
            this.contentData.splice(index, 1)
            this.queryParams.pageNo = 1
            this.network().getData(1)
            this.showDelete = false
            uni.showToast({
              title: '删除成功',
              icon: 'none'
            })
          } else {
            uni.showToast({
              title: '删除失败',
              icon: 'none'
            })
          }
        },
        getData: async () => {
          if (!this.isModeData) return
          let data = "";
          this.pageTitle = "我的作文库";
          if (this.isActiveBtn == 1) {
            data = await getCompositionCollectList(this.queryParams);
          } else {
            data = await getCompositionCollect(this.queryParams);
          }
          console.log("数据库", data)
          data.data.result.forEach(d => {
            // d.createTime = d.createTime.split(' ')[0]
            d.compositionTitleText = d.compositionTitleText.replace(/<[^>]+>/g, "").replaceAll("\n", "<br/>")
            d.compositionText = d.compositionText.replaceAll("\n", "<br/>")
            d.compositionCorrect = d.compositionCorrect.replaceAll("\n", "<br/>")
            if (d.compositionFavoritesSource == 1) {
              d.compositionFavoritesSourceStr = "作文帮写"
            }
            if (d.compositionFavoritesSource == 2) {
              d.compositionFavoritesSourceStr = "作文批改"
            }
            if (d.compositionFavoritesSource == 3) {
              d.compositionFavoritesSourceStr = "疯狂挑战"
            }
            if (d.compositionFavoritesSource == 4) {
              d.compositionFavoritesSourceStr = "收藏他人作文"
            }
            this.contentData.push(d)
          })
          if (data.data.result.length < this.queryParams.pageSize) {
            this.isModeData = false
          }
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

.type-box {
  width: 100%;
  height: 70rpx;
  border-radius: 14rpx;
  overflow: hidden;
  background: #FFFFFF;
  box-sizing: border-box;
  margin-bottom: 20rpx;

  .btn-1 {
    width: 50%;
    height: 70rpx;
    box-sizing: border-box;
    overflow: hidden;
  }

  .btn-2 {
    width: 50%;
    height: 70rpx;
    box-sizing: border-box;
    overflow: hidden;
  }

  .active {
    background: #3a73d9;
    color: #FFFFFF;
  }


}

.content-text, .desc-text {
  position: relative;
}

.content-text-mask {
  background: rgba(217, 58, 58, 0.3);
  position: absolute;
  top: 26rpx;
  left: 0;
  width: 70rpx;
  height: 14rpx;
}

.desc-text-mask {
  background: rgba(58, 115, 217, 0.3);
  position: absolute;
  top: 26rpx;
  left: 0;
  width: 70rpx;
  height: 14rpx;
}
</style>
