import { createApp } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";
import messageModal from "./components/message-modal.js";
import deleteProductModal from "./components/delete-product-modal.js";
import productModal from "./components/product-modal.js";
import pagination from "./components/pagination.js";

const url = "https://vue3-course-api.hexschool.io/v2";
const path = "warren-lee";

let productModalNew = "";
let addProductModalNew = "";
let editProductModalNew = "";
let messageModalNew = "";
let deleteProductModalNew = "";


const app = createApp({
  data() {
    return {
      productData: [],
      inputProduct: {},
      delId: "",
      // ascending: false,
      // sortBy: "",
      nowEditProductID: "",
      nowEditProduct: {},
      responseMessage: "",
      messageModalClass: {
        'modal-header': true, 
        'bg-primary': false,
        'bg-danger': false,
        'text-white': true,
      },
      messageBtnClass: {
        'btn': true,
        'btn-primary': false,
        'btn-danger': false,
      },
      showProductsNumber: 10,
      showProductsList: [],
      pagesList: [],
      mode: "",
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
      this.pagesList = [];
      axios
        .get(`${url}/api/${path}/admin/products/all`)
        .then((res) => {
          this.productData = Object.entries(res.data.products);
          for (let i = 0; i <= this.productData.length / this.showProductsNumber; i++) {
            this.pagesList.push(i+1);
          }
          this.changePage(1);
        })
        .catch((error) => {
          console.log(error.data);
        });
    },
    addProduct(product) {
      axios
        .post(`${url}/api/${path}/admin/product`, { data: product })
        .then((res) => {
          this.responseMessage = "新增產品成功",
          this.messageModalClass['bg-primary'] = true;
          this.messageModalClass['bg-danger'] = false;
          this.messageBtnClass['btn-primary'] = true;
          this.messageBtnClass['btn-danger'] = false;
          messageModalNew.show();
          this.getData();
        })
        .catch((err) => {
          this.responseMessage = "新增產品失敗",
          this.messageModalClass['bg-danger'] = true;
          this.messageModalClass['bg-primary'] = false;
          this.messageBtnClass['btn-primary'] = false;
          this.messageBtnClass['btn-danger'] = true;
          messageModalNew.show();
        });
    },
    delProduct() {
      axios
        .delete(`${url}/api/${path}/admin/product/${this.delId}`, this.delId)
        .then((res) => {
          this.getData();
        })
        .catch((err) => {
          console.log(err.data);
        });
    },
    startAdd() {
      this.mode = "新增";
      this.inputProduct = {};
      console.log(addProductModalNew);
      productModalNew.show();
    },
    startEdit(id) {
      this.mode = "編輯";
      this.nowEditProductID = id;
      const tempProduct = this.productData.find(
        (item, index, array) => item[1].id === id
      );
      this.inputProduct = JSON.parse(JSON.stringify(tempProduct[1]));
      productModalNew.show();
    },
    editProduct(product) {
      axios
        .put(`${url}/api/${path}/admin/product/${this.nowEditProductID}`, {
          data: product,
        })
        .then((res) => {
          this.responseMessage = "編輯產品成功",
          this.messageModalClass['bg-primary'] = true;
          this.messageModalClass['bg-danger'] = false;
          this.messageBtnClass['btn-primary'] = true;
          this.messageBtnClass['btn-danger'] = false;
          messageModalNew.show();
          this.getData();
        })
        .catch((err) => {
          this.responseMessage = "編輯產品失敗",
          this.messageModalClass['bg-danger'] = true;
          this.messageModalClass['bg-primary'] = false;
          this.messageBtnClass['btn-primary'] = false;
          this.messageBtnClass['btn-danger'] = true;
          messageModalNew.show();
          console.log(err.data);
        });
    },
    messageConfirm() {
      console.log(productModalNew);
      if(this.responseMessage.slice(-2) === "成功") {
        productModalNew.hide();
      }
    },
    changePage(num) {
      this.showProductsList = [];
      for (let i = (num - 1) * 10; i < num * 10 && i < this.productData.length; i++) {
        this.showProductsList.push(this.productData[i]);
      }
    },
    outputProduct(product) {
      if (this.mode === "新增") {
        this.addProduct(product);
      } else if (this.mode === "編輯") {
        this.editProduct(product);
      }
    },
  },
  mounted() {
    this.checkLogin();
    this.getData();
    productModalNew = new bootstrap.Modal(document.getElementById('productModal'));
    messageModalNew = new bootstrap.Modal(document.getElementById('messageModal'));
  },
  components: {
    messageModal,
    deleteProductModal,
    productModal,
    pagination,
  },
});
app.mount("#app");
