<template>
  <div class="app">
    <div class="bg">
      <form class="welcomebox" @submit.prevent="submit">
        <img id="logo" src="../assets/logo.png">
        <h1 id="WelcomeTitle">Grow Green</h1>
        <p>Welcome back</p>
        <div v-if="error" class="alert">{{error}}</div>
        <input class="textinput" type="email" v-model="email" placeholder="Email"> <br>
        <input class="textinput" type="password" v-model="password" placeholder="Password"> <br>
        <button id="loginbutton" type="submit"> Login </button> 
        <br>
        <button class="resetpasswordbutton" v-on:click="forgotPassword">Forgot Password?</button>
        <br>
        <span class="registertext">No account? Register</span>
        <button class="registerbutton" v-on:click="register">here</button>
      </form>
    </div>
  </div>
</template>

<script>
import { auth } from "../firebase.js";
export default {
  name: "App",
  data: function () {
    return {
      email:"",
      password:"",
      error:null
    };
  },
  methods: {
      submit() {
        auth.signInWithEmailAndPassword(this.email, this.password)
        .then(() => {
          this.$router.replace({ name: "home" });
        })
        .catch(err => {
          this.error = err.message;
        });
    },
    forgotPassword() {
      this.$router.push('forgotpassword')
    },
    register() {
      this.$router.push('register')
    },
  }
};
</script>

<style>
.app {
  font-family: Futura, Helvetica, Arial, sans-serif;;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.bg {
  height:100vh;
  background-size: cover;
  overflow: hidden;
  background-color:antiquewhite;
}
#logo{
  width: 150px;
  margin-left: auto;
  margin-right: auto;
  display: block;
}
.welcomebox {
  color: azure;
  align-content: center;
}
#WelcomeTitle {
  margin-top: 5vh;
  color:black;
  font-size: 40px;
  font-family: Futura;
}
p {
  font-family: Playfair;
  font-weight: bold;
  font-size: 20px;
}
.textinput{
  background: transparent;
  border: none;
  border-bottom: 1px solid #000000;
  text-align: center;
  font-family: unset;
  padding: 15px 0px;
  margin-bottom: 10px;
  outline: none;
}
#loginbutton{
  background-color: black;
  border: none;
  color: white;
  font-family:unset;
  font-size: 15px;
  padding: 10px 32px;
  text-align: center;
  margin: 10px;
  border-radius: 30px;
}
.registertext{
  color:black;
  font-size:14px;
}
.alert{
  color:red;
  font-size:14px;
}
.registerbutton {
  color:black;
  border: none;
  background-color: antiquewhite;
  font-family: unset;
  font-size:14px;
  text-decoration: underline;
}
.resetpasswordbutton {
  color:black;
  border: none;
  background-color: antiquewhite;
  font-family: unset;
  font-size:14px;
  text-decoration: underline;
}
</style>
