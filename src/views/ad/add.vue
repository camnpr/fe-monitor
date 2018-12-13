<template>
<div v-cloak>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="标题" prop="title">
            <el-col :span="11">
                <el-input v-model="ruleForm.title" :maxlength="titleLen" clearable></el-input>
            </el-col>
      </el-form-item>
      <el-form-item label="类型" prop="type">
            <el-col :span="11" >
                <el-select v-model="ruleForm.type" placeholder="类型"  >
                  <el-option v-for="item in adTypeList" :key="item.key" :label="item.name" :value="item.key">
                  </el-option>
                </el-select>
             </el-col>
      </el-form-item>
      <el-form-item label="宣传图" prop="pic">
        <el-col :span="11" >
          <el-upload
            class="avatar-uploader"
            :action="uploadUrl"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="ruleForm.pic" :src="ruleForm.pic" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-col>
      </el-form-item>
      <el-form-item label="链接地址" prop="url">
        <el-col :span="11" >
            <el-input v-model="ruleForm.url" placeholder="/pages/home_detail?code=019"></el-input>
        </el-col>
      </el-form-item>
      <!-- <el-form-item label="更新时间" >
        <el-col :span="5" >
          <el-form-item prop="updatetime" >
            <el-date-picker type="date" placeholder="添加时间" v-model="ruleForm.updatetime" style="width: 100%;"></el-date-picker>
          </el-form-item>
        </el-col>
      </el-form-item> -->
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">添加</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
</div>
</template>
<script>
import { Message } from "element-ui";
import { global } from "src/global/global";
import { api } from "src/global/api";
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      uploadUrl: "",
      titleLen: 45,
      ruleForm: {
        title: "", // 标题
        type: "0", // 类型
        pic: "", // 图片
        url: "", // 链接地址
        updatetime: "" //更新时间
      },
      rules: {
        title: [
          { required: true, message: "请输入广告标题", trigger: "blur" },
          { min: 2, max: 45, message: "长度在 2 到 45 个字符", trigger: "blur" }
        ],
        pic: { required: true, message: "请上传宣传图片", trigger: "blur" },
        url: { required: true, message: "请输入广告跳转的地址（可以相对地址）", trigger: "blur" },
      }
    };
  },
  mounted() {
    var that = this;
    that.uploadUrl = api.adUpload;
  },
  computed: mapGetters(['adTypeList']),
  methods: {
    handleAvatarSuccess(res, file) {
      if (res.code==1) {
        this.ruleForm.pic = res.res; //URL.createObjectURL(file.raw);
      } else {
        this.$message.error("上传失败");
      }      
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },

    submitForm(formName) {
      let that = this;
      
      that.$refs[formName].validate(valid => {
        if (valid) {
          global.post(
            api.adAdd,
            that.ruleForm,
            null,
            function(res) {
              console.log(res, "add");
              if (res.code==1) {
                that.$router.push("/ad/list");
              } else {
                that.$message.error(res.msg || "操作失败");
              }
            },
            function(err) {that.$message.error(err || "未知错误");}
          );
        } else {
          that.$message.error(res.msg || "验证失败，请重填");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style scoped>
[v-cloak] {
  display: none;
}
.component-item {
  margin-top: 100px;
}
.code-part {
  margin-top: 20px;
}
</style>
