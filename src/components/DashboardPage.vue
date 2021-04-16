
<template>
  <div class="bg">
    <Header></Header>
    <h1 class="heading"> Dashboard </h1>
    <div id="charts">
      <donut-chart class="charts" id="donutchart"></donut-chart>
      <line-chart class="charts" id="linechart"></line-chart>
      <leaderboard id="leaderboard"></leaderboard>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from './Header.vue';
import Footer from './Footer.vue'
import {mapGetters} from 'vuex'
import DonutChart from './pieDashboard.vue'
import LineChart from './lineDashboard.vue'
import Leaderboard from './leaderboard.vue'

export default {
  components: { Header, Footer, DonutChart, LineChart, Leaderboard},
  name: "Dashboard",
  data: function () {
    return {
        Header,
        LineChart
    };
  },
  computed: {
    ...mapGetters([
      'userData'
    ])
  },
  methods: {
  }
};
</script>

<style scoped>
.bg {
  background-color: ivory;
  overflow-y: scroll;
}

.heading {
  font-family: Futura, Helvetica, Arial, sans-serif;
  text-align: center;
}

#charts {
  display:flex;
  justify-content: center;

}

.charts {
  margin: 5%;
}

#leaderboard {
  text-align: center;
  margin: auto;
}
</style>