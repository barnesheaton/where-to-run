<template>
  <v-container fluid>
    <v-parallax dark src="/assets/1216505.jpg" class="parallax">
      <v-row align="center" justify="center">
        <v-col class="text-center" cols="12">
          <h1 class="display-1 font-weight-thin mb-4">Vuetify.js</h1>
          <h4 class="subheading">Build your application today!</h4>
        </v-col>
      </v-row>
    </v-parallax>
  </v-container>
</template>

<script>
export default {
  name: 'App',
  methods: {
    metho() {
      console.log('hey')
    }
  }
}
</script>

<style lang="scss">
.parallax {
}
.container {
  padding: 0;
}
</style>
