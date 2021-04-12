<template>
  <div>
    <div class="bg">
      <img id="logoIcon" src="../assets/logo.png" @click="goToHome" />
      <a id="ggName" @click="goToHome">GrowGreen</a>
      <ul class="navbar">
        <li><router-link to="/home">HOME</router-link></li>
        <li><router-link to="/volunteermenu">VOLUNTEER</router-link></li>
        <li><router-link to="/newsmenu">NEWS</router-link></li>
        <li><router-link to="/quizquestion">QUIZ</router-link></li>
        <li><router-link to="/dashboard">OVERVIEW</router-link></li>
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
          {{ displayName }}
          <div class="dropdown-content">
            <p @click="goToAccount">ACCOUNT</p>
            <p @click="signOut">LOGOUT</p>
          </div>
        </div>
      </ul>
    </div>
  </div>
</template>

<script>
import { database, auth } from "../firebase.js";

export default {
  name: "Header",
  data: function () {
    return {
      displayName: "",
      hover: false,
      photoUrl: null,
    };
  },
  methods: {
    mouseOver() {
      this.hover = !this.hover;
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
            sessionStorage.clear()
            this.$router.replace({
              name: "login",
            });
          });
        });
    },
    goToAccount() {
      this.$router.push({ name: "profile" });
    },
    goToHome() {
      this.$router.push({ name: "home" });
    },
    loadUserData: function () {
      const user = auth.currentUser;
      if (user) {
        this.photoUrl = user.photoURL;

        const uid = user.uid;
        database
          .collection("users")
          .doc(uid)
          .get()
          .then((doc) => (this.displayName = doc.data().displayName));
      }
    },
  },
  created() {
    this.loadUserData();
  },
};
</script>

<style scoped>
.bg {
  background-color: ivory;
  background-size: over;
  background-repeat: no-repeat;
  height: 100px;
}
#ggName {
  position: sticky;
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
</style>