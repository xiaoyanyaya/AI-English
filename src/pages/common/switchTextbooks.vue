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
        :bookId="bookId"
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
  queryBookInfo,
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
      bookId: null,
      /* 当前页面类型 */
      pageType: "",
      bookType: "",
      allBookData: [], //所有书籍 而维数组
    };
  },
  async onLoad({ pageType, bookId }) {
    console.log("eeeeeeee", pageType, bookId);
    this.pageType = pageType;
    this.bookId = bookId;
    // 获取到当前用户的教材分类->获取书籍列表
    if (this.pageType === "textBook") {
      const id = uni.getStorageSync("basicData").currWordConfig.textBook.id;
      const res = await queryBookInfo({ id });
      this.bookType = res.data.result.bookSecondTypeText;
      this.network().getBookList(101);
    } else if (this.pageType === "dictBook") {
      const id = uni.getStorageSync("basicData").currWordConfig.dictBook.id;
      const res = await queryBookInfo({ id });
      this.bookType = res.data.result.bookSecondTypeText;
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
          const keyLength = Object.keys(res.data.result).length;
          for (let i = 0; i < keyLength; i++) {
            // 获取key
            const key = Object.keys(res.data.result)[i];
            // 获取value
            const value = res.data.result[key];
            this.typeList.push({
              _id: i + 1,
              label: key,
            });
            this.allBookData.push(value);
          }
          // 初始化页面书籍列表
          const bookTypeIndex = this.typeList.findIndex(
            (item) => item.label == this.bookType
          );
          this.typeValue = bookTypeIndex + 1;
          this.shopList = this.allBookData[bookTypeIndex];
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
