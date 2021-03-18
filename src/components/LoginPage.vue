<template>
  <div class="app">
    <div class="bg">
      <div class="welcomebox">
        <img id="logo" src="../assets/logo.png">
        <h1 id="WelcomeTitle">Grow Green</h1>
        <p>Welcome back</p>
        <input class="textinput" v-model="email" placeholder="Email"> <br>
        <input class="textinput" v-model="password" placeholder="Password"> <br>
        <button id="loginbutton" v-on:click="login"> Login </button> <br>
        <span class="registertext">No account? Register</span>
        <button class="registerbutton" v-on:click="register">here</button>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "App",
  data: function () {
    return {
    };
  },
  methods: {
    login() {
      this.$router.push('home')
    },
    register() {
      this.$router.push('register')
    }
  }
};
</script>

<style>
.app {
  font-family: unset;
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
  color:black;
  font-size: 40px;
  font-family: Futura;
}
p {
  font-family: Playfair;
  font-weight: bold;
  font-size: 20px;;
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
.registerbutton {
  color:black;
  border: none;
  background-color: antiquewhite;
  font-family: unset;
  font-size:14px;
  text-decoration: underline;
}
</style>
