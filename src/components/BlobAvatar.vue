<template>
  <div class="container">
    <el-avatar v-if="portrait === ''" :size="size">{{ name[0] }}</el-avatar>
    <el-avatar v-else :src="portrait" :size="size" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: "IconBtn",
  props: {
    portrait: {
      type: String,
      require: true,
    },
    name: {
      type: String,
      require: true,
    },
    size: {
      type: String,
      default: 'large',
    },
  },
  setup(porps) {
    const portrait = ref('');

    if (porps.portrait != null) {
      if (porps.portrait.substr(0, 23) === 'data:image/jpeg;base64,') {
        portrait.value = porps.portrait;
      } else {
        portrait.value = 'data:image/jpeg;base64,' + porps.portrait;
      }
    }

    return {
      portrait,
    }
  }
});
</script>

