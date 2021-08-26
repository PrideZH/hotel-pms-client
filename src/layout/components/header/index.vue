<template>
  <div class="header">
    <!-- 右边栏 -->
    <div class="left-bar">
      <el-menu
        class="second-nav"
        :default-active="subActiveIndex"
        mode="horizontal"
        active-text-color="#53ae89"
        router>
          <el-menu-item v-for="item in subMenus" :key="item.path" :index="item.path">
            {{ item.titleI18n ? $t(item.titleI18n) : item.title }}
          </el-menu-item>
      </el-menu>
    </div>
    <!-- 右边栏 -->
    <div class="right-bar">
      <!-- 全屏 -->
      <Screenfull/>
      <!-- 国际化 -->
      <LanguageSwitch />
      <!-- 消息通知 -->
      <Message />
      <!-- 用户信息 -->
      <el-dropdown trigger="click">
        <span class="el-dropdown-link">
          <BlobAvatar :portrait="store.state.user.portrait" :name="store.state.user.name" size="small" />
          <p>{{ store.state.user.name }}</p>
          <i class="el-icon-arrow-down"/>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item icon="el-icon-switch-button" @click="logout">{{ $t('hearder.exit') }}</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { useStore } from 'vuex'
import { useRouter } from "vue-router";

import Screenfull from "./Screenfull.vue";
import BlobAvatar from '@/components/BlobAvatar.vue';
import Message from "./Message.vue";
import LanguageSwitch from "./LanguageSwitch.vue";

export default defineComponent({
  name: "Header",
  components: {
    Screenfull,
    BlobAvatar,
    Message,
    LanguageSwitch,
  },
  props: {
    subMenus: {
      type: Object,
      requirt: true,
    },
    subActiveIndex: {
      type: String,
      requirt: true,
    },
  },
  setup() {
    const store = useStore();
    const router = useRouter();

    // 国际化语言切换
    const toggleLang = (): void => {
      // langs.value = !langs.value;
      // if (langs.value) {
      //   locale.value = "zh";
      //   ElementLocale.use(zhLocale);
      // } else {
      //   locale.value = "en";
      //   ElementLocale.use(enLocale);
      // }
    };

    // 退出登录
    const logout = (): void => {
      // 请求api注销令牌
      localStorage.removeItem("token");
      router.push("/login");
    };

    function onPanel() {
    }

    function toggleSideBar() {
    }

    return {
      store,
      toggleSideBar,
      toggleLang,
      logout,
      onPanel,
    };
  }
});
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 8vh;
  overflow: hidden;
  background: #fff;
  box-shadow: 0 2px 4px rgba(0, 21, 41, 0.08);

  .second-nav {
    font-weight: 900;
  }

  .right-bar {
    display: flex;
    align-items: center;

    * {
      margin: 0 8px;
    }

    .el-dropdown-link {
      display: flex;
      align-items: center;
      cursor: pointer;

      * {
        margin: 0 2px;
      }
    }
  }
}
</style>
