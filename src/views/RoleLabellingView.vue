<template>
  <div>
    <div>
      <h2>Create training example</h2>
    </div>
    <div>
      <RoleLabellingComponent
        v-bind:tokens="RoleLabellingComponentData.tokens"
      />
    </div>
  </div>
</template>

<script>
import RoleLabellingComponent from '../components/RoleLabellingComponent.vue';
import RoleLabellingComponentData from '../data/example/RoleLabellingComponentData';

export default {
  name: 'RoleLabellingView',
  components: {
    RoleLabellingComponent,
  },
  // mounted() {
  //   console.log(RoleLabellingComponentData)
  // },
  data() {
    return {
      RoleLabellingComponentData,
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
