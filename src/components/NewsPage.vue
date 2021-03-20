
<template>
  <div class="bg">
    <base-page></base-page>
    <div class="newsBox">
      <img class="image" src="https://i.kinja-img.com/gawker-media/image/upload/c_fill,f_auto,fl_progressive,g_center,h_675,pg_1,q_80,w_1200/x5bvo1diqdwou9nqetka.png">
      <div class="words">
        <h3 class="title">Title</h3>
        <p class="text">Text</p>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import BasePage from "./Header.vue";
import axios from "axios";
import Footer from './Footer.vue';

export default {
  name: "News",
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
        }).bind(this)
    },
  },
  created() {
    this.mounted()
  }
};
</script>

<style scoped>
.bg {
  background-color: ivory;
  overflow: scroll;
}

.newsBox {
  height:100px;
  text-align: center;
  background: rgba(245, 222, 179,0.8);
  display: flex;
  overflow: visible;
  border-color: black;
  border-style: solid;
  margin: 2%;
  border-radius: 20px;
}

.image {
  height: 75px;
  width: 75px;
  margin-left: 2%;
  margin-top:1%;
  border-radius: 100%;
}

.words {
  margin-left: 2%;
}
</style>