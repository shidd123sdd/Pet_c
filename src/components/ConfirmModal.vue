<template>
  <div>
    <a-modal
      :visible="confirmVisible"
      :maskClosable="false"
      class="modal"
      @cancel="cancel"
    >
      <a-result status="success" title="确认是否提交？">
        <template #extra>
          <a-button key="console" type="primary" @click="handleOk">
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
    confirmVisible: {
      type: Boolean
    },
    itemInfo: {
      type: Object
    },
    path: {
      type: String
    }
  },
  methods: {
    cancel() {
      this.$emit("cancelConfirmModal");
    },
    handleOk() {
      this.$store.dispatch({
        type: this.path,
        itemInfo: this.itemInfo
      });
      this.$emit("clearParentInfo");
      this.$emit("cancelConfirmModal");
    }
  }
};
</script>

<style scoped lang="less">
.modal {
  /deep/ .ant-modal-footer {
    display: none;
  }
}
</style>
