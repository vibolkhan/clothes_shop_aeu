import { createRouter, createWebHistory } from "vue-router";
import CartsView from "../components/CartsView.vue";
import ViewDetail from "../components/ViewDetail.vue";
import ProductsList from "../components/ProductsList.vue";
import HistoryForm from "../components/HistoryForm.vue";
import LoginForm from "../components/LoginForm.vue";
import ProfileForm from "../components/ProfileForm.vue";
import mapView from "../components/mapView.vue";

const routes = [
  {
    path: "/",
    name: "login",
    component: LoginForm,
  },
  {
    path: "/detailProduct",
    name: "ViewDetail",
    component: ViewDetail,
  },
  {
    path: "/history",
    name: "ViewHistory",
    component: HistoryForm,
  },
  {
    path: "/profile",
    name: "ViewProfile",
    component: ProfileForm,
  },
  {
    path: "/product",
    name: "ProductsList",
    component: ProductsList,
  },
  {
    path: "/carts",
    name: "CartsView",
    component: CartsView,
  },
  {
    path: "/map",
    name: "mapView",
    component: mapView,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
