<template>
  <div class="bg">
    <base-page></base-page>
    <div class="container">
      <div class="sidenav">
        <router-link to="/account/profile">Profile</router-link>
        <router-link to="/account/edit">Edit Profile</router-link>
        <router-link class="current" to="/account/changepassword"
          >Change Password</router-link
        >
      </div>
      <div class="content">
        <h1>Change Password</h1>
        <div id="passwordform">
          <form class="changepassword" @submit.prevent="submit">
            <label for="newpassword">Old Password</label><br />
            <input
              id="newpassword"
              type="password"
              v-model="oldPassword"
            /><br />
            <label for="newpassword">New Password</label><br />
            <input id="newpassword" type="password" v-model="password" /><br />
            <label for="confirm">Confirm Password</label><br />
            <input
              id="confirm"
              type="password"
              v-model="confirmPassword"
            /><br />
            <div v-show="passwordMatch" class="alert">
              {{ passwordMatchAlert }}
            </div>
            <button id="setpassword" type="submit">Confirm New Password</button
            ><br />
          </form>
        </div>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import BasePage from "./Header.vue";
import Footer from "./Footer.vue";
import { auth, authProvider } from "../firebase.js";

export default {
  components: { BasePage, Footer },
  data: function () {
    return {
      oldPassword: "",
      email: "",
      password: "",
      confirmPassword: "",
      passwordMatchAlert: "Passwords do not match.",
      passwordMatch: false,
    };
  },
  methods: {
    submit() {
      let self = this;
      var user = auth.currentUser;
      var credential = authProvider.credential(this.email, this.oldPassword);
                if (!this.passwordMatch) {
      user
        .reauthenticateWithCredential(credential)
        .then(function () {
            user
              .updatePassword(self.password)
              .then(() => {
                alert("Your password has been updated successfully.");
                self.$router.replace({ name: "profile" });
              })
              .catch(function (error) {
                alert(error);
              });
        })
        .catch(function (error) {
          alert(error);
        });
                }
    },
    loadUser() {
      const user = auth.currentUser;
      this.email = user.email;
    },
  },
  watch: {
    confirmPassword: function () {
      this.passwordMatch = this.password != this.confirmPassword;
    },
    password: function () {
      if (this.confirmPassword) {
        this.passwordMatch = this.password != this.confirmPassword;
      }
    },
  },
  created() {
    this.loadUser();
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
#passwordform {
  width: 60%;
}
input[type="password"],
select {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 2px solid #873600;
  border-radius: 4px;
  box-sizing: border-box;
}
#setpassword {
  width: 200px;
  background-color: black;
  color: white;
  font-family: Futura;
  padding: 14px 10px;
  margin: 8px 0;
  border: 0px;
  cursor: pointer;
  float: right;
  border-radius: 40px;
  padding: 10px;
  text-align: center;
}
#setpassword:hover {
  background-color: #873600;
  color: white;
}
#newpassword {
  background: none;
  border: 0px solid;
  background: linear-gradient(#000, #000) center bottom 1px / calc(100% - 10px)
    1px no-repeat;
}
#confirm {
  background: none;
  border: 0px solid;
  background: linear-gradient(#000, #000) center bottom 1px / calc(100% - 10px)
    1px no-repeat;
}
</style>
