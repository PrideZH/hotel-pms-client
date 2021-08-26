<template>
  <div class="container">
    <el-card>
      <el-tabs>
        <el-tab-pane label="修改密码">
          <el-steps :active="pwdActive" finish-status="success">
            <el-step title="验证身份" />
            <el-step title="设置密码" />
            <el-step title="改密成功" />
          </el-steps>
          <el-tabs v-model="pwdName">
            <el-tab-pane name="0">
              <el-form class="pwd-form">
                <el-form-item>
                  <el-input placeholder="332****@qq.com" :disabled="true" />
                </el-form-item>
                <el-form-item>
                  <el-space>
                    <el-input />
                    <el-button>获取验证码</el-button>
                  </el-space>
                </el-form-item>
                <el-button class="width-full" type="primary" @click="pwdNext">下一步</el-button>
              </el-form>
            </el-tab-pane>
            <el-tab-pane name="1">
              <el-form ref="pwdFormRef" class="pwd-form" :model="pwdEditFrom" label-width="80px">
                <el-form-item prop="old" label="旧密码" required>
                  <el-input v-model="pwdEditFrom.old"></el-input>
                </el-form-item>
                <el-form-item prop="pwd1" label="新密码" required>
                  <el-input v-model="pwdEditFrom.pwd1"></el-input>
                </el-form-item>
                <el-form-item prop="pwd2" label="确认" required>
                  <el-input v-model="pwdEditFrom.pwd2"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button class="width-full" type="primary" @click="handleEditPwd">修改密码</el-button>
                </el-form-item>
              </el-form>
            </el-tab-pane>
            <el-tab-pane name="2">
              <el-result icon="success" title="密码修改成功" subTitle="将返回登录页重新登录">
                <template #extra>
                  <el-button type="primary" size="medium" @click="handlePwdConfirm">确定</el-button>
                </template>
              </el-result>
            </el-tab-pane>
          </el-tabs>
        </el-tab-pane>
        <el-tab-pane label="修改邮箱">


        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance, reactive, ref, toRefs } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

import { ElMessage } from 'element-plus';

import md5 from 'js-md5';

export default defineComponent({
  name: "Account",
  setup() {
    const instance = getCurrentInstance();
    const axios = instance?.appContext.config.globalProperties.$axios;

    const store = useStore();
    const router = useRouter();

    const pwdFormRef = ref();

    const pwdActive = ref(0);
    const pwdName = ref('0');

    const form = reactive({
      pwdEditFrom: {
        old: '',
        pwd1: '',
        pwd2: '',
      }
    })

    const pwdNext = () => {
      if (pwdActive.value++ > 2) pwdActive.value = 0;
      pwdName.value = String(pwdActive.value);
    }

    const handleEditPwd = () => {
      pwdFormRef.value.validate((valid: boolean) => {
        if (valid == false) {
          return;
        }
        if (store.state.user.pwd !== md5(form.pwdEditFrom.old)) {
          ElMessage.error('密码错误');
          return;
        }
        if (form.pwdEditFrom.pwd1 !== form.pwdEditFrom.pwd2) {
          ElMessage.error('密码不同');
          return;
        }
        if (form.pwdEditFrom.pwd1.length < 6 || form.pwdEditFrom.pwd1.length > 30) {
          ElMessage.error('密码必须6到30位');
          return;
        }
        axios({
          method: 'post',
          url: '/v1/auth/pwd/update',
          data: {
            uid: store.state.user.id,
            pwd: form.pwdEditFrom.pwd1,
          }
        }).then((res: any) => {
          if (res.code === 200) {
            ElMessage.success('修改成功');
            pwdNext();
          }
        });
      });
    }

    const handlePwdConfirm = () => {
      localStorage.removeItem("token");
      router.push("/login");
    }

    return {
      pwdFormRef,
      ...toRefs(form),
      pwdActive,
      pwdName,
      pwdNext,
      handleEditPwd,
      handlePwdConfirm,
    }
  },
});
</script>

<style scoped>
.pwd-form {
  width: 360px;
  margin: 0 auto;
}
.width-full {
  width: 100%;
}
</style>
