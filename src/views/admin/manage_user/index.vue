<template>
  <div class="app-container">
    <div class="display-flex">
      <div class="div-size">
        <el-input
          type="text"
          placeholder="名称"
          v-model="filter.name"
          maxlength="50"
          show-word-limit
        >
        </el-input>
      </div>
      <div class="div-size">
        <el-input
          type="text"
          placeholder="ISBN(纯数字)"
          v-model="filter.isbn"
          maxlength="13"
          show-word-limit
        >
        </el-input>
      </div>
      <div class="div-size">
        <el-input
          type="text"
          placeholder="作者"
          v-model="filter.author"
          maxlength="20"
          show-word-limit
        >
        </el-input>
      </div>
      <div class="bottom">
        <el-button
          :loading="loading"
          type="primary"
          style="width: 100%"
          @click.native.prevent="handleSearch"
          >搜索</el-button
        >
      </div>
      <div class="bottom">
        <el-button
          :loading="loading"
          type="primary"
          style="width: 100%"
          @click.native.prevent="handleBorrow"
          >借阅</el-button
        >
      </div>
    </div>

    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      @selection-change="handleSelectionChange"
    >
      :default-sort="{ prop: 'borrowed_date', order: 'ascending' }"
      highlight-current-row >
      <el-table-column align="center" label="ID" width="80" prop="id">
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>
      <el-table-column label="姓名">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column label="学号">
        <template slot-scope="scope">
          {{ scope.row.sid }}
        </template>
      </el-table-column>
      <el-table-column label="邮箱">
        <template slot-scope="scope">
          {{ scope.row.email }}
        </template>
      </el-table-column>
      <el-table-column label="角色" sortable width="90">
        <template slot-scope="scope">
          {{ scope.row.role }}
        </template>
      </el-table-column>
      <el-table-column label="状态" sortable width="90">
        <template slot-scope="scope">
          {{ scope.row.status }}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="130">
        <template slot-scope="scope">
          <el-button type="text" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button type="text" @click="updatePassword(scope.row.email)">修改密码</el-button>
        </template>
      </el-table-column>
      
      
      </el-table>

<el-dialog
  title="提示"
  :visible.sync="dialogVisible"
  width="30%"
  :before-close="handleClose">
  
  <el-radio v-model="status" label="enabled">启用</el-radio>
  <el-radio v-model="status" label="disabled">禁用</el-radio>

  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="updateStatus();dialogVisible = false">确 定</el-button>
  </span>
</el-dialog>

  </div>
</template>
      </el-table-column>
    </el-table>
  </div>
</template>

<style>
.display-flex {
  display: flex;
  margin: 10px;
}

.div-size {
  margin: 10px;
  width: 360px;
}

.bottom {
  margin: 10px;
  width: 80px;
}
</style>

<script>
import { changePassword, getUserList, updateUser } from "@/api/admin";

export default {
  data() {
    return {
      list: null,
      form: {
        name: "",
        region: "",
      },
      filter: {
        name: "",
        isbn: "",
        author: "",
      },
      listLoading: true,
      multipleSelection: [],
      dialogVisible: false,
      status: "",
      email: ""
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },

    fetchData() {
      this.listLoading = true;
      getUserList()
        .then((response) => {
          this.list = response.data.users;
          this.listLoading = false;
        })
        .catch((e) => {
          this.listLoading = false;
        });
    },
    handleEdit(row) {
      this.dialogVisible = true
      this.status = row.status
      this.email = row.email
    },
    updateStatus() {
      var data = {
        status:this.status,
        email:this.email
      }
      updateUser(data).then(() => {
            this.$message({
            type: "success",
            message: "修改成功",
          });
          this.fetchData()
          }).catch(() => {
            this.$message({
            type: "info",
            message: "修改失败",
          });
      })

    },
    updatePassword(email) {
      this.$prompt("请输入密码", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPattern:
          /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,16}/,
        inputErrorMessage: "密码格式不正确",
      })
        .then(({ value }) => {
          var data = {
            password:value,
            email
          }
          updateUser(data).then(() => {
            this.$message({
            type: "success",
            message: "修改成功",
          });
          }).catch(() => {
            this.$message({
            type: "info",
            message: "修改失败",
          });
          })

        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入",
          });
        });
    },
    handleBorrow() {
      this.listLoading = true;
      var borrowList = [];
      for (const i of this.multipleSelection) {
        if (i["remain"] <= 0) {
          this.listLoading = false;
          this.$message({
            message: "没有剩余书籍",
            type: "error",
          });
          return;
        }
        borrowList.push(i["isbn"]);
      }
      borrow({ isbns: borrowList })
        .then((response) => {
          this.listLoading = false;
          this.$message({
            message: "借阅成功",
            type: "success",
          });
          this.fetchData();
        })
        .catch(() => {
          this.listLoading = false;
        });
    },
    handleSearch() {
      this.listLoading = true;
      getSearchList(this.filter).then((response) => {
        this.list = response.data.items;
        this.listLoading = false;
      });
    },
    clearFilter() {
      this.loading = true;
      this.filter.name = "";
      this.filter.isbn = "";
      this.filter.author = "";
      this.loading = false;
    },
  },
};
</script>
