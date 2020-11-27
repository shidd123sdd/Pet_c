<template>
  <div>
    <ItemTitle :title="title" />
    <div class="items">
      <a-button type="primary" class="btn" @click="() => (visable = true)">
        新增
      </a-button>
      <div class="searchItem">
        <a-input-search
          placeholder="请输入搜索内容"
          enter-button
          @search="onSearch"
        />
      </div>
    </div>
    <Table
      :memberList="fosterList"
      @closeModal="closeModal"
      @changeUpdate="changeUpdate"
    />
    <FosterModal
      :visable="visable"
      @closeModal="closeModal"
      :isUpdate="isUpdate"
    />
  </div>
</template>

<script>
import ItemTitle from "../components/ItemTitle";
import Table from "../components/Table";
import FosterModal from "../components/FosterModal";
export default {
  beforeCreate() {
    this.$store.dispatch({
      type: "columnMeta/getColumnMeta",
      id: "foster_info"
    });
    this.$store.dispatch({
      type: "foster/getFosterList"
    });
  },
  watch: {
    "$store.state.foster.fosterList"() {
      this.fosterList = this.$store.state.foster.fosterList;
    }
  },
  components: {
    ItemTitle,
    Table,
    FosterModal
  },
  data() {
    return {
      title: "寄养信息",
      fosterList: [],
      visable: false,
      isUpdate: false
    };
  },
  methods: {
    onSearch(value) {
      const itemList = this.$store.state.foster.fosterList;
      if (value == "") {
        this.fosterList = itemList;
        return;
      }
      let res = [];
      for (let i = 0; i < itemList.length; i++) {
        const item = itemList[i];
        for (let key in item) {
          let str = item[key].toString();
          if (str.indexOf(value) != -1) {
            res.push(item);
            break;
          }
        }
      }
      this.fosterList = res;
    },
    changeUpdate() {
      this.isUpdate = true;
    },
    closeModal() {
      this.visable = !this.visable;
    }
  }
};
</script>

<style scoped lang="less">
.items {
  width: 100%;
  height: 100px;
  /deep/ .btn {
    float: left;
    margin-right: 30px;
  }
  /deep/ .searchItem {
    float: right;
    /deep/ .ant-input {
      width: 200px;
    }
  }
}
</style>
