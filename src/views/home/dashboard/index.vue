<template>
  <div class="container">
    <el-space class="card-container" :size="20" fill wrap :fillRatio="30">
      <el-card class="card-1-1">
        <el-space>
          <BlobAvatar :portrait="store.state.user.portrait" :name="store.state.user.name" />
          {{ store.state.user.name }}
          <el-tag v-for="role in store.state.user.roles" :key="role.id">
            {{ role.nameZh }}
          </el-tag>
        </el-space>
        <el-divider/>
        <el-descriptions>
          <el-descriptions-item :label="$t('home.lastLoginTime')">2021-9-05</el-descriptions-item>
          <el-descriptions-item :label="$t('home.lastLoginPlace')">北京</el-descriptions-item>
        </el-descriptions>
      </el-card>
      <CardInfo class="card-info"
        :title="$t('home.toDayOrder')" :value="statistical.todayOrder"
        :bottomTitle="$t('home.totalOrder')" :bottomValue="statistical.totalOrder" />
      <CardInfo class="card-info"
        title="今日访客" :value="statistical.todayCustomer"
        bottomTitle="总访客量" :bottomValue="statistical.totalCustomer" />
      <Todo />
    </el-space>
  </div>
</template>

<script lang="ts">
  import { defineComponent, getCurrentInstance, ref, reactive } from "vue";

  import { useStore } from 'vuex'

  import Todo from './Todo.vue';
  import BlobAvatar from '@/components/BlobAvatar.vue';
  import CardInfo from '@/components/CardInfo.vue';

  export default defineComponent({
    name: "Dashboard",
    components: {
      Todo,
      BlobAvatar,
      CardInfo,
    },
    setup() {
      const instance = getCurrentInstance();
      const axios = instance?.appContext.config.globalProperties.$axios;

      const store = useStore();

      const checked = ref(false);

      const statistical = reactive<{
        todayOrder: string,
        totalOrder: string,
        todayCustomer: string,
        totalCustomer: string,
      }>({
        todayOrder: '',
        totalOrder: '',
        todayCustomer: '',
        totalCustomer: '',
      });

      axios({
        method: 'get',
        url: '/v1/statistical/',
      }).then((res: any) => {
        if (res.code === 200) {
          statistical.todayOrder = toThousands(res.data.todayOrder);
          statistical.totalOrder = toThousands(res.data.totalOrder);
          statistical.todayCustomer = toThousands(res.data.todayCustomer);
          statistical.totalCustomer = toThousands(res.data.totalCustomer);
        }
      });

      /** 格式化数字 2333 => '2,333' */
      const toThousands = (num: number): string => {
        let numStr: string = (num || 0).toString(), result: string = '';
        while (numStr.length > 3) {
          result = ',' + numStr.slice(-3) + result;
          numStr = numStr.slice(0, numStr.length - 3);
        }
        if (numStr) {
          result = numStr + result;
        }
        return result;
      }

      return {
        statistical,
        store,
        checked,
      }
    },
  });
</script>

<style scoped>
.card-container, .card-info {
  width: 100%;
}

.card-1-1, .card-1-2 {
  height: 160px;
}

</style>
