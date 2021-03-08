<template>
  <div class="account">
    <div class="leftNav">
      <a-table
        :columns="columns"
        :data-source="data"
        bordered
        :pagination="false"
      >
        <span slot="action" slot-scope="text, record">
          <a-button
            class="calcBtn"
            shape="circle"
            size="small"
            icon="minus"
            @click="minusItem(record)"
          ></a-button
          ><span class="countNum">{{ record.count }} </span>
          <a-button
            class="calcBtn"
            shape="circle"
            size="small"
            icon="plus"
            @click="plusItem(record)"
            :disabled="record.serviceFlag == 0 ? false : true"
          ></a-button>
        </span>
        <template slot="title">
          <div class="memberBox">
            <a-radio-group
              name="radioGroup"
              :default-value="1"
              @change="changeMember"
            >
              <a-radio :value="1">会员 </a-radio>
              <a-radio :value="0"> 非会员 </a-radio>
            </a-radio-group>
            <div v-show="isMember" class="memberInfo">
              <a-input size="small" v-model="memberId"> </a-input>
              <a-button
                icon="search"
                size="small"
                @click="() => (visable = true)"
              />
              <div>
                <a-input
                  size="small"
                  disabled
                  :value="masterName"
                  class="masterName"
                  v-show="contains"
                ></a-input>
                <a-input
                  size="small"
                  disabled
                  :value="percent"
                  class="percent"
                  v-show="contains"
                ></a-input>
              </div>
              <div class="clearfix"></div>
            </div>
          </div>
        </template>
        <template slot="footer">
          <div class="sumTitle"><span>合计</span></div>
          <div>
            <span class="discountSum"> ￥ {{ discountSum }}</span>
            <span class="sumValue" v-show="showCondition"> ￥ {{ sum }}</span>
          </div>
          <div class="clearfix"></div>
        </template>
      </a-table>
      <div class="payfor">
        <a-dropdown placement="topCenter">
          <a-button>{{ showPayWay ? showPayWay : "支付方式" }}</a-button>
          <a-menu slot="overlay">
            <a-menu-item v-for="item in payTypeOptions" :key="item.value">
              <a
                target="_blank"
                @click="selectPayType(item)"
                v-show="!contains && item.value == 5 ? false : true"
                >{{ item.label }}</a
              >
            </a-menu-item>
          </a-menu>
        </a-dropdown>
        <a-button type="primary" @click="checkout"> 结账 </a-button>
      </div>
    </div>
    <div class="rightside">
      <div class="topNav">
        <a-tabs type="card" @change="callback">
          <a-tab-pane key="1" tab="汪星人">
            <AccountSelect
              :accountItem="accountList['1001']"
              @addItemFromchild="plusItem"
            />
          </a-tab-pane>
          <a-tab-pane key="2" tab="喵星人">
            <AccountSelect
              :accountItem="accountList['1002']"
              @addItemFromchild="plusItem"
            />
          </a-tab-pane>
          <a-tab-pane key="3" tab="洗澡美容">
            <div class="service">
              <a-radio-group
                button-style="solid"
                size="large"
                @change="changeService"
              >
                <a-radio-button
                  v-for="item in serviceSelects"
                  :key="item.value"
                  :value="item.value"
                >
                  {{ item.label }}
                </a-radio-button>
              </a-radio-group>
              <div class="servicePrice">
                <label for="">金额：</label>
                <a-input-number id="inputNumber" v-model="servicePrice" />
              </div>
              <a-button
                type="primary"
                width="100px"
                size="large"
                @click="addServce"
                :disabled="canClick"
              >
                确认
              </a-button>
            </div>
          </a-tab-pane>
          <!-- <a-tab-pane
            key="4"
            tab="其他"
            :accountItem="accountList['1004']"
            @addItemFromchild="plusItem"
          >
          </a-tab-pane> -->
        </a-tabs>
      </div>
    </div>
    <div class="clearfix"></div>
    <MemberSelectModal
      :visable="visable"
      :memberList="memberList"
      @closeModal="closeModal"
      @listenToChildEvent="showIdFromChild"
    />
    <WarningMsgModal
      :warningMsgVisible="warningMsgVisible"
      @cancelWarningModal="cancelWarningModal"
      @closeParent="closeRecharge"
      :warnTitle="warnTitle"
    />
    <SuccessMsgModal
      :successMsgVisible="successMsgVisible"
      @cancelSuccessModal="cancelSuccessModal"
      :successTitle="successTitle"
    />
    <RechargeModal
      :rechargeVisible="rechargeVisible"
      @closeRecharge="closeRecharge"
      :memberInfo="currMember"
      :payTypeOptions="payTypeOptions"
      @showSuccessModal="showSuccessModal"
    />
    <ConfirmModal
      @cancelConfirmModal="cancelConfirmModal"
      :confirmVisible="confirmVisible"
      :itemInfo="itemInfo"
      :path="path"
      @clearParentInfo="clearFormInfo"
    />
  </div>
