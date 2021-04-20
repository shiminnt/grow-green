<template>
    <div class="bg">
        <Header></Header>
        <div class="article">
            <h1>{{ articleSet[0].title }}</h1>
            <img class="photo" v-bind:src="articleSet[0].urlToImage" />
            <p id="content">{{ articleSet[0].content.slice(0, 150) }} ...</p>
            <br />
            <p class="external" v-on:click="goToExternalArticle">
                Interested? Read more here
            </p>
        </div>

        <Footer></Footer>
    </div>
</template>

<script>
import Header from "./Header.vue";
import Footer from "./Footer.vue";
import axios from "axios";

export default {
    name: "Article",
    data: function() {
        return {
            articleSet: [],
            userData: {},
        };
    },
    components: {
        Header,
        Footer,
    },
    methods: {
        mounted() {
            axios
                .get(
                    `https://www.json-generator.com/api/json/get/cjBisMhbnm?indent=2`
                )
                .then((response) => {
                    response.data.articles.forEach((article) => {
                        if (article.title == this.$route.params.id) {
                            this.articleSet.push(article);
                        }
                    });
                });
            this.loadUserData();
        },
        goToExternalArticle() {
            var title = this.$route.params.id;
            window.open(this.articleSet[0].url, "_blank");
            var currentDate = new Date();
            var articleTitle = [];
            for (var i = 0; i < this.userData.articlesRead.length; i++) {
                articleTitle.push(this.userData.articlesRead[i].name);
            }
            if (!articleTitle.includes(title)) {
                var article = {
                    name: title,
                    date: {
                        month: currentDate.toLocaleString("default", {
                            month: "long",
                        }),
                        day: currentDate.getDate(),
                    },
                };
                this.userData.articlesRead.push(article);
                this.userData.numArticles += 1;
                this.updateDb();
            }
        },
    },
    created() {
        this.mounted();
    },
};
</script>

<style scoped>
.bg {
    background-color: ivory;
}

.article {
    text-align: center;
}

.photo {
    padding: 42px;
    width: 30vw;
    justify-content: center;
}

.external {
    text-decoration: underline;
}
</style>
