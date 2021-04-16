<template>
  <div>
    <div class="boxes">
      <div class="control">
        <label class="checkbox">
          <input
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
  name: "monthly-sales-chart",
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
      var d = new Date();
      d.setDate(d.getDate() - 7);
      for (var i = 0; i < 7; i++) {
        this.labels.push((d.getDate()+1) + " " + d.toLocaleString('default', { month: 'long' }));
        d.setDate(d.getDate() + 1);
        for (
          var y = 0;
          y < this.$store.state.userData.questionsDone.length;
          y++
        ) {
          if (
            this.$store.state.userData.questionsDone[y].date.month ==
              d.toLocaleString('default', { month: 'long' }) &&
            this.$store.state.userData.questionsDone[y].date.day == d.getDate()
          ) {
            datasets.questionsDone.data[i]++;
          }
        }

        for (
          var x = 0;
          x < this.$store.state.userData.articlesRead.length;
          x++
        ) {
          if (
            this.$store.state.userData.articlesRead[x].date.month ==
              d.toLocaleString('default', { month: 'long' }) &&
            this.$store.state.userData.articlesRead[x].date.day == d.getDate()
          ) {
            datasets.articlesRead.data[i]++;
          }
        }
        for (var z = 0; z < this.$store.state.userData.treeDates.length; z++) {
          console.log(z)
          console.log("trees date: " + this.$store.state.userData.treeDates[z].month + " " + this.$store.state.userData.treeDates[z].day)
          if (
            this.$store.state.userData.treeDates[z].month == d.toLocaleString('default', { month: 'long' }) &&
            this.$store.state.userData.treeDates[z].day == d.getDate()
          ) {
            datasets.treesPlanted.data[i]++;
          }
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