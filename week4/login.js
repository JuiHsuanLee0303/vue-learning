import { createApp } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";

const app = createApp({
      data() {
            return {
                  user: {
                        username: "",
                        password: "",
                  },
                  url: "https://vue3-course-api.hexschool.io",
                  showHTML: "",
                  errUserHTML: `<div class="alert alert-danger" role="alert">帳號錯誤，請重新輸入</div>`,
                  errPwdHTML: `<div class="alert alert-danger" role="alert">密碼錯誤，請重新輸入</div>`,
            };
      },
      methods: {
            login() {

                  axios.post(`${this.url}/v2/admin/signin`, this.user)
                        .then((res) => {
                              this.showHTML = "";
                              const { token, expired } = res.data;
                              document.cookie = `hexToken=${token}; expires=${new Date(
                                    expired
                              )}`;
                              window.location.assign("./product.html");
                        })
                        .catch((err) => {
                              console.log(err);
                              if (
                                    err.data.error.code ===
                                    "auth/user-not-found"
                              ) {
                                    this.showHTML = this.errUserHTML;
                              } else if (
                                    err.data.error.code ===
                                    "auth/wrong-password"
                              ) {
                                    this.showHTML = this.errPwdHTML;
                              }
                        });
            },
            checkLogin() {
                  const token = document.cookie.replace(
                        /(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/,
                        "$1"
                  );
                  axios.defaults.headers.common["Authorization"] = token;

                  axios.post(`${this.url}/api/user/check`)
                        .then((res) => {
                              window.location.assign("./product.html");
                        })
                        .catch((err) => {
                              console.log(err);
                        });
            },
      },
      mounted() {
            // this.checkLogin();
      },
});
app.mount("#app");
