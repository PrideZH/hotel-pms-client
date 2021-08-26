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
    <!-- 编辑房间类型对话框 -->
    <el-dialog title="编辑" v-model="dialogEditVisible">
      <el-form :model="form.editForm">
        <el-form-item label="名称" label-width="120px" required>
          <el-input v-model="form.editForm.name" />
        </el-form-item>
        <el-form-item label="可住人数" label-width="120px" required>
          <el-input-number v-model="form.editForm.number" :min="0" />
        </el-form-item>
        <el-form-item label="面积" label-width="120px" required>
          <el-input-number v-model="form.editForm.area" :min="0" />
        </el-form-item>
        <el-form-item label="价格" label-width="120px" required>
          <el-input-number v-model="form.editForm.rent" :precision="2" :step="0.1" :min="0" />
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

import { ElMessage } from 'element-plus'

import axios from '../../../utils/axios';

import { RoomType } from './index.vue';

export default defineComponent({
  props: {
    scope: {
      type: Object,
      required: true,
    }
  },
  emits: ['requestTableData'],
  setup(_, { emit }) {
    // 删除房间类型
    const handleDelete = (row: RoomType) => {
      axios({
        method: 'delete',
        url: '/v1/roomType/' + row.rtid,
      }).then((res: any) => {
        if (res.code === 200) {
          ElMessage.success('删除成功');
          emit('requestTableData');
        }
      });
    };

    // 编辑房间类型
    const dialogEditVisible = ref(false);

    const form = reactive<{
      editForm: RoomType | null,
    }>({
      editForm: null,
    });

    const handleEdit = (row: RoomType) => {
      form.editForm = { ...row };
      dialogEditVisible.value = true;
    }

    const handelConfirm = () => {
      if (form.editForm == null) {
        ElMessage.error('信息不存在');
        return;
      }
      axios({
          method: 'delete',
          url: '/v1/roomType/',
          data: {
            ...form.editForm,
          }
      }).then((res: any) => {
        if (res.code === 200) {
          emit('requestTableData');
          ElMessage.success('修改成功');
        }
      });
      dialogEditVisible.value = false;
    }

    return {
      form,
      dialogEditVisible,
      handleDelete,
      handleEdit,
      handelConfirm,
    }
  },
});
</script>

<style scoped>

</style>
