<template>
    <div class="bg">
        <Header></Header>
        <h1 class="title">Application For: {{ details.title }}</h1>
        <form class="form" @submit.prevent="submitForm">
            <label class="labels" for="name">Name</label><br />
            <input class="inputs" type="text" id="name" v-model="displayName" />
            <br /><br />
            <label class="labels" for="email">Email</label><br />
            <input class="inputs" type="text" id="email" v-model="email" />
            <br /><br />
            <label class="labels" for="number">Contact Number </label><br />
            <input class="inputs" type="number" id="number" v-model="number" />
            <br /><br />
            <input
                class="submitButton"
                type="submit"
                value="Submit Application"
            />
        </form>
        <div class="details">
            <h3>Make sure you are free on:</h3>
            <img
                class="icons"
                src="https://static.thenounproject.com/png/404-200.png"
            />
            <a>&nbsp;{{ details.date }}</a>
            <br />
            <img
                class="icons"
                src="https://cdn2.iconfinder.com/data/icons/pittogrammi/142/10-512.png"
            />
            <a>&nbsp;{{ details.time[0] }} - {{ details.time[1] }}</a>
            <br />
            <img
                class="icons"
                src="https://cdn2.iconfinder.com/data/icons/pittogrammi/142/94-512.png"
            />
            <a>&nbsp;{{ details.location }}</a>
        </div>
        <Footer></Footer>
    </div>
</template>

<script>
import Footer from "./Footer.vue";
import Header from "./Header.vue";
import { auth, database } from "../firebase.js";

export default {
    components: { Header, Footer },
    name: "VolunteerApply",
    data: function() {
        return {
            details: [],
            displayName: "",
            email: "",
            name: "",
            updatedEmail: "",
            number: "",
        };
    },
    methods: {
        fetchItems() {
            console.log(this.$route.params.doc_id);
            database
                .collection("volunteer")
                .doc(this.$route.params.doc_id)
                .get()
                .then((doc) => {
                    this.details = doc.data();
                });
        },
        loadUser() {
            const user = auth.currentUser;
            this.email = user.email;
            if (user) {
                const uid = user.uid;
                database
                    .collection("users")
                    .doc(uid)
                    .get()
                    .then((doc) => (this.displayName = doc.data().displayName));
            }
        },
        submitForm() {
            if (this.displayName == "") {
                alert("Name not filled, please try again!");
            } else if (this.email == "") {
                alert("Email not entered, please fill it in!");
            } else if (this.number == "") {
                alert("Please add in your contact number");
            } else {
                database
                    .collection("appliedEvents")
                    .add({
                        name: this.displayName,
                        email: this.email,
                        number: this.number,
                        eventName: this.details.title,
                        eventDocID: this.details.doc_id,
                    })
                    .then(() => {
                        alert(
                            "Your application is being reviewed. Thank you for volunteering!"
                        );
                    });
            }
        },
    },
    created() {
        this.fetchItems();
        this.loadUser();
    },
};
</script>

<style scoped>
.bg {
    background-color: ivory;
    overflow-y: scroll;
}
.form {
    text-align: center;
    margin-bottom: 85px;
}
.title {
    text-align: center;
}
.inputs {
    background: none;
    border-width: 0 0 1px;
    width: 300px;
    border-color: black;
    padding-top: 30px;
    text-align: center;
    font-family: futura;
}
.labels {
    font-weight: bold;
}
.submitButton {
    border-radius: 30px;
    border: none;
    padding: 10px;
    background-color: black;
    color: whitesmoke;
    font-family: Futura;
    width: 150px;
}
.icons {
    width: 20px;
    height: 20px;
}
.details {
    text-align: center;
    margin-bottom: 100px;
}
</style>
