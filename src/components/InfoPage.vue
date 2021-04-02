<template>
  <div class="bg">
    <Header></Header>
    <co_linechart></co_linechart>
    <Footer />
  </div>
</template>

<script>
import Footer from './Footer.vue';
import Header from './Header.vue';
import co_linechart from './co_linechart.js'
import {mapGetters} from 'vuex'

export default {
  components: { Header, Footer, co_linechart },
  name: "Info",
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