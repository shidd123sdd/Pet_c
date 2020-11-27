<template>
  <div>
    <ItemTitle :title="title" />
    <Calendar />
  </div>
</template>

<script>
import Calendar from "../components/Calendar";
import ItemTitle from "../components/ItemTitle";

export default {
  beforeCreate() {
    let d = new Date();
    let nowStr = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
    this.$store.dispatch({
      type: "forward/getForwardList",
      forwardDate: nowStr
    });
  },
  components: {
    Calendar,
    ItemTitle
  },
  data() {
    return {
      title: "预约列表"
    };
  }
};
</script>

<style scoped lang="less"></style>
