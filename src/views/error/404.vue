<template>
  <div class="error">
    <img src="@/assets/404.gif"/>
    <el-button class="back-home-btn">返回首页</el-button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Error',
});
</script>

<style scoped>
.error {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.error img {
  width: 100%;
  height: 100%;
}

.back-home-btn {
  position: absolute;
  width: 128px;
  height: 48px;
  top: 512px;
  margin: 0 auto;
}
</style>
