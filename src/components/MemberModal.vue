<template>
  <div>
    <a-modal
      v-model="visable"
      :closable="false"
      :maskClosable="false"
      title="新建会员信息卡"
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
          <a-tabs type="card" ref="tabs" @change="callback" :activeKey="key">
            <a-tab-pane key="1" tab="基本信息">
              <a-form-item label="会员号">
                <a-input
                  v-decorator="[
                    'id',
                    {
                      initialValue: isUpdate ? editRecord.id : autoId,
                      rules: [
                        {
                          required: false,
                          message: '请输入会员号'
                        }
                      ]
                    }
                  ]"
                />
              </a-form-item>
              <a-form-item label="主人姓名">
                <a-input
                  v-decorator="[
                    'masterName',
                    {
                      initialValue: isUpdate ? editRecord.masterName : null,
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
                      initialValue: isUpdate ? editRecord.phone : null,
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
            </a-tab-pane>
            <a-tab-pane key="2" tab="宠物信息">
              <a-form-item label="名字-1">
                <a-input
                  v-decorator="[
                    'petName1',
                    {
                      initialValue: isUpdate
                        ? editRecord.petList[0].petName
                        : null,
                      rules: [
                        {
                          required: false,
                          message: '请输入宠物姓名'
                        }
                      ]
                    }
                  ]"
                />
              </a-form-item>
              <a-form-item label="品种-1">
                <a-cascader
                  :changeOnSelect="true"
                  placeholder="请选择品种"
                  :options="options"
                  v-decorator="[
                    'petType1',
                    {
                      initialValue: isUpdate
                        ? calcPetType(editRecord.petList[0])
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
              <a-form-item label="名字-2">
                <a-input
                  v-decorator="[
                    'petName2',
                    {
                      initialValue: isUpdate
                        ? editRecord.petList.length > 1
                          ? editRecord.petList[1].petName
                          : null
                        : null,
                      rules: [
                        {
                          required: false,
                          message: '请输入宠物姓名'
                        }
                      ]
                    }
                  ]"
                />
              </a-form-item>
              <a-form-item label="品种-2">
                <a-cascader
                  :changeOnSelect="true"
                  placeholder="请选择品种"
                  :options="options"
                  v-decorator="[
                    'petType2',
                    {
                      initialValue: isUpdate
                        ? editRecord.petList.length > 1
                          ? calcPetType(editRecord.petList[1])
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
            </a-tab-pane>
            <a-tab-pane key="3" tab="账户余额">
              <a-form-item label="余额">
                <a-input-number
                  :min="0"
                  :step="0.1"
                  v-decorator="[
                    'money',
                    {
                      initialValue: isUpdate ? editRecord.money : null,
                      rules: [
                        {
                          required: false,
                          message: '请输入账户余额'
                        }
                      ]
                    }
                  ]"
                />
              </a-form-item>
              <a-form-item label="折扣">
                <a-select
                  v-decorator="[
                    'discount',
                    {
                      initialValue: isUpdate
                        ? editRecord.discount.toString()
                        : null,
                      rules: [
                        {
                          required: false,
                          message: 'Please select your gender!'
                        }
                      ]
                    }
                  ]"
                  placeholder="本项只限于已开设会员卡但未建卡"
                >
                  <a-select-option value="0.85"> 85折 </a-select-option>
                  <a-select-option value="0.9"> 9折 </a-select-option>
                  <a-select-option value="0.95"> 95折 </a-select-option>
                </a-select>
              </a-form-item>
            </a-tab-pane>
          </a-tabs>
        </a-form>
      </div>
    </a-modal>
  </div>
</template>

<script>
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
      type: "member/getAutoId"
    });
  },
  methods: {
    handleSubmit() {
      const { form } = this;
      form.validateFields((err, values) => {
        const id = values["id"];
        const petName1 = values["petName1"];
        const petName2 = values["petName2"];
        values["discount"] = Number(values["discount"]);
        let petList = [];
        if (petName1 != undefined) {
          const petTypeArr1 = values["petType1"];
          const petType1 = petTypeArr1[petTypeArr1.length - 1];
          const petInfoEntry = {
            memberId: id,
            petName: petName1,
            petTypeId: petType1
          };
          petList.push(petInfoEntry);
        }
        if (petName2 != undefined) {
          const petTypeArr2 = values["petType2"];
          const petType2 = petTypeArr2[petTypeArr2.length - 1];
          const petInfoEntry = {
            memberId: id,
            petName: petName2,
            petTypeId: petType2
          };
          petList.push(petInfoEntry);
        }

        if (!this.isUpdate) {
          this.$store.dispatch({
            type: "member/addMember",
            memberInfoVo: values,
            petList: petList
          });
          this.form.resetFields();
          this.$emit("closeModal");
        } else {
          this.$store.dispatch({
            type: "member/updateMember",
            memberInfoVo: values,
            petList: petList
          });
          this.form.resetFields();
          this.$emit("closeModal");
        }
        this.key = "1";
      });
    },
    handleCancel() {
      this.key = "1";
      this.$emit("closeModal");
    },
    calcPetType(res) {
      const parentId = res.parentTypeId;
      const typeId = res.petTypeId;
      return [parentId, typeId];
    },
    callback(key) {
      this.key = key;
    }
  },
  computed: {
    options() {
      return this.$store.state.petType.petTypeList;
    },
    editRecord() {
      return this.$store.state.member.editRecord;
    }
  },
  watch: {
    "$store.state.member.autoId"() {
      this.autoId = this.$store.state.member.autoId;
    }
  },
  data() {
    let autoId = this.$store.state.member.autoId;
    return {
      list: [],
      form: this.$form.createForm(this),
      autoId: autoId,
      key: "1"
    };
  }
};
</script>

<style scoped lang="less"></style>
