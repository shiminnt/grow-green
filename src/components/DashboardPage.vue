
<template>
  <div class="bg">
    <Header></Header>
    <DonutChart />
    <Footer></Footer>
  </div>
</template>

<script>
import Header from './Header.vue';
import Footer from './Footer.vue'
import {mapGetters} from 'vuex'
import DonutChart from './pieDashboard.vue'

export default {
  components: { Header, Footer, DonutChart},
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
}
</style>