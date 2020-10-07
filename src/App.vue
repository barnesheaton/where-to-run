<template>
  <v-app>
    <v-app-bar app color="accent-4 blue-grey" dense dark>
      <v-toolbar-title>This...</v-toolbar-title>
    </v-app-bar>
    <v-main>
      <v-parallax dark src="/dist/assets/background.jpg" class="parallax p-0" height="1000">
        <v-container class="inner-container" fluid>
          <v-banner elevation="5" color="white">
            <div class="text-center banner-container">
              <h2 class="my-6">
                Welcome to This...
              </h2>
              <v-btn elevation="2" @click="getStocks">
                Request
              </v-btn>
              <vgl-renderer class="getting-started">
                <vgl-box-geometry name="box"></vgl-box-geometry>
                <vgl-scene>
                  <vgl-mesh geometry="box"></vgl-mesh>
                </vgl-scene>
                <vgl-perspective-camera orbit-position="3 1 0.5"></vgl-perspective-camera>
              </vgl-renderer>
            </div>
          </v-banner>
        </v-container>
      </v-parallax>
    </v-main>
  </v-app>
</template>

<script>
import yahooFinance from 'yahoo-finance'

export default {
  name: 'App',

  data() {
    return {
      stocks: null
    }
  },
  methods: {
    getStocks() {
      yahooFinance.historical(
        {
          symbol: 'AAPL',
          from: '2012-01-01',
          to: '2012-12-31'
        },
        function (err, quotes) {
          console.log(quotes)
        }
      )
    }
  }
}
</script>

<style lang="scss">
.main-banner {
  opacity: 0.95;
  margin-top: 100px;
  margin-bottom: 100px;
}
.v-parallax__content {
  padding: 0;
}
.getting-started {
  width: 400px;
  height: 247px;
}
.container--fluid {
  padding-top: 100px !important;
  padding-bottom: 100px !important;
}
.inner-container {
  margin: 0;
  height: 100%;
  padding-left: 0;
  padding-right: 0;
}
.header {
  opacity: 0.5;
  background-color: lightgrey;
}
.container--fluid {
  padding: 0;
}
.slider {
  width: 50%;
}
</style>
