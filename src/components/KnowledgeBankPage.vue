
<template>
  <div class="bg">
    <Header></Header>
    <div id="knowledgeBox">
      <div id="qCash">
        <p class="text">Questions not Cashed: {{  numQuestionsNotCashed() }}</p>
      </div>
      <div v-if="this.numTreesCanPlant() > 0" id="newTrees">
        <p class="text"> Good job, {{ displayName }}! You can plant {{ numTreesCanPlant() }} tree(s).</p>
      </div>
      <p v-else>
         You are {{ 10-numQuestionsNotCashed() }} question(s) away from planting a tree.
      </p>
      <br />
      <button v-show="this.numTreesCanPlant() > 0" v-on:click="plantTree">Plant a Tree</button>
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
import { mapGetters } from "vuex";

export default {
  components: { Header, Footer },
  name: "Quiz",
  data: function () {
    return {
      displayName: "",
    };
  },
  computed: {
    ...mapGetters(["userData"]),
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
            (doc) => (this.displayName = doc.data().displayName)
          );
      }
    },
    plantTree: function () {
      if (this.numTreesCanPlant() > 0) {
        this.$router.push({name: "planttrees"});
        var currentDate = new Date()
        var date = {
            month: currentDate.toLocaleString('default', { month: 'long' }),
            day: currentDate.getDate(),
        }
        this.$store.dispatch('updateTreesPlanted', date);
        
      } else {
        alert("Tree cannot be planted. Try more questions!")
      }
      // number of qns -10
      // number of trees +1
      // update store
    },
    goToPlantTrees() {
      this.$router.push("planttrees");
    },
    goToQuiz: function () {
      this.$router.push({ name: "quizquestion" });
    },
    numQuestionsNotCashed() {
      return (this.userData.numQuiz - (this.userData.numTrees * 10));
    },
    numTreesCanPlant() {
      return Math.floor(this.numQuestionsNotCashed()/10);
    }
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

#knowledgeBox {
  text-align: center;
  opacity: 82%;
  background: #eadece;
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