<template>
  <div id="footer">
      <a id="copyright">&#169; 2021 BY GROWGREEN</a>
      <ul>
        <li>About Us</li>
        <li>Contact</li>
        <li>Follow Us</li>
      </ul>
  </div>
</template>

<script>
export default {
  name: "Footer",
  data: function () {
    return {
    };
  },
};
</script>

<style scope>
#footer {
    background-color: rgb(245, 222, 179);
    justify-content: space-between;
    text-align: right;
    position:absolute;
    width: 100%;
    height: 10%;
}
#copyright {
  font-family:cormorantgaramond;
  font-style: normal;
  font-weight: normal;
  font-size: 15px;
}
ul {
  display: flex;
    float:initial;
    flex-wrap: wrap;
    list-style-type: none;
    overflow: hidden;
}
ul > li {
  float: right;
  display: block;
  color: black;
  text-align: right;
  padding:1vh 15px;
  text-decoration: none;
  font-family: Optima;
  letter-spacing: 0.03cm;
}
</style>