<template>
  <div class="bg">
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

export default {
  name: "App",
  data: function () {
    return {
    };
  },
};
</script>

<style scoped>
.bg {
  height:100vh;
  background-size: cover;
  overflow: hidden;
  background-color: antiquewhite;
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