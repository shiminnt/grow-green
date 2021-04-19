<template>
  <div>
    <div class="boxes">
      <div class="control">
        <label class="checkbox">
          <input
            class="box"
            type="checkbox"
            :value="'questionsDone'"
            v-model="selectedOptions"
          />
          Questions Done
        </label>
      </div>
      <div class="control">
        <label class="checkbox">
          <input
            class="box"
            type="checkbox"
            :value="'articlesRead'"
            v-model="selectedOptions"
          />
          Articles Read
        </label>
      </div>
      <div class="control">
        <label class="checkbox">
          <input
            class="box"
            type="checkbox"
            :value="'treesPlanted'"
            v-model="selectedOptions"
          />
          Trees Planted
        </label>
      </div>
    </div>
    <line-chart
      :datasets="displayedDatasets"
      :options="$options.options"
      :labels="labels"
      :width="500"
      :height="400"
    ></line-chart>
  </div>
</template>

<script>
import LineChart from "./lineChart.vue";
import { database, auth } from "../firebase.js";

var datasets = {
  questionsDone: {
    label: "Questions Done",
    type: "line",
    borderColor: "#062F4F",
    backgroundColor: "rgba(6, 47, 79, 0.2)",
    data: [0, 0, 0, 0, 0, 0, 0],
  },
  articlesRead: {
    label: "Articles Read",
    type: "line",
    borderColor: "#813772",
    backgroundColor: "rgba(129, 55, 114, 0.2)",
    data: [0, 0, 0, 0, 0, 0, 0],
  },
  treesPlanted: {
    label: "Trees Planted",
    type: "line",
    borderColor: "#B82601",
    backgroundColor: "rgba(184, 38, 1, 0.2)",
    data: [0, 0, 0, 0, 0, 0, 0],
  },
};
const options = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
          stepSize: 1,
        },
      },
    ],
  },
  title: {
    display: true,
    text: "User Activity for the past 7 days",
  },
};

var labels = [];

export default {
  name: "user-activity-chart",
  datasets,
  options,
  labels,
  components: {
    LineChart,
  },
  data() {
    return {
      // Select all datasets by default.
      selectedOptions: ["questionsDone", "articlesRead", "treesPlanted"],
      labels: [],
    };
  },
  computed: {
    // The datasets to display.
    displayedDatasets() {
      return this.selectedOptions.map((option) => datasets[option]);
    },
  },
  methods: {
    fetchItems: function () {
      // resetting data
      datasets.questionsDone.data = [0,0,0,0,0,0,0]
      datasets.articlesRead.data = [0,0,0,0,0,0,0]
      datasets.treesPlanted.data = [0,0,0,0,0,0,0]
      const user = auth.currentUser;
      if (user) {
        this.photoUrl = user.photoURL;
        const uid = user.uid;
        database
          .collection("users")
          .doc(uid)
          .get()
          .then((doc) => {
            // this.userData = doc.data();
            var d = new Date();
            d.setDate(d.getDate() - 7);
            for (var i = 0; i < 7; i++) {
              this.labels.push(
                d.getDate() +
                  1 +
                  " " +
                  d.toLocaleString("default", {
                    month: "long",
                  })
              );
              d.setDate(d.getDate() + 1);
              for (var y = 0; y < doc.data().questionsDone.length; y++) {
                if (
                  doc.data().questionsDone[y].date.month ==
                    d.toLocaleString("default", {
                      month: "long",
                    }) &&
                  doc.data().questionsDone[y].date.day == d.getDate()
                ) {
                  datasets.questionsDone.data[i]++;
                }
              }

              for (var x = 0; x < doc.data().articlesRead.length; x++) {
                if (
                  doc.data().articlesRead[x].date.month ==
                    d.toLocaleString("default", {
                      month: "long",
                    }) &&
                  doc.data().articlesRead[x].date.day == d.getDate()
                ) {
                  datasets.articlesRead.data[i]++;
                }
              }
              for (var z = 0; z < doc.data().treeDates.length; z++) {
                if (
                  doc.data().treeDates[z].month ==
                    d.toLocaleString("default", {
                      month: "long",
                    }) &&
                  doc.data().treeDates[z].day == d.getDate()
                ) {
                  datasets.treesPlanted.data[i]++;
                }
              }
            }
            this.uncheck();
            this.check();
          });
      }
      
    },
    uncheck() {
      var w = document.getElementsByClassName('box')
      for(var i = 0; i < w.length; i++){ 
        if(w[i].type=='checkbox'){ 
          w[i].click()
        }
      }
    },
    check() {
      var w = document.getElementsByClassName('box')
      for(var i = 0; i < w.length; i++){ 
        if(w[i].type=='checkbox'){ 
          w[i].click();
        }
      }
    },
  },
  created() {
    this.fetchItems();
  },
};
</script>

<style>
.boxes {
  display: flex;
  justify-content: center;

}
</style>
