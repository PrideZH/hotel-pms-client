<template>
  <div>
    <NotifyList :list="recycletifies" @onClick="handleRead">
      <el-button size="mini" type="danger">清 除</el-button>
    </NotifyList>
    <el-divider />
    <el-button type="danger" @click="handleReadAll">全部清空</el-button>
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
    recycletifies: {
      type: Object,
      required: true,
    }
  },
  emits: ['requestNotifies'],
  setup(props, { emit }) {
    const instance = getCurrentInstance();
    const axios = instance?.appContext.config.globalProperties.$axios;

    const handleRead = (item: NotifyUser) => {
      item.state = 3;
      Axios({
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
      props.recycletifies.forEach((notify: NotifyUser) => {
        notify.state = 3;
        reqs.push(axios({
          method: 'post',
          url: '/v1/notify/user/update',
          data: {
            param: JSON.stringify(notify),
          }
        }));
      });
      axios.all(reqs).then((res: any) => {
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
