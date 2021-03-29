<template>
  <div class="bg">
    <base-page></base-page>
    <co_linechart></co_linechart>
    <Footer />
  </div>
</template>

<script>
import Footer from './Footer.vue';
import BasePage from './Header.vue';
import co_linechart from './co_linechart.js'
import {mapGetters} from 'vuex'

export default {
  components: { BasePage, Footer, co_linechart },
  name: "Info",
  data: function () {
    return {
        BasePage
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