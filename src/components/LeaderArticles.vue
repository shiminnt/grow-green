<template>
    <div class="chart">
        <table id="percentRight">
            <thead>
                <tr>
                    <th class="head2" scope="col">#</th>
                    <th class="head2" scope="col">Name</th>
                    <th class="head2" scope="col">Score</th>
                </tr>
            </thead>
            <tbody>
                <tr
                    v-for="(user, i) in users.sort((a, b) =>
                        a.value > b.value ? -1 : 1
                    ).slice(0,10)"
                    :key="i"
                >
                    <td class="row2" scope="row">{{ ++i }}</td>
                    <td class="row2">{{ user.user }}</td>
                    <td class="row2">{{ user.value }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import { database} from "../firebase.js";
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
                        var value = tempData.numArticles;
                        console.log(value);
                        this.users.push({
                            user: tempData.displayName,
                            value: value,
                        });
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

.head2 {
    background-color: rgba(129, 55, 114, 0.2);
    border-bottom: 1px solid #813772;
}

.row2 {
    border-bottom: 1px solid #813772;
}

</style>
