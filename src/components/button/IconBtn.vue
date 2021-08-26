<template>
  <div class="container" :title="title">
    <i :class="iconType" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: "IconBtn",
  props: {
    iconType: {
      type: String,
      require: true,
    },
    title: {
      type: String,
      default: '',
    },
  },
});
</script>

<style scoped>
.container {
  padding: 4px;
  cursor: pointer;
}

.container:hover {
  color: #409eff;
}
</style>
