export default {
  data() {
    return {
      columns: [
        {
          title: "ID",
          key: "id",
          minWidth: 100,
          align: "center",
        },
        {
          minWidth: 100,

          title: "名称",
          key: "name",
          align: "center",
        },
        {
          minWidth: 100,

          title: "类型",
          key: "websiteType",
          align: "center",
          slot: "websiteType",
        },
        {
          minWidth: 200,

          title: "域名",
          key: "websiteUrl",
          align: "center",
          minWidth: 180,
        },
        {
          minWidth: 100,
          title: "创建时间",
          sortable: true,

          key: "createDate",
          align: "center",
          render: (h, params) => {
            return h("span", this.common.format(params.row.createDate));
          },
        },
        {
          minWidth: 100,

          title: "创建人",
          key: "createByName",
          align: "center",
        },
        {
          minWidth: 100,

          title: "当前状态",
          key: "status",
          slot: "status",
          align: "center",
        },
        {
          title: "操作",
          slot: "operate",
          align: "center",
          minWidth: 250,
          fixed: "right",
        },
      ],
      queryListConfig: [
        {
          type: "input",
          label: "名称",
          field: "name",
        },
        {
          type: "input",
          label: "域名",
          field: "websiteUrl",
        },
        {
          type: "select",
          label: "类型",
          field: "websiteType",
          options: this.common.siteTypeOptions,
        },
        {
          type: "select",
          label: "状态",
          field: "status",
          options: this.common.dataStatus,
        },
      ],
    };
  },
};
