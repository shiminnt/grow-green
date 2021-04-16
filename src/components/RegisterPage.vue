<template>
  <div class="app">
    <div class="bg">
      <form class="welcomebox" @submit.prevent="submit">
        <img id="logo" src="../assets/logo.png" />
        <p id="WelcomeTitle">Welcome to GrowGreen!</p>
        <p id="registertext">Create your account here</p>
        <div v-if="error" class="alert">{{ error }}</div>
        <div class="name">
          <input
            class="textinput"
            type="name"
            v-model="name"
            placeholder="Name"
          />
        </div>
        <div class="email">
          <input
            class="textinput"
            type="email"
            v-model="email"
            placeholder="Email"
          />
        </div>
        <div class="password">
          <input
            class="textinput"
            type="password"
            v-model="password"
            placeholder="Password"
          />
        </div>
        <div class="password">
          <input
            class="textinput"
            type="password"
            v-model="confirmPassword"
            placeholder="Confirm Password"
          />
        </div>
        <div v-if="passwordMatch" class="alert">{{ passwordMatchAlert }}</div>
        <button id="signupbutton" type="submit">Sign Up</button><br />
        <span class="registertext">Have an account? Login</span>
        <button class="registerbutton" v-on:click="gotoLogin">here</button>
      </form>
    </div>
  </div>
</template>

<script>
import { database, auth } from "../firebase.js";
export default {
  data() {
    return {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      passwordMatchAlert: "Passwords do not match.",
      passwordMatch: false,
      error: null,
      takenNames:[],
    };
  },
  methods: {
    submit() {
      if (this.name == "") {
        this.error = "Invalid name.";
      } else if (this.passwordMatch) {
        this.error = "Please check your passwords.";
      } else if (this.takenNames.includes(this.name)) {
        this.error = "This username has been taken.";
      } else {
        auth
          .createUserWithEmailAndPassword(this.email, this.password)
          .then((data) => {
            database
              .collection("users")
              .doc(data.user.uid)
              .set({
                displayName: this.name,
                numArticles: 0,
                numQuiz: 0,
                numTrees: 0,
                articlesRead: [],
                questionsDone: [],
                treeDates: [],
              })
              .then(() => {});
            this.$router.replace({ name: "home" });
          })
          .catch((err) => (this.error = err.message));
      }
    },
    gotoLogin() {
      this.$router.push("/");
    },
    fetchUserData() {
      database
        .collection("users")
        .get()
        .then((snapshot) => {
          snapshot.docs.forEach((doc) => {
              this.takenNames.push(doc.data().displayName);
          });
        });
    }
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
    this.fetchUserData();
  }
};
</script>

<style>
.app {
  font-family: Futura, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.bg {
  height: 100vh;
  background-size: cover;
  overflow: hidden;
  background-color: antiquewhite;
}
#logo {
  width: 150px;
  margin-left: auto;
  margin-right: auto;
  display: block;
}
.welcomebox {
  margin: 5%;
  color: black;
  text-align: center;
}
#WelcomeTitle {
  color: black;
  font-size: 30px;
  text-align: center;
  font-weight: bold;
}
#registertext {
  font-size: 20px;
}
.textinput {
  background: transparent;
  border: none;
  border-bottom: 1px solid #000000;
  text-align: center;
  font-family: unset;
  padding: 15px 50px;
  margin-bottom: 10px;
  outline: none;
  width:200px;
}
#signupbutton {
  background-color: black;
  border: none;
  color: white;
  font-family: unset;
  font-size: 15px;
  padding: 10px 32px;
  text-align: center;
  margin: 10px;
  border-radius: 30px;
}
.registertext {
  color: black;
  font-size: 14px;
}
.alert {
  color: red;
  font-size: 14px;
}
.registerbutton {
  color: black;
  border: none;
  background-color: antiquewhite;
  font-family: unset;
  font-size: 14px;
  text-decoration: underline;
}
</style>