</template>

<script>
import MemberSelectModal from "../components/MemberSelectModal";
import AccountSelect from "../components/AccountSelect";
import WarningMsgModal from "../components/WarningMsgModal";
import RechargeModal from "../components/RechargeModal";
import SuccessMsgModal from "../components/SuccessMsgModal";
import ConfirmModal from "../components/ConfirmModal";
export default {
  beforeCreate() {
    this.$store.dispatch({
      type: "forward/initItems"
    });
    this.$store.dispatch({
      type: "member/getMemberList"
    });
    this.$store.dispatch({
      type: "columnMeta/getColumnMeta",
      id: "account_member_info"
    });
    this.$store.dispatch({
      type: "account/getAccountList"
    });
    this.$store.dispatch({
      type: "foster/getPayType"
    });
  },
  watch: {
    "$store.state.member.memberList"() {
      this.memberList = this.$store.state.member.memberList;
      const id = this.memberId;
      this.memberId = "";
      setTimeout(() => {
        this.memberId = id;
      }, 10);
    },
    "$store.state.account.accountList"() {
      this.accountList = this.$store.state.account.accountList;
    },
    "$store.state.forward.serviceSelects"() {
      this.serviceSelects = this.$store.state.forward.serviceSelects;
    },
    "$store.state.foster.payTypeOptions"() {
      this.payTypeOptions = this.$store.state.foster.payTypeOptions;
    },
    memberId: {
      handler(newValue) {
        console.log(newValue);
        const member = this.memberList;
        for (let i = 0; i < member.length; i++) {
          if (member[i].id == newValue) {
            this.masterName = member[i].masterName;
            this.percent = member[i].percent;
            this.contains = true;
            this.currMember = member[i];
            this.payWayId = 5;
            const payWays = this.payTypeOptions;
            for (let j = 0; j < payWays.length; j++) {
              if (payWays[j].value == 5) {
                this.showPayWay = payWays[j].label;
                break;
              }
            }
            return;
          }
        }
        this.payWayId = -1;
        this.showPayWay = null;
        this.currMember = null;
        this.contains = false;
      },
      immediate: true
    },
    currMember: {
      handler() {
        this.getAllMoney();
      },
      immediate: true
    },
    isMember: {
      handler() {
        this.getAllMoney();
      },
      immediate: true
    }
  },
  computed: {
    showCondition() {
      return this.contains && this.isMember && this.currMember && this.sum > 0
        ? true
        : false;
    },
    canClick() {
      return this.servicePrice <= 0 || this.serviceId == 0 ? true : false;
    }
  },
  data() {
    const columns = [
      {
        title: "名称",
        dataIndex: "prodName",
        className: "prodName",
        scopedSlots: { prodId: "prodId" }
      },
      {
        title: "单价",
        className: "price",
        dataIndex: "price"
      },
      {
        title: "数量",
        key: "action",
        scopedSlots: { customRender: "action" }
      }
    ];
    return {
      title: "结算",
      data: [],
      columns,
      sum: 0,
      isMember: true,
      memberId: "",
      visable: false,
      memberList: [],
      percent: "",
      masterName: "",
      contains: false,
      currMember: null,
      discountSum: 0,
      accountList: [],
      serviceSelects: [],
      servicePrice: null,
      serviceId: 0,
      payTypeOptions: [],
      showPayWay: null,
      payWayId: -1,
      warningMsgVisible: false,
      rechargeVisible: false,
      warnTitle: "当前会员卡余额不足，请先充值！",
      successTitle: "",
      successMsgVisible: false,
      confirmVisible: false,
      itemInfo: null,
      path: "account/checkoutAccount"
    };
  },
  components: {
    MemberSelectModal,
    AccountSelect,
    WarningMsgModal,
    RechargeModal,
    SuccessMsgModal,
    ConfirmModal
  },
  methods: {
    clearFormInfo() {
      this.data = [];
      this.memberId = "";
      this.discountSum = 0;
      this.sum = 0;
      this.payWayId = -1;
    },
    callback(key) {
      console.log(key);
    },
    showIdFromChild(id) {
      this.memberId = id;
    },
    changeMember() {
      this.isMember = !this.isMember;
    },
    closeModal() {
      this.visable = !this.visable;
    },
    plusItem(record) {
      //商品是否存在于订单列表中
      let isHave = false;
      for (let i = 0; i < this.data.length; i++) {
        if (record && this.data[i].id == record.id) {
          isHave = true;
        }
      }
      let newGoods;
      //根据判断的值编写业务逻辑
      const serviceSelect = this.serviceSelects;
      let prodName = "";
      for (let i = 0; i < serviceSelect.length; i++) {
        if (this.serviceId == serviceSelect[i].value) {
          prodName = serviceSelect[i].label;
        }
      }
      if (!record) {
        newGoods = {
          serviceFlag: 1,
          key: this.serviceId,
          id: this.serviceId,
          prodName: prodName,
          price: this.servicePrice,
          count: 1
        };
        this.data.push(newGoods);
        this.servicePrice = null;
      } else {
        if (isHave) {
          //改变列表中商品数量
          let arr = this.data.filter(o => o.id == record.id);
          arr[0].count++;
        } else {
          newGoods = {
            ...record,
            key: record.id,
            id: record.id,
            prodName:
              record.productName +
              (record.productWeight == null ? "" : record.productWeight),
            price: record.sellPrice,
            count: 1
          };
          this.data.push(newGoods);
        }
      }

      this.getAllMoney();
    },
    minusItem(record) {
      let arr = this.data.filter(o => o.id == record.id);
      if (arr[0].count > 1) {
        arr[0].count--;
      } else {
        this.data = this.data.filter(o => o.id != record.id);
      }
      this.getAllMoney();
    },
    getAllMoney() {
      let discountSumRes = 0;
      if (this.data) {
        //计算汇总金额和数量
        this.sum = 0;
        this.data.forEach(element => {
          this.sum = this.sum + element.price * element.count;
          const id = element.id;
          if (id / 10000 > 1 && id != 10003) {
            if (this.isMember && this.currMember && this.contains) {
              discountSumRes = this.keepTwoDecimal(
                discountSumRes +
                  element.price * element.count * this.currMember.discount
              );
            } else {
              discountSumRes = this.keepTwoDecimal(
                discountSumRes + element.price * element.count
              );
            }
          } else {
            discountSumRes = this.keepTwoDecimal(
              discountSumRes + element.price * element.count * 0.95
            );
          }
        });
        if (this.isMember && this.currMember && this.contains) {
          this.discountSum = this.keepTwoDecimal(discountSumRes);
        } else {
          this.discountSum = this.keepTwoDecimal(this.sum);
        }
        this.sum = this.keepTwoDecimal(this.sum);
      }
    },
    keepTwoDecimal(num) {
      var result = parseFloat(num);
      result = Math.round(num * 100) / 100;
      return result;
    },
    filterOption(input, option) {
      return (
        option.componentOptions.children[0].text
          .toLowerCase()
          .indexOf(input.toLowerCase()) >= 0
      );
    },
    handleChange(value) {
      this.memberId = value;
    },
    changeService(e) {
      this.serviceId = e.target.value;
    },
    addServce() {
      this.plusItem(null);
    },
    selectPayType(item) {
      this.payWayId = item.value;
      this.showPayWay = item.label;
    },
    checkout() {
      if (
        this.contains &&
        this.currMember.money < this.discountSum &&
        this.payWayId == 5
      ) {
        this.warningMsgVisible = true;
      } else {
        if (this.contains && this.currMember == null) {
          this.$message.error("尚未选择会员");
          return;
        }
        if (this.payWayId == -1) {
          this.$message.error("请选择支付方式");
          return;
        }
        this.confirmVisible = true;
        let itemInfo;
        if (this.isMember) {
          itemInfo = {
            isMember: 1,
            id: this.memberId,
            money: this.discountSum
          };
        } else {
          itemInfo = {
            isMember: 0,
            id: null,
            money: this.sum
          };
        }
        const data = this.data;
        let services = [];
        let products = [];
        console.log(data);
        for (let i = 0; i < data.length; i++) {
          if (data[i].serviceFlag == 0) {
            let product = {
              id: data[i].id,
              number: data[i].count,
              price: data[i].sellPrice
            };
            products.push(product);
          } else {
            let service = {
              serviceId: data[i].id,
              price: data[i].price
            };
            services.push(service);
          }
        }

        itemInfo = {
          ...itemInfo,
          services: services,
          products: products,
          payWayId: this.payWayId
        };
        this.itemInfo = itemInfo;
        console.log(itemInfo);
      }
    },
    cancelWarningModal() {
      this.warningMsgVisible = !this.warningMsgVisible;
    },
    closeRecharge() {
      this.rechargeVisible = !this.rechargeVisible;
    },
    cancelSuccessModal() {
      this.successMsgVisible = !this.successMsgVisible;
    },
    showSuccessModal(msg) {
      this.successMsgVisible = true;
      this.successTitle = msg;
    },
    cancelConfirmModal() {
      this.confirmVisible = !this.confirmVisible;
    }
  }
};
</script>

