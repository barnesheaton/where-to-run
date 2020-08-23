<template>
  <div class="container">
    Hello World
    <v-btn />
    <v-btn />
    <v-btn />
  </div>
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
.container {
  display: flex;
  flex: 1;
  text-align: center;
}
</style>
