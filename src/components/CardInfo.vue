<template>
  <el-card>
    <template #header>
      <div class="card-header">
        <span>{{ title }}</span>
      </div>
    </template>
    <p class="card-big-font">{{ value }}</p>
    <div class="card-buttom-div">
      <span>{{ bottomTitle }}</span>
      <span>{{ bottomValue }}</span>
    </div>
  </el-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'CardInfo',
  props: {
    title: {
      type: String,
      requirt: true,
    },
    value: {
      type: String,
      requirt: true,
    },
    bottomTitle: {
      type: String,
      requirt: true,
    },
    bottomValue: {
      type: String,
      requirt: true,
    },
  }
});
</script>

<style scoped>
.card-big-font {
  margin-bottom: 16px;
  font-size: 40px;
}

.card-buttom-div {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  color: #888;
}
</style>
