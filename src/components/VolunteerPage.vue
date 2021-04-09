<template>
    <div class="bg">
        <Header></Header>
        <div class="detailsBG">
            <h1 class="detailsTitle">{{ details.title }}</h1>
            <div class="eventdetails">
                <img class="place" :src="details.imgURL" />
                <h3>About</h3>
                <a>{{ details.about }}</a>
                <h3>Join as a Volunteer Now!</h3>
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
                <br />
            </div>
            <h3>Organised by</h3>
            <a>{{ details.organisation }}</a
            ><br />
            <div class="eventmap">
                <h3>Locate Event</h3>
                <a>For directions to {{details.location}}, refer to the Google Maps below</a>
                <br><br>
                <span v-html="details.embed"></span>
            </div>
        </div>
        <Footer></Footer>
    </div>
</template>

<script>
import Footer from "./Footer.vue";
import Header from "./Header.vue";
import { mapGetters } from "vuex";
import { database } from "../firebase.js";

export default {
    components: { Header, Footer },
    name: "VolunteerPage",
    data: function() {
        return {
            details: [],
            //center: {lat: this.details.lat, lng: this.details.long}
        };
    },
    methods: {
        fetchItems: function() {
            database
                .collection("volunteer")
                .doc(this.$route.params.doc_id)
                .get()
                .then((doc) => {
                    this.details = doc.data();
                });
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
.detailsBG {
    background-color: ivory;
}
.detailsTitle {
    text-align: center;
}
.place {
    width: 500px;
    height: 500px;
    float: left;
    padding-left: 20px;
    padding-right: 25px;
}
.icons {
    width: 20px;
    height: 20px;
}
.eventdetails {
    display: block;
}
.eventmap {
    clear: left;
    padding-left: 25%;
    padding-top: 25px;
    padding-bottom: 10%;
}
</style>
