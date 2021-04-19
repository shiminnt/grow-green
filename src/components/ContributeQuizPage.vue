<template>
    <div class="bg">
        <Header></Header>
        <div class="container">
            <h1 id="title">Have an interesting question?</h1>
            <p>
                Step 1: Design an environment related question <br />
                Step 2: Include a minimum of 2 options <br />
                Step 3: Look out for your question
                <router-link to="/quizquestion">here</router-link>!
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
        </div>
        <div class="buttons">
            <button class="xbutton" v-on:click="goToQuiz">Quiz</button>
        </div>
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
    data: function() {
        return {
            question: null,
            correct: null,
            option2: null,
            option3: null,
            option4: null,
            addInfo: null,
            numQn: null,
            userData: {},
        };
    },
    methods: {
        goToQuiz: function() {
            this.$router.push({ name: "quizquestion" });
        },
        submitForm: function() {
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
                this.userData.numContribute += 1;
                this.updateDb();
                database
                    .collection("questions")
                    .doc(this.numQn)
                    .set({
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
    created() {
        database
            .collection("questions")
            .get()
            .then((snapshot) => {
                this.numQn = "q" + (snapshot.size + 1);
            });
        this.loadUserData();
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
    color: rgb(44, 43, 43);
}
.form {
    text-align: center;
}
.container {
    margin: auto;
    border-radius: 12px;
    opacity: 82%;
    background: #eadece;
    width: 900px;
    padding: 15px;
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
.buttons {
    margin: auto;
    display: flex;
    justify-content: center;
    padding-bottom: 50px;
}
.xbutton {
    background-color: #873600;
    border: none;
    color: white;
    font-family: Futura;
    padding: 5px 25px;
    text-align: center;
    margin: 10px;
    border-radius: 30px;
    font-weight: 600;
}
</style>
