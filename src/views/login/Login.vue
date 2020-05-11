
<template>
  <div class="flex">
    <div class="leftBg">
      <img src="@/assets/imgs/logo_open.png" alt />
    </div>
    <div class="rightForm">
      <Form ref="loginForm" class="left" :model="form" :rules="rules" inline>
        <p class="firTit left">HELLO</p>
        <p class="secTit left">
          <span>推</span> 广内容管理平台
        </p>
        <p class="title">密码登录</p>
        <FormItem prop="username">
          <Input
            prefix="ios-person-outline"
            v-model="form.username"
            placeholder="请输入账号"
            style="width: auto"
          />
        </FormItem>
        <FormItem prop="password">
          <Input
            type="password"
            prefix="ios-unlock-outline"
            v-model="form.password"
            placeholder="请输入密码"
            style="width: auto"
          />
        </FormItem>

        <Checkbox>下次自动登录</Checkbox>
        <Button type="primary" @click="handleSubmit">登录</Button>
        <p class="qr">
          <Icon type="ios-qr-scanner" />&nbsp; &nbsp; &nbsp;扫码快捷登录
        </p>
        <p class="right">忘记密码？</p>
      </Form>
    </div>
  </div>
</template>

<script>
import * as api from "@/api/user.js";
export default {
  components: {},
  data() {
    return {
      form: {
        username: "",
        password: ""
      },
      rules: {
        username: [
          { required: true, message: "账号不能为空", trigger: "blur" }
        ],
        password: [{ required: true, message: "密码不能为空", trigger: "blur" }]
      },
      errMsg: "",
      isLoginErr: false
    };
  },
  created() {
    sessionStorage.clear();
  },
  mounted() {},
  methods: {
    ...mapActions(["login"]),
    handleSubmit() {
      // 表单验证
      this.$refs.loginForm.validate(valid => {
        if (!valid) {
          return;
        }
        // 登录请求
        api.login(this.form).then(res => {
          if (res) {
            this.$router.push("/");
            sessionStorage.setItem("token", res.data.access_token);
          }
        });
      });
    }
  }
};
</script>

<style scoped lang="scss">
.leftBg {
  background: url("~@/assets/imgs/loginleft.png");
  background: url(/img/loginleft.324207df.png);
  background-size: 100% 100%;
  height: 100vh;
  width: 100%;
  img {
    margin-top: 20px;
    margin-left: 70px;
    width: 180px;
    display: block;
  }
}
.rightForm {
  text-align: center;
  margin: 55px 100px auto 100px;
  .firTit {
    color: rgb(238, 238, 238);
    font-size: 36px;
  }
  .secTit {
    font-weight: 600;
    font-size: 36px;
  }
  .secTit span {
    border-bottom: 6px solid rgb(241, 208, 30);
    float: left;
  }
  .title {
    font-size: 24px;
    padding-bottom: 10px;
    border-bottom: 2px solid rgb(241, 208, 30);
    margin-bottom: 44px;
    width: 100px;
    margin-top: 46px;
  }
  /deep/ .ivu-input {
    font-size: 14px;
    border: 0;
    border-bottom: 1px solid rgb(199, 191, 191);
    margin-bottom: 10px;
    border-radius: 0;
    width: 300px;

    &::placeholder {
      color: rgb(102, 102, 102);
    }
    &:focus {
      box-shadow: none;
    }
  }
  /deep/.ivu-checkbox-wrapper {
    display: block;
    font-size: 12px;
    text-align: left;
    margin: 20px auto 28px;
  }
  .right {
    color: rgb(153, 153, 153);
    font-size: 12px;
  }
  /deep/ .ivu-btn-primary {
    width: 300px;
  }
  .qr {
    margin: 20px auto;
    color: rgb(153, 153, 153);
    height: 46px;
  }
  /deep/ .ivu-form-item {
    margin-bottom: 0;
  }
  /deep/.ivu-btn > span {
    color: #fff;
  }
}
</style>
