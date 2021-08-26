<template>
  <el-form
    ref="registerForm"
    :model="state.registerUser"
    :rules="registerRules"
    label-width="100px"
    class="registerForm sign-up-form"
  >
    <el-form-item label="邮箱" prop="email">
      <el-input
        v-model="state.registerUser.email"
        placeholder="输入邮箱..."
      ></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input
        v-model="state.registerUser.password"
        type="password"
        placeholder="输入密码..."
      ></el-input>
    </el-form-item>
    <el-form-item label="确认密码" prop="password2">
      <el-input
        v-model="state.registerUser.password2"
        type="password"
        placeholder="输入密码..."
      ></el-input>
    </el-form-item>

    <el-form-item>
      <el-button
        @click="handleRegister"
        type="primary"
        class="submit-btn"
        >注册</el-button
      >
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
  import { defineComponent, reactive, ref } from "vue";
  import { useRouter } from 'vue-router';
  import axios from '../../utils/axios'

  export default defineComponent({
    props: {
      registerUser: {
        type: Object,
        required: true,
      },
      registerRules: {
        type: Object,
        required: true,
      },
    },
    setup(props) {
      const router = useRouter();

      const registerForm = ref();

      const state = reactive({
        registerUser: props.registerUser,
      });

      // 注册
      const handleRegister = () => {
        registerForm.value.validate((valid: boolean) => {
          if (valid) {
            axios({
                method: 'post',
                url: '/v1/auth/register',
                data: {
                  email: state.registerUser.email,
                  pwd: state.registerUser.password,
                }
            }).then((res: any) => {
              switch(res.code){
                case 200:
                  alert("注册成功！");
                  router.go(0);
                  break;
              }
            });
          }
        })
      };

      return {
        state,
        registerForm,
        handleRegister,
      };
    },
  });
</script>
