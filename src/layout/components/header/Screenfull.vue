<template>
  <IconChangeBtn
    iconTypeFirest="el-icon-full-screen"
    iconTypeSecond="el-icon-crop"
    titleFirest="全屏"
    titleSecond="缩小"
    @click="onScreenFull"/>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import IconChangeBtn from  '../../../components/button/IconChangeBtn.vue';

import screenfull from "screenfull";
import { ElMessage } from 'element-plus'

export default defineComponent({
  name: "Screenfull",
  components: {
    IconChangeBtn,
  },
  setup() {
    const onScreenFull = (): void => {
      // 判断是否支持
      if (!screenfull.isEnabled) {
        ElMessage.error('不支持全屏');
        return;
      }
      screenfull.toggle();
    };

    return {
      onScreenFull,
    };
  },
});
</script>

<style scoped>
  i {
    cursor: pointer;
  }
</style>
