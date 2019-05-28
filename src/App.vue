<template>
  <div id="app">
    <RoleLabellingView />
  </div>
</template>

<script>
import RoleLabellingView from './views/RoleLabellingView.vue';

export default {
  name: 'app',
  components: {
    RoleLabellingView,
  },
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
