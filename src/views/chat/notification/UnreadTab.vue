<template>
  <div>
    <NotifyList :list="unreadNotifies" @onClick="handleRead">
      <el-button size="mini" type="primary">标记已读</el-button>
    </NotifyList>
    <el-divider />
    <el-button type="primary" @click="handleReadAll">全部标记已读</el-button>
  </div>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance } from 'vue';
import Axios from 'axios'
import { NotifyUser } from './index.vue'

import NotifyList from './NotifyList.vue';

export default defineComponent({
  components: {
    NotifyList,
  },
  props: {
    unreadNotifies: {
      type: Object,
      required: true,
    }
  },
  emits: ['requestNotifies'],
  setup(props, { emit }) {
    const instance = getCurrentInstance();
    const axios = instance?.appContext.config.globalProperties.$axios;

    const handleRead = (item: NotifyUser) => {
      item.state = 1;
      axios({
        method: 'post',
        url: '/v1/notify/user/update',
        data: {
          param: JSON.stringify(item),
        }
      }).then((res: any) => {
        if (res.code === 200) {
          emit('requestNotifies');
        }
      });
    };

    const handleReadAll = () => {
      const reqs: any[] = [];
      props.unreadNotifies.forEach((notify: NotifyUser) => {
        notify.state = 1;
        reqs.push(axios({
          method: 'post',
          url: '/v1/notify/user/update',
          data: {
            param: JSON.stringify(notify),
          }
        }));
      });
      Axios.all(reqs).then((res: any) => {
        emit('requestNotifies');
      });
    }

    return {
      handleRead,
      handleReadAll,
    };
  },
});
</script>

<style scoped>

</style>
