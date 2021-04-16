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
                        a.value > b.value ? -1 : 1
                    )"
                    :key="i"
                >
                    <th scope="row">{{ ++i }}</th>
                    <td>{{ user.user }}</td>
                    <td>{{ user.value }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import { database } from "../firebase.js";
import { mapGetters } from "vuex";

export default {
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
                        var value = 0;
                        if (total == 0) {
                            this.users.push({
                                user: tempData.displayName,
                                value: 0,
                            });
                        } else {
                            var firstTry = 0;
                            tempData.questionsDone.forEach((qn) => {
                                if (qn.rightOnFirstTry) {
                                    firstTry++;
                                }
                            });
                            value = Math.floor((firstTry / total) * 100);
                            this.users.push({
                                user: tempData.displayName,
                                value: value,
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
