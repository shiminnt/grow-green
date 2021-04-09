<template>
    <div class="bg">
        <Header></Header>
        <div class="container">
        <img class="headingimg" src="https://smile.cebupacificair.com/wp-content/uploads/2019/06/Arbor-Day-tree-planting_galleryX.jpg">
        <h1 class="heading">GrowGreen</h1>
        <p class="aboutGG">At GrowGreen, we aim to heal the world one step at a time. 
            We report environmental news to inspire readers to stay current and relevant with latest happenings.
            We provide learning platforms like online quiz and real-life volunteer oppportunities for users to join.
            Our goal is to shine light on the bigger environmental issues around the world and provide solutions on how
            each and everyone of us can help to play a part to heal our world.
            Here at GrowGreen, we take pride and celebrate ways in which humans are contributing to save the planet, 
            ensuring a greener future for all.
            If we are taking a step closer to green sustainability everyday, we will celebrate with you in the sidelines.
            But now, the road to sustainability is a long and rocky one. We will fight alongside you for a greener, healthier Earth.<br><br>
            Grow your Knowledge. Grow your Experiences. Grow your Contributions. Grow Green.
        </p>
        </div>
        <h2 class="heading2">Your Experiences</h2>
        <div class="allIcons">
            <img class="icons" src="../assets/volunteerIcon.png">
            <img class="icons" src="../assets/newsIcon.png">
            <img class="icons" src="../assets/quizIcon.png">
            <br>
            <a class="iconTitle">Volunteer</a>
            <a class="iconTitle"> News </a>
            <a class="iconTitle"> Quiz </a>
        </div>
        <h2 class="heading2">Our Vision</h2>
        <center class="textinfo">We envision a world where everyone is socially responsible and well-informed,
            making decisions based on what is the best for the environment.
        </center>
        <h2 class="heading2">Our Mission</h2>
        <center class="textinfo">To inform, educate and inspire the vision of a greener world.</center>
        <Footer></Footer>
    </div>
</template>

<script>
import Header from './Header.vue';
import Footer from './Footer.vue'

export default {
    components: { Header, Footer },
    name: "aboutus",
    data: function() {
        return {

        }
    },
}

</script>

<style scoped>
.bg {
    background-color: ivory;
    overflow: scroll;
}
.container {
    position: relative;
    text-align: center;
    color: white;
}
.heading {
    position: absolute;
    top: 35%;
    left: 50%;
    transform: translate(-50%, -50%);
}
.heading2 {
    text-align: center;
}
.headingimg{
    width: 100%;
    height: 510px;
    filter: brightness(50%)
}
.aboutGG {
    position: absolute;
    bottom: 40px;
    padding-left: 200px;
    padding-right: 200px;
    font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
}
.allIcons {
    text-align: center;
}
.icons {
    width: 15%;
    height: 25%;
    padding-left:100px;
    padding-right:100px;
}
.iconTitle {
    padding-left:170px;
    padding-right:200px;
}
</style>