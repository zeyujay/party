<template>
  <div class="main">
    <div class="container">
      <div v-for="i in 20" class="person_item" :key="i">{{ i }}</div>
    </div>
  </div>
</template>
<script>
export default {
  name: "ShowMe",
  data() {
    return {};
  },
};
</script>
<style lang="css" scoped>
.person_item {
  width: 100px;
  height: 50px;
}
</style>
