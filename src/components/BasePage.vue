

<template>
  <div class="bg" :style="{ backgroundImage: 'url(' + image + ')' }">
    <div class="navbar">
      <nav>
        <button id="btn"><router-link to="/home"><img src="../assets/homelogo.png"></router-link></button>
        <button id="btn"><router-link to="/map"><img src="../assets/maplogo.png"></router-link></button>
        <button id="btn"><router-link to="/news"><img src="../assets/newslogo.png"></router-link></button>
        <button id="btn"><router-link to="/quiz"><img src="../assets/quizlogo.png"></router-link></button>
      </nav>
    </div>
  </div>
</template>

<script>
import background from "../assets/background.png"

export default {
  name: "App",
  data: function () {
    return {
      image: background
    };
  },
};
</script>

<style scoped>
.bg {
  height:100vh;
  background-size: cover;
  overflow: hidden;
}
.navbar {
  background-color: black;
  opacity: 82%;
  text-align: center;
}

#btn {
  background-color: black;
  border:0px;
}
</style>