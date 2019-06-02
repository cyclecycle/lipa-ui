<template>
  <div id="app">
    <div id="nav">
      <router-link to="/documents">Documents</router-link> |
      <router-link to="/patterns">Patterns</router-link> |
      <router-link to="/matches">Matches</router-link> |

      <router-link to="/document">DocumentView</router-link> |
      <router-link to="/role-label">RoleLabellingView</router-link> |
    </div>
    <router-view/>
  </div>
</template>

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
