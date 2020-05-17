<template>
  <div class="login-container">
    <div class="header">
      <div class="h_title">
        <img src="@/assets/companyLogo.png" alt="logo">
        <!-- <img src="@/assets/dwjkLogo.png" alt="logo"> -->
        <span class="line"></span>
        <span class="words">东吴证券股权激励平台</span>
        <!-- <span class="words">东吴金科股权激励</span> -->
        <!-- <span class="words">金融综合业务管理</span> -->
      </div>
    </div>
    <div class="content">
      <el-form
        ref="loginInfo"
        :model="loginInfo"
        :rules="loginRules"
        class="login-form"
        autocomplete="on"
        label-position="left"
      >
        <div class="title-container">
          <h3 class="title">
            {{ $t('login.title') }}
          </h3>
          <lang-select class="set-language" />
        </div>
        <el-form-item prop="loginName">
          <span class="svg-container">
            <svg-icon name="user" />
          </span>
          <el-input
            ref="loginName"
            v-model="loginInfo.loginName"
            :placeholder="$t('login.username')"
            name="loginName"
            type="text"
            tabindex="1"
            autocomplete="on"
          />
        </el-form-item>

        <el-tooltip
          v-model="capsTooltip"
          content="Caps lock is On"
          placement="right"
          manual
        >
          <el-form-item prop="password">
            <span class="svg-container">
              <svg-icon name="password" />
            </span>
            <el-input
              :key="passwordType"
              ref="password"
              v-model="loginInfo.password"
              :type="passwordType"
              :placeholder="$t('login.password')"
              name="password"
              tabindex="2"
              autocomplete="on"
              @keyup.native="checkCapslock"
              @blur="capsTooltip = false"
              @keyup.enter.native="handleLogin"
            />
            <span
              class="show-pwd"
              @click="showPwd"
            >
              <svg-icon :name="passwordType === 'password' ? 'eye-off' : 'eye-on'" />
            </span>
          </el-form-item>
        </el-tooltip>

        <el-form-item
          prop="imageCode"
          class="code-form-item"
        >
          <span class="svg-container">
            <i class="el-icon-question" />
          </span>
          <el-input
            ref="imageCode"
            v-model="loginInfo.imageCode"
            :placeholder="$t('login.authcode')"
            name="imageCode"
            type="text"
            tabindex="3"
            autocomplete="on"
          />
          <span class="code-img">
            <img
              :src="imageCode"
              @click="getAuthCode()"
            >
          </span>
        </el-form-item>

        <el-button
          :loading="loading"
          type="primary"
          style="width:100%; margin-bottom:30px;"
          @click.native.prevent="handleLogin"
        >
          {{ $t('login.logIn') }}
        </el-button>

        <!-- <div style="position:relative">
          <div class="tips">
            <span>{{ $t('login.username') }} : admin </span>
            <span>{{ $t('login.password') }} : admin </span>
          </div>

          <el-button
            class="thirdparty-button"
            type="primary"
            @click="showDialog=true"
          >
            {{ $t('login.thirdparty') }}
          </el-button>
        </div> -->
      </el-form>
      <div class="footer">
        Copyright © 2020 SOOCHOW SECURITIES CO.,LTD. All Rights Reserved.
      </div>
      <el-dialog
        :title="$t('login.thirdparty')"
        :visible.sync="showDialog"
      >
        {{ $t('login.thirdpartyTips') }}
        <br>
        <br>
        <br>
        <social-sign />
      </el-dialog>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { Route } from 'vue-router'
import { Dictionary } from 'vue-router/types/router'
import { Form as ElForm, Input } from 'element-ui'
import { UserModule } from '@/store/modules/user'
import { isValidUsername } from '@/utils/validate'
import LangSelect from '@/components/LangSelect/index.vue'
import SocialSign from './components/SocialSignin.vue'
// import { getAuthCode } from '@/api/api'
// import RSAKey from '@/utils/rsa.js'
import { DWLoginData } from '../../api/types'
// import { getEncryptionParams, login } from '../../api/api'
// import qs from 'qs'

@Component({
  name: 'Login',
  components: {
    LangSelect,
    SocialSign
  }
})

export default class extends Vue {
  private imageCode = ''
  private validateUsername = (rule: any, value: string, callback: Function) => {
    if (value.length === 0) {
      callback(new Error('请输入账号'))
    } else if (!isValidUsername(value)) {
      callback(new Error('请输入合法的账号'))
    } else {
      callback()
    }
  }

  private loginInfo: DWLoginData = {
    loginName: '',
    password: '',
    pwkey: '',
    imageCode: '',
    imageKey: ''
  }
  private loginRules = {
    // loginName: [{ validator: this.validateUsername, trigger: 'blur' }],
    loginName: { required: true, message: '请输入用户登录名', trigger: 'blur' },
    password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
    imageCode: [{ required: true, message: '请输入验证码', trigger: 'blur'}]
  }
  private passwordType = 'password'
  private loading = false
  private showDialog = false
  private capsTooltip = false
  private redirect?: string
  private otherQuery: Dictionary<string> = {}

  @Watch('$route', { immediate: true })
  private onRouteChange(route: Route) {
    const query = route.query as Dictionary<string>
    if (query) {
      this.redirect = query.redirect
      this.otherQuery = this.getOtherQuery(query)
    }
  }

  mounted() {
    // if (this.loginInfo.loginName === '') {
    //   (this.$refs.loginName as Input).focus()
    // } else if (this.loginInfo.password === '') {
    //   (this.$refs.password as Input).focus()
    // } else if (this.loginInfo.imageCode === '') {
    //   (this.$refs.imageCode as Input).focus()
    // }
    // this.getAuthCode()
  }