<style scoped lang="less">
.account {
  height: 100%;
  /deep/ .prodName {
    width: 48%;
    text-align: center;
  }
  /deep/ .price {
    width: 18%;
    text-align: center;
  }
  /deep/ .ant-table-row-cell-last {
    text-align: center;
  }
  /deep/ .ant-table-tbody {
    text-align: center;
  }
  /deep/ .calcBtn {
    color: rgba(0, 0, 0, 0.25);
    margin: auto 0;
  }
  /deep/.countNum {
    margin: auto 5px;
    margin-left: 7px;
  }
  .leftNav {
    padding: 10px;
    float: left;
    border: 2px solid #eeeeee;
    width: 40%;
    height: 100%;
    position: relative;
    .payfor {
      height: 10%;
      width: 100%;
      position: absolute;
      bottom: 0;
      left: 0;

      /deep/ .ant-btn {
        height: 50%;
        width: 100%;
        font-size: 18px;
        font-weight: 700;
      }

      /deep/ .ant-dropdown-trigger {
        color: black;
        font-size: 16px;
        width: 100%;
        font-weight: 500;
        height: 50%;
        margin-bottom: 5px;
      }
    }
    /deep/ .memberBox {
      /deep/ .memberInfo {
        width: 100%;
        margin: 10px 0px;
        margin-bottom: 0;
        /deep/ .ant-input-sm {
          width: 30%;
          float: left;
        }
        /deep/ .ant-btn-sm {
          float: left;
        }
        .percent {
          color: #000;
          margin-left: 5%;
          width: 15%;
        }
        .masterName {
          color: #000;
          margin-left: 5%;
          width: 30%;
        }
      }
    }
    /deep/ .ant-table-footer {
      .sumTitle {
        float: left;
        margin-left: 20px;
      }
      .sumValue {
        float: right;
        margin-right: 20px;
        text-decoration: line-through;
        color: red;
      }
      .discountSum {
        float: right;
        margin-right: 20px;
      }
    }
  }
  .rightside {
    padding: 10px;
    margin-left: 10px;
    float: left;
    width: 58%;
    height: 100%;
    border: 2px solid #eeeeee;
    .service {
      margin-top: 15%;
      /deep/ .ant-btn-lg {
        width: 30%;
      }
      /deep/ .ant-input-number {
        width: 20%;
      }
      .servicePrice {
        font-size: 16px;
        margin: 50px auto;
      }
    }
    /deep/ .ant-tabs-tab {
      font-size: 16px;
    }
    /deep/ .ant-tabs-bar {
      margin-bottom: 5px;
    }
    /deep/ .ant-tabs-nav-wrap {
      text-align: left;
    }
  }
  .clearfix {
    clear: both;
  }
}
/deep/ .ant-dropdown-menu-item {
  font-size: 16px;
}
</style>
