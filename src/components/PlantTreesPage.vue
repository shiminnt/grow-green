<template>
  <div class="bg">
    <base-page></base-page>
    <div id="knowledgeBox">
      <div id="qCash">
        <p class="text">Your Knowledge Bank: X</p>
      </div>
      <br />
      <div id="newTrees">
        <p class="text">You can plant Y more trees!</p>
      </div>
      <img id="profileIcon" src="../assets/treegrowing.gif" />
      <br />
      <p>A tree has been planted!</p>
      <br />
      <button v-on:click="goToPlantTrees">Plant Another Tree</button>
      <button v-on:click="goToQuiz">Do Quiz</button>
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
  methods: {
    goToQuiz: function () {
      this.$router.push({ name: "quizquestion" });
    },
    goToPlantTrees() {
      this.$router.push("planttrees");
    },
  },
};
</script>

<style scoped>
.bg {
  background-color: ivory;
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
  width: 140px;
}
img {
  object-fit: contain;
  width: 50%;
  height: 50%;
}
</style>