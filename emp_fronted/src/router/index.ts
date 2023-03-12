import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import EmployeeForm from "../components/Employee/EmployeeForm.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      props: true,
      component: () => HomeView,
    },
    {
      path: "/employee/:type",
      name: "create-employee",
      props: true,
      component: () => EmployeeForm,
    },
  ],
});

export default router;
