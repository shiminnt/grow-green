
<template>
  <div>
    <div class="bg">
      <span>
        <img id="logoIcon" src="../assets/logo.png">
        <a id="ggName">GrowGreen</a>
      </span>
      <ul class="navbar">
        <li><router-link to="/home">HOME</router-link></li>
        <li><router-link to="/map">MAP</router-link></li>
        <li><router-link to="/news">NEWS</router-link></li>
        <li><router-link to="/quiz">QUIZ</router-link></li>
        <img id="profileIcon" src="../assets/profileIcon.png">
      </ul>
      <div>
        <p id="overviewButton" v-on:click="overview">Overview</p>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "Home",
  data: function () {
    return {
    };
  },
  methods: {
    overview() {
      this.$router.push('dashboard');
    }
  }
};
</script>

<style scoped>
.bg {
  background-image: url('../assets/homebg.png');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  position: relative;
}
#ggName {
  position: fixed;
  top: 45px;
  font-family:Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
  font-size: 30px;
  font-weight: 600;
  color: #873600;
}
#logoIcon {
  height: 70px;
  padding: 20px;
  float: left;
}
.navbar {
  display: flex;
  float: right;
  padding-right: 35px;;
  flex-wrap: wrap;
  list-style-type: none;
}
.navbar > li {
  padding: 10px;
  padding-top: 20px;
  margin: 10px;
}
.navbar > li > a {
  text-decoration: none;
  color: black;
}
.navbar > li > a:hover {
  color: grey;
}
#profileIcon {
  height: 60px;
  padding-left: 20px;
  padding-top: 10px;
}
#overviewButton {
  margin-top: 40vw;
  margin-left: 65vw;
  font-family: Futura;
  background-color: black;
  color: whitesmoke;
  border-radius: 40px;
  padding: 15px;
  text-align: center;
  width: 110px;
  position: fixed;
}
</style>