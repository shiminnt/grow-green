<template>
<div class="app">
    <div class="bg">
        <form class="welcomebox" @submit.prevent="submit">
        <h1>Reset Your Password</h1>
        <input class="textinput" type="email" v-model="email" placeholder="Email"> <br>
        <button id="resetbutton" type="submit">Send Password Reset Link</button><br />
        </form>
    </div>
</div>
</template>

<script>
import { auth } from "../firebase.js";
export default {
    data: function() {
        return {
            email: "",
            error: null,
        };
    },
    methods: {
        submit() {
            auth.sendPasswordResetEmail(this.email)
            .then(() => {
                alert("Password reset email sent successfully. Please check your email.")
            })
            .catch(err => {
                this.error=err.message
            })
        }
    }
}
</script>

<style scoped>
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
.welcomebox {
  margin-top: 15%;
  align-content: center;
}
.textinput {
  background: transparent;
  border: none;
  border-bottom: 1px solid #000000;
  text-align: center;
  font-family: unset;
  padding: 15px 0px;
  margin-bottom: 10px;
  outline: none;
}
#resetbutton {
  background-color: black;
  border: none;
  color: white;
  font-family: unset;
  font-size: 15px;
  padding: 10px 32px;
  text-align: center;
  margin: 10px;
  border-radius: 30px;
}
</style>
