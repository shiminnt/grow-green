<template>
  <div class="bg">
    <Header></Header>
    <h1 id="title">Have an interesting question?</h1>
    <p>
      Step 1: Design an envrionment related question <br />
      Step 2: Include a minimum of 2 options <br />
      Step 3: Look out for your question
      <router-link to="/userquizquestions">here</router-link>!
    </p>
    <form class="form" @submit.prevent="submitForm">
      <textarea
        class="textinput"
        placeholder="Question"
        rows="2"
        cols="30"
        v-model="question"
      >
      </textarea>
      <!-- <p>{{this.name}}</p> -->
      <br /><br />
      <input
        class="textinput"
        type="text"
        placeholder="Correct answer"
        v-model="correct"
      />
      <br /><br />
      <input
        class="textinput"
        type="text"
        placeholder="Option 2"
        v-model="option2"
      />
      <br /><br />
      <input
        class="textinput"
        type="text"
        placeholder="Option 3"
        v-model="option3"
      />
      <br /><br />
      <input
        class="textinput"
        type="text"
        placeholder="Option 4"
        v-model="option4"
      />
      <br /><br />
      <textarea
        class="textinput"
        placeholder="Additional information or fun facts"
        rows="5"
        cols="30"
        v-model="addInfo"
      >
      </textarea>
      <br /><br />
      <input class="submitButton" type="submit" value="Submit" />
    </form>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from "./Header.vue";
import Footer from "./Footer.vue";
import { database } from "../firebase.js";

export default {
  components: { Header, Footer },
  name: "contactus",
  data: function () {
    return {
      question: null,
      correct: null,
      option2: null,
      option3: null,
      option4: null,
      addInfo: null,
    };
  },
  methods: {
    submitForm: function () {
      if (this.question == null) {
        alert("Invalid question. Please try again");
      } else if (this.correct == null || this.option2 == null) {
        alert("Please input at least 2 options.");
      } else {
        if (this.addInfo == null) {
          this.addInfo = "Good job!";
        }
        const answers = {};
        answers[this.correct] = true;
        answers[this.option2] = false;
        if (this.option3 != null) {
          answers[this.option3] = false;
        }
        if (this.option4 != null) {
          answers[this.option4] = false;
        }
        this.$store.dispatch('updateContributed');
        database
          .collection("contributedQuestions")
          .add({
            question: this.question,
            options: answers,
            addInfo: this.addInfo,
          })
          .then(() => {
            alert("Your question has been submitted!");
            this.$router.go();
          });
      }
    },
  },
};
</script>

<style scoped>
.bg {
  background-color: ivory;
  overflow-y: scroll;
}
#title {
  text-align: center;
}
p {
  text-align: center;
  font-size: medium;
  color: rgb(68, 67, 67);
}
.form {
  text-align: center;
  margin-bottom: 85px;
}
.textinput {
  background-color: none;
}
.submitButton {
  border-radius: 30px;
  border: none;
  padding: 10px;
  background-color: black;
  color: whitesmoke;
  font-family: Futura;
  width: 100px;
}
</style>
