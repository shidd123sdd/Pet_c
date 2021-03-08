<template>
  <div>
    <a-modal
      v-model="visable"
      :closable="false"
      :maskClosable="false"
      title="登记预约信息"
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
      <div>
        <a-form
          :form="form"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 16 }"
        >
          <!-- <a-form-item label="宠物名字">
            <a-select
              show-search
              placeholder="请选择宠物"
              style="width: 200px"
              :options="petInfoSelects"
              @select="selectOption"
              v-decorator="[
                'petId',
                {
                  initialValue: isUpdate ? forwardInfo.petId : null,
                  rules: [
                    {
                      type: 'number',
                      required: false,
                    },
                  ],
                },
              ]"
            >
            </a-select>
          </a-form-item> -->
          <a-form-item label="宠物名字">
            <a-select style="width: 120px" @change="handleProvinceChange">
              <a-select-option v-for="item in memberList" :key="item.id">
                {{ item.masterName }}
              </a-select-option>
            </a-select>
            <a-select
              style="width: 120px"
              v-decorator="[
                'petId',
                {
                  initialValue: isUpdate ? editRecord.petId : null,
                  rules: [
                    {
                      required: false,
                      message: '选择宠物'
                    }
                  ]
                }
              ]"
            >
              <a-select-option v-for="pet in petList" :key="pet.petId">
                {{ pet.petName }}
              </a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item label="预约日期">
            <a-date-picker
              v-decorator="[
                'forwardDate',
                {
                  initialValue: isUpdate
                    ? moment(forwardInfo.forwardDate, 'YYYY-MM-DD')
                    : moment(nowStr, 'YYYY-MM-DD'),
                  rules: [
                    { type: 'object', required: true, message: '请选择时间!' }
                  ]
                }
              ]"
            />
          </a-form-item>
          <a-form-item label="上下午">
            <a-select
              show-search
              placeholder="选择上下午"
              style="width: 100px"
              :options="timeFlgOption"
              v-decorator="[
                'timeFlg',
                {
                  initialValue: isUpdate ? forwardInfo.timeFlg : null,
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

          <a-form-item label="时间点">
            <a-select
              show-search
              placeholder="请选择时间点"
              style="width: 200px"
              :options="timeInfoSelects"
              v-decorator="[
                'timeId',
                {
                  initialValue: isUpdate ? forwardInfo.timeId : null,
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
          <a-form-item label="预约项目">
            <a-select
              show-search
              placeholder="请选择预约项目"
              style="width: 200px"
              :options="serviceSelects"
              v-decorator="[
                'serviceId',
                {
                  initialValue: isUpdate ? forwardInfo.serviceId : null,
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
      </div>
    </a-modal>
  </div>
</template>

<script>
import moment from "moment";
export default {
  beforeCreate() {
    this.$store.dispatch({
      type: "forward/initItems"
    });
    this.$store.dispatch({
      type: "member/getMemberList"
    });
  },
  props: {
    visable: {
      type: Boolean,
      default: false
    },
    isUpdate: {
      type: Boolean,
      default: false
    },
    forwardInfo: {
      type: Object,
      default: null
    },
    nowStr: {
      type: String,
      default: ""
    }
  },
  computed: {
    petList() {
      const memberList = this.memberList;
      let resList = [];
      for (let i = 0; i < memberList.length; i++) {
        if (memberList[i].id == this.vipId) {
          resList = memberList[i].petList;
          break;
        }
      }
      return resList;
    }
  },
  watch: {
    "$store.state.forward.petInfoSelects"() {
      this.petInfoSelects = this.$store.state.forward.petInfoSelects;
    },
    "$store.state.forward.timeInfoSelects"() {
      this.timeInfoSelects = this.$store.state.forward.timeInfoSelects;
    },
    "$store.state.forward.serviceSelects"() {
      this.serviceSelects = this.$store.state.forward.serviceSelects;
    },
    "$store.state.member.memberList"() {
      this.memberList = this.$store.state.member.memberList;
    }
  },
  data() {
    const timeFlgOption = [
      { label: "上午", value: 1 },
      { label: "下午", value: 2 }
    ];
    return {
      petInfoSelects: [],
      form: this.$form.createForm(this),
      forwardDate: "",
      timeFlg: 1,
      timeInfoSelects: [],
      serviceSelects: [],
      timeFlgOption: timeFlgOption,
      memberList: [],
      vipId: ""
    };
  },
  methods: {
    handleProvinceChange(value) {
      this.vipId = value;
    },
    moment,
    selectOption() {},
    handleCancel() {
      this.$emit("closeModal");
    },
    handleSubmit() {
      const { form } = this;
      form.validateFields((err, values) => {
        values["forwardDate"] = values["forwardDate"].format("YYYY-MM-DD");

        if (!this.isUpdate) {
          this.$store.dispatch({
            type: "forward/addForward",
            forwardInfo: values,
            forwardDate: moment(this.nowStr).format("YYYY-MM-DD")
          });
        } else {
          values["id"] = this.forwardInfo.id;
          this.$store.dispatch({
            type: "forward/updateForward",
            forwardInfo: values,
            forwardDate: moment(this.nowStr).format("YYYY-MM-DD")
          });
        }
        this.form.resetFields();
        this.$emit("closeModal");
      });
    }
  }
};
</script>

<style scoped lang="less"></style>
