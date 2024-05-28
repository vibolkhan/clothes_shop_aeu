<template>
  <div class="ma-6">
    <v-row>
      <v-col cols="3">
        <v-select
          :items="tabs"
          v-model="tab"
          label="category"
          variant="outlined"
          dense
          persistent-placeholder
        ></v-select>
      </v-col>
      <v-col cols="3">
        <v-select
          :items="favoriteItems"
          v-model="isFavorite"
          label="Favorite Items"
          variant="outlined"
          item-text="text"
          dense
          persistent-placeholder
        ></v-select>
      </v-col>
      <v-col cols="6">
        <v-text-field
          v-model="searchQuery"
          append-inner-icon="mdi-magnify"
          label="Search templates"
          variant="outlined"
          dense
          persistent-placeholder
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col
        class="mt-4"
        cols="2"
        v-for="product in productsList"
        :key="product.id"
      >
        <v-card
          cover
          class="mx-auto"
          elevation="2"
          max-width="300"
          @click="viewDetail(product)"
        >
          <v-img :src="product.image" height="200px"></v-img>
          <v-btn
            icon
            elevation="0"
            @click.stop="addToFavotite(product, product.isFavorite)"
          >
            <v-icon color="error" v-if="!product.isFavorite"
              >mdi-star-outline</v-icon
            >
            <v-icon color="error" v-if="product.isFavorite">mdi-star</v-icon>
          </v-btn>
          <v-card-text class="text-truncate">
            {{ product.title }}
          </v-card-text>
          <div class="text-center">
            <small class="text-center">{{ product.price }} $</small>
          </div>
          <div class="text-center">
            <v-rating
              v-model="product.rating.rate"
              size="x-small"
              color="orange-lighten-2"
            ></v-rating>
          </div>
          <div class="text-center">
            <v-btn
              elevation="0"
              color="orange-lighten-2"
              class="w-100 text-capitalize white--text"
              outlined
              rounded="0"
              @click.stop="addToCarts(product)"
            >
              <span> add to cart </span>
            </v-btn>
          </div>

          <v-spacer></v-spacer>
        </v-card>
      </v-col>
    </v-row>
    <v-dialog v-model="dialog" persistent>
      <v-card
        cover
        class="mx-auto pa-4"
        elevation="2"
        max-width="500"
        v-if="cart"
      >
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
        <template v-slot:actions>
          <v-spacer></v-spacer>
          <v-btn @click="dialog = false"> close </v-btn>
        </template>
        <v-spacer></v-spacer>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import { mapActions, mapState, mapMutations } from "vuex";
import ViewDetail from "@/components/ViewDetail.vue";

export default {
  components: { ViewDetail },
  data() {
    return {
      loading: false,
      show: false,
      selection: 1,
      tab: "all",
      tabs: [],
      productsList: [],
      searchQuery: "",
      dialog: false,
      favoriteItems: ["favorite", "all"],
      isFavorite: "all",
    };
  },
  computed: {
    ...mapState("product", ["products", "carts", "cart"]),
  },
  watch: {
    tab: {
      handler() {
        this.productsList = this.filterByCategory();
      },
      immediate: true,
    },
    searchQuery: {
      handler() {
        this.productsList = this.filterByCategory().filter((item) =>
          item.title.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      },
    },
    isFavorite: {
      handler() {
        if (this.isFavorite === "favorite") {
          this.productsList = this.filterByCategory().filter(
            (item) => item.isFavorite === (this.isFavorite === "favorite")
          );
          return;
        }
        this.productsList = this.products;
      },
    },
  },
  async created() {
    await this.fetchProducts();
    const groupedData = [
      ...new Set(this.products.map((item) => item.category)),
    ];

    this.tabs = groupedData;
    this.tabs.push("all");
    console.log(this.$route.name === "Favorite");
    if (this.$route.name === "Favorite") {
      this.productsList = this.products.filter((item) => item.isFavorite);

      return;
    }
    this.productsList = this.filterByCategory();
  },
  methods: {
    ...mapActions("product", ["fetchProducts"]),
    ...mapMutations("product", ["setToCart", "setToCarts", "setToCart"]),
    filterByCategory() {
      if (this.tab === "all") return this.products;
      return this.products.filter((item) => item.category === this.tab);
    },
    addToCarts(product) {
      if (!localStorage.getItem("user")) {
        this.$router.push({
          name: "login",
        });
        return;
      }
      this.carts.push({ ...product, quantity: 1 });
    },
    addToFavotite(product, isFavorite) {
      // to be done
      product.isFavorite = !isFavorite;
    },
    viewDetail(product) {
      this.setToCart(product);
      this.dialog = true;
      // console.log(product);
      // this.$router.push({
      //   name: "ViewDetail",
      // });
    },
  },
};
</script>
<style>
.rating {
  background-color: brown;
  color: white;
  padding: 0 9px;
  border-radius: 6px;
  margin-left: 5px;
}
</style>
