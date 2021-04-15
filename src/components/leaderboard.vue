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
                <tr
                    v-for="(user, i) in users.sort((a, b) =>
                        a.percentage > b.percentage ? -1 : 1
                    )"
                    :key="i"
                >
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
import { mapGetters } from "vuex";

export default {
    name: "leaderboard",
    data: function() {
        return {
            users: [],
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
                        if (
                            doc.data().displayName == this.userData.displayName
                        ) {
                            tempData = this.userData;
                        } else {
                            tempData = doc.data();
                        }
                        var total = tempData.questionsDone.length;
                        var percentage = 0;
                        if (total == 0) {
                            this.users.push({
                                user: tempData.displayName,
                                percentage: 0,
                            });
                        } else {
                            var firstTry = 0;
                            tempData.questionsDone.forEach((qn) => {
                                if (qn.rightOnFirstTry) {
                                    firstTry++;
                                }
                            });
                            percentage = Math.floor((firstTry / total) * 100);
                            this.users.push({
                                user: tempData.displayName,
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

<style></style>
