<template>
  <div class="app">
    <router-view></router-view>
  </div>
</template>

<script>
/* import { database, auth } from "./firebase.js";
import { mapGetters } from "vuex"; */

export default {
  name: "App",
  data: function () {
    return {
    };
  },
/*   computed: {
        ...mapGetters(["userData"]),
    },
  methods: {
    onClose: function () {
      const user = auth.currentUser;
      const uid = user.uid;
            database
                .collection("users")
                .doc(uid)
                .set(this.userData)
                .then(() => {
                  console.log("saved");
                });
    }
  },
  created() {
    window.addEventListener('beforeunload', this.onClose);
  } */
};
</script>

<style>
</style>
