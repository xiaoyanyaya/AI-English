<template>
  <div>
    <div @click="toggleChildren" style="cursor: pointer;">
      {{ node.nodeName }} <span v-if="hasChildren">[{{ isOpen ? '-' : '+' }}]</span>
    </div>
    <div v-if="isOpen && hasChildren">
      <div v-for="child in node.children" :key="child.id">
        <NodeItem :node="child" />
      </div>
    </div>
  </div>
</template>

<script>
import { getNodeVideo } from "@/api/frank";
import NodeItem from './NodeItem.vue';

export default {
  components: {
    NodeItem
  },
  name: 'NodeItem',
  props: {
    node: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      isOpen: false // 控制子节点的展开和收起
    };
  },
  computed: {
    hasChildren() {
      console.log("执行判断hasChildren")
      return this.node.children && this.node.children.length > 0 || this.node.videoNum == 0;
    }
  },
  methods: {
    async toggleChildren() {
      // 如果是最后一级节点，请求视频列表
      if (this.node.children.length === 0) {
        await this.getVideoList(); // 请求视频列表并等待结果
      }

      this.isOpen = true; // 切换展开状态
      // 判断是否有子节点
      console.log("this.node", this.node)
    },
    async getVideoList() {
      // 请求视频列表 并放入对应的节点中
      const res = await getNodeVideo({ nodeId: this.node.id });
      this.$set(this.node, 'children', res.data.result);
    }
  }
}
</script>

<style scoped>
div {
  margin-left: 20px; /* 缩进样式 */
}
</style>
