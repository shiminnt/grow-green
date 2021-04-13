
<template>
  <div class="bg">
    <Header></Header>
    <h1 class="heading"> Dashboard </h1>
    <div id="charts">
      <donut-chart class="charts"></donut-chart>
      <line-chart class="charts"></line-chart>
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

export default {
  components: { Header, Footer, DonutChart, LineChart},
  name: "Dashboard",
  data: function () {
    return {
        Header
    };
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

.heading {
  font-family: Futura, Helvetica, Arial, sans-serif;
  text-align: center;
}

</style>