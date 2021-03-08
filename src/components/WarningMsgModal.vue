<template>
  <div>
    <a-modal
      :visible="warningMsgVisible"
      :maskClosable="false"
      class="modal"
      @cancel="cancel"
    >
      <a-result status="warning" :title="warnTitle">
        <template #extra>
          <a-button key="console" type="primary" @click="handle">
            去充值
          </a-button>
        </template>
      </a-result>
    </a-modal>
  </div>
</template>

<script>
export default {
  props: {
    warningMsgVisible: {
      type: Boolean
    },
    warnTitle: {
      type: String
    }
  },
  methods: {
    cancel() {
      this.$emit("cancelWarningModal");
    },
    handle() {
      this.$emit("cancelWarningModal");
      this.$emit("closeParent");
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
