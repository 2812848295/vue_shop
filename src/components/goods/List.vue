<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图区域 -->
    <el-card>
      <el-row :gutter="20">
        <!-- 搜索 -->
        <el-col :span="9">
          <el-input placeholder="请输入内容" v-model="queryInfo.query" clearable @clear="getGoodsList">
            <el-button slot="append" icon="el-icon-search" @click="getGoodsList"></el-button>
          </el-input>
        </el-col>
        <!-- 按钮 添加商品 -->
        <el-col :span="4">
          <el-button type="primary" @click="goAddpage">添加商品</el-button>
        </el-col>
      </el-row>
      <!-- table表格区域 -->
      <el-table :data="goodslist" border stripe>
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column label="商品名称" prop="goods_name"></el-table-column>
        <el-table-column label="商品价格" prop="goods_price" width="95px"></el-table-column>
        <el-table-column label="商品数量" prop="goods_number" width="70px"></el-table-column>
        <el-table-column label="商品重量" prop="goods_weight" width="70px"></el-table-column>
        <el-table-column label="创建时间" prop="add_time" width="140px">
          <template slot-scope="scope">{{scope.row.add_time | dateFormat}}</template>
        </el-table-column>
        <el-table-column label="操作" width="130px">
          <template slot-scope="scope">
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              @click="eidtList(scope.row.goods_id)"
            ></el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              @click="removeByid(scope.row.goods_id)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页区域 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        background
      ></el-pagination>
    </el-card>
    <!-- 编辑商品对话框 -->
    <el-dialog title="编辑商品" :visible.sync="editListDialogVisible" width="50%">
      <el-form
        :model="editListForm"
        :rules="editListFormRules"
        ref="editListFormRef"
        label-width="100px"
      >
        <!-- prop="cat_name" -->
        <el-form-item label="商品名称：" prop="goods_name">
          <el-input v-model="editListForm.goods_name"></el-input>
        </el-form-item>

        <el-form-item label="商品价格：" prop="goods_price">
          <el-input v-model="editListForm.goods_price"></el-input>
        </el-form-item>

        <el-form-item label="商品数量：" prop="goods_number">
          <el-input v-model="editListForm.goods_number"></el-input>
        </el-form-item>

        <el-form-item label="商品重量：" prop="goods_weight">
          <el-input v-model="editListForm.goods_weight"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="editListDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="eidtListAdd">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // 查询参数对象
      queryInfo: {
        // 查询参数
        query: "",
        // 当前页码
        pagenum: 1,
        // 每页显示条数
        pagesize: 10,
      },
      // 商品列表
      goodslist: [],
      // 总条数
      total: 0,
      // 控制编辑商品的对话框
      editListDialogVisible: false,
      // 绑定表单对象
      editListForm: {
        goods_id: "",
        goods_name: "",
        goods_price: "",
        goods_goods_number: "",
        goods_weight: "",
      },
      // 编辑分类表单验证
      editListFormRules: {
        goods_name: [
          { required: true, message: "请输入商品名称", trigger: "blur" },
        ],
        goods_price: [
          { required: true, message: "请输入商品价格", trigger: "blur" },
        ],
        goods_number: [
          { required: true, message: "请输入商品数量", trigger: "blur" },
        ],
        goods_weight: [
          { required: true, message: "请输入商品重量", trigger: "blur" },
        ],
      },
    };
  },
  created() {
    this.getGoodsList();
  },
  methods: {
    // 根据分页获取对应的商品列表
    async getGoodsList() {
      const { data: res } = await this.$http.get("goods", {
        params: this.queryInfo,
      });
      if (res.meta.status !== 200) {
        return this.$message.error("获取商品列表失败!");
      }
      this.$message.success("获取商品列表成功!");
      //console.log(res.data);
      this.goodslist = res.data.goods;
      this.total = res.data.total;
    },
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize;
      this.getGoodsList();
    },
    handleCurrentChange(newPage) {
      this.queryInfo.pagenum = newPage;
      this.getGoodsList();
    },
    // 根据ID删除
    async removeByid(id) {
      const confirmResult = await this.$confirm(
        "此操作将永久删除该商品, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch((err) => err);
      if (confirmResult !== "confirm") {
        return this.$message.info("已取消删除");
      }
      const { data: res } = await this.$http.delete(`goods/${id}`);
      if (res.meta.status !== 200) {
        return this.$message.error("删除失败!");
      }
      this.$message.success("删除成功!");
      this.getGoodsList();
    },
    // 点击添加商品 通过编程式导航跳转到
    goAddpage() {
      this.$router.push("/goods/add");
    },
    // 点击编辑商品然后弹框
    async eidtList(id) {
      //console.log(id);
      const { data: res } = await this.$http.get(`goods/${id}`);
      // console.log(temp);
      //console.log(res.data);
      if (res.meta.status !== 200) {
        return this.$message.error("获取商品数据失败!");
      }
      this.editListForm = res.data;

      this.editListDialogVisible = true;
    },
    // 点击确认判断是否修改成功
    eidtListAdd() {
      // 预验证
      this.$refs.editListFormRef.validate(async (valid) => {
        if (!valid) {
          return this.$message.error("表单验证失败，请重新填写表单");
        }
        const { data: res } = await this.$http.put(`goods/${this.editListForm.goods_id}`,
          this.editListForm
        );
        console.log(res.data);
        if (res.meta.data !== 201) {
          return this.$message.error("商品信息修改失败");
        }
        this.$message.success("商品信息修改成功");
        this. editListDialogVisible= false;
        this.getGoodsList();
      });
    },
  },
};
</script>
<style lang="less" scoped>
</style>