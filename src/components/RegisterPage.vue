<template>
  <div class="app">
    <div class="bg">
      <form class="welcomebox" @submit.prevent="pressed">
        <img id="logo" src="../assets/logo.png">
        <p id='WelcomeTitle'>Welcome to GrowGreen!</p>
        <p id="registertext">Create your account here</p>
        <div class="email">
          <input class="textinput" type="email" v-model="email" placeholder="Email" />
        </div>
        <div class="password">
          <input class="textinput" type="password" v-model="password" placeholder="Password" />
        </div>
        <button id="signupbutton" type="submit">Sign Up</button><br>
        <span class="registertext">Have an account? Login</span>
        <button class="registerbutton" v-on:click="gotoLogin">here</button>
      </form>
    </div>
  </div>
</template>

<script>
import { auth } from "../firebase.js";
export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    pressed() {
      auth
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(() => {
          console.log("here");
          this.$router.replace({ name: "home" });
        })
        .catch((error) => (alert(error)));
    },
    gotoLogin() {
      this.$router.push('/')
    },
  },
};
</script>

<style>
.app {
  font-family: Futura, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.bg {
  height: 100vh;
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
  margin: 10%;
  color: black;
  text-align: center;
}
#WelcomeTitle {
  color:black;
  font-size: 30px;
  text-align: center;
  font-weight: bold;
}
#registertext {
  font-size: 20px;
}
.textinput{
  background: transparent;
  border: none;
  border-bottom: 1px solid #000000;
  text-align: center;
  font-family: unset;
  padding: 15px 50px;
  margin-bottom: 10px;
  outline: none;
}
#signupbutton{
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
.registerbutton {
  color:black;
  border: none;
  background-color: antiquewhite;
  font-family: unset;
  font-size:14px;
  text-decoration: underline;
}
</style>