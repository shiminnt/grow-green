<template>
  <div class="bg">
    <Header></Header>
      <h1>{{details.title}}</h1>
      <img class="place" :src="details.imgURL">
      <p>{{details.about}}</p>
    <Footer />
  </div>
</template>

<script>
import Footer from './Footer.vue';
import Header from './Header.vue';
import {mapGetters} from 'vuex';
import {database} from '../firebase.js'

export default {
  components: { Header, Footer },
  name: "VolunteerPage",
  data: function () {
    return {
        details: []
    };
  },
  methods: {
      fetchItems: function() {
          database.collection('volunteer').doc(this.$route.params.doc_id).get()
          .then((doc)=>{
              this.details = doc.data()
          })
      },
      initMap: function() {
          //const loc = { lat: this.details.lat, lng: this.details.long }
      }
  },
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
.place {
    width:500px;
    height:500px;
}
</style>