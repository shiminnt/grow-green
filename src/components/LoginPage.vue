<template>
  <div class="app">
    <div class="bg" :style="{ backgroundImage: 'url(' + image + ')' }">
      <div class="welcomebox">
        <p>Welcome!</p>
        <textarea v-model="email" placeholder="email"></textarea> <br>
        <textarea v-model="password" placeholder="password"></textarea> <br>
        <button v-on:click="login"> Login </button>
      </div>
    </div>
  </div>
</template>

<script>
import background from "../assets/background.png"

export default {
  name: "App",
  data: function () {
    return {
      image: background,
    };
  },
  methods: {
    login() {
      this.$router.push('home')
    }
  }
};
</script>

<style>
.app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.bg {
  height:100vh;
  background-size: cover;
  overflow: hidden;
}

.welcomebox {
  margin: 20%;
  background-color: rgba(0, 0, 0, 0.80);
  color: azure;
  text-align: center;
}
</style>
