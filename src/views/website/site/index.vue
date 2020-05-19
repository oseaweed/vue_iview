<template>
  <div>
    <TableQuery :queryList="queryListConfig" @submitQuery="getList"></TableQuery>

    <div class="layout-pd">
      <div class="add">
        <i-button type="primary" size="default" @click="addModal=true">
          <Icon type="ios-add" />添加
        </i-button>
      </div>
      <div class="table-ly">
        <Table :columns="columns" :data="dataList">
          <template slot-scope="{row }" slot="status">
            <span>{{common.filterLabel(row.status,"dataStatus")}}</span>
          </template>
          <template slot-scope="{row }" slot="websiteType">
            <span>{{common.filterLabel(row.websiteType,"siteTypeOptions")}}</span>
          </template>
          <template slot-scope="{row, index}" slot="operate">
            <router-link to>进入管理平台</router-link>
            <a @click="editItem(row)">编辑</a>
            <a @click="deleteItem(row)" class="del">删除</a>
          </template>
        </Table>
      </div>

      <Page
        :total="dataCount"
        :page-size="pageSize"
        :current="currentPage"
        @on-change="getCurrent"
      />
      <!-- 新增弹窗 -->
      <Modal v-model="addModal" :title="title" :mask-closable="false" :closable="false">
        <p class="msg" v-if="curModal===2">添加成功，请联系运维人员完善站点内容。</p>
        <component :is="curCom" ref="component"></component>
        <div slot="footer">
          <Button @click="cancel(0)">取消</Button>
          <Button type="primary" @click="modaleOk">{{btnText}}</Button>
        </div>
      </Modal>
      <!-- 编辑弹窗 -->
      <Modal v-model="editModal" :title="title" :mask-closable="false" :closable="false">
        <AddCom :editFirData="activeItem" v-if="editModal" ref="addCom"></AddCom>
        <OtherCom :editSecData="activeItem" v-if="editModal" ref="otherCom"></OtherCom>
        <div slot="footer">
          <Button @click="cancel(1)">取消</Button>
          <Button type="primary" @click="update">{{btnText}}</Button>
        </div>
      </Modal>
      <!-- 删除确认 -->
      <Modal
        v-model="delModal"
        title="删除"
        :mask-closable="false"
        :closable="false"
        @on-close="cancel(2)"
        @on-ok="confirmDel"
      >
        <p class="msg">您确定删除当前数据吗？</p>
      </Modal>
    </div>
  </div>
</template>
<script>
import AddCom from "./BaseSiteForm";
import OtherCom from "./OtherSiteForm";
import TableQuery from "@/components/list/tableQuery";
import siteMixin  from "./table.js";
import * as Api from "@/api/website.js";
export default {
  components: {
    AddCom,
    OtherCom,
    TableQuery
  },
  mixins: [siteMixin],
  data() {
    return {
      title: "添加站点",
      addModal: false,
      editModal: false,
      delModal: false,
      btnText: "下一步",
      pageSize: 10,
      dataCount: 0,
      currentPage: 1,
      addId: null,

      dataList: [],
      curModal: 1,
      curCom: AddCom,
      activeItem: null

    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    async modaleOk() {
      // 站点新增
      if (this.$refs.component) {
        const valid = this.$refs.component.isValid();
        if (!valid) {
          return;
        }
      }

      // 新增站点id
      if (this.curModal === 1) {
        await this.subBaseSit();
        this.curModal = 2;
        this.title = "";
        this.curCom = "";
        this.btnText = "继续添加";
        return;
      }
      if (this.curModal === 2) {
        this.title = "站点维护";
        this.curCom = "OtherCom";
        this.curModal = 3;
        this.btnText = "提交";

        return;
      }
      if (this.curModal === 3) {
        await this.subOtherSit();
        this.cancel();
      }
    },

    // 站点基本数据添加
    async subBaseSit() {
      return new Promise((resolve, reject) => {
        Api.addSite(this.$refs.component.formCustom).then(res => {
          if (res.status === 0) {
            this.addId = res.data;
            resolve();
          } else {
            this.$Message.error(res.message);
          }
        });
      });
    },

    // 补充IP信息
    async subOtherSit() {
      return new Promise((resolve, reject) => {
        let data = this.$refs.component.formNext;
        data.id = this.addId;
        Api.addSiteNext(data).then(res => {
          if (res.status === 0) {
            resolve();
          } else {
            this.$Message.error(res.message);
          }
        });
      });
    },
    cancel(num) {
      if (num === 2) {
        this.delModal = false;
        return;
      }
      if (num === 1) {
        this.editModal = false;
        return;
      }
      this.getList();
      this.btnText = "下一步";
      this.addModal = false;
      this.curModal = 1;
      this.curCom = "";
      setTimeout(() => {
        this.curCom = "AddCom";
      });
      this.title = "添加站点";
    },

    getList(params) {
      const queryParmas = { page: this.currentPage, pageSize: 10, ...params };
      Api.getSiteList(queryParmas).then(res => {
        this.dataList = res.data.list;
        this.dataCount = res.data.total;
      });
    },
    deleteItem(item) {
      this.delModal = true;
      this.activeItem = item;
    },
    editItem(item) {
      this.btnText = "提交";
      this.activeItem = JSON.parse(JSON.stringify(item));
      this.editModal = true;
    },

    // 修改
    update() {
      if (!this.$refs.addCom.isValid()) {
        return;
      }
      if (!this.$refs.otherCom.isValid()) {
        return;
      }
      Api.updateSiteItem(this.activeItem).then(res => {
        if (res.status === 0) {
          this.editModal = false;
          this.getList();
        } else {
          this.$Message.error(res.message);
        }
      });
    },

    // 确认删除
    confirmDel() {
      Api.delSiteItem(this.activeItem.id).then(res => {
        if (res.status === 0) {
          this.delModal = false;
          this.$Notice.success({
            title: "删除成功"
          });
          this.getPage();
          this.getList();
        } else {
          this.$Message.error(res.message);
        }
      });
    },

    // 获取当前所在页
    getCurrent(index) {
      this.currentPage = index;
      this.getList();
    },
    // 删除最后一条重新计算
    getPage() {
      const totalPage = Math.ceil((this.dataCount - 1) / this.pageSize); // 总页数
      this.currentPage =
        this.currentPage > totalPage ? totalPage : this.currentPage;
    }
    // 列表查询
    // queryTable(params){
    //   console.log(11,params)
    // }
  }
};
</script>
<style lang="scss" scoped>
.add {
  margin: 0 10px 20px 0;
  text-align: right;
}
.msg {
  line-height: 130px;
  text-align: center;
  font-size: 16px;
  font-weight: bold;
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
