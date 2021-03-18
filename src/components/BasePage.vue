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
        <li><router-link to="/dashboard">OVERVIEW</router-link></li>
        <!-- <input type="submit" id="profileIcon" src="../assets/profileIcon.png"/> -->
        <img id="profileIcon" src="../assets/profileIcon.png" @mouseover="mouseOver">
        <div v-show="hover">Profile<br> Log Out</div>
      </ul>
    </div>
  </div>
</template>

<script>

export default {
  name: "App",
  data: function () {
    return {
      hover: false
    };
  },
  methods: {
    mouseOver() {
      this.hover = !this.hover;
    }
  }
};
</script>

<style scoped>
.bg {
  background-color: ivory;
  background-size: over;
  background-repeat: no-repeat;
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
</style>