<template>
  <el-button type="success" @click="dialogAddVisible = true">新增角色</el-button>
  <el-dialog title="编辑" v-model="dialogAddVisible">
    <el-form :model="form.addForm">
      <el-form-item label="名称" label-width="120px" required>
        <el-input v-model="form.addForm.nameZh" />
      </el-form-item>
        <el-form-item label="菜单" label-width="120px" required>
          <el-checkbox-group v-model="form.menuValues">
            <template v-for="menu in MenuOption" :key="menu.id">
              <el-checkbox :label="menu.id" :disabled="menu.code==='DASHBOARD'">{{ menu.desc }}</el-checkbox>
            </template>
          </el-checkbox-group>
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

import { Role, Menu } from './index.vue';

export default defineComponent({
  props: {
    MenuOption: {
      type: Object,
      riquest: true,
    }
  },
  emits: ['requestTableData'],
  setup(_, { emit }) {
    const form = reactive<{
      addForm: Role,
      menuValues: number[],
    }>({
      addForm: {
        rid: 0,
        nameZh: '',
        menus: [],
      },
      menuValues: [1],
    });

    const dialogAddVisible = ref(false);

    const handelConfirm = () => {
      form.menuValues.forEach((id: number) => {
        form.addForm.menus.push({
          id,
          code: '',
          desc: '',
        });
      });
      axios({
          method: 'post',
          url: '/v1/role/',
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
        nameZh: '',
        menus: [],
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
