import { createApp } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";

const app = createApp({
      data() {
            return {
                  portfolioHTML: `<div class="container">
            <div class="my-6">
                  <h3 class="h4 text-center mb-3">每週任務</h3>
            </div>
            <div class="row g-4">
                  <div class="col-md-6 col-lg-4">
                        <div class="card text-center">
                              <div class="position-relative" style="height: 312px;">
                                    <img src="./public/week1.png" alt="week1" class="pointer card-img-top border" style="height: 312px ;">
                                    <span class="badge rounded-pill bg-primary position-absolute start-3 top-3">從函式拆解認識設計模式</span>
                              </div>
                              <div class="card-body">
                                    <a href="./week1/index.html" class="link-secondary unline">第一週任務</a>
                              </div>
                        </div>
                  </div>
            
                  <div class="col-md-6 col-lg-4">
                        <div class="card text-center">
                              <div class="position-relative" style="height: 312px;">
                                    <img src="./public/week2.png" alt="week2" class="pointer card-img-top border" style="height: 312px ;">
                                    <span class="badge rounded-pill bg-primary position-absolute start-3 top-3">RESTful API串接</span>
            
                              </div>
                              <div class="card-body">
                                    <a href="./week2/login.html" class="link-secondary unline">第二週任務</a>
                              </div>
                        </div>
                  </div>
                  <div class="col-md-6 col-lg-4">
                  <div class="card text-center">
                        <div class="position-relative" style="height: 312px;">
                              <img src="./public/week2.png" alt="week2" class="pointer card-img-top border" style="height: 312px ;">
                              <span class="badge rounded-pill bg-primary position-absolute start-3 top-3">熟練 Vue.js</span>
      
                        </div>
                        <div class="card-body">
                              <a href="./week3/login.html" class="link-secondary unline">第三週任務</a>
                        </div>
                  </div>
            </div>
                </div>
      </div>`,
                  noteHTML: `<iframe src="https://hackmd.io/@HQGmhgdNRFiHFoE-iYpnbA/SJmlr-TzT" frameborder="0" height="100%" width="100%"></iframe>`,
                  showHTML: "",
            };
      },
      mounted() {
            this.showHTML = this.portfolioHTML;
      },
});
app.mount("#app");
