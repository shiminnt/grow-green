<template>
  <div id="footer">
    <div id="general">
      <p class="content">About Us</p>
      <br />
      <p class="content">Contact</p>
      <br />
      <p class="content">Follow Us</p>
      <br />
    </div>
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
  position: absolute;
  bottom: 0pt;
  width: 100%;
  height: 3%;
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
}

.content {
  color: black;
  font-weight: normal;
  text-align: right;
  padding-left: 15px;
  font-family: Optima;
  letter-spacing: 0.03cm;
  font-size: 15px;
  margin-top: 0px;
}
</style>