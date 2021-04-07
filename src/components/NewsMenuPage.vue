<template>
  <div class="bg">
    <Header></Header>
    <div id="aritcleOverviewBox">
      <p class="tt">articles read:</p>
      <p class="number">{{ userData.numArticles }}</p>
    </div>
    <div id="newsList">
      <div v-for="article in info.slice(a, b)" :key="article.title">
        <div class="newsBox">
          <img class="image" v-bind:src="article.urlToImage" />
          <div class="words">
            <h4 class="title">{{ article.title }}</h4>
            <p class="text">{{ article.description.slice(0, 100) }} ... </p>
          </div>
          <div>
            <p
              class="readMoreLink"
              v-bind:id="article.title"
              v-on:click="readArticle($event)"
            >
              Read <br> more
            </p>
          </div>
        </div>
      </div>
    </div>
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
          `https://newsapi.org/v2/everything?q=Climate&from=2021-03-15&sortBy=popularity&apiKey=b7525553c4fb4da7940a200b23d2ca9a`
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
  justify-content: center;
}
.newsBox {
  width: 60vw;
  height: 13vh;
  background: rgba(245, 222, 179, 0.8);
  display: flex;
  overflow: hidden;
  margin: auto;
  margin-top: 40px;
  border-radius: 20px;
}
.image {
  height: 75px;
  width: 75px;
  margin-left: 1%;
  border-radius: 100%;
  margin-top: 0.7%;
}
.words {
  margin-left: 2%;
  width: 45vw;
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
  font-size: 15px;
  float: right;
  margin-left:50px;
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

#aritcleOverviewBox {
  position: absolute;
  opacity: 82%;
  background: #eadece;
  border-radius: 12%;
  width: 10vw;
  height: 10vh;
  margin-left: 10px;
  justify-content: center;
}

.number {
  font-size: 40px;
  text-align:center;
  margin-top: 0px;
  margin-bottom: 5px;

}

.tt {
  font-size: 20px;
  margin-top: 3px;
  margin-bottom: 5px;
  text-align:center;
}
</style>