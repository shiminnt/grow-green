<template>
  <div class="bg">
    <Header></Header>
    <ul id="newsList">
      <li v-for="article in info.slice(a, b)" :key="article.title">
        <div class="newsBox">
          <img class="image" v-bind:src="article.urlToImage" />
          <div class="words">
            <h4 class="title">{{ article.title }}</h4>
            <p class="text">{{ article.description }}</p>
          </div>
          <div>
            <p
              class="readMoreLink"
              v-bind:id="article.title"
              v-on:click="readArticle($event)"
            >
              Read more
            </p>
          </div>
        </div>
      </li>
    </ul>
    <div class="pageChange">
      <p id="t" v-on:click="previous">&#8592; Previous Page</p>
      <p id="t">{{ pageNo }}</p>
      <p id="t" v-on:click="next">Next Page &#8594;</p> 
    </div>
    <Footer />
  </div>
</template>

<script>
import Header from "./Header.vue";
import axios from "axios";
import Footer from "./Footer.vue";
import { mapGetters } from "vuex";

export default {
  name: "NewsMenu",
  data: function () {
    return {
      info: null,
      a: 0,
      b: 3,
      pageNo: 1,
      maxPage: 0,
    };
  },
  components: {
    Header,
    Footer,
  },
  computed: {
    ...mapGetters(["userData"]),
  },
  methods: {
    mounted() {
      axios
        .get(
          `https://newsapi.org/v2/everything?q=Environment&from=2021-03-15&sortBy=popularity&apiKey=b7525553c4fb4da7940a200b23d2ca9a`
        )
        .then((response) => {
          this.info = response.data.articles;
          this.maxPage = Math.floor(this.info.length/3) + 1
        });
    },
    readArticle(event) {
      this.$router.push({
        name: "article",
        params: { id: event.target.getAttribute("id") },
      });
    },

    next() {
      if (this.pageNo != this.maxPage) {
        this.a += 3;
        this.b += 3;
        this.pageNo++;
      } else {
        alert("This is the last page")
      }

    },

    previous() {
      if (this.pageNo != 1) {
        this.a -= 3;
        this.b -= 3;
        this.pageNo--;
      } else {
        alert("This is the first page")
      }
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
  width: 90vw;
  background: rgba(245, 222, 179, 0.8);
  display: flex;
  overflow: hidden;
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
  font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
  font-size: 25px;
  font-weight: bold;
  padding: 0px;
  margin-top: 10px;
  margin-bottom: 0px;
}
.text {
  font-size: 13px;
  font-family: Futura;
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

.pageChange {
  display: flex;
  justify-content: center;
  text-align: center;
  margin: auto;
  text-decoration: underline;
}

#t {
  margin: 10px;
  padding: 10px;
}
</style>