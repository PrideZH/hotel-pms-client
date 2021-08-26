<template>
  <div class="container">
    <el-menu
      collapse
      unique-opened
      mode="vertical"
      :default-active="activeIndex"
      background-color="#36474f"
      text-color="#ddd"
      active-text-color="#ffd04b"
    >
      <template v-for="(item, index) in menus" :key="index">
        <el-menu-item class="item" :index="item.path" @click="handleTo(item)">
          <i :class="item.icon"></i>
          <template #title>
            <span>{{ item.titleI18n ? $t(item.titleI18n) : item.title }}</span>
          </template>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'Sidebar',
  props: {
    menus: {
      type: Object,
      required: true,
    }
  },
  emits: ['setSubMenus'],
  setup(_props, { emit }) {
    const router = useRouter();

    // 根据路由路径激活菜单按钮
    let Path = router.currentRoute.value.fullPath.match(/\/\w+/g);
    const activeIndex = ref<string>(Path ? Path[0] : '');

    // 根据点击的主菜单设置二级菜单
    const handleTo = (item: any) => {
      emit('setSubMenus', item.children);
      router.push(item.path);
    }

    return {
      activeIndex,
      handleTo,
    };
  },
});
</script>

<style scoped>
.container {
  height: 100%;
  background-color: #36474f;
  overflow: hidden;
  z-index: 1000;
}

.el-menu {
  width: 100%;
}

.item {
  text-align: center;
  margin: 0;
}
</style>
