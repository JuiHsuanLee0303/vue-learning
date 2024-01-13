import { createApp } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";

const url = "https://vue3-course-api.hexschool.io/v2";
const path = "warren-lee";

const app = createApp({
      data() {
            return {
                  productData: {},
                  tempData: {},
                  input: {
                        inputImgUrl: "",
                        inputTitle: "",
                        inputCategory: "",
                        inputUnit: "",
                        inputOriginPrice: 0,
                        inputPrice: 0,
                        inputDescription: "",
                        inputContent: "",
                        inputIsEnabled: false,
                  },
                  showImgUrl: "",
            };
      },
      methods: {
            checkLogin() {
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
            },
            addImgUrl() {
                  this.tempData.imgUrl = this.showImgUrl;
                  //this.input.inputImgUrl = "";
                  console.log(this.tempData);
            },
            delImgUrl() {
                  this.tempData.imgUrl = "";
                  this.showImgUrl = "";
            },
            addData() {
                  /*const newData = {
                        title: this.inputTitle,
                        category: this.inputCategory,
                        origin_price: this.inputOriginPrice,
                        price: this.inputPrice,
                        unit: this.inputUnit,
                        description: this.inputDescription,
                        content: this.inputContent,
                        is_enabled: this.inputIsEnabled,
                        imgUrl: this.inputImgUrl,
                  };
                  console.log(newData);*/
                  axios.post(`${url}/api/${path}/admin/product`, this.input)
                        .then((res) => {
                              console.log(res);
                        })
                        .catch((err) => {
                              console.log(err);
                        });
            },
      },
      mounted() {
            this.checkLogin();
            axios.get(`${url}/api/${path}/admin/products/all`)
                  .then((res) => {
                        console.log(res.data);
                        this.productData = { ...res.data.products };
                  })
                  .catch((error) => {
                        console.log(error.response.data);
                  });
      },
      watch: {
            inputImgUrl(newValue) {
                  if (!this.tempData.imgUrl) {
                        this.showImgUrl = newValue;
                  }
                  console.log(this.showImgUrl);
            },
      },
});
app.mount("#app");
