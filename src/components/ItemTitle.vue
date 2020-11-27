<template>
  <div class="title">{{ title }}</div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ""
    }
  }
};
</script>

<style scoped lang="less">
.title {
  width: 100%;
  height: 40px;
  font-size: 20px;
}
</style>
