<template>
  <el-button type="success" @click="dialogAddVisible = true">新增房型</el-button>
  <el-dialog title="编辑" v-model="dialogAddVisible">
    <el-form :model="addForm">
      <el-form-item label="名称" label-width="120px" required>
        <el-input v-model="form.addForm.name" />
      </el-form-item>
      <el-form-item label="可住人数" label-width="120px" required>
        <el-input-number v-model="form.addForm.number" :min="0" />
      </el-form-item>
      <el-form-item label="面积" label-width="120px" required>
        <el-input-number v-model="form.addForm.area" :min="0" />
      </el-form-item>
      <el-form-item label="价格" label-width="120px" required>
        <el-input-number v-model="form.addForm.rent" :precision="2" :step="0.1" :min="0" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogAddVisible = false">取 消</el-button>
        <el-button type="primary" @click="handelConfirm">确 定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from 'vue';

import { ElMessage } from 'element-plus'

import axios from '../../../utils/axios';
import { RoomType } from '../RoomList/index.vue';

export default defineComponent({
  emits: ['requestTableData'],
  setup(_, { emit }) {
    const form = reactive<{
      addForm: RoomType,
    }>({
      addForm: {
        rtid: 0,
        name: '',
        number: 0,
        area: 0,
        rent: 0,
      }
    });

    const dialogAddVisible = ref(false);

    const handelConfirm = () => {
      axios({
          method: 'post',
          url: '/v1/roomType/',
          data: {
            ...form.addForm,
          }
      }).then((res: any) => {
        if (res.code === 200) {
          emit('requestTableData');
          ElMessage.success('添加成功');
        }
      });
      form.addForm = {
        rtid: 0,
        name: '',
        number: 0,
        area: 0,
        rent: 0,
      }
      dialogAddVisible.value = false;
    }

    return {
      form,
      dialogAddVisible,
      handelConfirm,
    }
  },
});
</script>

<style scoped>

</style>
