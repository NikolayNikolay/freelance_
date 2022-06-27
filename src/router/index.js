import { createRouter, createWebHistory } from "vue-router";
import NewNew from "../views/NewNew";
import TasksTasks from "../views/TasksTasks";
import TaskTask from "../views/TaskTask";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/new", component: NewNew },
    { path: "/", component: TasksTasks, alias: "/" },
    { path: "/task/:id?", component: TaskTask },
  ],
  linkActiveClass: "active",
  linkExactActiveClass: "active",
});

export default router;
