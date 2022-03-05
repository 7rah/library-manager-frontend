<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="姓名">
        <el-input v-model="form.username" />
      </el-form-item>
      <el-form-item label="学号">
        <el-input v-model="form.sid" />
      </el-form-item>
      <el-form-item label="个人介绍">
        <el-input v-model="form.introduction" />
      </el-form-item>
      <el-form-item label="年龄">
        <el-input v-model="form.age" />
      </el-form-item>
      <el-form-item label="性别">
        <el-select v-model="form.sex" placeholder="性别（可选）">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="text" @click="dialogVisible = true"
          >修改密码</el-button
        >
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">提交</el-button>
      </el-form-item>
    </el-form>

    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <el-input v-model="data.old_password" placeholder="旧密码" />
      <el-input v-model="data.new_password" placeholder="新密码" />
      <el-input
        v-model="reply_new_password"
        placeholder="再输入一次新密码"
      />
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="
            handleChangePassword();
            dialogVisible = false;
          "
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { changePassword, getInfo, updateInfo } from "@/api/user";
export default {
  created() {
    this.fetchData();
  },
  data() {
    return {
      form: {
        username: "",
        sid: "",
        introduction: "",
        age: "",
        sex: "",
      },
      dialogVisible: false,
      data: {
        old_password: "",
        new_password: "",
      },
      reply_new_password: "",
      options: [
        {
          value: "male",
          label: "男",
        },
        {
          value: "female",
          label: "女",
        },
        {
          value: "unknown",
          label: "性别（不愿透露）",
        },
      ],
    };
  },
  methods: {
    fetchData() {

      this.listLoading = true;
      getInfo().then((response) => {
        console.log(response.data);
        this.form.username = response.data.name;
        this.form.sid = response.data.sid;
        this.form.introduction = response.data.introduction;
        this.form.age = response.data.age;
        this.form.sex = response.data.sex;
        this.listLoading = false;
      });
    },
    handleChangePassword() {
      this.dialogVisible = true;

console.log(this.data.new_password)
console.log(this.reply_new_password)
      if (this.data.new_password != this.reply_new_password) {
        this.$message({
          type: "error",
          message: "上下输入的新密码不一致",
        });
        return;
      }


      changePassword(this.data)
        .then(() => {
          this.$message({
            type: "success",
            message: "修改成功",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "修改失败",
          });
        });
    },
    onSubmit() {
      updateInfo(this.form).then(() => {
        this.$message("提交成功!");
        this.fetchData();
      });
    },
    onCancel() {
      this.$message({
        message: "cancel!",
        type: "warning",
      });
    },
  },
};
</script>

<style scoped>
.line {
  text-align: center;
}
</style>

