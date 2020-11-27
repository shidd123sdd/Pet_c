<template>
  <div>
    <a-modal
      v-model="purchaseShow"
      :closable="false"
      :maskClosable="false"
      title="新建会员信息卡"
      cancelText="取消"
      okText="提交"
      @ok="() => (purchaseShow = false)"
    >
      <template slot="footer">
        <a-button key="back" @click="handleCancel"> 返回 </a-button>
        <a-button key="submit" type="primary" @click="handleSubmit">
          提交
        </a-button>
      </template>
      <div class="formItem">
        <a-form
          :form="form"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 16 }"
        >
          <a-form-item label="商品名称">
            <a-cascader
              :changeOnSelect="true"
              placeholder="选择商品"
              :options="productsTypeOptions"
              v-decorator="[
                'prodTypeId',
                {
                  rules: [
                    {
                      type: 'array',
                      required: false
                    }
                  ]
                }
              ]"
            />
          </a-form-item>
          <a-form-item label="重量类别">
            <a-select
              show-search
              placeholder="选择相应重量"
              style="width: 200px"
              :options="weightOptions"
              @select="selectOption"
              v-decorator="[
                'prodWeightId',
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
          <a-form-item label="数量">
            <a-input-number
              :min="0"
              :step="1"
              v-decorator="[
                'prodNum',
                {
                  initialValue: null,
                  rules: [
                    {
                      required: false,
                      message: '请输入数量'
                    }
                  ]
                }
              ]"
            />
          </a-form-item>
          <a-form-item label="成本总价">
            <a-input-number
              :min="0"
              :step="0.01"
              v-decorator="[
                'totalPrice',
                {
                  initialValue: null,
                  rules: [
                    {
                      required: false,
                      message: '请输入单价'
                    }
                  ]
                }
              ]"
            />
          </a-form-item>
          <a-form-item label="供应商">
            <a-select
              show-search
              placeholder="选择供应商"
              style="width: 200px"
              :options="supplierOptions"
              v-decorator="[
                'supplierId',
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
          <a-form-item label="支付方式">
            <a-select
              show-search
              placeholder="选择支付方式"
              style="width: 200px"
              :options="paywayOptions"
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
          <a-form-item label="进货时间">
            <a-date-picker @change="onChange" />
          </a-form-item>
        </a-form>
      </div>
    </a-modal>
  </div>
</template>

<script>
export default {
  props: {
    purchaseShow: {
      type: Boolean,
      default: false
    }
  },
  computed: {},
  data() {
    return {
      form: this.$form.createForm(this),
      productsTypeOptions: this.$store.state.products.productsTypeOptions,
      weightOptions: this.$store.state.products.weightOptions,
      supplierOptions: this.$store.state.products.supplierOptions,
      paywayOptions: this.$store.state.products.paywayOptions,
      purchaseTime: ""
    };
  },
  methods: {
    handleCancel() {
      this.$emit("closePurchase");
    },
    handleSubmit() {
      const { form } = this;
      form.validateFields((err, values) => {
        values["prodTypeId"] = values["prodTypeId"][1];
        values["purchaseTime"] = this.purchaseTime;
        this.$store.dispatch({
          type: "products/addPurchase",
          purchaseInfo: values
        });
        this.form.resetFields();
        this.$emit("closePurchase");
      });
    },
    changeValue(value) {
      console.log(value);
    },
    selectOption(value) {
      console.log(value);
    },
    onChange(date, dateString) {
      this.purchaseTime = dateString;
    }
  }
};
</script>

<style scoped lang="less">
.formItem {
  /deep/ .ant-form-item {
    margin-bottom: 5px;
  }
}
</style>
