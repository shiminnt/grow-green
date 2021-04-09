<template>
    <div class="bg">
        <Header></Header>
        <h1 id="title">Contact Us</h1>
        <form class="form">
            <input class="textinput" type="text" placeholder="Name" v-model="name">
            <br><br>
            <input class="textinput" type="email" placeholder="Email" v-model="email">
            <br><br>
            <textarea class="textinput" placeholder="Your Message" rows="10" cols="30" v-model="message"></textarea>
            <br><br>
            <input class="submitButton" type="submit" value="Submit" v-on:click="submitForm">
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
            error: null,
        }
    },
    methods: {
        submitForm: function() {
            if (this.name == "") {
                this.error = "Invalid Name"
            } else if (this.email == "") {
                this.error = "Invalid Email"
            } else if (this.message == "") {
                this.error = "Your message is empty!"
            } else {
                database.collection('enquiries').get()
                .add({
                    name: this.name,
                    email: this.email,
                    message: this.message
                }).then(() => {
                    alert("Your message has been submitted!")})
            }
        }
    }
}
</script>

<style scoped>
.bg {
    background-color: ivory;
}
#title {
    text-align: center;
}
.form {
    text-align: center;
    padding-bottom: 45px;
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
