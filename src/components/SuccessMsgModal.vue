<template>
  <div>
    <a-modal
      :visible="successMsgVisible"
      :maskClosable="false"
      class="modal"
      @cancel="cancel"
    >
      <a-result status="success" :title="successTitle">
        <template #extra>
          <a-button key="console" type="primary" @click="cancel">
            确认
          </a-button>
        </template>
      </a-result>
    </a-modal>
  </div>
</template>

<script>
export default {
  props: {
    successMsgVisible: {
      type: Boolean
    },
    successTitle: {
      type: String
    }
  },
  methods: {
    cancel() {
      this.$emit("cancelSuccessModal");
    }
  }
};
</script>

<style scoped lang="less">
.modal {
  /deep/ .ant-modal-close {
    display: none;
  }
  /deep/ .ant-modal-footer {
    display: none;
  }
}
</style>
