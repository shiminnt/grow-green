<template>
  <div class="app">
    <div class="bg" :style="{ backgroundImage: 'url(' + image + ')' }">
      <div class="welcomebox">
        <p>Welcome!</p>
        <textarea v-model="email" placeholder="email"></textarea> <br>
        <textarea v-model="password" placeholder="password"></textarea> <br>
        <button> Login </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  data: function () {
    return {
      image:
        "https://www.kidsofbath.com/wp-content/uploads/2019/02/rainbow-woods-kidsofbath.jpg",
    };
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
  height:100vh;
  background-size: cover;
  overflow: hidden;
  opacity: 85%;
}

.welcomebox {
  margin: 20%;
  background-color: rgba(0, 0, 0, 0.82);
  color: azure;
  text-align: center;
}
</style>
