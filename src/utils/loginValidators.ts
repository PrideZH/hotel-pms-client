import { ref } from "vue";

interface User {
  email: string;
  password: string;
}

export const loginUser = ref<User>({
  email: "",
  password: "",
});

interface Rules {
  email: ({
    required: boolean;
    message: string;
    trigger: string;
  } | {
    type: string;
    message: string;
    trigger: string[];
  })[];
  password: ({
    required: boolean;
    message: string;
    trigger: string;
    min?: undefined;
    max?: undefined;
  } | {
    min: number;
    max: number;
    message: string;
    trigger: string;
    required?: undefined;
  })[];
}

// 校验规则
export const rules = ref<Rules>({
  email: [
    {
      required: true,
      message: '邮箱不能为空...',
      trigger: 'blur',
    },
    {
      type: "email",
      message: "邮箱格式错误...",
      trigger: [ 'blur', 'change' ],
    },
  ],
  password: [
    {
      required: true,
      message: "密码不能为空...",
      trigger: "blur",
    },
    {
      min: 6,
      max: 30,
      message: "密码的长度必须为6到30个字符...",
      trigger: "blur",
    },
  ],
});
