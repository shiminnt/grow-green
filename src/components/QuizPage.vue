
<template>
  <div>
    <base-page></base-page>
  </div>
</template>

<script>
import BasePage from './BasePage.vue';

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

</style>