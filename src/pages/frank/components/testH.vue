<template>
  <view>
    <block v-for="item in data" :key="item.name">
      <view>{{ item.name }}</view>
      <view v-if="item.chi">
        <testH :data="item.chi" />
      </view>
    </block>
  </view>
</template>

<script>
export default {
  name: "testH",
  props: {
    data: {
      type: Array,
      default: () => [],
    },
  },
  methods: {},
};
</script>
