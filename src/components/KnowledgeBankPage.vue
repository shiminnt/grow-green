<template>
  <div class="bg">
    <Header></Header>
    <div id="knowledgeBox">
      <div id="qCash">
        <p class="text">Questions not Cashed: {{ numQuestionsNotCashed() }}</p>
      </div>
      <div v-if="this.numTreesCanPlant() > 0" id="newTrees">
        <p class="text">
          Good job, {{ displayName }}! You can plant
          {{ numTreesCanPlant() }} tree(s).
        </p>
      </div>
      <p v-else>
        You are {{ 10 - numQuestionsNotCashed() }} question(s) away from
        planting a tree.
      </p>
      <br />
      <button v-show="this.numTreesCanPlant() > 0" v-on:click="plantTree">
        Plant a Tree
      </button>
      <br /><br />
      <button v-on:click="goToQuiz">Do Quiz</button>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from "./Header.vue";
import Footer from "./Footer.vue";
import { database, auth } from "../firebase.js";

export default {
  components: { Header, Footer },
  data: function () {
    return {
      displayName: "",
      userData: {},
    };
  },
  methods: {
    loadUser: function () {
      const user = auth.currentUser;
      if (user) {
        const uid = user.uid;
        database
          .collection("users")
          .doc(uid)
          .get()
          .then((doc) => {
            this.userData = doc.data();
            this.displayName = doc.data().displayName;
          });
      }
    },
    plantTree: function () {
      if (this.numTreesCanPlant() > 0) {
        var currentDate = new Date();
        var date = {
          month: currentDate.toLocaleString("default", {
            month: "long",
          }),
          day: currentDate.getDate(),
        };
        this.userData.numTrees += 1;
        this.userData.treeDates.push(date);
        const user = auth.currentUser;
        const uid = user.uid;
        database
          .collection("users")
          .doc(uid)
          .set(this.userData)
          .then(() => {
            this.$router.push({ name: "planttrees" });
          });
      } else {
        alert("Tree cannot be planted. Try more questions!");
      }
    },
    goToQuiz: function () {
      this.$router.push({ name: "quizquestion" });
    },
    numQuestionsNotCashed() {
      return this.userData.numQuiz - this.userData.numTrees * 10;
    },
    numTreesCanPlant() {
      return Math.floor(this.numQuestionsNotCashed() / 10);
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

#knowledgeBox {
  text-align: center;
  background-color: rgb(243, 233, 219);
  border-radius: 12%;
  width: 500px;
  margin: auto;
  padding: 20px;
}

button {
  font-family: Futura;
  background-color: black;
  color: whitesmoke;
  border-radius: 40px;
  padding: 15px;
  text-align: center;
  width: 110px;
}
</style>
