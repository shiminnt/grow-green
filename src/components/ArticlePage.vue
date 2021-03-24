
<template>
  <div class="bg">
    <base-page></base-page>
    <div class="article">
      <h1>{{ articleSet[0].title }}</h1>
      <img class="photo" v-bind:src="articleSet[0].urlToImage" />
      <p>{{ articleSet[0].content }}</p>
      <br>
      <p class="external" v-on:click="goToExternalArticle"> Interested? Read more here</p>
    </div>

    <Footer />
  </div>
</template>

<script>
import BasePage from "./Header.vue";
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
    BasePage,
    Footer,
  },
  methods: {
    mounted() {
      axios
        .get(
          `https://newsapi.org/v2/everything?q=Environment&from=2021-03-15&sortBy=popularity&apiKey=b7525553c4fb4da7940a200b23d2ca9a`
        )
        .then((response) => {
          response.data.articles.forEach(article => {
            console.log(article)
            if(article.title == this.$route.params.id) {
              this.articleSet.push(article)
            }
          })
        })
    },
    goToExternalArticle() {
      var title = this.$route.params.id
      if (!(this.$store.state.userData.articlesRead.includes(title)))
        this.$store.dispatch('updateArticlesRead', title)
      window.open(this.articleSet[0].url, "_blank")
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
  margin: 30px;
}

.photo {
  height: 100px;
}

.external {
  text-decoration: underline;
}
</style>