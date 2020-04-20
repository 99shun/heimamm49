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
  <el-dialog :visible.sync="dialogFormVisible" :show-close="false" class="register" width="600px">
    <!-- 重写 title 部分 -->
    <div slot="title" class="title">用户注册</div>
    <!-- 上传用户图像
            1: 上传地址：action
            2. 参数      name="值"
            3. 是否显示文件上传列表      :show-file-list="false"
            4. 上传成功的回调函数        :on-success="方法名"
                成功回调函数里面有个res就是接口返回信息
            5.上传前的处理(还没调用上传接口前的处理)        :before-upload="方法名"
                上传前有有个file文件信息，通过file 文件信息能够限制上传格式(flie.type),大小等控制 (file。size 字节大小)
    -->
    <el-form :model="form" label-width="100px" ref="form" :rules="rules">
      <el-form-item label="头像" prop="avatar">
        <el-upload
          class="avatar-uploader"
          :action="baseUrl+'/uploads'"
          name="image"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <!-- imageUrl 有参数就是 true ，没有参数就是 undefined  ，也就是false-->
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <!-- 昵称 -->
      <el-form-item label="昵称" prop="username">
        <el-input v-model="form.username"></el-input>
      </el-form-item>

      <!-- 邮箱 -->
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="form.email"></el-input>
      </el-form-item>
      <!-- 手机号 -->
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="form.phone"></el-input>
      </el-form-item>
      <!-- 密码 -->
      <el-form-item label="密码" prop="password">
        <!-- :show-password="true"  让密码隐藏下来 并在 表单后添加 可切换显示的小眼睛 -->
        <el-input v-model="form.password" :show-password="true"></el-input>
      </el-form-item>
      <!-- 验证码 -->
      <el-form-item label="图形码" prop="code">
        <!-- 
        el-row 行   el-col 列
        一行只能有 24 列，超出会转到下一行
        span  栅格占据的列数   offset	栅格左侧的间隔格数
        -->
        <el-row>
          <el-col :span="16">
            <el-input v-model="form.code"></el-input>
          </el-col>
          <el-col :span="7" :offset="1">
            <img class="code" :src="codeUrl" @click="changeCodeUrl" alt />
          </el-col>
        </el-row>
      </el-form-item>
      <!-- 手机验证码 -->
      <el-form-item label="验证码" prop="rcode">
        <el-row>
          <el-col :span="16">
            <el-input v-model="form.rcode"></el-input>
          </el-col>
          <el-col :span="7" :offset="1">
            <button class="rcode" @click="getRcodePhone" :disabled="totaTime != 60">
              获取用户验证码
              <span v-if="totaTime != 60">{{ totaTime }}</span>
            </button>
          </el-col>
        </el-row>
      </el-form-item>
      <!--  -->
    </el-form>
    <!-- slot="footer"  重写  确认 和 取消 按钮  -->
    <div slot="footer" class="center">
      <el-button @click="dialogFormVisible=false">取消</el-button>
      <el-button type="primary" @click="submitClick">确认</el-button>
    </div>
  </el-dialog>
</template>

