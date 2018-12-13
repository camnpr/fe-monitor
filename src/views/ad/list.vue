<template>
  <div class="app-container">
    <!-- <draggable v-model="myList" @start="drag=true" @end="drag=false">
      <transition-group>
        <div v-for="item in list" :key="item.id">{{item.title}}</div>
      </transition-group>
    </draggable> -->
    <!-- 搜索条件 -->
    <div class="filter-container">
      <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="广告标题" v-model="listQuery.title">
      </el-input>
      <el-select clearable class="filter-item" style="width: 130px" v-model="listQuery.type" placeholder="类型">
        <el-option v-for="item in adTypeList" :key="item.key" :label="item.name" :value="item.key">
        </el-option>
      </el-select>

      <el-button class="filter-item" type="primary" v-waves icon="search" @click="handleFilter">搜索</el-button>
      <el-button class="filter-item" type="primary" @click="handleCreate"  icon="edit">添加</el-button>

      <el-button class="filter-item" type="primary" @click="handleDelAll"  icon="edit">批量删除</el-button>
      <el-button class="filter-item" type="primary" icon="document" @click="handleDownload">导出</el-button>
    </div>
    <!-- 表格 -->
    <el-table ref="multipleTable" @selection-change="handleSelectionChange" :data="list" row-key="id" v-loading="listLoading" element-loading-text="拼命加载中" border fit highlight-current-row>
        <el-table-column type="selection" width="50">
        </el-table-column>
        <el-table-column align="center" label='ID' width="50">
          <template scope="scope">
            {{scope.row.id}}
          </template>
        </el-table-column>
        <el-table-column label="标题" width="">
          <template scope="scope">
            {{scope.row.title}}
          </template>
        </el-table-column>
        <el-table-column label="宣传图" width="">
          <template scope="scope">
            <a :href="scope.row.pic" target="_blank">
              <img :src="scope.row.pic" height="150" width="160" />
            </a>
          </template>
        </el-table-column>
        <el-table-column label="链接地址" width="">
          <template scope="scope">
            {{scope.row.url}}
          </template>
        </el-table-column>
        <el-table-column label="更新时间" width="160">
          <template scope="scope">
            {{scope.row.update || scope.row.add}}
          </template>
        </el-table-column>
        <el-table-column label="状态"  align="center" width="80">
          <template scope="scope">
            <span v-if="scope.row.status == '0' ">待审核</span>
            <span v-if="scope.row.status == '1' ">通过</span>
            <span v-if="scope.row.status == '2' ">不通过</span>
          </template>
        </el-table-column>
        <el-table-column label="删除？" width="80">
          <template scope="scope">
            <span v-if="scope.row.isdeleted == 'False'">正常</span>
            <span v-else>已删除</span>
          </template>
        </el-table-column>
        <el-table-column align="center"  label="操作" width="140">
            <template scope="scope">
                
                <el-button size="small" @click="handleEdit(scope.row.id)">编辑</el-button>
                <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                      
            </template>
        </el-table-column>
    </el-table>
    <!-- 分页 -->
    <div v-show="!listLoading" class="pagination-container">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.currPage"
        :page-sizes="[10,20,30,50]" :page-size="listQuery.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
    <!-- 新增弹窗 -->
    <el-dialog title="表单新增" :visible.sync="dialogFormVisible">
          <el-form class="small-space" :model="temp" label-position="left" label-width="70px" style='width: 400px; margin-left:50px;'>
            <el-form-item label="字段1">
              <el-input v-model="temp.chnlId"></el-input>
            </el-form-item>
            <el-form-item label="字段2">
              <el-input v-model="temp.hisChnlId"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="handleCreateSubmit">确 定</el-button>
          </div>
    </el-dialog>

  </div>
</template>

<script>
// import { getList } from 'api/article';
import { global } from "src/global/global";
import { api } from "src/global/api";
import { mapGetters } from "vuex";
// import draggable from "vuedraggable";
import Sortable from "sortablejs";

