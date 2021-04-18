import { Doughnut } from "vue-chartjs";
import { database, auth } from "../firebase.js";

export default {
    extends: Doughnut,
    data: function() {
        return {
            datacollection: {
                labels: ["Right on first try", "Right with multiple tries"],
                datasets: [
                    {
                        label: "Questions Done",
                        backgroundColor: ["#B82601", "#062F4F"],
                        data: [],
                    },
                ],
            },
            options: {
                title: {
                    display: true,
                    text: "Number of questions right on the first try",
                },
                responsive: true,
                maintainAspectRatio: false,
            },
            userData: {},
        };
    },
    methods: {
        fetchData() {
            const user = auth.currentUser;
            if (user) {
                this.photoUrl = user.photoURL;
                const uid = user.uid;
                database
                    .collection("users")
                    .doc(uid)
                    .get()
                    .then((doc) => {
                        this.userData = doc.data();
                        var qns = this.userData.questionsDone;
                        this.datacollection.datasets[0].data.push(
                            qns.filter(function(item) {
                                return item.rightOnFirstTry;
                            }).length
                        );
                        this.datacollection.datasets[0].data.push(
                            qns.length - this.datacollection.datasets[0].data[0]
                        );
                        this.renderChart(this.datacollection, this.options);
                    });
            }
        },
    },
    mounted() {
        this.fetchData();
    },
};
