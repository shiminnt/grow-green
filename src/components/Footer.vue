<template>
  <div id="footer">
    <ul id="general">
      <li class="content">
        <router-link to="/aboutus">About Us</router-link>
      </li>
      <br />
      <li class="content">
        <router-link to="/contactus">Contact Us</router-link>
      </li>
      <br />
      <li class="content">
        <router-link to="/contributequiz">Contribute a question!</router-link>
      </li>
      <br />
      <li class="content">
        <router-link to="/publiciseevent">Publicise your event!</router-link>
      </li>
      <br />
      <li class="content">Follow Us</li>
      <a href="https://www.instagram.com/growgreen.3103/" target="_blank">
        <img
          class="igIcon"
          src="https://cdn1.iconfinder.com/data/icons/social-media-outline-6/128/SocialMedia_Instagram-Outline-512.png"
        />
      </a>
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
  background-color: rgb(245, 222, 179);
  display: flex;
  justify-content: space-between;
  text-align: right;
  position: absolute;
  width: 100%;
  bottom: 0;
  height: 60px;
  line-height: 20px;
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
  padding-top: 15px;
}

.content > a {
  text-decoration: none;
  color: black;
}

.content > a:hover {
  color: grey;
}

.igIcon {
  width: 30px;
  height: 30px;
  padding-left: 10px;
  padding-top: 8px;
}
</style>
