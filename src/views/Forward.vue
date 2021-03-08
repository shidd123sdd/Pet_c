<template>
  <div>
    <Calendar />
  </div>
</template>

<script>
import Calendar from "../components/Calendar";
import moment from "moment";
export default {
  beforeCreate() {
    this.$store.dispatch({
      type: "forward/getForwardList",
      forwardDate: moment().format("YYYY-MM-DD")
    });
  },
  components: {
    Calendar
  },
  data() {
    return {};
  },
  methods: {
    moment
  }
};
</script>

<style scoped lang="less"></style>
