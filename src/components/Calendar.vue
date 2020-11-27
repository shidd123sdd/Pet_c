<template>
  <div class="box">
    <VueCalendarWeek v-model="value" @click="getDate" />
    <div class="forwardInfo">
      <div class="innerBox">
        <div class="title">上午</div>
        <div class="list" v-for="(item, index) in morning" :key="index">
          <div class="time" @click="updateForward(item)">
            {{ item.timeName }}
          </div>
          <div class="master">{{ item.masterName }}</div>
          <div class="pet">{{ item.petName }}</div>
          <div class="petType">{{ item.petTypeName }}</div>
          <div class="service">{{ item.serviceName }}</div>
          <div class="clearfix"></div>
        </div>
      </div>
      <div class="innerBox">
        <div class="title">下午</div>
        <div class="list" v-for="(item, index) in afternoon" :key="index">
          <div class="time" @click="updateForward(item)">
            {{ item.timeName }}
          </div>
          <div class="master">{{ item.masterName }}</div>
          <div class="pet">{{ item.petName }}</div>
          <div class="petType">{{ item.petTypeName }}</div>
          <div class="service">{{ item.serviceName }}</div>
          <div class="clearfix"></div>
        </div>
      </div>
    </div>
    <div>
      <a-button type="primary" class="btn" @click="changeModal">
        添加预约
      </a-button>
      <div class="clearfix"></div>
    </div>
    <ForwardModal
      @closeModal="closeModal"
      :visable="visable"
      :isUpdate="isUpdate"
      :forwardInfo="forwardInfo"
      :nowStr="nowStr"
    />
  </div>
</template>

<script>
import VueCalendarWeek from "vue-calendar-week";
import ForwardModal from "./ForwardModal";
export default {
  data() {
    return {
      value: new Date(),
      morning: [],
      afternoon: [],
      visable: false,
      isUpdate: false,
      forwardInfo: {},
      nowStr: ""
    };
  },
  components: {
    VueCalendarWeek,
    ForwardModal
  },
  watch: {
    "$store.state.forward.afternoon"() {
      this.afternoon = this.$store.state.forward.afternoon;
    },
    "$store.state.forward.morning"() {
      this.morning = this.$store.state.forward.morning;
    }
  },
  methods: {
    getDate(value) {
      let d = new Date(value);
      let nowStr =
        d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
      this.nowStr = nowStr;
      this.$store.dispatch({
        type: "forward/getForwardList",
        forwardDate: nowStr
      });
    },
    closeModal() {
      this.visable = !this.visable;
    },
    updateForward(item) {
      this.isUpdate = true;
      this.visable = true;
      this.forwardInfo = item;
    },
    changeModal() {
      this.isUpdate = false;
      this.visable = true;
    }
  }
};
</script>

<style scoped lang="less">
.box {
  margin-top: 30px;
  .btn {
    float: right;
    margin-right: 50px;
    margin-top: 50px;
  }
  .clearfix {
    clear: both;
  }
  .forwardInfo {
    margin-top: 20px;
    .innerBox {
      display: block;
      border: solid 1px rgba(82, 71, 71, 0.349);
      width: 45%;
      height: 304px;
      margin: 5px 20px;
      float: left;
      .title {
        height: 40px;
        background: #e2e2e2;
        padding-top: 5px;
        font-size: 18px;
        width: 100%;
        border-bottom: solid 1px rgba(82, 71, 71, 0.349);
      }
      .blank {
        height: 10px;
      }
      .list {
        padding: 10px 0;
        font-size: 16px;
        .time {
          width: 20%;
          float: left;
        }
        .petType {
          width: 20%;
          float: left;
        }
        .master {
          width: 20%;
          float: left;
        }
        .pet {
          width: 20%;
          float: left;
        }
        .service {
          width: 20%;
          float: left;
        }
        .clearfix {
          clear: both;
        }
      }
    }
  }
}
</style>
