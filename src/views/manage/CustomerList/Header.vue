<template>
  <el-button type="success" @click="dialogAddVisible = true">添加顾客</el-button>
  <el-dialog title="添加" v-model="dialogAddVisible">
    <el-form :model="form.addForm">
      <el-form-item label="名称" label-width="120px" required>
        <el-input v-model="form.addForm.name" />
      </el-form-item>
      <el-form-item label="年龄" label-width="120px" required>
        <el-input-number v-model="form.addForm.age" :min="0" />
      </el-form-item>
      <el-form-item label="性别" label-width="120px" required>
        <el-select v-model="form.addForm.gender">
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
        <el-input v-model="form.addForm.idCard" />
      </el-form-item>
      <el-form-item label="电话" label-width="120px" required>
        <el-input v-model="form.addForm.mobile" />
      </el-form-item>
      <el-form-item label="身份" label-width="120px" required>
        <el-select v-model="form.addForm.level">
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

import { Customer } from "./index.vue";

export default defineComponent({
  emits: ['requestTableData'],
  setup(_, { emit }) {
    const form = reactive<{
      addForm: Customer,
    }>({
      addForm: {
        cid: 0,
        name: '',
        age: 0,
        gender: 1,
        idCard: '',
        mobile: '',
        level: 1,
      },
    });

    const dialogAddVisible = ref(false);

    const handelConfirm = () => {
      axios({
        method: 'post',
        url: '/v1/customer/over',
        data: {
          name: form.addForm.name,
          age: form.addForm.age,
          gender: form.addForm.gender,
          idCard: form.addForm.idCard,
          mobile: form.addForm.mobile,
          level: form.addForm.level,
        }
      }).then((res: any) => {
        if (res.code === 200) {
          emit('requestTableData');
          ElMessage.success({
            message: '添加成功',
            type: 'success'
          });
        }
      });
      form.addForm = {
        cid: 0,
        name: '',
        age: 0,
        gender: 1,
        idCard: '',
        mobile: '',
        level: 1,
      };
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
