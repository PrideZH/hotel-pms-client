<template>
  <el-form ref="formRef" :model="form.notifyForm">
    <el-form-item label="主题" prop="title" required>
      <el-input v-model="form.notifyForm.title"  />
    </el-form-item>
    <el-form-item label="正文" prop="content" required>
      <el-input type="textarea"  v-model="form.notifyForm.content" :rows="8"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button class="submit-btn" type="primary" @click="handleSubmit">发 布</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance, ref, reactive } from 'vue';
import { useStore } from 'vuex';

import { Notify } from '../notification/index.vue'
import { ElMessage } from 'element-plus'

export default defineComponent({
  setup() {
    const instance = getCurrentInstance();
    const axios = instance?.appContext.config.globalProperties.$axios;

    const store = useStore();

    const formRef = ref();

    const form = reactive<{
      notifyForm: Notify,
    }>({
      notifyForm: {
        senderId: store.state.user.id,
        title: '',
        content: '',
      }
    });

    const handleSubmit = () => {
      formRef.value.validate((valid: boolean) => {
        if (valid === false) {
          ElMessage.error("请输入内容");
          return false;
        }
        axios({
          method: 'post',
          url: '/v1/notify/',
          data: {
            ...form.notifyForm,
          }
        }).then((res: any) => {
          if (res.code === 200) {
            ElMessage.success('发布成功');
          }
        });
        form.notifyForm.title = '';
        form.notifyForm.content = '';
      });
    }

    return {
      form,
      formRef,
      handleSubmit,
    }
  },
});
</script>

<style scoped>
.submit-btn {
  float: right;
}
</style>
