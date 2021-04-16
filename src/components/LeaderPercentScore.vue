<template>
    <div class="chart">
        <table id="percentRight">
            <thead>
                <tr>
                    <th class="head" scope="col">#</th>
                    <th class="head" scope="col">Name</th>
                    <th class="head" scope="col">Score</th>
                </tr>
            </thead>
            <tbody>
                <tr
                    v-for="(user, i) in users.sort((a, b) =>
                        a.value > b.value ? -1 : 1
                    ).slice(0,10)"
                    :key="i"
                >
                    <td class="row" scope="row">{{ ++i }}</td>
                    <td class="row">{{ user.user }}</td>
                    <td class="row">{{ user.value }}</td>
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

<style>
table {
    width: 90%;
    margin-left: 20px;
    height: 40vh;
    margin-top: 30px;
    border-left: 0px;
    border-right: 0px;
}

.head {
    background-color:rgba(6, 47, 79, 0.2);
    border-bottom: 1px solid #062F4F;
}

.row {
    border-bottom: 1px solid #062F4F;
}
</style>
