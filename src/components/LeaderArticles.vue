<template>
    <div class="chart">
        <p>Total number of articles read!</P>
        <table id="articlesRead">
            <thead>
                <tr>
                    <th class="head2" scope="col">#</th>
                    <th class="head2" colspan="2" scope="col">Name</th>
                    <th class="head2" scope="col">Score</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(user, i) in sorted(this.users).slice(0,5)" :key="i">
                    <td class="row2" scope="row">{{ ++i }}</td>
                    <td class="row2"><img class="dp" :src="user.photoURL"></td>
                    <td class="row2">{{ user.user }}</td>
                    <td class="row2">{{ user.value }}</td>
                </tr>
            </tbody>
        </table>
        <button class="findMebutton2" v-on:click="findMe">Find Me!</button>
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
            clicked: false,
            userPosition: 0,
            userData: {},
        };
    },
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
                                    var value = tempData.numArticles;
                                    this.users.push({
                                        user: tempData.displayName,
                                        value: value,
                                        photoURL: tempData.photoURL,
                                    });
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
    padding-bottom: 30px;
}

.head2 {
    background-color: rgba(129, 55, 114, 0.2);
    border-bottom: 1px solid #813772;
}

.row2 {
    border-bottom: 1px solid #813772;
}
.dp {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
.findMebutton2 {
  background-color: rgba(129, 55, 114, 0.2);
  border: none;
  padding: 15px;
  border-radius: 20px;
  font-weight: 800;
}
</style>
