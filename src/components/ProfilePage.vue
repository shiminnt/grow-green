<template>
  <div class="bg">
    <base-page></base-page>
    <div class="container">
      <div class="sidenav">
        <router-link class="current" to="/account/profile">Profile</router-link>
        <router-link to="/account/edit">Edit Profile</router-link>
        <router-link to="/account/changepassword">Change Password</router-link>
      </div>
      <div class="content">
        <h1>Profile</h1>
        <div v-if="photoUrl != null" class="image-cropper">
          <img class="preview" v-bind:src="photoUrl" alt="Avatar" />
          <br />
        </div>
        <div v-if="photoUrl == null" class="image-cropper">
          <img class="preview" src="../assets/profileIcon.png" alt="Avatar" />
          <br />
        </div>
        <table>
          <tr>
            <td class="details">Username</td>
            <td class="userdata">{{ this.displayName }}</td>
          </tr>
          <tr>
            <td class="details">Email</td>
            <td class="userdata">{{ this.email }}</td>
          </tr>
          <tr>
            <td class="details">Date Joined</td>
            <td class="userdata">{{ this.joinDate }}</td>
          </tr>
        </table>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import BasePage from "./Header.vue";
import Footer from "./Footer.vue";
import { mapGetters } from "vuex";
import { database, auth } from "../firebase.js";

export default {
  components: { BasePage, Footer },
  data: function () {
    return {
      displayName: null,
      email: null,
      photoUrl: null,
      joinDate: null,
    };
  },
  computed: {
    ...mapGetters(["userData"]),
  },
  methods: {
    loadUserData: function () {
      const user = auth.currentUser;
      if (user) {
        this.email = user.email;
        this.photoUrl = user.photoURL;
        this.joinDate = user.metadata.creationTime;

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
  overflow-y: scroll;
}
.container {
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
  padding: 0;
  width: 100%;
  justify-content: center;
}
.sidenav {
  width: 15%;
  background-color: rgb(243, 233, 219);
  float: left;
}
.sidenav a {
  text-decoration: none;
  font-size: 20px;
  display: block;
  font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
  color: black;
  padding: 16px;
}
.sidenav a:hover {
  color: grey;
}
.sidenav a.current {
  background-color: #eadece;
  color: black;
  text-decoration: none;
  font-size: 20px;
  display: block;
  font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
}
.content {
  text-align: left;
  width: 60%;
  padding: 8px 0px 8px 20px;
  background: #eadece;
  height: 1000px;
  float: left;
}
.image-cropper {
  width: 300px;
  height: 300px;
  position: relative;
  overflow: hidden;
  border-radius: 50%;
  margin-left: auto;
  margin-right: auto;
}
img.preview {
  display: inline;
  margin: 0 auto;
  height: 100%;
  width: auto;
}
#default {
  display: inline;
  margin: 0 auto;
  height: 100%;
  width: auto;
}
table {
  margin-top: 30px;
  width: 60%;
  font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
  font-size: 18px;
  border-collapse: collapse;
  margin: 0 auto;
}
.details {
  color: #873600;
}
tr {
  border-bottom: 1px solid #838383;
}
td {
  padding: 0px;
}
</style>