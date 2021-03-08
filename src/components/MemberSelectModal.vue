<template>
  <div>
    <div>
      <a-modal
        v-model="visable"
        on-ok="handleOk"
        class="item"
        width="800px"
        :maskClosable="false"
      >
        <template slot="footer">
          <a-button key="back" @click="handleCancel"> 取消 </a-button>
          <a-button key="confirm" type="primary" @click="handleOk">
            确认
          </a-button>
        </template>
        <div class="searchItem">
          <a-input-search
            placeholder="请输入搜索内容"
            enter-button
            @search="onSearch"
          />
        </div>
        <div class="clearfix"></div>
        <div class="tableBox">
          <a-table
            :columns="columnList"
            :data-source="memberList"
            size="small"
            bordered
            :row-selection="rowSelection"
          >
          </a-table>
        </div>
      </a-modal>
    </div>
  </div>
</template>

<script>
export default {
  watch: {
    "$store.state.columnMeta.columns"() {
      const labelColumn = this.$store.state.columnMeta.columns;
      this.columnList = labelColumn;
    }
  },
  props: {
    visable: {
      type: Boolean,
      default: false
    },
    memberList: {
      type: Array
    }
  },
  data() {
    return {
      columnList: [],
      rowSelection: {
        columnWidth: "5px",
        columnTitle: "选择",
        onSelect: record => {
          console.log(record);
          this.id = record.id;
        }
      },
      id: ""
    };
  },
  methods: {
    handleOk() {
      console.log(this.id);
      this.$emit("listenToChildEvent", this.id);
      this.$emit("closeModal");
    },
    handleCancel() {
      this.$emit("closeModal");
    },
    onSearch(value) {
      const member = this.$store.state.member.memberList;
      if (value == "") {
        this.memberList = member;
        return;
      }
      let res = [];
      for (let i = 0; i < member.length; i++) {
        const item = member[i];
        for (let key in item) {
          let str = item[key].toString();
          if (str.indexOf(value) != -1) {
            res.push(item);
            break;
          }
        }
      }
      this.memberList = res;
    }
  }
};
</script>

<style scoped lang="less">
.item {
  /deep/ .ant-modal-content {
    /deep/ .ant-modal-close {
      display: none;
    }
    /deep/ .ant-modal-body {
      padding-bottom: 0;
    }
  }
  /deep/ .searchItem {
    float: right;
    /deep/ .ant-input {
      width: 200px;
    }
  }
  .clearfix {
    clear: both;
  }
  .tableBox {
    margin-top: 10px;
  }
}
</style>
