import { createStore } from "vuex";
import * as product from "./product";

export default createStore({
  modules: {
    product,
  },
});
