export default {
  data() {
    return {
      inputProduct: {},
      showImgUrl: "",
    };
  },
  methods: {
    addProduct() {
      this.$emit("addProduct", this.inputProduct);
      this.inputProduct = {};
    },
    delImgUrl() {
      this.inputProduct.imgUrl = "";
    },
    uploadImage() {
      const url = "https://vue3-course-api.hexschool.io/v2";
      const path = "warren-lee";
      const fileInput = document.getElementById("file");
      const file = fileInput.files[0];
      console.log(file);
      const formData = new FormData();
      formData.append("file-to-upload", file);
      axios.post(`${url}/api/${path}/admin/upload`, formData).then((res) => {
        console.log(res.data.imageUrl);
        this.inputProduct.imgUrl = res.data.imageUrl;
      }).catch((err) => {
        console.log(err);
      })
    },
  },
  template: `
    <div
    id="addProductModal"
    ref="addProductModal"
    class="modal fade"
    tabindex="-1"
    aria-labelledby="addProductModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-xl">
      <div class="modal-content border-0">
        <div class="modal-header bg-dark text-white">
          <h5 id="addProductModalLabel" class="modal-title">
            <span>新增產品</span>
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-sm-4">
              <div class="mb-2">
                <div class="input-group">
                  <input 
                    type="file" 
                    class="form-control" 
                    id="file"
                    name="file-to-upload" 
                    aria-describedby="inputGroupFileAddon04" 
                    aria-label="Upload"
                  >
                  <button 
                    class="btn btn-outline-primary" 
                    type="button" 
                    id="inputGroupFileAddon04"
                    @click="uploadImage"
                  >
                    上傳圖片
                  </button>
                </div>
                <img class="img-fluid" :src="inputProduct.imgUrl" alt="" />
              </div>
              <div>
              </div>
              <div v-if="inputProduct.imgUrl != undefined && inputProduct.imgUrl != ''">
                <button
                  class="btn btn-outline-danger btn-sm d-block w-100"
                  @click="delImgUrl"
                >
                  刪除圖片
                </button>
              </div>
            </div>
            <div class="col-sm-8">
              <div class="mb-3">
                <label for="title" class="form-label">標題（必填）</label>
                <input
                  id="title"
                  type="text"
                  class="form-control"
                  placeholder="請輸入標題"
                  required
                  v-model="inputProduct.title"
                />
              </div>

              <div class="row">
                <div class="mb-3 col-md-6">
                  <label for="category" class="form-label"
                    >分類（必填）</label
                  >
                  <input
                    id="category"
                    type="text"
                    class="form-control"
                    placeholder="請輸入分類"
                    v-model="inputProduct.category"
                  />
                </div>
                <div class="mb-3 col-md-6">
                  <label for="price" class="form-label">單位（必填）</label>
                  <input
                    id="unit"
                    type="text"
                    class="form-control"
                    placeholder="請輸入單位"
                    v-model="inputProduct.unit"
                  />
                </div>
              </div>

              <div class="row">
                <div class="mb-3 col-md-6">
                  <label for="origin_price" class="form-label"
                    >原價（必填）</label
                  >
                  <input
                    id="origin_price"
                    type="number"
                    min="0"
                    class="form-control"
                    placeholder="請輸入原價"
                    v-model.number="inputProduct.origin_price"
                  />
                </div>
                <div class="mb-3 col-md-6">
                  <label for="price" class="form-label">售價（必填）</label>
                  <input
                    id="price"
                    type="number"
                    min="0"
                    class="form-control"
                    placeholder="請輸入售價"
                    v-model.number="inputProduct.price"
                  />
                </div>
              </div>
              <hr />

              <div class="mb-3">
                <label for="description" class="form-label">產品描述</label>
                <textarea
                  id="description"
                  type="text"
                  class="form-control"
                  placeholder="請輸入產品描述"
                  v-model="inputProduct.description"
                >
                </textarea>
              </div>
              <div class="mb-3">
                <label for="content" class="form-label">說明內容</label>
                <textarea
                  id="description"
                  type="text"
                  class="form-control"
                  placeholder="請輸入說明內容"
                  v-model="inputProduct.content"
                >
                </textarea>
              </div>
              <div class="mb-3">
                <div class="form-check">
                  <input
                    id="is_enabled"
                    class="form-check-input"
                    type="checkbox"
                    :true-value="1"
                    :false-value="0"
                    v-model="inputProduct.is_enabled"
                  />
                  <label class="form-check-label" for="is_enabled"
                    >是否啟用</label
                  >
                </div>
                <div class="form-check">
                  <input
                    id="is_recommended"
                    class="form-check-input"
                    type="checkbox"
                    :true-value="1"
                    :false-value="0"
                    v-model="inputProduct.is_recommended"
                  />
                  <label class="form-check-label" for="is_recommended"
                    >是否推薦</label
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-outline-secondary"
            data-bs-dismiss="modal"
          >
            取消
          </button>
          <button
            type="button"
            class="btn btn-outline-primary"
            @click="addProduct"
          >
            確認
          </button>
        </div>
      </div>
    </div>
  </div>`,
};
