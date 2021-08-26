<template>
  <div class="container">
    <el-space>
      <el-link
        type="primary"
        :underline="false"
        icon="el-icon-edit"
        @click.prevent="handleEdit(scope.row)">
        修改
      </el-link>
      <el-popconfirm
        title="确定删除吗？"
        icon="el-icon-warning"
        iconColor="red"
        @confirm="handleDelete(scope.row)">
        <template #reference>
          <el-link type="danger" :underline="false" icon="el-icon-delete" @click.prevent="">删除</el-link>
        </template>
      </el-popconfirm>
    </el-space>
    <!-- 入住登记对话框 -->
    <el-dialog title="入住登记" v-model="dialogEditVisible">
      <el-form :model="form.editFrom">
        <el-form-item label="名称" label-width="120px" required>
          <el-input v-model="form.editFrom.name" />
        </el-form-item>
        <el-form-item label="年龄" label-width="120px" required>
          <el-input-number v-model="form.editFrom.age" :min="0" />
        </el-form-item>
        <el-form-item label="性别" label-width="120px" required>
          <el-select v-model="form.editFrom.gender">
            <el-option
              v-for="item in [{
                value: 0, label: '女',
              }, {
                value: 1, label: '男',
              }, {
                value: 2, label: '其他',
              }]"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="身份证号" label-width="120px" required>
          <el-input v-model="form.editFrom.idCard" />
        </el-form-item>
        <el-form-item label="电话" label-width="120px" required>
          <el-input v-model="form.editFrom.mobile" />
        </el-form-item>
        <el-form-item label="身份" label-width="120px" required>
          <el-select v-model="form.editFrom.level">
            <el-option
              v-for="item in [{
                value: 0, label: '黑名单',
              }, {
                value: 1, label: '顾客',
              }, {
                value: 2, label: '会员',
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
          <el-button @click="dialogEditVisible = false">取 消</el-button>
          <el-button type="primary" @click="handelConfirm">确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from 'vue';

import IconBtn from '../../../components/button/IconBtn.vue';
import { ElMessage } from 'element-plus'

import axios from '../../../utils/axios';

import { Customer } from './index.vue';

export default defineComponent({
  components: {
    IconBtn,
  },
  props: {
    scope: {
      type: Object,
      riquest: true,
    },
  },
  emits: ['requestTableData'],
  setup(props, { emit }) {
    const dialogEditVisible = ref(false);

    const form = reactive<{
      editFrom: Customer | null,
    }>({
      editFrom: null,
    });

    const handleEdit = (customer: Customer) => {
      form.editFrom = { ...customer };
      dialogEditVisible.value = true;
    }

    const handleDel = (customer: Customer) => {
      axios({
        method: 'delete',
        url: '/v1/customer/' + customer.cid,
      }).then((res: any) => {
        if (res.code === 200) {
          ElMessage.success('删除成功');
          emit('requestTableData');
        }
      });
    }

    const handelConfirm = () => {
      axios({
        method: 'post',
        url: '/v1/customer/update',
        data: {
          param: JSON.stringify(form.editFrom),
        }
      }).then((res: any) => {
        if (res.code === 200) {
          ElMessage.success('修改成功');
          emit('requestTableData')
        }
      });
      dialogEditVisible.value = false;
    }

    return {
      form,
      dialogEditVisible,
      handleEdit,
      handleDel,
      handelConfirm,
    };
  },
});
</script>

<style scoped>

</style>
