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
          @click.native.prevent="clearFilter"
          >清空</el-button
        >
      </div>
      <div class="bottom">
        <el-button
          :loading="loading"
          type="primary"
          style="width: 100%"
          @click.native.prevent="handleDelete"
          >删除</el-button
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
      :default-sort="{ prop: 'remain', order: 'descending' }"
      highlight-current-row >
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column align="center" label="ID" width="80" prop="id">
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>
      <el-table-column label="书名" prop="name">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column label="作者" width="110" align="center" prop="author">
        <template slot-scope="scope">
          <span>{{ scope.row.author }}</span>
        </template>
      </el-table-column>
      <el-table-column label="ISBN" align="center" prop="isbn">
        <template slot-scope="scope">
          {{ scope.row.isbn }}
        </template>
      </el-table-column>
      <el-table-column label="出版社" align="center" prop="press">
        <template slot-scope="scope">
          {{ scope.row.press }}
        </template>
      </el-table-column>
      <el-table-column
        label="余书"
        align="center"
        sortable
        prop="remain"
        width="95"
      >
        <template slot-scope="scope">
          {{ scope.row.remain }}
        </template>
      </el-table-column>
      <el-table-column label="库存" align="center" width="95">
        <template slot-scope="scope">
          {{ scope.row.stock }}
        </template>
      </el-table-column>

      <el-table-column label="操作" width="110">
        <template slot-scope="scope">
          <el-button type="text" @click="updateStock(scope.row.isbn)"
            >修改库存</el-button
          >
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
import { getList, getSearchList } from "@/api/book";
import { deleteBook ,updateBook} from "@/api/admin";

export default {
  data() {
    return {
      list: null,
      filter: {
        name: "",
        isbn: "",
        author: "",
      },
      listLoading: true,
      multipleSelection: [],
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
      getList().then((response) => {
        this.list = response.data.items;
        this.listLoading = false;
      });
    },
    handleDelete() {
      this.listLoading = true;
      var deleteList = [];
      for (const i of this.multipleSelection) {
        deleteList.push(i["isbn"]);
      }
      deleteBook({ isbns: deleteList })
        .then((response) => {
          this.listLoading = false;
          this.$message({
            message: "删除成功",
            type: "success",
          });
          this.fetchData();
        })
        .catch(() => {
          this.listLoading = false;
        });
    },
    updateStock(isbn) {
      this.$prompt("请输入库存", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPattern: /(?=.*[0-9])/,
        inputErrorMessage: "格式错误",
      })
        .then(({ value }) => {
          var data = {
            stock: Number(value),
            isbn,
          };
          updateBook(data)
            .then(() => {
              this.$message({
                type: "success",
                message: "修改成功",
              });
              this.fetchData();
            })
            .catch(() => {
              this.$message({
                type: "info",
                message: "修改失败",
              });
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入",
          });
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
