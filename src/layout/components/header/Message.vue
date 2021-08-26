<template>
  <el-badge :value="value === 0 ? null : value" class="badge-font" type="danger">
    <IconBtn iconType="el-icon-bell" @click="HandleClick" />
  </el-badge>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance, ref } from "vue";
import IconBtn from  '@/components/button/IconBtn.vue';
import { useRouter } from "vue-router";
import { useStore } from "vuex";

export default defineComponent({
  name: "Screenfull",
  components: {
    IconBtn,
  },
  setup() {
    const instance = getCurrentInstance();
    const axios = instance?.appContext.config.globalProperties.$axios;

    const store = useStore();
    const router = useRouter();

    const value = ref<number>(0);

    axios({
      method: 'get',
      url: '/v1/notify/list',
      params: {
        id: store.state.user.id,
      },
    }).then((res: any) => {
      if (res.code === 200) {
        res.data.forEach((notify: any) => {
          if (notify.state == 0) {
            value.value++;
          }
        });
      }
    });

    const HandleClick = () => {
      router.push('/chat/notification');
    };

    return {
      value,
      HandleClick,
    };
  },
});
</script>

<style scoped>
</style>
