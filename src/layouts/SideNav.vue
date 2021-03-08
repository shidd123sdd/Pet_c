<template>
  <div id="sideNav">
    <a-layout-sider
      width="200"
      style="background: #fff"
      :trigger="null"
      v-show="!isHide"
    >
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
    <div class="icon">
      <a-icon
        :type="isHide ? 'menu-unfold' : 'menu-fold'"
        @click="() => (isHide = !isHide)"
      />
    </div>
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
      navList: list,
      isHide: false
    };
  }
};
</script>

<style scoped lang="less">
#sideNav {
  /deep/ .icon {
    width: 40px;
    height: 40px;
    position: fixed;
    left: 20px;
    top: 20px;
    float: left;
    /deep/ .anticon {
      font-size: 25px;
      color: white;
    }
  }
  /deep/ .ant-layout-sider {
    height: 100%;
    /deep/ .ant-menu {
      justify-content: center;
      /deep/.ant-menu-item {
        margin-top: 15px;
        font-size: 16px;
      }
    }
  }
}
</style>
