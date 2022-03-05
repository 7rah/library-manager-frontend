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
          placeholder="ISBN"
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
          style="width: 100%;"
          @click.native.prevent="handleRegister"
          >搜索</el-button
        >
      </div>
      <div class="bottom">
        <el-button
          :loading="loading"
          type="primary"
          style="width: 100%;"
          @click.native.prevent="clearFilter"
          >清空</el-button
        >
      </div>
    </div>

    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      stripe
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="ID" width="95">
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>
      <el-table-column label="Title">
        <template slot-scope="scope">
          {{ scope.row.title }}
        </template>
      </el-table-column>
      <el-table-column label="Author" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.author }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Pageviews" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.pageviews }}
        </template>
      </el-table-column>
      <el-table-column
        class-name="status-col"
        label="Status"
        width="110"
        align="center"
      >
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{
            scope.row.status
          }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="created_at"
        label="Display_time"
        width="200"
      >
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.display_time }}</span>
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
import { getList } from "@/api/table";

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: "success",
        draft: "gray",
        deleted: "danger",
      };
      return statusMap[status];
    },
  },
  data() {
    return {
      list: null,
      listLoading: true,
      filter: {
        name: '',
        isbn: '',
        author: ''
      }
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.listLoading = true;
      getList().then((response) => {
        this.list = response.data.items;
        this.listLoading = false;
      });
    },
  },
};
</script>
