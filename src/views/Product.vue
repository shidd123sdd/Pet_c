<template>
  <div class="products">
    <ItemTitle :title="title" />

    <div class="items">
      <a-button type="primary" class="btn" @click="purchaseProduct">
        进货
      </a-button>
      <div class="searchItem">
        <a-input-search
          placeholder="请输入搜索内容"
          enter-button
          @search="onSearch"
        />
      </div>
    </div>

    <div>
      <a-tabs type="card" @change="callback">
        <a-tab-pane key="1" tab="库存总览"> </a-tab-pane>
        <a-tab-pane key="2" tab="进货信息"> </a-tab-pane>
        <a-tab-pane key="3" tab="出库信息"> </a-tab-pane>
      </a-tabs>
      <Table :memberList="objectList" :showEdit="showEdit" />
    </div>
    <PurchaseModal
      :purchaseShow="purchaseShow"
      @closePurchase="closePurchase"
    />
  </div>
</template>

<script>
import Table from "../components/Table";
import ItemTitle from "../components/ItemTitle";
import PurchaseModal from "../components/PurchaseModal";

export default {
  beforeCreate() {
    this.$store.dispatch({
      type: "columnMeta/getColumnMeta",
      id: "products_info"
    });
    this.$store.dispatch({
      type: "products/getProductsInfo"
    });
  },
  watch: {
    "$store.state.products.productsInfo"() {
      if (this.key == "1") {
        this.objectList = this.$store.state.products.productsInfo;
      }
    },
    "$store.state.products.objectList"() {
      this.objectList = this.$store.state.products.objectList;
    }
  },
  data() {
    return {
      title: "商品信息",
      objectList: [],
      key: "1",
      purchaseShow: false,
      showEdit: true
    };
  },
  components: {
    Table,
    ItemTitle,
    PurchaseModal
  },
  methods: {
    onSearch(value) {
      const list = this.$store.state.products.objectList;
      if (value == "") {
        this.objectList = list;
        return;
      }
      let res = [];
      for (let i = 0; i < list.length; i++) {
        const item = list[i];
        for (let key in item) {
          if (!item[key]) {
            continue;
          }
          let str = item[key].toString();
          if (str.indexOf(value) != -1) {
            res.push(item);
            break;
          }
        }
      }
      this.objectList = res;
    },
    callback(key) {
      this.key = key;
      this.$store.dispatch({
        type: "products/getObjectInfo",
        key: key
      });
      var id;
      if (key == "1") {
        id = "products_info";
        this.showEdit = true;
      } else if (key == "2") {
        id = "purchase_info";
        this.showEdit = false;
      } else {
        id = "sell_products_info";
        this.showEdit = false;
      }

      this.$store.dispatch({
        type: "columnMeta/getColumnMeta",
        id: id
      });
    },
    purchaseProduct() {
      this.purchaseShow = true;
    },
    closePurchase() {
      this.purchaseShow = !this.purchaseShow;
    }
  }
};
</script>

<style scoped lang="less">
.products {
  /deep/ .ant-tabs-nav-scroll {
    text-align: left;
  }

  .items {
    width: 100%;
    height: 50px;
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
}
</style>
