
<template>
  <div class="layout">
    <Layout>
      <Sider ref="side1" breakpoint="md" hide-trigger collapsible :collapsed-width="78" v-model="isCollapsed">
        <Menu
          active-name
          theme="dark"
          width="auto"
          :class="menuitemClasses"
          @on-select="changeNenu"
        >
          <div class="layout-logo-left" :class="{'closeImg':isCollapsed,'openImg':!isCollapsed}">
            <img :src="logo" alt />
          </div>
          <Submenu name="1">
            <template slot="title">
              <Icon type="ios-navigate"></Icon>
              <span>站点管理</span>
            </template>
            <MenuItem name="website">
              <Icon type="ios-search"></Icon>站点管理
            </MenuItem>
            <MenuItem name="page">
              <Icon type="ios-search"></Icon>页面管理
            </MenuItem>
          </Submenu>
          <MenuItem name="templete">
            <Icon type="ios-search"></Icon>
            <span>内容管理</span>
          </MenuItem>
          <MenuItem name="1-3">
            <Icon type="ios-settings"></Icon>
            <span>渠道管理</span>
          </MenuItem>
        </Menu>
      </Sider>
      <Layout>
        <Header :style="{padding: 0}" class="layout-header-bar">
          <Icon
            @click.native="collapsedSider"
            :class="rotateIcon"
            :style="{margin: '0 20px'}"
            type="md-menu"
            size="24"
          ></Icon>
        </Header>
        <Content :style="{margin: '20px', background: '#fff'}">
          <router-view />
        </Content>
        <div class="layout-copy">2011-2016 &copy; TalkingData</div>
      </Layout>
    </Layout>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isCollapsed: false,
      logo: require("../assets/imgs/logo_open.png")
    };
  },
  computed: {
    rotateIcon() {
      return ["menu-icon", this.isCollapsed ? "rotate-icon" : ""];
    },
    menuitemClasses() {
      return ["menu-item", this.isCollapsed ? "collapsed-menu" : ""];
    }
  },
  methods: {
    collapsedSider() {
      this.$refs.side1.toggleCollapse();

      if (!this.isCollapsed) {
        this.logo = require("../assets/imgs/logo_open.png");
      } else {
        this.logo = require("../assets/imgs/logo_close.png");
      }
    },
    // 菜单切换
    changeNenu(active) {
      console.log(active);
      this.$router.push(active);
    }
  }
};
</script>
<style scoped lang='scss'>
.layout {
  border: 1px solid #d7dde4;
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
}
.layout-header-bar {
  background: #fff;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
  text-align: left;
}
.layout-logo-left {
  height: 30px;
  border-radius: 3px;
  text-align: center;
  padding-top: 15px;
  margin-bottom: 35px;
}
.openImg img {
  height: 30px;
}
.closeImg {
  padding-top: 0;
  img {
    height: 60px;
  }
}
.ivu-layout-content {
  position: relative;
}
.menu-icon {
  transition: all 0.3s;
}
.rotate-icon {
  transform: rotate(-90deg);
}
.menu-item span {
  display: inline-block;
  overflow: hidden;
  width: 69px;
  text-overflow: ellipsis;
  white-space: nowrap;
  vertical-align: bottom;
  transition: width 0.2s ease 0.2s;
}
.menu-item i {
  transform: translateX(0px);
  transition: font-size 0.2s ease, transform 0.2s ease;
  vertical-align: middle;
  font-size: 16px;
}
.collapsed-menu span {
  width: 0px;
  transition: width 0.2s ease;
}
.collapsed-menu /deep/.ivu-menu-submenu-title-icon {
  display: none;
  transition: width 0.2s ease;
}
.collapsed-menu i {
  transform: translateX(5px);
  transition: font-size 0.2s ease 0.2s, transform 0.2s ease 0.2s;
  vertical-align: middle;
  font-size: 22px;
}
.collapsed-menu /deep/ .ivu-menu {
  display: none;
  transition: width 0.2s ease;
}
.layout-copy {
  background: #fff;
  padding: 15px;
}
.ivu-menu-dark {
  background: #283044;
}
/deep/ .ivu-menu-dark.ivu-menu-vertical .ivu-menu-submenu .ivu-menu-item-active,
.ivu-menu-dark.ivu-menu-vertical .ivu-menu-submenu .ivu-menu-item-active:hover {
  background: #edab12;
  color: #fff;
}
/deep/.ivu-menu-dark.ivu-menu-vertical
  .ivu-menu-opened
  .ivu-menu-submenu-title {
  background: #121826;
  color: #fff;
}
/deep/ .ivu-menu-dark.ivu-menu-vertical .ivu-menu-item,
.ivu-menu-dark.ivu-menu-vertical .ivu-menu-submenu-title {
  background: #283044;
  color: #fff;
}
/deep/ .ivu-menu-dark.ivu-menu-vertical .ivu-menu-opened .ivu-menu-item{
  background: #121826;

  color: #fff;

}
</style>