
<template>
  <div class="bg">
    <base-page></base-page>
    <Footer />
  </div>
</template>

<script>
import BasePage from './Header.vue';
import Footer from './Footer.vue';

export default {
  components: {BasePage, Footer},
  name: "Quiz",
  data: function () {
    return {
    };
  },
  computed: {
    userData() {
      return this.$store.state.userData
    }
  }
};
</script>

<style scoped>
.bg {
  background-color: ivory;
}
</style>