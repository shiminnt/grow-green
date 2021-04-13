
<template>
  <div class="bg">
    <Header></Header>
    <DonutChart />
    <line-chart></line-chart>
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
</style>