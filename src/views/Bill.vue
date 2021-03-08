<template>
  <div>
    <!-- <ItemTitle :title="title" />
    <a-table :columns="columnList" :data-source="data" bordered>
      <template slot="name" slot-scope="text">
        <a>{{ text }}</a>
      </template>
      <template slot="title"> </template>
      <template slot="footer"> Footer </template>
    </a-table> -->
    <input type="text" v-model="sssss" />
    <button @click="handleValue">anjiu</button>
  </div>
</template>

<script>
// import ItemTitle from "../components/ItemTitle";
// const columns = [
//   {
//     title: "Name",
//     dataIndex: "name",
//     scopedSlots: { customRender: "name" }
//   },
//   {
//     title: "Cash Assets",
//     className: "column-money",
//     dataIndex: "money"
//   },
//   {
//     title: "Address",
//     dataIndex: "address"
//   }
// ];

const data = [
  {
    key: "1",
    name: "John Brown",
    money: "￥300,000.00",
    address: "New York No. 1 Lake Park"
  },
  {
    key: "2",
    name: "Jim Green",
    money: "￥1,256,000.00",
    address: "London No. 1 Lake Park"
  },
  {
    key: "3",
    name: "Joe Black",
    money: "￥120,000.00",
    address: "Sidney No. 1 Lake Park"
  }
];
export default {
  beforeCreate() {
    this.$store.dispatch({
      type: "columnMeta/getColumnMeta",
      id: "bill_info"
    });
    this.$store.dispatch({
      type: "bill/getBillList"
    });
  },
  watch: {
    "$store.state.columnMeta.columns"() {
      const labelColumn = this.$store.state.columnMeta.columns;
      this.columnList = labelColumn;
    }
  },
  components: {
    // ItemTitle
  },
  data() {
    return {
      title: "账单",
      data,
      columnList: [],
      sssss: ""
    };
  },
  methods: {
    handleValue() {
      var reg = new RegExp(/^[a-zA-Z0-9,\s]+$/);
      if (this.sssss != "") {
        if (!reg.exec(this.sssss)) {
          console.log("cuowu");
        } else {
          console.log("right");
        }
      }
    }
  }
};
</script>

<style scoped lang="less">
th.column-money,
td.column-money {
  text-align: right !important;
}
</style>
