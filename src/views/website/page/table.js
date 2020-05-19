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
          title: "页面名称",
          key: "pageName",
          align: "center",
          minWidth: 100,
        },
        {
          minWidth: 150,
          title: "页面编码",
          key: "pageCode",
          align: "center",
        },
        {
          minWidth: 150,
          title: "页面描述",
          key: "pageDesc",
          align: "center",
        },
        {
          minWidth: 150,
          title: "文件地址",
          key: "filePath",
          align: "center",
        },
        {
          minWidth: 150,
          title: "页面类型",
          key: "pageType",
          align: "center",
          render: (h, params) => {
            return h(
              "span",
              this.common.filterLabel(params.row.pageType, "pageTypeOptions")
            );
          },
        },
        {
          minWidth: 150,
          title: "推广类型",
          key: "deviceType",
          align: "center",
        },
        {
          minWidth: 150,
          title: "是否允许复用",
          key: "canReuse",
          align: "center",
          render: (h, params) => {
            return h("span", params.row.canReuse ? "是" : "否");
          },
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
          fixed: "right",
          minWidth: 200,
        },
      ],
      queryListConfig: [
        {
          type: "input",
          label: "页面名称",
          field: "pageName",
        },
        {
          type: "input",
          label: "页面编码",
          field: "pageCode",
        },

        {
          type: "select",
          label: "类型",
          field: "deviceType",
          options: this.common.typeOptions,
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
