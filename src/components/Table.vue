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
      </template>
    </a-table>
    <FosterAccountModal
      :visable="visable"
      @closeModal="closeModal"
      :record="record"
    />
  </div>
</template>
<script>
import FosterAccountModal from "./FosterAccountModal";
export default {
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
    FosterAccountModal
  },
  data() {
    return {
      columnList: [],
      visable: false,
      record: null
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
