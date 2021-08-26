<template>
  <el-form
    ref="loginForm"
    :model="state.loginUser"
    :rules="rules"
    label-width="100px"
    class="loginForm sign-in-form"
  >
    <el-form-item label="邮箱" prop="email">
      <el-autocomplete
        v-model="state.loginUser.email"
        :fetch-suggestions="querySearch"
        placeholder="输入邮箱..."
        @keyup.enter="handleLogin"
        style="width: 100%" />
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input v-model="state.loginUser.password" type="password" placeholder="输入密码..." @keyup.enter="handleLogin" />
    </el-form-item>

    <el-form-item>
      <el-button class="submit-btn" @click="handleLogin" type="primary">提交</el-button>
    </el-form-item>

    <!-- 找回密码 -->
    <div class="tiparea">
      <p>忘记密码？ <a @click.prevent="handleForgot">立即找回</a></p>
    </div>
  </el-form>
</template>

<script lang="ts">
  import { defineComponent, reactive, ref } from "vue";

  import { useStore } from 'vuex'
  import { useRouter } from 'vue-router';

  import axios from '../../utils/axios';
  import { loadMenus } from '../../utils/menus'

  export default defineComponent({
    props: {
      loginUser: {
        type: Object,
        required: true,
      },
      rules: {
        type: Object,
        required: true,
      },
    },
    setup(props) {
      const store = useStore();
      const router = useRouter();

      const loginForm = ref();

      const state = reactive({
        loginUser: props.loginUser,
      });

      // 登录
      const handleLogin = () => {
        loginForm.value.validate((valid: boolean) => {
          if (valid) {
            axios({
                method: 'post',
                url: '/v1/auth/login',
                data: {
                  email: state.loginUser.email,
                  pwd: state.loginUser.password,
                }
            }).then((res: any) => {
              switch(res.code){
                case 200:
                  console.log("登录 => " + res.data);
                  localStorage.setItem('token', res.data);
                  // 获取菜单权限数据
                  axios({
                    method: 'post',
                    url: '/v1/auth/me',
                  }).then((res: any) => {
                    // 保存用户信息
                    store.commit('setUserInfo', res.data);
                    // 加载菜单数据
                    loadMenus(res.data.roles);
                    localStorage.setItem('state', JSON.stringify(store.state))
                    // 跳转到主页面
                    router.push("/");
                  });
                  break;
              }
            });
          }
        })
      };

      const restaurants: {value: string}[] = [{
        value: '332842890@qq.com',
      }, {
        value: '123456@qq.com',
      }];

      const querySearch = (queryString: string, cb: any) => {

        let results: {value: string}[] = queryString
          ? restaurants.filter((restaurant) =>
            restaurant.value.indexOf(queryString) === 0
          )
          : restaurants;
        cb(results);
      };

      return {
        state,
        loginForm,
        handleLogin,
        querySearch,
      };
    },
  });
</script>

<style lang="scss" scoped>
  .loginForm {
    margin-top: 20px;
    background-color: #fff;
    padding: 20px 40px 20px 20px;
    border-radius: 5px;
    box-shadow: 0px 5px 10px #cccc;
  }
  .submit-btn {
    width: 100%;
  }
  .tiparea {
    text-align: right;
    font-size: 12px;
    color: #333;
  }
  .tiparea p a {
    color: #409eff;
  }
</style>
