<template>
  <div class="custom-container">
    <el-descriptions title="一级菜单样式" :column="4">
      <el-descriptions-item label="背景色">
        <el-color-picker v-model="color" />
      </el-descriptions-item>
      <el-descriptions-item label="悬停背景色">
        <el-color-picker v-model="color" />
      </el-descriptions-item>
      <el-descriptions-item label="激活背景色">
        <el-color-picker v-model="color" />
      </el-descriptions-item>
      <el-descriptions-item label="激活前景色">
        <el-color-picker v-model="color" />
      </el-descriptions-item>
    </el-descriptions>
    <el-descriptions title="二级菜单样式" :column="4">
      <el-descriptions-item label="背景色">
        <el-color-picker v-model="color" />
      </el-descriptions-item>
      <el-descriptions-item label="悬停背景色">
        <el-color-picker v-model="color" />
      </el-descriptions-item>
      <el-descriptions-item label="激活背景色">
        <el-color-picker v-model="color" />
      </el-descriptions-item>
      <el-descriptions-item label="激活前景色">
        <el-color-picker v-model="color" />
      </el-descriptions-item>
    </el-descriptions>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const color = ref('#ddd');

    return {
      color,
    }
  },
});
</script>

<style scoped>

</style>
