<template>
  <el-button type="success" @click="dialogAddVisible = true">添加房间</el-button>
  <el-dialog title="编辑" v-model="dialogAddVisible">
    <el-form :model="form.addForm">
      <el-form-item label="编号" label-width="120px" required>
        <el-input v-model="form.addForm.roomNo" placeholder="输入编号，多个以','分割" />
      </el-form-item>
      <el-form-item label="房间类型" label-width="120px" required>
        <el-select v-model="form.addForm.roomType.rtid">
          <el-option
            v-for="roomType in roomTypeOption"
            :key="roomType.rtid"
            :label="roomType.name"
            :value="roomType.rtid" />
        </el-select>
      </el-form-item>
      <el-form-item label="状态" label-width="120px" required>
        <el-select v-model="form.addForm.status">
          <el-option label="空闲" :value="0"></el-option>
          <el-option label="使用" :value="1"></el-option>
          <el-option label="清理" :value="2"></el-option>
          <el-option label="维修" :value="3"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="备注" label-width="120px" required>
        <el-input type="textarea" v-model="form.addForm.note" :min="0" />
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

import { Room } from './index.vue';
import { RoomType } from '../RoomTypeList/index.vue';

export default defineComponent({
  emits: ['requestTableData'],
  setup(_, { emit }) {
    const form = reactive<{
      addForm: Room,
    }>({
      addForm: {
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
        }
      }
    });

    const dialogAddVisible = ref(false);

    const handelConfirm = () => {
      axios({
          method: 'post',
          url: '/v1/room/',
          data: {
            param: JSON.stringify(form.addForm),
          }
      }).then((res: any) => {
        if (res.code === 200) {
          emit('requestTableData');
          ElMessage.success('添加成功');
        }
      });
      form.addForm = {
        rid: 0,
        roomNo: '',
        status: 0,
        note: '',
        roomType: {
          rtid: roomTypeOption.value[0].rtid,
          name: '',
          number: 0,
          area: 0,
          rent: 0,
        }
      }
      dialogAddVisible.value = false;
    }

    const roomTypeOption = ref<RoomType[]>([]);

    axios({
      method: 'get',
      url: '/v1/roomType/list',
    }).then((res: any) => {
      if (res.code === 200) {
        roomTypeOption.value = res.data;
        form.addForm.roomType.rtid = roomTypeOption.value[0].rtid;
      }
    });

    return {
      form,
      dialogAddVisible,
      roomTypeOption,
      handelConfirm,
    }
  },
});
</script>

<style scoped>

</style>
