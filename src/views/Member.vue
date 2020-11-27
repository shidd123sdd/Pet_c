<template>
  <div>
    <ItemTitle :title="title" />
    <div class="items">
      <a-button type="primary" class="btn" @click="showModal"> 新增 </a-button>
      <MemberModal
        @closeModal="closeModal"
        :visable="visable"
        :isUpdate="isUpdate"
        @changeUpdate="changeUpdate"
      />
      <div class="searchItem">
        <a-input-search
          placeholder="请输入搜索内容"
          enter-button
          @search="onSearch"
        />
      </div>
    </div>
    <Table
      :memberList="memberList"
      @closeModal="closeModal"
      @changeUpdate="changeUpdate"
    />
  </div>
</template>

<script>
import Table from "../components/Table";
import ItemTitle from "../components/ItemTitle";
import MemberModal from "../components/MemberModal";
export default {
  beforeCreate() {
    this.$store.dispatch({
      type: "member/getMemberList"
    });
    this.$store.dispatch({
      type: "columnMeta/getColumnMeta",
      id: "member_info"
    });
  },
  watch: {
    "$store.state.member.memberList"() {
      this.memberList = this.$store.state.member.memberList;
    }
  },
  components: {
    Table,
    ItemTitle,
    MemberModal
  },
  methods: {
    closeModal() {
      this.visable = !this.visable;
    },
    changeUpdate() {
      this.isUpdate = true;
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
    },
    showModal() {
      this.visable = true;
      this.isUpdate = false;
      this.$store.dispatch({
        type: "member/getAutoId"
      });
    }
  },
  data() {
    return {
      title: "会员信息",
      memberList: [],
      visable: false,
      isUpdate: false
    };
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
