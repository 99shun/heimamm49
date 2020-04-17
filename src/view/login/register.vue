<template>
  <!-- 
      el-dialog 弹出框
      :visible.sync="值" 属性控制该窗口是否显示
      title 弹窗标题
      slot  重写某部分内容(也就是不使用默认的，直接自定义处理)
      width 属性用于设置弹出框的宽度
      有两个 区域可以重写 1. title(头部标题)  2.footer(底部的确认与取消)
      show-close    boolean值,是否显示关闭按钮(右上角的 X )
  -->
  <el-dialog :visible.sync="dialogFormVisible" :show-close="false" class="register" width='600px'>
    <div slot="title" class="title">用户注册</div>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      dialogFormVisible: false
    };
  }
};
</script>

<style lang='less'>
.register {
  .title {
    height: 53px;
    text-align: center;
    line-height: 53px;
    background: rgba(3, 192, 249, 1);
  }
  .el-dialog__header {
    padding: 0;
  }
}
</style>