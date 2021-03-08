<template>
  <div>
    <a-modal :visible="rechargeVisible" :maskClosable="false" title="会员充值">
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
          <a-form-item label="主人姓名">
            <a-input
              v-decorator="[
                'masterName',
                {
                  initialValue: memberInfo ? memberInfo.masterName : null,
                  rules: [
                    {
                      required: false,
                      message: '请输入姓名'
                    }
                  ]
                }
              ]"
            />
          </a-form-item>
          <a-form-item label="手机号">
            <a-input
              v-decorator="[
                'phone',
                {
                  initialValue: memberInfo ? memberInfo.phone : null,
                  rules: [
                    {
                      required: false,
                      message: '请输入姓名'
                    }
                  ]
                }
              ]"
            />
          </a-form-item>
          <a-form-item label="支付方式">
            <a-select
              show-search
              placeholder="选择支付方式"
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
          <a-form-item label="充值金额">
            <a-input-number
              :min="0"
              :step="1"
              v-decorator="[
                'money',
                {
                  rules: [
                    {
                      required: true,
                      message: '请输入充值金额'
                    }
                  ]
                }
              ]"
            />
          </a-form-item>
        </a-form>
      </div>
    </a-modal>
  </div>
</template>

<script>
export default {
  props: {
    memberInfo: {
      type: Object
    },
    rechargeVisible: {
      type: Boolean
    },
    payTypeOptions: {
      type: Array
    }
  },
  data() {
    return {
      form: this.$form.createForm(this)
    };
  },
  computed: {
    paywayOptions() {
      const options = this.payTypeOptions;
      let res = [];
      for (let i = 0; i < options.length; i++) {
        if (options[i].value != 5) {
          res.push(options[i]);
        }
      }
      return res;
    }
  },
  methods: {
    handleCancel() {
      this.$emit("closeRecharge");
    },
    handleSubmit() {
      const { form } = this;
      form.validateFields((err, values) => {
        values = {
          ...values,
          id: this.memberInfo.id
        };
        this.$store
          .dispatch({
            type: "member/recharge",
            rechargeInfo: values
          })
          .then(res => {
            if (res.state == 1) {
              this.$emit("showSuccessModal", res.message);
            }
          });

        this.form.resetFields();
        this.$emit("closeRecharge");
      });
    }
  }
};
</script>

<style scoped lang="less"></style>
