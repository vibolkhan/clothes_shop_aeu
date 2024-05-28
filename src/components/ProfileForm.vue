<template>
  <div>
    <v-card class="mx-auto mt-4 pa-4 br-t" max-width="344">
      <div class="text-center">
        <v-icon class="avatar text-center">mdi-account-circle</v-icon>
      </div>

      <v-card-title>
        {{ user?.username }}
      </v-card-title>
      <v-card-subtitle>Email: {{ user?.email }} </v-card-subtitle>
    </v-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      data: [],
      user: null,
    };
  },
  async created() {
    if (!localStorage.getItem("user")) {
      this.$router.push({
        name: "login",
      });
      return;
    }
    this.user = JSON.parse(localStorage.getItem("user"));
  },
};
</script>
<style>
.avatar {
  font-size: 200px;
}
.br-t {
  border-radius: 9px 9px 0 0;
  border-top: 6px solid blue;
}
</style>
