import { createApp } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";

const url = "https://vue3-course-api.hexschool.io/v2";
const path = "warren-lee";

function checkLogin() {
      const token = document.cookie.replace(
            /(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/,
            "$1"
      );
      axios.defaults.headers.common["Authorization"] = token;

      axios.post(`${url}/api/user/check`)
            .then((res) => {
                  console.log(res);
            })
            .catch((err) => {
                  console.log(err);
                  window.location.assign("./login.html");
            });
}

const app = createApp({
      data() {
            return {
                  temp: [],
                  // 產品資料格式
                  products: [],
            };
      },
      mounted() {
            checkLogin();

            axios.get(`${url}/api/warren-lee/admin/products/all`)
                  .then((res) => {
                        console.log(res);
                        this.products = res.data.products;
                        console.log(Object.keys(this.products).length);
                  })
                  .catch((err) => {
                        console.log(err);
                  });
      },
});
app.mount("#app");
