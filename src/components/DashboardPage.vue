<template>
  <div class="bg">
    <Header></Header>
    <h1 class="heading">Dashboard</h1>
    <div id="charts">
      <donut-chart class="inner" id="donutchart"></donut-chart>
      <sample-line-dash></sample-line-dash>
      <div id="leader">
        <div id="outer">
          <button class="button" v-on:click="question">
            Trivia Master!
          </button>
          <button class="button" v-on:click="articles">
            Most Knowledgeable!
          </button>
          <button class="button" v-on:click="trees">Greenest Fingers!</button>
        </div>
        <component id="comp" v-bind:is="component" />
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from "./Header.vue";
import Footer from "./Footer.vue";
import { mapGetters } from "vuex";
import DonutChart from "./pieDashboard.vue";
import LeaderPercentage from "./LeaderPercentScore.vue";
import LeaderTrees from "./LeaderTree.vue";
import LeaderArticles from "./LeaderArticles.vue";
import SampleLineDash from "./lineDash.vue";

export default {
  components: {
    Header,
    Footer,
    DonutChart,
    LeaderPercentage,
    LeaderTrees,
    LeaderArticles,
    SampleLineDash,
  },
  name: "Dashboard",
  data: function () {
    return {
      component: "",
      Header,
    };
  },
  methods: {
    question() {
      this.component = LeaderPercentage;
    },
    trees() {
      this.component = LeaderTrees;
    },
    articles() {
      this.component = LeaderArticles;
    },
  },
  computed: {
    ...mapGetters(["userData"]),
  },
};
</script>

<style scoped>
.bg {
  background-color: ivory;
  overflow-y: scroll;
}

#outer {
  width: 100%;
  text-align: center;
}

.inner {
  display: inline-block;
}

.sidenav {
  width: 45%;
  float: left;
}

.heading {
  font-family: Futura, Helvetica, Arial, sans-serif;
  text-align: center;
}

#charts {
  display: flex;
  justify-content: center;
}

#leader {
  width: 40%;
}

#graph {
  text-align: justify;
  margin: auto;
}

.charts {
  margin: 5%;
}

.button {
  display: inline-block;
  border: none;
  color: black;
  font-family: unset;
  margin: 5px;
  border-radius: 30px;
  font-weight: 600;
  background-color: none;
}

.button:focus {
  background-color: #063006;
  color: ivory;
  outline: none;
}

#comp {
  text-align: center;
  
}
</style>
