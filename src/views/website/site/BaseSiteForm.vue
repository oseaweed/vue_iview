<template>
  <Form ref="formCustom" :model="formCustom" :rules="ruleCustom" :label-width="100">
    <FormItem label="站点名称" prop="name">
      <Input type="text" v-model="formCustom.name"></Input>
    </FormItem>
    <FormItem label="站点描述" prop="description">
      <Input type="textarea" v-model="formCustom.description"></Input>
    </FormItem>
    <FormItem label="站点URL" prop="websiteUrl">
      <Input type="text" v-model="formCustom.websiteUrl"></Input>
    </FormItem>
    <FormItem label="站点类型" prop="websiteType">
      <Select v-model="formCustom.websiteType" @on-change="changeType">
        <Option v-for="item in common.siteTypeOptions" :value="item.value">{{item.label}}</Option>
      </Select>
    </FormItem>

    <FormItem label="关联渠道" prop="channelId" v-if="showChannel">
      <Select v-model="formCustom.channelId">
        <Option v-for="item1 in common.channelOptions" :value="item1.value">{{item1.label}}</Option>
      </Select>
    </FormItem>
  </Form>
</template>
<script>
export default {
  name: "AddCom",
  props: ["editFirData"],
  created() {
    if (this.editFirData) {
      this.formCustom = this.editFirData;
    }
  },

  data() {
    return {
      formCustom: {
        name: "",
        description: "",
        websiteUrl: "",
        websiteType: "",
        channelId: ""
      },
      ruleCustom: {
        name: [
          { required: true, message: "站点名称不能为空", trigger: "blur" }
        ],
        description: [
          { required: true, message: "站点描述不能为空", trigger: "blur" }
        ],
        websiteUrl: [
          { required: true, message: "站点URL不能为空", trigger: "blur" }
        ],
        websiteType: [
          {
            required: true,
            message: "站点类型不能为空",
            trigger: "blur",
            type: "number"
          }
        ],
        channelId: [
          {
            required: true,
            message: "站点类型不能为空",
            trigger: "blur",
            type: "number"
          }
        ]
      },

      showChannel: false
    };
  },
  methods: {
    isValid() {
      let isValid = false;
      this.$refs.formCustom.validate(valid => {
        isValid = valid;
      });
      return isValid;
    },
    changeType(value) {
      if (value === 2) {
        this.showChannel = true;
        return;
      }
      this.showChannel = false;
    }
  }
};
</script>

