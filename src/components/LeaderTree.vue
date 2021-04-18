<template>
  <div class="chart">
    <table id="percentRight">
      <thead>
        <tr>
          <th class="head3" scope="col">#</th>
          <th class="head3" scope="col">Name</th>
          <th class="head3" scope="col">Score</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(user, i) in sorted(this.users)" :key="i">
          <td class="row3" scope="row">{{ ++i }}</td>
          <td class="row3">{{ user.user }}</td>
          <td class="row3">{{ user.value }}</td>
        </tr>
      </tbody>
    </table>
    <button v-on:click="findMe">Find Me!</button>
    <p v-if="clicked">
      You are currently #{{ this.userPosition }} in the world
    </p>
  </div>
</template>

<script>
import { database } from "../firebase.js";
import { mapGetters } from "vuex";

export default {
  data: function () {
    return {
      users: [],
      userPosition: 0,
      clicked: false,
    };
  },
  computed: {
    ...mapGetters(["userData"]),
  },
  components: {},
  methods: {
    fetchItems() {
      database
        .collection("users")
        .get()
        .then((snapshot) => {
          snapshot.docs.forEach((doc) => {
            var tempData = {};
            if (doc.data().displayName == this.userData.displayName) {
              tempData = this.userData;
            } else {
              tempData = doc.data();
            }
            var value = tempData.numTrees;
            this.users.push({
              user: tempData.displayName,
              value: value,
            });
          });
        });
    },
    sorted: function (arr) {
      return arr.slice().sort(function (a, b) {
        return -(a.value - b.value);
      });
    },
    findMe() {
      var arr = this.sorted(this.users);
      for (var i = 0; i < arr.length; i++) {
        if (arr[i].user == this.userData.displayName) {
          this.userPosition = i + 1;
        }
      }
      this.clicked = true;
    },
  },
  created() {
    this.fetchItems();
  },
};
</script>

<style>
table {
  width: 90%;
  margin-left: 20px;
  height: 30vh;
  margin-top: 30px;
  border-left: 0px;
  border-right: 0px;
}

.head3 {
  background-color: rgba(184, 38, 1, 0.2);
  border-bottom: 1px solid #b82601;
}

.row3 {
  border-bottom: 1px solid #b82601;
}
</style>
