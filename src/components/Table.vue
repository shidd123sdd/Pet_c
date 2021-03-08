<template>
  <div>
    <a-table :columns="columns" :data-source="memberList" size="middle">
      <template slot="action" slot-scope="text, record">
        <a class="actions" @click="editModal(text, record)">修改</a>
        <a-popconfirm
          title="请确认是否删除该记录"
          ok-text="Yes"
          cancel-text="No"
          @confirm="confirm(text, record)"
        >
          <a class="actions" v-show="$route.path == '/foster'">删除</a>
        </a-popconfirm>
        <a
          class="actions"
          v-show="$route.path == '/foster'"
          @click="accountHandle(text, record)"
          >结算</a
        >
        <a
          class="actions"
          v-show="$route.path == '/member'"
          @click="rechargeMember(text, record)"
          >充值</a
        >
      </template>
    </a-table>
    <FosterAccountModal
      :visable="visable"
      @closeModal="closeModal"
      :record="record"
    />
    <RechargeModal
      :rechargeVisible="rechargeVisible"
      :payTypeOptions="payTypeOptions"
      @closeRecharge="closeRecharge"
      :memberInfo="memberInfo"
      @showSuccessModal="showSuccessModal"
    />
    <SuccessMsgModal
      :successMsgVisible="successMsgVisible"
      :successTitle="successTitle"
      @cancelSuccessModal="cancelSuccessModal"
    />
  </div>
</template>
<script>
import FosterAccountModal from "./FosterAccountModal";
import RechargeModal from "./RechargeModal";
import SuccessMsgModal from "./SuccessMsgModal";
export default {
  beforeCreate() {
    this.$store.dispatch({
      type: "foster/getPayType"
    });
  },
  props: {
    memberList: {
      type: Array
    },
    showEdit: {
      type: Boolean,
      default: true
    }
  },
  watch: {
    "$store.state.columnMeta.columns"() {
      const labelColumn = this.$store.state.columnMeta.columns;
      this.columnList = labelColumn;
    },
    "$store.state.foster.payTypeOptions"() {
      this.payTypeOptions = this.$store.state.foster.payTypeOptions;
    }
  },
  computed: {
    columns() {
      let column = this.columnList;
      if (this.showEdit) {
        let options = {
          title: "操作",
          dataIndex: "",
          width: "20%",
          align: "center",
          scopedSlots: { customRender: "action" }
        };
        column.push(options);
      }
      return column;
    }
  },
  components: {
    FosterAccountModal,
    RechargeModal,
    SuccessMsgModal
  },
  data() {
    return {
      columnList: [],
      visable: false,
      record: null,
      payTypeOptions: [],
      rechargeVisible: false,
      memberInfo: null,
      successMsgVisible: false,
      successTitle: ""
    };
  },
  methods: {
    confirm(rext, record) {
      this.$store.dispatch({
        type: "foster/deleteFoster",
        id: record.id
      });
    },
    closeModal() {
      this.visable = !this.visable;
    },
    editModal(text, record) {
      this.$emit("closeModal");
      this.$emit("changeUpdate");
      this.$store.dispatch({
        type: "member/editMember",
        editRecord: record
      });
    },
    rechange(text, record) {
      console.log(text, record);
    },
    accountHandle(text, record) {
      this.visable = true;
      this.record = record;
    },
    closeRecharge() {
      this.rechargeVisible = !this.rechargeVisible;
    },
    showSuccessModal(msg) {
      this.successTitle = msg;
      this.successMsgVisible = true;
    },
    cancelSuccessModal() {
      this.successMsgVisible = !this.successMsgVisible;
    },
    rechargeMember(text, record) {
      console.log(record);
      this.memberInfo = record;
      this.rechargeVisible = true;
    }
  }
};
</script>
<style scoped>
.editable-row-operations a {
  margin-right: 8px;
}

.actions {
  margin: auto 10px;
}
</style>
