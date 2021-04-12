import { Doughnut } from 'vue-chartjs'


export default {
    extends: Doughnut,
    data: function () {
        return {
            datacollection: {
                labels: ["Right on first try", "Right with multiple tries"],
                datasets: [{
                    label: "Questions Done",
                    backgroundColor: ["#3e95cd", "#8e5ea2"],
                    data: [1, 1]
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

}