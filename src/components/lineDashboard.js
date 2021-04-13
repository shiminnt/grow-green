import { Line } from 'vue-chartjs'

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
              text: 'User Activity for the past 7 days'
            },
            legend: { display: true },
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                yAxes: [{
                    ticks: {
                        min: 0,
                        max: 10,
                        stepSize: 1,
                        beginAtZero: true,
                    },
                    scaleLabel: {
                        display: true,
                        labelString: 'Number',
                        color: 'black'
                    }
                }],
                xAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: 'Date',
                        color: 'black'
                    }
                }]
            }
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
            for (var y=0; y < this.$store.state.userData.questionsDone.length; y++) {
                if (this.$store.state.userData.questionsDone[y].date.month == d.getMonth() && this.$store.state.userData.questionsDone[y].date.day == d.getDate()) {
                    this.datacollection.datasets[0].data[i]++
                }
            }
            
            for (var x=0; x < this.$store.state.userData.articlesRead.length; x++) {
                if (this.$store.state.userData.articlesRead[x].date.month == d.getMonth() && this.$store.state.userData.articlesRead[x].date.day == d.getDate()) {
                    this.datacollection.datasets[1].data[i]++
                }
            }
            for (var z=0; z < this.$store.state.userData.treeDates.length; z++) {
                if (this.$store.state.userData.treeDates[z].month == d.getMonth() && this.$store.state.userData.treeDates[z].day == d.getDate()) {
                    this.datacollection.datasets[2].data[i]++
                }
            }
            
        }
    }
  },
  created () {
      this.fetchItems()
  },
  mounted () {
    this.renderChart(this.datacollection, this.options)
  }
}