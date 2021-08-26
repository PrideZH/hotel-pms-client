const user = {
  state: {
    id: 0,
    email: '',
    pwd: '',
    name: '',
    mob: '',
    portrait: '',
    roles: [],
    auth: [], // 用户菜单权限 user, admin
    perms: [], // 用户操作权限 user:list, user:add
    menus: [],
  },
  mutations: {
    setMenus(state: any, value: any) {
      state.menus = value;
    },
    setAuth(state: any, value: any) {
      state.auth = value;
    },
    setUserInfo(state: any, value: any) {
      state.id = value.id;
      state.email = value.email;
      state.pwd = value.pwd
      state.name = value.name;
      state.mob = value.mob;
      state.roles = value.roles;
      state.portrait = value.portrait;
    },
  },
  actions: {
    menuFn(store: any, data: any) {
      store.commit('setMenus', data);
    },
    authFn(store: any, data: any) {
      store.commit('setAuth', data);
    },
  },
  getters: {
    menus: (state: any) => state.menus,
    auth: (state: any) => state.auth,
  }
}

export default user
