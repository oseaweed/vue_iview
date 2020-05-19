<template>
  <div>
    <TableQuery :queryList="queryListConfig" @submitQuery="getList"></TableQuery>
    <div class="layout-pd">
      <div class="add">
        <i-button type="primary" size="default" @click="addModal=true,title='新增页面',activeItem=null">
          <Icon type="ios-add" />添加
        </i-button>
      </div>
      <div class>
        <Table :columns="columns" :data="dataList">
          <template slot-scope="{row }" slot="status">
            <span>{{common.filterLabel(row.status,"dataStatus")}}</span>
          </template>

          <template slot-scope="{row, index}" slot="operate">
            <a @click="editItem(row)">编辑</a>
            <a @click="del(row)" class="del">删除</a>
          </template>
        </Table>
      </div>
      <Page :total="dataCount" :page-size="pageSize" @on-change="getCurrent" />
      <!-- 编辑弹窗 -->
      <Modal
        v-model="addModal"
        :title="title"
        :mask-closable="false"
        :closable="false"
        :width="570"
      >
        <PageForm ref="pageForm" v-if="addModal" :pageForm="activeItem"></PageForm>
        <div slot="footer">
          <Button @click="addModal=false">取消</Button>
          <Button type="primary" @click="confirm">确定</Button>
        </div>
      </Modal>
      <!-- 删除确认 -->
      <Modal
        v-model="delModal"
        title="删除"
        :mask-closable="false"
        :closable="false"
        @on-close="delModal=false"
        @on-ok="deleteItem"
      >
        <p class="msg">您确定删除当前数据吗？</p>
      </Modal>
    </div>
  </div>
</template>
<script>
import PageForm from "./PageForm";
import pageMixin from "./table.js";
import TableQuery from "@/components/list/tableQuery";

import * as Api from "@/api/website.js";
export default {
  mixins: [pageMixin],
  components: {
    PageForm,
    TableQuery
  },
  mounted() {
    this.getList();
  },

  data() {
    return {
      pageSize: 10,
      dataCount: 0,
      currentPage: 1,
      dataList: [],
      addModal: false,
      delModal: false,
      title: "新增页面",
      activeItem: null
    };
  },
  methods: {
    getList(params) {
      const queryParmas = { page: this.currentPage, pageSize: 10, ...params };
      Api.getPageList(queryParmas).then(res => {
        this.dataList = res.data.list;
        this.dataCount = res.data.total;
      });
    },
    // 获取当前所在页
    getCurrent(index) {
      this.currentPage = index;
      this.getList();
    },

    confirm() {
      if (!this.$refs.pageForm.isValid()) {
        return;
      }

      if (this.activeItem) {
        this.update();
        return;
      }
      this.addItem();
    },
    async addItem() {
      return new Promise((resolve, reject) => {
        Api.addPage(this.$refs.pageForm.formData).then(res => {
          if (res.status === 0) {
            this.addModal = false;
            this.getList();
          } else {
            this.$Message.error(res.message);
          }
        });
      });
    },
    // 修改
    async update() {
      return new Promise((resolve, reject) => {
        Api.updatePageItem(this.activeItem).then(res => {
          if (res.status === 0) {
            this.addModal = false;
            this.getList();
          } else {
            this.$Message.error(res.message);
          }
        });
      });
    },
    editItem(item) {
      this.title = "编辑页面";
      this.activeItem = JSON.parse(JSON.stringify(item));
      this.addModal = true;
    },
    deleteItem() {
      Api.delPageItem(this.activeItem.id).then(res => {
        if (res.status === 0) {
          this.$Notice.success({
            title: "删除成功"
          });
          this.delModal = false;
          this.getPage();
          this.getList();
        } else {
          this.$Message.error(res.message);
        }
      });
    },
    del(row) {
      this.activeItem = row;
      this.delModal = true;
    },
    // 删除最后一条重新计算
    getPage() {
      const totalPage = Math.ceil((this.dataCount - 1) / this.pageSize); // 总页数
      this.currentPage =
        this.currentPage > totalPage ? totalPage : this.currentPage;
    }
  }
};
</script>
<style lang="scss" scoped>
.add {
  margin: 0 10px 20px 0;
  text-align: right;
}
a {
  margin-right: 10px;
  color: #fff;
  background: $themeColor;
  padding: 4px 9px;
  font-size: 12px;
  display: inline-block;
  border-radius: 7px;
}
</style>