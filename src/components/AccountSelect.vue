<template>
  <div>
    <div>
      <ul>
        <li :class="active[1] ? 'active' : null" @click="selectItem(1)">
          粮食
        </li>
        <li :class="active[2] ? 'active' : null" @click="selectItem(2)">
          零食
        </li>
        <li :class="active[3] ? 'active' : null" @click="selectItem(3)">
          用品
        </li>
        <li :class="active[4] ? 'active' : null" @click="selectItem(4)">
          其他
        </li>
      </ul>

      <div class="carkBox">
        <a-card>
          <a-card-grid
            v-for="item in currItem"
            :key="item.id"
            style="width: 25%; text-align: center"
            @click="addItem(item)"
            :class="item.productNum == 0 ? 'basediv' : null"
            :hoverable="item.productNum == 0 ? false : true"
          >
            <p class="prodTitle">
              {{ item.productName }}{{ item.productWeight }}
            </p>
            <p class="prodPrice">￥{{ item.sellPrice }}</p>
            <div class="saleout"></div>
          </a-card-grid>
        </a-card>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    accountItem: Object
  },
  data() {
    const active = [true, true, false, false, false];
    return { active };
  },
  computed: {
    currItem() {
      const active = this.active;
      let index = 0;
      for (let i = 1; i < active.length; i++) {
        if (active[i] == true) {
          index = i;
        }
      }
      const res = this.accountItem;
      if (res) {
        return res["us00" + index];
      }
      return null;
    }
  },
  methods: {
    selectItem(key) {
      this.active = [false, false, false, false, false];
      this.active[key] = true;
    },
    addItem(item) {
      if (item.productNum > 0) {
        item = {
          ...item,
          serviceFlag: 0
        };
        this.$emit("addItemFromchild", item);
      }
    }
  }
};
</script>

<style scoped lang="less">
ul {
  text-align: left;
  padding-left: 0;
  border-left: 2px solid #eeeeee;
  border-right: 2px solid #eeeeee;
  background: #e6f7ff;
  .active {
    background: white;
    color: #1890ff;
  }
  li {
    text-align: center;
    font-size: 16px;
    list-style-type: none;
    display: inline-block;
    font-weight: 500;
    width: 12%;
    height: 30px;
    line-height: 2.2;
    height: 36px;
    font-family: Avenir, Helvetica, Arial, sans-serif;
    border-right: 2px solid #eeeeee;
  }
}

.carkBox {
  width: 100%;
  height: 100%;
  /deep/ .ant-card-grid {
    padding: 10px;
  }
  .prodTitle {
    font-size: 16px;
    font-weight: 800;
    height: 48px;
  }
  .prodPrice {
    color: red;
    text-align: right;
    margin-bottom: 0;
  }
  .basediv {
    position: relative;
    z-index: 1;
    .saleout {
      background-image: url("../static/images/saleout.png");
      background-repeat: no-repeat;
      background-position-x: center;
      background-position-y: center;
      background-size: 60% 60%;
      opacity: 0.8;
      height: 80px;
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      z-index: 2;
    }
  }
}
</style>
