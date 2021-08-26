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
    <!-- 编辑房间对话框 -->
    <el-dialog title="编辑" v-model="dialogEditVisible">
      <el-form :model="editForm">
        <el-form-item label="编号" required>
          <el-input v-model="editForm.roomNo" />
        </el-form-item>
        <el-form-item label="备注">
           <el-input v-model="editForm.note" />
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

import { Room } from './index.vue';

export default defineComponent({
  props: {
    scope: {
      type: Object,
      riquest: true,
    },
  },
  emits: ['requestTableData'],
  setup(_, { emit }) {
    // 删除房间
    const handleDelete = (row: Room) => {
      axios({
        method: 'delete',
        url: '/v1/room/' + row.rid,
      }).then((res: any) => {
        if (res.code === 200) {
          emit('requestTableData');
          ElMessage.success('删除成功');
        }
      });
    }

    // 编辑房间
    const dialogEditVisible = ref(false);

    const editForm = reactive<Room>({
      rid: 0,
      roomNo: '',
      status: 0,
      note: '',
      roomType: {
        rtid: 0,
        name: '',
        number: 0,
        area: 0,
        rent: 0,
      },
    });

    const handleEdit = (row: Room) => {
      editForm.rid = row.rid;
      editForm.roomNo = row.roomNo;
      editForm.status = row.status;
      editForm.note = row.note;
      editForm.roomType = row.roomType;
      dialogEditVisible.value = true;
    }

    const handelConfirm = () => {
      axios({
          method: 'post',
          url: '/v1/room/update',
          data: {
            param: JSON.stringify(editForm),
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
      dialogEditVisible,
      editForm,
      handleDelete,
      handleEdit,
      handelConfirm,
    }
  },
});
</script>

<style scoped>

</style>
