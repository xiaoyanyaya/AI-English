<template>
  <view>
    <cy-navbar :showBack="true" :bgColor="backColor" textColor="#3D3D3D">
      <view class="t-size-30">{{ navbarTitle }}</view>
    </cy-navbar>

    <nodeItem :node="data" />
  </view>
</template>

<script>
import nodeItem from "./NodeItem.vue";

export default {
  components: {
    nodeItem
  },
  data() {
    return {
      data: {
        id: "1837064608037212165",
        createBy: "ai-robot",
        createTime: "2024-09-20 17:41:48",
        updateBy: "ai-robot",
        updateTime: "2024-09-20 17:41:48",
        nodeName: "弗兰克英语听说能力体系",
        nodeCode: "8002",
        parentNodeId: "0",
        parentNodeCode: "8",
        isLeafNode: "0",
        hasChild: "1",
        nodeContent: "无",
        nodeLevel: "1",
        showNumPerLine: "0",
        children: [
          {
            id: "1837064608037212166",
            createBy: "ai-robot",
            createTime: "2024-09-20 17:41:48",
            updateBy: "ai-robot",
            updateTime: "2024-09-20 17:41:48",
            nodeName: "初级听说能力体系：见词拼读",
            nodeCode: "8002001",
            parentNodeId: "1837064608037212165",
            parentNodeCode: "8002",
            isLeafNode: "0",
            hasChild: "1",
            nodeContent: "无",
            nodeLevel: "2",
            showNumPerLine: "0",
            children: [
              {
                id: "1837064608037212167",
                createBy: "ai-robot",
                createTime: "2024-09-20 17:41:48",
                updateBy: "ai-robot",
                updateTime: "2024-09-20 17:41:48",
                nodeName: "学习攻略",
                nodeCode: "8002001001",
                parentNodeId: "1837064608037212166",
                parentNodeCode: "8002001",
                isLeafNode: "1",
                hasChild: "0",
                nodeContent: "无",
                nodeLevel: "3",
                showNumPerLine: "0",
                children: [],
                videoNum: 0,
                status: 1,
                note: null
              }
            ]
          }
        ]
      }
    }
  }
}
</script>

<style scoped>
/* 添加样式 */
</style>
