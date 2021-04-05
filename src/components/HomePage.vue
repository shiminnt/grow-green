
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
          <li><router-link to="/volunteermenu">VOLUNTEER</router-link></li>
          <li><router-link to="/newsmenu">NEWS</router-link></li>
          <li><router-link to="/quizquestion">QUIZ</router-link></li>
          <div class="image-cropper">
            <img
              class="profileIcon"
              v-if="photoUrl != null"
              v-bind:src="photoUrl"
            />
            <img class="profileIcon" v-else src="../assets/profileIcon.png" />
          </div>
          <!-- <input type="submit" id="profileIcon" src="../assets/profileIcon.png"/> -->
          <div class="dropdown">
            {{ userData.displayName }}
            <div class="dropdown-content">
              <p @click="goToAccount">ACCOUNT</p>
              <p @click="signOut">LOGOUT</p>
            </div>
          </div>
        </ul>
        <div>
          <p id="overviewButton" v-on:click="overview">Overview</p>
          <p id="knowledgeButton" v-on:click="goToKnowledgeBank">Plant Tree</p>
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
import { mapGetters } from "vuex";

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
      photoUrl: null,
    };
  },
  computed: {
    ...mapGetters(["userData"]),
  },
  methods: {
    loadUserData: function () {
      const user = auth.currentUser;
      if (user) {
        this.photoUrl = user.photoURL;
        const uid = user.uid;
        database
          .collection("users")
          .doc(uid)
          .get()
          .then((doc) => {
            this.initialData = doc.data();
            if (this.userData) {
              if (this.initialData.displayName == this.userData.displayName) {
                this.$store.dispatch("updateUserData", this.userData);
              } else {
                this.$store.dispatch("updateUserData", this.initialData);
              }
            } else {
              this.$store.dispatch("updateUserData", this.initialData);
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
          console.log("Document successfully written!");
          auth.signOut().then(() => {
            this.$router.replace({
              name: "login",
            });
          });
        });
    },
    goToAccount() {
      this.$router.push({ name: "profile" });
    },
    overview() {
      this.$router.push("dashboard");
    },
    goToKnowledgeBank() {
      this.$router.push("knowledgebank");
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
  padding: 10px;
  padding-left: 0px;
  padding-top: 12px;
  margin: 10px;
  font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
  font-size: 25px;
  font-weight: 600;
  color: #873600;
}
.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f2eddc;
  min-width: 120px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
}
.dropdown-content > p {
  float: none;
  color: black;
  text-decoration: none;
  display: block;
  text-align: left;
  font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
  font-size: 15px;
  padding-left: 10px;
  position: relative;
}
.dropdown:hover .dropdown-content {
  display: block;
}
.profileIcon {
  display: inline;
  margin: 0 auto;
  height: 100%;
  width: auto;
}
.image-cropper {
  /* padding-left: 20px;
  padding-top: 20px; */
  margin-top: 20px;
  width: 30px;
  height: 30px;
  position: relative;
  overflow: hidden;
  border-radius: 50%;
}
#overviewButton {
  margin-top: 34vw;
  margin-left: 65vw;
  font-family: Futura;
  background-color: rgb(6, 48, 6);
  color: whitesmoke;
  border-radius: 40px;
  padding: 15px;
  text-align: center;
  width: 160px;
  position: fixed;
}
#knowledgeButton {
  margin-top: 34vw;
  margin-left: 42vw;
  font-family: Futura;
  background-color: rgb(6, 48, 6);
  color: whitesmoke;
  border-radius: 40px;
  padding: 15px;
  text-align: center;
  width: 160px;
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
  background: #eadece;
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