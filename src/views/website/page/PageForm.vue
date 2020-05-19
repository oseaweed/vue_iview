<template>
  <Form ref="formData" :model="formData" :rules="ruleCustom" :label-width="110">
    <FormItem label="页面名称" prop="pageName">
      <Input type="text" v-model="formData.pageName"></Input>
    </FormItem>
    <FormItem label="页面编码" prop="pageCode">
      <Input type="text" v-model="formData.pageCode"></Input>
    </FormItem>
    <FormItem label="页面描述" prop="pageDesc">
      <Input type="textarea" v-model="formData.pageDesc"></Input>
    </FormItem>
    <FormItem label="文件地址" prop="filePath">
      <Upload
        :multiple="false"
        type="drag"
        :headers="{'Authorization':token}"
        :action="baseUrl+'/cms-website/pageManagement/upload'"
        :disabled="disabledUpload"
        :on-success="uploadSuccess"
        :on-error="uploadError"
        :before-upload="beforeUpload"
        :on-remove="removeFile"
        :max-size="2048"
        :on-format-error="handleFormatError"
        :on-exceeded-size="handleMaxSize"
        :default-file-list="defaultList"
        :on-preview="openFile"
      >
        <div style="padding: 20px 0">
          <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
          <p>拖拽上传</p>
        </div>
      </Upload>
    </FormItem>
    <FormItem label="页面类型" prop="pageType">
      <Select v-model="formData.pageType">
        <Option v-for="item in common.pageTypeOptions" :value="item.value">{{item.label}}</Option>
      </Select>
    </FormItem>
    <FormItem label="推广平台" prop="deviceType">
      <Select v-model="formData.deviceType">
        <Option v-for="item in common.typeOptions" :value="item.value">{{item.label}}</Option>
      </Select>
    </FormItem>
    <FormItem label="是否允许复用" prop="canReuse">
      <RadioGroup v-model="formData.canReuse">
        <Radio :label="1">允许</Radio>
        <Radio :label="2">不允许</Radio>
      </RadioGroup>
    </FormItem>
  </Form>
</template>
<script>
export default {
  name: "PageForm",
  props: ["pageForm"],
  created() {
    if (this.pageForm) {
      const num = this.pageForm.filePath.lastIndexOf("/");
      this.defaultList = [
        {
          name: this.pageForm.filePath.substr(num + 1),
          url: this.pageForm.url
        }
      ];
      this.formData = this.pageForm;
      this.disabledUpload = Boolean(this.pageForm.filePath);
    }
    // 文件请求处理
    this.baseUrl = process.env.VUE_APP_BASEURL;
    this.token = "Bearer " + sessionStorage.getItem("token");
  },

  data() {
    return {
      baseUrl: "",
      token: "",
      formData: {
        pageName: "",
        pageDesc: "",
        pageCode: "",
        pageType: "",
        canReuse: 1,
        deviceType: "",
        filePath: "",
        fileName: "",
        url: ""
      },
      disabledUpload: false,
      defaultList: [],
      uploadList: [],
      ruleCustom: {
        pageName: [
          { required: true, message: "页面名称不能为空", trigger: "blur" }
        ],
        pageDesc: [
          { required: true, message: "页面描述不能为空", trigger: "blur" }
        ],
        pageCode: [
          { required: true, message: "页面编码不能为空", trigger: "blur" }
        ],
        filePath: [{ required: true, message: "请上传文件" }],
        canReuse: [
          {
            required: true,
            message: "允许复用",
            trigger: "blur",
            type: "number"
          }
        ],
        deviceType: [
          { required: true, message: "推广类型不能为空", trigger: "blur" }
        ],
        pageType: [
          {
            required: true,
            message: "页面类型不能为空",
            trigger: "blur",
            type: "number"
          }
        ]
      }
    };
  },
  methods: {
    isValid() {
      let isValid = false;
      this.$refs.formData.validate(valid => {
        isValid = valid;
      });
      return isValid;
    },
    uploadSuccess(response, file, fileList) {
      this.formData.url = response.data.url;
      this.formData.fileName = response.data.fileName;
      this.formData.filePath = response.data.filePath;
      this.defaultList = [
        {
          name: response.data.fileName,
          url: response.data.url
        }
      ];
    },
    uploadError(error, file, fileList) {
      this.disabledUpload = false;
      this.$Notice.warning({
        title: "文件上传失败",
        desc: error
      });
    },
    beforeUpload(event, file, fileList) {
      this.disabledUpload = true;
    },
    removeFile(file, fileList) {
      (this.filePath = ""), (this.disabledUpload = false);
    },
    handleFormatError(file) {
      this.disabledUpload = false;
      this.$Notice.warning({
        title: "文件格式不正确",
        desc: "文件仅支持zip格式，请重新上传!"
      });
    },
    handleMaxSize(file) {
      this.disabledUpload = false;
      this.$Notice.warning({
        title: "文件大小限制",
        desc: "文件大小仅支持2M，请重新上传!"
      });
    },
    openFile(file) {
      window.open(file.url);
    }
  }
};
</script>

<style lang="scss" scoped>
form {
  padding-right: 43px;
}
</style>