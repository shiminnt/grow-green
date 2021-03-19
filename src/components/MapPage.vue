
<template>
  <div>
    <base-page></base-page>
    hi
  </div>
</template>

<script>
import BasePage from './Header.vue';

export default {
  components: { BasePage },
  name: "Map",
  data: function () {
    return {
        BasePage
    };
  },
};
</script>

<style scoped>

</style>