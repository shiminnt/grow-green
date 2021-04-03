
<template>
  <div class="bg">
    <Header></Header>
    <div v-for="qn in quiz.slice(a,b)" :key="qn.question">
      <div id="questionBox">
        <p id="question">{{ qn.question }}</p>
        <br /><br />
        <div v-for="option in Object.keys(qn.options)" :key="option.id">
          <div class="obutton" v-bind:id="option" v-on:click="selectedAnswer($event, qn)">{{ option }}</div><br /><br />
        </div>
      </div>
      <br /><br />
      <div class="buttons">
        <button class="nbutton" id="kBank" v-on:click="kBank">Go To Knowledge Bank</button><br />
        <button class="nbutton" id="nQn" v-on:click="nextQuestion">Next Question</button><br />
      </div>
      <div id="funfactBox">{{ qn.addInfo }}</div>
      <Footer />
    </div>
  </div>
</template>

<script>
import Header from "./Header.vue";
import Footer from "./Footer.vue";
import { mapGetters } from "vuex";
import { database } from "../firebase.js";

export default {
  components: { Header, Footer },
  name: "Quiz",
  data: function () {
    return {
      quiz: [],
      questionText: "sampleText",
      option1: "o1",
      option2: "o2",
      option3: "o3",
      option4: "o4",
      funFact: "sampleFact",
      a: 0,
      b: 1,
    };
  },
  methods: {
    fetchItems: function () {
      database
        .collection("questions")
        .get()
        .then((snapshot) => {
          snapshot.docs.forEach((doc) => {
            //console.log(doc.data());
            this.quiz.push(doc.data());
          });
        });
    },
    selectedAnswer: function(event, qn) {
      console.log(event.target.getAttribute("id"))
      var chosen = event.target.getAttribute("id")
      console.log(qn.options[chosen])
      if (qn.options[chosen]) {
        alert("correct")
      } else {
        alert("wrong")
      }
      
    },
    nextQuestion: function() {
      this.a++;
      this.b++;
    },
    kBank: function() {
      this.$router.push({name: "knowledgebank"})
    }
  },
  created() {
    this.fetchItems();
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

#questionBox {
  margin: auto;
  border-radius: 12px;
  text-align: center;
  opacity: 82%;
  background: #eadece;
  width: 900px;
  padding: 15px;
}

.buttons {
  margin: auto;
  display: flex;
  justify-content: center;
}

.nbutton {
  margin: 10px;
  width: 100px;
  height: 70px;
  font-family: Futura;
  background-color: black;
  color: whitesmoke;
  text-align: center;
  border: none;
}
.obutton {
  background-color: rgba(132, 115, 94, 1);
  margin:auto;
  border: none;
  height: 50px;
  width: 450px;
  color: white;
}

#funfactBox {
  margin: auto;
  text-align: center;
}
</style>