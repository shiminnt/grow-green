
<template>
  <div class="bg">
    <Header></Header>
    <ul class="quizQn">
      <li v-for="qn in quiz" :key="qn.question">
        <div class="quizBox">
          <h3 class="qn">{{ qn.question }}</h3><br>
          <li v-for="(correct, option) in qn.options" :key="option">
            <input type="radio">{{ option }}: {{correct }}
          </li>
        </div>
        <div class="funFact">
          <span>{{qn.addInfo}}</span>
        </div>
      </li>
    </ul>
    <Footer/>
  </div>
</template>

<script>
import Header from './Header.vue';
import Footer from './Footer.vue';
import {mapGetters} from 'vuex';
import {database} from '../firebase.js';

export default {
  components: {Header, Footer},
  name: "Quiz",
  data: function () {
    return {
      quiz: []
    };
  },
  methods: {
    fetchItems: function() {
      database.collection('questions').get()
      .then(snapshot=> {
        snapshot.docs.forEach(doc=>{
          //console.log(doc.data());
          this.quiz.push(doc.data());
        })
      })
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
</style>