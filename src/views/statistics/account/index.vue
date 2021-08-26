<template>
  <div class="container">
    <el-button type="info">导出明细<i class="el-icon-download" /></el-button>
    <el-divider />
    <el-timeline>
      <el-timeline-item  v-for="(item, index) in activities" :key="index" :timestamp="item.timestamp" placement="top">
        <el-card>
          <h4>{{ item.title }}</h4>
          <p>{{ item.content }}</p>
          <p>{{ item.tips }}</p>
        </el-card>
      </el-timeline-item>
    </el-timeline>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';

export default defineComponent({
  setup() {
    const activities = reactive([{
      timestamp: '2018-04-12 20:46',
      title: '押金',
      content: '张三 支付押金 ￥66.66',
      tips: '440103199003074919',
    }, {
      timestamp: '2019-04-12 20:46',
      title: '结账',
      content: '张三 支付账单 ￥66.66',
      tips: '440103199003074919',
    }, {
      timestamp: '2020-04-12 20:46',
      title: '退款',
      content: '退款给 张三 ￥66.66',
      tips: '440103199003074919',
    }]);

    return {
      activities,
    }
  }
});
</script>

<style scoped>

</style>
