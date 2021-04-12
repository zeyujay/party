<template>
  <div class="login">
    <div class="title">互动工具</div>
    <div class="input_item">
      <input placeholder="请输入账号"
             v-model="account"
             class="input"
             type="text" />
    </div>
    <div class="input_item">
      <input placeholder="请输入密码"
             v-model="password"
             class="input"
             type="password" />
    </div>
    <div v-if="!isLogin"
         class="input_item">
      <input placeholder="请输入公司名称"
             v-model="name"
             class="input"
             type="text" />
    </div>
    <div v-if="!isLogin"
         class="input_item">
      <input placeholder="请输入公司地址"
             v-model="address"
             class="input"
             type="text" />
    </div>
    <div v-if="!isLogin"
         class="input_item">
      <input placeholder="请输入公司联系电话"
             v-model="telephone"
             class="input"
             type="text" />
    </div>
    <div class="register_button"
         @click="isLogin = !isLogin">
      {{ isLogin ? "前往注册" : "前往登陆" }}
    </div>
    <!-- <div class="login_button"
         v-if="!isLogin"
         @click="register">注册</div> -->
    <div class="login_button"
         @click="login">登陆</div>
  </div>
</template>
<script>
export default {
  name: "Login",
  data () {
    return {
      isLogin: true,
      name: "",
      address: "",
      telephone: "",
      account: "",
      password: "",
    };
  },
  methods: {
    /* login() {
      this.$store.commit("SET_LOGIN_STATUS", true);
      this.$router.push({ name: "Home" });
    }, */
    async register () {
      let data = {
        name: this.name,
        address: this.address,
        telephone: this.telephone,
        account: this.account,
        password: this.password,
      };
      let result = this.$store.dispatch("register", data);
      if (result.code == 200) {
        this.isLogin = true;
      }
    },
    async login () {
      /*  this.$store.commit("SET_LOGIN_STATUS", true);
       this.$router.push({ name: "Home" }); */
      let data = {
        account: this.account,
        password: this.password,
      };
      let result = await this.$store.dispatch("login", data);
      if (result.code == 200) {
        this.$store.commit("SET_LOGIN_STATUS", true);
        this.$router.push({ name: "Home" });
      }
    },
  },
};
</script>
<style lang="css" scoped>
.login_type {
  display: flex;
}
.login {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #a9221f;
  font-size: 0.2rem;
  text-align: center;
}

.login > div span {
  display: inline-block;
}
.input_item {
  display: flex;
  height: 0.35rem;
  justify-content: space-between;
  width: 3rem;
  margin-top: 30px;
}
.input_item span {
  display: inline-block;
  height: 100%;
  text-align: right;
  line-height: 0.35rem;
}
.title {
  font-weight: bold;
  font-size: 0.3rem;
  text-align: center;
}
input {
  flex-grow: 1;
}
input::-webkit-input-placeholder {
  color: #c37072;
  font-size: 0.15rem;
}
button {
  width: 30%;
  margin-top: 50px;
}
.login_button {
  width: 1rem;
  height: 0.45rem;
  border-radius: 10px;
  color: #fff;
  line-height: 0.45rem;
  font-size: 0.25rem;
  background: #a9221f;
}
.register_button {
  margin: 0.2rem;
}
</style>
