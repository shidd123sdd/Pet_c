<template>
  <div>
    <a-table
      :columns="columnMorning"
      :data-source="morning"
      bordered
      size="middle"
      :pagination="false"
    >
      <template slot="action" slot-scope="text, record">
        <span v-if="record.finishFlg == 0">
          <a class="actions" @click="editModal(text, record)">修改</a>
          <a-popconfirm
            title="请确认是否删除该记录"
            ok-text="Yes"
            cancel-text="No"
            @confirm="confirm(text, record)"
          >
            <a class="actions">删除</a>
          </a-popconfirm>
          <a class="actions" @click="accountHandle(text, record)">结算</a>
        </span>
        <span v-else>
          <a class="finish">已结单</a>
        </span>
      </template>
    </a-table>

    <a-table
      :columns="columnAfternoon"
      :data-source="afternoon"
      bordered
      size="middle"
      :pagination="false"
    >
      <template slot="action" slot-scope="text, record">
        <span v-if="record.finishFlg == 0">
          <a class="actions" @click="editModal(text, record)">修改</a>
          <a-popconfirm
            title="请确认是否删除该记录"
            ok-text="Yes"
            cancel-text="No"
            @confirm="confirm(text, record)"
          >
            <a class="actions">删除</a>
          </a-popconfirm>
          <a class="actions" @click="accountHandle(text, record)">结算</a>
        </span>
        <span v-else>
          <a class="finish">已结单</a>
        </span>
      </template>
    </a-table>
    <ForwardAccountModal
      @closeAccountModal="closeAccountModal"
      :visible="visible"
      :record="record"
    />
  </div>
</template>

<script>
const columnMorning = [
  {
    title: "上午",
    children: [
      {
        title: "时间",
        dataIndex: "timeName",
        key: "timeName",
        align: "center",
        width: "8%"
      },
      {
        title: "主人姓名",
        dataIndex: "masterName",
        key: "masterName",
        align: "center",
        width: "8%"
      },
      {
        title: "宠物名字",
        dataIndex: "petName",
        key: "petName",
        align: "center",
        width: "8%"
      },
      {
        title: "品种",
        dataIndex: "petTypeName",
        key: "petTypeName",
        align: "center",
        width: "8%"
      },
      {
        title: "项目",
        dataIndex: "serviceName",
        key: "serviceName",
        align: "center",
        width: "8%"
      },
      {
        title: "操作",
        dataIndex: "",
        width: "8%",
        align: "center",
        scopedSlots: { customRender: "action" }
      }
    ]
  }
];
const columnAfternoon = [
  {
    title: "下午",
    children: [
      {
        title: "时间",
        dataIndex: "timeName",
        key: "timeName",
        align: "center",
        width: "8%"
      },
      {
        title: "主人姓名",
        dataIndex: "masterName",
        key: "masterName",
        align: "center",
        width: "8%"
      },
      {
        title: "宠物名字",
        dataIndex: "petName",
        key: "petName",
        align: "center",
        width: "8%"
      },
      {
        title: "品种",
        dataIndex: "petTypeName",
        key: "petTypeName",
        align: "center",
        width: "8%"
      },
      {
        title: "项目",
        dataIndex: "serviceName",
        key: "serviceName",
        align: "center",
        width: "8%"
      },
      {
        title: "操作",
        dataIndex: "",
        width: "8%",
        align: "center",
        scopedSlots: { customRender: "action" }
      }
    ]
  }
];
import ForwardAccountModal from "./ForwardAccountModal";
const data = [];
export default {
  props: {
    afternoon: {
      type: Array
    },
    morning: {
      type: Array
    },
    nowStr: {
      type: String
    }
  },
  data() {
    return {
      data,
      columnMorning,
      columnAfternoon,
      visible: false,
      record: null
    };
  },
  methods: {
    editModal(record) {
      this.$emit("updateItem", record);
      console.log(record);
    },
    confirm(record) {
      this.$store.dispatch({
        type: "forward/deleteRecord",
        id: record.id,
        forwardDate: record.forwardDate
      });
    },
    closeAccountModal() {
      this.visible = !this.visible;
    },
    accountHandle(text, record) {
      this.record = record;
      this.visible = true;
    }
  },
  components: {
    ForwardAccountModal
  }
};
</script>

<style scoped lang="less">
.actions {
  margin: auto 5px;
}
</style>
