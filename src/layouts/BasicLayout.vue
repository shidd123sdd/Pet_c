<template>
  <div>
    <a-layout id="components-layout-demo-top-side-2">
      <Header />
      <a-layout>
        <SideNav />
        <a-layout style="padding: 0 24px; height: 740px">
          <a-layout-content
            :style="{
              background: '#fff',
              padding: '24px',
              margin: 0
            }"
          >
            <router-view />
          </a-layout-content>
        </a-layout>
      </a-layout>
    </a-layout>
  </div>
</template>

<script>
import Header from "./Header";
import SideNav from "./SideNav";
export default {
  data() {
    return {
      collapsed: false
    };
  },
  components: {
    Header,
    SideNav
  }
};
</script>

<style scoped>
#components-layout-demo-top-side-2 .logo {
  width: 120px;
  height: 31px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px 28px 16px 0;
  float: left;
}
</style>
