<template>
    <div class="chart">
        <p>Total number of questions that are correct on the first try!</P>
        <table id="percentRight">
            <thead>
                <tr>
                    <th class="head" scope="col">#</th>
                    <th class="head" colspan="2" scope="col">Name</th>
                    <th class="head" scope="col">Score</th>
                </tr>
            </thead>
            <tbody>
                <tr
                    v-for="(user, i) in this.sorted(this.users).slice(0,5)"
                    :key="i"
                    v-bind:id="user"
                >
                    <td class="row" scope="row">{{ ++i }}</td>
                    <td class="row"><img class="dp" :src="user.photoURL"></td>
                    <td class="row">{{ user.user }}</td>
                    <td class="row">{{ user.value }}</td>
                </tr>
            </tbody>
        </table>
        <button class="findMeButton" v-on:click="findMe">Find Me!</button>
        <p v-if="clicked">
            You are currently #{{ this.userPosition }} in the world
        </p>
    </div>
</template>

<script>
import { database, auth } from "../firebase.js";

export default {
    data: function() {
        return {
            users: [],
            userPosition: 0,
            clicked: false,
            userData: {},
        };
    },
    watch: {},
    components: {},
    methods: {
        fetchItems() {
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
                        database
                            .collection("users")
                            .get()
                            .then((snapshot) => {
                                snapshot.docs.forEach((doc) => {
                                    var tempData = {};
                                    if (
                                        doc.data().displayName ==
                                        this.userData.displayName
                                    ) {
                                        tempData = this.userData;
                                    } else {
                                        tempData = doc.data();
                                    }
                                    var total = tempData.questionsDone.length;
                                    if (total == 0) {
                                        this.users.push({
                                            user: tempData.displayName,
                                            value: 0,
                                            photoURL: tempData.photoURL,
                                        });
                                    } else {
                                        var firstTry = 0;
                                        tempData.questionsDone.forEach((qn) => {
                                            if (qn.rightOnFirstTry) {
                                                firstTry++;
                                            }
                                        });
                                        this.users.push({
                                            user: tempData.displayName,
                                            value: firstTry,
                                            photoURL: tempData.photoURL,
                                        });
                                    }
                                });
                            });
                    });
            }
        },
        sorted: function(arr) {
            return arr.slice().sort(function(a, b) {
                return -(a.value - b.value);
            });
        },
        findMe() {
            var arr = this.sorted(this.users);
            for (var i = 0; i < arr.length; i++) {
                if (arr[i].user == this.userData.displayName) {
                    this.userPosition = i + 1;
                }
            }
            this.clicked = true;
        },
    },
    created() {
        this.fetchItems();
    },
};
</script>

<style>
.chart {
    padding-bottom: 100px;
}
table {
    width: 90%;
    margin-left: 20px;
    height: 30vh;
    margin-top: 30px;
    border-left: 0px;
    border-right: 0px;
}

.head {
    background-color: rgba(6, 47, 79, 0.2);
    border-bottom: 1px solid #062f4f;
}

.row {
    border-bottom: 1px solid #062f4f;
}

.dp {
  width: 40px;
  height: 40px;
}
.findMeButton {
  background-color: rgba(6, 47, 79, 0.2);
  border: none;
  padding: 15px;
  border-radius: 20px;
  font-weight: 800;
}
</style>
