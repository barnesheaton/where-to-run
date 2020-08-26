<template>
  <v-app>
    <v-app-bar app color="accent-4 blue-grey" dense dark>
      <v-toolbar-title>Where To Run!</v-toolbar-title>
    </v-app-bar>
    <v-main>
      <v-parallax dark src="/dist/assets/background.jpg" class="parallax p-0" height="1000">
        <v-container class="inner-container" fluid>
          <v-banner elevation="5" color="white">
            <div class="text-center banner-container">
              <h2 class="my-6">
                Welcome to Where to Run!
              </h2>
              <div class="my-6">
                This is a simple application where you can input a location and a desired run
                distance.
                <br />
                And a random running route will be generated as directions on the map.
              </div>
              <div class="my-6">
                It uses the Google Maps SDK and the Google Directions API <br />
                and a simple distance calculation on top of the inputted longitude and latitude
                coordinates
              </div>
            </div>
          </v-banner>

          <v-banner elevation="5" color="white" class="main-banner">
            <v-row>
              <v-col class="p-4 ml-4">
                <div>
                  How many miles do you want to run? (very appoxrimate)
                </div>
                <v-slider
                  v-model="slider"
                  :max="50"
                  :min="2"
                  class="align-center slider mt-12 mx-4 mb-4"
                  hide-details
                  thumb-label="always"
                />

                <v-btn :loading="routeLoading" @click="getDirections">Get Me a Route!</v-btn>

                <div class="mt-4">
                  Hint: Click on the map or drag the marker to reposition your starting point!
                </div>
              </v-col>
              <v-col>
                <v-btn :loading="loading" class="mb-6" @click="getLocation">Current Location</v-btn>
                <v-btn :loading="loading" disabled class="mb-6" @click="getLocation">
                  Random Location
                </v-btn>
                <GmapMap
                  :center="mapCenter"
                  :zoom="10"
                  style="width: 500px; height: 300px;"
                  class="mb-6"
                  @click="onDragMarker"
                >
                  <GmapMarker
                    :position="markerCoords"
                    :clickable="true"
                    :draggable="true"
                    @dragend="onDragMarker"
                  />
                  <DirectionsRenderer v-if="directions" :directions="directions" />
                </GmapMap>
                <div v-if="routeLength">Result: {{ routeLength.toFixed(2) }} Miles</div>
              </v-col>
            </v-row>
          </v-banner>
        </v-container>
      </v-parallax>
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
      markerCoords: { lat: 40.7812, lng: -73.9665 },
      mapCenter: { lat: 40.7812, lng: -73.9665 },
      directions: null,
      routeLoading: false,
      locationLoading: false,
      loading: false,
      slider: 5
    }
  },
  computed: {
    routeLength() {
      if (!this.directions) return null

      var distance = 0

      this.directions.routes[0].legs.map((leg) => {
        distance += leg.distance.value
      })

      return distance * 0.000621371
    },
    latLngToAdd() {
      const mileToLatLngRatio = 0.01666666666
      return (this.slider * mileToLatLngRatio) / 4
    }
  },
  methods: {
    onDragMarker(coords) {
      this.markerCoords = { lat: coords.latLng.lat(), lng: coords.latLng.lng() }
      console.log('coords', this.markerCoords)
    },
    getDirections() {
      this.routeLoading = true
      const directionsService = new google.maps.DirectionsService()
      const waypoints = [
        {
          location: {
            lat: this.markerCoords.lat + this.latLngToAdd,
            lng: this.markerCoords.lng + 0
          }
        },
        {
          location: {
            lat: this.markerCoords.lat + this.latLngToAdd,
            lng: this.markerCoords.lng + this.latLngToAdd
          }
        },
        {
          location: {
            lat: this.markerCoords.lat + 0,
            lng: this.markerCoords.lng + this.latLngToAdd
          }
        }
      ]

      const requestObject = {
        origin: this.markerCoords,
        destination: this.markerCoords,
        waypoints,
        provideRouteAlternatives: true,
        travelMode: 'WALKING'
      }

      directionsService.route(requestObject, (result) => {
        this.routeLoading = false
        this.directions = result
      })
    },
    async getLocation() {
      return new Promise((resolve, reject) => {
        this.locationLoading = true
        if (!('geolocation' in navigator)) {
          this.locationLoading = false
          reject(new Error('Geolocation is not available.'))
        }
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            console.log(pos)
            this.markerCoords = { lat: pos.coords.latitude, lng: pos.coords.longitude }
            this.mapCenter = { lat: pos.coords.latitude, lng: pos.coords.longitude }
            this.locationLoading = false
            resolve(pos)
          },
          (err) => {
            this.locationLoading = false
            reject(err)
          },
          { enableHighAccuracy: true }
        )
      })
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
.parralax {
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
