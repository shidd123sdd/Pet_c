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
  Popconfirm,
  Card,
  Dropdown,
  Result,
  message
} from "ant-design-vue";
Vue.use(Layout);
Vue.use(Result);
Vue.use(message);
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
Vue.use(Card);
Vue.use(Dropdown);
Vue.config.productionTip = false;

Vue.prototype.$message = message;
message.config({
  duration: 2, // 持续时间
  top: `100px`, // 到页面顶部距离
  maxCount: 3 // 最大显示数, 超过限制时，最早的消息会被自动关闭
});
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
