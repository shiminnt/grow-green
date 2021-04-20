<template>
  <div class="bg">
    <Header></Header>
    <h1 id="title">Publicise your event</h1>
    <p>
      Fill in the relevant details for your event. We will let you know if your
      event has been approved.
    </p>
    <form class="form" @submit.prevent="submitForm">
      <input
        class="textinput"
        type="text"
        placeholder="Organisation Name"
        v-model="organisationName"
      />
      <br /><br />
      <input
        class="textinput"
        type="email"
        placeholder="Email"
        v-model="email"
      />
      <br /><br />
      <input
        class="textinput"
        type="text"
        placeholder="Event Name"
        v-model="eventName"
      />
      <br /><br />
      <input
        class="textinput"
        type="text"
        placeholder="Event Location"
        v-model="location"
      />
      <br /><br />
      <label for="eventdate">Date of Event: </label>
      <input type="date" id="eventdate" name="eventdate" v-model="date" />
      <br /><br />
      <label for="starttime">Start Time: </label>
      <input type="time" id="starttime" name="starttime" v-model="starttime" />
      <br /><br />
      <label for="endtime">End Time: </label>
      <input type="time" id="endtime" name="endtime" v-model="endtime" />
      <br /><br />
      <textarea
        class="textinput"
        placeholder="Description of your event"
        rows="10"
        cols="30"
        v-model="description"
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
      organisationName: "",
      email: "",
      eventName: "",
      location: "",
      date: "",
      starttime: "",
      endtime: "",
      description: "",
    };
  },
  methods: {
    submitForm: function () {
      if (this.organisationName == "") {
        alert("Invalid organisation name. Please try again");
      } else if (this.email == "") {
        alert("Invalid email. Please try again");
      } else if (this.eventName == "") {
        alert("Invalid event name. Please try again");
      } else if (this.location == "") {
        alert("Invalid location. Please try again");
      } else if (this.date == "") {
        alert("Invalid date. Please try again");
      } else if (this.starttime == "") {
        alert("Invalid start time. Please try again");
      } else if (this.endtime == "") {
        alert("Invalid end time. Please try again");
      } else if (this.description == "") {
        alert("Your description is empty! Please add a description");
      } else {
        database
          .collection("publiciseEvent")
          .add({
            organisationName: this.organisationName,
            email: this.email,
            eventName: this.eventName,
            location: this.location,
            date: this.date,
            starttime: this.starttime,
            endtime: this.endtime,
            description: this.description,
          })
          .then(() => {
            alert("Your event has been submitted for approval.");
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
label {
  font-size: small;
}
</style>