<script>
// 导入接口
import { getPhoneCode, register } from "@/api/register.js";
export default {
  data() {
    return {
      // 倒计时
      totaTime: 60,
      // 是否显示弹窗
      dialogFormVisible: false,
      // 图片验证码路劲
      codeUrl: process.env.VUE_APP_URL + "/captcha?type=sendsms",
      form: {
        // 头像地址(这是要提交的图片)
        avatar: "",
        // 用户昵称
        username: "",
        // 邮箱
        email: "",
        // 手机号
        phone: "",
        // 密码
        password: "",
        // 图形码
        code: "",
        // 手机验证码
        rcode: ""
      },
      // 表单验证规则绑定
      rules: {
        // 图片验证
        avatar: [{ required: true, message: "请上传头像", trigger: "change" }],
        // 昵称验证
        username: [
          { required: true, message: "请输入昵称", trigger: "change" }
        ],
        // 邮箱验证
        email: [
          { required: true, message: "请输入邮箱", trigger: "change" },
          // 自定义验证验证
          // 就是在 rules里面加入validaror验证，validaror后面跟一个回调函数
          // 回调函数有三个参数
          // rule  规则(基本不用)
          // value 当前验证项的值
          // callback 是否验证通过的的提示信息，信息内容自定义(一般来说通过就不给值，不通过写错误信息)
          {
            validator: (rule, value, callback) => {
              // 邮箱的正则校验
              let _reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
              if (_reg.test(value)) {
                callback();
              } else {
                callback("请输入正确的邮箱地址");
              }
            },
            trigger: "change"
          }
        ],
        // 手机号验证
        phone: [
          { required: true, message: "请输入手机号", trigger: "change" },
          {
            validator: (rule, value, callback) => {
              // 手机的正则校验
              let _reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
              if (_reg.test(value)) {
                callback();
              } else {
                callback("请输入正确的手机号");
              }
            },
            trigger: "change"
          }
        ],
        // 密码验证
        password: [
          { required: true, message: "请输入密码", trigger: "change" },
          { min: 6, max: 12, message: "请输入6-12位密码", trigger: "change" }
        ],
        // 图形验证
        code: [
          { required: true, message: "请输入图形码", trigger: "change" },
          { min: 4, max: 4, message: "请输入4位图形码", trigger: "change" }
        ],
        // 手机验证码
        rcode: [
          { required: true, message: "请输入手机验证码", trigger: "change" }
        ]
      },
      // 图片地址(这是展示给我们看的)
      imageUrl: "",
      // 基地址
      baseUrl: process.env.VUE_APP_URL
    };
  },
  // 监听器
      watch: {
        dialogFormVisible(newVal) {
          if (newVal == false) {
            // 清空表单
            this.$refs.form.resetFields();
            // 清空上传图片
            this.imageUrl = '';
          }
        }
      },
  methods: {
    // 上传成功后的处理
    handleAvatarSuccess(res) {
      // res 就是接口的返回值
      //  图片的地址
      this.imageUrl = this.baseUrl + "/" + res.data.file_path;
      // 存储图片地址
      this.form.avatar = res.data.file_path;
      //  window.console.log(this.form.avatar);

      // 因为 图片上传不能绑定model(也就是双向绑定)，图片上传后不能自动验证，需要主动触发
      // validateField 对部分表单字段进行校验的方法, 第一个参数类型可以是String和array，第二个参数，是一个结果的回调函数,
      //如果前面传的是数组 ，有多个值时，它会有二条结果跑回来
      //该结果如果为空表示 没问题，如果不为空表示 验证不通过
      this.$refs.form.validateField("avatar");
    },
    // 上传前的操作
    beforeAvatarUpload(file) {
      // 文件格式限制
      const isJPG =
        file.type === "image/jpeg" ||
        file.type === "image/png" ||
        file.type === "image/gif";
      // 文件大小限制
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    // 注册确认按钮
    submitClick() {
      this.$refs.form.validate(result => {
        window.console.log(result);
        if (result) {
          register(this.form).then(res => {
            window.console.log(res);
              // 成功提示
              this.$message.success("注册成功");
              // 关闭弹窗
              this.dialogFormVisible = false;
          });
        }
      });
    },
    // 切换图形验证码
    changeCodeUrl() {
      this.codeUrl =
        process.env.VUE_APP_URL + "/captcha?type=sendsms&t=" + Date.now();
    },
    // 点击获取手机验证码
    // validateField 对部分表单字段进行校验的方法
    // 有两个参数。第一个参数验证的项，支持 string 和 array(如果是数组的并有两个或以上的参数，会一个一个的验证)，第二个参数是回调函数
    getRcodePhone() {
      let _pass = true;
      this.$refs.form.validateField(["phone", "code"], error => {
        if (error != "") {
          _pass = false;
        }
      });
      if (_pass === false) {
        return;
      } else {
        // 在计时器开始前就先减一秒，就不会存在60到59的期间点击多次手机验证
        this.totaTime--;
        let _interval = setInterval(() => {
          this.totaTime--;
          if (this.totaTime < 0) {
            clearInterval(_interval);
            this.totaTime = 60;
          }
        }, 1000);

        // 调用接口
        // 不把这个方法直接写在validateField中是因为，它的参数有是数组有两个参数(连个需要验证的项)，
        // 放在里面就是执行两次 getPhoneCode 方法所以要放在外面
        getPhoneCode({
          code: this.form.code,
          phone: this.form.phone
        }).then(res => {
          window.console.log(res);
          this.$message.success(res.data.captcha + "");
        });
      }
    }
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
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader {
    width: 178px;
    margin: 0 auto;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }

  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  .center {
    text-align: center;
  }
  .code {
    width: 143px;
    height: 41px;
  }
  .rcode {
    width: 139px;
    height: 39px;
    background-color: #fff;
    border: 1px solid rgba(211, 215, 223, 1);
    border-radius: 4px;
    text-align: center;
  }
}
</style>