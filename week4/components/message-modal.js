export default {
  data() {
    return {};
  },
  methods: {
    messageConfirm() {
      this.$emit('messageConfirm');
    }
  },
  props: ['responseMessage', 'messageModalClass','messageBtnClass'],
  template: `
  <div
    id="messageModal"
    ref="messageModal"
    class="modal fade"
    aria-labelledby="messageModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content border-0">
        <div :class="messageModalClass">
          <h5 id="messageProductModalLabel" class="modal-title">
            <span>通知</span>
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          {{responseMessage}}
        </div>
        <div class="modal-footer">
          <button
            type="button"
            :class="messageBtnClass"
            data-bs-dismiss="modal"
            @click="messageConfirm"
          >
            確認
          </button>
        </div>
      </div>
    </div>
  </div>`,
};
