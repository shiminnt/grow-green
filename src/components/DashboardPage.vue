
<template>
  <div class="bg">
    <Header></Header>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from './Header.vue';
import Footer from './Footer.vue'
import {mapGetters} from 'vuex'

export default {
  components: { Header, Footer },
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