import { createApp } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";

const url = "https://vue3-course-api.hexschool.io/v2";
const path = "warren-lee";

const app = createApp({
  data() {
    return {
      productData: [],
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
      is_edit: "",
      editProduct: {},
      ascending: false,
      sortBy: "price",
    };
  },
  methods: {
    test() {
      console.log(`${this.sortBy}`);
    },
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
          this.productData = Object.entries(res.data.products);
          //console.log(this.productData);
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
      if (this.is_edit === id) {
        axios
          .put(`${url}/api/${path}/admin/product/${id}`, {
            data: this.editProduct[1],
          })
          .then((res) => {
            console.log(res.data);
            this.getData();
          })
          .catch((err) => {
            console.log(this.editProduct[1]);
            console.log(err.data);
          });
        this.is_edit = "";
        this.editProduct = [];
      } else if (this.is_edit === "") {
        this.is_edit = id;
        this.editProduct = this.productData.find(
          (item, index, array) => item[1].id === id
        );
      } else {
        axios
          .put(`${url}/api/${path}/admin/product/${this.is_edit}`, {
            data: this.editProduct[1],
          })
          .then((res) => {
            console.log(res.data);
            this.getData();
          })
          .catch((err) => {
            console.log(this.editProduct[1]);
            console.log(err.data);
          });
        this.is_edit = id;
        this.editProduct = this.productData.find(
          (item, index, array) => item[1].id === id
        );
      }
      console.log(this.is_edit);
    },
  },
  mounted() {
    this.checkLogin();
    this.getData();
  },
  computed: {
    sortProducts() {
      console.log(this.sortBy);
      return this.productData.sort((a, b) =>
        this.ascending
          ? a[1][this.sortBy] - b[1][this.sortBy]
          : b[1][this.sortBy] - a[1][this.sortBy]
      );
    },
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
