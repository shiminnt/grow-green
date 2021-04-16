
<template>
  <div class="bg">
    <Header></Header>
    <div id="questionsDoneBox">
      <p class="tt">questions done: </p>
      <p class="number">{{ userData.numQuiz }}</p>
    </div>
    <div v-for="qn in quiz.slice(a, b)" :key="qn.question">
      <div id="questionBox">
        <p id="question">{{ qn.question }}</p>
        <br /><br />
        <div v-for="option in Object.keys(qn.options)" :key="option.id">
          <div
            class="obutton" :style="{backgroundColor: color}"
            v-bind:id="option"
            v-on:click="selectedAnswer($event, qn)"
          >
            {{ option }}
          </div>
          <br /><br />
        </div>
      </div>
      <br /><br />
      <div class="buttons">
        <button class="nbutton" id="kBank" v-on:click="kBank">
          Go To Knowledge Bank</button
        ><br />
        <button class="nbutton" id="nQn" v-on:click="nextQuestion">
          Next Question</button
        ><br />
      </div>
      <div id="funfactBox" v-show="correct">{{ qn.addInfo }}</div>
      <Footer></Footer>
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
      completedQuestions: [],
      questionText: "sampleText",
      option1: "o1",
      option2: "o2",
      option3: "o3",
      option4: "o4",
      funFact: "sampleFact",
      color: '#84735e',
      a: 0,
      b: 1,
      correct: false,
      firstTry: true,
    };
  },
  methods: {
    fetchItems: function () {
      console.log("bug here");
      console.log(this.userData.questionsDone);
      for (var i = 0; i < this.userData.questionsDone.length; i++) {
        this.completedQuestions.push(this.userData.questionsDone[i].qNo);
      }
      database
        .collection("questions")
        .get()
        .then((snapshot) => {
          snapshot.docs.forEach((doc) => {
            if (!this.completedQuestions.includes(doc.data().question)) {
              this.quiz.push(doc.data());
            }
          });
        });
    },

    selectedAnswer: function (event, qn) {
      console.log(event.target.getAttribute("id"));
      var chosen = event.target.getAttribute("id");
      console.log(qn.options[chosen]);
      var currentDate = new Date()
      console.log(currentDate.getDate)
      if (qn.options[chosen]) {
        document.getElementById(event.target.getAttribute("id")).style.backgroundColor = '#2B8B35'
        this.correct = true;
        if (!this.completedQuestions.includes(qn.question)) {
          var done = {
            qNo: qn.question,
            planted: 0,
            rightOnFirstTry: this.firstTry,
            date: {
              month: currentDate.toLocaleString('default', { month: 'long' }),
              day: currentDate.getDate()
            }
          };
          this.$store.dispatch("updateQuestionsDone", done);
          this.completedQuestions.push(done.qNo);
        }
      } else {
        document.getElementById(event.target.getAttribute("id")).style.backgroundColor = '#C52A2A'
        this.firstTry = false;
      }
    },

    nextQuestion: function () {
      this.a++;
      this.b++;
      this.correct = false;
      this.firstTry = true;
    },

    kBank: function () {
      this.$router.push({ name: "knowledgebank" });
    },
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
  overflow-y: scroll;
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
  padding-bottom:50px;
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
  margin: auto;
  border: none;
  height: 50px;
  width: 450px;
  color: white;
}

#funfactBox {
  margin: auto;
  text-align: center;
  padding-bottom:100px;
}

#questionsDoneBox {
  position: absolute;
  opacity: 82%;
  background: #eadece;
  border-radius: 12%;
  width: 10vw;
  height: 90px;
  margin-left: 10px;
  justify-content: center;
}

.number {
  font-size: 40px;
  text-align:center;
  margin-top: 0px;
  margin-bottom: 5px;

}

.tt {
  font-size: 20px;
  margin-top: 3px;
  margin-bottom: 5px;
  text-align:center;
}
</style>