<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
export default {
  data() {
    return {
      imageUrl: require("./assets/logo.png"),
    };
  },
  created() {},
};
</script>
<style lang="css">
#app {
  width: 100%;
  height: 100%;
  background: url("./assets/image/bg.png");
  background-size: 100% 100%;
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
}
</style>
