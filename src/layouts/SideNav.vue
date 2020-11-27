<template>
  <div id="sideNav">
    <a-layout-sider width="200" style="background: #fff" :trigger="null">
      <a-menu style="width: 200px">
        <a-menu-item
          v-for="item in navList"
          :key="item.id"
          @click="
            () =>
              $router.push({
                path: item.navPath
              })
          "
        >
          <a-icon type="calendar" />
          {{ item.navName }}
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
  </div>
</template>

<script>
export default {
  beforeCreate() {
    this.$store.dispatch({
      type: "nav/initNav"
    });
    this.$store.dispatch({
      type: "petType/getPetTypeInfo"
    });
  },
  watch: {
    "$store.state.nav.navList"() {
      this.navList = this.$store.state.nav.navList;
    }
  },
  data() {
    const list = JSON.parse(sessionStorage.getItem("navList"));
    return {
      navList: list
    };
  }
};
</script>

<style scoped lang="less">
#sideNav /deep/ .ant-layout-sider {
  height: 1024px;
  /deep/ .ant-menu {
    justify-content: center;
    /deep/.ant-menu-item {
      margin-top: 15px;
      font-size: 16px;
    }
  }
}
</style>
