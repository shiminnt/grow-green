
<template>
  <div class="bg">
    <base-page></base-page>
    <Footer />
  </div>
</template>

<script>
import BasePage from './Header.vue';
import Footer from './Footer.vue'
import {mapGetters} from 'vuex'

export default {
  components: { BasePage, Footer },
  name: "Dashboard",
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