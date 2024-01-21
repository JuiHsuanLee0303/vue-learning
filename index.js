import { createApp } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";

const app = createApp({
      data() {
            return {
                  assignment: {
                        week1: {
                              title: "第一週任務",
                              badge: "從函式拆解認識設計模式",
                              imgUrl: "./public/week1.png",
                              url:"./week1/index.html",
                        },
                        week2: {
                              title: "第二週任務",
                              badge: "RESTful API串接",
                              imgUrl: "./public/week2.png",
                              url:"./week2/login.html",
                        },
                        week3: {
                              title: "第三週任務",
                              badge: "熟練 Vue.js",
                              imgUrl: "./public/week2.png",
                              url:"./week3/login.html",
                        },
                        week4: {
                              title: "第四週任務",
                              badge: "元件化",
                              imgUrl: "./public/week2.png",
                              url:"./week4/login.html",
                        }
                  },
            };
      },
});
app.mount("#app");
