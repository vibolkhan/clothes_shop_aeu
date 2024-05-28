<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer">
      <v-card class="mx-auto" elevation="0">
        <v-list density="compact">
          <v-list-subheader class="d-flex align-center justify-center w-100">
            <v-icon size="52">mdi-cart</v-icon>
            <!-- <h3 class="text-uppercase">clothes shop</h3> -->
          </v-list-subheader>

          <v-list-item
            v-for="(item, i) in items"
            :key="i"
            :value="item"
            color="primary"
            :to="item.to"
          >
            <template v-slot:prepend>
              <v-icon :icon="item.icon"></v-icon>
            </template>

            <v-list-item-title v-text="item.text"></v-list-item-title>
          </v-list-item>
        </v-list>
      </v-card>
    </v-navigation-drawer>

    <v-app-bar>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-app-bar-title>GROUP 2</v-app-bar-title>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      drawer: null,
      items: [
        { text: "Profile", icon: "mdi-account", to: "/profile" },
        { text: "Products", icon: "mdi-shopping", to: "/product" },
        { text: "Carts", icon: "mdi-cart", to: "/carts" },
        { text: "History", icon: "mdi-clock", to: "/history" },
      ],
    };
  },
};
</script>
