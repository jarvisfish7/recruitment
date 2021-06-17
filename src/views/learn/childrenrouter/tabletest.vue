<template>
  <el-table
    :data="tableData"
    border
    style="width: 100%">
    <el-table-column
      fixed
      prop="id"
      label="用户编号"
      width="150">
    </el-table-column>
    <el-table-column
      prop="username"
      label="用户名"
      width="120">
    </el-table-column>
    <el-table-column
      prop="email"
      label="邮箱"
      width="120">
<!--      插入图片-->
<!--      <template slot-scope="scope">-->
<!--        <img src="scope.row.icon" alt="" style="height: 8px">-->
<!--      </template>-->
    </el-table-column>
    <el-table-column
      prop="createTime"
      label="创建时间"
      width="120">
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
      width="100">
      <template slot-scope="scope">
        <el-button @click="deleteClick(scope.row)" type="text" size="small">删除</el-button>
        <el-button type="text" size="small">编辑</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import axios from 'axios'

export default {
  name: 'tabletest',
  methods: {
    deleteClick (row) {
      alert(row.id)
      axios.delete("http://localhost:8181/user/delete/"+row.id).then(function (resp){
        if (resp.data){
          alert("成功删除"+row.id+"号")
        }
      })
    }
  },

  created () {
    let _this = this
    axios.get("http://localhost:8181/user/list").then(function (response){
      _this.tableData=response.data
    })
  },
  data () {
    return {
      tableData: []
    }
  }
}
</script>
