<template>
  <div>
    <div class="bg">
      <img id="logoIcon" src="../assets/logo.png" />
      <a id="ggName">GrowGreen</a>
      <ul class="navbar">
        <li><router-link to="/home">HOME</router-link></li>
        <li><router-link to="/map">MAP</router-link></li>
        <li><router-link to="/newsmenu">NEWS</router-link></li>
        <li><router-link to="/quiz">QUIZ</router-link></li>
        <li><router-link to="/dashboard">OVERVIEW</router-link></li>
        <!-- <input type="submit" id="profileIcon" src="../assets/profileIcon.png"/> -->
        <div class="dropdown">
          <img id="profileIcon" src="../assets/profileIcon.png" />
          <div class="dropdown-content">
<<<<<<< HEAD
            <p>profile</p> 
            <p @click="signOut">log out</p> 
=======
            <p>PROFILE</p>
            <p @click="signOut">LOGOUT</p>
>>>>>>> 937e27b92ed301d382cae69625ca7d69d27bea41
          </div>
        </div>
        <li>{{ displayName }}</li>
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
    };
  },
  methods: {
    mouseOver() {
      this.hover = !this.hover;
    },
    signOut() {
      auth.signOut().then(() => {
        this.$router.replace({
          name: "login",
        });
      });
    },
    loadUserData: function () {
      const user = auth.currentUser;
      if (user) {
        const uid = user.uid;
        database
          .collection("users")
          .doc(uid)
          .get()
          .then(
            (doc) => (this.displayName = doc.data().displayName.toUpperCase())
          );
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
}
.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f9f9f9;
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
</style>