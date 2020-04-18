<template>
  <!-- 最外层的标签的class名使用组件名 -->
  <div class="login">
    <div class="left">
      <img src="@/assets/img/loginLogo.png" alt />
      <span class="titleName">黑马面面</span>
      <span class="titleLite">|</span>
      <span class="titleName2">用户登录</span>
      <!-- 在 el-form 中 -->
      <!-- model:绑定值，就是绑定整个表单的值-->
      <!-- el-form-item 是表单元素的每一项 label 属性及时该项的标题 -->
      <!-- label-width='100px'   整个表单下所有的 标题 的宽度 -->
      <!-- rules 绑定验证规则
              rules:{
                名字: [  ] (名字后面是一个数组)
                名字 (该名字来自于 el=form-item里面的prop属性的值，它一定是表单元素v-model的值）
                列：el-form-item 下的表单元素的 v-model="form.user" , 那么el-form-item下的prop的值一定要是user
                还有 需要验证的表单才写 prop
                
                验证规则说明
                { required: true, message:'请输入活动名称', trigger:'blur' },
                { min: 3,max :5,message:'长度在3到5个字符', trigger:'blur' }

                required:  必填，如果没有填报错信息message的值
                message:   报错提示信息
                trigger:   在什么情况下触发这个报错提示信息，有两个值，blur  失去焦点的时候触发， change  值改变的时候触发
                min:       最小长度
                max:       最大长度
              }
      -->

      <!--  -->
      <el-form :model="form" :rules="rules" ref="form">
        <!-- 用户账号 -->
        <el-form-item prop="user">
          <!-- prefix-icon 输入框头部图标 ，  el-icon-user 属于 icon图标  -->
          <el-input
            class="title-input-user"
            v-model="form.user"
            prefix-icon="el-icon-user"
            placeholder="请输入内容"
          ></el-input>
        </el-form-item>
        <!-- 用户密码 -->
        <el-form-item prop="password">
          <!-- :show-password="true"  这个必须绑定，  show-password="false" 这种情况就 false 属于字符串，字符串就是 true，用 : 绑定后就是 false 就是不是字符串了 -->
          <el-input
            v-model="form.password"
            prefix-icon="el-icon-lock"
            :show-password="true"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <!-- 验证码 -->
        <el-form-item prop="code">
          <el-row>
            <el-col :span="16">
              <el-input v-model="form.code" prefix-icon="el-icon-key" placeholder="请输入验证码"></el-input>
            </el-col>
            <el-col :span="8">
              <img class="title-input-keyImg" src="@/assets/img/yzm.png" alt />
            </el-col>
          </el-row>
        </el-form-item>
        <!-- 用户协议同意 -->
        <el-form-item prop="chexkbox">
          <!-- 决定el-link里面颜色的值为type="值" -->
          <el-checkbox v-model="form.chexkbox">
            我已阅读并同意
            <el-link type="primary">用户协议</el-link>和
            <el-link type="primary">隐私条款</el-link>
          </el-checkbox>
        </el-form-item>
        <!-- 登陆注册按钮 -->
        <el-form-item>
          <!-- 决定el-button里面颜色的值为type="值" -->
          <el-button class="login-form-button" type="primary" @click="loginClick">登陆</el-button>
          <br />
          <el-button class="login-form-button" type="primary" @click="registerClick">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="right">
      <img src="@/assets/img/login_banner_ele.png" alt />
    </div>

    <!--
       组件套用其他组件
       1. 导入组件  import 名字 from 路径
       2. 注册  componenets: { 名字 }
       3. 当标签使用
     -->


    <!-- 注册弹出框 -->
     <register ref="register"></register>
  </div>
</template>

<script>
// 导入 注册 弹出框
import register from './register.vue'

export default {
  components: {
    register
  },
  data() {
    return {
      form: {
        // 表单绑定的值
        input: "", // 用户账号
        password: "", // 用户密码
        code: "" // 用户验证码
      },
      // 表单规则验证
      rules: {
        user: [
          { required: true, message: "请输入用户名", trigger: "change" },
          { max: 6, min: 16, message: "长度为6至12位数", trigger: "change" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "change" },
          { max: 6, min: 12, message: "长度为6至12位数", trigger: "change" }
        ],
        code: [
          { required: true, message: "请输入验证码", trigger: "change" },
          { max: 4, min: 4, message: "长度必须是4位数", trigger: "change" }
        ]
      }
    };
  },
  methods: {
    // 登录点击
    loginClick() { 
      // 这是官网写的方法 比较麻烦
      // // this.$message({
      // //   message: '恭喜你，这是一条成功的消息',
      // //   type: 'success'
      // // })

      // 这是改良后的方法简单易懂
      this.$refs.form.validate(result => {
        // validate 是一个全局的表单验证
        // result   全部需要验证的表单都符合要求返回 true(代表验证通过) 否则 返回false(代表验证错误)

        // success  要的是字符串 ，result 返回的是布尔值，
        // result + ""  让输出的内容变成了字符串
        this.$message.success(result + '');
      });
    },
    // 注册点击
    registerClick() {
      // 先在 标签组件上 定义ref的值
      // 在通过 this.$refs.值.dialogFormVisible = true 来显示弹窗
      alert(process.env.VUE_APP_URL);
      this.$refs.register.dialogFormVisible = true;

    }
  }
};
</script>

<style lang='less'>
.login {
  // 弹性盒子布局
  display: flex;
  // 水平居中
  justify-content: space-around;
  // 侧轴居中
  align-items: center;
  height: 100%;
  background: linear-gradient(
    225deg,
    rgba(20, 147, 250, 1),
    rgba(1, 198, 250, 1)
  );
  .left {
    width: 478px;
    height: 550px;
    background: rgba(245, 245, 245, 1);
    padding: 43px;

    .titleName {
      margin-left: 15px;
      margin-right: 15px;
      font-size: 24px;
      font-family: SourceHanSansCN;
      font-weight: 400;
      color: rgba(12, 12, 12, 1);
    }
    .titleLite {
      font-size: 22px;
      color: #ccc;
    }
    .titleName2 {
      font-size: 22px;
      font-family: PingFangSC;
      font-weight: 400;
      color: rgba(12, 12, 12, 1);
      margin-left: 15px;
    }
    .title-input-user {
      margin-top: 31px;
    }
    .title-input-keyImg {
      width: 90%;
      height: 36px;
      margin-top: 2px;
      margin-left: 10px;
    }
    .login-form-button {
      width: 100%;
    }
    .login-form-button:nth-child(1) {
      margin-bottom: 26px;
    }
  }
}
</style>