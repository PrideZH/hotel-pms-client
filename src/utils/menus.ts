import { dynamicRoutes } from '../router';
import store from '../store';

import { RouteRecordRaw } from 'vue-router';

export interface Menu {
  title: string,
  titleI18n?: string,
  path: string,
  icon: string,
  children?: Menu[],
}

export const loadMenus = (roles: any) => {
  const menus: Menu[] = [];
  const auth: string[] = [];
  roles.forEach((role: any) => {
    role.menus.forEach((menu: any) => {
      auth.push(menu.code);
    });
  });
  loadMenusByAuth(dynamicRoutes, menus, auth);
  store.dispatch('authFn', auth);
  store.dispatch('menuFn', menus);
}

// export const loadMenus = (): Menu[] => {
//   const menus: Menu[] = [];
//   axios({
//     method: 'post',
//     url: '/v1/auth/me',
//   }).then((res: any) => {
//     const auth: string[] = [];
//     res.data.roles.forEach((role: any) => {
//       role.menus.forEach((menu: any) => {
//         auth.push(menu.code);
//       });
//     });
//     store.dispatch('authFn', auth);
//     loadMenusByAuth(dynamicRoutes, menus, auth);
//   });
//   return menus;
// }

/**
 * 根据有户权限将动态路由转为菜单数据
 * @param routes 动态路由
 * @param menus 菜单设计
 * @param auth 用户权限
 */
const loadMenusByAuth = (routes: RouteRecordRaw[], menus: Menu[], auth: string[]): Boolean => {
  let flag: Boolean = false;
  routes.forEach(route => {
    // 获取权限编号
    const code: string = route.meta?.code as string;
    let menu: Menu = {
      title: '',
      path: '',
      icon: '',
      children: [],
    };
    // 不为子页面进行递归处理
    if (!code && route.children && route.children.length) {
      const children: Menu[] = [];
      if (loadMenusByAuth(route.children, children, auth)) {
        flag = true;
        if (route.meta?.title) {
          menu.children = children;
          menu.title = route.meta?.title as string;
          menu.titleI18n = route.meta?.titleI18n as string;
          menu.path = route.path;
          menu.icon = route.meta?.icon as string;
          menus.push(menu);
        } else {
          for (let i = 0; i < children.length; i++) {
            menus.push(children[i]);
          }
        }
      }
    } else if (auth.indexOf(code) !== -1) {
      console.log(route.meta?.title, code);
      flag = true;
      menu.title = route.meta?.title as string;
      menu.titleI18n = route.meta?.titleI18n as string;
      menu.path = route.path;
      menu.icon = route.meta?.icon as string;
      menus.push(menu);
    }
  })
  return flag;
}
