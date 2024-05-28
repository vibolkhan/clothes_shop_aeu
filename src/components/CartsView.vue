<template>
  <div>
    <v-row class="pa-4">
      <v-col class="mt-4" cols="2" v-for="product in carts" :key="product.id">
        <v-card cover class="mx-auto" elevation="2" max-width="300">
          <v-img :src="product.image" height="200px"></v-img>
          <v-btn icon elevation="0" @click="deleteItem(product)">
            <v-icon color="error">mdi-delete</v-icon>
          </v-btn>
          <v-card-text class="text-truncate">
            {{ product.title }}
          </v-card-text>
          <div class="text-center">
            <small class="text-center">{{ product.price }} $</small>
          </div>
          <div class="text-center d-flex justify-space-between align-center">
            <!-- color="orange-lighten-2" -->
            <v-btn
              elevation="0"
              outlined
              rounded="0"
              @click="toggleQuantity(product, -1)"
            >
              <v-icon>mdi-minus</v-icon>
            </v-btn>
            <span>{{ product.quantity }}</span>
            <v-btn
              elevation="0"
              outlined
              rounded="0"
              @click="toggleQuantity(product, +1)"
            >
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </div>

          <v-spacer></v-spacer>
        </v-card>
      </v-col>
    </v-row>
    <v-row class="mt-2 pb-4">
      <v-col cols="3">
        <v-card class="pa-4 card-amount" elevation="0" outlined color="surface">
          <p
            v-if="!carts.length"
            class="card-title text-uppercase font-weight-medium"
          >
            NO Order availble
          </p>
          <br />
          <p class="card-title text-uppercase font-weight-medium">total</p>
          <p class="total-price">
            {{
              carts
                .reduce(
                  (acc, { price, quantity }) => acc + price * quantity || 0,
                  0
                )
                .toFixed(2)
            }}
            $
          </p>
        </v-card>
      </v-col>
    </v-row>
    <div class="d-flex justify-space-around">
      <v-spacer></v-spacer>
      <div>
        <v-btn
          elevation="0"
          outlined
          rounded="0"
          color="error"
          class="text-capitalize white--text rounded-sm"
        >
          cancel
        </v-btn>
        <v-btn
          elevation="0"
          outlined
          rounded="0"
          color="primary"
          class="ml-2 text-capitalize white--text rounded-sm"
          @click="confirmOrder()"
        >
          confirm
        </v-btn>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import { mapMutations } from "vuex/dist/vuex.cjs.js";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapState("product", ["products", "carts"]),
  },
  methods: {
    ...mapMutations("product", ["setToHistory", "setToCarts"]),
    toggleQuantity(product, quantity) {
      if (product.quantity === 1 && quantity === -1) return;
      product.quantity += quantity;
    },
    deleteItem(product) {
      console.log(Object.values(this.carts));
      const index = Object.values(this.carts).findIndex(product.id);
      this.carts.splice(index);
    },
    confirmOrder() {
      if (!this.carts.length) return;
      this.setToHistory(this.carts);

      const history = JSON.parse(localStorage.getItem("history")) ?? [];
      history.push({
        id: history?.length + 1,
        userId: JSON.parse(localStorage.getItem("user")).id,
        history: this.carts,
        ordered_date: new Date(),
      });

      localStorage.setItem("history", JSON.stringify(history));
      this.setToCarts([]);
      this.$router.push({
        name: "ViewHistory",
      });
    },
  },
};
</script>
<style>
.card-amount .total-price {
  margin-bottom: 0;
  font-size: 34px;
  color: var(--v-primary-base);
}
.card-invoice {
  border: solid 1px var(--v-surface-darken3);
}
</style>
