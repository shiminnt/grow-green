
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
          <li><router-link to="/volunteer">VOLUNTEER</router-link></li>
          <li><router-link to="/newsmenu">NEWS</router-link></li>
          <li><router-link to="/quiz">QUIZ</router-link></li>
          <div class="dropdown">
          <img id="profileIcon" src="../assets/profileIcon.png" />
          <div class="dropdown-content">
            <p>profile</p>
            <p @click="signOut">log out</p>
          </div>
        </div>
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
import {mapGetters} from 'vuex'

export default {
  name: "Home",
  components: {
    Footer,
  },
  data: function () {
    return {
      initialData: {},
      displayName: "",
      hover: false,
    };
  },
  computed: {
    ...mapGetters([
      'userData'
    ])
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
          .then((doc) => {
            this.initialData = doc.data()
            if (this.userData) {
              if (this.initialData.displayName == this.userData.displayName) {
                this.$store.dispatch('updateUserData', this.userData)
              } else {
                this.$store.dispatch('updateUserData', this.initialData)
              }
            } else {
              this.$store.dispatch('updateUserData', this.initialData)
            }
            });
      }
    },
    signOut() {
      const user = auth.currentUser;
      const uid = user.uid;
      database
          .collection("users")
          .doc(uid)
          .set(this.userData)
          .then(() => {
            console.log("Document successfully written!")
            auth.signOut().then(() => {
              this.$router.replace({
                name: "login",
              });
            })
          })
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
.dropdown-content p:hover {
  color: grey;
}
.dropdown {
  float: left;
  overflow: hidden;
}
.dropdown-content {
  display: none;
  position: absolute;
  background-color: #F2EDDC;
  min-width: 100px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
}
.dropdown-content > p {
  float: none;
  color: black;
  text-decoration: none;
  display: block;
  text-align: center;
}
.dropdown:hover .dropdown-content {
  display: block;
}
#profileIcon {
  height: 60px;
  padding-left: 20px;
  padding-top: 10px;
}
#overviewButton {
  margin-top: 34vw;
  margin-left: 54vw;
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
  background: #EADECE;
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