<template>
  <view>
    <cy-navbar showBack>
      <view class="t-size-30">{{title}}</view>
    </cy-navbar>
    <view class="px-4 mt-4 pb-3">
      <rich-text :nodes="content"></rich-text>
    </view>
  </view>
</template>

<script>
import {aboutUs, privacyPolicy, userAgreement, userGuide} from "@/api/me";
import {promoAgreement} from "../../api/me";

export default {
  data() {
    return {
      type: "",
      title: "",
      content: ""
    };
  },
  onLoad({type, title}) {
    this.type = type;
    this.title = title;
    this.getContent();
  },
  methods: {
    getContent() {
      console.log("type", this.type)
      switch (this.type) {
        case "0":
          userAgreement().then(res => {
            this.content = res.data.result;
          });
          break;
        case "1":
          privacyPolicy().then(res => {
            this.content = res.data.result;
          });
          break;
        case "2":
          userGuide().then(res => {
            this.content = res.data.result;
          });
          break;
        case "3":
          aboutUs().then(res => {
            this.content = res.data.result;
          });
          break;
        case "4":
          promoAgreement().then(res => {
            this.content = res.data.result;
          });
      }
    }
  },
}
</script>

<style lang="scss">

</style>
