<template>
  <div>
    <a-modal
      :visible="visible"
      :closable="false"
      :maskClosable="false"
      title="预约结算"
    >
      <template slot="footer">
        <a-button key="back" @click="handleCancel"> 返回 </a-button>
        <a-button key="submit" type="primary" @click="handleSubmit">
          提交
        </a-button>
      </template>
      <a-form
        :form="form"
        :label-col="{ span: 5 }"
        :wrapper-col="{ span: 16 }"
        class="account"
      >
        <a-form-item label="会员号">
          <a-input
            disabled
            v-decorator="[
              'memberId',
              {
                initialValue: record ? record.memberId : null
              }
            ]"
          />
        </a-form-item>
        <a-form-item label="爱宠名字">
          <a-input
            disabled
            v-decorator="[
              'petName',
              {
                initialValue: record ? record.petName : null
              }
            ]"
          />
        </a-form-item>
        <a-form-item label="项目">
          <a-input
            disabled
            v-decorator="[
              'serviceName',
              {
                initialValue: record ? record.serviceName : null
              }
            ]"
          />
        </a-form-item>

        <a-form-item label="单价">
          <a-input-number :min="0" :step="1" v-model="prePrice" />
        </a-form-item>
        <a-form-item label="折扣率" :wrapper-col="{ span: 8 }">
          <a-input
            disabled
            v-decorator="[
              'discount',
              {
                initialValue: calcDiscountStr
              }
            ]"
          />
        </a-form-item>
        <a-form-item label="总价" :wrapper-col="{ span: 8 }">
          <a-input-number v-model="price" />
        </a-form-item>

        <a-form-item label="支付方式">
          <a-select
            show-search
            placeholder="选择支付方式"
            style="width: 200px"
            :options="payTypeOptions"
            v-decorator="[
              'payWayId',
              {
                initialValue: 5,
                rules: [
                  {
                    type: 'number',
                    required: false
                  }
                ]
              }
            ]"
          >
          </a-select>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
export default {
  beforeCreate() {
    this.$store.dispatch({
      type: "foster/getPayType"
    });
  },
  watch: {
    "$store.state.foster.payTypeOptions"() {
      this.payTypeOptions = this.$store.state.foster.payTypeOptions;
    },
    prePrice: {
      handler(newVal) {
        let res = null;
        if (newVal) {
          res = newVal * this.record.discount;
          res = Math.floor(res * 100) / 100;
          this.price = res;
        } else {
          this.price = null;
        }
      }
    }
  },
  props: {
    visible: {
      type: Boolean
    },
    record: {
      type: Object
    }
  },
  data() {
    return {
      form: this.$form.createForm(this),
      payTypeOptions: [],
      prePrice: null,
      price: null
    };
  },
  methods: {
    handleCancel() {
      this.prePrice = null;
      this.price = null;
      this.$emit("closeAccountModal");
    },
    handleSubmit() {
      const { form } = this;
      form.validateFields((err, values) => {
        if (this.record.money < this.price && values["payWayId"] == "5") {
          this.$message.error("余额不足，请先充值！");
          return;
        }
        let condition = {
          memberId: this.record.memberId,
          payWayId: values["payWayId"],
          money: this.price,
          itemType: 1,
          id: this.record.id,
          itemId: this.record.serviceId,
          petId: this.record.petId,
          forwardDate: this.record.forwardDate
        };
        this.$store.dispatch({
          type: "forward/forwardAccount",
          consumeInfo: condition
        });
        this.form.resetFields();
        this.prePrice = null;
        this.price = null;
        this.$emit("closeAccountModal");
      });
    }
  },
  computed: {
    calcDiscountStr() {
      const record = this.record;
      if (record) {
        return record.discount * 100 + "%";
      } else {
        return "无折扣";
      }
    }
  }
};
</script>

<style scoped lang="less">
.account {
  /deep/ .ant-form-item {
    margin-bottom: 5px;

    /deep/ .ant-form-item-children {
      /deep/ input {
        color: black;
      }
    }
  }
}
</style>