  // 获取验证码
  // private getAuthCode() {
  //   getAuthCode().then(res => {
  //     this.imageCode = res.data.imageCode
  //     this.loginInfo.imageKey = res.data.imageKey
  //   })
  // }

  private checkCapslock(e: KeyboardEvent) {
    const { key } = e
    this.capsTooltip =
      key !== null && key.length === 1 && key >= 'A' && key <= 'Z'
  }

  private showPwd() {
    if (this.passwordType === 'password') {
      this.passwordType = ''
    } else {
      this.passwordType = 'password'
    }
    this.$nextTick(() => {
      (this.$refs.password as Input).focus()
    })
  }

  // 提交登录
  private handleLogin() {
    (this.$refs.loginInfo as ElForm).validate(async (valid: boolean) => {
      if (valid) {
        try {
          this.loading = true
          // let res = await getEncryptionParams()
          // let { rsaParameter1, rsaParameter2, pwkey } = res.data
          // var params = {...this.loginInfo};
          // params.password = this.rsaEncrypt(
          //   this.loginInfo.password,
          //   rsaParameter1,
          //   rsaParameter2
          // )
          // params.pwkey = pwkey
          // await UserModule.Login(params)
          // this.$message({
          //   message: '登录成功',
          //   type: 'success'
          // });
          this.$router.push({
            // path: this.redirect || '/',
            path: '/',
            // query: this.otherQuery
          })
          this.loading = false
        } catch (error) {
          this.loading = false
        }
      } else {
        return false
      }
    })
  }

  // 密码加密
  // private rsaEncrypt(
  //   password: string,
  //   loginRsaParam1: string,
  //   loginRsaParam2: string
  // ) {
  //   var rsa = new RSAKey()
  //   rsa.setPublic(loginRsaParam1, loginRsaParam2)
  //   var res = rsa.encrypt(password)
  //   return res
  // }

  private getOtherQuery(query: Dictionary<string>) {
    return Object.keys(query).reduce((acc, cur) => {
      if (cur !== 'redirect') {
        acc[cur] = query[cur]
      }
      return acc
    }, {} as Dictionary<string>)
  }
}
</script>

<style lang="scss">
// References: https://www.zhangxinxu.com/wordpress/2018/01/css-caret-color-first-line/
@supports (-webkit-mask: none) and (not (cater-color: $loginCursorColor)) {
  .login-container .el-input {
    input {
      // color: $loginCursorColor;
      color: #999;
    }
    input::first-line {
      // color: $lightGray;
      color: #999;
    }
  }
}

.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      height: 47px;
      background: transparent;
      border: 0px;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      // color: $lightGray;
      color: #999;
      // caret-color: $loginCursorColor;
      caret-color: #999;
      -webkit-appearance: none;

      &:-webkit-autofill {
        // box-shadow: 0 0 0px 1000px $loginBg inset !important;
        box-shadow: none!important;
        // -webkit-text-fill-color: #fff !important;
        -webkit-text-fill-color: #999 !important;
        background-color: #fff!important;
      }
      &:-webkit-autofill-selected{
        background-color: #fff!important;
      }
    }
  }

  .el-form-item {
    // border: 1px solid rgba(255, 255, 255, 0.1);
    // background: rgba(0, 0, 0, 0.1);
    border-bottom: 1px solid #ddd;
    background: #fff;
    // border-radius: 5px;
    // color: #454545;
    color: #999;
  }
}
</style>

<style lang="scss" scoped>
.login-container {
  height: 100%;
  width: 100%;
  overflow: hidden;
  // background-color: $loginBg;
  .header{
    height: 60px;
    width: 100%;
    background: white;
    .h_title{
      height: 100%;
      display: flex;
      align-items: center;
      padding: 0 20px;
      img{
        width: 120px;
        height: 28px;
      }
      .line{
        width: 3px;
        height: 28px;
        display: inline-block;
        background: #999;
        margin: 0 30px;
      }
      .words{
        font-size: 16px;
        color: #297bbe;
      }
    }
  }

  .content{
    position: relative;
    height: calc(100% - 60px);
    min-width: 100%;
    min-height: calc(100% - 60px);
    background: url("../../assets/loginbg.png") no-repeat;
    background-size:100% 100%;
  }

  .footer{
    position: absolute;
    bottom: 20px;
    left: calc(50% - 250px);
    color: #000;
    font-size: 14px;
  }

  .login-form {
    position: absolute;
    top: calc(50% - 240px);
    right: 120px;
    width: 400px;
    max-width: 100%;
    height: 376px;
    // padding: 160px 35px 0;
    padding: 30px 18px;
    background: #fff;
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    // margin: 120px;
    // margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .code-form-item {
    position: relative;
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    // color: $darkGray;
    color: #278cde;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }
  .code-img {
    padding: 10px 0;
    vertical-align: middle;
    width: 60px;
    display: inline-block;
    position: absolute;
    right: 10px;
    img {
      width: 100%;
      cursor: pointer;
    }
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      // color: $lightGray;
      color: #278cde;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }

    .set-language {
      // color: #fff;
      color: #278cde;
      position: absolute;
      top: 3px;
      font-size: 18px;
      right: 0px;
      cursor: pointer;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $darkGray;
    cursor: pointer;
    user-select: none;
  }

  .thirdparty-button {
    position: absolute;
    right: 0;
    bottom: 6px;
  }

  @media only screen and (max-width: 470px) {
    .thirdparty-button {
      display: none;
    }
  }
}
</style>
