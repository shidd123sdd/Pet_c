import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import {
  Layout,
  Menu,
  Icon,
  Breadcrumb,
  Table,
  Input,
  Button,
  Modal,
  Form,
  Tabs,
  Cascader,
  Select,
  InputNumber,
  DatePicker,
  Radio,
  Popconfirm
} from "ant-design-vue";
Vue.use(Layout);
Vue.use(Menu);
Vue.use(Icon);
Vue.use(Breadcrumb);
Vue.use(Table);
Vue.use(Input);
Vue.use(Button);
Vue.use(Modal);
Vue.use(Form);
Vue.use(Tabs);
Vue.use(Cascader);
Vue.use(Select);
Vue.use(InputNumber);
Vue.use(DatePicker);
Vue.use(Radio);
Vue.use(Popconfirm);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
