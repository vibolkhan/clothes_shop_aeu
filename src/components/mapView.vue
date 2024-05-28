<template>
  <GoogleMap
    :api-key="YOUR_GOOGLE_MAPS_API_KEY"
    style="width: 100%; height: 500px"
    :center="center"
    :zoom="15"
  >
    <Marker :options="{ position: center }" />
  </GoogleMap>
</template>

<script>
import { GoogleMap, Marker } from "vue3-google-map";

const YOUR_GOOGLE_MAPS_API_KEY = "AIzaSyCFaF4sW9xbyXIHvuTCEmLQfj3gDjVISHo";

export default {
  name: "App",
  components: { GoogleMap, Marker },
  data() {
    const center = { lat: 40.689247, lng: -111.044502 };
    return { center, YOUR_GOOGLE_MAPS_API_KEY };
  },
};
</script>
