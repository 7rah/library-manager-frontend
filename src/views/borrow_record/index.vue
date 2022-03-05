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
          @click.native.prevent="handleReturn"
          >还书</el-button
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
      <el-table-column label="ISBN" align="center">
        <template slot-scope="scope">
          {{ scope.row.isbn }}
        </template>
      </el-table-column>
      <el-table-column label="借阅时间" sortable :sort-orders="['ascending', 'descending']" align="center" prop="borrowed_date">
        <template slot-scope="scope">
          {{ scope.row.borrowed_date }}
        </template>
      </el-table-column>
      <el-table-column label="还书时间" sortable align="center">
        <template slot-scope="scope">
          {{ scope.row.return_date }}
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
import { getBorrowedBook, returnBook } from '@/api/book';

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
      getBorrowedBook().then((response) => {
        console.log(response.data.items)
        this.list = response.data.items
        this.listLoading = false
      }).catch((e) => {
        this.listLoading = false
      });
    },
    handleReturn() {
      this.listLoading = true;
      var returnList = [];
      for (const i of this.multipleSelection) {
        if (i["remain"] <= 0) {
          this.listLoading = false;
          this.$message({
            message: "还书失败",
            type: "error",
          });
          return;
        }
        returnList.push(i["isbn"]);
      }
      returnBook({ isbns: returnList })
        .then((response) => {
          this.listLoading = false;
          this.$message({
            message: "还书成功",
            type: "success",
          });
          this.fetchData()
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
