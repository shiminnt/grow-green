
<template>
  <div>
    <base-page></base-page>
  </div>
</template>

<script>
import BasePage from './Header.vue';

export default {
  components: { BasePage },
  name: "Dashboard",
  data: function () {
    return {
        BasePage
    };
  },
};
</script>

<style scoped>

</style>