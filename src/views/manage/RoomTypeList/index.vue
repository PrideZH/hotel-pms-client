<template>
  <div class="container">
    <Header @requestTableData="requestTableData" />
    <!-- 表格 -->
    <el-table :data="roomTypes" style="width: 100%">
      <el-table-column prop="name" label="名称" align="center" />
      <el-table-column prop="number" label="可住人数" align="center" />
      <el-table-column prop="area" label="面积" align="center" />
      <el-table-column prop="rent" label="租金" align="center" />
      <el-table-column label="操作" width="200" align="center">
        <template #default="scope">
          <Control :scope="scope" @requestTableData="requestTableData" />
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from 'vue';

import Header from './Header.vue';
import Control from './Control.vue';

import axios from '../../../utils/axios';

export interface RoomType {
  rtid: number,
  name: string,
  number: number,
  area: number,
  rent: number,
}

export default defineComponent({
  name: "RoomTypeList",
  components: {
    Header,
    Control,
  },
  setup() {
    const roomTypes = ref<RoomType[]>([]);

    const requestTableData = () => {
      axios({
        method: 'get',
        url: '/v1/roomType/list',
      }).then((res: any) => {
        if (res.code === 200) {
          roomTypes.value = res.data;
        }
      });
    };

    requestTableData();

    const handlePageChange = () => {
      requestTableData();
    };

    return {
      roomTypes,
      requestTableData,
      handlePageChange,
    }
  }
});
</script>

<style scoped>
.edit-input {
  width: 256px;
}
</style>
