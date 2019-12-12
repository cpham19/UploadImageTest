<template>
  <div id="app">
    <v-app id="inspire">
      <v-content>
        <router-view />
      </v-content>
    </v-app>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
    };
  },
  components: {
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
}

</style>