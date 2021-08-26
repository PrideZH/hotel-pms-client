<template>
  <el-config-provider :locale="locale">
    <router-view/>
  </el-config-provider>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useStore } from 'vuex';

import { ElConfigProvider } from "element-plus";
import zhCn from 'element-plus/lib/locale/lang/zh-cn';

export default defineComponent({
  name: "App",
  components: {
    [ElConfigProvider.name]: ElConfigProvider,
  },
  setup() {
    const store = useStore();

    const locale = ref(zhCn);

    // state 数据持久化
    // 在页面加载时读取 state 数据
    const state = sessionStorage.getItem('state');
    if (state) {
      store.replaceState(
        Object.assign(
          {},
          store.state,
          JSON.parse(state)
        )
      )
    }

    // 刷新前保存 state 数据
    window.addEventListener('beforeunload', () => {
      sessionStorage.setItem('state', JSON.stringify(store.state))
    })

    return {
      locale,
    }
  },
});
</script>
