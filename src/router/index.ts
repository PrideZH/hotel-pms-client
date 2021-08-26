import axios from '../utils/axios';
import store from '../store';
import {
  createRouter,
  createWebHistory,
  RouteRecordRaw,
} from 'vue-router';
import i18n from '../i18n';

import Layout from '../layout/index.vue';

/**
 * @description 路由列表
 * @param meta.title 页面标题
 */
const constantRoutes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue'),
  },
  {
    path: '/:catchAll(.*)',
    name: '404',
    component: () => import('../views/error/404.vue'),
  },
  {
    path: '/error',
    component: Layout,
    children: [
      {
        path: '/error/401',
        component: () => import('../views/error/401.vue'),
      },
    ],
  },
  {
    path: '/',
    redirect: '/home',
  }
];

export const dynamicRoutes: Array<RouteRecordRaw> = [
  {
    path: '/home',
    component: Layout,
    redirect: '/home/dashboard',
    meta: {
      title: '首页',
      titleI18n: 'menu.home',
      icon: 'el-icon-s-home',
      requireAuth: true,
    },
    children: [
      {
        path: '/home/dashboard',
        component: () => import('../views/home/dashboard/index.vue'),
        meta: {
          code: 'DASHBOARD',
          title: '首页',
          titleI18n: 'menu.home',
        },
      },
      {
        path: '/home/systeminfo',
        component: () => import('../views/home/SystemInfo/index.vue'),
        meta: {
          code: 'SYSTEM_INFO',
          title: '系统信息',
          titleI18n: 'menu.systemInfo',
        },
      }
    ],
  }, {
    path: '/manage',
    component: Layout,
    redirect: '/manage/user',
    meta: {
      title: '后台管理',
      icon: 'el-icon-date',
      requireAuth: true,
    },
    children: [
      {
        path: '/manage/user',
        component: () => import('../views/manage/UserList.vue'),
        meta: {
          code: 'MANAGE_USER',
          title: '用户管理',
        },
      },
      {
        path: '/manage/role',
        component: () => import('../views/manage/RoleList/index.vue'),
        meta: {
          code: 'MANAGE_ROLE',
          title: '权限管理',
        },
      }, {
        path: '/manage/room',
        component: () => import('../views/manage/RoomList/index.vue'),
        meta: {
          code: 'MANAGE_ROOM',
          title: '房间管理',
        },
      }, {
        path: '/manage/roomtype',
        component: () => import('../views/manage/RoomTypeList/index.vue'),
        meta: {
          code: 'MANAGE_ROOMTYPE',
          title: '房型管理',
        },
      }, {
        path: '/manage/customer',
        component: () => import('../views/manage/CustomerList/index.vue'),
        meta: {
          code: 'MANAGE_CUSTOMER',
          title: '顾客管理',
        },
      },
    ],
  }, {
    path: '/person',
    component: Layout,
    redirect: '/person/setting',
    meta: {
      title: '个人中心',
      icon: 'el-icon-user',
      requireAuth: true,
    },
    children: [
      {
        path: '/person/setting',
        component: () => import('../views/person/Setting.vue'),
        meta: {
          code: 'PERSON_SETTING',
          title: '我的资料',
        },
      }, {
        path: '/person/account',
        component: () => import('../views/person/Account.vue'),
        meta: {
          code: 'PERSON_ACCOUNT',
          title: '账号安全',
        },
      }
    ],
  }, {
    path: '/room',
    component: Layout,
    redirect: '/room/list',
    meta: {
      title: '住房管理',
      icon: 'el-icon-house',
      requireAuth: true,
    },
    children: [
      {
        path: '/room/list',
        component: () => import('../views/room/RoomList/index.vue'),
        meta: {
          code: 'ROOM_LIST',
          title: '客房列表',
        }
      },
      {
        path: '/room/checkin',
        component: () => import('../views/room/CheckIn/index.vue'),
        meta: {
          code: 'ROOM_CHECKIN',
          title: '登记列表',
        },
      },
    ],
  }, {
    path: '/statistics',
    component: Layout,
    redirect: '/statistics/message',
    meta: {
      title: '报表系统',
      icon: 'el-icon-pie-chart',
      requireAuth: true,
    },
    children: [
      {
        path: '/statistics/message',
        component: () => import('../views/statistics/message/index.vue'),
        meta: {
          code: 'ASSETS_MESSAGE',
          title: '营业额',
        }
      },
      {
        path: '/statistics/account',
        component: () => import('../views/statistics/account/index.vue'),
        meta: {
          code: 'ASSETS_ACCOUNT',
          title: '流水账',
        }
      },
    ],
  }, {
    path: '/chat',
    component: Layout,
    redirect: '/chat/notification',
    meta: {
      title: '通信系统',
      icon: 'el-icon-message',
      requireAuth: true,
    },
    children: [
      {
        path: '/chat/notification',
        component: () => import('../views/chat/notification/index.vue'),
        meta: {
          code: 'CHAT_NOTIFICATION',
          title: '系统通知',
        }
      },
      {
        path: '/chat/sendnotify',
        component: () => import('../views/chat/sendnotify/index.vue'),
        meta: {
          code: 'CHAT_SENDNOTIFY',
          title: '发布通知',
        }
      },
      {
        path: '/chat/message',
        component: () => import('../views/chat/message/index.vue'),
        meta: {
          code: 'CHAT_MESSAGE',
          title: '邮件信息',
        }
      },
      {
        path: '/chat/sendmail',
        component: () => import('../views/chat/sendmail/index.vue'),
        meta: {
          code: 'CHAT_SENDMAIL',
          title: '发送邮件',
        }
      },
    ],
  }, {
    path: '/system',
    component: Layout,
    redirect: '/system/theme',
    meta: {
      title: '系统设置',
      icon: 'el-icon-setting',
      requireAuth: true,
    },
    children: [
      {
        path: '/system/theme',
        component: () => import('../views/system/theme/index.vue'),
        meta: {
          code: 'SYSTEM_THEME',
          title: '主题设置',
        }
      },
      {
        path: '/system/custom',
        component: () => import('../views/system/custom/index.vue'),
        meta: {
          code: 'SYSTEM_CUSTOM',
          title: '自定义',
        }
      },
    ],
  },
];

const routes: Array<RouteRecordRaw> = constantRoutes.concat(dynamicRoutes);

const router = createRouter({
  history: createWebHistory("/"),
  routes,
});

router.beforeEach((to, _from, next) => {
  console.log('跳转 =>' + to.meta.title);
  // 是否需要权限认证
  if (to.matched.some(m => m.meta.requireAuth)) {
    // 登录验证
    axios.post('/v1/auth/getUserOfLogin')
    .then((res: any) => {
      if (res.code == 2000) {
        next({path: '/login'});
      } else {
        // 权限验证
        if (store.getters.auth.indexOf(to.meta.code) !== -1) {
          next();
        } else {
          console.log('无权访问 => ' + to.meta.code);
          console.log('可访问 => ' + store.getters.auth);
          next('/error/401');
        }
      }
    }).catch(err => {
      next({path: '/login'});
    })
  } else {
    next();
  }
});

export default router;
