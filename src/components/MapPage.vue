<template>
  <div class="bg">
    <base-page></base-page>
    <Footer />
  </div>
</template>

<script>
import Footer from './Footer.vue';
import BasePage from './Header.vue';
import {mapGetters} from 'vuex'

export default {
  components: { BasePage, Footer },
  name: "Map",
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