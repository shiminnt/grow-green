<template>
    <div class="bg">
        <Header></Header>
        <h1 id="title">Contact Us</h1>
        <form class="form">
            <input 
                class="textinput" 
                type="text" 
                placeholder="Name" 
                v-model="name"
            />
            <br><br>
            <input 
                class="textinput" 
                type="email" 
                placeholder="Email" 
                v-model="email"
            />
            <br><br>
            <textarea 
                class="textinput" 
                placeholder="Your Message" 
                rows="10" 
                cols="30" 
                v-model="message">
            </textarea>
            <br><br>
            <input 
                class="submitButton" 
                type="submit" 
                value="Submit" 
                v-on:click="submitForm">
        </form>
        <Footer></Footer>
    </div>
</template>

<script>
import Header from './Header.vue';
import Footer from './Footer.vue';
import { database } from "../firebase.js";

export default {
    components: { Header, Footer },
    name: "contactus",
    data: function() {
        return {
            name: "",
            email: "",
            message: "",
        }
    },
    methods: {
        submitForm: function() {
            if (this.name == "") {
                alert("Invalid Name. Please try again")
            } else if (this.email == "") {
                alert("Invalid Email. Please try again")
            } else if (this.message == "") {
                alert("Your message is empty! Please add a message")
            } else {
                database.collection("enquiries")
                .add({
                    name: this.name,
                    email: this.email,
                    message: this.message
                }).then(alert("Your message has been submitted!"))
            }
        }
    }
}
</script>

<style scoped>
.bg {
    background-color: ivory;
    overflow-y: scroll;
}
#title {
    text-align: center;
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
