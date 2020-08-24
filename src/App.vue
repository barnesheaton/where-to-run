<template>
  <v-app>
    <v-app-bar app color="orange accent-4" dense dark>
      <v-toolbar-title>Where To Run?</v-toolbar-title>
    </v-app-bar>
    <v-main>
      <v-container fluid>
        <v-parallax dark src="/dist/assets/background.jpg" class="parallax" height="1000">
          <v-container class="inner-container">
            <v-row class="mb-6" no-gutters>
              <v-btn @click="getLocation">Current Location</v-btn>
              <GmapMap :center="mapCenter" :zoom="10" style="width: 500px; height: 300px;">
                <GmapMarker
                  :position="mapCenter"
                  :clickable="true"
                  :draggable="true"
                  @dragend="onDragMarker"
                />
                <DirectionsRenderer v-if="directions" :directions="directions" />
              </GmapMap>
            </v-row>
            <v-btn @click="getDirections">Get Routes</v-btn>
          </v-container>
        </v-parallax>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { MapElementFactory } from 'vue2-google-maps'
import DirectionsRenderer from './components/DirectionsRenderer.js'

export default {
  name: 'App',
  components: {
    DirectionsRenderer
  },
  data() {
    return {
      mapCenter: { lat: 40.7812, lng: -73.9665 },
      directions: null
    }
  },
  computed: {
    // mapCenter() {
    //   return this.currentLocation || { lat: 40.7812, lng: -73.9665 }
    // }
  },
  methods: {
    onDragMarker(coords) {
      console.log('coords', coords)
    },
    getDirections() {
      var directionsService = new google.maps.DirectionsService()

      const requestObject = {
        origin: 'Chicago, IL',
        destination: 'Los Angeles, CA',
        waypoints: [
          {
            location: 'Joplin, MO',
            stopover: false
          },
          {
            location: 'Oklahoma City, OK',
            stopover: true
          }
        ],
        provideRouteAlternatives: false,
        travelMode: 'DRIVING'
      }

      directionsService.route(requestObject, (result) => {
        console.log('result', result)
        this.directions = result
      })
    },
    async getLocation() {
      return new Promise((resolve, reject) => {
        if (!('geolocation' in navigator)) {
          reject(new Error('Geolocation is not available.'))
        }
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            console.log(pos)
            this.mapCenter = { lat: pos.coords.latitude, lng: pos.coords.longitude }
            resolve(pos)
          },
          (err) => {
            reject(err)
          },
          { maximumAge: 10000, timeout: 5000, enableHighAccuracy: true }
        )
      })
    }
  }
}
</script>

<style lang="scss">
.inner-container {
  padding-top: 100px;
  height: 100%;
}
.container--fluid {
  padding: 0;
}
</style>
