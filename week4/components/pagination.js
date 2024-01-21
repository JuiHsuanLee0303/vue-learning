export default {
  data() {
    return {
      nowPage: 1,
    };
  },
  props: ["pagesList"],
  methods: {
    changePage(num) {
      // this.nowPage = page;
      this.nowPage = num;
      this.$emit("changePage", num);
    },
  },
  template: `
  <nav aria-label="Page navigation example">
    <ul class="pagination justify-content-center">
        <li class="page-item">
            <a class="page-link" href="#" aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
            </a>
        </li>
        <li class="page-item" v-for="num in pagesList"><button class="page-link" @click="changePage(num)">{{num}}</button></li>
        <li class="page-item">
            <a class="page-link" href="#" aria-label="Next">
            <span aria-hidden="true">&raquo;</span>
            </a>
        </li>
    </ul>
  </nav>`,
};
