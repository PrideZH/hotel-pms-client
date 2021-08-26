<template>
  <el-container class="container">
    <el-aside class="sidebar">
      <Sidebar :menus="menus" @setSubMenus="setSubMenus" />
    </el-aside>
    <el-container>
      <el-header class="header">
        <Header :subMenus="subMenus" :subActiveIndex="subActiveIndex" />
      </el-header>
      <el-main class="main" >
        <AppMain />
      </el-main>
    </el-container>
  </el-container>

</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

import { AppMain, Sidebar, Header } from './components';

import { Menu } from '../utils/menus';

export default defineComponent({
  name: 'Layout',
  components: {
    AppMain,
    Sidebar,
    Header,
  },
  setup() {
    const router = useRouter();
    const store = useStore();

    const menus = ref<Menu[]>(store.getters.menus); // 获取导航菜单
    const subMenus = ref<Menu[]>([]);

    const subActiveIndex = ref<string>('');

    let path = router.currentRoute.value.fullPath;
    // 根据路由路径初始化子菜单
    let paths = path.match(/\/\w+/g);
    if (paths !== undefined && paths !== null) {
      for (let i = 0; i < menus.value.length; i++) {
        if (menus.value[i].path === paths[0]) {
          subMenus.value = menus.value[i].children as Menu[];
          break;
        }
      }
    }
    // 根据路由路径激活菜单按钮
    for (let i = 0; i < subMenus.value.length; i++) {
      if (subMenus.value[i].path === path) {
        subActiveIndex.value = path;
        break;
      }
    }

    const setSubMenus = (item: Menu[]) => {
      subMenus.value = item;
      subActiveIndex.value = item[0].path;
    }

    return {
      menus,
      subMenus,
      subActiveIndex,
      setSubMenus,
    }
  },
});
</script>

<style lang="scss" scoped>
.container {
  height: 100%;
}

.sidebar {
  width: 80px;
}

.header {
  padding: 0;
}

.main {
  padding: 16px 32px;
}
</style>
