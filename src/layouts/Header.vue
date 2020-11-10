<template>
  <div>
    <a-layout id="components-layout-demo-top-side-2">
      <a-layout-header class="header">
        <div class="logo"><span>这有家宠物店</span></div>
        <a-menu
          theme="dark"
          mode="horizontal"
          :default-selected-keys="['2']"
          :style="{ lineHeight: '64px' }"
        >
          <a-menu-item key="1">
            nav 1
          </a-menu-item>
          <a-menu-item key="2">
            nav 2
          </a-menu-item>
          <a-menu-item key="3">
            nav 3
          </a-menu-item>
        </a-menu>
      </a-layout-header>
    </a-layout>
  </div>
</template>

<script>
export default {};
</script>

<style scoped lang="less">
#components-layout-demo-top-side-2 .logo {
  width: 120px;
  height: 31px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px 28px 16px 0;
  float: left;
  color: #fff;
  text-align: center;
  line-height: 30px;
  font-size: 16px;
  font-weight: 900;
}
</style>
