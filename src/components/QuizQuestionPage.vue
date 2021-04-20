<template>
  <div class="bg"> 
    <Header></Header>
    <div id="questionsDoneBox">
      <p class="tt">questions done:</p>
      <p class="number">{{ userData.numQuiz }}</p>
    </div>
    <div v-for="qn in quiz.slice(a, b)" :key="qn.question">
      <div id="funfactBox" v-show="correct">
          <div id="ffheader">
            <p>Good Job! <br>Here's a Fun Fact <br></p>
          </div>
          {{ qn.addInfo }}
      </div>
      <div id="questionBox">
        <p id="question">{{ qn.question }}</p>
        <br /><br />
        <div v-for="option in Object.keys(qn.options)" :key="option.id">
          <div
            class="obutton"
            :style="{ backgroundColor: color }"
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
    </div>
    <div v-show="noMoreQuestions" id="noQn">
      <p id="noQntxt">  
      Congratulations! You have completed all questions currently available.<br />
      Do wait patiently as we upload more questions, or feel free to contribute
      some questions of your own!
      </p>
    </div>
    <div class="buttons">
      <button class="xbutton" v-on:click="goToContributeQuestion">
        Contribute a question!
      </button>
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
      color: "#84735e",
      a: 0,
      b: 1,
      correct: false,
      firstTry: true,
      userData: {},
      noMoreQuestions: false,
      totalQuestionsAvail: 0,
    };
  },
  methods: {
    fetchItems: function () {
      const user = auth.currentUser;
      if (user) {
        this.photoUrl = user.photoURL;
        const uid = user.uid;
        database
          .collection("users")
          .doc(uid)
          .get()
          .then((doc) => {
            this.userData = doc.data();
            for (var i = 0; i < this.userData.questionsDone.length; i++) {
              this.completedQuestions.push(this.userData.questionsDone[i].qNo);
            }
            database
              .collection("questions")
              .get()
              .then((snapshot) => {
                console.log("total qns " + snapshot.size.toString())
                console.log("completed qns: " + this.completedQuestions.length)
                this.totalQuestionsAvail = snapshot.size.toString()
                if(this.totalQuestionsAvail == this.completedQuestions.length) {
                  this.noMoreQuestions = true;
                }
                snapshot.docs.forEach((doc) => {
                  if (!this.completedQuestions.includes(doc.data().question)) {
                    this.quiz.push(doc.data());
                  }
                });
              });
          });
      }
    },

    selectedAnswer: function (event, qn) {
      var chosen = event.target.getAttribute("id");
      var currentDate = new Date();
      if (qn.options[chosen]) {
        document.getElementById(
          event.target.getAttribute("id")
        ).style.backgroundColor = "#2B8B35";
        this.correct = true;
        if (!this.completedQuestions.includes(qn.question)) {
          var done = {
            qNo: qn.question,
            planted: 0,
            rightOnFirstTry: this.firstTry,
            date: {
              month: currentDate.toLocaleString("default", {
                month: "long",
              }),
              day: currentDate.getDate(),
            },
          };
          this.userData.questionsDone.push(done);
          this.userData.numQuiz += 1;
          this.completedQuestions.push(done.qNo);
          this.updateDb();
        }
      } else {
        document.getElementById(
          event.target.getAttribute("id")
        ).style.backgroundColor = "#C52A2A";
        this.firstTry = false;
        this.updateDb();
      }
    },

    nextQuestion: function () {
      this.a++;
      this.b++;
      this.correct = false;
      this.firstTry = true;
      console.log("next qn")
      console.log(this.completedQuestions.length)
      console.log(this.totalQuestionsAvail)
      if (this.completedQuestions.length == this.totalQuestionsAvail) {
        this.noMoreQuestions = true;
      }
    },

    kBank: function () {
      this.$router.push({ name: "knowledgebank" });
    },
    goToContributeQuestion: function () {
      this.$router.push({ name: "ContributeQuiz" });
    },
  },

  created() {
    this.fetchItems();
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
  background-color: rgb(243, 233, 219);
  width: 900px;
  padding: 15px;
}

.buttons {
  margin: auto;
  display: flex;
  justify-content: center;
  padding-bottom: 50px;
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
  justify-content: center;
  align-content: center;
}

.xbutton {
  background-color: #873600;
  border: none;
  color: white;
  font-family: Futura;
  padding: 5px 5px;
  text-align: center;
  margin: 5px;
  border-radius: 30px;
  font-weight: 600;
  margin-bottom: 30px;
}
#funfactBox {
  margin: auto;
  text-align: center;
}

#questionsDoneBox {
  position: absolute;
  background-color: rgb(243, 233, 219);
  border-radius: 12%;
  width: 10vw;
  height: 90px;
  margin-left: 10px;
  justify-content: center;
}

#noQn {
  position: relative;
  font-family: Futura;
  margin-top: 30vh;
  margin-bottom: 10px;
}

#noQntxt {
    padding: 5px;
    background-color: rgb(243, 233, 219);
    text-align: center;
    justify-content: center;
}

#funfactBox{
  position:absolute;
  background-color: rgb(243, 233, 219);
  border-radius: 10%;
  width: 12vw;
  margin-left: 85%;
  margin-top: 20px;
  justify-content: center;
  padding: 2px;
}

#ffheader {
    padding-top: 0;
}

.number {
  font-size: 40px;
  text-align: center;
  margin-top: 0px;
  margin-bottom: 5px;
}

.tt {
  font-size: 20px;
  margin-top: 3px;
  margin-bottom: 5px;
  text-align: center;
}
</style>
