<template>
  <div>
    <a-modal
      v-model="visable"
      :closable="false"
      :maskClosable="false"
      title="寄养登记"
      cancelText="取消"
      okText="提交"
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
          <a-form-item label="是否为会员">
            <a-radio-group
              button-style="outline"
              :options="isMemberOption"
              @change="changeRadio"
              v-decorator="[
                'isMember',
                {
                  initialValue: isUpdate ? editRecord.isMember : 1,
                  rules: [
                    {
                      type: 'number',
                      required: false
                    }
                  ]
                }
              ]"
            >
            </a-radio-group>
          </a-form-item>
          <div v-if="memberShow">
            <a-form-item label="主人姓名">
              <a-input
                v-decorator="[
                  'masterName',
                  {
                    initialValue: isUpdate
                      ? editRecord.isMember == 0
                        ? editRecord.masterName
                        : null
                      : null,
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
            <a-form-item label="爱宠名字">
              <a-input
                v-decorator="[
                  'petName',
                  {
                    initialValue: isUpdate
                      ? editRecord.isMember == 0
                        ? editRecord.petName
                        : null
                      : null,
                    rules: [
                      {
                        required: false,
                        message: '请输入手机号'
                      }
                    ]
                  }
                ]"
              />
            </a-form-item>
            <a-form-item label="品种">
              <a-cascader
                :changeOnSelect="true"
                placeholder="请选择品种"
                :options="petTypeOptions"
                v-decorator="[
                  'petTypeId',
                  {
                    initialValue: isUpdate
                      ? editRecord.isMember == 0
                        ? parsePetTypeId(editRecord)
                        : null
                      : null,
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
            <a-form-item label="手机号">
              <a-input
                v-decorator="[
                  'phone',
                  {
                    initialValue: isUpdate
                      ? editRecord.isMember == 0
                        ? editRecord.phone
                        : null
                      : null,
                    rules: [
                      {
                        required: false,
                        message: '请输入手机号'
                      }
                    ]
                  }
                ]"
              />
            </a-form-item>
          </div>
          <div v-else>
            <a-form-item label="宠物名字">
              <a-select
                style="width: 120px"
                @change="handleProvinceChange"
                :defaultValue="memberDefault"
              >
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
          </div>

          <a-form-item label="开始日期">
            <a-date-picker
              v-decorator="[
                'startDate',
                {
                  initialValue: isUpdate ? moment(editRecord.startDate) : null,
                  rules: [
                    { type: 'object', required: true, message: '请选择时间!' }
                  ]
                }
              ]"
            />
          </a-form-item>

          <a-form-item label="结束日期">
            <a-date-picker
              v-decorator="[
                'endDate',
                {
                  initialValue: isUpdate ? moment(editRecord.endDate) : null,
                  rules: [
                    { type: 'object', required: true, message: '请选择时间!' }
                  ]
                }
              ]"
            />
          </a-form-item>

          <a-form-item label="价格/天">
            <a-input-number
              :min="0"
              :step="1"
              v-decorator="[
                'price',
                {
                  initialValue: isUpdate ? editRecord.price : null,
                  rules: [
                    {
                      required: true,
                      message: '请输入价格/天'
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
import moment from "moment";
export default {
  props: {
    visable: {
      type: Boolean,
      default: false
    },
    isUpdate: {
      type: Boolean,
      default: false
    }
  },
  beforeCreate() {
    this.$store.dispatch({
      type: "petType/getPetTypeInfo"
    });
    this.$store.dispatch({
      type: "member/getMemberList"
    });
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
    },
    memberDefault() {
      if (this.isUpdate) {
        return this.editRecord.memberId;
      } else {
        return null;
      }
    },
    editRecord() {
      return this.$store.state.member.editRecord;
    }
  },
  watch: {
    "$store.state.petType.petTypeList"() {
      this.petTypeOptions = this.$store.state.petType.petTypeList;
    },
    "$store.state.member.memberList"() {
      this.memberList = this.$store.state.member.memberList;
    },
    editRecord: {
      handler(newValue) {
        if (this.isUpdate == true && this.$route.path == "/foster") {
          let memberShow = false;
          const edit = newValue;
          const isMember = edit.isMember;
          if (isMember == 1) {
            memberShow = false;
          } else {
            memberShow = true;
          }
          this.memberShow = memberShow;
          this.vipId = newValue.memberId;
        }
      },
      immediate: true
    }
  },
  methods: {
    moment,
    parsePetTypeId(obj) {
      let petTypeId = "";
      if (obj.petTypeId == 0) {
        const petId = obj.petId;
        const memberList = this.memberList;
        for (let i = 0; i < memberList.length; i++) {
          if (memberList[i].id == obj.memberId) {
            for (let j = 0; j < memberList[i].petList.length; j++) {
              if (petId == memberList[i].petList[j].petId) {
                petTypeId = memberList[i].petList[j].petTypeId;
                break;
              }
            }
          }
        }
      } else {
        petTypeId = obj.petTypeId;
      }
      const petTypes = this.petTypeOptions;
      for (let i = 0; i < petTypes.length; i++) {
        for (let j = 0; j < petTypes[i]["children"].length; j++) {
          if (petTypes[i]["children"][j]["value"] == petTypeId) {
            return [i + 1, petTypeId];
          }
        }
      }
      return null;
    },
    handleSubmit() {
      const { form } = this;
      form.validateFields((err, values) => {
        values["startDate"] = values["startDate"].format("YYYY-MM-DD");
        values["endDate"] = values["endDate"].format("YYYY-MM-DD");

        if (!this.memberShow) {
          values["petTypeId"] = null;
        } else {
          values["petTypeId"] = values["petTypeId"][1];
        }
        let type = "";
        if (!this.isUpdate) {
          type = "foster/addFoster";
        } else {
          type = "foster/updateFoster";
          values["id"] = this.editRecord.id;
        }
        this.$store.dispatch({
          type: type,
          fosterInfo: values
        });
        this.form.resetFields();
        this.$emit("closeModal");
      });
    },
    handleProvinceChange(value) {
      this.vipId = value;
    },
    handleCancel() {
      this.$emit("closeModal");
    },
    changeRadio(e) {
      if (e.target.value == 1) {
        this.memberShow = false;
      } else {
        this.memberShow = true;
      }
    }
  },
  data() {
    const options = [
      { label: "会员", value: 1 },
      { label: "非会员", value: 0 }
    ];

    return {
      form: this.$form.createForm(this),
      isMemberOption: options,
      petTypeOptions: [],
      memberList: [],
      vipId: "",
      petId: "",
      startDate: "",
      endDate: "",
      memberShow: false
    };
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
