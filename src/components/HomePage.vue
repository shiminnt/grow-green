
<template>
  <div>
    <div class="bg">
      <div class="header">
        <span>
          <img id="logoIcon" src="../assets/logo.png" />
          <a id="ggName">GrowGreen</a>
        </span>
        <ul class="navbar">
          <li><router-link to="/home">HOME</router-link></li>
          <li><router-link to="/map">MAP</router-link></li>
          <li><router-link to="/newsmenu">NEWS</router-link></li>
          <li><router-link to="/quiz">QUIZ</router-link></li>
          <img id="profileIcon" src="../assets/profileIcon.png" />
        </ul>
        <div>
          <p id="overviewButton" v-on:click="overview">Overview</p>
        </div>
      </div>
      <div id="overview">
        <div class="overviewBoxes" id="treesPlanted">
          <p class="number">{{ userData.numTrees }}</p>
          <p class="text">trees<br />planted</p>
        </div>
        <div class="overviewBoxes" id="articlesRead">
          <p class="number">{{ userData.numArticles }}</p>
          <p class="text">articles<br />read</p>
        </div>
        <div class="overviewBoxes" id="questionsDone">
          <p class="number">{{ userData.numQuiz }}</p>
          <p class="text">questions<br />done</p>
        </div>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import { database, auth } from "../firebase.js";
import Footer from "./Footer.vue";

export default {
  name: "Home",
  components: {
    Footer,
  },
  data: function () {
    return {
      userData: {},
    };
  },
  methods: {
    loadUserData: function () {
      const user = auth.currentUser;
      if (user) {
        const uid = user.uid;
        database
          .collection("users")
          .doc(uid)
          .get()
          .then((doc) => (this.userData = doc.data()));
      }
    },
    overview() {
      this.$router.push("dashboard");
    },
  },
  created() {
    this.loadUserData();
  },
};
</script>

<style scoped>
.bg {
  background-image: url("../assets/homebg.png");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  position: relative;
}
#ggName {
  position: fixed;
  top: 35px;
  font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
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
  padding-right: 35px;
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
  margin-top: 30vw;
  margin-left: 56vw;
  font-family: Futura;
  background-color: black;
  color: whitesmoke;
  border-radius: 40px;
  padding: 15px;
  text-align: center;
  width: 110px;
  position: fixed;
}

.header {
  height: 100px;
}

#overview {
  display: flex;
  margin-left: 15%;
}

.overviewBoxes {
  display: flex;
  text-align: center;
  opacity: 82%;
  margin-top: 20%;
  margin-left: 25%;
  padding-right: 5%;
  background: rgba(157, 90, 45, 0.82);
  border-radius: 12%;
}

.number {
  margin: 10%;
  font-size: 80px;
}

.text {
  font-size: 30px;
}
</style>