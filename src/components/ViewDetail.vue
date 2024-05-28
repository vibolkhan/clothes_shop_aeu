<template>
  <div>
    <v-row class="m-0 p-0" v-if="cart">
      <v-col class="" cols="12">
        <v-card cover class="mx-auto" elevation="2" max-width="300">
          <v-img :src="cart.image" height="200px"></v-img>
          <v-card-text class="text-center">
            <b>
              {{ cart.title }}
            </b>
            <div class="text-center">
              <small class="text-center">{{ cart.price }} $</small>
            </div>
            <br />
            <div class="text-left">
              <b>Description:</b> <span> {{ cart.description }}</span>
            </div>
          </v-card-text>
          <v-spacer></v-spacer>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapState("product", ["cart", "carts"]),
  },
  created() {
    const fruits = new Set(["Apple", "Banana", "Orange"]);
    const vegetables = new Set(["Carrot", "Potato", "Lettuce"]);
    const combinedSet = new Set([...fruits, ...vegetables]);
    console.log(combinedSet);
    const intersectionSet = new Set(
      [...fruits].filter((fruit) => vegetables.has(fruit))
    );
    console.log(intersectionSet);
    const differenceSet = new Set(
      [...fruits].filter((fruit) => !vegetables.has(fruit))
    );
    console.log(differenceSet);
  },
  methods: {
    addToCarts(product) {
      if (!localStorage.getItem("user")) {
        this.$router.push({
          name: "login",
        });
        return;
      }
      this.carts.push({ ...product, quantity: 1 });
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
