<template>
  <div class="ma-4">
    <v-card
      v-for="item in data"
      :key="item.id"
      cover
      class="mx-auto mt-4 ma-4"
      elevation="2"
    >
      <p class="mt-4 ma-4">
        {{ formattedDate(item.ordered_date) }}
      </p>
      <v-row class="px-4 pb-4">
        <v-col cols="2" v-for="product in item.history" :key="product.id">
          <v-card cover class="mx-auto" elevation="2" max-width="300">
            <v-img :src="product.image" height="200px"></v-img>

            <v-card-text class="text-truncate">
              {{ product.title }}
            </v-card-text>
            <div class="text-center">
              <small class="text-center">{{ product.price }} $</small>
              <br />
              <small class="text-center">{{ product.quantity }} </small>
            </div>

            <v-spacer></v-spacer>
          </v-card>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      data: [],
    };
  },
  computed: {
    ...mapState("product", ["history"]),
  },
  async created() {
    this.data = JSON.parse(localStorage.getItem("history"))
      .reverse()
      .filter(
        (item) => item.userId === JSON.parse(localStorage.getItem("user")).id
      );
    await this.fetchUsers();
  },
  methods: {
    ...mapActions("product", ["fetchUsers"]),
    formattedDate(date) {
      const options = {
        year: "numeric",
        month: "long",
        day: "2-digit",
        weekday: "long",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
        timeZone: "UTC",
      };

      // Using Intl.DateTimeFormat
      const formatter = new Intl.DateTimeFormat("en-US", options);
      return formatter.format(new Date(date)).replace(/, /g, "-");
    },
  },
};
</script>
