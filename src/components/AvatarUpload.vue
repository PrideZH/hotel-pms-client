<template>
  <div class="avatar-upload">
    <el-image class="avatar" :src="portrait" fit="cover" />
    <input @change="handleFileChange" class="file-input" ref="file" type="file" accept="image/jpeg" />
    <div class="cover" @click="dialogFileVisible = true">更换头像</div>
    <el-dialog title="头像编辑" width="300px" v-model="dialogFileVisible">
      <el-image
      class="avatar-large"
      :src="newPortrait"
      fit="cover" />
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="handleSave">保存修改</el-button>
          <el-button type="primary" @click="handleFileClick">选择图片</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

import { ElMessage } from 'element-plus'

export default defineComponent({
  name: "AvatarUpload",
  props: {
    portrait: {
      type: String,
      require: true,
    },
  },
  emits: ['uploadAvatar'],
  setup(porps, { emit }) {
    const file = ref();

    let fileValue: any = null;

    const dialogFileVisible = ref(false);

    const portrait = ref('');
    const newPortrait = ref('');

    const setNewPortrait = (str: string | undefined) => {
      if (str && str.substr(0, 23) === 'data:image/jpeg;base64,') {
        newPortrait.value = str;
      } else {
        newPortrait.value = 'data:image/jpeg;base64,' + str;
      }
    }

    const setPortrait = () => {
      portrait.value = newPortrait.value;
    }

    setNewPortrait(porps.portrait);
    setPortrait();

    const handleFileClick = () => {
      file.value.click();
    };

    const handleFileChange = (e: any) => {
      const input = e.target;
      const files = e.target.files;
      let file = null;
      if(files && files[0]) {
          file = files[0];
          if (file.type !== 'image/jpeg') {
            ElMessage.error('上传头像图片只能是 JPG 格式!');
            return false;
          }
          if (file.size > 1024 * 50) {
            ElMessage.error('图片大小不能超过50KB!');
            input.value = '';
            return false;
          }

          var reader = new FileReader();
          reader.readAsDataURL(file);

          // 文件读取完成时触发
          reader.onload = function () {
            fileValue = reader.result;
            setNewPortrait(fileValue);
          }
      } else {
        ElMessage.error('图片读取失败');
      }
    }

    const handleSave = () => {
      if (fileValue == null) {
        ElMessage.warning('没有选择图片');
        dialogFileVisible.value = false;
        return;
      }
      setPortrait();
      emit('uploadAvatar', fileValue);
      dialogFileVisible.value = false;
    }

    return {
      portrait,
      newPortrait,
      file,
      dialogFileVisible,
      handleFileClick,
      handleFileChange,
      handleSave,
    };
  }
});
</script>

<style lang="scss" scoped>
$avatar-size: 128px;

.avatar-upload {
  position: relative;
  display: block;
  width: $avatar-size;
  height: $avatar-size;
}

.cover {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  display: none;
  background-color: rgba(0, 0, 0, 0.5);
  text-align: center;
  line-height: $avatar-size;
  color: #fff;
  cursor: pointer;
}

.avatar-upload:hover .cover {
  display: block;
}

.file-input {
  position: relative;
  display: none;
}

.avatar {
  width: 100%;
  height: 100%;
}

.avatar-large {
  width: 256px;
  height: 256px;
}
</style>
