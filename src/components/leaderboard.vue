<template>
  <div class="chart">
    <table id="percentRight">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Name</th>
          <th scope="col">Score</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(user, i) in users.sort((a, b) => (a.percentage > b.percentage) ? -1 : 1)" :key="i">
          <th scope="row">{{ ++i }}</th>
          <td>{{ user.user }}</td>
          <td>{{ user.percentage }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { database } from "../firebase.js";

export default {
  name: "leaderboard",
  data: function () {
    return {
      users: [],
    };
  },
  components: {},
  methods: {
    fetchItems() {
      database
        .collection("users")
        .get()
        .then((snapshot) => {
          snapshot.docs.forEach((doc) => {
            var total = doc.data().questionsDone.length;
            var percentage = 0;
            if (doc.data().questionsDone.length == 0) {
              this.users.push({
                user: doc.data().displayName,
                percentage: 0,
              });
            } else {
              var firstTry = 0;
              doc.data().questionsDone.forEach((qn) => {
                if (qn.rightOnFirstTry) {
                  firstTry++;
                }
              });
              percentage = Math.floor((firstTry / total) * 100);
              this.users.push({
                user: doc.data().displayName,
                percentage: percentage,
              });
            }
          });
        });
    },
  },
  created() {
    this.fetchItems();
  },
};
</script>

<style>
</style>