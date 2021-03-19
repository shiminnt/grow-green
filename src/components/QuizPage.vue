
<template>
  <div class = "main">
    <base-page></base-page>
  </div>
</template>

<script>
import BasePage from './Header.vue';

export default {
  components: { BasePage },
  name: "Quiz",
  data: function () {
    return {
        BasePage
    };
  },
};
</script>

<style scoped>
.main {
  background-color: ivory;
}
</style>