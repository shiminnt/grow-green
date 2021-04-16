<template>
    <div class="bg">
        <Header></Header>
        <h1 class="heading">Dashboard</h1>
        <div id="charts">
            <div id="graph">
                <donut-chart class="inner" id="donutchart"></donut-chart>
                <line-chart class="inner" id="linechart"></line-chart>
            </div>
            <div id="leader">
                <div id="outer">
                    <button class="button" v-on:click="question">
                        Question Correct (Percentage)
                    </button>
                    <button class="button" v-on:click="articles">
                        Most Articles Read
                    </button>
                    <button class="button" v-on:click="trees">
                        Most Trees Planted
                    </button>
                </div>
                <component v-bind:is="component" />
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
            component: "",
            Header,
        };
    },
    methods: {
        question() {
            this.component = LeaderPercentage;
        },
        trees() {
            this.component = LeaderTrees;
        },
        articles() {
            this.component = LeaderArticles;
        },
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

#outer {
    width: 100%;
    text-align: center;
}

.inner {
    display: inline-block;
}

.sidenav {
    width: 45%;
    float: left;
}

.heading {
    font-family: Futura, Helvetica, Arial, sans-serif;
    text-align: center;
}

#charts {
    display: flex;
    justify-content: center;
}

#leader {
    width: 40%;
}

#graph {
    text-align: justify;
    margin: auto;
}

.charts {
    margin: 5%;
}

.button {
    display: inline-block;
    background-color: black;
    border: none;
    color: white;
    font-family: unset;
    margin: 5px;
    border-radius: 30px;
    font-weight: 600;
}
</style>
