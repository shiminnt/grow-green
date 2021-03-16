<template>
  <div class="app">
    <div class="bg" :style="{ backgroundImage: 'url(' + image + ')' }">
      <form class="welcomebox" @submit.prevent="pressed">
        Register
        <div class="email">
          <input type="email" v-model="email" placeholder="email" />
        </div>
        <div class="password">
          <input type="password" v-model="password" placeholder="password" />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  </div>
</template>

<script>
import background from "../assets/background.png";
import { auth } from "../firebase.js";
export default {
  data() {
    return {
      image: background,
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
  },
};
</script>

<style>
.app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.bg {
  height: 100vh;
  background-size: cover;
  overflow: hidden;
}

.welcomebox {
  margin: 20%;
  background-color: rgba(0, 0, 0, 0.8);
  color: azure;
  text-align: center;
}
</style>