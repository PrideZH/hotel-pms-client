<template>
  <div class="container">
    <el-link
      type="primary"
      :underline="false"
      icon="el-icon-edit"
      @click.prevent="handleOperate(scope.row)">
      修改
    </el-link>
    <!-- 编辑房间对话框 -->
    <el-dialog title="编辑" v-model="dialogOperateVisible">
      <el-form :model="form.operate">
        <el-form-item label="备注">
           <el-input v-model="form.operate.orderNote" />
        </el-form-item>
        <el-form-item label="订单状态">
          <el-select v-model="form.operate.payStatus">
            <el-option
              v-for="item in [{
                value: 0, label: '待付款',
              }, {
                value: 1, label: '已付款',
              }, {
                value: 2, label: '已退款',
              }]"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogOperateVisible = false">取 消</el-button>
          <el-button type="primary" @click="handelConfirm">修 改</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from 'vue';

import { ElMessage } from 'element-plus'

import axios from '../../../utils/axios';

import { Order } from './index.vue';

export default defineComponent({
  props: {
    scope: {
      type: Object,
      riquest: true,
    },
  },
  emits: ['requestTableData'],
  setup(_, { emit }) {
    // 编辑房间
    const dialogOperateVisible = ref(false);

    const form = reactive<{
      operate: Order | null,
    }>({
      operate: null,
    });

    const handleOperate = (row: Order) => {
      form.operate = { ...row };
      dialogOperateVisible.value = true;
    }

    const handelConfirm = () => {
      axios({
          method: 'post',
          url: '/v1/order/update',
          data: {
            param: JSON.stringify(form.operate),
          }
      }).then((res: any) => {
        if (res.code === 200) {
          emit('requestTableData');
          ElMessage.success('修改成功');
        }
      });
      dialogOperateVisible.value = false;
    }

    return {
      dialogOperateVisible,
      form,
      handleOperate,
      handelConfirm,
    }
  },
});
</script>

<style scoped>

</style>
