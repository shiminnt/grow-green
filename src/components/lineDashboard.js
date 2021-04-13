import { Line } from 'vue-chartjs'
import {mapGetters} from 'vuex'

export default {
  extends: Line,
  data: function () {
    return {
        datacollection: {
            labels: [],
            datasets: [{
                label: "Questions Done",
                type: "line",
                borderColor: "#062F4F",
                data: [0,0,0,0,0,0,0],
                fill: false
              }, {
                label: "Articles Read",
                type: "line",
                borderColor: "#813772",
                data: [0,0,0,0,0,0,0],
                fill: false
              }, {
                label: "Trees Planted",
                type: "line",
                borderColor: "#B82601",
                data: [0,0,0,0,0,0,0],
                fill:false
              },
            ]
        },
        options: {
            title: {
              display: true,
              text: 'User Activity for the past week'
            },
            legend: { display: true },
            responsive: true,
            maintainAspectRatio: false
        }
    }
  },
  methods: {
    fetchItems: function() {
        var d = new Date();
        d.setDate(d.getDate() - 6)
        for (var i=0; i < 7; i++) {
            this.datacollection.labels.push(d.getDate()+ "/"+d.getMonth())
            d.setDate(d.getDate() + 1);
            for (var y=0; y < this.userData.questionsDone.length; y++) {
                if (this.userData.questionsDone[y].date.month == d.getMonth() && this.userData.questionsDone[y].date.day == d.getDate()) {
                    this.datacollection.datasets[0].data[i]++
                }
            }
            
        }
    }
  },
  computed: {
    ...mapGetters([
      'userData'
    ])
  },
  created () {
      this.fetchItems()
  },
  mounted () {
    this.renderChart(this.datacollection, this.options)
  }
}