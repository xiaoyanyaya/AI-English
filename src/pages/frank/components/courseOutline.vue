<template>
  <view>
    <cy-navbar :showBack="true" :bgColor="backColor" textColor="#3D3D3D">
      <view class="t-size-30">{{ navbarTitle }}</view>
    </cy-navbar>

    <view v-for="(item, index) in videoList" :key="index">
      <nodeItem :node="item" />
    </view>
  </view>
</template>

<script>
import { getCourseOutline } from "@/api/frank";
import nodeItem from "./NodeItem.vue";

export default {
  components: {
    nodeItem
  },
  data() {
    return {
      nodeCode: "",
      introduce: "",
      videoList: []
    }
  },
  onLoad({ nodeCode}) {
    this.nodeCode = nodeCode;
    this.getCourseOutline();
  },
  methods: {
    async getCourseOutline() {
      const res = await getCourseOutline({ rootNodeCode: this.nodeCode });
      this.introduce = res.data.result[0].nodeContent;
      this.videoList = res.data.result[0].children;
      console.log(this.videoList)
    }
  },
}
</script>

<style scoped>
/* 添加样式 */
</style>
