<template>
  <div id="footer">
    <ul id="general">
      <li class="content"><router-link to="/aboutus">About Us</router-link></li>
      <br />
      <li class="content"><router-link to="/contactus">Contact Us</router-link></li>
      <br />
      <li class="content">Follow Us</li>
      <img class="igIcon" src="https://cdn1.iconfinder.com/data/icons/social-media-outline-6/128/SocialMedia_Instagram-Outline-512.png">
      <br />
    </ul>
    <a id="copyright">&#169; 2021 BY GROWGREEN</a>
  </div>
</template>

<script>
export default {
  name: "Footer",
  data: function () {
    return {};
  },
};
</script>

<style scope>
#footer {
  display: flex;
  background-color: rgb(245, 222, 179);
  justify-content: space-between;
  text-align: right;
  position: relative;
  bottom: 0pt;
  width: 100%;
  height: 55px;
}
#copyright {
  font-family: cormorantgaramond;
  font-style: normal;
  font-weight: normal;
  font-size: 15px;
  margin-right: 1vw;
  margin-top: 2px;
}

#general {
  display: flex;
  margin-top: 2px;
  padding-right: 1vw;
  list-style-type: none;
}

.content {
  text-decoration: none;
  color: black;
  font-weight: normal;
  text-align: right;
  padding-left: 15px;
  font-family: Optima;
  letter-spacing: 0.03cm;
  font-size: 15px;
  margin-top: 0px;
}

.content > a {
  text-decoration: none;
  color: black;
}

.content > a:hover {
  color: grey;
}

.igIcon{
  width: 50px;
  height: 50px;
}
</style>