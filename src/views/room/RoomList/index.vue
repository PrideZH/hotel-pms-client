<template>
  <div class="container">
    <Header :condition="condition" @setInDate="setInDate" @setDays="setDays" />
    <!-- 表格 -->
    <el-table :data="rooms" max-height="540px" style="width: 100%">
      <el-table-column prop="roomType.name" label="类型" align="center" />
      <el-table-column prop="roomNo" label="编号" align="center" />
      <el-table-column prop="roomType.number" label="可住人数" align="center" />
      <el-table-column prop="roomType.area" label="面积" align="center" />
      <el-table-column prop="roomType.rent" label="价格" align="center" sortable />
      <el-table-column prop="note" label="备注" align="center" />
      <el-table-column label="操作" align="center">
        <template #default="scope">
          <Control :scope="scope" :condition="condition" @requestTableData="requestTableData" />
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      layout="total, sizes, prev, pager, next"
      :page-sizes="[10, 20, 30, 40]"
      :current-page="condition.currentPage"
      :page-size="condition.pageSize"
      :total="condition.total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      background>
    </el-pagination>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from 'vue';

import Header from './Header.vue';
import Control from './Control.vue';

import axios from '../../../utils/axios';

interface RoomType {
  rtid: number,
  name: string,
  number: number,
  area: number,
  rent: number,
}

export interface Room {
  rid: number,
  roomNo: string,
  status: number,
  note: string,
  roomType: RoomType,
}

export interface Customer {
  name: string,
  age: number,
  gender: number,
  idCard: string,
  mobile: string,
  level?: number,
}

export default defineComponent({
  name: "RoomList",
  components: {
    Header,
    Control,
  },
  setup() {
    // 表格信息
    const rooms = ref<Room[]>([]);

    const formatterNote = (row: any, column: any) =>  {
      return row.note ? row.note : '无';
    }

    // 条件
    const condition = reactive<{
      // 入住时间
      inDate: Date,
      days: number,
      // 分页
      currentPage: number,
      pageSize: number,
      total: number,
    }>({
      inDate: new Date(),
      days: 1,
      currentPage: 1,
      pageSize: 10,
      total: 0,
    })

    const requestTableData = () => {
      axios({
        method: 'get',
        url: '/v1/room/list',
        params: {
          page: condition.currentPage,
          limit: condition.pageSize,
          status: 0, // 只查看空闲房间
          inDate: condition.inDate,
          days: condition.days,
        }
      }).then((res: any) => {
        if (res.code === 200) {
          rooms.value = res.data.list;
          condition.total = Number(res.data.total);
        }
      });
    }

    requestTableData();

    // emit
    const handleSizeChange = (val: number) => {
      condition.pageSize = val;
      requestTableData();
    };

    const handleCurrentChange = (val: number) => {
      condition.currentPage = val;
      requestTableData();
    }

    const setInDate = (inDate: Date) => {
      condition.inDate = inDate;
      requestTableData();
    }

    const setDays = (days: number) => {
      condition.days = days;
      requestTableData();
    }

    return {
      rooms,
      condition,
      requestTableData,
      formatterNote,
      handleSizeChange,
      handleCurrentChange,
      setInDate,
      setDays,
    }
  },
});
</script>

<style scoped>
.control {
  text-align: center;
}
</style>
