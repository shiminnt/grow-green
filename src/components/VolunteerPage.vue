<template>
  <div class="bg">
    <Header></Header>
    <div class="detailsBG">
      <div class="detailsTitle">
        <h1>{{details.title}}</h1>
      </div>
      <img class="place" :src="details.imgURL">
      <p>{{details.about}}</p>
      <h3>Join Now!</h3>
      <p>{{details.date}}</p>
      <p>{{details.time[0]}} - {{details.time[1]}}</p>
      <p>{{details.location}}</p>
      <p>{{details.organisation}}</p>
      <!-- <GmapMap
        :center= 'center'
        :zoom='12'
        style='width:100%;  height: 400px;'>
      </GmapMap> -->
    </div>
    <Footer />
  </div>
</template>

<script>
import Footer from './Footer.vue';
import Header from './Header.vue';
import {mapGetters} from 'vuex';
import {database} from '../firebase.js';

export default {
  components: { Header, Footer },
  name: "VolunteerPage",
  data: function () {
    return {
        details: [],
        //center: {lat: this.details.lat, lng: this.details.long}
    };
  },
  methods: {
      fetchItems: function() {
          database.collection('volunteer').doc(this.$route.params.doc_id).get()
          .then((doc)=>{
              this.details = doc.data()
          })
      },
      /* initMap: function() {
          const loc = { lat: this.details.lat, lng: this.details.long };
          const map = new google.maps.Map(document.getElementById("map"), {
            zoom: 4,
            center: loc,
          });
          const marker = new google.Maps.Marker({
            position: loc,
            map: map,
          });
          return marker;
      } */
  },
  /* mounted() {
    this.map = new window.google.maps.Map(this.$refs['map'], {
      center: {lat: this.details.lat, lng: this.details.long},
      zoom: 4
    })
  }, */
  created() {
      this.fetchItems();
  },
  computed: {
    ...mapGetters([
      'userData'
    ])
  }
};
</script>

<style scoped>
.bg {
  background-color: ivory;
  overflow: scroll;
}
.detailsBG {
  margin-bottom: 20px;
  overflow: scroll;
}
.detailsTitle {
  text-align: center;
}
.place {
    width:500px;
    height:500px;
    float: left;
}
</style>