export default {
  components: {
    // draggable,
  },
  data() {
    return {
      list: null, //表格list [].push({})
      total: null,
      listLoading: true,
      listQuery: {
        currPage: 1,
        pageSize: 50,
        // importance: undefined,
        title: "",
        type: "",//类型
      },
      temp: {
        chnlId: "",
        hisChnlId: "",
        chnlName: "",
        state: "",
        isavailable: "",
        orderNum: 10
      },
      dialogFormVisible: false,
      multipleSelection: []
    };
  },
  computed: {
    ...mapGetters(['adTypeList']),
    // myList: {
    //   get() {
    //     return this.list
    //   },
    //   set(val) {
    //     console.log(val);
    //   }
    // }
  },
  mounted() {
    this.getList();
    this.rowDrag();
  },
  methods: {
    rowDrag() {
      const tbody = document.querySelector(".el-table__body-wrapper tbody");
      const that = this;
      Sortable.create(tbody, {
        onEnd({ newIndex, oldIndex }) {

          that.handleSort(newIndex, oldIndex);

          // let currRow = that.list.splice(oldIndex, 1)[0];
          // that.list.splice(newIndex, 0, currRow);
        }
      })
    },

    //获取列表数据
    getList() {
      let that = this;

      that.listLoading = true;

      global.get(
        api.adList,
        { params: that.listQuery },
        function(data) {
          // console.log('-------获取到数据：',JSON.stringify(res) )
          if (data.code == 1) {
            that.list = data.res;
            that.listQuery.currPage = data.currPage || 1;
            that.listQuery.pageSize = data.pageSize || 50;
            that.total = data.res.total || that.list.length;

            that.listLoading = false;
          } else {
            //alert(res.msg)
            Message({
              showClose: true,
              message: res.msg,
              type: "error"
            });
            that.listLoading = false;
          }
        },
        function(res) {
          that.listLoading = false;
        },
        false
      );
    },

    // 排序
    handleSort(newIndex, oldIndex) {

      let that = this;
      let row1 = that.list[oldIndex], row2 = that.list[newIndex];
      
      global.post(
        api.adUpdate,
        { action: "sort", id: row1.id, row1: [row1.id, row2.sort].join(","), row2: [row2.id, row1.sort].join(",") },
        null,
        function(res) {
          if (res.code > 0) {
            that.$message.success("排序成功");
            let currRow = that.list.splice(oldIndex, 1)[0];
            that.list.splice(newIndex, 0, currRow);
          } else {
            that.$message.error("排序失败");
          }
        },
        function(err) {
          that.$message.error("未知错误");
          that.listLoading = false;
        },
        false
      );
    },

    // 编辑
    handleEdit(id) {
      this.$router.push({ path: "/ad/update", query: { id } }); //带参跳转
    },

    //单个删除
    handleDelete(index, row) {
      let that = this;

      that.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
      .then(() => {
        that.delFun(index, row);
      })
      .catch(() => {
      });
    },
    //调取删除接口的删除方法
    delFun(index, row) {
      let that = this;
      global.post(
        api.adUpdate,
        { action: "del", id: row["id"] },
        null,
        function(res) {
          if (res.code > 0) {
            // 界面上移除
            that.list.splice(index,1);
            that.$message.success("删除成功");
            // that.getList();
          } else {
            that.$message.error("操作失败");
          }
        },
        function(err) {
          that.$message.error("未知错误");
          that.listLoading = false;
        },
        false
      );
    },
    //批量删除
    handleDelAll() {
      let that = this;

      that.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定批量删除",
        cancelButtonText: "取消",
        type: "warning"
      })
      .then(() => {
        //前端依次执行单个删除操作
        for (var index in that.multipleSelection) {
          that.delFun(index, that.multipleSelection[index]);
        }
      })
      .catch(() => {
        // 已取消删除
      });
    },
    //搜索
    handleFilter() {
      this.getList();
    },
    //操作分页
    handleSizeChange(val) {
      this.listQuery.pageSize = val;
      this.getList();
    },
    //操作分页
    handleCurrentChange(val) {
      this.listQuery.currPage = val;
      this.getList();
    },
    //新增
    handleCreate() {
      // this.dialogFormVisible = true;
      //跳到新增页面
      this.$router.push("/ad/add");
    },

    // 修改状态
    handleCreateSubmit() {
      let vm = this;
      console.log("新增入参：", vm.temp);

      // 正式新增 请提交到接口
      vm.list.push(vm.temp);
      console.log("新增后", vm.list);

      this.dialogFormVisible = false;
    },

    handleSelectionChange(val) {
      this.multipleSelection = val;
    },

    handleDownload() {
      let that = this;

      require.ensure([], () => {
        const { export_json_to_excel } = require("vendor/Export2Excel");
        const tHeader = ["ID", "标题", "宣传图", "链接地址", "状态", "是否删除", "更新时间"];
        const filterVal = [
          "id",
          "title",
          "pic",
          "url",
          "status",
          "isdeleted",
          "update"
        ];
        const data = that.formatJson(filterVal, that.list);
        export_json_to_excel(tHeader, data, "广告列表"+(new Date().toLocaleDateString()));
      });
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        if (j=="status") {
          return v[j]=="0" ? "待审核" : v[j]=="1" ? "通过" : "不通过"
        } else {
          return v[j]
        }
      }));
    }
  }
};
</script>
