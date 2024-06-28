<template>
  <view class="main">
    <cy-navbar showBack :bgColor="backColor" textColor="#3D3D3D">
      <view class="t-size-30">切换教材</view>
    </cy-navbar>
    <view class="shop-list mt-5">
      <shop-list
        :typeValue="typeValue"
        :sortType="sortType"
        :typeList="typeList"
        :shopList="shopList"
        @changeType="handleChangeType"
        @detail="handleDetail"
        @sort="handleSort"
      ></shop-list>
    </view>
  </view>
</template>

<script>
import shopList from "@/components/shop-list/shop-list.vue";
import {
  getBookList,
  queryMapByBookProperties,
  switchBook,
} from "../../api/word";
export default {
  components: {
    shopList,
  },
  data() {
    return {
      backColor: "transparent",
      sortType: "",
      typeValue: 1,
      typeList: [],
      shopList: [],
      bookData: [],

      /* 当前页面类型 */
      pageType: "",
    };
  },
  onLoad({ pageType }) {
    this.pageType = pageType;
    if (this.pageType === "textBook") {
      this.network().getBookList(101);
    } else if (this.pageType === "dictBook") {
      this.network().getBookList(102);
    }
  },
  onPageScroll(e) {
    if (e.scrollTop > 20) {
      this.backColor = "#fff";
    } else {
      this.backColor = "transparent";
    }
  },
  methods: {
    handleChangeType(typeValue) {
      this.typeValue = typeValue;
      // 获取key
      const key = Object.keys(this.bookData)[typeValue - 1];
      // 获取value
      const value = this.bookData[key];
      this.shopList = value;
      console.log(this.shopList);
    },
    handleDetail(item) {
      const basicData = uni.getStorageSync("basicData");
      const currWordConfig = { ...basicData.currWordConfig };

      if (this.pageType === "textBook") {
        currWordConfig.textBook = item;
        this.network().switchBook({ textBookId: item.id });
      } else if (this.pageType === "dictBook") {
        currWordConfig.dictBook = item;
        this.network().switchBook({ dictBookId: item.id });
      }

      uni.setStorageSync("basicData", { ...basicData, currWordConfig });
    },
    handleSort(sortType) {
      console.log(sortType);
      this.sortType = sortType;
    },
    network() {
      return {
        getBookList: async (bookProperties) => {
          const res = await queryMapByBookProperties({ bookProperties });
          this.bookData = res.data.result;
          // 获取有多少个key
          const keyLength = Object.keys(res.data.result).length;
          for (let i = 0; i < keyLength; i++) {
            // 获取key
            const key = Object.keys(res.data.result)[i];
            // 获取value
            const value = res.data.result[key];
            console.log(key, value);
            this.typeList.push({
              _id: i + 1,
              label: key,
            });

            if (i === this.typeValue - 1) {
              this.shopList = value;
            }
          }
        },
        switchBook: async (params) => {
          const res = await switchBook(params);
          if (res.data.code === 200) {
            uni.showToast({
              title: "切换成功",
              icon: "success",
              duration: 2000,
            });
            uni.$emit("switchTextbook", params);
            uni.navigateBack();
          } else {
            uni.showToast({
              title: "切换失败",
              icon: "none",
              duration: 2000,
            });
          }
        },
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.main {
  background: linear-gradient(180deg, #d1eaff 0%, #f8fdff 14%) !important;
}
</style>
