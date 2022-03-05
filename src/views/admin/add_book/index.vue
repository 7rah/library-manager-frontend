<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="书籍名称">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="作者">
        <el-input v-model="form.author" />
      </el-form-item>
      <el-form-item label="ISBN">
        <el-input v-model="form.isbn" />
      </el-form-item>
      <el-form-item label="出版社">
        <el-input v-model="form.press" />
      </el-form-item>
      <el-form-item label="库存">
        <el-input v-model.number="form.stock" type="number" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { addBook } from '@/api/admin'
export default {
  data() {
    return {
      form: {
        name: 'the book',
        author: 'chez',
        isbn: '1234557865678',
        press: 'feature press',
        stock: 11
      }
    }
  },
  methods: {
    onSubmit() {
      addBook(this.form).then(() => {
        this.$message('提交成功!')
      })
      
    },
    onCancel() {
      this.$message({
        message: 'cancel!',
        type: 'warning'
      })
    }
  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
</style>

