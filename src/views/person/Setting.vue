<template>
  <div class="container">
    <el-row :gutter="32">
      <el-col :span="6">
        <el-card class="person-info-card">
          <AvatarUpload :portrait="portrait" @uploadAvatar="uploadAvatar" />
          <el-descriptions :column="1">
            <el-descriptions-item>
              <template #label>
                <i class="el-icon-user"></i>
              </template>
              PrideZH
            </el-descriptions-item>
            <el-descriptions-item>
              <template #label>
                <i class="el-icon-postcard"></i>
              </template>
              <el-tag size="small">系统管理员</el-tag>
            </el-descriptions-item>
            <el-descriptions-item>
              <template #label>
                <i class="el-icon-magic-stick"></i>
              </template>
              2000/6/1
            </el-descriptions-item>
            <el-descriptions-item>
              <template #label>
                <i class="el-icon-female"></i>
              </template>
              男
            </el-descriptions-item>
            <el-descriptions-item>
              <template #label>
                <i class="el-icon-location-outline"></i>
              </template>
              中国·广东省·汕头市
            </el-descriptions-item>
            <el-descriptions-item>
              <template #label>
                <i class="el-icon-chat-line-round"></i>
              </template>
              C、C++、Java、C#、Python、HTML、CSS、JavaScript、TypeScript、Node、Vue
            </el-descriptions-item>
            <el-descriptions-item>
              <template #label>
                <i class="el-icon-price-tag"></i>
              </template>
              <el-space>
                <el-tag size="small" type="success">超高级算法工程师</el-tag>
                <el-tag size="small" type="success">精通C++</el-tag>
                <el-tag size="small" type="success">天才</el-tag>
              </el-space>
            </el-descriptions-item>
          </el-descriptions>
        </el-card>
      </el-col>
      <el-col :span="18">
        <el-card>
          <el-form :model="editForm">
            <el-form-item label="姓名" prop="name">
              <el-input v-model="editForm.name" />
            </el-form-item>
            <el-form-item label="性别" prop="gender">
              <el-select placeholder="请选择" v-model="editForm.gender">
                <el-option label="男" value="1"></el-option>
                <el-option label="女" value="0"></el-option>
                <el-option label="其他" value="2"></el-option>
                <el-option label="保密" value="4"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="简介">
              <el-input type="textarea" v-model="editForm.brief"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary">保存</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance, reactive, ref } from 'vue';

import { useStore } from 'vuex'

import AvatarUpload from '@/components/AvatarUpload.vue';
import { ElMessage } from 'element-plus'

export default defineComponent({
  name: "Setting",
  components: {
    AvatarUpload,
  },
  setup() {
    const instance = getCurrentInstance();
    const axios = instance?.appContext.config.globalProperties.$axios;

    const store = useStore();

    const portrait = ref(store.state.user.portrait);

    const editForm = reactive({
      name: '',
      gender: '',
      brief: '',
    })

    const uploadAvatar = (blob: Blob) => {
      let user = {
        id: store.state.user.id,
        portrait: blob,
      }
      axios({
        method: 'post',
        url: '/v1/auth/portrait/update',
        data: {
          param: JSON.stringify(user),
        }
      }).then((res: any) => {
        if (res.code === 200) {
          ElMessage.success('修改成功');
          store.state.user.portrait = String(blob);
        }
      });
    };


    const beforeAvatarUpload = (file: any) => {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {

      }
      if (!isLt2M) {
        ElMessage.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    }

    return {
      editForm,
      store,
      portrait,
      beforeAvatarUpload,
      uploadAvatar,
    }
  }
});
</script>

<style scoped>
.avatar-uploader  {
  border: 1px dashed #ddd;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader:hover {
  border-color: #409EFF;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar-uploader {
  width: 178px;
  height: 178px;
  display: block;
}

.card-container {
  width: 100%;
}
</style>
