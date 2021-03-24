
<template>
  <div class="bg">
    <base-page></base-page>
    <Footer />
  </div>
</template>

<script>
import BasePage from './Header.vue';
import Footer from './Footer.vue';
import {mapGetters} from 'vuex'

export default {
  components: {BasePage, Footer},
  name: "Quiz",
  data: function () {
    return {
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