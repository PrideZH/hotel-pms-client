<template>
  <div class="container">
    <Header @requestTableData="requestTableData" />
    <!-- 表格 -->
    <el-table :data="customers" max-height="540px" style="width: 100%">
      <el-table-column prop="name" label="姓名" align="center" />
      <el-table-column prop="mobile" label="电话" align="center" />
      <el-table-column prop="age" label="年龄" width="80" align="center" />
      <el-table-column prop="gender" label="身份" align="center">
        <template #default="scope">
          <el-tag :type="genderFilters[scope.row.gender].type">{{ genderFilters[scope.row.gender].text }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="idCard" label="身份证号" align="center" />
      <el-table-column prop="level" label="身份" align="center" :filters="filters" :filter-method="filterTag">
        <template #default="scope">
          <el-tag :type="filters[scope.row.level].type">{{ filters[scope.row.level].text }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200" align="center">
        <template #default="scope">
          <Control :scope="scope" @requestTableData="requestTableData" />
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
      @current-change="handlePageChange"
      @size-change="handlePageChange"
      background>
    </el-pagination>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from 'vue';

import Header from './Header.vue';
import Control from './Control.vue';

import axios from '../../../utils/axios';

export interface Customer {
  cid: number,
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
    const customers = ref<Customer[]>([]);

    // 条件
    const condition = reactive<{
      // 分页
      currentPage: number,
      pageSize: number,
      total: number,
    }>({
      currentPage: 1,
      pageSize: 10,
      total: 0,
    })

    const requestTableData = () => {
      axios({
        method: 'get',
        url: '/v1/customer/list',
        params: {
          page: condition.currentPage,
          limit: condition.pageSize,
        },
      }).then((res: any) => {
        if (res.code === 200) {
          customers.value = res.data.list;
          condition.total = res.data.total;
        }
      });
    };

    requestTableData();

    const handlePageChange = () => {
      requestTableData();
    };

    // 性别标签
    const genderFilters = ref([{
      value: 0,
      text: '女',
      type: 'warning',
    }, {
      value: 1,
      text: '男',
      type: '',
    }, {
      value: 2,
      text: '其他',
      type: 'info',
    }]);

    // 身份状态标签
    const filters = ref([{
      value: 0,
      text: '黑名单',
      type: 'info',
    }, {
      value: 1,
      text: '顾客',
      type: '',
    }, {
      value: 2,
      text: '会员',
      type: 'warning',
    }]);

    const filterTag = (value: string, row: any) => {
      return row.level == value;
    }

    return {
      condition,
      customers,
      genderFilters,
      filters,
      requestTableData,
      handlePageChange,
      filterTag,
    }
  }
});
</script>

<style scoped>

</style>
