<template>
   <el-dropdown>
    <IconBtn iconType="el-icon-guide" title="切换语言" />
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="setLang('zh')">中文</el-dropdown-item>
        <el-dropdown-item @click="setLang('en')">英文</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import IconBtn from  '@/components/button/IconBtn.vue';

import { setLang } from '../../../i18n';

export default defineComponent({
  name: "Screenfull",
  components: {
    IconBtn,
  },
  setup() {
    return {
      setLang,
    };
  },
});
</script>

<style scoped>
</style>
