<template>
  <div>
    <div @click="toggleChildren" style="cursor: pointer">
      {{ node.nodeName }}
      <span v-if="hasChildren">[{{ isOpen ? "-" : "+" }}]</span>
    </div>
    <div v-if="isOpen && hasChildren">
      <div v-for="child in node.children" :key="child.id">
        <NodeItem :node="child" />
      </div>
    </div>
    <!-- 只有在已展开且没有子节点时显示 "test" -->
    <div v-if="isOpen && !hasChildren">test</div>
  </div>
</template>

<script>
import NodeItem from "./NodeItem.vue";

export default {
  components: {
    NodeItem,
  },
  name: "NodeItem",
  props: {
    node: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      isOpen: false, // 控制子节点的展开和收起
    };
  },
  computed: {
    hasChildren() {
      return this.node.children && this.node.children.length > 0;
    },
  },
  methods: {
    toggleChildren() {
      this.isOpen = !this.isOpen; // 切换展开状态
    },
  },
};
</script>

<style scoped>
div {
  margin-left: 20px; /* 缩进样式 */
}
</style>
