<template>
  <div>
    <a-modal
      v-model="visable"
      :closable="false"
      :maskClosable="false"
      title="寄养结算"
      cancelText="取消"
      okText="提交"
      @ok="() => (visable = false)"
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
        <a-form-item label="爱宠名字">
          <a-input
            disabled
            v-decorator="[
              'petName',
              {
                initialValue: record != null ? record.petName : null
              }
            ]"
          />
        </a-form-item>

        <a-form-item label="起止日期" style="margin-bottom: 0">
          <a-form-item
            :style="{ display: 'inline-block', width: 'calc(50% - 12px)' }"
          >
            <a-date-picker
              style="width: 100%"
              :defaultValue="record != null ? moment(record.startDate) : null"
              disabled
            />
          </a-form-item>
          <span
            :style="{
              display: 'inline-block',
              width: '24px',
              textAlign: 'center'
            }"
          >
            -
          </span>
          <a-form-item
            :style="{ display: 'inline-block', width: 'calc(50% - 12px)' }"
          >
            <a-date-picker
              style="width: 100%"
              :defaultValue="record != null ? moment(record.endDate) : null"
              disabled
            />
          </a-form-item>
        </a-form-item>
        <a-form-item label="总天数">
          <a-input-number
            :min="0"
            :step="1"
            @change="changeTotalDate"
            v-decorator="[
              'totalDate',
              {
                initialValue: record != null ? record.totalDate : null
              }
            ]"
          />
        </a-form-item>
        <a-form-item label="单价">
          <a-input-number
            :min="0"
            :step="1"
            v-decorator="[
              'price',
              {
                initialValue: record != null ? record.price : null
              }
            ]"
          />
        </a-form-item>
        <a-form-item label="折扣率" :wrapper-col="{ span: 8 }">
          <a-input
            disabled
            v-decorator="[
              'discount',
              {
                initialValue:
                  record != null
                    ? record.isMember == 1
                      ? '95折'
                      : '无折扣'
                    : '无折扣'
              }
            ]"
          />
        </a-form-item>
        <a-form-item label="总价" :wrapper-col="{ span: 8 }">
          <a-input-number v-model="totalPrice" />
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
import moment from "moment";
export default {
  beforeCreate() {
    this.$store.dispatch({
      type: "foster/getPayType"
    });
  },
  props: {
    visable: {
      type: Boolean,
      default: false
    },
    record: {
      type: Object,
      default: null
    }
  },
  methods: {
    handleCancel() {
      this.$emit("closeModal");
    },
    moment,
    handleSubmit() {},
    changeTotalDate(value) {
      this.totalDate = value;
      let res = value * this.discount * this.price;
      res = Math.floor(res * 100) / 100;
      this.totalPrice = res;
    },
    changePrice(value) {
      this.price = value;
      let res = value * this.discount * this.totalDate;
      res = Math.floor(res * 100) / 100;
      this.totalPrice = res;
    }
  },
  watch: {
    "$store.state.foster.payTypeOptions"() {
      this.payTypeOptions = this.$store.state.foster.payTypeOptions;
    },
    record: {
      handler(newVal) {
        let price = newVal.price;
        let totalDate = newVal.totalDate;
        let discount;
        if (newVal.isMember == 1) {
          discount = 0.95;
        } else {
          discount = 1;
        }
        this.discount = discount;
        this.totalDate = totalDate;
        this.price = price;
        let res = price * totalDate * discount;
        res = Math.floor(res * 100) / 100;
        this.totalPrice = res;
      }
    }
  },
  data() {
    return {
      form: this.$form.createForm(this),
      totalDate: 0,
      totalPrice: 0,
      price: 0,
      discount: 1,
      payTypeOptions: []
    };
  },
  computed: {}
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
