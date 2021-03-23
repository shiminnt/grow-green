
<template>
  <div class="bg">
    <base-page></base-page>
    <ul id="newsList">
      <li v-for="article in info" :key="article.title">
        <div class="newsBox">
          <img class="image" v-bind:src="article.urlToImage" />
          <div class="words">
            <h4 class="title">{{ article.title }}</h4>
            <p class="text">{{ article.description }}</p>
          </div>
          <div>
          <p class="readMoreLink" v-bind:id="article.title" v-on:click="readArticle($event)">Read more</p>
          </div>
        </div>
      </li>
    </ul>
    <Footer />
  </div>
</template>

<script>
import BasePage from "./Header.vue";
import axios from "axios";
import Footer from "./Footer.vue";

export default {
  name: "NewsMenu",
  data: function () {
    return {
      info: null,
    };
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
          this.info = response.data.articles;
        })
    },
    readArticle(event) {
      this.$router.push({name: "article", params: {id: event.target.getAttribute("id")}});
    },
  },
  created() {
    this.mounted();
  },
};
</script>

<style scoped>
.bg {
  background-color: ivory;
  overflow: scroll;
}
#newsList {
  list-style-type: none;
}
.newsBox {
  height: 100px;
  background: rgba(245, 222, 179, 0.8);
  display: flex;
  overflow: scroll;
  margin: 2%;
  border-radius: 20px;
}
.image {
  height: 75px;
  width: 75px;
  margin-left: 2%;
  margin-top: 1%;
  border-radius: 100%;
}
.words {
  margin-left: 2%;
}
.title {
  font-family:Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
  font-size: 25px;
  font-weight: bold;
  padding: 0px;
  margin-top: 10px;
  margin-bottom: 0px;
}
.text {
  font-size: 13px;
  font-family:Futura;
  font-weight: lighter;
}
.readMoreLink {
  text-decoration: underline;
  font-size: 10px;
  bottom: 20px;
  right: 10px;
  display: inline-block;
  white-space: nowrap;
}
</style>