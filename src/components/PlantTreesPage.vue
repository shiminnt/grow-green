<template>
    <div class="bg">
        <base-page></base-page>
        <div id="knowledgeBox">
            <div id="qCash">
                <p class="text">
                    Total number of tree(s) planted: {{ userData.numTrees }}
                </p>
            </div>
            <div id="newTrees">
                <p class="text">
                    You can plant {{ this.numTreesCanPlant() }} more tree(s)!
                </p>
            </div>
            <img id="profileIcon" src="../assets/treegrowing.gif" />
            <br />
            <p>A tree has been planted!</p>
            <br />
            <button v-show="this.numTreesCanPlant() > 0" v-on:click="plantTree">
                Plant Another Tree
            </button>
            <button v-on:click="goToQuiz">Do Quiz</button>
        </div>
        <Footer></Footer>
    </div>
</template>

<script>
import BasePage from "./Header.vue";
import Footer from "./Footer.vue";

export default {
    components: { BasePage, Footer },
    data: function() {
        return {
            userData: {},
        };
    },
    methods: {
        goToQuiz: function() {
            this.$router.push({ name: "quizquestion" });
        },
        plantTree: function() {
            if (this.numTreesCanPlant() > 0) {
                var currentDate = new Date();
                var date = {
                    month: currentDate.toLocaleString("default", {
                        month: "long",
                    }),
                    day: currentDate.getDate(),
                };
                this.userData.numTrees += 1;
                this.userData.treeDates.push(date);
                this.updateDb();
            } else {
                alert("Tree cannot be planted. Try more questions!");
            }
        },
        numQuestionsNotCashed() {
            return this.userData.numQuiz - this.userData.numTrees * 10;
        },
        numTreesCanPlant() {
            return Math.floor(this.numQuestionsNotCashed() / 10);
        },
    },
    created() {
        this.loadUserData();
    },
};
</script>

<style scoped>
.bg {
    background-color: ivory;
}
#knowledgeBox {
    text-align: center;
    opacity: 82%;
    background: #eadece;
    border-radius: 12%;
    width: 500px;
    margin: auto;
    padding: 20px;
}
button {
    font-family: Futura;
    background-color: black;
    color: whitesmoke;
    border-radius: 40px;
    padding: 15px;
    text-align: center;
    width: 140px;
}
img {
    object-fit: contain;
    width: 50%;
    height: 50%;
}
</style>
