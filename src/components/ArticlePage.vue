
<template>
  <div class="bg">
    <Header></Header>
    <div class="article">
      <h1>{{ articleSet[0].title }}</h1>
      <img class="photo" v-bind:src="articleSet[0].urlToImage" />
      <p id="content">{{ articleSet[0].content.slice(0,150) }} ...</p>
      <br>
      <p class="external" v-on:click="goToExternalArticle"> Interested? Read more here</p>
    </div>

    <Footer />
  </div>
</template>

<script>
import Header from "./Header.vue";
import Footer from "./Footer.vue";
import axios from "axios";
import {mapGetters} from 'vuex'

export default {
  name: "Article",
  data: function () {
    return {
      articleSet: [],
    };
  },
  computed: {
    ...mapGetters([
      'userData'
    ])
  },
  components: {
    Header,
    Footer,
  },
  methods: {
    mounted() {
      axios
        .get(
          `https://newsapi.org/v2/everything?q=Climate&from=2021-03-15&sortBy=popularity&apiKey=b7525553c4fb4da7940a200b23d2ca9a`
        )
        .then((response) => {
          response.data.articles.forEach(article => {

            if(article.title == this.$route.params.id) {
              this.articleSet.push(article)
            }
          })
        })
    },
    goToExternalArticle() {
      var title = this.$route.params.id
      window.open(this.articleSet[0].url, "_blank")
      console.log("Checking")
      console.log(title)
      if (!(this.userData.articlesRead.includes(title))) {
        console.log("Not Included!")
        this.$store.dispatch('updateArticlesRead', title)
      }
    }
  },
  created() {
    this.mounted();
  },
};
</script>

<style scoped>
.bg {
  background-color: ivory;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}

.article {
  text-align:center;
}

.photo {
  width: 30vw;
  justify-content: center;
}

.external {
  text-decoration: underline;
}
</style>