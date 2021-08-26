<template>
  <div class="container">
    <el-table :data="orders" max-height="540px" style="width: 100%">
      <el-table-column type="expand">
        <template #default="props">
          <el-form label-position="left" inline class="table-expand">
            <el-row v-for="customer in props.row.customers" :key="customer.cid">
              <el-form-item label="姓名:">
                <span>{{ customer.name }}</span>
              </el-form-item>
              <el-form-item label="身份证:">
                <span>{{ customer.idCard }}</span>
              </el-form-item>
              <el-form-item label="手机:">
                <span>{{ customer.mobile }}</span>
              </el-form-item>
              <el-form-item label="性别:">
                <span>{{ customer.gender }}</span>
              </el-form-item>
              <el-form-item label="年龄:">
                <span>{{ customer.age }}</span>
              </el-form-item>
            </el-row>
            <el-form-item label="备注:">
              <span>{{ props.row.orderNote }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column prop="oid" label="订单编号" width="64" />
      <el-table-column prop="contactsName" label="联系人" width="80" />
      <el-table-column prop="contactsMobile" label="手机号" />
      <el-table-column prop="room.roomType.name" label="房型" />
      <el-table-column prop="room.roomNo" label="房间" width="64" />
      <el-table-column prop="inDate" label="入住时间" />
      <el-table-column prop="days" label="入住天数" width="80" />
      <el-table-column prop="totalAmount" label="订单金额" width="80" />
      <el-table-column
        prop="payStatus"
        label="结账状态"
        :filters="statusValue"
        :filter-method="filterTag"
        filter-placement="bottom-end">
        <template #default="scope">
          <el-tag
            :type="statusValue[scope.row.payStatus].type"
            disable-transitions>{{ statusValue[scope.row.payStatus].text }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" width="160px" >
        <template #default="scope"> {{ dateFormat(scope.row.createTime) }} </template>
      </el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <OrderControl :scope="scope" @requestTableData="requestTableData" />
        </template>
      </el-table-column>
    </el-table>
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

import OrderControl from './OrderControl.vue';

import axios from '../../../utils/axios';

import { Room } from '../RoomList/index.vue';

export interface Order {
  oid: number,
  contactsName: string,
  contactsMobile: string,
  inDate: Date,
  days: number,
  deposit: number,
  totalAmount: number,
  orderNote?: string,
  patmentTime?: string,
  payType?: number,
  payStatus: number,
  room: Room | null,
  createTime: Date,
  customers: {
    cid: number,
    name: string,
    age: number,
    gender: number,
    idCard: string,
    mobile: string,
    level?: number,
  }[],
};

export default defineComponent({
  name: "CheckIn",
  components: {
    OrderControl,
  },
  setup() {
    // 表格信息
    const orders = ref<Order[]>([]);

    const statusValue = ref<{
      value: string,
      text: string,
      type: string,
    }[]>([{
      value: '0',
      text: '待付款',
      type: 'info',
    }, {
      value: '1',
      text: '已付款',
      type: 'success',
    }, {
      value: '2',
      text: '已退款',
      type: 'warning',
    }, {
      value: '3',
      text: '欠账',
      type: 'danger',
    }, {
      value: '4',
      text: '部分退款',
      type: 'warning',
    }])

    const dateFormat = (dateStr: any) => {
      const date: Date = new Date(dateStr);
      var year = date.getFullYear();
      var month =('0' + date.getMonth()).slice(-2);
      var day = ('0' + date.getDate()).slice(-2);
      var hour = ('0' + date.getHours()).slice(-2);
      var minute = ('0' + date.getMinutes()).slice(-2);
      var second = ('0' + date.getSeconds()).slice(-2);
      return year + "-" + month  + "-" + day + " " + hour + ":" + minute + ":" + second;
    }

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
        url: '/v1/order/list',
        params: {
          page: condition.currentPage,
          limit: condition.pageSize,
        }
      }).then((res: any) => {
        if (res.code === 200) {
          orders.value = res.data.list;
          condition.total = Number(res.data.size);
        }
      });
    }

    requestTableData();

    const handlePageChange = () => {
      requestTableData();
    };

    // 表格订单状态标签
    const filterTag = (value: string, row: any) => {
      return row.payStatus == value;
    }

    return {
      orders,
      statusValue,
      condition,
      requestTableData,
      dateFormat,
      handlePageChange,
      filterTag,
    }
  }
});
</script>

<style scoped>
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}

.table-expand {
  font-size: 0;
}
.table-expand label {
  width: 90px;
  color: #99a9bf;
}
.table-expand .el-form-item {
  margin-right: 64px;
  margin-bottom: 0;
}
</style>
