import { createApp } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";

const url = "https://vue3-course-api.hexschool.io/v2";
const path = "warren-lee";

const app = createApp({
  data() {
    return {
      productData: {},
      inputData: {
        imgUrl: "",
        title: "",
        category: "",
        unit: "",
        origin_price: null,
        price: null,
        description: "",
        content: "",
        is_enabled: false,
      },
      showImgUrl: "",
      addRes: "",
      delId: "",
      is_edit: [],
      editProduct: {},
      tableClass: [],
    };
  },
  methods: {
    checkLogin() {
      const token = document.cookie.replace(
        /(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/,
        "$1"
      );
      axios.defaults.headers.common["Authorization"] = token;

      axios
        .post(`${url}/api/user/check`)
        .then((res) => {
          console.log(`Authorization: ${res.data.success}`);
        })
        .catch((err) => {
          console.log(err);
          window.location.assign("./login.html");
        });
    },
    getData() {
      axios
        .get(`${url}/api/${path}/admin/products/all`)
        .then((res) => {
          // console.log(res.data);
          this.productData = { ...res.data.products };
          const entries = Object.entries(this.productData);
          entries.forEach((entry) => {
            this.is_edit.push([entry[0], false]);
            !entry[1].is_enabled
              ? this.tableClass.push([entry[0], "table-danger"])
              : this.tableClass.push([entry[0], ""]);
          });
          console.log(this.tableClass);
        })
        .catch((error) => {
          console.log(error.data);
        });
    },
    addImgUrl() {
      this.showImgUrl = this.inputData.imgUrl;
    },
    delImgUrl() {
      this.showImgUrl = "";
      this.inputData.imgUrl = "";
    },
    addData() {
      axios
        .post(`${url}/api/${path}/admin/product`, { data: this.inputData })
        .then((res) => {
          console.log(res.data);
          this.getData();
          this.addRes = "新增成功";
          this.inputData = {};
          this.showImgUrl = "";
        })
        .catch((err) => {
          console.log(err.data);
          this.addRes = "新增失敗";
        });
    },
    addDelId(id) {
      this.delId = id;
    },
    delProduct() {
      axios
        .delete(`${url}/api/${path}/admin/product/${this.delId}`, this.delId)
        .then((res) => {
          console.log(res.data);
          this.getData();
        })
        .catch((err) => {
          console.log(err.data);
        });
    },
    startEdit(id) {
      if (this.is_edit[id]) {
        axios
          .put(`${url}/api/${path}/admin/product/${id}`, {
            data: this.editProduct,
          })
          .then((res) => {
            console.log(res.data);
            this.getData();
          })
          .catch((err) => {
            console.log(err.data);
          });
        this.is_edit[id] = false;
        this.editProduct = {};
      } else {
        this.is_edit[id] = true;
        this.editProduct = { ...this.productData[id] };
      }
      console.log(this.editProduct);
    },
  },
  mounted() {
    this.checkLogin();
    this.getData();
  },
  watch: {
    //     input(newValue) {
    //       if (!this.tempData.imgUrl) {
    //         this.showImgUrl = newValue.imgUrl;
    //       }
    //       console.log(this.showImgUrl);
    //     },
  },
});
app.mount("#app");
