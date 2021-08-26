<template>
  <div class="container">
    <el-space v-if="scope.row.rid !== 1">
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
    <!-- 编辑对话框 -->
    <el-dialog title="编辑" v-model="dialogEditVisible">
      <el-form :model="form.editForm">
        <el-form-item label="名称" label-width="120px" required>
          <el-input v-model="form.editForm.nameZh" />
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

import { Role, Menu } from './index.vue';

export default defineComponent({
  props: {
    scope: {
      type: Object,
      riquest: true,
    },
    MenuOption: {
      type: Object,
      riquest: true,
    }
  },
  emits: ['requestTableData'],
  setup(_, { emit }) {
    const handleDelete = (row: Role) => {
      axios({
        method: 'delete',
        url: '/v1/role/' + row.rid,
      }).then((res: any) => {
        if (res.code === 200) {
          emit('requestTableData');
          ElMessage.success('删除成功');
        }
      });
    }

    const dialogEditVisible = ref(false);

    const form = reactive<{
      editForm: Role,
      menuValues: number[],
    }>({
      editForm: {
        rid: 0,
        nameZh: '',
        menus: [],
      },
      menuValues: [],
    });

    const handleEdit = (row: Role) => {
      form.editForm = { ...row };
      form.menuValues = [];
      form.editForm.menus.forEach((menu: Menu) => {
        form.menuValues.push(menu.id);
      })
      dialogEditVisible.value = true;
    }

    const handelConfirm = () => {
      form.editForm.menus = [];
      form.menuValues.forEach((id: number) => {
        form.editForm.menus.push({
          id,
          code: '',
          desc: '',
        })
      })
      axios({
        method: 'post',
        url: '/v1/role/menu/update/',
        data: {
          param: JSON.stringify(form.editForm),
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
      form,
      handleDelete,
      handleEdit,
      handelConfirm,
    }
  },
});
</script>

<style scoped>

</style>
