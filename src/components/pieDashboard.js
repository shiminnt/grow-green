import { Doughnut } from 'vue-chartjs'
import {mapGetters} from 'vuex'

export default {
  extends: Doughnut,
  data: function () {
    return {
        datacollection: {
            labels: ["Right on first try", "Right with multiple tries"],
            datasets: [{
                label: "Questions Done",
                backgroundColor: ["#3e95cd", "#8e5ea2"],
                data: [0, 0]
              }]
        },
        options: {
            title: {
              display: true,
              text: 'Number of questions right on the first try'
            },
            responsive: true,
            maintainAspectRatio: false
        },
    }
  },
  methods: {
    fetchItems() {
        for (var i = 0; i < this.userData.questionsDone.length; i++) {
        this.userData.questionsDone.forEach((qn) => {
            if(qn.rightOnFirstTry) {
                this.datacollection.datasets[0].data[0] += 1
            } else { this.datacollection.datasets[0].data[1] += 1 }
        })
          }

        this.renderChart(this.datacollection, this.options)
        console.log("hihi")
    }
  },
  computed: {
    ...mapGetters([
      'userData'
    ])
  },
  created () {
    this.fetchItems();
  },
}