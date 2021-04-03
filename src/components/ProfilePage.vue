<template>
  <div class="bg">
    <base-page></base-page>
    <div class="sidenav">
      <router-link class="current" to="/account/profile">Profile</router-link>
      <router-link to="/account/edit">Edit Profile</router-link>
      <router-link to="/account/changepassword">Change Password</router-link>
    </div>
    <div class="content">
      <h1>Profile</h1>
    </div>
    <Footer />
  </div>
</template>

<script>
import BasePage from "./Header.vue";
import Footer from "./Footer.vue";
import { mapGetters } from "vuex";

export default {
  components: { BasePage, Footer },
  data: function () {
    return {};
  },
  computed: {
    ...mapGetters(["userData"]),
  },
};
</script>

<style scoped>
.bg {
  background-color: ivory;
  overflow: scroll;
}
.sidenav {
  margin: 0;
  padding: 0;
  top: 150px;
  width: 250px;
  left: 250px;
  background-color: rgb(243, 233, 219);
  position: fixed;
  height: 100%;
  overflow: auto;
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
  position: fixed;
  width: 1000px;
  left: 500px;
  top: 150px;
  padding: 8px 0;
  background: #eadece;
  padding-left: 20px;
  height: 100%;
  overflow: auto;
}
</style>