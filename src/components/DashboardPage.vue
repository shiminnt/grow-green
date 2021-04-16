<template>
    <div class="bg">
        <Header></Header>
        <h1 class="heading">Dashboard</h1>
        <div id="charts">
            <donut-chart class="charts" id="donutchart"></donut-chart>
            <line-chart class="charts" id="linechart"></line-chart>
            <div id="leaderboard">
                <leader-percentage />
                <leader-trees />
                <leader-articles />
            </div>
        </div>
        <Footer></Footer>
    </div>
</template>

<script>
import Header from "./Header.vue";
import Footer from "./Footer.vue";
import { mapGetters } from "vuex";
import DonutChart from "./pieDashboard.vue";
import LineChart from "./lineDashboard.vue";
import LeaderPercentage from "./LeaderPercentScore.vue";
import LeaderTrees from "./LeaderTree.vue";
import LeaderArticles from "./LeaderArticles.vue";

export default {
    components: {
        Header,
        Footer,
        DonutChart,
        LineChart,
        LeaderPercentage,
        LeaderTrees,
        LeaderArticles,
    },
    name: "Dashboard",
    data: function() {
        return {
            Header,
        };
    },
    computed: {
        ...mapGetters(["userData"]),
    },
};
</script>

<style scoped>
.bg {
    background-color: ivory;
    overflow-y: scroll;
}

.heading {
    font-family: Futura, Helvetica, Arial, sans-serif;
    text-align: center;
}

#charts {
    display: flex;
    justify-content: center;
}

.charts {
    margin: 5%;
}

#leaderboard {
    text-align: center;
    margin: auto;
}
</style>
