import * as userApi from "@/api/user.js";
export default {
  state: {
    token: null,
  },
  mutations: {
    getToken(state, token) {
      state.token = token;
      sessionStorage.setItem("token", token);
    },
    setToken() {},
  },
  actions: {
    login() {
      userApi
        .login({})
        .then((result) => {
            console.log(result)
        })
        .catch((err) => {});
    },
  },
  modules: {},
};
