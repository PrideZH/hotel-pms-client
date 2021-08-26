<template>
  <div class="error">
    <img src="@/assets/401.png"/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: "401"
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
</style>
