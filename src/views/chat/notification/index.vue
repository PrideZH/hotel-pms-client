<template>
  <div class="inform-container">
    <el-card>
      <el-tabs>
        <el-tab-pane :label="'未读消息('+ unreadNotifies.length +')'">
          <UnreadTab :unreadNotifies="unreadNotifies" @requestNotifies="requestNotifies" />
        </el-tab-pane>
        <el-tab-pane :label="'已读消息('+ readNotifies.length +')'">
          <ReadTab :readNotifies="readNotifies" @requestNotifies="requestNotifies" />
        </el-tab-pane>
        <el-tab-pane :label="'回收站('+ recycletifies.length +')'">
          <RecycleTab :recycletifies="recycletifies" @requestNotifies="requestNotifies" />
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance, ref } from 'vue';

import { useStore } from 'vuex'

import ReadTab from './ReadTab.vue';
import RecycleTab from './RecycleTab.vue';
import UnreadTab from './UnreadTab.vue';

export interface NotifyUser {
  id: number,
  recipientId: number,
  state: number,
  readTime: Date,
  createdTime: Date,
  notify: Notify,
}

export interface Notify {
  id?: number,
  senderId: number,
  title: string,
  content: string,
  createTime?: Date,
}

export default defineComponent({
  components: {
    UnreadTab,
    ReadTab,
    RecycleTab,
  },
  setup() {
    const instance = getCurrentInstance();
    const axios = instance?.appContext.config.globalProperties.$axios;

    const store = useStore();

    const unreadNotifies = ref<NotifyUser[]>([]);
    const readNotifies = ref<NotifyUser[]>([]);
    const recycletifies = ref<NotifyUser[]>([]);

    const requestNotifies = () => {
      unreadNotifies.value = [];
      readNotifies.value = [];
      recycletifies.value = [];
      axios({
        method: 'get',
        url: '/v1/notify/list',
        params: {
          id: store.state.user.id,
        },
      }).then((res: any) => {
        if (res.code === 200) {
          res.data.forEach((notify: NotifyUser) => {
            switch (notify.state) {
              case 0:
                unreadNotifies.value.push(notify);
                break;
              case 1:
                readNotifies.value.push(notify);
                break;
              case 2:
                recycletifies.value.push(notify);
                break;
            }
          });
        }
      });
    }

    requestNotifies();

    return {
      unreadNotifies,
      readNotifies,
      recycletifies,
      requestNotifies,
    }
  },
});
</script>

<style scoped>

</style>
