<template>
  <Form ref="formNext" :model="formNext" :rules="ruleCustom" :label-width="100">
    <FormItem label="外网IP" prop="outIp">
      <Input type="text" v-model="formNext.outIp"></Input>
    </FormItem>
    <FormItem label="内网IP" prop="inIp">
      <Input type="text" v-model="formNext.inIp"></Input>
    </FormItem>
    <FormItem label="文件目录" prop="path">
      <Input type="text" v-model="formNext.path"></Input>
    </FormItem>
    <FormItem label="SSH账号" prop="sshAccount">
      <Input type="text" v-model="formNext.sshAccount"></Input>
    </FormItem>
    <FormItem label="SSH密码" prop="sshPwd">
      <Input type="password" v-model="formNext.sshPwd" autocomplete="new-password"></Input>
    </FormItem>
  </Form>
</template>
<script>
export default {
  name: "OtherCom",
  props: ["editSecData"],
  created() {
    if (this.editSecData) {
      this.formNext = this.editSecData;
    }
  },
  data() {
    return {
      formNext: {
        outIp: "",
        inIp: "",
        path: "",
        sshAccount: "",
        sshPwd: ""
      },
      ruleCustom: {
        outIp: [
          { required: true, message: "外网IP不能为空", trigger: "blur" },
          {
            pattern: /((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})(\.((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})){3}/,
            message: "外网IP格式不正确"
          }
        ],
        inIp: [
          { required: true, message: "内网IP不能为空", trigger: "blur" },
          {
            pattern:  /((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})(\.((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})){3}/,
            message: "内网IP格式不正确"
          }
        ],
        path: [
          { required: true, message: "文件目录不能为空", trigger: "blur" }
        ],
        sshAccount: [
          { required: true, message: "SSH账号不能为空", trigger: "blur" }
        ],
        sshPwd: [
          { required: true, message: "SSH密码不能为空", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    isValid() {
      let isValid = false;
      this.$refs.formNext.validate(valid => {
        isValid = valid;
      });
      return isValid;
    }
  }
};
</script>

