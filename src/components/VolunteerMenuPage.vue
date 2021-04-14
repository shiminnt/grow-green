<template>
  <div class="bg">
    <Header></Header>
	<div class="filter">
    Time: 
		<label><input type="radio" v-model="time" value="All" /> All</label>
		<label><input type="radio" v-model="time" value="Morning" /> Morning</label>
		<label><input type="radio" v-model="time" value="Afternoon" /> Afternoon</label>
		<label><input type="radio" v-model="time" value="Evening" /> Evening</label>
	</div>
      <ul class="events">
        <li v-for="e in filteredTime" v-bind:key="e.id">
            <img class="coverImg" :src=e.imgURL>
            <h3>{{e.title}}</h3>
            <div class="details">
              <img class="icons" src="https://static.thenounproject.com/png/404-200.png">
              <a>&nbsp; {{e.date}}</a><br>
              <img class="icons" src="https://cdn2.iconfinder.com/data/icons/pittogrammi/142/10-512.png">
              <a>&nbsp; {{e.time[0]}} - {{e.time[1]}}</a><br>
              <img class="icons" src="https://cdn2.iconfinder.com/data/icons/pittogrammi/142/94-512.png">
              <a>&nbsp; {{e.location}}</a><br><br>
            </div>
          <button class="learnmoreButton" v-bind:id="e.doc_id" v-on:click="getDetails($event)">Learn More</button>
        </li>
      </ul>
    <Footer></Footer>
  </div>
</template>

<script>
import Footer from './Footer.vue';
import Header from './Header.vue';
import {mapGetters} from 'vuex';
import {database} from '../firebase.js'

export default {
  components: { Header, Footer },
  name: "VolunteerMenu",
  data: function () {
    return {
        events: [],
        time: "All"
    };
  },
  methods: {
    fetchItems: function() {
      database.collection('volunteer').get()
      .then(snapshot => {
        snapshot.docs.forEach(doc => {
          this.events.push( doc.data() );
        })
      });
    },
    getDetails: function(event) {
      let doc_id = event.target.getAttribute("id");
      this.$router.push({ name:'volunteer', params:{ doc_id: doc_id }});
    }
  },
  created() {
    this.fetchItems();
  },
  computed: {
    ...mapGetters([
      'userData'
    ]),
    filteredTime: function() {
			if(this.time === "All") {
				return this.events;
			} else if (this.time === "Morning") {
				return this.events.filter(function(event) {
					return event.time[0] < 1200;
				});
			} else if (this.time === "Afternoon") {
				return this.events.filter(function(event) {
					return event.time[0] < 1800 && event.time[0] >= 1200;
				});
			} else{
				return this.events.filter(function(event) {
					return event.time[0] >= 1800;
				});
			}
		}
  }
};
</script>

<style scoped>
.bg {
  background-color: ivory;
  overflow-y: scroll;
}
.events {
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
  padding: 0;
}
.details {
  text-align: left;
  font-size: 15px;
  font-family:Trebuchet MS;
  font-weight: lighter;
  padding-left: 35px;
}
.events > li {
  flex-grow: 1;
  flex-basis: 20px;
  text-align: center;
  padding: 5px;
  background-color:rgb(243, 233, 219);
  margin: 30px;
}
.icons{
  width:20px;
  height:20px;
}
.coverImg {
  width: 250px;
  height: 300px;
}
.learnmoreButton {
  align-content: center;
  background-color: rgb(30, 44, 6);
  color:ivory;
  border: none;
  padding: 5px;
  border-radius: 5px;
  width: 100px;
  font-family:Futura;
}
.learnmoreButton:hover {
  color:rgb(131, 141, 114); 
}
.filter {
margin-left: 25px;
margin-top: 10px;
font-family:Trebuchet MS;
}
</style>