<template>
  <section class="container">
    <router-view :key="key" v-slot="{ Component }">
      <transition appear name="fade-transform" mode="out-in">
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </transition>
    </router-view>
  </section>
</template>

<script lang="ts" scoped>
import { computed, defineComponent } from "vue";
import { useRoute } from "vue-router";

export default defineComponent({
  name: "AppMain",
  setup() {
    const route = useRoute();
    const key = computed(() => route.path);

    return { key };
  }
});
</script>

<style lang="scss" scoped>
</style>
