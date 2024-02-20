// import { createApp } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";

// import productModal from "./components/product-modal.js";

const { defineRule, Form, Field, ErrorMessage, configure } = VeeValidate;
const { required, email, min, max } = VeeValidateRules;
const { localize, loadLocaleFromURL } = VeeValidateI18n;

const url = "https://vue3-course-api.hexschool.io/v2";
const path = "warren-lee";

let productModalNew = "";

const app = Vue.createApp({
  data() {
    return {
      productData: {},
      product: {},
      cart: {},
      qty: 0,
      form: {
        user : {
            name: "",
            email: "",
            tel: "",
            address: "",
        },
        message: "",
      }
    };
  },
  methods: {
    getProducts() {
      axios
        .get(`${url}/api/${path}/products/all`)
        .then((res) => {
          this.productData = res.data.products;
        })
        .catch((error) => {
          console.log(error.data);
        });
    },
    getCart() {
      axios
        .get(`${url}/api/${path}/cart`)
        .then((res) => {
          console.log(res.data.data);
          this.cart = res.data.data;
          console.log(this.cart.carts);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    openDetailed(id) {
      console.log(id);
      axios
        .get(`${url}/api/${path}/product/${id}`)
        .then((res) => {
          //   console.log(res.data);
          this.product = res.data.product;
          this.product.isDiscount
            ? this.product.origin_price == this.product.price
            : this.product.origin_price != this.product.price;
          //   console.log(this.product);
          productModalNew.show();
        })
        .catch((error) => {
          console.log(error.data);
        });
    },
    addToCart(id, qty) {
      const cart = {
        product_id: id,
        qty,
      };
      axios.post(`${url}/api/${path}/cart`, { data: cart }).then((res) => {
        alert(res.data.message);
        productModalNew.hide();
        this.getCart();
      });
    },
    deleteCartProduct(id) {
        axios.delete(`${url}/api/${path}/cart/${id}`).then((res) => {
          alert(res.data.message);
          this.getCart();
        });
    },
    sendOrder() {
        const order = this.form;
        axios.post(`${url}/api/${path}/order`, { data: order }).then((res) => {
          alert(res.data.message);
          this.$refs.form.resetForm();
        //   this.getCart();
        });
    }
  },
  mounted() {
    this.getProducts();
    this.getCart();
    productModalNew = new bootstrap.Modal(this.$refs.productModal);
  },
  //   components: {
  //     productModal,
  //   }
});

app.component("VForm", VeeValidate.Form);
app.component("VField", VeeValidate.Field);
app.component("ErrorMessage", VeeValidate.ErrorMessage);

Object.keys(VeeValidateRules).forEach((rule) => {
  if (rule !== "default") {
    defineRule(rule, VeeValidateRules[rule]);
  }
});

loadLocaleFromURL(
  "https://unpkg.com/@vee-validate/i18n@4.12.4/dist/locale/zh_TW.json"
);

configure({
  generateMessage: VeeValidateI18n.localize("zh_TW"),
  validateOnInput: true,
});

app.mount("#app");
