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
      <el-form-item label="排序值" prop="sort">
        <el-col :span="11" >
          <el-input-number v-model="ruleForm.sort" :min="0" :max="999" label="值越小，越靠前排"></el-input-number>
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
      <el-form-item label="是否删除" prop="isdeleted">
        <el-col :span="11" >
          <el-switch v-model="ruleForm.isdeleted" disabled></el-switch>
        </el-col>
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-col :span="11" >
          <el-radio-group v-model="ruleForm.status">
            <el-radio label="0">审核</el-radio>
            <el-radio label="1">通过</el-radio>
            <el-radio label="2">不通过</el-radio>
          </el-radio-group>
        </el-col>
      </el-form-item>
      <el-form-item label="更新时间" prop="update">
        <el-col :span="5" >
          <el-date-picker type="datetime" format="yyyy-MM-dd HH:mm:ss" placeholder="添加时间" v-model="ruleForm.update" style="width: 100%;"></el-date-picker>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
</div>
</template>
<script>
import { Message } from "element-ui";
import { global } from "src/global/global";
import { api } from "src/global/api";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      uploadUrl: "",
      titleLen: 45,
      ruleForm: {
        title: "", // 标题
        type: "0", // 类型
        sort: 0, // 排序值
        pic: "", // 图片
        url: "", // 链接地址
        isdeleted: false, // 是否删除
        status: "", // 状态
        update: "" //更新时间
      },
      rules: {
        title: [
          { required: true, message: "请输入广告标题", trigger: "blur" },
          { min: 2, max: 45, message: "长度在 2 到 45 个字符", trigger: "blur" }
        ],
        pic: { required: true, message: "请上传宣传图片", trigger: "blur" },
        url: {
          required: true,
          message: "请输入广告跳转的地址（可以相对地址）",
          trigger: "blur"
        }
      }
    };
  },

  mounted() {
    var that = this;
    that.uploadUrl = api.adUpload;
    //修改时再调用
    that.getFormData();
  },

  computed: mapGetters(["adTypeList"]),

  methods: {
    handleAvatarSuccess(res, file) {
      if (res.code == 1) {
        this.ruleForm.pic = res.res; //URL.createObjectURL(file.raw);
      } else {
        this.$message.error("上传失败");
      }
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    // 根据id查询表单数据
    getFormData: function() {
      var that = this;

      var data = that.$route.query;
      global.get(
        api.adList,
        { params: { id: data.id } },
        function(data) {
          if (data.code == 1) {
            var res = data.res;
            that.ruleForm = data.res[0];
            that.ruleForm.isdeleted = that.ruleForm.isdeleted == "False" ? false:true;
          } else {
            that.$message.error(data.msg || "获取失败");
          }
        },
        function(err) {
          that.$message.error("获取异常");
        },
        false
      );
    },
    submitForm(formName) {
      let that = this;
      that.ruleForm.action = "update";
      that.$refs[formName].validate(valid => {
        if (valid) {
          global.post(
            api.adUpdate,
            that.ruleForm,
            null,
            function(res) {
              if (res.code == 1) {
                that.$router.push("/ad/list");
              } else {
                this.$message.error(res.msg || "操作失败");
              }
            },
            function(err) {
              this.$message.error(err || "未知错误");
            }
          );
        } else {
          this.$message.error(res.msg || "验证失败，请重填");
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
