
<template>
  <div class="bg">
    <Header></Header>
    <div id="knowledgeBox">
      <div id="qCash">
        <p class="text">Questions not Cashed: X</p>
      </div>
      <br />
      <div id="newTrees">
        <p class="text">New Trees to be Planted: Y</p>
      </div>
      <br />
      <p>Good job, {{ displayName }}! You have answered X questions correctly</p>
      <br />
      <button v-on:click="plantTree">Plant a Tree</button>
      <br /><br />
      <button v-on:click="goToQuiz">Do Quiz</button>
      
    </div>
    <Footer />
  </div>
</template>

<script>
import Header from "./Header.vue";
import Footer from "./Footer.vue";
import { database, auth } from "../firebase.js";

export default {
  components: { Header, Footer },
  name: "Quiz",
  data: function () {
    return {
      displayName: ''
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
          .then(
            (doc) => (this.displayName = doc.data().displayName.toUpperCase())
          );
      }
    },
    plantTree: function() {
      // number of qns -10
      // number of trees +1
      // update store
    },
    goToQuiz: function() {
      this.$router.push({name: "quizquestion"})
    }
  },
  created() {
    this.loadUserData()
  }
};
</script>

<style scoped>
.bg {
  background-color: ivory;
  overflow: scroll;
}

#knowledgeBox {
  text-align: center;
  opacity: 82%;
  background: #eadece;
  border-radius: 12%;
  width: 500px;
  margin: auto;
  padding: 20px
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